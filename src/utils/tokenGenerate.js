import jwt from "jsonwebtoken";

export const createToken = (payload, secret, expiresIn) => {
  const options = {
    algorithm: "HS256",
    expiresIn,
  };

  return jwt.sign(payload, secret, options);
};

export const verifyToken = (token, secret) => {
  return jwt.verify(token, secret);
};
