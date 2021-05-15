const express = require("express");


const Subscriber = require("../models/subscriber");
const subscriberController = require('../controllers/subscriber');



const router = express.Router();




router.get("", subscriberController.getSubscribers);

router.post("" , subscriberController.addSubscriber);



module.exports = router;
