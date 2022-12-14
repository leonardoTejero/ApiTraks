
const { handleHttpError } = require("../utils/handleError");


const validateFileSize = (req, res, next) => {
    try {   
        if(!req.file){
            return handleHttpError(res, "Error, debe seleccionar el archivo que desea cargar", 400);
        }
         if(req.file.size > 8000000){
            return handleHttpError(res, "Error, el archivo excede los 10MB");
          } 
        next();
    } catch (e) {
        handleHttpError(res, "Ocurrio un error. "+ e.message); 
    }
}

module.exports = { validateFileSize }; 
    