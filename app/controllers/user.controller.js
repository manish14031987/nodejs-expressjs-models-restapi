const { validationResult } = require("express-validator");

var bcrypt = require("bcrypt");
const path = require("path");

const validationResponse = require("../validators/user.validation");
const config = require("../config/config");
const commonController = require("./common.controller");


const rand = require("random-key");

const db = require("../models");
const { response } = require("express");


const imagePath = config.ImageDefaultPath + config.ImageProfile;

var randomstring = require("randomstring");

//var utils = require('../config/utils');
//var constants = require('../config/constants');

const User = db.user;
const UserAccount = db.user_account;
const EmailTemplate = db.email_templates;

const BodyPart = db.body_part;

const Cart = db.cart;
const ModelRole = db.model_role;
const PasswordReset = db.password_reset;
const userFriend = db.user_friend;

const Op = db.Sequelize.Op;
const ModelHasRole = db.model_has_role;






// Social Login
exports.socialLogin = async (req, res) => {
  const errors = validationResult(req); // Finds the validation errors in this request and wraps them in an object with handy functions
  const myValidationResult = validationResult.withDefaults({
    formatter: (error) => {
      return { msg: error.msg };
    },
  });

  if (!errors.isEmpty()) {
    var results = myValidationResult(req).mapped();

    var response = validationResponse.response(results);

    return res.json({
      status_code: 422,
      msg: "failed",
      message: response,
    });
  }
  
  // Create a User
  const user = {
    first_name: req.body.first_name,
    name: req.body.name,
    last_name: req.body.last_name,
    social_id: req.body.social_id,
    device_token: req.body.device_token,
    device_type: req.body.device_type,
    email: req.body.email,
  };

  User.findOne({
    where: { email: req.body.email },
    attributes: [
      "id",
      "password",
      "first_name",
      "last_name",
      "email",
      "gender",
      "image",
      "device_token",
      "auth_token",
      "image_url",
      "device_token",
      "auth_token",
      "device_type",
    ],
  }).then(function (response) {
    console.log(response);
    if (!response) {
      //Save User in the database
      //console.log(User.create(user));
      User.create(user)
        .then(async (user) => {
          let rend_key_auth = rand.generate();

          const user_first = {
            id: user.id,
            is_user_info: 0,
            auth_token: rend_key_auth,
          };

          const role_data = {
            role_id: 3,
            model_type: "App\\Models\\User",
            model_id: user_first.id,
          };

          await ModelHasRole.create(role_data);

          if (req.body.language == "ka") {
            var message_l = "შენ წარმატებით დარეგისტრირდი";
          } else {
            var message_l = "You have registered successfully.";
          }
          res.json({
            status_code: 200,
            msg: "success",
            message: message_l,
            data: user_first,
          });
        })
        .catch((err) => {
          if (req.body.language == "ka") {
            var message_l = "დაფიქსირდა შეცდომა";
          } else {
            var message_l = "Some error occurred while creating the User.";
          }
          res.json({
            status_code: 422,
            msg: "failed",
            message: message_l,
          });
        });
    } else {
      User.update(user, {
        where: { email: req.body.email },
        returning: true,
      });

      
        User.findOne({
          where: { id: response.id },
          attributes: [
            "id",
            "first_name",
            "last_name",
            "email",
            "gender",
            "age",
            "image",
            "device_token",
            "auth_token",
            "image_url",
            "device_token",
            "auth_token",
            "device_type",
          ],
        }).then((raw1) => {
          const user2 = raw1.get();
          const response2 = {
            user2,
          };

          if (req.body.language == "ka") {
            var message_l = "შენ წარმატებით გაიარე ავტორიზაცია";
          } else {
            var message_l = "You have logged in successfully.";
          }
          res.json({
            status_code: 200,
            msg: "success1111",
            message: message_l,
            data: response,
          });
        });
      
    }
  });
};

