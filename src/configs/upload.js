// Importa as bibliotecas necessárias
const multer = require('multer')
const path = require ('path')
const crypto = require("crypto")

// Define o caminho absoluto para a pasta temporária
const TMP_FOLDER = path.resolve(__dirname,"..","..","tmp")

// Define o caminho absoluto para a pasta de uploads
const UPLOADS_FOLDER = path.resolve(TMP_FOLDER, "uploads")


// Define um objeto com a configuração do Multer
const MULTER = {
    storage: multer.diskStorage({
        destination: TMP_FOLDER, // Define a pasta temporária como destino dos arquivos
        filename(request,file,callback){ // Define o nome do arquivo
            const fileHash = crypto.randomBytes(10).toString('hex') // Gera um hash aleatório para o arquivo
            const fileName = `${fileHash}-${file.originalname}` // Concatena o hash gerado com o nome original do arquivo

            
            return callback(null, fileName) // Retorna o nome do arquivo para o Multer
        }
    })
}

// Exporta as constantes para serem utilizadas em outros arquivos
module.exports = {
    TMP_FOLDER,
    UPLOADS_FOLDER,
    MULTER,
}


