var express = require('express');
var demanderDevis = require('../controllers/demanderDevis');


var devisRoutes = express.Router();

devisRoutes.route('/demande')
	.get(demanderDevis.index)
	.post(demanderDevis.create)
	.put(demanderDevis.update);

devisRoutes.route('/demande/:id')
	.get(demanderDevis.one)
	.delete(demanderDevis.delete);

/*
app.get('/demanderDevis',demanderDevis.index);
app.post('/demanderDevis',demanderDevis.create);
app.get('/demanderDevis/:id',demanderDevis.one);
app.put('/demanderDevis',demanderDevis.update);
app.delete('/demanderDevis/:id',demanderDevis.delete);
*/
module.exports = devisRoutes;


