const { body } = require("express-validator");
const User = require("../models/user.model");

exports.validate = (method) => {
  switch (method) {
    case "create": {
      return [
        body("first_name")
          .exists()
          .not()
          .isEmpty()
          .withMessage("first name is required"),
        body("last_name")
          .exists()
          .not()
          .isEmpty()
          .withMessage("last name is required"),
        body("mobile")
          .exists()
          .not()
          .isEmpty()
          .withMessage("Phone no is required"),  
        body("email")
          .exists()
          .not()
          .isEmpty()
          .withMessage("Email Required")
          .isEmail()
          .withMessage("Invalid email"),
        body("password")
          .exists()
          .not()
          .isEmpty()
          .withMessage("password is required")
          .isLength({ min: 6, max: 16 })
          // Custom message
          .withMessage("Password must be between 6 to 16 characters"),
        // body('password_confirmation').exists().not()
        // 	.isEmpty()
        // 	.withMessage('Confirm Password is required')

        // 	// Custom validation
        // 	// Validate confirmPassword
        // 	.custom(async (password_confirmation, {req}) => {
        // 		const password = req.body.password

        // 		// If password and confirm password not same
        // 		// don't allow to sign up and throw error
        // 		if(password !== password_confirmation){
        // 			throw new Error('Passwords must be same')
        // 		}
        // 	})
      ];
    }
    case "login": {
      return [
        body("email")
          .exists()
          .not()
          .isEmpty()
          .withMessage("Email Required")
          .isEmail()
          .withMessage("Invalid email"),
        body("password")
          .exists()
          .not()
          .isEmpty()
          .withMessage("password is required"),
      ];
    }
    case "forgotPassword": {
      return [
        body("mobile")
          .notEmpty()
          .withMessage("Phone No Required")
          .withMessage("Invalid Phone"),
        body("country_code")
          .notEmpty()
          .withMessage("Phone No Required"),
          
      ];
    }
    case "saveUserInfo": {
      return [
        body("user_id")
          .exists()
          .withMessage("user_id is Required.")
          .notEmpty()
          .withMessage("User Id is Required."),
      ];
    }
    case "socialLogin": {
      return [
        body("email")
          .exists()
          .not()
          .isEmpty()
          .withMessage("Email Required")
          .isEmail()
          .withMessage("Invalid email"),
      ];
    }
    case "updateProfile": {
      return [
        body("user_id")
          .exists()
          .withMessage("user_id is Required.")
          .notEmpty()
          .withMessage("User Id is Required."),
        body("email")
          .exists()
          .not()
          .isEmpty()
          .withMessage("Email Required")
          .isEmail()
          .withMessage("Invalid email"),
      ];
    }
    case "resetPassword": {
      return [
        body("user_id")
          .exists()
          .withMessage("user_id is Required.")
          .notEmpty()
          .withMessage("User Id is Required."),
        body("password")
          .exists()
          .not()
          .isEmpty()
          .withMessage("New password is required")
          .isLength({ min: 6, max: 16 })
          // Custom message
          .withMessage("Password must be between 6 to 16 characters"),
        // body('password_confirmation').exists().not()
        // 	.isEmpty()
        // 	.withMessage('Confirm Password is required')

        // 	// Custom validation
        // 	// Validate confirmPassword
        // 	.custom(async (password_confirmation, {req}) => {
        // 		const password = req.body.password

        // 		// If password and confirm password not same
        // 		// don't allow to sign up and throw error
        // 		if(password !== password_confirmation){
        // 			throw new Error('Passwords must be same')
        // 		}
        // 	})
      ];
    }
  }
};

exports.response = (results) => {
  for (var key in results) {
    return results[key].msg;
  }
};