// Retrieve all Customers from the database.
exports.login = (req, res) => {
  

  User.findOne({
    where: { mobile: req.body.mobile,country_code: req.body.country_code },
    attributes: [
      "id",
      "password",
      "first_name",
      "last_name",
      "email",
      "gender",
      "mobile",
      "income_1",
      "income_2",
      "image_url",
      "assets",
      "device_token",
      "auth_token",
      "language",
      "device_type",
    ],
  }).then(function (user) {
    if (user) {
      // password is laravel hash we have convert it in node hash
      let userpassword = user.password;
      let password = userpassword.replace("$2y$", "$2b$");
      if (bcrypt.compareSync(req.body.password, password)) {
        // Update device type and token
        const items = {
          device_type: req.body.device_type,
          device_token: req.body.device_token,
        };
        //708
        User.update(items, {
          where: { mobile: req.body.mobile,country_code: req.body.country_code },
          returning: true,
        });

        User.findOne({
          where: { id: user.id },
          attributes: [
          "id",
          "first_name",
          "last_name",
          "email",
          "gender",
          "mobile",
          "income_1",
          "income_2",
          "image_url",
          "assets",
          "device_token",
          "auth_token",
          "language",
          "device_type",
        ],
        }).then((response) => {
            console.log(response);

            var message = "You have logged in successfully.";
            
            res.json({
              status_code: 200,
              msg: "success",
              message: message,
              data: response,
            });
          });
        
      } else {
        if (req.body.language == "ka") {
          var message_l =
            'პაროლი არასწორია. გამოიყენე "დამავიწყდა პაროლი"-ს ფუნქცია, თუ გსურს პაროლის შეცვლა';
        } else {
          var message_l =
            "You have entered wrong password, Please use 'forgot password' option to set new password.";
        }

        res.json({
          status_code: 422,
          msg: "failed",
          message: message_l,
        });
      }
    } else {
      if (req.body.language == "ka") {
        var message_l =
          'პაროლი არასწორია. გამოიყენე "დამავიწყდა პაროლი"-ს ფუნქცია, თუ გსურს პაროლის შეცვლა';
      } else {
        var message_l =
          "This account is not registered with us yet, so please use either 'Social log in' or 'Sign-up' option.";
      }
      res.json({
        status_code: 422,
        msg: "failed",
        message: message_l,
      });
    }
  });
};

// Logout User from.
exports.logout = (req, res) => {
  const items = {
    is_login: 0,
    auth_token: "",
    device_token: "",
  };

  User.findOne({
    where: { id: req.body.user_id },
    attributes: ["id", "is_login", "auth_token"],
  })
    .then(async function (row) {
      //update user details  in the database
      try {
        let data = await User.update(items, {
          where: { id: req.body.user_id },
          attributes: ["name", "email", "id"],
          returning: true,
        });
        if (req.body.language == "ka") {
          var message_l = "წარმატებით გავიდა სისტემიდან";
        } else {
          var message_l = "User logged out successfully.";
        }
        res.json({
          status_code: 200,
          msg: "success",
          message: message_l,
          data: row,
        });
      } catch (err) {
        console.log(err);
        if (req.body.language == "ka") {
          var message_l = "სისტემიდან გასვლისას დაფიქსირა შეცდომა";
        } else {
          var message_l = "Some error occurred while logout.";
        }
        res.json({
          status_code: 422,
          msg: "failed",
          message: message_l,
        });
      }
    })
    .catch((err) => {
      if (req.body.language == "ka") {
        var message_l = "მომხმარებელი ვერ მოიძებნა";
      } else {
        var message_l = "No User Found.";
      }
      res.json({
        status_code: 422,
        msg: "failed",
        message: message_l,
      });
    });
};

