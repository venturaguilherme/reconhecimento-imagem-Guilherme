# teste-assistent-code

## Descrição

Este projeto contém exemplos de código Python para prática de debug, refatoração e análise de algoritmos básicos. Ele inclui:

- Um script de cálculo de pedido com imposto e desconto (`debug.py`)
- Uma implementação de verificação de números primos (`num_primos.py`)
- Um exemplo de refatoração para cálculo de estatísticas de uma lista (`refatoracao.py`)
- Documentação explicativa detalhando erros, refatoração e lógica de números primos

## Requisitos

- Python 3.10 ou superior

> Observação: `refatoracao.py` usa anotações de tipo com união de tipos `int | float`, compatível apenas a partir do Python 3.10.

## Estrutura de arquivos

- `debug.py` - Script que calcula o valor total de um pedido com três itens, aplica imposto de 10% e desconto de cupom. É um exercício típico de depuração e validação de entrada.
- `num_primos.py` - Função `is_prime(n)` que verifica se um número inteiro é primo, com tratamento de erros para entradas inválidas. Também contém testes simples no bloco `if __name__ == "__main__"`.
- `refatoracao.py` - Programa que calcula estatísticas básicas (`total`, `média`, `máximo`, `mínimo`) de uma lista de números e imprime os resultados.
- `explicacao-debug.md` - Explicação dos erros presentes no código de `debug.py`.
- `explicacao-refatoracao.md` - Descrição e análise do código original de refatoração, destacando a lógica e possíveis melhorias.
- `explicacao_num_primo.md` - Explicação detalhada da função de verificação de números primos.

## Como executar

No terminal, navegue até o diretório `teste-assistent-code` e execute:

```bash
python debug.py
python num_primos.py
python refatoracao.py
```

### Exemplo de uso

- `debug.py`: responda às perguntas de entrada para cliente, quantidades, preços e cupom de desconto.
- `num_primos.py`: executa testes predefinidos para vários números e imprime se são primos ou se levantam exceções.
- `refatoracao.py`: calcula e exibe estatísticas para uma lista fixa de números.

## Observações

- `debug.py` é um bom ponto de partida para praticar conserto de erros de sintaxe, conversão de tipos e lógica condicional.
- `num_primos.py` demonstra boas práticas de documentação, validação de argumentos e uso de algoritmos eficientes para verificação de primalidade.
- `refatoracao.py` mostra como estruturar cálculos simples em funções reutilizáveis e como apresentar resultados no terminal.

## Contribuição

Se quiser melhorar este repositório, considere:

- Adicionar testes automatizados com `unittest` ou `pytest`
- Implementar uma versão de `debug.py` com interface de usuário mais robusta
- Criar funções reutilizáveis para leitura de entrada e formatação de saída
- Adicionar mais exemplos de refatoração e documentação
