const mongoose = require("mongoose");

const categorieSchema = mongoose.Schema({
  nombre: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Categorie', categorieSchema);
