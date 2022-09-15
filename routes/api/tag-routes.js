const router = require("express").Router();
const { Tag, Product, ProductTag } = require("../../models");

// The `/api/tags` endpoint

// Get route to find all tags
router.get("/", async (req, res) => {
  try {
    // Variable to await the find all method on the tag model
    const tagData = await Tag.findAll({
      // Include the products associated with each category
      include: [{ model: Product }],
    });

    // Send a response status of 200 with the results in JSON
    res.status(200).json(tagData);

    // Catch for errors
  } catch (err) {
    // Send a response status of 500 and the error in JSON
    res.status(500).json(err);
  }
});

// Get route to find one tag by its id
router.get("/:id", async (req, res) => {
  try {
    // Variable to await the find all method on the tag model
    const tagData = await Tag.findByPk(req.params.id, {
      // Include the products associated with each category
      include: [{ model: Product }],
    });

    // Send a response status of 200 with the results in JSON
    res.status(200).json(tagData);

    // Catch for errors
  } catch (err) {
    // Send a response status of 500 and the error in JSON
    res.status(500).json(err);
  }
});

router.post("/", (req, res) => {
  // create a new tag
});

router.put("/:id", (req, res) => {
  // update a tag's name by its `id` value
});

router.delete("/:id", (req, res) => {
  // delete on tag by its `id` value
});

module.exports = router;
