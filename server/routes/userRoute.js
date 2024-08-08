import express from "express";
import {
  create,
  getAllUsers,
  getUserById,
  update,
  deleteById,
} from "../controller/useController.js";

const route = express.Router();

route.post("/user", create);
route.get("/users", getAllUsers);
route.get("/user/:id", getUserById);
route.put("/update/user/:id", update);
route.delete("/delete/user/:id", deleteById);
export default route;
