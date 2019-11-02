module.exports = function(sequelize, DataTypes) {
  var Puffins = sequelize.define("Puffins", {
    puffinIndex: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true
    },
    puffinName: {
      type: DataTypes.STRING,
      allowNull: true
    },
    gender: {
      type: DataTypes.STRING,
      allowNull: false
    },
    age: {
      type: DataTypes.INTEGER,
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
