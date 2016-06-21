/**
 * Created by abdo on 2016-04-17.
 */

var questions = require('../controllers/questions');

app.get('/questions',questions.index);
app.post('/questions',questions.create);
app.get('/questions/:id',questions.one);
app.put('/questions',questions.update);
app.delete('/questions/:id',questions.delete);
