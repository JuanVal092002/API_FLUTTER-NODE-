const express = require("express");
const userSchema = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const router = express.Router();


router.post("/login", async (req, res) => {
    const { correo, contraseña } = req.body;

  
  if (!correo || !contraseña) {
    return res.status(400).json({ message: "El correo y la contraseña son obligatorios." });
  }

  try {
    
    const user = await userSchema.findOne({ correo });

    
    if (!user) {
      return res.status(400).json({ message: "Correo o contraseña incorrectos." });
    }

    
    const comparePassword = await bcrypt.compare(contraseña, user.contraseña);

   
    if (!comparePassword) {
      return res.status(400).json({ message: "Correo o contraseña incorrectos." });
    }

    
    const token = jwt.sign({ id: user._id }, process.env.SECRET_JWT, {
      expiresIn: "1h",
    });

    
    return res.status(200).json({ message: "Inicio de sesión exitoso", token });
  } catch (error) {
    return res.status(500).json({ message: "Error en el servidor", error });
  }
});


router.post("/verifyToken", async (req, res) => {
  const { token } = req.body;

  
  if (!token) {
    return res.status(400).json({ message: "Token no proporcionado." });
  }

  jwt.verify(token, process.env.SECRET_JWT, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Token inválido." });
    } else {
      return res.status(200).json({ decoded });
    }
  });
});

module.exports = router;
