module.exports = function (sequelize, DataTypes) {
  var Users = sequelize.define("Users", {
    userIndex: {
      Type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false
    },
    userName: {
      Type: DataTypes.STRING,
      allowNull: false
    },
    passwordName: {
      Type: DataTypes.STRING,
      allowNull: false
    },
    accessLevel: {
      Type: DataTypes.INTEGER,
      allowNull: false
    }
  });
  return Users;
};
