const { Client, Environment } = require('square');
const config = require('../config/config'); // Assuming you have a config file for environment variables

// Initialize the Square client
const squareClient = new Client({
  environment: config.env === 'production' ? Environment.Production : Environment.Sandbox,
  accessToken: config.squareAccessToken,
});

/**
 * Process a payment using Square
 * @param {String} nonce - Payment nonce
 * @param {Number} amount - Payment amount in smallest currency unit (e.g., cents)
 * @returns {Promise<Object>} - Result of the payment process
 */
const processSquarePayment = async (nonce, amount) => {
  try {
    const paymentsApi = squareClient.paymentsApi;

    const requestBody = {
      sourceId: nonce,
      amountMoney: {
        amount, // Amount in the smallest currency unit (e.g., cents for USD)
        currency: 'USD',
      },
      idempotencyKey: `${nonce}-${Date.now()}`, // Unique key to prevent duplicate charges
    };

    const response = await paymentsApi.createPayment(requestBody);
    return { success: true, paymentId: response.result.payment.id };
  } catch (error) {
    console.error('Error processing payment:', error);
    return { success: false, message: error.message };
  }
};

/**
 * Distribute funds between admin and seller
 * @param {String} buyerId - Buyer ID (can be used for tracking/logging)
 * @param {String} sellerId - Seller ID
 * @param {Number} adminAmount - Amount to be distributed to the admin in smallest currency unit
 * @param {Number} sellerAmount - Amount to be distributed to the seller in smallest currency unit
 * @returns {Promise<Object>} - Result of the fund distribution process
 */
const distributeFunds = async (buyerId, sellerId, adminAmount, sellerAmount) => {
  try {
    // This is a placeholder for actual fund distribution logic.
    // In a real-world scenario, you'd likely need to handle transfers between accounts
    // using Square's APIs or by another method supported by your financial setup.
    
    // Example: Use the `createPayment` function to simulate a transfer for both admin and seller.
    
    const adminTransferResult = await processSquarePayment(buyerId, adminAmount);
    if (!adminTransferResult.success) {
      throw new Error('Admin fund distribution failed');
    }

    const sellerTransferResult = await processSquarePayment(buyerId, sellerAmount);
    if (!sellerTransferResult.success) {
      throw new Error('Seller fund distribution failed');
    }

    return { success: true };
  } catch (error) {
    console.error('Error distributing funds:', error);
    return { success: false, message: error.message };
  }
};

module.exports = {
  processSquarePayment,
  distributeFunds,
};
