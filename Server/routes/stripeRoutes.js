const stripeRoute = require("express").Router();
const stripe = require("stripe")(process.env.STRIPE_KEY);

stripeRoute.post("/payment", async (req, res) => {
  try {
    //webdevsimp
    const villaData = req.body.final;
    console.log(villaData);
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: 
      [
         {
          price_data: {
            currency: "IDR",
            product_data: {
              name: villaData.title,
            },
            unit_amount: villaData.total*100,
          },
          quantity: 1,
        }
      ],
      success_url: `${process.env.FRONTEND_URL}/success`,
      cancel_url: `${process.env.FRONTEND_URL}/cart`,
    });

    res.json({ url: session.url });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error });
  }
});

module.exports = stripeRoute;