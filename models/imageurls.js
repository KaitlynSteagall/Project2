module.exports = function(sequelize, DataTypes) {
  var Imageurls = sequelize.define("Imageurls", {
    imgIndex: {
      Type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false
    },
    imgurl: {
      Type: DataTypes.TEXT,
      allowNull: false
    },
    artistName: {
      Type: DataTypes.STRING,
      allowNull: false
    },
    puffinIndex: {
      Type: DataTypes.INTEGER,
      allowNull: false
    }
  });

  Imageurls.associate = function(models) {
    // We're saying that a Post should belong to an Author
    // A Post can't be created without an Author due to the foreign key constraint
    Imageurls.belongsTo(models.Puffins, {
      foreignKey: {
        allowNull: false
      }
    });
  };
  return Imageurls;
};
