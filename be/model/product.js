const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required:true
  },
  price: {
    type: String,
    required:true
},
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Auth",
},
description: {
  type: String,
},
category: {
  type: String,
  required:true
},
});
let Product = mongoose.model("Product", productSchema);

module.exports = { Product };
