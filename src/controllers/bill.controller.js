// import db from '../db/init.js';
const Bill = require('../../models/index.js').Bill;
const Order = require('../../models/index.js').Order;
const OrderPosition = require('../../models/index.js').OrderPosition;
const BillItem = require('../../models/index.js').BillItem;
const Currency = require('../../models/index').Currency;
var Sequelize = require('sequelize');
var Op = Sequelize.Op;
// const createPositions = async (arr,id) =>{
//    const a = await  OrderPosition.create({menuPositionId:id,orderId:id,active:true})
//     return a 
// }


// import RoleEnum from '../db/enums/role.enum.js';
const create = async (req, res) => {
    console.log(req.body);
    const bill = {
        orderId: req.body.orderId,
        active: true,
        createdAt: new Date(),
        updatedAt: new Date(),
    };
    let isEmpty = false;

    Object.keys(bill).forEach((key) => {
        if (bill[key] == undefined) isEmpty = true;
    });
    if (isEmpty) {
        return res.status(400).send({
            message: 'Body has Empty value',
        });
    }

    let order = null
    let price = 0;
    try{
        order =  await Order.findOne({
            where: {
                id: req.body.orderId,
            },
        })

        price = order.price;
        // price = menus.reduce((inc,menu)=>( inc+=parseFloat(menu.price)),0)
        
        const items = await OrderPosition.findAll({
            where:{
                orderId:order.id
            },
            include:['menuPositions']
        })
        console.log(order);
        const newBill =  await  Bill.create({...bill, price, clientId: order.clientId, currencyId: order.currencyId})

        items.forEach(item =>{
            BillItem.create({menuPositionId: item.id, billId:newBill.id, active:true})
        })

        res.send(newBill)
    
    }catch(err){
        res.status(500).send({
            message:
                err.message ||
                'Some error occurred while creating the Order.',
        });
    }


};

const findAll = (req, res) => {
    Bill.findAll()
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message:
                    err.message || 'Some error occurred while retrieving Order.',
            });
        });
};

const find = async (req, res) => {
    try {
        const bill = await Bill.findOne({
            where: {
                id: req.params.id,
            },
            include: ['user', 'currency']
        });
    
        if (bill) {
            const items = await BillItem.findAll({
                where:{
                    billId:bill.id
                },
                include:['menuPositions']
            })
            res.send({bill, items});

        } else {
            res.status(404).send({
                message: 'Bill not found',
            });
        }
    } catch (err) {
        res.status(500).send({
            message:
                err.message || 'Some error occurred while retrieving Order.',
        });
    }
};

const split = async (req, res) => {
    try {
        const bill = await Bill.findOne({
            where: {
                id: req.params.id,
            },
            include: ['user', 'currency']
        });
    
        if (bill) {
            bill.active = false;
            await bill.save({ fields: ['active'] });

            let priceForNewBill = 0;
            let items = await BillItem.findAll({
                where: {
                    billId: bill.id,
                },
                include: ['menuPositions'],
            })

            const itemsForNewBill = items.filter(item => req.body.items.includes(item.id))
            const restOfItems = items.filter(item => !req.body.items.includes(item.id))

            itemsForNewBill.forEach(item => {
                priceForNewBill+=Number.parseFloat(item.menuPositions.price)
            })

            const newBill = await Bill.create({
                price: priceForNewBill, 
                clientId: req.body.clientId,
                currencyId: bill.currencyId,
                orderId: bill.orderId,
                active: true,
                createdAt: new Date(),
                updatedAt: new Date(),
            })
            
            await Promise.all(
                itemsForNewBill.map(async item => {
                    item.billId = newBill.id;
                    await item.save({ fields: ['billId'] });
                })
            )

            let priceOfRestItems = 0;

            restOfItems.forEach(item => {
                priceOfRestItems+=Number.parseFloat(item.menuPositions.price)
            })

            const anotherBill = await Bill.create({
                price: priceOfRestItems, 
                clientId: bill.clientId,
                currencyId: bill.currencyId,
                orderId: bill.orderId,
                active: true,
                createdAt: new Date(),
                updatedAt: new Date(),
            })
            await Promise.all(
                restOfItems.map(async item => {
                    item.billId = anotherBill.id;
                    await item.save({ fields: ['billId'] });
                })
            )

            res.status(200).send({
                message: 'Bill has been split successfully!',
            });

        } else {
            res.status(404).send({
                message: 'Bill not found',
            });
        }
    } catch (err) {
        res.status(500).send({
            message:
                err.message || 'Some error occurred while retrieving Order.',
        });
    }
};

const edit = async (req, res) => {
    const id = req.params.id;

    Bill.update(req.body, {
        where: { id: id },
    })
        .then((num) => {
            console.log(num);
            if (num == 1) {
                Bill.findByPk(id).then((e) => res.send(e));
            } else {
                res.send({
                    message: `Cannot update Bill with${id}. check body or Bill is not found!`,
                });
            }
        })
        .catch((err) => {
            res.status(500).send({
                message: 'Error updating Bill with id=' + id,
            });
        });
};

const remove = async (req, res) => {
    const id = req.params.id;

    let billItems = await BillItem.findAll({
        where: {
            billId: id,
        },
    })

    await Promise.all(
        billItems.map(async item => {
            await item.destroy()
        })
    )


    Bill.destroy({
        where: { id: id },
    })
        .then((num) => {
            if (num == 1) {
                res.send({
                    message: 'Bill was deleted successfully!',
                });
            } else {
                res.send({
                    message: `Cannot delete Bill ${id} or  Bill was not found!`,
                });
            }
        })
        .catch((err) => {
            console.log(err);
            res.status(500).send({
                message: 'Could not delete Bill with id=' + id,
            });
        });
};

module.exports = {
    create,
    findAll,
    remove,
    edit,
    find,
    split
};
