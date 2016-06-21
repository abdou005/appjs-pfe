/**
 * Created by abdo on 2016-06-09.
 */

var questions = require('../controllers/prestations');

app.get('/prestation',questions.index);
app.post('/prestation',questions.create);
app.get('/prestation/:id',questions.one);
app.put('/prestation',questions.update);
app.delete('/prestation/:id',questions.delete);
