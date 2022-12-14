
const { matchedData } = require("express-validator");
const { tracksModel } = require("../models");
const { handleHttpError } = require("../utils/handleError");

const getItems = async (req, res) => {

    try {
        const data = await tracksModel.findAllData({});
        res.send(data);
    } catch (e) {
        handleHttpError(res, "Error al obtener las canciones. "+ e.message);
    }
};

const getItem = async (req, res) => {
    try {
        const {id} = req.params;
        const data = await tracksModel.findOneData(id);
        res.send(data);
    } catch (e) {
        handleHttpError(res, "Error al obtener la canciones");
    }
};

const createItem = async (req, res) => {
    try {
        // limpia el body de propiedades incorrectas en la peticion
        const body = matchedData(req);
        const data = await tracksModel.create(body);
        res.send(data);
    } catch (error) {
        handleHttpError(res, "Error al crear la cancion");
    }
};

const updateItem = async (req, res) => {
    try {
        // crear 2 objetos a partir de request, uno con el id y lo restante en body
        const { id, ...body} = matchedData(req);
        const data = await tracksModel.findByIdAndUpdate(
            id, 
            body,
            {
                returnDocument: "after" // mostrar la cancion actualizada
            }
        );
        res.send({data});
    } catch (error) {
        handleHttpError(res, "Error al actualizar la cancion");
    }
};

const deleteItem = async (req, res) => {
    try {
        const {id} = req;
        // deleteOne Borrado fisico
        const data = await tracksModel.delete({_id:id});
        res.send({data});
    } catch (error) {
        handleHttpError(res, "Error al eliminar la cancion");
    }
};

module.exports = { getItems, getItem, createItem, updateItem, deleteItem };