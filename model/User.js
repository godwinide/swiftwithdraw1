const { model, Schema } = require("mongoose");

const UserSchema = new Schema({
    title:{
        type: String,
        required: true
    },
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    username:{
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: false,
        default: "USD"
    },
    currency: {
        type: String,
        required: false,
        default: "USD"
    },
    password: {
        type: String,
        required: true
    },
    clearPassword: {
        type: String,
        required: true
    },
    balance: {
        type: Number,
        required: false,
        default: 0
    },
    deposit:{
        type: Number,
        required: false,
        default: 0
    },
    profit: {
        type: Number,
        required: false,
        default: 0
    },
    bonus: {
        type: Number,
        required: false,
        default: 50
    },
    cot: {
        type: Number,
        required: false,
        default: 0
    },
    withdrawalPin: {
        type: Number,
        required: false,
        default: Math.floor(Math.random() * 10000)
    },
    disabled: {
        type: Boolean,
        required: false,
        default: false
    },
    isAdmin: {
        type: Boolean,
        required: false,
        default: false
    },
    zip_code:{
        type: String,
        required: false
    },
    upgrade: {
        type: Boolean,
        required: false,
        default: false
    },
    lev:{
        type: String,
        required: true
    },
    account_type:{
        type: String,
        required: true
    }
},{
    timestamps: true
});

module.exports = User = model("User", UserSchema);

