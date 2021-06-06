export default (sequelize, Sequelize) => {
    const MenuPosition = sequelize.define('MenuPosition', {
        id: {
            type: Sequelize.UUID,
            primaryKey: true,
            defaultValue: Sequelize.UUIDV4,
            allowNull: false,
        },
        menuCategoryId: {
            type: Sequelize.UUID,
            allowNull: false,
            references: {
                model: sequelize.models.MenuCategory,
                key: 'id',
            },
        },
        name: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        amount: {
            type: Sequelize.DECIMAL,
            allowNull: false,
        },
        currencyId: {
            type: Sequelize.UUID,
            allowNull: false,
            references: {
                model: sequelize.models.Currency,
                key: 'id',
            },
        },
        active: {
            type: Sequelize.BOOLEAN,
            allowNull: true,
            defaultValue: true,
        },
    });
    return MenuPosition;
};
