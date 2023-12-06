const config = require("../config/config");
const commonController = require("./common.controller");

const db = require("../models");
//const { now } = require("sequelize/types/lib/utils");
const Category = db.category;

const Op = db.Sequelize.Op;

const path = require("path");
const imagePath = config.ImageDefaultPath + config.ImageCategory;

// add Accounts
exports.addCategory = async (req, res) => {
  try {


    

    const ac_data = {
      user_id: req.body.user_id,
      name: req.body.name,
      status: 1,
    };

      const images = req.files.cat_image;
      const imageName = Date.now() + path.extname(images.name).toLowerCase();
      images.mv(imagePath + "" + imageName);
      ac_data.image = imageName;



    const add_data = await Category.create(ac_data);
    var message = "User Category added successfully.";
    
    res.json({
      status_code: 200,
      msg: "success",
      message: message,
      data: {},
    });

  } catch (error) {
    console.log(error);

    message = "Some error occurred while adding category.";
    
    res.json({
      status_code: 422,
      msg: "failed",
      message: message,
    });
  }
};

// Edit Accounts
exports.editCategory = async (req, res) => {
  try {
    
    const ac_data = {
      name: req.body.name,
    };
    if(req.files){
      const images = req.files.cat_image;
      const imageName = Date.now() + path.extname(images.name).toLowerCase();
      images.mv(imagePath + "" + imageName);
      ac_data.image = imageName;
    }
    

    const add_data = await Category.update(ac_data, {
      where: { id: req.body.id,},
      returning: true,
    });

    var message = "User category edit successfully.";
    
    res.json({
      status_code: 200,
      msg: "success",
      message: message,
      data: {},
    });

  } catch (error) {
    console.log(error);

    message = "Some error occurred while editing category.";
    
    res.json({
      status_code: 422,
      msg: "failed",
      message: message,
    });
  }
};

// Edit Accounts
exports.deleteCategory = async (req, res) => {
  try {
    
    const add_data = await Category.destroy({
      where: { id: req.body.id,},
      returning: true,
    });

    var message = "User Category delete successfully.";
    
    res.json({
      status_code: 200,
      msg: "success",
      message: message,
      data: {},
    });

  } catch (error) {
    console.log(error);

    message = "Some error occurred while deleting Category.";
    
    res.json({
      status_code: 422,
      msg: "failed",
      message: message,
    });
  }
};

// myFriendsList
exports.categoryList = async (req, res) => {
  try {
    

    const category = await Category.findAll({
      where: {
        user_id: {
          [Op.or]: [0,req.body.user_id]
        }
      },
      attributes: [
        "id",
        "user_id",
        "name",
        "image",
      ],
      order: [["id", "ASC"]],
    });

    // const category_list = await Category.findAll({
    //   where: {
    //     user_id:0
    //   },
    //   order: [["id", "DESC"]],
    // });

    var message_l = "Category list got successfully.";

    res.json({
      status_code: 200,
      msg: "success",
      message: message_l,
      category,
    });
  } catch (error) {
    console.log(error);
    var message_l = "Some error occurred while geeting categoryfg data.";
    

    res.json({
      status_code: 422,
      msg: "failed",
      message: message_l,
    });
  }
};

exports.NotificationList = async (req, res) => {
  try {
    const notification_list = await UserNotification.findAll({
      where: { user_id: req.body.user_id },
      order: [["id", "DESC"]],
      attributes: ["id", "user_id", "msg", "is_read", "created_at"],
    });

    const data = {
      notification_list,
    };

    
    message = "Data Found successfully.";
   
    res.json({
      status_code: 200,
      msg: "success",
      message: message,
      data,
    });
  } catch (error) {
    console.log(error);
    var message = "Some error occurred while getting data.";
    
    res.json({
      status_code: 422,
      message: message,
    });
  }
};


