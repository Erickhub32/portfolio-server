const router = require("express").Router();


// Define el endpoint POST para /api/contact
router.post("/", async (req, res) => {
  const { name, email, message } = req.body;
  // Aquí procesa y guarda el mensaje, o envíalo por email, etc.
  console.log("Nuevo mensaje recibido:", { name, email, message });
  res.status(200).json({ message: "Mensaje enviado correctamente" });
});

module.exports = router;
