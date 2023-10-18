import mongoose from "mongoose";

const cartsSchema = new mongoose.Schema({
  products: [
    {
      product: { type: mongoose.Schema.Types.ObjectId, ref: "Products" },
      quantity: { type: Number },
    },
  ],
  totalAmount: { type: Number, default: 0 },

  productsNotPurchased: [
    {
      product: { type: mongoose.Schema.Types.ObjectId, ref: "Products" },
      quantity: { type: Number },
    },
  ],
});

export const cartsModel = mongoose.model("carts", cartsSchema);
