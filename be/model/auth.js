const mongoose = require("mongoose");

const authSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  cart: {
    type: Array,
  },
  order: {
    type: Array,
  },
  phone: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
});
let Auth = mongoose.model("Auth", authSchema);

module.exports = { Auth };
