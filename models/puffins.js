module.exports = function(sequelize, DataTypes) {
  var Puffins = sequelize.define("Puffins", {
    puffinIndex: {
      Type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false
    },
    puffinName: {
      Type: DataTypes.STRING,
      allowNull: true
    },
    gender: {
      Type: DataTypes.STRING,
      allowNull: false
    },
    age: {
      Type: DataTypes.INTEGER,
      allowNull: false
    }
  });

  Puffins.associate = function(models) {
    // Associating Author with Posts
    // When an Author is deleted, also delete any associated Posts
    Puffins.hasMany(models.Notes, {
      onDelete: "cascade"
    });
    Puffins.hasMany(models.Imageurls, {
      onDelete: "cascade"
    });
  };
  return Puffins;
};
