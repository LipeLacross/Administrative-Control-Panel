## 🌐 [Versão em Português do README](README_PT.md)

# Administrative Panel

This project is an administrative panel built with Angular to manage inventory, sales, and reports for a company. It provides essential functionalities to monitor and manage products and sales reports in a centralized and organized manner.

## 🌺 Project Features

- Dashboard with summarized information on sales, inventory, and reports.
- Inventory management: add, update, and remove items.
- Detailed reports: generate and view reports.
- Sales management: add and monitor sales, top-selling product, etc.

### Visual Example of the Project

![chrome-capture-2024-10-20](https://github.com/user-attachments/assets/46d2ec01-ee51-42e4-a50d-418613eca77d)

## ✔️ Technologies and Techniques Used

- **Angular**: Framework for building the user interface.
- **Bulma**: CSS framework for modern and responsive styling.
- **Node.js & Express**: Backend to provide REST APIs.
- **MongoDB**: NoSQL database to store application data.
- **Font Awesome**: For icons used in the interface.

## 📁 Project Structure

- **LICENSE**: Project license file.
- **README.md**: Project documentation.
- **angular.json**: Angular CLI configuration.
- **my-backend/**
  - **app.js**: Backend main file.
  - **config/**
    - **db.config.js**: MongoDB database configuration.
  - **controllers/**
    - **inventory.controller.js**: Logic for inventory management.
    - **reports.controller.js**: Logic for reports.
    - **sales.controller.js**: Logic for sales.
  - **models/**
    - **inventory.model.js**: Inventory data model.
    - **reports.model.js**: Reports data model.
    - **sales.model.js**: Sales data model.
  - **routes/**
    - **inventory.routes.js**: Routes for inventory.
    - **reports.routes.js**: Routes for reports.
    - **sales.routes.js**: Routes for sales.
  - **server.js**: Express server to run the application.
  - **package.json**: Backend dependencies.
  - **package-lock.json**: Dependency version control for backend.
- **public/**
  - **favicon.ico**: Site icon.
  - **favicon.svg**: Site SVG icon.
- **src/**
  - **app/**
    - **app-routing.module.ts**: Angular routing module.
    - **app.component.***: Main components of the application.
    - **app.config.ts**: Angular application configuration.
    - **app.module.ts**: Main Angular module.
    - **app.routes.ts**: Project routes.
    - **components/**
      - **dashboard/**: Dashboard components.
      - **inventory/**: Inventory components.
      - **reports/**: Reports components.
      - **sales/**: Sales components.
  - **index.html**: Main HTML file.
  - **main.ts**: Application entry point.
  - **models/**
    - **inventory.model.ts**: Frontend inventory data model.
    - **reports.model.ts**: Frontend reports data model.
    - **sales.model.ts**: Frontend sales data model.
  - **polyfills.ts**: Browser compatibility settings.
  - **services/**
    - **inventory.service.ts**: Service for backend communication (inventory).
    - **reports.service.ts**: Service for backend communication (reports).
    - **sales.service.ts**: Service for backend communication (sales).
  - **styles.css**: General project styles using Bulma.
- **tsconfig.app.json**: TypeScript configuration for the application.
- **tsconfig.json**: General TypeScript configuration.
- **tsconfig.spec.json**: TypeScript configuration for testing.

## 🚀 Getting Started

To run the project locally, follow the steps below:

1. **Ensure Node.js is installed**:
- [Node.js](https://nodejs.org/) is required to run the project. You can verify if it's installed by running:

  ```bash
  node -v
  ```

- If not installed, download and install the recommended version.

2. **Clone the Repository**:
- Copy the repository URL and run the following command in the terminal:

  ```bash
  git clone <REPOSITORY_URL>
  ```

3. **Install dependencies**:
- Navigate to the project folder and run:

  ```bash
  npm install
  ```

4. **Start the server**:
- To start the backend, navigate to the `my-backend/` folder and run:

  ```bash
  node app.js
  ```
- To start the frontend, in the project root, run:

  ```bash
  ng serve
  ```

5. **Access the application**:
- Open your browser and go to `http://localhost:4200` to view the administrative panel.

## 🌐 Deploy

You can deploy this project on hosting platforms such as [Heroku](https://www.heroku.com/), [Netlify](https://www.netlify.com/), or [Vercel](https://vercel.com/). Make sure to configure environment variables properly to connect to the database and other external services.

