const { user } = require("../models");
const { decryptPwd } = require("../helper/bcrypt");
const { tokenGenerator } = require("../helper/jwt");

class userController {
  static async getUser(req, res) {
    try {
      let users = await user.findAll({
        order: [["id", "ASC"]],
      });
      res.status(200).json(users);
    } catch (e) {
      res.status(500).json(e);
    }
  }

  static async register(req, res) {
    const { name, email, password, role } = req.body;
    try {
      if (email) {
        const checkEmail = await user.findOne({ where: { email } });
        if (checkEmail?.email === email) {
          res.status(400).json({
            status: "error",
            message: "Email already used, try different email",
          });
        }
      }
      let result = await user.create({
        name,
        email,
        password,
        role
      });
      res.status(200).json(result);
    } catch (e) {
      res.status(500).json(e);
    }
  }

  static async login(req, res) {
    try {
      const { email, password } = req.body;
      let result = await user.findOne({
        where: {
          email
        },
      });
      if (result) {
        if (decryptPwd(password, result.password)) {
          let token = tokenGenerator({
            id: result.id,
            email,
            name: result.name,
            role: result.role
          });
          // let decoded = tokenVerify(token)
          res.status(200).json({
            access_token: token,
            email,
            avatar: result.avatar,
            name: result.name,
            role: result.role 
          });
        } else {
          res.json({
            message: "Password is not correct",
          });
        }
      } else {
        res.json({
          message: "User not found",
        });
      }
    } catch (e) {
      res.status(500).json(e);
    }
  }


  static async editUser(req, res) {
    try {
      const id = +req.params.id;
      const { name, email } =
        req.body;
      // password = encryptPwd(user.password);
      const data = await user.update(
        { avatar: req.file.path, name, email,},
        { where: { id } }
      );
      res.status(200).json(data);
    } catch (e) {
      res.status(400).json({ msg: e.error });
    }
  }

  static async deleteUser(req, res) {
    try {
      const id = +req.params.id;
      const data = await user.destroy({ where: { id } });
      res.status(200).json({ msg: `Success delete id ${id}` });
    } catch (e) {
      res.status(400).json({ msg: e.error });
    }
  }


  static async updateAvatar(req, res) {
    try {
      const { email } = req.body;
      await user.update({ avatar: req.file.path }, { where: { email } });
      const result = await user.findOne({ where: { email } });

      res.status(200).json({ message: "Update success", result });
    } catch (error) {
      res.status(500).json({ message: "Something went wrong", error });
    }
  }

  

}

module.exports = userController;