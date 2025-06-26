import bcrypt from "bcrypt";
import userRepository from "../repositories/user.repositories.js";
import userRepositories from "../repositories/user.repositories.js";

async function createUserService(newUser) {
  const foundUser = await userRepository.findUserByEmailRepository(
    newUser.email
  );

  if (foundUser) throw new Error("User already exists!");

  const passHash = await bcrypt.hash(newUser.password, 10);
  const user = await userRepository.createUserRepository({
    ...newUser,
    password: passHash,
  });
  if (!user) throw new Error("Error creating user!");
  return user;
}

async function findAllUsersService() {
  const users = await userRepository.findAllUserRepository();
  return users;
}

async function findUserByIdService(id) {
  const user = await userRepository.findUserByIdRepository(id);
  if (!user) throw new Error("User not found!");
  return user;
}

async function updateUserService(newUser, userId) {
  const user = await userRepository.findUserByIdRepository(userId);
  if (!user) throw new Error("User not found!");
  if (newUser.password) {
    newUser.password = await bcrypt.hash(newUser.password, 10);
  }
  const userUpdated = userRepository.updateUserRepository(userId, newUser);
  return userUpdated;
}

export default {
  createUserService,
  findAllUsersService,
  findUserByIdService,
  updateUserService,
};
