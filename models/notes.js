module.exports = function(sequelize, DataTypes) {
  var Notes = sequelize.define("Notes", {
    notesIndex: {
      Type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false
    },
    notes: {
      Type: DataTypes.TEXT,
      allowNull: false
    },
    puffinIndex: {
      Type: DataTypes.INTEGER,
      allowNull: false
    }
  });

  Notes.associate = function(models) {
    // We're saying that a Post should belong to an Author
    // A Post can't be created without an Author due to the foreign key constraint
    Notes.belongsTo(models.Puffins, {
      foreignKey: {
        allowNull: false
      }
    });
  };
  return Notes;
};
