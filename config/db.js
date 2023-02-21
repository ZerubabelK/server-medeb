const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
module.exports = {
  connect_db: async () => {
    mongoose
      .connect(process.env.MONGO_URL)
      .then(() => {
        console.log(`MongoDB Connected`.cyan.underline.bold);
      })
      .catch((err) => {
        throw err;
      });
  },
};
