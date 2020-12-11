"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MoveModel = void 0;
const sequelize_1 = require("sequelize");
const connection_1 = require("./connection");
;
const MoveModel = connection_1.sequelize.define("MoveModel", {
    name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    types: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    areas: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    timeLog: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    isClassic: {
        type: sequelize_1.DataTypes.ENUM,
        values: ["true", "false"]
    },
    isHot: {
        type: sequelize_1.DataTypes.ENUM,
        values: ["true", "false"]
    },
    description: {
        type: sequelize_1.DataTypes.STRING,
    },
    poster: {
        type: sequelize_1.DataTypes.STRING,
    }
}, {
    tableName: "movetable",
    paranoid: true,
    deletedAt: true,
    updatedAt: true
});
exports.MoveModel = MoveModel;
