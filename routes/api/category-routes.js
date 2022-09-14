const router = require("express").Router();
const { Category, Product } = require("../../models");

// The `/api/categories` endpoint

// Get route to find all categories
router.get("/", async (req, res) => {
  // be sure to include its associated Products
  try {
    // Variable to await the find all method on the Category Model
    const categoryData = await Category.findAll();

    // Send a response status of 200 with the results in JSON
    res.status(200).json(categoryData);
    // Catch for errors
  } catch (err) {
    // Send a response status of 500 and the error in JSON
    res.status(500).json(err);
  }
});

// Get route to find a category by its id
router.get("/:id", async (req, res) => {
  // be sure to include its associated Products
  try {
    // Variable to await the find by primary key method on the Category Model
    // Pass the id from the request to the method
    const categoryData = await Category.findByPk(req.params.id);

    // If statement to handle a nonexistent id
    if (!categoryData) {
      // Return a 404 status response with a message that the id couldn't be found
      return res
        .status(404)
        .json({ message: `Could not find a product category with an id of ${req.params.id}` });
    }

    // Send a response status of 200 with the results in JSON
    res.status(200).json(categoryData);
    // Catch for errors
  } catch (err) {
    console.log(err);
    // Send a response status of 500 and the error in JSON
    res.status(500).json(err);
  }
});

router.post("/", (req, res) => {
  // create a new category
});

router.put("/:id", (req, res) => {
  // update a category by its `id` value
});

router.delete("/:id", (req, res) => {
  // delete a category by its `id` value
});

module.exports = router;
