const express = require("express")
const router = express.Router()
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY)

router.get("/config", (req, res) => {
    res.send({
        publishableKey: process.env.STRIPE_PUBLISHABLE_KEY
    })
})

router.post("/create-payment-intent", async(req, res) => {
    try {
        const paymentIntent = await stripe.paymentIntents.create({
            currency: "CAD",
            amount: 100,
            automatic_payment_methods: { enabled: true }
        })
        res.send({
            clientSecret: paymentIntent.client_secret
        })
    } catch(err) {
        res.status(400).send({
            message: err.message
        })
    }
})

module.exports = router