O que é o Junta vagas:
========================

Projeto com a finalidade de centralizar vagas para programador de vários sites  em um único lugar.

Como usar **Github projects**
===============================

Link do vídeo: [link](documents/githuhProject.mp4)

Como usar **Github projects** explicação por texto:
====================================================
- Coluna **Backlog** são as funcionalidades que os clientes pedidem
- Coluna **Blocked** são as tarefas que estão bloqueadas por algum motivo. Exemplo: precisa que outra tarefa sejá finalizado ou precisa de um informação que está faltando.
- Coluna **To do** são as tarefas para serem feitas
- Coluna **In progress** são as tarefas que estão em progresso
- Coluna **Validate** as tarefas deve ser movidas para essa coluna quando elas foram finalizadas, então a pessoa que fez a tarefa deve abrir uma PR para que seja analisada a tarefa é se tudo estiver ok irá ser aprovado e assim que for aprovada o aprovador move a tarefa da coluna **Done**. OBS: o nome **Validate** por ser genérico permite não só validar o código da PR's mas também permitirá se caso exista um servidor de **teste** onde é adicionada as novas funcionalidades para validar se está ok antes de ir para produção.
- Coluna **Done** são as tarefas que foram finalizadas deve ser movidas para a coluna **Done**

Arquitetura que será utilizada no projeto:
=============================================

![Arquitetura do projeto Junta vagas](documents/solutionArchitectureSelectedToProject.png "Arquitetura do projeto")

![Arquitetura do projeto Junta vagas parte de notificação email e Discord](documents/solutionNotifyPerEmailDiscord.png "Arquitetura da parte de notificação por email and Discord")

 
- Tecnologias que serão utilizadas:
	- Frontend
		- Next.js
		- Tailwind
	- Api
		- Node.js
		- Javascript
		- Express.js
	- Banco de dados
		- Mongodb
    - Jobs(tarefas em background)
	    - Node.js
	    - Javacript
	    - Cron job para executa script em um determinado horário
	    - Sentry ferramenta para monitorar exceptions que possam ocorrer nas tarefas em background e notificar o time de devs
	
-    Explicação do uso das tecnologias
	 - Frontend
		 - Next.js com ele podemos utilizar o recurso de **SSR**  que irá permitir retorna uma página com conteúdo quando o robô de SEO do google for analisar a aplicação é irá ter um melhor rankeamento, pois não terá uma página com sem conteúdo.
		 - Tailwind como ele é muito utilizado nós projetos do **Fullstack master** creio que o time está mais familiarizado.

	 - Api
		 - Node.js e javascript serão utilizados pela boa performance e também devido o time já estar familiarizado com essas tecnologias
		 - Express.js devido a sua simplifica para criar um aplicação, também pelo fato de que não iremos desenvolver coisas extremamente complexas então não faz sentido utilizar Nest.js e pelo fato que o time já possui experiência com express.js.
     - Banco de dados
	    - Mongodb como o cenário do **Junta vaga** não é necessário controle de transações, e não precisa validações de tipos de dados mais restritiva, pelo fato de usar a flexibilidade da estrutura do banco sem gerar grande impacto como aconteceria em banco de dados **SQL**  e por final devido podemos configurar o mongodb no Mongo atlas que tem um **free tier** interessante.
	- Jobs(tarefas em background)
		- Node.js e javascript os motivos já foram explicados acima.
		- Cron job também conhecido como **tarefa agendada** onde um determinada tarefa executa é um horário especificado. No cenário do Junta vagas que pegar vagas de outros sites novas vagas podem aparecer de um dia para outro, então pode criar um tarefa agendada para extrair os dados por exemplo as 23h que pegar as novas vagas dos sites é coloca no banco de dados
		- Sentry essa um ferramenta que será utilizada para monitorar os erros das tarefas agendas. Como são tarefas em background você não consegui ver o erro com se vem em um api ou no frontend, então você só irá descobrir quando parar de funcionar. É ai entra o Sentry onde nós vamos capturar os erros dos jobs é envia para o Sentry que irá nós alerta o team de devs envia email por exemplo quando ocorrer um erro. 
	
	

