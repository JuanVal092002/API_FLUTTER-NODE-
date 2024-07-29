const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
  nombre: {
    type: String,
    required: true
  },
  precio: {
    type: Number,
    required: true
  },
  descripcion: {
    type: String,
    required: true
  },
  categoria: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Categorie',
    required: true
  }
});

module.exports = mongoose.model('Product', productSchema);
