const express = require('express');
const reservationController = require('../Controllers/reservation');
const fileuploader = require('../MiddleWare/UploadFiles');
const route = express.Router();

route.post('/reserver', fileuploader.single('ordonnance'), reservationController.Reservation);

route.get('/:id', reservationController.FindById);

route.patch('/:id', fileuploader.single('ordonnance'), reservationController.updatereservation);

route.delete('/:id', reservationController.Annuler);


module.exports = route