import express, { Request, Response } from "express";
import { createConnection } from "typeorm";
import cors from "cors";

import Authenticate from "./middleware/Authenticate";
import PinData from "./model/PinData";
import User from "./model/User";
import AuthRoutes from "./routes/AuthRoutes";
import PinDataRoutes from "./routes/PinDataRoutes";
// import UserRoutes from "./routes/UserRoutes";

import path from "path";

const environment = process.env.ENV_TYPE || "DEV";

const app = express();

app.use(cors({ origin: "*" }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//routes
app.use("/api/auth", AuthRoutes);
// app.use("/users", Authenticate, UserRoutes);
app.use("/api/pinData", Authenticate, PinDataRoutes);
// app.use("/users", UserRoutes);
// app.use("/pinData" , PinDataRoutes);

//static route
app.use(express.static(path.join(__dirname, "views")));
app.use("/", (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, "views", "index.html"));
});

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
      : false,
})
  .then(() => {
    app.listen(PORT, () => console.log(`http://localhost:${PORT}`));
  })
  .catch((error) => {
    console.log(error);
  });
