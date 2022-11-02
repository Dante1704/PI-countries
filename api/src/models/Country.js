const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('Country', {
    id: {
      type: DataTypes.CHAR(3), //tiene que ser exactamente 3. por ejemplo Mexico -> MEX
      allowNull: false, // no puede ser nulo es un campo obligatorio y es la PK
      primaryKey: true,
      unique: true, //tambien debe ser unico de cada pais
      validate: {
        len: [3, 3]
      }
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    flags: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    continents: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    capital: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    subregion: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    area: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    population: {
      type: DataTypes.BIGINT,
      allowNull: true
    }
  }, {
    timestamps: false
  });
};
