const express = require("express");

require('express-async-errors');
require("dotenv").config();
const app = express();
const connectdb = require("./db/connect");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const UserRouter = require("./routes/UserRouter");
const ProductRouter = require("./routes/ProductRouter");
const OrderRouter = require("./routes/OrderRouter");
const ReviewRouter = require("./routes/reviewRouter");
const recommendations = require('./routes/rec')
const cookieParser = require('cookie-parser');
// route

app.use(express.json());
app.use(express.text());
app.use(cookieParser(process.env.JWT_SECRET));
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('./public'));
app.use(fileUpload());
app.use("/api/v1/users", UserRouter);
app.use("/api/v1/rec", recommendations);
app.use("/api/v1/products", ProductRouter);
app.use("/api/v1/orders", OrderRouter);
app.use("/api/v1/reviews", ReviewRouter);
// middleware
const notFoundMiddleware = require('./middleware/notFoundMiddleware');
const errorHandlerMiddleware = require('./middleware/errorHandlerMiddleware');
// end


app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);
const port = process.env.PORT || 5000;
const start = async () => {
  await connectdb("mongodb://localhost:27017/Computer");
  app.listen(port, () => console.log("listen to port " + port));
};

start();
