const router = require("express").Router();
const { Tag, Product, ProductTag } = require("../../models");

// The `/api/tags` endpoint

// Get route to find all tags
router.get("/", async (req, res) => {
  try {
    // Variable to await the find all method on the Tag model
    const tagData = await Tag.findAll({
      // Include the products associated with each tag
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
    // Variable to await the find by primary key method on the Tag model
    const tagData = await Tag.findByPk(req.params.id, {
      // Include the products associated with each category
      include: [{ model: Product }],
    });

    if (!tagData) {
      return res
        .status(404)
        .json({ message: `Could not find a product tag with an id of ${req.params.id}` });
    }

    // Send a response status of 200 with the results in JSON
    res.status(200).json(tagData);

    // Catch for errors
  } catch (err) {
    // Send a response status of 500 and the error in JSON
    res.status(500).json(err);
  }
});

router.post("/", async (req, res) => {
  try {
    // Variable to await the create method on the Tag model
    // Pass the request body to serve as the data to add
    const addTag = await Tag.create(req.body);

    // If the user included product ids in the request body
    if (req.body.product_id) {
      // Map them out and return an object of the product ids and the id from the tag we created
      const productTagIdArr = req.body.product_id.map((product_id) => {
        return {
          product_id,
          tag_id: addTag.id,
        };
      });
      // Create the product tags to pair the tags with
      ProductTag.bulkCreate(productTagIdArr);
    }

    // Send a response status of 200 with the results in JSON
    res.status(200).json(addTag);

    // Catch for errors
  } catch (err) {
    // Send a response status of 500 and the error in JSON
    res.status(500).json(err);
  }
});

router.put("/:id", async (req, res) => {
  try {
    // Variable to await the update method on the Tag model
    // Pass the request id to update and the request body to update it with
    const updateTag = await Tag.update(req.body, { where: { id: req.params.id } });

    // If statement to handle a nonexistent id
    if (!updateTag) {
      // Return a 404 status response with a message that the id couldn't be found
      return res
        .status(404)
        .json({ message: `Could not find a product tag with an id of ${req.params.id}` });
    }

    // Send a response status of 200 with the results in JSON
    res.status(200).json(updateTag);

    // Catch for errors
  } catch (err) {
    // Send a response status of 500 and the error in JSON
    res.status(500).json(err);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    // Variable to await the destroy method on the Tag model
    // Pass the request parameters id for the tag to delete
    const deleteTag = await Tag.destroy({ where: { id: req.params.id } });

    // If statement to handle a nonexistent id
    if (!deleteTag) {
      // Return a 404 status response with a message that the id couldn't be found
      return res
        .status(404)
        .json({ message: `Could not find a product tag with an id of ${req.params.id}` });
    }

    // Send a response status of 200 with the results in JSON
    res.status(200).json(deleteTag);

    // Catch for errors
  } catch (err) {
    // Send a response status of 500 and the error in JSON
    res.status(500).json(err);
  }
});

module.exports = router;
