/**
 * Created by abdo on 2016-05-15.
 */

var document = require('../controllers/documents');

app.get('/doc',document.index);
app.post('/doc',document.create);
app.get('/doc/:id',document.one);
app.put('/doc',document.update);
app.delete('/doc/:id',document.delete);
