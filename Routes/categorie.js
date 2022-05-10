const express = require('express');
const route = express.Router();
const fileuploader = require('../MiddleWare/UploadFiles');
const categorieController = require('../Controllers/categorie');

route.get('/', categorieController.GetAll);

route.get('/:id', categorieController.FindById);

route.patch('/:id', fileuploader.single('image'),  categorieController.updatecategorie);

route.delete('/:id', categorieController.Delete);

route.post('/addcategorie', fileuploader.single('image'), categorieController.Ajouter);


module.exports = route;