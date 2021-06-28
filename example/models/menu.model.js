// import { sequelize, Sequelize } from '../init.js';

export default (sequelize, Sequelize) => {
    const Menu = sequelize.define(
        'Menu',
        {
            id: {
                type: Sequelize.UUID,
                primaryKey: true,
                defaultValue: Sequelize.UUIDV4,
                allowNull: false,
            },
            name: {
                type: Sequelize.STRING,
                allowNull: true,
            },

            active: {
                type: Sequelize.BOOLEAN,
                allowNull: true,
                defaultValue: true,
            },
        },
        {},
    );

    Menu.associate = function (models) {
        Menu.hasMany(models.menucategories, { as: 'menuCategories' });
    };

    return Menu;
};
