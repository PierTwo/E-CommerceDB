const router = require("express").Router();
const { Product, Category, Tag, ProductTag } = require("../../models");

// The `/api/products` endpoint

// Get route to find all products
router.get("/", async (req, res) => {
  try {
    // Variable to await the find all method on the Product model
    const productData = await Product.findAll({
      // Include the categories and tags associated with each product
      include: [{ model: Category }, { model: Tag }],
    });

    // Send a response status of 200 with the results in JSON
    res.status(200).json(productData);

    // Catch for errors
  } catch (err) {
    // Send a response status of 500 and the error in JSON
    res.status(500).json(err);
  }
});

// Get route to find one product by its id
router.get("/:id", async (req, res) => {
  try {
    // Variable to await the find by primary key method on the Product model
    const productData = await Product.findByPk(req.params.id, {
      include: [{ model: Category }, { model: Tag }],
    });

    // If statement to handle a nonexistent id
    if (!productData) {
      // Return a 404 status response with a message that the id couldn't be found
      return res
        .status(404)
        .json({ message: `Could not find a product with an id of ${req.params.id}` });
    }

    // Send a response status of 200 with the results in JSON
    res.status(200).json(productData);
    // Catch for errors
  } catch (err) {
    // Send a response status of 500 and the error in JSON
    res.status(500).json(err);
  }
});

// create new product
router.post("/", (req, res) => {
  /* req.body should look like this...
    {
      product_name: "Basketball",
      price: 200.00,
      stock: 3,
      tagIds: [1, 2, 3, 4]
    }
  */
  Product.create(req.body)
    .then((product) => {
      // if there's product tags, we need to create pairings to bulk create in the ProductTag model
      if (req.body.tagIds.length) {
        const productTagIdArr = req.body.tagIds.map((tag_id) => {
          return {
            product_id: product.id,
            tag_id,
          };
        });
        return ProductTag.bulkCreate(productTagIdArr);
      }
      // if no product tags, just respond
      res.status(200).json(product);
    })
    .then((productTagIds) => res.status(200).json(productTagIds))
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
});

// update product
router.put("/:id", (req, res) => {
  // update product data
  Product.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
    .then((product) => {
      // find all associated tags from ProductTag
      return ProductTag.findAll({ where: { product_id: req.params.id } });
    })
    .then((productTags) => {
      // get list of current tag_ids
      const productTagIds = productTags.map(({ tag_id }) => tag_id);
      // create filtered list of new tag_ids
      const newProductTags = req.body.tagIds
        .filter((tag_id) => !productTagIds.includes(tag_id))
        .map((tag_id) => {
          return {
            product_id: req.params.id,
            tag_id,
          };
        });
      // figure out which ones to remove
      const productTagsToRemove = productTags
        .filter(({ tag_id }) => !req.body.tagIds.includes(tag_id))
        .map(({ id }) => id);

      // run both actions
      return Promise.all([
        ProductTag.destroy({ where: { id: productTagsToRemove } }),
        ProductTag.bulkCreate(newProductTags),
      ]);
    })
    .then((updatedProductTags) => res.status(200).json(updatedProductTags))
    .catch((err) => {
      // console.log(err);
      res.status(400).json(err);
    });
});

router.delete("/:id", async (req, res) => {
  try {
    // Variable to await the destroy method on the Product model
    // Pass the id to delete from the request parameters
    const deleteProduct = await Product.destroy({ where: { id: req.params.id } });

    // If statement to handle a nonexistent id
    if (!deleteProduct) {
      // Return a 404 status response with a message that the id couldn't be found
      return res
        .status(404)
        .json({ message: `Could not find a product with an id of ${req.params.id}` });
    }

    // Send a response status of 200 with the results in JSON
    res.status(200).json(deleteProduct);

    // Catch for errors
  } catch (err) {
    // Send a response status of 500 and the error in JSON
    res.status(500).json(err);
  }
});

module.exports = router;
