const {order, user} = require("../models");

class orderController {
    static async getOrderAll(req,res){
        try{
            const data = await order.findAll({
                include: [user],
                order: [["id","ASC"]]
            });
            res.status(200).json({data});
        }catch(error){
            res.status(500).json({message: error})
        }
    }


    static async getOrder(req,res) {
        try{
           
            let {id} = req.userData;
            let data = await order.findOne({
                where: {
                    userId : id
                }
                // include: [user],
                // order: [["id","ASC"]]
            });
            console.log(data)
            res.status(200).json({results: data});
        }catch(err){
            res.status(500).json({
                message: err.error
            })
        }
    }


    static async addOrder(req,res){
        try{
            const {start_date,end_date,total_day,tax=0,total} = req.body;
            console.log(total);
            console.log(new Date(start_date).getUTCDate());
            let id = 0;
            if(req.body.userId){
                id = req.body.userId;
            }else{
                id = req.userData.id;
            }
            console.log(id);
            const data = await order.create({
                start_date,end_date,total_day,tax,total, userId: id
            });
            console.log(data);
            res.status(200).json({results: data})
        }catch(err){
            res.status(500).json({
                message: err.error
            })
        }
    }
}

module.exports = orderController;