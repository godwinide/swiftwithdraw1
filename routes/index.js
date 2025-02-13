
const router = require("express").Router();


router.get("/", async (req, res) => {
    try {
        return res.render("index", { pageTitle: "Welcome", req, res });
    }
    catch (err) {
        return res.redirect("/");
    }
});

router.get("/about", async (req, res) => {
    try {
        return res.render("about-us", { pageTitle: "Welcome", req, res });
    }
    catch (err) {
        return res.redirect("/");
    }
});

router.get("/contact-us", async (req, res) => {
    try {
        return res.render("contact-us", { pageTitle: "Welcome", req, res });
    }
    catch (err) {
        return res.redirect("/");
    }
});

router.get("/forex", async (req, res) => {
    try {
        return res.render("forex", { pageTitle: "Welcome", req, res });
    }
    catch (err) {
        return res.redirect("/");
    }
});

router.get("/etfs", async (req, res) => {
    try {
        return res.render("etfs", { pageTitle: "Welcome", req, res });
    }
    catch (err) {
        return res.redirect("/");
    }
});

router.get("/shares", async (req, res) => {
    try {
        return res.render("forex", { pageTitle: "Welcome", req, res });
    }
    catch (err) {
        return res.redirect("/");
    }
});

router.get("/commodities", async (req, res) => {
    try {
        return res.render("commodities", { pageTitle: "Welcome", req, res });
    }
    catch (err) {
        return res.redirect("/");
    }
});

router.get("/options", async (req, res) => {
    try {
        return res.render("options", { pageTitle: "Welcome", req, res });
    }
    catch (err) {
        return res.redirect("/");
    }
});

router.get("/trade", async (req, res) => {
    try {
        return res.render("trade", { pageTitle: "Welcome", req, res });
    }
    catch (err) {
        return res.redirect("/");
    }
});


router.get("/indices", async (req, res) => {
    try {
        return res.render("indices", { pageTitle: "Welcome", req, res });
    }
    catch (err) {
        return res.redirect("/");
    }
});


router.get("/crypto", async (req, res) => {
    try {
        return res.render("crypto", { pageTitle: "Welcome", req, res });
    }
    catch (err) {
        return res.redirect("/");
    }
});

router.get("/services", async (req, res) => {
    try {
        return res.render("index", { pageTitle: "Welcome", req, res });
    }
    catch (err) {
        return res.redirect("/");
    }
});

router.get("/faq", async (req, res) => {
    try {
        return res.render("faq", { pageTitle: "Welcome", req, res });
    }
    catch (err) {
        return res.redirect("/");
    }
});

router.get("/accounts-comparison", async (req, res) => {
    try {
        return res.render("accounts-comparison", { pageTitle: "Welcome", req, res });
    }
    catch (err) {
        return res.redirect("/");
    }
});


module.exports = router;