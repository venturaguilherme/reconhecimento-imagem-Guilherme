def calculate_statistics(numbers: list[int | float]) -> tuple[float, float, float, float]:
    """
    Calcula estatísticas básicas de uma lista de números.
    
    Args:
        numbers: Lista de números para análise
        
    Returns:
        Tupla contendo (total, média, máximo, mínimo)
    """
    if not numbers:
        raise ValueError("A lista não pode estar vazia")
    
    total = sum(numbers)
    mean = total / len(numbers)
    max_value = max(numbers)
    min_value = min(numbers)
    
    return total, mean, max_value, min_value


def main() -> None:
    """Função principal que executa o programa."""
    numbers = [23, 7, 45, 2, 67, 12, 89, 34, 56, 11]
    
    total, mean, max_value, min_value = calculate_statistics(numbers)
    
    print(f"Total:  {total}")
    print(f"Média:  {mean}")
    print(f"Maior:  {max_value}")
    print(f"Menor:  {min_value}")


if __name__ == "__main__":
    main()