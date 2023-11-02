const router = require('express').Router()
const checkAuth = require('../middlewares/checkAuth')
const walletController = require('../controller/walletController')

router
    .route('/')
    .get(checkAuth, walletController.getWalletDetails)

router
    .route('/createWallet')
    .get(checkAuth, walletController.addWallet)

module.exports = router;