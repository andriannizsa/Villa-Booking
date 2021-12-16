const {line_item, villa, cart} = require('../models');

class lineItemController {
    static async getItemAll(req,res){
        try{
            const data = await line_item.findAll({
                include: [villa,cart],
                order: [["id","ASC"]]
            });
            res.status(200).json(data);
        }catch(err){
            res.status(500).json({
                message: err.error
            });
        }
    }


    static async getItemById(req,res){
        try{
            const id = +req.params.id;
            const data = await line_item.findAll({
                where: {id},
                include: [villa,cart],
                order: [["id","ASC"]]
            });
            res.status(200).json(data);
        }catch(err){
            res.status(500).json({
                message: err.error
            })
        }
    }


    static async addItem(req,res){
        try{
            const {status,villaId,cartId} = req.body;
            const data = await line_item.create({
                status,villaId,cartId
            });
            res.status(200).json(data);
        }catch(err){
            res.status(500).json({
                message: err.error
            })
        }
    }


    static async editItemPage(req,res){
        const id = req.params.id;
        try {
            const data = await line_item.findByPk(id);
            res.status(200).json(data)
        }catch(e){
            res.status(400).json({msg: e.error});
        }
    }


    static async editItem(req,res){
        try {
            const id = +req.params.id;
            const {status,villaId,cartId} = req.body;
            const data = await line_item.update(
                {status,villaId,cartId},
                {where: {id} }
            );
            res.status(200).json({msg: "Edit Success"});
        }catch(e){
            res.status(400).json({msg: e.error});
        }
    }


    static async deleteItem(req,res){
        try{
                const id = +req.params.id;
                const data = await line_item.destroy({where: {id} });
                res.status(200).json({msg: `Succes delete id ${id}`});
        }catch(err){
            res.status(500).json({
                message: err.error
            });
        }
    }

}



module.exports = lineItemController;