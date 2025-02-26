# Students API

Este é um serviço CRUD simples que oferece um API REST para cadastro de alunos;

## Requisitos

- Node.js [v18.20.6];
- Npm [10.8.2];
- Docker (opcional, utilizado no banco de dados de desenvolvimento);

## Rodando

Para rodar o projeto instale suas dependências:
```sh
npm install
```

Certifique-se de subir o banco de dados com o Docker, utilizando o comando:
```sh
docker compose -f db.yaml up -d
```

Então rode as migrations, com: 
```sh
npm run prisma:migrate
```

Só então veja seu serviço rodando com o clássico comando:
```
npm run dev
```

### Variáveis de Ambiente

O repositório contém um arquivo [.env]("./.env") com valores padrão de desenvolvimento para as variáveis de ambiente. Mude-as caso a porta padrão do serviço já esteja em uso **ou** caso não vá utilizar o Postgres junto ao Docker.



## Endpoints

Optei por não incluir o Swagger no projeto por uma questão de tempo e por se tratar de um conjunto simples de endpoints. Você pode atestar minha experiência com [Swagger em outros projetos](https://github.com/henriqueyun/notion-db-integration/blob/main/src/server.ts).

|Path|Método HTTP|Descrição|Body|
|----|-----------|---------|----|
|/students|GET|Busca todos os alunos|Nenhum|
|/students/:ra|GET|Busca o aluno com o registro informado no Path|Nenhum|
|/students|POST|Cadastra um novo aluno|```{"name": "Exemplo de Nome","cpf": "44224935821","email": "exemplo@email.com"}```|
|/students/:ra|PATCH|Edita um aluno existente|```{"name": "Exemplo de Nome","cpf": "44224935821","email": "exemplo@email.com"}```|
|/students/:ra|DELETE|Exclui um aluno existente|Nenhum|