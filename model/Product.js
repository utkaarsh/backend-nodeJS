const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema({
  name: String,
  image: String,
  price: Number,
  quantity: Number,
  status: Boolean,
  category: String,
});

module.exports = mongoose.model("Product", productSchema);
