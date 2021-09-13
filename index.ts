import express from "express";
import { createConnection, getRepository } from "typeorm";
import PinData from "./model/PinData";

import User from "./model/User";
import PinDataRoutes from "./routes/PinDataRoutes";
import UserRoutes from "./routes/UserRoutes";

const environment = process.env.ENV_TYPE || "DEV";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//routes
app.use("/users", UserRoutes);
app.use("/pinData", PinDataRoutes);

const PORT = process.env.PORT || 5000;

createConnection({
  type: "postgres",
  url:
    environment != "DEV"
      ? process.env.DATABASE_URL
      : "postgresql://ash:@localhost:5432/pinpin",
  synchronize: true,
  logging: true,
  entities: [User, PinData],
  ssl:
    environment != "DEV"
      ? {
          rejectUnauthorized: false,
        }
      : null,
})
  .then(() => {
    app.listen(PORT, () => console.log(`http://localhost:${PORT}`));
  })
  .catch((error) => {
    console.log(error);
  });
