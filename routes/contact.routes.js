const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors({ origin: "http://localhost:3000" })); // Permite solicitudes desde Next.js
app.use(express.json());

app.post("/api/contact", (req, res) => {
  const { name, email, message } = req.body;

  // Aquí manejarías el envío del mensaje: guardarlo en MongoDB o enviar por email
  console.log("Nuevo mensaje recibido:", { name, email, message });

  res.status(200).json({ success: true, message: "Mensaje recibido correctamente." });
});

app.listen(5000, () => {
  console.log("Servidor escuchando en el puerto 5000");
});
