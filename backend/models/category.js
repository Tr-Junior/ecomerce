const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CategorySchema = Schema({
    name: {
        type: String,
        required: true
    },
    code: {
        type: String,
        required: true
    },
    disponibility: {
        type: Boolean,
        default: true
    },
    product: {
        type: [{ type: Schema.Types.ObjectId, ref: "Product" }]
    },
    store: {
        type: Schema.Types.ObjectId, ref: "Loja"
    }
}, { timestamps: true });

module.exports = mongoose.model("Category", CategorySchema);