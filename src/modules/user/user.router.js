import { Router } from "express";
import userController from "./user.controller.js";
import auth from "../../middleware/auth.js";
import USER_ROLE from "./user.constant.js";
import { upload } from "../../utils/cloudnary.js";

const router = Router();

router.post("/register", userController.createNewAccount);
router.post(
  "/verify-email",
  auth(USER_ROLE.employee, USER_ROLE.company_admin, USER_ROLE.admin),
  userController.verifyEmail
);

router.post(
  "/resend-otp",
  auth(USER_ROLE.employee, USER_ROLE.company_admin, USER_ROLE.admin),
  userController.resendOtpCode
);

router.get(
  "/",
  auth(USER_ROLE.employee, USER_ROLE.company_admin, USER_ROLE.admin),
  userController.getAllUsers
);

router.get(
  "/profile",
  auth(USER_ROLE.employee, USER_ROLE.company_admin, USER_ROLE.admin),
  userController.getMyProfile
);

router.put(
  "/update-profile",
  auth(USER_ROLE.employee, USER_ROLE.company_admin, USER_ROLE.admin),
  upload.single("image"),
  (req, res, next) => {
    if (req.body?.data) {
      try {
        req.body = JSON.parse(req.body.data);
      } catch (err) {
        return res.status(400).json({
          success: false,
          message: "Invalid JSON format in 'data' field",
        });
      }
    }
    next();
  },
  userController.updateUserProfile
);

export default router;
