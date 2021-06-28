export default (sequelize, Sequelize) => {
    const MenuCategory = sequelize.define(
        'MenuCategory',
        {
            id: {
                type: Sequelize.UUID,
                primaryKey: true,
                defaultValue: Sequelize.UUIDV4,
                allowNull: false,
            },
            menuId: {
                type: Sequelize.UUID,
                allowNull: false,
                references: {
                    model: sequelize.models.Menu,
                    key: 'id',
                },
            },
            name: {
                type: Sequelize.STRING,
                allowNull: false,
            },

            active: {
                type: Sequelize.BOOLEAN,
                allowNull: true,
                defaultValue: true,
            },
        },
        {},
    );
    MenuCategory.associate = function (models) {
        MenuCategory.belongsTo(models.menus, {
            foreignKey: 'menuId',
            as: 'menu',
        });
    };
    return MenuCategory;
};
