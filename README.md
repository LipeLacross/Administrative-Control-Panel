## 🌐 [English Version of README](README_EN.md)

# Painel Administrativo

Este projeto é um painel administrativo construído com Angular para gerenciar inventário, vendas e relatórios de uma empresa. Ele oferece funcionalidades essenciais para monitorar e gerenciar os produtos e relatórios de vendas, tudo de maneira centralizada e organizada.

## 🔨 Funcionalidades do Projeto

- Dashboard com informações resumidas sobre vendas, inventário e relatórios.
- Gerenciamento de inventário: adicionar, atualizar e remover itens.
- Relatórios detalhados: gerar e visualizar relatórios.
- Gestão de vendas: adicionar e monitorar vendas, produto mais vendido, etc.

### Exemplo Visual do Projeto

![chrome-capture-2024-10-20](https://github.com/user-attachments/assets/46d2ec01-ee51-42e4-a50d-418613eca77d)

## ✔️ Técnicas e Tecnologias Utilizadas

- **Angular**: Framework para construir a interface do usuário.
- **Bulma**: Framework CSS para estilização moderna e responsiva.
- **Node.js & Express**: Backend para fornecer APIs REST.
- **MongoDB**: Banco de dados NoSQL para armazenar os dados da aplicação.
- **Font Awesome**: Para os ícones utilizados na interface.

## 📁 Estrutura do Projeto

- **LICENSE**: Arquivo de licença do projeto.
- **README.md**: Documentação do projeto.
- **angular.json**: Configuração do Angular CLI.
- **my-backend/**
  - **app.js**: Arquivo principal do backend.
  - **config/**
    - **db.config.js**: Configuração do banco de dados MongoDB.
  - **controllers/**
    - **inventory.controller.js**: Lógica para o gerenciamento do inventário.
    - **reports.controller.js**: Lógica para os relatórios.
    - **sales.controller.js**: Lógica para as vendas.
  - **models/**
    - **inventory.model.js**: Modelo de dados do inventário.
    - **reports.model.js**: Modelo de dados dos relatórios.
    - **sales.model.js**: Modelo de dados das vendas.
  - **routes/**
    - **inventory.routes.js**: Rotas para o inventário.
    - **reports.routes.js**: Rotas para os relatórios.
    - **sales.routes.js**: Rotas para as vendas.
  - **server.js**: Servidor Express para rodar a aplicação.
  - **package.json**: Dependências do backend.
  - **package-lock.json**: Controle de versão das dependências do backend.
- **public/**
  - **favicon.ico**: Ícone do site.
  - **favicon.svg**: Ícone SVG do site.
- **src/**
  - **app/**
    - **app-routing.module.ts**: Módulo de rotas do Angular.
    - **app.component.***: Componentes principais da aplicação.
    - **app.config.ts**: Configuração da aplicação Angular.
    - **app.module.ts**: Módulo principal do Angular.
    - **app.routes.ts**: Rotas do projeto.
    - **components/**
      - **dashboard/**: Componentes do Dashboard.
      - **inventory/**: Componentes do Inventário.
      - **reports/**: Componentes dos Relatórios.
      - **sales/**: Componentes de Vendas.
  - **index.html**: Arquivo HTML principal.
  - **main.ts**: Ponto de entrada da aplicação.
  - **models/**
    - **inventory.model.ts**: Modelo de dados do inventário no frontend.
    - **reports.model.ts**: Modelo de dados dos relatórios no frontend.
    - **sales.model.ts**: Modelo de dados das vendas no frontend.
  - **polyfills.ts**: Configurações de compatibilidade com navegadores antigos.
  - **services/**
    - **inventory.service.ts**: Serviço para comunicação com o backend (inventário).
    - **reports.service.ts**: Serviço para comunicação com o backend (relatórios).
    - **sales.service.ts**: Serviço para comunicação com o backend (vendas).
  - **styles.css**: Estilizações gerais do projeto, utilizando Bulma.
- **tsconfig.app.json**: Configurações do TypeScript para a aplicação.
- **tsconfig.json**: Configurações gerais do TypeScript.
- **tsconfig.spec.json**: Configurações do TypeScript para testes.

## 🛠️ Abrir e rodar o projeto

Para iniciar o projeto localmente, siga os passos abaixo:

1. **Certifique-se de que o Node.js está instalado**:
  - O [Node.js](https://nodejs.org/) é necessário para rodar o projeto. Você pode verificar se já o tem instalado com:

    ```bash
    node -v
    ```

  - Se não estiver instalado, baixe e instale a versão recomendada.

2. **Clone o Repositório**:
  - Copie a URL do repositório e execute o comando abaixo no terminal:

    ```bash
    git clone <URL_DO_REPOSITORIO>
    ```

3. **Instale as dependências**:
  - Navegue até a pasta do projeto e execute:

    ```bash
    npm install
    ```

4. **Inicie o servidor**:
  - Para iniciar o backend, navegue até a pasta `my-backend/` e rode o comando:

    ```bash
    node app.js
    ```
  - Para iniciar o frontend, na raiz do projeto rode:

    ```bash
    ng serve
    ```

5. **Acesse a aplicação**:
  - Abra o navegador e acesse `http://localhost:4200` para visualizar o painel administrativo.

## 🌐 Deploy

Você pode fazer o deploy deste projeto em plataformas de hospedagem como [Heroku](https://www.heroku.com/), [Netlify](https://www.netlify.com/) ou [Vercel](https://vercel.com/). Certifique-se de configurar as variáveis de ambiente adequadamente para conectar ao banco de dados e outros serviços externos.

