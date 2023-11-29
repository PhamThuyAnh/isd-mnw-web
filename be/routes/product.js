const productController = require("../controllers/productController");

const router = require("express").Router();

router.get("/get-all-product", productController.getAllProducts);
router.get("/get-detail-product/:id", productController.getDetailProducts);
router.post("/add-cart", productController.addProductToCart);
router.post("/remove-cart", productController.removeProductToCart);
// router.delete("/remove-all-cart", productController.deleteAllCart);
router.post("/add-order", productController.addOrder);
module.exports = router;