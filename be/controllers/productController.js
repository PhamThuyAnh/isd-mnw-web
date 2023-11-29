const { Auth } = require('../model/auth');
const { Product } = require('../model/product');
const authController = require('./authController');
var ObjectId = require('mongoose').Types.ObjectId;
const { v4: uuidv4 } = require('uuid');

const productController = {
  getAllProducts: async (req, res) => {
    let querySearch = {}
    if (req?.query?.category) {
      querySearch.category = req?.query?.category
    }
    let products = await Product.find(querySearch);
    console.log(products)
    res.status(200).json(products)
  },
  getDetailProducts: async (req, res) => {
    let products = await Product.findOne({ _id: new ObjectId(req.params.id) });
    res.status(200).json(products)
  },
  addProductToCart: async (req, res) => {
    const { main_img, price, name, id } = req.body;
    let username = req.headers.authorization ? authController.checkTokenExpire(req.headers.authorization.split(" ")[1]) : '';
    if (username) {
      let user = await Auth.findOne({ username: username });
      let tempCartAdd = JSON.parse(JSON.stringify(user?.cart));
      if (tempCartAdd.length > 0) {
        let foundIndex = tempCartAdd.findIndex(x => x.id == id);
        console.log(foundIndex, 'foundIndex')
        if (foundIndex != -1) {
          tempCartAdd[foundIndex].quantity = tempCartAdd[foundIndex].quantity + 1;
        } else {
          tempCartAdd.push({
            id: id,
            name: name,
            quantity: 1,
            price: price,
            main_img: main_img
          })
        }
      } else {
        tempCartAdd.push({
          id: id,
          name: name,
          quantity: 1,
          price: price,
          main_img: main_img
        })
      }
      console.log(tempCartAdd, 'tempCartAdd')
      let doc = await Auth.findOneAndUpdate({ username: username }, { cart: tempCartAdd });
      if (doc) {
        res.status(200).send('success')
      } else {
        res.status(500).send('error')
      }
    } else {
      res.status(500).json('het han token')
    }
  },

  removeProductToCart: async (req, res) => {
    const { name, id } = req.body;
    let username = req.headers.authorization ? authController.checkTokenExpire(req.headers.authorization.split(" ")[1]) : '';
    if (username) {
      let user = await Auth.findOne({ username: username });
      let tempCart = JSON.parse(JSON.stringify(user?.cart));
      let foundIndex = tempCart.findIndex(x => x.id == id);
      if (tempCart[foundIndex].quantity == 1) {
        tempCart = tempCart.filter(function (obj) {
          return obj.id !== id;
        });
      } else {
        tempCart[foundIndex].quantity = tempCart[foundIndex].quantity - 1;
      }
      let doc = await Auth.findOneAndUpdate({ username: username }, { cart: tempCart });
      if (doc) {
        res.status(200).send('success')
      } else {
        res.status(500).send('error')
      }
    } else {
      res.status(401).json('het han token')
    }
  },

  addOrder: async (req, res) => {
    const data = JSON.parse(JSON.stringify(req.body));
    let username = req.headers.authorization ? authController.checkTokenExpire(req.headers.authorization.split(" ")[1]) : '';
    if (username) {
      let user = await Auth.findOne({ username: username });
      let newOrder = [];
      if (user?.order?.length) {
        newOrder = [...user?.order, { ...data, id: uuidv4() }]
      } else {
        newOrder.push({ ...data, id: uuidv4() });
      }
      let doc = await Auth.findOneAndUpdate({ username: username }, { order: newOrder, cart: [] });
      if (doc) {

        res.status(200).send('success')
      } else {
        res.status(500).send('error')
      }
    } else {
      res.status(401).json('het han token')
    }
  },
}

module.exports = productController;