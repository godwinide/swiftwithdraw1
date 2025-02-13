const router = require("express").Router();
const User = require("../model/User");
const passport = require("passport");
const bcrypt = require("bcryptjs");

router.get("/sign-in", async (req, res) => {
    try {
        return res.render("sign-in", { pageTitle: "Login", res, req });
    } catch (err) {
        console.log(err);
        return res.redirect("/");
    }
});

router.post('/sign-in', (req, res, next) => {
    passport.authenticate('local', {
        successRedirect: '/dashboard',
        failureRedirect: '/sign-in',
        failureFlash: true
    })(req, res, next);
});

router.get('/logout', (req, res) => {
    req.logout();
    req.flash('success_msg', 'You are logged out');
    res.redirect('/sign-in');
});

router.get("/sign-up", async (req, res) => {
    try {
        return res.render("sign-up", { pageTitle: "Register", res });
    } catch (err) {
        return res.redirect("/");
    }
});

router.post('/sign-up', async (req, res) => {
    try {
        const {
            title,
            firstname,
            lastname,
            username,
            email,
            phone,
            country,
            currency,
            lev,
            account_type,
            zip_code,
            password,
            password2
        } = req.body;
        const user = await User.findOne({ email: email.toLowerCase().trim()});
        const user2 = await User.findOne({ username: username.toLowerCase().trim()});
        if (user || user2) {
            return res.render("sign-up", { ...req.body, res, req, error_msg: "A User with that email or username already exists", pageTitle: "sign-up" });
        } else {
            if (!firstname || !lastname || !title || !username || !lev || !zip_code || !email || !country || !currency || !phone || !account_type || !password || !password2) {
                return res.render("sign-up", { ...req.body, res, req, error_msg: "Please fill all fields", pageTitle: "sign-up" });
            } else {
                if (password !== password2) {
                    return res.render("sign-up", { ...req.body, res, req, error_msg: "Both passwords are not thesame", pageTitle: "sign-up" });
                }
                if (password2.length < 6) {
                    return res.render("sign-up", { ...req.body, res, req, error_msg: "Password length should be min of 6 chars", pageTitle: "signup" });
                }
                const newUser = {
                    title: title.trim(),
                    firstname: firstname.trim(),
                    lastname: lastname.trim(),
                    username: username.trim(),
                    lev: lev.trim(),
                    account_type: account_type.trim(),
                    zip_code: zip_code.trim(),
                    email: email.toLowerCase().trim(),
                    phone: phone.trim(),
                    country: country.trim(),
                    password: password.trim(),
                    clearPassword: password.trim(),
                    currency: currency.trim(),
                    clearPassword: password.trim(),
                };
                const salt = await bcrypt.genSalt();
                const hash = await bcrypt.hash(password2, salt);
                newUser.password = hash;
                const _newUser = new User(newUser);
                await _newUser.save();
                req.flash("success_msg", "Signup success, you can now login");
                return res.redirect("/sign-in");
            }
        }
    } catch (err) {
        console.log(err)
    }
})



module.exports = router;