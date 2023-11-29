const express = require("express");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");
var bodyParser = require("body-parser");
const morgan = require("morgan");
const helmet = require("helmet");
const dotenv = require("dotenv");
const authRoute = require("./routes/auth");
const productRoute = require("./routes/product");

dotenv.config();
//CONNECT DATABASE
mongoose.connect(('mongodb+srv://phamtiendung0926:dungpt3@isd.ll18o2e.mongodb.net/?retryWrites=true&w=majority'), () => {
    console.log("Connected to MongoDB");
});

app.use(bodyParser.json({limit:"50mb"}));
app.use(helmet());
app.use(cors());
app.use(morgan("common"));

//ROUTES
app.use("/v1/auth", authRoute);
app.use("/v1/product", productRoute);

app.listen(8000, () => {
  console.log("Server is running...");
});
