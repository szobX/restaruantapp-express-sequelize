# Restaruant API project

# INIT PROJEKTU:

Install Sequelize: yarn add sequelize [https://www.npmjs.com/package/sequelize].
Install Sequelize CLI: yarn add sequelize-cli -D [https://www.npmjs.com/package/sequelize-cli].

Edycj config/config.json pod własną bazę jeśli trzeba

```shell
sequelize db:create
> sequelize db:migrations
> sequelize db:seed:all
```

```shell
sequelize db:create

> sequelize init:migrations
> sequelize init:seeders
```

#Create new migration:

```shell
> sequelize migration:generate --name {NAME}
```

#Create new Seeder:

```shell
> sequelize seeder:generate --name test
```
