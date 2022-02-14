# TESTE PARA CANDIDATOS

## Desafio dashboard frontend

O teste tem como objetivo fornecer um `dashboard de vendas` realizadas durante o ano de `2018` e auxiliar o gestor na tomada de decisão.

O candidato deve desenvolver o frontend da aplicação utilizando seus conhecimentos em React.

O projeto final deve apresentar as seguintes informações:

- O volume total de vendas realizadas.
- O melhor mês do Ano em relação ao volume de vendas;
- O melhor mês do Ano em relação ao valor total de vendas;
- Um gráfico contendo o volume de vendas realizadas por mês.
- Um gráfico contendo o valor total de produtos vendidos por mês.
- Um gráfico contendo os produtos mais vendidos em ordem decrescente.

Para isso, fornecemos uma api em **node.js** 

### Atenção:

- O backend deve será disponibilizado em `http://localhost:3333`
- Todas as rotas mencionadas neste teste devem estão dentro do recurso `/api/v1/sales/`


### Ticket 1:
O dashboard deverá ser apresentado somente quando temos dados disponíveis, portanto implemente na rota `/number-of-sales` a busca pela quantidade total de registros disponíveis no banco de dados.

A API irá retornar um JSON no seguinte formato: 
```JAVASCRIPT
{ 
  "number_of_sales": number
} 
```

### Ticket 2:
Para popular os dados das vendas, utilize o arquivo **dados.csv** fornecido neste repositório, implemente na rota `/upload` uma função capaz de enviar o arquivo ao backend.

A API irá retornar um JSON no seguinte formato:
```JAVASCRIPT
{
	"inserted": 35539,
	"message": "Registros inseridos"
}
```
### Atenção:
O frontend devera enviar o arquivo através do campo **file**;

### Ticket 3:
Para limpar os dados das vendas, implemente uma rotina que fará uma chamada na rota `/all` utilizando o verbo **DELETE**.

### Ticket 4:
Implemente na rota `/by-month`, uma função capaz de buscar os dados de vendas, utilize os dados retornados para plotar os gráficos solicitados.

### Atenção:
Utilize os parametros de busca `start_date`, `end_date` e `entries_per_page` para filtrar os resultados.

A API deve retornar um JSON no seguinte formato:
```JAVASCRIPT
[
  {
    "month": number, // mês;
    "quantity": number, // quantidade total vendido 
    "amount": number // valor total vendido
  },
  {
    "month": number, // mês;
    "quantity": number, // quantidade total vendido 
    "amount": number // valor total vendido
  },
  {...}
]
```

### Ticket 5:
Implemente uma rotina capaz de realizar uma chamada na rota `/best-selling-products` e receber os dados dos produtos mais vendidos.

A quantidade de resultados a serem exibidos deve ser determinada pelo parâmetro `entries_per_page`.

Também deve ser possível filtrar os resultados de acordo com o período, para isso envie os parâmetros de busca `start_date` e `end_date`.

Ao executar a função a API deve retornar JSON no seguinte formato:
```JAVASCRIPT
{
	"products": [
		{
			"product_code": string, // código do produto,
			"product_description": string, // descrição do produto
			"quantity": number // quantidade de produtos vendidos
		},
		{
			"product_code": string, // código do produto,
			"product_description": string, // descrição do produto
			"quantity": number // quantidade de produtos vendidos
		},
		{...}
	],
	"entries_per_page":number,
	"total_results": number
}
```

Utilize os dados retornados para plotar os gráficos solicitados.
