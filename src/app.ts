import userRoutes from "@routes/userRoutes";
import dotenv from "dotenv";
import express from "express";
import cors from "cors"; // Importa cors

dotenv.config();

const app = express();

// CONFIGURACIÓN CORS - Agrega esto JUSTO DESPUÉS de crear la app
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
}));

// Middleware para parsear JSON
app.use(express.json());

// Rutas
app.use("/api", userRoutes);

export default app;
