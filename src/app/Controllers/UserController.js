const User = require('../Models/User');
const bcrypt = require('bcryptjs');
const yup = require('yup');

class UserController {
 async show(req, res) {
    // var users = ["Kaio", "Larissa", "Danver"]
    // return res.status(200).json({
    //   error: false,
    //   users
    // })

   const users = await User.find()

    return res.status(200).json({
      users
    })
  }

  async store(req, res) {

    /**
     * Validação através do YUP schema
     * Início
     */
    let schema = yup.object().shape({
      name: yup.string().required(),
      email: yup.string().email().required(),
      password: yup.string().required()
    });

    if(!(await schema.isValid(req.body))){
      return res.status(400).json({
        error: true,
        message: "Dados inválidos"
      })
    }


    let userExist = await User.findOne({ email: req.body.email });
    if(userExist) {
      return res.status(400).json({
        error: true,
        message: "Este usuário já existe!"
      })
    }

     /**
      * Desestrutuação dos dados da requisição
      */
    const { name, email, password } = req.body;

    /**
      * criação da constante data
      */
    

    const data = { name, email, password };

    /**
      * Criptografar a senha
      */

    data.password = await bcrypt.hash(data.password, 8);

    /**
      * Inserção no banco de dados 
      */

    await User.create(data, (err) => {
      if(err) return res.status(400).json({
          error: true,
          message: "Erro ao tentar inserir usuário no MongoDB"
        })

        return res.status(200).json({
          error: false,
          message: "Usuário Cadastrado com sucesso"
        })
    })
  }
}

module.exports = new UserController();