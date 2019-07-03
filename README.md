# psoft-frontend
Repositório de frontend da disciplina Projeto de Software.

## Explicação da arquitetura

Não foram utilizadas bibliotecas adicionais, apenas um css externo para utilização de icones: https://fontawesome.com/.

O padrão utilizado foi MVC + CBA

O frontend foi separado nas seguintes pastas:
--html
--css
--javascript
    --components
    --controllers
    --models
    --views

A pasta html contém os arquivos HTML do projeto, como a página inicial, de pesquisa, perfil da disciplina e ranking.

A pasta css contém arquivos de CSS do projeto, usados para estilizar o site.

A pasta javascript contém os arquivos JavaScript do projeto.

Na pasta components há a classe utilizada para criar um webcomponent de um comentário, utilizado no perfil das disciplinas.

Na pasta controllers há os controladores da aplicação:
###CommentController
Controlador de comentários.
###ListDisciplines
Controlador das disciplinas.
###SearchController
Controlador da pesquisa de disciplinas.
###UserController
Controlador do usuário (login e registro).

Na pasta models há os models utilizados na aplicação:
###Endpoints
Utilizado para os endpoints da API.
###Requests
Utilizado para os requests GET, POST...
###User
Utilizado para representar o usuário.

Na pasta views há os arquivos que modificam a view:
###Discipline
Modifica a página da disciplina.
###Forms
Modifica a página para os formulários de login e cadastro.
###Ranking
Modifica a página do ranking de disciplinas.
###Search
Modifica a página de pesquisa.

Os arquivos da pasta view apresentam respostas ao usuário e pegam valores da página, passando para o controller que decidirá o que fazer com os valores e retornar respostas, utilizando models.