sequelize model:generate --name Menu --attributes name:STRING,active:BOOLEAN

sequelize model:generate --name MenuCategory --attributes menuId:STRING,name:STRING,active:BOOLEAN

sequelize model:generate --name MenuPosition --attributes menuCategoryId:STRING,name:STRING,amount:DECIMAL,currencyId:INTEGER,active:BOOLEAN

sequelize model:generate --name Currency --attributes name:STRING,symbol:STRING,exchangeRate:DECIMAL,active:BOOLEAN

sequelize model:generate --name User --attributes firstName:STRING,lastName:STRING email:STRING,phoneNumber:STRING,role:INTEGER,active:BOOLEAN
