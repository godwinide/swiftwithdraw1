const { model, Schema } = require("mongoose");

const HistorySchema = new Schema({
    amount: {
        type: Number,
        required: true
    },
    reference: {
        type: String,
        required: true
    },
    userID: {
        type: String,
        required: true
    },
    user: {
        type: Object,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: false,
        default: "pending"
    }
},{
    timestamps: true
});

module.exports = History = model("History", HistorySchema);