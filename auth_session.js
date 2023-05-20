import { Router } from "express";
import { nanoid } from "nanoid";
import authByEmailPwd from "./helpers/auth-by-email-pwd.js";
import { USERS_BBDD } from "./bbdd.js";

const sessions = [];
const authSessionRouter = Router();

//Login con email y password
authSessionRouter.post("/login", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) return res.sendStatus(400);

  try {
    const user = authByEmailPwd(email, password);

    const sessionId = nanoid();
    sessions.push({sessionId, id: user.id});

    res.cookie('sessionId', sessionId, {
        httpOnly: true
    });

    return res.send(`Usuario ${user.username} autorizado`);
  } catch (err) {
    return res.sendStatus(401);
  }
});

authSessionRouter.get("/profile", (req, resp) => {
    const {cookies} = req;

    if(!cookies.sessionId) return resp.sendStatus(401)

    const userSession = sessions.find(session => session.sessionId = cookies.sessionId)

    if(!userSession) return resp.sendStatus(401)

    const user = USERS_BBDD.find(user => user.id === userSession.id);

    if(!user) return resp.sendStatus(401)

    return resp.send(user);
});

export default authSessionRouter;