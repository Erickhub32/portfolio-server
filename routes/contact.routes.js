const router = require('express').Router();


// Configuración correcta para preflight (OPTIONS request)
router.options("/", (req, res) => {
  res.header('Access-Control-Allow-Origin', process.env.ORIGIN || 'http://localhost:3000');
  res.header('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.status(200).send();
});

router.post("/", (req, res) => {
  const { name, email, message } = req.body;

  console.log("Nuevo mensaje recibido:", { name, email, message });

  res.setHeader('Access-Control-Allow-Origin', process.env.ORIGIN || 'http://localhost:3000');
  res.status(200).json({ message: "Mensaje enviado correctamente" });
});

module.exports = router;