// update save user info
exports.save_user_info = async (req, res) => {
  const errors = validationResult(req); // Finds the validation errors in this request and wraps them in an object with handy functions
  const myValidationResult = validationResult.withDefaults({
    formatter: (error) => {
      return { msg: error.msg };
    },
  });

  if (!errors.isEmpty()) {
    var results = myValidationResult(req).mapped();

    var response = validationResponse.response(results);

    return res.json({
      status_code: 422,
      msg: "failed",
      message: response,
    });
  }

  // Create a Address
  const items1 = {
    is_user_info: 1,
    gender: req.body.gender,
    country_name: req.body.country_name,
    country_code: req.body.country_code,
    weight: req.body.weight,
    num_workouts: req.body.num_workouts,
    device_type: req.body.device_type,
    language: req.body.language,
    level_workout: req.body.level_workout,
    num_weeks: req.body.num_weeks,
    auth_token: req.body.auth_token,
    age: req.body.age,
    height: req.body.height,
    goal_id: req.body.goals,
  };

  User.findOne({
    where: { id: req.body.user_id },
    attributes: ["is_user_info", "id"],
  })
    .then(async function (row) {
      //update user details  in the database
      try {
        let data = await User.update(items1, {
          where: { id: req.body.user_id },
          attributes: ["name", "email", "id"],
          returning: true,
        });
        // console.log(data);
        // return;

        var allItems = [];

        const bodyPartData = JSON.parse(req.body.body_parts);

        for (var i = 0; i < bodyPartData.length; i++) {
          var items = {
            user_id: req.body.user_id,
            part_name: bodyPartData[i].title,
            checked: bodyPartData[i].checked,
          };

          allItems.push(items);
        }

        await BodyPart.bulkCreate(allItems);

        let row1 = await User.findOne({
          where: { id: req.body.user_id },
          attributes: [
            "is_user_info",
            "id",
            "first_name",
            "last_name",
            "email",
            "gender",
            "country_name",
            "country_code",
            "height",
            "weight",
            "age",
            "level_workout",
            "goal_id",
            "num_workouts",
            "num_weeks",
            "image",
            "device_token",
            "auth_token",
            "image_url",
            "device_token",
            "auth_token",
            "language",
            "device_type",
            "latitude",
            "longitude",
            "address",
          ],
        });

        BodyPart.findAll({
          where: { user_id: req.body.user_id },
          attributes: ["id", "part_name", "checked"],
        }).then((response) => {
          const user2 = row1.get();
          const response2 = {
            ...user2,
            body_parts: response,
          };

          if (req.body.language == "ka") {
            var message_l = "ინფორმაცია წარმატებით შეინახა";
            var email_id = '29';
          } else {
            var message_l = "All information saved successfully.";
            var email_id = '28';
          }

          EmailTemplate.findOne({
            where: { id: email_id },
            attributes: [
              "name",
              "subject",
              "email_type",
              "email_body",
            ],
          }).then(async (email_data) => {
              let mailData = {
                from: '"<test m>"johnwick.octal@gmail.com',
                to: response2.email,
                subject: email_data.subject,
                html: `<p>Hi&nbsp;${response2.first_name} ${response2.last_name},&nbsp;</p>${email_data.email_body}`,
              };
              
            const mailSent = await commonController.sendMail1(mailData);
            console.log(mailSent);
          });

          res.json({
            status_code: 200,
            msg: "success",
            message: message_l,
            data: response2,
          });
        });
      } catch (err) {
        console.log(err);

        if (req.body.language == "ka") {
          var message_l = "პროფილის შენახვისას დაფიქსირდა პრობლემა";
        } else {
          var message_l = "Some error occurred while saving Profile";
        }
        res.json({
          status_code: 422,
          msg: "failed",
          message: message_l,
        });
      }
    })
    .catch((err) => {
      if (req.body.language == "ka") {
        var message_l = "მომხმარებელი ვერ მოიძებნა";
      } else {
        var message_l = "No User Found.";
      }
      res.json({
        status_code: 422,
        msg: "failed",
        message: message_l,
      });
    });
};


