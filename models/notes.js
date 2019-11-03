module.exports = function(sequelize, DataTypes) {
  var Notes = sequelize.define("Notes", {
    notesIndex: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true
    },
    notes: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    puffinIndex: DataTypes.INTEGER,
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE
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