**Fluxo de git para trabalhar no projeto**
===========================================

- Branchs principais:
	- **Master** contém o código que vai para produção
	- **Staging** contém o código que vai para o ambiente de teste para ser válido e que depois vai para o branch **Master**
	- **Develop** é o branch base para criar novas funcionalidades na aplicação.
- Novas features:
   - Executar o comando **git pull origin develop** antes de criar um novo branch **feature** para pegar  as atualizações
	- Criar um branch baseado no **develop** onde ele irá possuir a seguinte padrão de nome **feature/nome_da_feature** é a partir dai você começa o seu desenvolvimento
	- Quando finalizar a feature deve enviar o código para o repositório remoto é abrir uma **pull request** do seu branch feature para a **develop** onde irá conter um revisor no mínimo. 
	- Assim que aprovado é mergeado na develop o revisor abri uma **pull request** do branch **develop** para o **staging**
	- Aprovado e mergeado o **pull request** feito para o branch **staging** deve ser abrir uma **pull request** do branch **staging** para o **master**, porém antes de aprovar deve ser validado se está ok a nova funcionalidade no ambiente de **staging**, se está ok, aprovar **pull request** aberto para o branch **master**
- Padrão de commit:
	- O commit deve descrever o que você implementou
	- A mensagem deve ser escrita em inglês para que possamos já ir treinando para futuramente atuarmos no exterior 😊


**Estrutura inicial do projeto**
=================================

Essa é a estrutura que estou propondo para código da aplicação onde irá ter o **backend** e **frontend** no mesmo repositório com a finalidade de simplificar tendo tudo em um único lugar. Obs: o **backend** e **frontend** não vou compartilhar modules, cada irá ter o seu **node_modules**
```
junta-vagas
|
| -- backend // Diretório backend tem o código do backend
| ------- src // Todo o código fonte ficar aqui
| ----------- controllers // Diretório onde fica o código onde pegar os parâmetros enviados na requisão, executando algum lógica como por exemplo consultar no banco de dados e depois returna a responsa. Exemplo: arquivo ./src/controllers/newsletterController.js
| ----------- services // Diretório onde fica o código que tem as regras de negócio do aplicativo.
| ----------- jobs     // Diretório onde fica o código que será executado em background. Exemplo: terá um código que vai ser chamado 23h todos os dias onde os arquivos que extraem as vagas dos sites vão ser chamado para extrair as vagas e depois salvar no banco, nesse caso como é uma tarefa que é executada sem um usuário interagir com o aplicação se encaixa perfeitamente para um código que fica dentro desse diretório.
| ----------- crawlers // Diretório onde deve ficar o código dos crawlers responsáveis por extrair as informações de vagas dos sites como: Programathor, Vulpi, RemoteOk, Github(Backend br) e Github(Frontend br).
| ----------- routes // Diretório onde fica as rotas da aplicação
| ----------- index.js // Contém código que inicia servidor http usando express.js	
| -- frontend // Diretório frontend onde fica o código do frontend que segue a estrutura do palpitebox
| ------- pages // Onde é definida os arquivos que o nome será utiliza com rotas é irá renderizar o código dentro do arquivo.
| ------- utils // Onde fica o código que irá auxiliar em determinadas tarefas.
| ------- components // Onde fica código dos componentes que você irá resultar em mais de uma lugar na sua aplicação.
| ------- public // Onde fica imagens ou conteúdos que precisam ser públicos
| ------- css // Onde tem arquivo .css que carregar tailwind
| -- documents // São todos os documentos sobre o projeto
```

Regras para definir nome de arquivos no diretório backend:
-----------------------------------------------------------

- Quando for nomear arquivos deve seguir o seguinte padrão: **extractJobsSiteBackendbr.js**, **insertJobs.js** e **scheduleInsert.js**.



Estrutura inicial do banco de dados
========================================


![Estrutura inicial do banco de dados mongodb](documents/estrutura_inicial_banco_dados.png "estrutura do banco de dados")


Instruções para roda o backend na sua máquina:
==============================================

