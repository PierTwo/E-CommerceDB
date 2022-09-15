const router = require("express").Router();
const { Category, Product } = require("../../models");

// The `/api/categories` endpoint

// Get route to find all categories
router.get("/", async (req, res) => {
  try {
    // Variable to await the find all method on the Category model
    const categoryData = await Category.findAll({
      // Include the products associated with each category
      include: [{ model: Product }],
    });

    // Send a response status of 200 with the results in JSON
    res.status(200).json(categoryData);

    // Catch for errors
  } catch (err) {
    // Send a response status of 500 and the error in JSON
    res.status(500).json(err);
  }
});

// Get route to find one category by its id
router.get("/:id", async (req, res) => {
  try {
    // Variable to await the find by primary key method on the Category model
    // Pass the id to find from the request parameters
    const categoryData = await Category.findByPk(req.params.id, {
      include: [{ model: Product }],
    });

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

// Post route to create a category
router.post("/", async (req, res) => {
  try {
    // Variable to await the create method on the Category model
    // Pass the request body to serve as the data to add
    const addCategory = await Category.create(req.body);

    // Send a response status of 200 with the results in JSON
    res.status(200).json(addCategory);

    // Catch for errors
  } catch (err) {
    // Send a response status of 500 and the error in JSON
    res.status(500).json(err);
  }
});

// Put route to update a category
router.put("/:id", async (req, res) => {
  try {
    // Variable to await the update method on the Category model
    // Pass the request id to update and the request body to update it with
    const updateCategory = await Category.update(req.body, { where: { id: req.params.id } });

    // If statement to handle a nonexistent id
    if (!updateCategory) {
      // Return a 404 status response with a message that the id couldn't be found
      return res
        .status(404)
        .json({ message: `Could not find a product category with an id of ${req.params.id}` });
    }

    // Send a response status of 200 with the results in JSON
    res.status(200).json(updateCategory);

    // Catch for errors
  } catch (err) {
    // Send a response status of 500 and the error in JSON
    res.status(500).json(err);
  }
});

// Delete route to delete a category
router.delete("/:id", async (req, res) => {
  try {
    // Variable to await the destroy method on the Category model
    // Pass the id to delete from the request parameters
    const deleteCategory = await Category.destroy({ where: { id: req.params.id } });

    // If statement to handle a nonexistent id
    if (!deleteCategory) {
      // Return a 404 status response with a message that the id couldn't be found
      return res
        .status(404)
        .json({ message: `Could not find a product category with an id of ${req.params.id}` });
    }

    // Send a response status of 200 with the results in JSON
    res.status(200).json(deleteCategory);

    // Catch for errors
  } catch (err) {
    // Send a response status of 500 and the error in JSON
    res.status(500).json(err);
  }
});

module.exports = router;
