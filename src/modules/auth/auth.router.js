import { Router } from "express";
import auth from "../../middleware/auth.js";
import USER_ROLE from "../user/user.constant.js";
import authController from "./auth.controller.js";

const router = Router();

router.post("/login", authController.loginUser);
router.post("/refresh-token", authController.refreshToken);
router.post("/forgot-password", authController.forgotPassword);

router.post(
  "/verify-token",
  auth(USER_ROLE.employee, USER_ROLE.company_admin, USER_ROLE.admin),
  authController.verifyToken
);

router.post(
  "/reset-password",
  auth(USER_ROLE.employee, USER_ROLE.company_admin, USER_ROLE.admin),
  authController.resetPassword
);

router.post(
  "/change-password",
  auth(USER_ROLE.employee, USER_ROLE.company_admin, USER_ROLE.admin),
  authController.changePassword
);

export default router;
