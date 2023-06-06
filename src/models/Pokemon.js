const { DataTypes } = require('sequelize');

// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('pokemon', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,

    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    attack: {
      type: DataTypes.INTEGER,
      validate: {
        isNumeric: {msg: 'It must be an integer number.'},
      },
      defaultValue: 40, 
    },
    defense: {
      type: DataTypes.INTEGER,
      validate: {
        isNumeric: {msg: 'It must be an integer number.'},
      },
      defaultValue: 40, 
    },
    speed: {
      type: DataTypes.INTEGER,
      validate: {
        isNumeric: {msg: 'It must be an integer number.'},
      },
      defaultValue: 50, 
    },
    hp: {
      type: DataTypes.INTEGER,
      validate: {
        isNumeric: {msg: 'It must be an integer number.'},
      },
      defaultValue: 70, 
    },
    height: {
      type: DataTypes.INTEGER,
      validate: {
        isNumeric: {msg: 'It must be an integer number.'},
      },
      defaultValue: 4, 
    },
    weight: {
      type: DataTypes.INTEGER,
      validate: {
        isNumeric: {msg: 'It must be an integer number.'},
      },
      defaultValue: 20, 
    },
    img: {
      type: DataTypes.STRING,
      defaultValue: "https://i.pinimg.com/564x/43/ed/d5/43edd5aa5f0de7f410f5e38326f4b94c.jpg",
    },
    createdInDB: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    }
  }, {
    timestamps: false
  });
};
