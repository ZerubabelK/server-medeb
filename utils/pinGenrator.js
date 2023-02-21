module.exports = {
  PINGenerator: function generatePinCode() {
    // Generate a random number between 1000 and 9999
    const pin = Math.floor(Math.random() * 9000) + 1000;

    return pin.toString();
  },
};
