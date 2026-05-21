import pygame
import random
import sys

# Inicialização do Pygame
pygame.init()

# Configurações da tela
LARGURA = 800
ALTURA = 600
TELA = pygame.display.set_mode((LARGURA, ALTURA))
pygame.display.set_caption("Space Invaders Clone")

# Cores
PRETO = (0, 0, 0)
BRANCO = (255, 255, 255)
VERDE = (0, 255, 0)
VERMELHO = (255, 0, 0)

# Fonte
FONTE = pygame.font.SysFont(None, 36)

class Player(pygame.sprite.Sprite):
    def __init__(self):
        super().__init__()
        self.image = pygame.Surface((50, 20))
        self.image.fill(VERDE)
        self.rect = self.image.get_rect()
        self.rect.centerx = LARGURA // 2
        self.rect.bottom = ALTURA - 20
        self.velocidade_x = 0
        self.velocidade_normal = 5

    def update(self):
        self.velocidade_x = 0
        teclas = pygame.key.get_pressed()
        if teclas[pygame.K_LEFT]:
            self.velocidade_x = -self.velocidade_normal
        if teclas[pygame.K_RIGHT]:
            self.velocidade_x = self.velocidade_normal
        
        self.rect.x += self.velocidade_x
        
        # Limites da tela
        if self.rect.right > LARGURA:
            self.rect.right = LARGURA
        if self.rect.left < 0:
            self.rect.left = 0

    def atirar(self):
        tiro = Bullet(self.rect.centerx, self.rect.top)
        todos_sprites.add(tiro)
        tiros.add(tiro)

class Enemy(pygame.sprite.Sprite):
    def __init__(self, x, y):
        
        super().__init__()
        self.image = pygame.Surface((30, 30))
        self.image.fill(VERMELHO)
        self.rect = self.image.get_rect()
        self.rect.x = x
        self.rect.y = y
        self.velocidade_x = 2
        self.velocidade_y = 0

    def update(self):
        self.rect.x += self.velocidade_x
        self.rect.y += self.velocidade_y
        
        # Movimentação dos inimigos
        if self.rect.right >= LARGURA or self.rect.left <= 0:
            self.velocidade_x *= -1
            self.rect.y += 30

class Bullet(pygame.sprite.Sprite):
    def __init__(self, x, y):
        super().__init__()
        self.image = pygame.Surface((5, 10))
        self.image.fill(BRANCO)
        self.rect = self.image.get_rect()
        self.rect.centerx = x
        self.rect.bottom = y
        self.velocidade_y = -10

    def update(self):
        self.rect.y += self.velocidade_y
        # Mata o tiro se passar da tela superior
        if self.rect.bottom < 0:
            self.kill()

# Grupos de sprites
todos_sprites = pygame.sprite.Group()
inimigos = pygame.sprite.Group()
tiros = pygame.sprite.Group()

jogador = Player()
todos_sprites.add(jogador)

# Criando inimigos
for linha in range(5):
    for coluna in range(10):
        inimigo = Enemy(50 + coluna * 60, 50 + linha * 50)
        todos_sprites.add(inimigo)
        inimigos.add(inimigo)

pontuacao = 0
game_over = False

# Loop principal
clock = pygame.time.Clock()
rodando = True

while rodando:
    clock.tick(60) # 60 FPS
    
    # Eventos
    for evento in pygame.event.get():
        if evento.type == pygame.QUIT:
            rodando = False
        elif evento.type == pygame.KEYDOWN:
            if evento.key == pygame.K_SPACE and not game_over:
                jogador.atirar()
    
    if not game_over:
        # Atualização
        todos_sprites.update()
        
        # Colisões: Tiro e Inimigo
        acertos = pygame.sprite.groupcollide(inimigos, tiros, True, True)
        for acerto in acertos:
            pontuacao += 10
            
        # Colisões: Inimigo e Jogador
        se_bateu = pygame.sprite.spritecollide(jogador, inimigos, False)
        if se_bateu:
            game_over = True
            
        # Verifica se algum inimigo chegou muito em baixo
        for inimigo in inimigos:
            if inimigo.rect.bottom >= ALTURA - 40:
                game_over = True
                break
                
        # Vitória se todos inimigos morrerem
        if not inimigos:
            game_over = True # Poderíamos adicionar níveis aqui, mas para simplificar encerra o jogo
    
    # Desenho
    TELA.fill(PRETO)
    todos_sprites.draw(TELA)
    
    # Texto de Pontuação
    texto_pontos = FONTE.render(f"Pontos: {pontuacao}", True, BRANCO)
    TELA.blit(texto_pontos, (10, 10))
    
    if game_over:
        texto_game_over = FONTE.render("GAME OVER", True, BRANCO)
        retangulo_texto = texto_game_over.get_rect(center=(LARGURA/2, ALTURA/2))
        TELA.blit(texto_game_over, retangulo_texto)
    
    pygame.display.flip()

pygame.quit()
sys.exit()
