import dotenv from 'dotenv';
import express from "express";
import cookieParser from "cookie-parser";
import passport from 'passport';
import productRoutes from "./routes/products.router.js";
import cartRoutes from "./routes/carts.router.js";
import sessionRoutes from './routes/session.router.js';
import usersRouter from "./routes/user.router.js";
import homeRoute from "./routes/home.router.js";
import realTimeProductsRoute from "./routes/realTimeProducts.router.js";
import viewsRouter from './routes/views.router.js';
import { __dirname } from "./utils.js";
import connectDB from "./db.js";
import { initializeSocket } from "./socket.js";
import handlebars from "express-handlebars";
import initializePassport from "./config/passport.config.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(passport.initialize());
initializePassport();

app.use(express.static(__dirname + "/public"));

app.use('/', viewsRouter);
app.use("/api/products", productRoutes);
app.use("/api/carts", cartRoutes);
app.use("/home", homeRoute);
app.use("/realtimeproducts", realTimeProductsRoute);
app.use('/api/sessions', sessionRoutes);
app.use("/api/users/", usersRouter);

app.use('*', (req, res) => {
  return res.status(404).send('<h1>Error 404: Not Found</h1>');
});

app.use((error, req, res, next) => {
  console.error('Error:', error.message);
  res.status(500).send('<h1>Error 500: Server Error</h1>');
});

const httpServer = app.listen(PORT, () => {
  console.log("server ready on port " + PORT);
  connectDB();
});

initializeSocket(httpServer);