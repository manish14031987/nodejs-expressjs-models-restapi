var express = require("express");
var router = express.Router();

//Controllers
const userController = require("../controllers/user.controller");
const useraccountController = require("../controllers/useraccount.controller");
const categoryController = require("../controllers/category.controller");

//Validations
const userValidation = require("../validators/user.validation");


// Create a new user
router.post(
  "/register",
  userValidation.validate("create"),
  userController.create
);

// Create a new user
router.post(
  "/save_user_info",
  userValidation.validate("saveUserInfo"),
  userController.save_user_info
);

// // Create a new user
// router.post(
//   "/profile",
//   userValidation.validate("updateProfile"),
//   userController.updateProfile
// );

// login
router.post("/login", userValidation.validate("login"), userController.login);

// Reset Password
router.post(
  "/reset_password",
  userValidation.validate("resetPassword"),
  userController.resetPassword
);

// Reset Password
router.post("/verify_otp",userController.verifyOtp);

// Social login
router.post(
  "/social_login",
  userValidation.validate("socialLogin"),
  userController.socialLogin
);

// update profile
router.post(
  "/edit_profile",
  userValidation.validate("updateProfile"),
  userController.updateProfile
);

// forget password
router.post(
  "/forget_password",
  userValidation.validate("forgotPassword"),
  userController.forgotPassword
);

// update image
router.post("/edit_image", userController.updateImage);

// logout
router.post("/logout", userController.logout);

// list account
router.post("/list_account", useraccountController.listAccount);

// Add account
router.post("/add_account", useraccountController.addAccount);

// Add account
router.post("/edit_account", useraccountController.editAccount);

// Delete account
router.post("/delete_account", useraccountController.deleteAccount);

// Delete account
router.post("/user_notification", useraccountController.NotificationList);


// Add category
router.post("/add_category", categoryController.addCategory);

// Delete account
router.post("/edit_category", categoryController.editCategory);

// Delete account
router.post("/delete_category", categoryController.deleteCategory);


// Delete account
router.post("/category_list", categoryController.categoryList);

// otp genrate
//router.post("/otp_genrate", userController.OtpGenrate);

module.exports = router;
