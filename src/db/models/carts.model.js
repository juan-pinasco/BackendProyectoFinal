import mongoose from "mongoose";

const cartsSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  products: [
    {
      product: { type: mongoose.Schema.Types.ObjectId, ref: "products" },
      quantity: { type: Number },
    },
  ],
});

export const cartsModel = mongoose.model("carts", cartsSchema);
