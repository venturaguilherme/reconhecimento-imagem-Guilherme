// ===========================
// DB - LocalStorage helpers
// ===========================
const DB = {
    init() {
        if (!localStorage.getItem('users')) localStorage.setItem('users', JSON.stringify([]));
        if (!localStorage.getItem('todos'))  localStorage.setItem('todos',  JSON.stringify([]));
    },
    getUsers()  { return JSON.parse(localStorage.getItem('users')); },
    getTodos()  { return JSON.parse(localStorage.getItem('todos')); },
    saveUsers(u) { localStorage.setItem('users', JSON.stringify(u)); },
    saveTodos(t) { localStorage.setItem('todos',  JSON.stringify(t)); },
};

// ===========================
// Auth
// ===========================
const Auth = {
    register(name, email, password) {
        const users = DB.getUsers();
        if (users.find(u => u.email === email)) throw new Error('E-mail ja cadastrado.');
        const user = { id: Date.now(), name, email, password };
        users.push(user);
        DB.saveUsers(users);
        return user;
    },

    login(email, password) {
        const user = DB.getUsers().find(u => u.email === email && u.password === password);
        if (!user) throw new Error('E-mail nao cadastrado ou senha incorreta.');
        localStorage.setItem('currentUser', JSON.stringify(user));
        return user;
    },

    logout() { localStorage.removeItem('currentUser'); },

    current() {
        const s = localStorage.getItem('currentUser');
        return s ? JSON.parse(s) : null;
    },
};

// ===========================
// Todos
// ===========================
const Todos = {
    forUser(userId) {
        return DB.getTodos().filter(t => t.userId === userId);
    },

    add(userId, title, type, description) {
        const todos = DB.getTodos();
        const todo = { id: Date.now(), userId, title, type, description, done: false };
        todos.push(todo);
        DB.saveTodos(todos);
        return todo;
    },

    toggle(id) {
        const todos = DB.getTodos();
        const todo = todos.find(t => t.id === id);
        if (todo) todo.done = !todo.done;
        DB.saveTodos(todos);
    },

    delete(id) {
        const todos = DB.getTodos().filter(t => t.id !== id);
        DB.saveTodos(todos);
    },
};

// ===========================
// UI helpers
// ===========================
const UI = {
    get(id) { return document.getElementById(id); },

    showError(errEl, textEl, msg) {
        textEl.textContent = msg;
        errEl.classList.remove('hidden');
    },
    hideError(errEl) { errEl.classList.add('hidden'); },

    switchView(view) {
        UI.get('auth-wrapper').classList.toggle('hidden', view === 'app');
        UI.get('login-container').classList.toggle('hidden', view !== 'login');
        UI.get('register-container').classList.toggle('hidden', view !== 'register');
        const app = UI.get('app-container');
        if (view === 'app') {
            app.classList.remove('hidden');
            app.classList.add('flex');
        } else {
            app.classList.add('hidden');
            app.classList.remove('flex');
        }
    },
};

// ===========================
// Task Rendering
// ===========================
const TYPE_LABELS = { work: 'Trabalho', personal: 'Pessoal', study: 'Estudos' };
const TYPE_BADGE  = { work: 'badge-work', personal: 'badge-personal', study: 'badge-study' };

let currentFilter = 'all';

function renderTasks(userId) {
    const list    = UI.get('task-list');
    const empty   = UI.get('empty-state');
    let   tasks   = Todos.forUser(userId);

    if (currentFilter === 'pending') tasks = tasks.filter(t => !t.done);
    if (currentFilter === 'done')    tasks = tasks.filter(t =>  t.done);

    // Sort: pending first, then done
    tasks.sort((a, b) => {
        if (a.done === b.done) return b.id - a.id;
        return a.done ? 1 : -1;
    });

    updateStats(userId);

    if (tasks.length === 0) {
        list.innerHTML = '';
        empty.classList.remove('hidden');
        return;
    }

    empty.classList.add('hidden');
    list.innerHTML = tasks.map(task => buildCard(task)).join('');

    list.querySelectorAll('[data-complete]').forEach(btn => {
        btn.addEventListener('click', () => {
            Todos.toggle(Number(btn.dataset.complete));
            renderTasks(userId);
        });
    });

    list.querySelectorAll('[data-delete]').forEach(btn => {
        btn.addEventListener('click', () => {
            Todos.delete(Number(btn.dataset.delete));
            renderTasks(userId);
        });
    });
}

