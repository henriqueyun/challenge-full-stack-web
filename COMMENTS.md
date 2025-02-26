# Comentários Sobre o Projeto

Como solicitado no [README.md]("./README.md") aqui vão alguns comentários sobre as minhas decisões sobre esse projeto.

## Introdução

Há algum tempo tempo eu não desenvolvia projetos com Vue. Então antes de iniciar o desenvolvimento desse projeto fiz um [Crash Course](
https://www.youtube.com/watch?v=bzlFvd0b65c) para rever alguns conceitos básicos do framework.

## "História" do Projeto

O que eu queria fazer nesse projeto era um simples bem-feito. A única coisa que tinha em mente era estruturar um código que oferecesse um bom feedback visual tanto para validações quanto para os erros e também para os momentos de ações do usuário.

Iniciei o projeto pelo back-end porque seria mais simples entregá-lo mais rápido, pois possuo familiaridade com APIs Node. Geralmente utilizo ORMs como o TypeORM ou Prisma. Escolhi o Prisma sem muita análise já que exige menos configuração para obter o padrão de migrations. Para a parte de validação optei por utilizar o Zod, uma lib. extensivamente que quis experiementar pela primeira vez nesse projeto.

Depois tirei um tempo pra estudar Vue e iniciei o projeto. Desenvolvi o esqueleto das telas primeiramente entendendo como funcionava o Vuetify e posteriormente adicionei à interatividade e chamadas ao back-end. Foi um processo um pouco lento e desenvolvi tudo tijolo-a-tijolo. Um dos únicos problemas sérios que tive foi ao tentar converter as responses de erro no cadastro/edição para utilizar as tipagens do Zod no front-end;

## Mais
### Front-end
#### Typescript

Destaco que utilizara utilização Typescript no front-end se deu por assumir que a estrutura de uma aplicação que como essa (CRUD) pode assumir uma escala grande e portanto é interessante adotar o Typescript para melhorar a organização, legibilidade e escalabilidade do código.

#### Enfoque

Dirigi os meus esforços de desenvolvimento à replicar uma interface o mais próxima possível da descrita nos *mockups*. A única alteração proposital que alterou a tela de listagem foi trocar às posições entre a barra de pesquisa e o botão de cadastrar.

Favoreci um forte tratamento de erros nas chamadas das APIs de cadastro/edição fazendo às validações possíveis no front-end e tratando os erros esperados pelo back-end, utilizando bibliotecas como Zod (junto ao backend), Vuetify e v-mask.

A única *feature* extra adicionada foi uma pesquisa simples pelo nome do aluno.

Destaco também que utilizei o que o Vuetify oferece fazendo uso extensivo de props. como `:loading`, `:disabled` e `:error-messages` para favorecer feedbacks visuais do carregamento das requisições feitas pelo usuário.

##### Problemas
Como problemas destaco:

- A utilização da biblioteca vuelidate já que descobri posteriormente que o Vuetify possui uma forma nativa de fazer validação de campos (e talvez a Vuelidate tenha sido *overkill*);
- Uma certa desorganização código de *scripting*, principalmente no form-student. Acredito que uma das razões desse problema é ter sido meu primeiro contato com a *Composition API*.

### Back-end

O back-end foi construído rapidamente e com menos decisões tomadas especificamente para esse projeto. Construí uma estrutura simples utilizando express com Typescript, implementei as features aos poucos e preparei respostas para os erros de validação esperados.

Alguns detalhes que destaco são que não permito a entrada do RA na chamada do create, já que é um campo gerado automáticamente (*primary key*) e caso na edição algum *client* desavisado envie esses parâmetros o back-end trata de manter os campos com seus valores originais.