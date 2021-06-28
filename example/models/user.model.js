// import { RoleEnum } from '../enums/role.enum.js';

export default (sequelize, Sequelize) => {
    const User = sequelize.define('User', {
        id: {
            type: Sequelize.UUID,
            primaryKey: true,
            defaultValue: Sequelize.UUIDV4,
            allowNull: false,
        },
        firstName: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        lastName: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        email: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        phoneNumber: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        role: {
            type: Sequelize.INTEGER,
            allowNull: true,
        },

        active: {
            type: Sequelize.BOOLEAN,
            allowNull: true,
            defaultValue: true,
        },
    });
    return User;
};
