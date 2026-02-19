const createPaymentIntent = async (amount) => {
  // call payment gateway API
  return{
    clientSecret: "mock secret",
    amount,
  }
};

const verifyPayment = async (paymentData) => {
  // verify signature
  return true
};

module.exports = { createPaymentIntent, verifyPayment };