// update user Profile
exports.updateProfile = async (req, res) => {
  const errors = validationResult(req); // Finds the validation errors in this request and wraps them in an object with handy functions
  const myValidationResult = validationResult.withDefaults({
    formatter: (error) => {
      return { msg: error.msg };
    },
  });

  if (!errors.isEmpty()) {
    var results = myValidationResult(req).mapped();

    var response = validationResponse.response(results);

    return res.json({
      status_code: 422,
      msg: "failed",
      message: response,
    });
  }

  // Create a Address
  const items1 = {
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    name: req.body.name,
    email: req.body.email,
    gender: req.body.gender,
    country_code: req.body.country_code,
    country_name: req.body.country_name,
    weight: req.body.weight,
    age: req.body.age,
    height: req.body.height,
    level_workout: req.body.level_workout,
    goal_id: req.body.goals,
    num_workouts: req.body.num_workouts,
    auth_token: req.body.auth_token,
    language: req.body.language,
    device_type: req.body.device_type,
  };

  User.findOne({
    where: { id: req.body.user_id },
    attributes: ["is_user_info", "id"],
  })
    .then(async function (row) {
      //update user details  in the database
      try {
        let data = await User.update(items1, {
          where: { id: req.body.user_id },
          attributes: ["name", "email", "id"],
          returning: true,
        });

        let BodyPart_Del = await BodyPart.destroy({
          where: { user_id: req.body.user_id },
          returning: true,
        });

        var allItems = [];

        const bodyPartData = JSON.parse(req.body.body_parts);

        for (var i = 0; i < bodyPartData.length; i++) {
          var items = {
            user_id: req.body.user_id,
            part_name: bodyPartData[i].title,
            checked: bodyPartData[i].checked,
          };

          allItems.push(items);
        }

        await BodyPart.bulkCreate(allItems);

        let row1 = await User.findOne({
          where: { id: req.body.user_id },
          attributes: [
            "is_user_info",
            "id",
            "first_name",
            "last_name",
            "email",
            "gender",
            "country_name",
            "country_code",
            "height",
            "weight",
            "age",
            "level_workout",
            "goal_id",
            "num_workouts",
            "num_weeks",
            "image",
            "device_token",
            "auth_token",
            "image_url",
            "device_token",
            "auth_token",
            "language",
            "device_type",
            "latitude",
            "longitude",
            "address",
          ],
        });

        BodyPart.findAll({
          where: { user_id: req.body.user_id },
          attributes: ["id", "part_name", "checked"],
        }).then((response) => {
          const user2 = row1.get();
          const response2 = {
            ...user2,
            body_parts: response,
          };

          if (req.body.language == "ka") {
            var message_l = "პროფილი წარმატებით დარედაქტირდა";
          } else {
            var message_l = "Profile Updated successfully.";
          }

          res.json({
            status_code: 200,
            msg: "success",
            message: message_l,
            data: response2,
          });
        });
      } catch (err) {
        console.log(err);
        if (req.body.language == "ka") {
          var message_l = "პროფილის რედაქტირებისას დაფიქსირდა შეცდომა";
        } else {
          var message_l = "Some error occurred while updating profile.";
        }
        res.json({
          status_code: 422,
          msg: "failed",
          message: message_l,
        });
      }
    })
    .catch((err) => {
      if (req.body.language == "ka") {
        var message_l = "მომხმარებელი ვერ მოიძებნა";
      } else {
        var message_l = "No User Found.";
      }
      res.json({
        status_code: 422,
        msg: "failed",
        message: message_l,
      });
    });
};

//update user image
exports.updateImage = async (req, res) => {
  // Create a Address

  const items = {
    id: req.body.user_id,
  };

  if (req.files) {
    let images = req.files.profile;

    let imageName = Date.now() + path.extname(images.name).toLowerCase();

    images.mv(imagePath + "" + imageName);
    items.image = imageName;
  }

  User.findOne({
    where: { id: req.body.user_id },
    attributes: ["is_user_info", "id"],
  })
    .then(async function (row) {
      //update user details  in the database
      try {
        let data = await User.update(items, {
          where: { id: req.body.user_id },
          attributes: ["id", "image"],
          returning: true,
        });

        res_data = {
          id: req.body.user_id,
          image: items.image,
        };
        if (req.body.language == "ka") {
          var message_l = "პროფილის სურათი წარმატებით აიტვირთა";
        } else {
          var message_l = "Profile image updated successfully.";
        }
        res.json({
          status_code: 200,
          msg: "success",
          message: message_l,
          data: res_data,
        });
      } catch (err) {
        console.log(err);
        if (req.body.language == "ka") {
          var message_l = "პროფილის სურათის ატვირთვისას დაფიქსირდა შეცდომა";
        } else {
          var message_l = "Some error occurred while updating profile image.";
        }
        res.json({
          status_code: 422,
          msg: "failed",
          message: message_l,
        });
      }
    })
    .catch((err) => {
      if (req.body.language == "ka") {
        var message_l = "მომხმარებელი ვერ მოიძებნა";
      } else {
        var message_l = "No User Found.";
      }
      res.json({
        status_code: 422,
        msg: "failed",
        message: message_l,
      });
    });
};

