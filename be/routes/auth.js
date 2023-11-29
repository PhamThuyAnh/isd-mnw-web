const authController = require("../controllers/authController");

const router = require("express").Router();

router.post("/signup", authController.addAuth);
router.post("/login", authController.login);
router.get("/profile", authController.getProfile);
router.post("/profile", authController.editProfile);
router.post("/change-password", authController.changePassword);

router.post("/mail", authController.sendMail);
module.exports = router;