const mongoose = require("mongoose")
const schema = mongoose.Schema

const productSchema = new schema({
    title: {
        type: String,
        required: true
    },
    desc: {
        type: String,
    },
    sku: {
        type: String,
        required: true
    },
    cat: {
        type: Array
    },
    price: {
        type: Number,
        required: true
    },
    color: {
        type: Array,
    },
    storage: {
        type: Array,
    },
    condition: {
        type: Array,
    },
    variation: {
        type: Array
    }
}, { timestamps: true })

module.exports = mongoose.model('Product', productSchema)