const express = require("express");
const productSchema = require("../models/product");
const categorieSchema = require("../models/categorie");

const router = express.Router();


router.post("/product", (req, res) => {
  const { nombre, precio, descripcion, categoria } = req.body;
  
  categorieSchema.findById(categoria)
    .then((cat) => {
      if (!cat) {
        return res.status(404).json({ message: "Categoría no encontrada" });
      }

      const product = new productSchema({
        nombre,
        precio,
        descripcion,
        categoria
      });

      return product.save();
    })
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

router.get("/product", (req, res) => {
  productSchema
    .find()
    .populate('categoria', 'nombre')
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

router.get("/product/:id", (req, res) => {
  const { id } = req.params;
  productSchema
    .findById(id)
    .populate('categoria', 'nombre')
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});


router.put("/product/:id", (req, res) => {
  const { id } = req.params;
  const { nombre, precio, descripcion, categoria } = req.body;

  categorieSchema.findById(categoria)
    .then((cat) => {
      if (!cat) {
        return res.status(404).json({ message: "Categoría no encontrada" });
      }

      return productSchema.updateOne({ _id: id }, { $set: { nombre, precio, descripcion, categoria } });
    })
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});


router.delete("/product/:id", (req, res) => {
  const { id } = req.params;
  productSchema
    .deleteOne({ _id: id })
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

module.exports = router;
