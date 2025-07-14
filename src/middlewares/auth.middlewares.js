import jwt from "jsonwebtoken";
import userService from "../service/user.services.js";

export function authMiddleware(req, res, next) {
  const { authorization: tokenHeader } = req.headers;

  if (!tokenHeader) {
    return res.status(401).send({ message: "O token não foi informado!" });
  }

  const partsToken = tokenHeader.split(" ");
  if (partsToken.length !== 2) {
    return res.status(401).send({ message: "Formato de token inválido" });
  }

  const [schema, token] = partsToken;

  if (!/^Bearer$/i.test(schema)) {
    return res
      .status(401)
      .send({ message: "Token malformatado. Deve ser 'Bearer'." });
  }

  jwt.verify(token, process.env.SECRET_JWT, async (err, decoded) => {
    if (err) {
      if (err.name === "TokenExpiredError") {
        return res.status(401).send({ message: "Token expirado." });
      }
      if (err.name === "JsonWebTokenError") {
        return res.status(401).send({ message: "Token inválido." });
      }
      return res.status(401).send({ message: "Não autorizado." });
    }

    try {
      const user = await userService.findUserByIdService(decoded.id);
      if (!user) {
        return res
          .status(401)
          .send({ message: "Usuário associado ao token não encontrado." });
      }

      req.userId = user.id;
      return next();
    } catch (serviceError) {
      console.error(
        "Erro no middleware de autenticação ao buscar usuário no serviço:",
        serviceError.message
      );
      return res
        .status(500)
        .send({ message: "Erro interno do servidor ao autenticar." });
    }
  });
}
