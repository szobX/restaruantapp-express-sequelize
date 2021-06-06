export default (sequelize, Sequelize) => {
    return sequelize.define('Currency', {
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
        symbol: {
            type: Sequelize.STRING,
            allowNull: true,
            unique: true,
        },
        exchangeRate: {
            type: Sequelize.DECIMAL,
            allowNull: true,
        },
        createdOn: {
            type: Sequelize.DATE,
            allowNull: true,
        },
        active: {
            type: Sequelize.BOOLEAN,
            allowNull: true,
            defaultValue: true,
        },
    });
};
