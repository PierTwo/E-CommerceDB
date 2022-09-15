const { Model, DataTypes } = require("sequelize");

const sequelize = require("../config/connection");

class ProductTag extends Model {}

// Initializes the Product Tag model
ProductTag.init(
  {
    // Column for product tag id to be used as the primary key
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    // Column to reference product id
    product_id: {
      type: DataTypes.INTEGER,
      // References the product id column
      references: {
        model: "product",
        key: "id",
      },
    },
    // Column to reference tag id
    tag_id: {
      type: DataTypes.INTEGER,
      // References the tag id column
      references: {
        model: "tag",
        key: "id",
      },
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "product_tag",
  }
);

module.exports = ProductTag;
