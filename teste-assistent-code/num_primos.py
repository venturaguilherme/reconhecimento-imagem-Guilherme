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