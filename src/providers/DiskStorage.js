// Importando a biblioteca nativa do Node.js para trabalhar com o sistema de arquivos
const fs = require("fs")

// Importando a biblioteca nativa do Node.js para trabalhar com caminhos de arquivos e diretórios
const path = require("path")

// Importando o objeto de configuração do upload
const uploadConfig = require ('../configs/upload') 

// Definindo a classe responsável por trabalhar com armazenamento de arquivos em disco
class DiskStorage {

    // Método assíncrono para salvar um arquivo no disco
    async saveFile (file){

        // Renomeando o arquivo de upload para a pasta de destino
        await fs.promises.rename(
            path.resolve(uploadConfig.TMP_FOLDER, file), // Caminho do arquivo original
            path.resolve(uploadConfig.UPLOADS_FOLDER, file) // Caminho da pasta de destino
        )

        // Retorna o arquivo salvo
        return file;
    }

    // Método assíncrono para excluir um arquivo do disco
    async deleteFile(file){

        // Obtém o caminho completo do arquivo
        const filePath = path.resolve(uploadConfig.UPLOADS_FOLDER, file)

        try{
            // Verifica se o arquivo existe antes de tentar excluir
            await fs.promises.stat(filePath)
        }catch{
            // Caso contrário, retorna vazio
            return;
        }

        // Exclui o arquivo
        await fs.promises.unlink(filePath)
    }
}

// Exportando a classe DiskStorage
module.exports = DiskStorage