// import db from '../db/init.js';
const Order = require('../../models/index.js').Order;
const OrderPosition = require('../../models/index.js').OrderPosition;
const menuPosition = require('../../models/index.js').MenuPosition;
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
    const order = {
        number: req.body.number,
        tableOrder: req.body.tableOrder || 'takeaway',
        clientId: req.body.clientId,
        currencyId: req.body.currencyId,
        active: true,
    };
    let isEmpty = false;

    Object.keys(order).forEach((key) => {
        if (order[key] == undefined) isEmpty = true;
    });
    if (isEmpty) {
        return res.status(400).send({
            message: 'Body has Empty value',
        });
    }

let menus = null
let price = 0;
    try{
            menus =  await menuPosition.findAll({
                where: {
                  id: {
                    [Op.in]: req.body.menuPositions
                  }
                }
              })
            console.log(menus)
            price = menus.reduce((inc,menu)=>( inc+=parseFloat(menu.price)),0)
          

    }catch(err){
        res.send(err,'errror')
    }

    try{

        

        const newOrder =  await  Order.create({...order,price})
        req.body.menuPositions.forEach(  id =>{
            // createPositions(id,newOrder.id)
               OrderPosition.create({menuPositionId:id,orderId:newOrder.id,active:true})
        })
        // console.log(req.body.menuPositions)
        res.send(newOrder)
            res.send('ok')
    
    }catch(err){
        res.status(500).send({
            message:
                err.message ||
                'Some error occurred while creating the Order.',
        });
    }


};

const findAll = (req, res) => {
    Order.findAll()
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
        const order = await Order.findAll({
            where: {
                id: req.params.id,
            },
            include: ['user', 'currency']
        });
    
        if (order.length > 0) {
            const positions = await OrderPosition.findAll({
                where:{
                    orderId:order[0].id
                },
                include:['menuPositions']
            })
            res.send(
                {order:order[0],positions});
        } else {
            res.status(404).send({
                message: 'Order  not found',
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

    Order.update(req.body, {
        where: { id: id },
    })
        .then((num) => {
            console.log(num);
            if (num == 1) {
                Order.findByPk(id).then((e) => res.send(e));
            } else {
                res.send({
                    message: `Cannot update Order with${id}. check body or Order is not found!`,
                });
            }
        })
        .catch((err) => {
            res.status(500).send({
                message: 'Error updating Order with id=' + id,
            });
        });
};

const remove = async (req, res) => {
    const id = req.params.id;

    Order.destroy({
        where: { id: id },
    })
        .then((num) => {
            if (num == 1) {
                res.send({
                    message: 'Order was deleted successfully!',
                });
            } else {
                res.send({
                    message: `Cannot delete Order ${id} or  Order was not found!`,
                });
            }
        })
        .catch((err) => {
            console.log(err);
            res.status(500).send({
                message: 'Could not delete Order with id=' + id,
            });
        });
};

const recount = async(req,res)=>{
    try{

    
    const findCurrency = await Currency.findAll({where:{
        id:req.body.currencyId
    }})

    
    const order = await Order.findAll({
        where: {
            id: req.params.id,
        },
        include: ['user', 'currency']
    });
    order[0].currencyId = req.body.currencyId
    console.log(findCurrency[0].exchangeRate,order[0].price)
    const price = parseFloat(findCurrency[0].exchangeRate) * parseFloat(order[0].price)
    
    Order.update({price,currencyId:req.body.currencyId}, {
        where: { id: req.params.id, },
    })
        .then((num) => {
            if (num == 1) {
                Order.findByPk(req.params.id).then((e) => res.send(e));
            } else {
                res.send({
                    message: `Cannot update Order with ${req.params.id}. check body or Order is not found!`,
                });
            }
        })
        .catch((err) => {
            res.status(500).send({
                message: 'Error updating Order with id=' + req.params.id,
            });
        });


  
}catch(e){
    res.status(500).send(e)
}
}
module.exports = {
    create,
    findAll,
    remove,
    edit,
    find,
    recount
};
