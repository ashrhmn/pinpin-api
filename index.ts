import express from "express";
import { createConnection, getRepository } from "typeorm";
import PinData from "./model/PinData";

import User from "./model/User";
import PinDataRoutes from "./routes/PinDataRoutes";
import UserRoutes from "./routes/UserRoutes";

const app = express();

app.use(express.json());

//routes
app.use('/users',UserRoutes)
app.use('/pinData',PinDataRoutes)

const PORT = process.env.PORT || 5000;

createConnection({
  type: "postgres",
  url: process.env.DATABASE_URL || "postgresql://ash:@localhost:5432/pinpin",
  synchronize: true,
  logging: true,
  entities: [User, PinData],
  ssl: process.env.PORT
    ? {
        rejectUnauthorized: false,
      }
    : null,
})
  .then((connection) => {
    // console.log(connection);
    console.log(process.env);
    
    app.listen(PORT, () => console.log(`http://localhost:${PORT}`));
  })
  .catch((error) => {
    console.log(error);
  });
