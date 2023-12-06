module.exports = {
  proxyURL: "http://url:port",
  TWITTER: {
    consumerkey: "yourconsumerkey",
    consumerSecrete: "yourconsumersecrete",
  },
  GOOGLE: {
    consumerkey: "yourconsumerkey",
    consumerSecrete: "yourconsumersecrete",
  },
  FACEBOOK: {
    consumerkey: "yourconsumerkey",
    consumerSecrete: "yourconsumersecrete",
  },
  site_url: "http://52.200.210.202:3001/",
  admin_mail: "ds@mailinator.com",
  site_name: "lifferent",
  senderHost: "smtp.gmail.com",
  senderPort: "587",
  senderUsername: "test@gmail.com",
  senderPassword: "tests",
  senderFrom: "lifferent<test@gmail.com>",
  orderNumber: 1000,
  status: {
    Active: "1",
    Deactive: "0",
  },
  rating: {
    Restaurant: "1",
    Food: "2",
  },
  DeliveryType: {
    Now: "1",
    Later: "2",
  },
  orderStatus: {
    Pending: "0",
    Processing: "1",
    Delivered: "2",
    Cancelled: "3",
  },
  paymentStatus: {
    Pending: "0",
    Paid: "1",
    Failed: "2",
    Refund: "3",
  },
  ImageDefaultPath: "C:/xampp/htdocs/ema/storage/app/public/upload",
  ImageDefaultURl:
    "http://192.168.1.240/public/storage/upload/",

    // ImageDefaultPath: "E:/xampp/htdocs/ola_doctor/storage/app/public/upload/",
    // ImageDefaultURl:
    //   "https://192.168.1.138/ola_doctor/public/public/storage/upload/",


  ImageRestaurant: "restaurant/",
  ImageMenuItem: "menuitems/",
  ImageCoupon: "coupon/",
  ImageProfile: "doctors/",
  ImageCategory: "categories/",
};
