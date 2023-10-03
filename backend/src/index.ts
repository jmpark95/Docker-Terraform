import * as express from "express";
import * as cors from "cors";
import "dotenv/config";
import "reflect-metadata";
import { AppDataSource } from "./data-source";
import { User } from "./entity/User";
const port = process.env.PORT || 3000;
const app = express();

//DB
AppDataSource.initialize()
   .then(() => {
      console.log("Data Source has been initialized!");
   })
   .catch((err) => {
      console.error("Error during Data Source initialization", err);
   });

//Middleware
app.use(express.json());
app.use(
   cors({
      origin: process.env.FRONTEND_URL,
   })
);

//Endpoints
app.get("/users", async function (req, res) {
   const users = await AppDataSource.getRepository(User).find();
   res.json(users);
});

app.listen(port, () => console.log(`Server ready at: http://localhost:${port}`));
