const router = require('express').Router();

const { addMessage, getAllMessages } = require('../controllers/messageController');

router.post("/sendMessage",addMessage);
router.post("/getAllMessages",getAllMessages);


module.exports = router;