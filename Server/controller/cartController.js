const { cart,user } = require('../models');

class cartController {
    static async getCart(req,res){
        try{
            let {id} = req.userData;
            const data = await cart.findAll({
                where: {
                    userId: id
                },
                include: [user],
                order: [["id","ASC"]]
            });
            res.status(200).json(data);
        }catch(err){
            res.status(500).json({
                message: err.error
            })
        }
    }


    static async getCartAll(req,res){
        try {
            // console.log(req.userData)
            const data = await cart.findAll({
                include: [user],
                order: [["id", "ASC"]]
            });
            res.status(200).json(data);
        }catch(e){
            res.status(400).json({msg: e.error});
        }
    }


    static async getCartById(req,res){
        try{
            const id = +req.params.id;
            const data = await cart.findAll({
                where: {id},
                include: [user],
                order: [["id","ASC"]]
            });
            res.status(200).json(data);
        }catch(err){
            res.status(500).json({
                message: err.error
            })
        }
    }


    static async addCart(req,res){
        try{
            const { status } = req.body;
            let id = 0;
            if(req.body.userId){
                id = req.body.userId;
            }else{
                id = req.userData.id;
            }
            const data = await cart.create({
                status,userId: id
            });
            res.status(200).json(data);
        }catch(err){
            res.status(500).json({
                message: err.error
            })
        }
    }


    static async editCartPage(req,res){
        const id = req.params.id;
        try{
            const data = await cart.findByPk(id);
            res.status(200).json(data);
        }catch(err){
            res.status(500).json({
                message: err.error
            })
        }
    }


    static async editCart(req,res){
        try{
            const id = +req.params.id;
            const {status} = req.body;
            const data = await cart.update(
                {status,userId: id},
                {where: {id} }

            );
            res.status(200).json(data);
        }catch(err){
            res.status(500).json({
                message: err.error
            })
        }
    }


    static async deleteCart(req,res){
        try{
            const id = +req.params.id;
            const data = await cart.destroy({where: {id} });
            res.status(200).json({msg: `Succes delete id ${id}`});
        }catch(err){
            res.status(500).json({
                message: err.error
            })
        }
    }



}

module.exports = cartController;