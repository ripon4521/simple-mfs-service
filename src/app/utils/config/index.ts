import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.join(process.cwd(), ".env") });

const DB_NAME = process.env.DATABASE_NAME;

if (!process.env.DATABASE_USER || !process.env.DATABASE_PASS) {
  throw new Error("DATABASE_USER or DATABASE_PASS is not defined");
}

if (!process.env.PORT) {
  throw new Error("PORT is not defined");
}

if (!DB_NAME) {
  throw new Error("DATABASE_NAME is not defined");
}

const port = process.env.PORT || 3000;

// Updated database URL with DB_NAME
const databaseUrl = `mongodb+srv://${process.env.DATABASE_USER}:${process.env.DATABASE_PASS}@cluster0.b1mistq.mongodb.net/${DB_NAME}?retryWrites=true&w=majority&appName=Cluster0`;

export default {
  port,
  database_url: databaseUrl,
  bcrypt_salt_rounds: process.env.BCRYPT_SALT_ROUNDS,
  
};
