import mongoose from "mongoose";

const cartsSchema = new mongoose.Schema({
  order_number: {
    type: Number,
    //required: true,
  },
  users: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
  },

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
  price: { type: Number },
});

export const cartsModel = mongoose.model("carts", cartsSchema);
