const { villa, user} = require('../models');

class villaController {

  static async getVillaAll(req,res){
    console.log("111")
    try{
    const data = await villa.findAll({
      include: [user],
      order: [["id", "ASC"]]
    });
    res.status(200).json({results: data});
    }catch(err){
      res.status(500).json({
        message: err.error
      })
    }
  }


   static async getVillaById(req,res){
    try {
      
        const id = +req.params.id;
        console.log(id);
        const data = await villa.findOne({
          where: {id},
          include: [user],
          order: [["id","ASC"]]
        });
        res.status(200).json({result: data});
    }catch(err){
      res.status(500).json({
        message: err.error
      })
    }
  }




  static async getVilla(req,res) {
    try{
      let { id } = req.userData
      const data = await villa.findAll({
        where: {
          userId: id
        },
        include: [user],
        order: [["id","ASC"]]
      })
      res.status(200).json(data);
    }catch(err){
      res.status(500).json({
        message: err.error
      })
    }
  }


  static async addVilla(req,res){
    try{
      const {title,description,address,tipe,kamar_tidur,kamar_mandi,lantai,fasilitas,price} = req.body;
      let id = req.userData.id;
      console.log(id)
      const images = req.files;
      if(!images){
        res.status(400).json("Need upload image")
      }
      const data = await villa.create({
        title,description,address,tipe,kamar_tidur,kamar_mandi,lantai,fasilitas,price, 
        image_satu: images[0].path,
        image_dua: images[1].path,
        image_tiga: images[2].path,  
        userId: id
      });
    
      res.status(200).json(data);
    }catch(err){
      res.status(500).json({
        message: err.error
      })
    }
  }


  static async editVillaPage(req,res){
    const id = req.params.id;
    try {
        const data = await villa.findByPk(id);
        res.status(200).json(data)
    }catch(e){
        res.status(400).json({msg: e.error});
    }
  }


  static async editVilla(req,res){
    try{
        const id = +req.params.id;
        const {title,description,address,tipe,kamar_tidur,kamar_mandi,lantai,fasilitas,price,userId} = req.body;
        // const images = req.files;
        const data = await villa.update(
          {title,description,address,tipe,kamar_tidur,kamar_mandi,lantai,fasilitas,price,
            image_satu: images[0].path,
            image_dua: images[1].path,
            image_tiga: images[2].path,   
          userId},
          {where: {id}}
        );
        res.status(200).json({data});
    }catch(err){
      res.status(500).json({
        message: err.error
      })
    }
  }


  static async deleteVilla(req,res){
    try{
        const id = +req.params.id;
        const data = await villa.destroy({where: {id} });
        await image.destroy({ where: { villaId: id } });
        res.status(200).json({data});
    }catch(err){
      res.status(500).json({
        message: err.error
      })
    }
  }


}

module.exports = villaController;