// Reset user password.
exports.resetPassword = (req, res) => {
  console.log('testtt');
  const errors = validationResult(req); // Finds the validation errors in this request and wraps them in an object with handy functions
  const myValidationResult = validationResult.withDefaults({
    formatter: (error) => {
      return { msg: error.msg };
    },
  });

  if (!errors.isEmpty()) {
    var results = myValidationResult(req).mapped();

    var response = validationResponse.response(results);

    return res.json({
      status_code: 422,
      msg: "failed",
      message: response,
    });
  }

  User.findOne({
    where: { id: req.body.user_id },
    attributes: ["id", "password"],
  }).then(function (user) {
    if (user) {
      // password is laravel hash we have convert it in node hash
      // let userpassword = user.password;
      // let password = userpassword.replace("$2y$", "$2b$");
      //if (bcrypt.compareSync(req.body.old_password, password)) {
        // Update device type and token
        let hashedPassword = bcrypt.hashSync(req.body.password, 10);
        const items = {
          password: hashedPassword.replace("$2b$", "$2y$"),
        };
        //708
        User.update(items, {
          where: { id: req.body.user_id },
          returning: true,
        });
        if (req.body.language == "ka") {
          var message_l = "პაროლი წარმატებით შეიცვალა";
        } else {
          var message_l = "Your password updated successfully.";
        }
        res.json({
          status_code: 200,
          msg: "success",
          message: message_l,
          data: {},
        });
      // } else {
      //   if (req.body.language == "ka") {
      //     var message_l = "ძველი პაროლი არასწროია";
      //   } else {
      //     var message_l = "You have entered wrong old password.";
      //   }
      //   res.json({
      //     status_code: 422,
      //     msg: "failed",
      //     message: message_l,
      //   });
      // }
    } else {
      if (req.body.language == "ka") {
        var message_l =
          "მომხმარებელი არ არის რეგისტრირებული, გაიარე რეგისტრაცია ან გამოიყენე სოციალური არხებით ავტორიზაცია";
      } else {
        var message_l =
          "This account is not registered with us yet, so please use either 'Social login' or 'Sign-up' option.";
      }
      res.json({
        status_code: 422,
        msg: "failed",
        message: message_l,
      });
    }
  });
};

// send email to user for reset password
exports.forgotPassword = (req, res) => 
{
  console.log('dd')
  const errors = validationResult(req); // Finds the validation errors in this request and wraps them in an object with handy functions
  const myValidationResult = validationResult.withDefaults({
    formatter: (error) => {
      return { msg: error.msg };
    },
  });

  if (!errors.isEmpty()) {
    var results = myValidationResult(req).mapped();
    var response = validationResponse.response(results);
    return res.json({
      status_code: 422,
      msg: "failed",
      message: response,
    });
  }
  User.findOne({
    where: { mobile: req.body.mobile,country_code: req.body.country_code },
    attributes: ["name", "email", "id", "password"],
  }).then(function (user) 
  {
    if (user) {
      
      const items_otp = {
        user_otp:  rand.generateDigits(4)
      };

      User.update(items_otp, {
        where: { mobile: req.body.mobile,country_code: req.body.country_code },
        returning: true,
      });

    var message_l = "You have succesfully genrate new otp for forgot password.";
    
    res.json({
      status_code: 200,
      msg: "success",
      message: message_l,
      data: items_otp,
    });
     
    } 
    else 
    {
      if (req.body.language == "ka") 
      {
        var message_l = "ელ-ფოსტა არ არსებობს";
      } else 
      {
        var message_l = "Mobile no does't Exists.";
      }
      res.json({
        status_code: 422,
        msg: "failed",
        message: message_l,
      });
    }
  });
};

