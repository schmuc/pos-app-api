const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const userRoute = require("./routes/user");
const authenticationRoute = require("./routes/authentication");
const productRoute = require("./routes/product");
const cartRoute = require("./routes/cart");
const orderRoute = require("./routes/order");
const stripeRoute = require("./routes/stripe");
const cors = require("cors");


mongoose.connect(process.env.MONGO_URL)
    .then(()=>console.log("db connection successful"))
    .catch((err)=>{
        console.log(err);
    });

app.use(cors({
    origin: "http://localhost:3000",
}));
app.use(express.json());
app.use("/api/authentication", authenticationRoute);
app.use("/api/users", userRoute);
app.use("/api/products", productRoute);
app.use("/api/carts", cartRoute);
app.use("/api/orders", orderRoute);
app.use("/api/checkout", stripeRoute);

app.listen(process.env.PORT || 5000, ()=>{
    console.log("backend server is running");
});