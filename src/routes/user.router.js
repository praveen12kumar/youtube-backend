import {Router}  from "express";
import { registerUser, 
    loginUser,
    logoutUser,
    refreshAccessToken,
    changeUserPassword,
    getCurrentUser,
    updateUserDetails,
    updateUserAvatar,
    updateUserCover

} from "../controllers/user.controller.js";
import {upload} from "../middlewares/multer.middleware.js";
import { isAuthenticatedUser } from "../middlewares/auth.middleware.js";

const router = Router();


// Routes

router.route("/register").post(upload.fields([
    { name: "avatar", maxCount: 1 },
    { name: "coverImage", maxCount: 1 },
]), registerUser);

router.route("/login").post(loginUser);


// secured routes
router.route("/logout").post(isAuthenticatedUser, logoutUser);

router.route("/refresh-token").post(refreshAccessToken)

router.route("update-password").put(isAuthenticatedUser, changeUserPassword);

router.route("/user").get(isAuthenticatedUser, getCurrentUser);

router.route("/update-profile").put(isAuthenticatedUser, updateUserDetails);

router.route("/update-avatar").put(isAuthenticatedUser, updateUserAvatar);

router.route("/update-covery").put(isAuthenticatedUser, updateUserCover );

export default router;
