import dotend from "dotenv";
import path  from "path";

dotend.config({ path: path.join(process.cwd(), ".env") });
const DB_NAME = process.env.DATABASE_NAME;
// if (!process.env.DATABASE_URL) {
//     throw new Error("DATABASE_URL is not defined");
//   }
  
  if (!process.env.PORT) {
    throw new Error("PORT is not defined");
  }
  
  const port = process.env.PORT || "5000";
const databaseUrl = `mongodb+srv://${process.env.DATABASE_USER}:${process.env.DATABASE_PASS}@${process.env.DATABASE_HOST}/${DB_NAME}?${process.env.DATABASE_OPTIONS}`
export default {
  port,
  database_url: databaseUrl,
};

