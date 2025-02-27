# Express TypeScript MongoDB Starter

This project is a starter template for building a RESTful API using TypeScript, Express, MongoDB, and Mongoose.

## Features

- TypeScript for static typing
- Express for handling HTTP requests
- Mongoose for MongoDB object modeling
- Basic CRUD operations

## Requirements

- Node.js (>= 14.x)
- npm (>= 6.x) or yarn (>= 1.x)
- MongoDB (>= 4.x)

## Installation

1. **Clone the repository:**

    ```sh
    git clone https://github.com/ripon4521/level2-assignment2.git
    cd your-repo-name
    ```

2. **Install dependencies:**

    Using npm:
    ```sh
    npm install
    ```

    Using yarn:
    ```sh
    yarn install
    ```

3. **Set up environment variables:**

    Create a `.env` file in the root of the project and add the following:

    ```env
    PORT=3000
    MONGODB_URI=mongodb://localhost:27017/your-database-name
    ```

4. **Compile TypeScript to JavaScript:**

    Using npm:
    ```sh
    npm run build
    ```

    Using yarn:
    ```sh
    yarn build
    ```

5. **Start the application:**

    Using npm:
    ```sh
    npm start
    ```

    Using yarn:
    ```sh
    yarn start
    ```

    The server should now be running on `http://localhost:3000`.

## Development

During development, you can use the following commands:

- **Run the application in development mode with auto-reloading:**

    Using npm:
    ```sh
    npm run dev
    ```

    Using yarn:
    ```sh
    yarn dev
    ```

- **Run TypeScript compiler in watch mode:**

    Using npm:
    ```sh
    npm run watch
    ```

    Using yarn:
    ```sh
    yarn watch
    ```

## Project Structure

```plaintext
├── src
│   ├── controllers
│   │   └── productController.ts
│   ├── models
│   │   └── productModel.ts
│   ├── routes
│   │   └── productRoutes.ts
│   ├── services
│   │   └── productServices.ts
│   ├── validations
│   │   └── productValidation.ts
│   ├── app.ts
│   └── server.ts
├── .env
├── .gitignore
├── package.json
├── tsconfig.json
└── README.md
