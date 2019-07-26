module.exports = function(sequelize, DataTypes) {
    var Userfavorite = sequelize.define("Userfavorite", {
      favoritesID: DataTypes.TEXT,
      favoritesName: DataTypes.TEXT,
      favoritesPhone: DataTypes.TEXT,
      favoritesRating: DataTypes.TEXT,
      favoritesImage: DataTypes.TEXT
    });
   

  Userfavorite.associate = function(models) {

      // this allows table userfavorite to join with table userinfo in SQL
      //keep in mind this is also called in the other models table
      Userfavorite.belongsTo(models.Userinfo, {
        foreignKey: {
            allowNull: false
        }
      });
  };
  return Userfavorite;
};