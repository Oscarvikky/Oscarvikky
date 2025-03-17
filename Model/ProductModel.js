const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    ProductName: {
      type: String,
      required: true,
      trim: true,
    },
    ProductDescription: {
      type: String,
      required: true,
    },
    ProductPrice: {
      type: String,
      required: true,
    },
    ProductImage: {
      type: String,
      required: true,
    },
    ProductCategory: {
      type: String,
      required: true,
      enum: ["men", "women", "kids"],
    },
  },
  { timestamps: true }
);

const productModel = mongoose.model("product", ProductSchema);

module.exports = productModel;
