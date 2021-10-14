'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.Post.hasMany(models.Comment, {
        foreignKey: {
          allowNull: false
        }
      })
      models.Post.hasMany(models.Comment, {
        foreignKey: {
          allowNull: false
        }
      })
    }
  };
  Comment.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    PostId: DataTypes.INTEGER,
    UserId: DataTypes.INTEGER,
    comment: DataTypes.STRING,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Comment',
  });
  return Comment;
};