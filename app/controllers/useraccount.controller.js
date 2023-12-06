const config = require("../config/config");
const commonController = require("./common.controller");

const db = require("../models");
//const { now } = require("sequelize/types/lib/utils");
const User = db.user;
const UserAccount = db.user_account;
const UserNotification = db.user_notification;

const Op = db.Sequelize.Op;



// add Accounts
exports.addAccount = async (req, res) => {
  try {
    console.log('ddd');
    const ac_data = {
      user_id: req.body.user_id,
      account_name: req.body.account_name,
      account_number: req.body.account_number,
      account_balance: req.body.account_balance,
      account_holder_name: req.body.account_holder_name,
      iban: req.body.iban,
      swift_code: req.body.swift_code,
      status: 1,
    };

    const add_data = await UserAccount.create(ac_data);
    var message = "User account added successfully.";
    
    res.json({
      status_code: 200,
      msg: "success",
      message: message,
      data: {},
    });

  } catch (error) {
    console.log(error);

    message = "Some error occurred while adding account.";
    
    res.json({
      status_code: 422,
      msg: "failed",
      message: message,
    });
  }
};

// Edit Accounts
exports.editAccount = async (req, res) => {
  try {
    console.log('ddd');
    const ac_data = {
      account_name: req.body.account_name,
      account_number: req.body.account_number,
      account_balance: req.body.account_balance,
      account_holder_name: req.body.account_holder_name,
      iban: req.body.iban,
      swift_code: req.body.swift_code,
    };

    const add_data = await UserAccount.update(ac_data, {
      where: { id: req.body.id,},
      returning: true,
    });

    var message = "User account edit successfully.";
    
    res.json({
      status_code: 200,
      msg: "success",
      message: message,
      data: {},
    });

  } catch (error) {
    console.log(error);

    message = "Some error occurred while editing account.";
    
    res.json({
      status_code: 422,
      msg: "failed",
      message: message,
    });
  }
};

// Edit Accounts
exports.deleteAccount = async (req, res) => {
  try {
    console.log('ddd');
    

    const add_data = await UserAccount.destroy({
      where: { id: req.body.id,},
      returning: true,
    });

    var message = "User account delete successfully.";
    
    res.json({
      status_code: 200,
      msg: "success",
      message: message,
      data: {},
    });

  } catch (error) {
    console.log(error);

    message = "Some error occurred while deleting account.";
    
    res.json({
      status_code: 422,
      msg: "failed",
      message: message,
    });
  }
};


exports.listAccount = async (req, res) => {
  try {
    

    const user_accounts = await UserAccount.findAll({
      where: {
        user_id:req.body.user_id
      },
      attributes: [
        "id",
        "user_id",
        "account_name",
        "account_number",
        "account_holder_name",
        "iban",
        "swift_code",
        "account_balance",
      ],
      order: [["id", "ASC"]],
    });

    // const category_list = await Category.findAll({
    //   where: {
    //     user_id:0
    //   },
    //   order: [["id", "DESC"]],
    // });

    var message_l = "User accounts find successfully.";

    res.json({
      status_code: 200,
      msg: "success",
      message: message_l,
      user_accounts,
    });
  } catch (error) {
    console.log(error);
    var message_l = "Some error occurred while geeting accounts data.";
    

    res.json({
      status_code: 422,
      msg: "failed",
      message: message_l,
    });
  }
};


// myFriendsList
exports.myFriendsList = async (req, res) => {
  try {
    const friends = await UserFriend.findAll({
      where: { user_id: req.body.user_id, request_status: 1 },
      include: [
        {
          model: User,
          as: "user",
          attributes: ["id", "name", "email", "image"],
        },
      ],
    });

    const pending_request_count = await UserFriend.count({
      where: {
        user_id: req.body.user_id,
        request_status: 0,
        sender: 0,
      },
    });

    // console.log(friends);
    // return false;
    let data_u = [];

    for (let i = 0; i < friends.length; i++) {
      const { id, user } = friends[i];

      data_u.push({
        id: user.id,
        name: user.name,
        email: user.email,
        image: user.image,
        user_relations: 1,
      });
    }

    const data = {
      pending_request_count: pending_request_count,
      user: data_u,
    };

    if (req.body.language == "ka") {
      var message_l = "მომხმარებელი წარმატებით მოიძებნა";
    } else {
      var message_l = "User find successfully.";
    }

    res.json({
      status_code: 200,
      msg: "success",
      message: message_l,
      data,
    });
  } catch (error) {
    console.log(error);

    if (req.body.language == "ka") {
      var message_l = "მონაცემების მოძიებისას დაფიქსირდა შეცდომა";
    } else {
      var message_l = "Some error occurred while searching data.";
    }

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