- Clonar o projeto
- Acessar o diretório **backend**
- Criar arquivo **.env** baseado no arquivo **.env.example** na raiz do diretório **backend**.
- Deve ser adicionado o seguinte conteúdo no arquivo .env:
```
DB_NAME=<database_name>
DB_USER=<database_admin_username>
DB_PASSWORD=<database_admin_password>
DB_URL=<database_url>
SMTP_HOST=<uri_smtp_service>
SMTP_PORT=<port_smtp_service>
SMTP_USER=<user_smtp_service>
SMTP_PASS=<password_smtp_service>
URL_NEWSLETTER=<newsletter_url>
USERNAME_DISCORD=<username_discord>
URL_WEBHOOK_DISCORD=<url_webhook_discord>

EMAIL_FROM=<email_from>
SENTRY_URL=<sentry_url>
```
- Executar o comando **npm install** para instalar o modules necessários para o backend rodar
- Executar o comando **npm run start:dev** que vai iniciar o servidor é mostrar uma mensagem com o endereço onde está rodando. OBS: Quando você roda esse comando ele está usando **nodemon** lib node.js que permite restart do servidor automáticamente quando fizer um alteração nos arquivos do projeto é salvar.
- Executar o comando **npm run jobs:dev** para rodar jobs que são a tarefas que são executadas em um determinado horário sem a necessidade da interação de uma pessoa.
- (Opcional) Executar o comando **docker-compose up -d** para criar um container docker com o mongodb para você. OBS: isso ser você tiver docker instalado na sua máquina é conhece a tecnologia, caso não, apenas ignore isso comando.


Instruções para rodar o backend em produção:
==============================================

- Clonar o projeto
- Acessar o diretório **backend**
- Criar arquivo **.env** baseado no arquivo **.env.example** na raiz do diretório **backend**.
- Deve ser adicionado o seguinte conteúdo no arquivo .env:
```
DB_NAME=<database_name>
DB_USER=<database_admin_username>
DB_PASSWORD=<database_admin_password>
DB_URL=<database_url>
SMTP_HOST=<uri_smtp_service>
SMTP_PORT=<port_smtp_service>
SMTP_USER=<user_smtp_service>
SMTP_PASS=<password_smtp_service>
URL_NEWSLETTER=<newsletter_url>
USERNAME_DISCORD=<username_discord>
URL_WEBHOOK_DISCORD=<url_webhook_discord>

EMAIL_FROM=<email_from>
SENTRY_URL=<sentry_url>
```
- Executar o command **npm install -g pm2** que é o pacote para gerenciar processo node.js em produção.
- Executar o comando **npm install** para instalar o modules necessários para o backend rodar
- Executar o comando **npm run start** vai criar um processo com o pm2 que inicia servidor é mostrar uma mensagem com o endereço onde está rodando.
- Executar o comando **npm run jobs** vai criar um processo com o pm2 para rodar os jobs que são a tarefas que são executadas em um determinado horário sem a necessidade da interação de uma pessoa.


Instruções para roda o frontend na sua máquina:
==============================================

- Clonar o projeto
- Acessar o diretório **frontend**
- Criar arquivo **.env** baseado no arquivo **.env.example** na raiz do diretório **backend**.
- Deve ser adicionado o seguinte conteúdo no arquivo .env:
```
NEXT_PUBLIC_API_URL_NEWSLETTER=<url_api_newsletter>
NEXT_PUBLIC_API_URL=<url_api>
API_URL=<url_api>
NEXT_PUBLIC_LINK_INVITE_DISCORD=<link_invite_discord>
```
- Executar o comando **npm install** para instalar o modules necessários para o backend rodar
- Executar o comando **npm run dev** que vai iniciar o servidor é mostrar uma mensagem com o endereço onde está rodando.
- Executar o comando **npm run server:fake** para criar um api com dados fakes para que a pessoa responsável por desenvolver alguma funcionalidade no frontend possa usar esse dados. Esse comando irá criar api no seguinte endereço **http://localhost:5000/jobs** que vai retorna dados fakes de vagas. OBS: a lib utilizada para fazer a api fake é **https://www.npmjs.com/package/json-server**
