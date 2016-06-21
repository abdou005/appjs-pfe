/**
 * Created by abdo on 2016-03-08.
 */
var prestations = require('../Schema/prestations');
exports.Prestation = mongoose.model('Prestation',prestations.schema);

var questions = require('../Schema/questions');
exports.Question = mongoose.model('Question',questions.schema);

var offres = require('../Schema/offres');
exports.Offre = mongoose.model('Offre',offres.schema);

var devis = require('../Schema/devis');
exports.Devis = mongoose.model('Devis',devis.schema);

var avis = require('../Schema/avis');
exports.Avis = mongoose.model('Avis',avis.schema);

var users = require('../Schema/users');
exports.User = mongoose.model('User',users.schema);

var notifications = require('../Schema/notifications');
exports.Notification = mongoose.model('Notification',notifications.schema);

var messages = require('../Schema/messages');
exports.Message = mongoose.model('Message',messages.schema);

var medias = require('../Schema/medias');
exports.Media = mongoose.model('Media',medias.schema);

var tags = require('../Schema/tags');
exports.Tag = mongoose.model('Tag',tags.schema);

var specialites = require('../Schema/specialites');
exports.Specialite = mongoose.model('Specialite',specialites.schema);

var domaines = require('../Schema/domaines');
exports.Domaine = mongoose.model('Domaine',domaines.schema);

var adresses = require('../Schema/adresses');
exports.Adresse = mongoose.model('Adresse',adresses.schema);

var missions = require('../Schema/missions');
exports.Mission = mongoose.model('Mission',missions.schema);

var reclamations = require('../Schema/reclamations');
exports.Reclamation = mongoose.model('Reclamation',reclamations.schema);

var documents = require('../Schema/documents');
exports.Document = mongoose.model('Document',documents.schema);
