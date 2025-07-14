import jwt from "jsonwebtoken";
import userRepository from "../repositories/user.repositories.js";
import bcrypt from "bcrypt";

function generateJWT(id) {
  return jwt.sign({ id }, process.env.SECRET_JWT, { expiresIn: "1d" });
}

async function loginService(email, password) {
  const user = await userRepository.findUserByEmailRepository(email);

  if (!user) {
    throw new Error("Email ou senha inválidos.");
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw new Error("Email ou senha inválidos.");
  }

  return generateJWT(user.id);
}

export { generateJWT, loginService };
