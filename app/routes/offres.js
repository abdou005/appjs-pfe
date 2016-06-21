/**
 * Created by abdo on 2016-03-31.
 */
var offres = require('../controllers/offres');


app.get('/offres',offres.index);
app.post('/offres',offres.create);
app.get('/offres/:id',offres.one);
app.put('/offres',offres.update);
app.delete('/offres/:id',offres.delete);
