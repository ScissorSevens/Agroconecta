import mongoose from "mongoose";

export const connectDB = async (): Promise<void> => {
  try {
    const mongoURI = process.env.MONGODB_URI; // Cambié MONGO_URI a MONGODB_URI
    
    if (!mongoURI) {
      throw new Error("MONGODB_URI no está definida en las variables de entorno");
    }

    await mongoose.connect(mongoURI);
    
    console.log("✅ MongoDB conectado exitosamente");
  } catch (error) {
    console.error("❌ Error al conectar MongoDB:", error);
    process.exit(1);
  }
};

mongoose.connection.on("disconnected", () => {
  console.log("⚠️ MongoDB desconectado");
});

mongoose.connection.on("error", (error) => {
  console.error("❌ Error en MongoDB:", error);
});