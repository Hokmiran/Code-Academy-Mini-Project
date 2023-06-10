const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  tickets: [
    { type: mongoose.Schema.Types.ObjectId, ref: "Ticket", required: true },
  ],
  totalAmount: { type: Number, required: true },
  purchaseDate: { type: Date, required: true, default: Date.now },
});

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
