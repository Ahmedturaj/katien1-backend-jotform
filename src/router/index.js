import { Router } from "express";
import userRouter from "../modules/user/user.router.js";
import authRouter from "../modules/auth/auth.router.js";
import sendMessageRouter from "../modules/contract/contract.router.js";
import formRouter from "../modules/form/form.routes.js";
import reportRouter from "../modules/report/report.routes.js";

const router = Router();

const moduleRouter = [
  {
    path: "/user",
    router: userRouter,
  },
  {
    path: "/auth",
    router: authRouter,
  },
  {
    path: "/contract",
    router: sendMessageRouter,
  },
  {
    path:"/form-data",
    router:formRouter
  },
  {
    path:"/report",
    router:reportRouter
  }
];

moduleRouter.forEach((route) => {
  router.use(route.path, route.router);
});

export default router;
