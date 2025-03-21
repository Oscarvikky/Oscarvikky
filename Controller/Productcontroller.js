// const { cloudinary } = require("../Config/cloudinary");

const { cloudinary } = require("../Config/cloudinary");
const productModel = require("../Model/ProductModel");

const createProduct = async (req, res) => {
  const {
    ProductName,
    ProductPrice,
    ProductDescription,
    ProductImage,
    ProductCategory,
  } = req.body;

  if (
    !ProductName ||
    !ProductPrice ||
    !ProductDescription ||
    !ProductImage ||
    !ProductCategory
  ) {
    res.status(400).send({ message: "all fileds are mandatory" });
  } else {
    try {
      //    const ImageUpload = await cloudinary.uploader(ProductImage, {Folder: "ProductImages"})
      const ImageUpload = await cloudinary.uploader.upload(ProductImage, {
        folder: "ProductImages",
      });
      const productLink = ImageUpload.secure_url;
      console.log("productlink : ", productLink);

      const createProduct = await productModel.create({
        ProductName,
        ProductPrice,
        ProductDescription,
        ProductCategory,
        ProductImage: productLink,
      });
      if (createProduct) {
        res
          .status(200)
          .send({ message: "product created suceessfully", status: true });
      } else {
        res.status(400).send({ message: "error uploading product" });
      }
    } catch (error) {
      console.log("server error", error);
    }
  }
};

const fetch = async (req, res) => {
  try {
    const product = await productModel.find();
    if (product) {
      res.status(200).send({ product, status: true });
    }
  } catch (error) {
    console.log("server err", error);
    res.status(500).send({ message: "server error" });
  }
};

const editproduct = async (req, res) => {
  const {
    _id,
    ProductName,
    ProductPrice,
    ProductDescription,
    ProductCategory,
    ProductImage,
  } = req.body;
  if (
    !_id ||
    !ProductName ||
    !ProductPrice ||
    !ProductDescription ||
    !ProductCategory ||
    !ProductImage
  ) {
    res.status(400).send({ message: "All inputs are mandatory" });
  } else {
    const details = {
      _id,
      ProductName,
      ProductPrice,
      ProductDescription,
      ProductCategory,
      ProductImage,
    };
    try {
      const updated = await productModel.findByIdAndUpdate(
        { _id },
        {
          ProductName,
          ProductPrice,
          ProductDescription,
          ProductCategory,
          ProductImage,
        },
        { new: true }
      );
      if (updated) {
        res.status(200).send({
          message: "Product updated successfully",
          status: true,
          _id: updated.id,
          details,
        });
      }
    } catch (error) {
      console.log("server error", error);
      res.status(500).send({ message: "internal server error" });
    }
  }
};

const Delete = async (req, res) => {
  const _id = req.body;
  const deleteitem = await productModel.findByIdAndDelete(_id);
  try {
    if (deleteitem) {
      res.status(200).send({ message: "product deleted sucessfully" });
    } else {
      res.status(404).send({ message: "product not found" });
    }
  } catch (error) {
    console.log("internal server error", error);
    res.status(500).send({ message: "internal server error" });
  }
};
// creating endpoint for new added product
const newcollection = async (req, res) => {
  let products = await productModel.find({});
  let newcollection = products.slice(1).slice(-8);
  console.log("newcollection fetched");
  res.status(200).send(newcollection);
};

// creating endpoint for popular in women category

const popular_in_Women = async (req, res) => {
  try {
    let women = await productModel.find({ ProductCategory: "women" }).limit(8);
    //   let popular_in_women = women.slice(0, 4);
    if (!women) {
      res.status(404).send({ message: "no product found" });
    } else console.log("popular in women fecthed");
    res.status(200).send(women);
  } catch (error) {
    console.error("error fecthing popular in women:", error);
    res.status(500).json({ error: "failed" });
  }
};

module.exports = {
  createProduct,
  fetch,
  editproduct,
  Delete,
  newcollection,
  popular_in_Women,
};
