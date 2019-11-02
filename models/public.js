module.exports = function(sequelize, DataTypes) {
  var Public = sequelize.define("Public", {
    publicIndex: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true
    },
    publicName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    comments: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    photos: {
      type: DataTypes.STRING,
      allowNull: true
    }
  });
  return Public;
};
