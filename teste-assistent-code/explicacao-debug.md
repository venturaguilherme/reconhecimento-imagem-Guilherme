# Explicação dos erros no `debug.py`

1. Erro de sintaxe na entrada de dados de `item1`:
   - O código usa `float(input(Preço do item 1? ))` sem colocar a mensagem entre aspas.
   - Isso causa um `SyntaxError` porque Python espera uma string como argumento do `input()`.

2. `desconto_cupom` não é convertido para número:
   - A variável é atribuída diretamente com `input(...)`, que retorna string.
   - Depois o código tenta usar `desconto_cupom / 100`, gerando um `TypeError` ou resultado incorreto se não convertido.

3. Uso incorreto de `print()` para `Item 2`:
   - A linha `print(" Item 2:        R$ {total_item2:.2f}")` não é uma f-string.
   - O valor de `total_item2` não é formatado; a string é impressa literalmente.

4. Identação incorreta no bloco `if`:
   - A linha `print(f" Desconto ({desconto_cupom:.0f}%): -R$ {desconto:.2f}")` não está indentada dentro do `if`.
   - Isso causa um `IndentationError` ou faz o código não corresponder à lógica esperada.

5. Melhoria adicional:
   - É melhor converter `desconto_cupom` para um tipo numérico (`float`) assim que lido do `input`.
   - Isso garante que operações matemáticas funcionem corretamente e que a verificação `if desconto_cupom > 0` funcione como esperado.
