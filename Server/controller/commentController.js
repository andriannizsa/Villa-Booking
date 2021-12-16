const { comment,villa,user } = require('../models');

class commentController {
    static async getComment(req,res) {
        try{
            let {id} = req.userData
            let data = await comment.findAll({
                where: {
                    userId : id
                },
                include: [villa,user],
                order: [["id","ASC"]]
            });
            res.status(200).json(data);
        }catch(err){
            res.status(500).json({
                message: err.error
            })
        }
    }

    static async getCommentAll(req,res){
        try {
            // console.log(req.userData)
            const data = await comment.findAll({
                include: [user,villa],
                order: [["id", "ASC"]]
            });
            res.status(200).json(data);
        }catch(e){
            res.status(400).json({msg: e.error});
        }
    }

    static async getCommentById(req,res){
        const id = +req.params.id;
        try {
            // console.log(req.userData)
            // let { id } = req.userData
            const data = await comment.findAll({
                where: {
                    id
                    // userId: id
                },
                include: [user,villa],
                order: [["id", "ASC"]]
            });
            res.status(200).json(data);
        }catch(e){
            res.status(400).json({msg: e.error});
        }
    }


    static async addComment(req,res) {
        try{
            const {komentar,rating,villaId} = req.body;
            let id = 0;
            if(req.body.userId){
                id = req.body.userId;
            }else{
                id = req.userData.id;
            }
            const data = await comment.create({
                komentar,rating,villaId, userId: id
            });
            res.status(200).json(data)
        }catch(err){
            res.status(500).json({
                message: err.error
            })
        }
    }

    static async editCommentPage(req,res){
        const id = req.params.id;
        try {
            const data = await comment.findByPk(id);
            res.status(200).json(data)
        }catch(e){
            res.status(400).json({msg: e.error});
        }
    }


    static async editComment(req,res){
        try {
            const id = +req.params.id;
            const {komentar,rating,villaId,userId} = req.body;
            const data = await comment.update(
                {komentar,rating,villaId,userId},
                {where: {id} }
            );
            res.status(200).json({msg: "Edit Success"});
        }catch(e){
            res.status(400).json({msg: e.error});
        }
    }

    static async deleteComment(req,res){
        try {
            const id = +req.params.id;
            const data = await comment.destroy({where: {id} });
            res.status(200).json({msg: `Succes delete id ${id}`});
        }catch(e){
            res.status(400).json({msg: e.error});
        }
    }

}

module.exports = commentController;