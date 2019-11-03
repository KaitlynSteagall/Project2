module.exports = function(sequelize, DataTypes) {
  var Imageurls = sequelize.define("Imageurls", {
    imgIndex: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true
    },
    imgurl: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    artistName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    puffinIndex: DataTypes.INTEGER,
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE
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
