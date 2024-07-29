const express = require("express");
const categorieSchema = require("../models/categorie");

const router = express.Router();


router.post("/categorie", (req, res) => {
  const categorie = new categorieSchema(req.body);
  categorie.save()
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

router.get("/categorie", (req, res) => {
  categorieSchema
    .find()
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

router.get("/categorie/:id", (req, res) => {
  const { id } = req.params;
  categorieSchema
    .findById(id)
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

router.put("/categorie/:id", (req, res) => {
  const { id } = req.params;
  const { nombre } = req.body;
  categorieSchema
    .updateOne({ _id: id }, { $set: { nombre } })
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

router.delete("/categorie/:id", (req, res) => {
  const { id } = req.params;
  categorieSchema
    .deleteOne({ _id: id })
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

module.exports = router;
