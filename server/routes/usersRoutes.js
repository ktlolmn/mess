const router = require('express').Router();

const { setUp, onChat, getAllContacts } = require('../controllers/userControllers');

router.get("/setUp",setUp);
router.post("/onChat",onChat);
router.get("/getAllContacts/:id/",getAllContacts);


module.exports = router;