function buildCard(task) {
    const badgeClass    = TYPE_BADGE[task.type] || 'badge-work';
    const label         = TYPE_LABELS[task.type] || task.type;
    const doneClass     = task.done ? 'task-done' : '';
    const completeBtnClass = task.done ? 'btn-reopen' : 'btn-complete';
    const completeLabel = task.done ? 'Reabrir' : 'Concluir';
    const descHtml      = task.description
        ? `<p class="text-gray-400 text-sm mt-2 leading-relaxed">${escapeHtml(task.description)}</p>`
        : '';

    return `
    <div class="task-card glass rounded-xl p-5 ${doneClass}">
        <div class="flex items-start justify-between gap-4">
            <div class="flex-1 min-w-0">
                <div class="flex items-center gap-2 mb-1 flex-wrap">
                    <span class="task-title font-medium text-sm">${escapeHtml(task.title)}</span>
                    <span class="badge ${badgeClass}">${label}</span>
                </div>
                ${descHtml}
            </div>
            <div class="task-actions flex items-center gap-2 shrink-0">
                <button data-complete="${task.id}" class="${completeBtnClass}">
                    ${completeLabel}
                </button>
                <button data-delete="${task.id}" class="btn-delete">
                    <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                    </svg>
                </button>
            </div>
        </div>
    </div>`;
}

function updateStats(userId) {
    const all     = Todos.forUser(userId);
    const done    = all.filter(t => t.done).length;
    const pending = all.length - done;
    UI.get('stat-total').textContent   = all.length;
    UI.get('stat-pending').textContent = pending;
    UI.get('stat-done').textContent    = done;
}

function escapeHtml(str) {
    return String(str)
        .replace(/&/g,'&amp;')
        .replace(/</g,'&lt;')
        .replace(/>/g,'&gt;')
        .replace(/"/g,'&quot;');
}

// ===========================
// Filter buttons
// ===========================
function setupFilters(userId) {
    ['all','pending','done'].forEach(f => {
        UI.get(`filter-${f}`).addEventListener('click', () => {
            currentFilter = f;
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active-filter'));
            UI.get(`filter-${f}`).classList.add('active-filter');
            renderTasks(userId);
        });
    });
}

// ===========================
// App init after login
// ===========================
function startApp(user) {
    UI.get('user-greeting').textContent = `Ola, ${user.name}`;
    UI.switchView('app');
    currentFilter = 'all';
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active-filter'));
    UI.get('filter-all').classList.add('active-filter');
    renderTasks(user.email);
    setupFilters(user.email);
}

// ===========================
// Event listeners
// ===========================
function setupEvents() {
    // Navigation
    UI.get('show-register').addEventListener('click', e => {
        e.preventDefault();
        UI.hideError(UI.get('login-error'));
        UI.switchView('register');
    });

    UI.get('show-login').addEventListener('click', e => {
        e.preventDefault();
        UI.hideError(UI.get('register-error'));
        UI.switchView('login');
    });

    // Login
    UI.get('login-form').addEventListener('submit', e => {
        e.preventDefault();
        const errEl = UI.get('login-error'), errTxt = UI.get('login-error-text');
        UI.hideError(errEl);
        const email    = UI.get('login-email').value.trim();
        const password = UI.get('login-password').value.trim();
        if (!email || !password) { UI.showError(errEl, errTxt, 'E-mail e senha sao obrigatorios.'); return; }
        try {
            const user = Auth.login(email, password);
            UI.get('login-form').reset();
            startApp(user);
        } catch (err) { UI.showError(errEl, errTxt, err.message); }
    });

    // Register
    UI.get('register-form').addEventListener('submit', e => {
        e.preventDefault();
        const errEl  = UI.get('register-error'), errTxt = UI.get('register-error-text');
        const sucEl  = UI.get('register-success');
        UI.hideError(errEl);
        sucEl.classList.add('hidden');
        const name     = UI.get('register-name').value.trim();
        const email    = UI.get('register-email').value.trim();
        const password = UI.get('register-password').value.trim();
        if (!name || !email || !password) { UI.showError(errEl, errTxt, 'Preencha todos os campos.'); return; }
        if (password.length < 6) { UI.showError(errEl, errTxt, 'A senha deve ter pelo menos 6 caracteres.'); return; }
        try {
            Auth.register(name, email, password);
            UI.get('register-form').reset();
            sucEl.classList.remove('hidden');
            setTimeout(() => { sucEl.classList.add('hidden'); UI.switchView('login'); }, 1800);
        } catch (err) { UI.showError(errEl, errTxt, err.message); }
    });

    // Logout
    UI.get('logout-btn').addEventListener('click', () => {
        Auth.logout();
        UI.get('login-form').reset();
        UI.switchView('login');
    });

    // Add Task
    UI.get('task-form').addEventListener('submit', e => {
        e.preventDefault();
        const user     = Auth.current();
        const errEl    = UI.get('task-form-error'), errTxt = UI.get('task-form-error-text');
        UI.hideError(errEl);
        const title       = UI.get('task-title').value.trim();
        const type        = UI.get('task-type').value;
        const description = UI.get('task-description').value.trim();
        if (!title) { UI.showError(errEl, errTxt, 'O titulo da tarefa e obrigatorio.'); return; }
        Todos.add(user.email, title, type, description);
        UI.get('task-form').reset();
        renderTasks(user.email);
    });
}

// ===========================
// Bootstrap
// ===========================
document.addEventListener('DOMContentLoaded', () => {
    DB.init();
    setupEvents();
    const user = Auth.current();
    if (user) {
        startApp(user);
    } else {
        UI.switchView('login');
    }
});
