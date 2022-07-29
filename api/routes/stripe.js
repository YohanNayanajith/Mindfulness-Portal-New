const router = require("express").Router();
// const stripe = require("stripe")(process.env.STRIPE_KEY);
const Stripe = require('stripe');
const stripe = Stripe(process.env.STRIPE_KEY);

router.post("/create-payment-intent", async (req, res) => {
  console.log("Payment hari");
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: req.body.amount, //lowest denomination of particular currency
      currency: req.body.currency,
      payment_method_types: ["card"], //by default
    });

    
    const clientSecret = paymentIntent.client_secret;
    console.log(clientSecret);

    res.json({
      clientSecret: clientSecret,
    });
  } catch (e) {
    console.log(e.message);
    res.json({ error: e.message });
  }
});

router.post("/payment", (req, res) => {
  console.log(stripe);
  stripe.charges.create(
    {
      source: req.body.tokenId,
      amount: req.body.amount,
      currency: "usd",
      description: 'My First Test Charge (created for API docs at https://www.stripe.com/docs/api)',
    },
    (stripeErr, stripeRes) => {
      if (stripeErr) {
        res.status(500).json(stripeErr);
      } else {
        res.status(200).json(stripeRes);
      }
    }
  );
});

module.exports = router;