// Reset user password.
exports.verifyOtp = (req, res) => {
 
  let rend_key_auth = rand.generate();
  User.findOne({
    where: { mobile: req.body.mobile,country_code: req.body.country_code },
    attributes: [
      "id",
      "first_name",
      "last_name",
      "email",
      "gender",
      "mobile",
      "income_1",
      "income_2",
      "image_url",
      "assets",
      "device_token",
      "auth_token",
      "language",
      "device_type",
      "user_otp",
    ],
  }).then(function (user) {
    if (user) {

     

      if (user.user_otp==req.body.otp) {

        const items_otp = {
          verify_otp: 1,
          auth_token:rend_key_auth,
        };
  
        User.update(items_otp, {
          where: { id: user.id},
          returning: true,
        });
        
        var message_l = "You have verifyed successfully..";
        res.json({
          status_code: 200,
          msg: "success",
          message: message_l,
          data: user,
        });
      } else {
        
        var message_l = "You have entered wrong OTP.";
        
        res.json({
          status_code: 422,
          msg: "failed",
          message: message_l,
        });
      }
    } else {
      if (req.body.language == "ka") {
        var message_l =
          "მომხმარებელი არ არის რეგისტრირებული, გაიარე რეგისტრაცია ან გამოიყენე სოციალური არხებით ავტორიზაცია";
      } else {
        var message_l =
          "This account is not registered with us yet, so please use either 'Social login' or 'Sign-up' option.";
      }
      res.json({
        status_code: 422,
        msg: "failed",
        message: message_l,
      });
    }
  });
};




// Reset user password.
exports.create = async (req, res) => {
  try {

    const errors = validationResult(req); // Finds the validation errors in this request and wraps them in an object with handy functions
  const myValidationResult = validationResult.withDefaults({
    formatter: (error) => {
      return { msg: error.msg };
    },
  });

  if (!errors.isEmpty()) {
    var results = myValidationResult(req).mapped();

    var response = validationResponse.response(results);

    return res.json({
      status_code: 422,
      msg: "failed",
      message: response,
    });
  }
    
    if(req.body.email){
      let user_email = await User.findOne({
        where: { email: req.body.email },
        
      });


      if (user_email) {
        console.log(user_email);
        message = "This email is already registered with us so please use log in button to get in.";
        
        res.json({
          status_code: 422,
          msg: "failed",
          message: message,
        });
      }

    }


    if(req.body.mobile){
      let user_mobile = await User.findOne({
        where: { mobile: req.body.mobile },
        
      });

      if (!user_mobile) {

        let hashedPassword = bcrypt.hashSync(req.body.password, 10);
        let rend_key_auth = rand.generate();

        let rend_key_otph=rand.generateDigits(4)
        const user_data = {
          first_name: req.body.first_name,
          name: req.body.name,
          last_name: req.body.last_name,
          password: hashedPassword.replace("$2b$", "$2y$"),
          income_1	: req.body.income_1,
          income_2: req.body.income_2,
          age	: req.body.age,
          device_token: req.body.device_token,
          device_type: req.body.device_type,
          user_otp: rend_key_otph,
          auth_token:rend_key_auth,
          email: req.body.email,
          mobile: req.body.mobile,
          country_code: req.body.country_code,
          
        };
    
        // const user_data = {
        //   mobile: req.body.mobile,
        //   email: req.body.email,
        //   country_code: req.body.country_code,
        //   user_otp: 3333,
        // };

        
        const otp_data = {
          user_otp: rend_key_otph,
        };
        
        const add_data = await User.create(user_data);

        //user role;
        const role_data = {
          role_id: 3,
          model_type: "App\\Models\\User",
          model_id: add_data.id,
        };

        await ModelHasRole.create(role_data);


        var message = "Otp genrated successfully.";
        
        res.json({
          status_code: 200,
          msg: "success",
          message: message,
          data: otp_data,
        });

        
      } else {
        
        message = "This mobile is already registered with us so please use log in button to get in.";
        
        res.json({
          status_code: 422,
          msg: "failed",
          message: message,
        });
      }

    }
    

    
    
  } catch (error) {
    console.log(error);
    var message = "Some error occurred while genrating Otp.";
    
    res.json({
      status_code: 422,
      message: message,
    });
  }

  
};