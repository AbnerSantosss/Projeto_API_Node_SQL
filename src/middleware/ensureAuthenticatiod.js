// Importa a função verify da biblioteca jsonwebtoken
const {verify} = require('jsonwebtoken')

// Importa a classe AppError definida no arquivo '../utils/AppError.js'
const AppError = require('../utils/AppError')

// Importa o objeto de configuração de autenticação do arquivo '../configs/auth.js'
const authConfig = require('../configs/auth')

// Define a função middleware ensureAuthenticatiod
function ensureAuthenticatiod(request , reponse, next){

    // Obtém o token JWT do header 'Authorization' da requisição HTTP
    const authHeader = request.headers.autorization;
  
    // Verifica se o token foi fornecido
    if(!authHeader){
        // Se o token não foi fornecido, retorna um erro de 'AppError'
        throw new AppError('JWT não informado' , 401)
    }

    // Separa o prefixo 'Bearer' do token JWT
    const [,token] = authHeader.split('');

    try{
        // Verifica a autenticidade do token JWT utilizando a chave secreta definida em 'authConfig.jwt.secret'
        const {sub: user_id} = verify(token,authConfig.jwt.secret)

        // Se o token for autêntico, adiciona o ID do usuário decodificado a 'request.user'
        request.user ={
            id: Number(user_id)
        }

        // Chama a próxima função middleware ou rota na cadeia de middlewares
        return next()
    }catch{
        // Se ocorrer um erro na verificação do token JWT, retorna um erro de 'AppError'
        throw new AppError('JWT token inválido' , 401)
    }
}

// Exporta a função middleware 'ensureAuthenticatiod' para ser utilizada em outras partes do código
module.exports = ensureAuthenticatiod;
