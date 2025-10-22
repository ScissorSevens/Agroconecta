import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import router from "./routes/index.js"; // ⚠️ Nota la extensión .js
import { connectDB } from "./config/database.js";
import { firebaseAdmin } from "./config/firebase.js";



dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

// Rutas
app.use("/", router);

// Manejo de rutas no encontradas (opcional)
app.use((_req, res) => {
  res.status(404).json({
    error: "Route not found",
  });
});


connectDB()
  .then(() => {
    app.listen(port, () => {
      console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
    });
  })
  .catch((error) => {
    console.error("Failed to connect to database:", error);
    process.exit(1);
  });

  firebaseAdmin.auth().listUsers(1)
  .then(() => console.log("✅ Firebase Admin inicializado correctamente"))
  .catch((err) => console.error("❌ Error al inicializar Firebase Admin", err));


app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});