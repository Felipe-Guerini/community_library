import { tr } from "zod/v4/locales";
import userService from "../service/user.services.js";

async function createUserController(req, res) {
  const newUser = req.body;
  try {
    const user = await userService.createUserService(newUser);
    res.status(201).send({ user });
  } catch (err) {
    return res.status(400).send(err.message);
  }
}

async function findAllUserController(req, res) {
  try {
    const users = await userService.findAllUsersService();
    res.send({ users });
  } catch (e) {
    return res.status(404).send(e.message);
  }
}

async function findUserByIdController(req, res) {
  const { id } = req.params;
  try {
    const user = await userService.findUserByIdService(id);
    console.log(user);
    res.send({ user });
  } catch (e) {
    return res.status(404).send(e.message);
  }
}

async function updateUserController(req, res) {
  const { id } = req.params;
  const newUser = req.body;

  try {
    const user = await userService.updateUserService(newUser, id);
    res.send({ user });
  } catch (e) {
    return res.status(404).send(e.message);
  }
}

export default {
  createUserController,
  findAllUserController,
  findUserByIdController,
  updateUserController,
};
