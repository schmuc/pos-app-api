// This is your test secret API key.
const stripe = require('stripe')('sk_test_51LH0bsFzDcdOT0YpuB6S38R5t8PX3d30c4m3RdBWILqyf0gcoYYcOirn4iGsjq5w3hA5RCV3WfzkoKqQyHfC5mqn00nYMX0sZk');
const express = require('express');
const app = express();
app.use(express.static('public'));

const YOUR_DOMAIN = 'http://localhost:3000/cart';

app.post('/create-checkout-session', async (req, res) => {
  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
        price: 'price_1LJ8v2FzDcdOT0YpVUj4QdNS',
        quantity: 1,
      },
    ],
    mode: 'payment',
    success_url: `${YOUR_DOMAIN}?success=true`,
    cancel_url: `${YOUR_DOMAIN}?canceled=true`,
  });

  res.redirect(303, session.url);
});

app.listen(4242, () => console.log('Running on port 4242'));