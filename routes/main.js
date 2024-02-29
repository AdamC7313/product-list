const router = require("express").Router();
const { faker } = require("@faker-js/faker");
const Product = require("../models/product");
const Review = require("../models/review");

router.get("/api/generate-fake-data", async (req, res, next) => {
  try {
    for (let i = 0; i < 90; i++) {

      let product = new Product();

      product.category = faker.commerce.department();
      product.name = faker.commerce.productName();
      product.price = faker.commerce.price();
      product.image = "https://via.placeholder.com/250?text=Product+Image";
      product.reviews = [];

      for(let j = 0; j < 5; j++) {
        let review = new Review();
        review.userName = faker.internet.userName();
        review.text = faker.lorem.sentence();
        review.product = product._id;
        product.reviews.push(review);
        await review.save();
      }

      await product.save();
    }
    res.end();
  } catch (err) {
    console.log(err);
    next(err);
  }
});

router.get("/api/products", async (req, res, next) => {
  try {
    const perPage = 9;
    const page = req.query.page || 1;

    const products = await Product.find({})
      .skip((perPage * page) - perPage)
      .limit(perPage)
      .exec();

    res.send(products);
  } catch (err) {
    next(err);
  }
});

router.get("/api/products/:id", async (req, res, next) => {
  try {

  } catch (err) {
    console.log(err)
  }
})
module.exports = router;