// importação da conexão com o banco de dados
const knex = require("../database/knex");

// importação da biblioteca bcryptjs para criptografia de senhas
const  { compare } = require('bcryptjs');

// importação do módulo de erro personalizado
const AppError = require("../utils/AppError");

// importação do arquivo de configuração de autenticação
const authConfig = require("../configs/auth");

// importação da biblioteca jsonwebtoken para criar tokens JWT
const { sign } = require('jsonwebtoken');


class sessionsController {

    // método assíncrono para criar sessões de usuário
    async create(request, response) {

        // obtém email e senha do corpo da requisição
        const {email, password} = request.body;
        
        // busca o usuário com o email fornecido no banco de dados
        const user = await knex("users").where({email}).first();
        
        // verifica se o usuário existe
        if (!user) {
            // lança uma exceção personalizada se o usuário não existir
            throw new AppError("e-mail incorreto", 404);
        }

        // compara a senha fornecida com a senha armazenada no banco de dados
        const passwordMatched = await compare(password, user.password);
         
        // verifica se a senha está correta
        if (!passwordMatched) {
            // lança uma exceção personalizada se a senha estiver incorreta
            throw new AppError("Senha incorreta!", 401);
        }
        
        
        // obtém a chave secreta e o tempo de expiração do token de autenticação a partir do arquivo de configuração
        const { secret, expiresIn } = authConfig.jwt;

        // cria um novo token JWT com o ID do usuário como subject
        const token = sign({}, secret, {
            subject: String(user.id),
            expiresIn
        });

        // retorna o usuário e o token gerado em um objeto JSON
        return response.json({user, token});
    }
}

// exporta o controlador de sessões para ser utilizado em outras partes da aplicação
module.exports = sessionsController;



