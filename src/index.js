import dotenv from 'dotenv';
import express from "express";
import productRoutes from "./routes/products.router.js";
import cartRoutes from "./routes/carts.router.js";
import { __dirname } from "./utils.js";
import handlebars from "express-handlebars";
import homeRoute from "./routes/home.router.js";
import realTimeProductsRoute from "./routes/realTimeProducts.router.js";
import connectDB from "./db.js";
import { initializeSocket } from "./socket.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));
app.use("/api/products", productRoutes);
app.use("/api/carts", cartRoutes);
app.use("/home", homeRoute);
app.use("/realtimeproducts", realTimeProductsRoute);
app.use("/carts", cartRoutes); 

const httpServer = app.listen(PORT, () => {
  console.log("server ready on port " + PORT);
});

initializeSocket(httpServer);
connectDB();