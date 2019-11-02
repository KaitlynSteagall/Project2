module.exports = function(sequelize, DataTypes) {
  var Public = sequelize.define("Public", {
    publicIndex: {
      Type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false
    },
    publicName: {
      Type: DataTypes.STRING,
      allowNull: false
    },
    comments: {
      Type: DataTypes.TEXT,
      allowNull: true
    },
    photos: {
      Type: DataTypes.STRING,
      allowNull: true
    }
  });
  return Public;
};
