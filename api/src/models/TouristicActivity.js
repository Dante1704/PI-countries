const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    sequelize.define('TouristicActivity', {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        difficulty: {
            type: DataTypes.SMALLINT,
            allowNull: false,
            validate: {
                min: 1,
                max: 5
            }
        },
        duration: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        season: {
            type: DataTypes.ENUM(['Summer', 'Autumn', 'Winter', 'Spring']),
            allowNull: false,
        }
    },
        {
            timestamps: false
        }
    );
}


