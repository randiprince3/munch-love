module.exports = function(sequelize, DataTypes) {
  
  //userinfo data structure
  var Userinfo = sequelize.define("Userinfo", {
    id: {
      primaryKey: true,
      type: DataTypes.INTEGER,
      autoIncrement: true,
      isUnique: true
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 100]
      }
    },
    password: {
      type: DataTypes.STRING,
      required: true,
      validate: {
        len: [1, 100]
      }
    },
    email: {
      type: DataTypes.STRING,
      required: true,
      len: [1, 100]
    },
    createdAt: {
      type: DataTypes.DATE
    },
    status: {
      type: DataTypes.ENUM("active", "inactive"),
      defaultValue: "active"
    }
  });
  
  // this allows table userfavorite to join with table userinfo in SQL
  //keep in mind this is also called in the other models table
  Userinfo.associate = function(models) {
    Userinfo.hasMany(models.Userfavorite, {
      onDelete: "cascade"
    });
  };
  return Userinfo;
};


