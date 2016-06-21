/**
 * Created by abdo on 2016-03-31.
 */
var notifications = require('../controllers/notifications');


app.get('/notifications',notifications.index);
app.post('/notifications',notifications.create);
app.get('/notifications/:id',notifications.one);
app.put('/notifications',notifications.update);
app.delete('/notifications/:id',notifications.delete);
