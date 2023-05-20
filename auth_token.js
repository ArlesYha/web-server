import { Router } from "express";
import authByEmailPwd from "./helpers/auth-by-email-pwd.js";
import { SignJWT, jwtVerify } from 'jose'
import { USERS_BBDD } from "./bbdd.js";
import validateLoginDTO from "./dto/validate-login-dto.js";


const authTokenRouter = Router();

//Login con email y password
authTokenRouter.post("/login", validateLoginDTO, async (req, res) => {
  const { email, password } = req.body;

  try {
    const { id } = authByEmailPwd(email, password);

    const jwtConstructor = new SignJWT({id});

    const encoder = new TextEncoder();

    const jwt = await jwtConstructor.setProtectedHeader({
      alg: 'HS256',
      typ: 'JWT',})
    .setIssuedAt()
    .setExpirationTime('1h')
    .sign(encoder.encode(process.env.JWT_PRIVATE_KEY));

    return res.send({jwt});
  } catch (err) {
    return res.sendStatus(401);
  }
});

authTokenRouter.get("/profile", async (req, res) => {
  const { authorization } = req.headers;
  // return res.send(authorization);

  if(!authorization) return res.status(401);

  try {
    const encoder = new TextEncoder();

    const { payload } = await jwtVerify(authorization, encoder.encode(process.env.JWT_PRIVATE_KEY));
    
    const user = USERS_BBDD.find((user) => user.id === payload.id);

    if(!user) return res.status(401);

    delete user.password;

    return res.send(user);
  } catch (err) {
    return res.sendStatus(401);
  }
});

export default authTokenRouter;