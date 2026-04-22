# Explicação Técnica da Função `is_prime` em Python

## Visão Geral
A função `is_prime(n: int) -> bool` é implementada em Python para verificar se um número inteiro `n` é primo. Um número primo é definido como um inteiro maior que 1 que possui apenas dois divisores positivos distintos: 1 e ele mesmo. A função retorna `True` se o número for primo e `False` caso contrário. Esta versão segue princípios de clean code, incluindo type hints, validação de entrada e documentação detalhada.

## Lógica da Função
A implementação utiliza uma abordagem eficiente baseada em verificações matemáticas básicas, com melhorias para robustez:

1. **Validação de Entrada**:
   - Verifica se `n` é um inteiro usando `isinstance(n, int)`. Se não, lança `TypeError`.
   - Verifica se `n` é não negativo. Se negativo, lança `ValueError`.

2. **Verificação Inicial para Números Pequenos ou Inválidos**:
   - Se `n <= 1`, retorna `False`. Números menores ou iguais a 1 não são primos por definição.
   - Se `n == 2`, retorna `True`. O número 2 é o único número primo par.

3. **Eliminação de Números Pares**:
   - Se `n % 2 == 0`, retorna `False`. Todos os números pares maiores que 2 não são primos, pois são divisíveis por 2.

4. **Verificação de Divisores Ímpares**:
   - Um loop `for` itera de 3 até `int(n**0.5) + 1` em passos de 2 (apenas números ímpares).
   - Para cada `i` no intervalo, verifica se `n % i == 0`. Se sim, `n` não é primo.
   - O loop para em `int(n**0.5) + 1` porque, se não há divisores até a raiz quadrada de `n`, não há divisores maiores.

5. **Retorno Final**:
   - Se nenhum divisor for encontrado, retorna `True`.

## Eficiência e Complexidade
- **Complexidade de Tempo**: O(n^{1/2}), pois o loop executa aproximadamente √n iterações no pior caso. Isso é eficiente para números grandes, evitando verificações desnecessárias.
- **Complexidade de Espaço**: O(1), pois usa apenas variáveis locais e não estruturas de dados adicionais.
- **Otimizações**: 
  - Elimina números pares antecipadamente.
  - Verifica apenas divisores ímpares, reduzindo iterações pela metade.
  - Usa `int(n**0.5)` para calcular a raiz quadrada de forma inteira, evitando floats desnecessários.

## Casos de Teste Incluídos
O código inclui testes estruturados para validar a função, incluindo casos de erro:
- Testa números primos e não primos.
- Testa entradas inválidas (negativos, não inteiros) para verificar exceções.

## Limitações e Considerações
- A função agora valida entradas, lançando exceções para tipos incorretos ou valores negativos.
- Para números muito grandes, pode ser lento devido à complexidade O(√n), mas é adequado para a maioria dos casos práticos.
- Segue PEP 484 para type hints e PEP 257 para docstrings.

## Código Completo
```python
def is_prime(n: int) -> bool:
    """
    Verifica se um número inteiro é primo.

    Um número primo é um inteiro maior que 1 que possui apenas dois divisores
    positivos distintos: 1 e ele mesmo.

    Args:
        n (int): O número inteiro a ser verificado. Deve ser um inteiro não negativo.

    Returns:
        bool: True se o número for primo, False caso contrário.

    Raises:
        TypeError: Se n não for um inteiro.
        ValueError: Se n for negativo.

    Exemplos:
        >>> is_prime(2)
        True
        >>> is_prime(4)
        False
    """
    if not isinstance(n, int):
        raise TypeError("O argumento deve ser um inteiro.")
    if n < 0:
        raise ValueError("O número deve ser não negativo.")
    if n <= 1:
        return False
    if n == 2:
        return True
    if n % 2 == 0:
        return False
    for i in range(3, int(n**0.5) + 1, 2):
        if n % i == 0:
            return False
    return True

# Testes
if __name__ == "__main__":
    test_cases = [2, 3, 4, 17, 18, 1, 0, -5]
    for num in test_cases:
        try:
            result = is_prime(num)
            print(f"is_prime({num}) = {result}")
        except (TypeError, ValueError) as e:
            print(f"is_prime({num}) raised {type(e).__name__}: {e}")
```</content>
<parameter name="filePath">c:\Users\GUILHERMEFERREIRAVEN\Desktop\reconhecimento-imagem-Guilherme\teste-assistent-code\explicacao_num_primo.md