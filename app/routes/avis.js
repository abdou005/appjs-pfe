/**
 * Created by abdo on 2016-03-31.
 */

var avis = require('../controllers/avis');

app.get('/avis',avis.index);
app.post('/avis',avis.create);
app.get('/avis/:id',avis.one);
app.put('/avis',avis.update);
app.delete('/avis/:id',avis.delete);