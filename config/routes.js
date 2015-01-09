// Draw routes.  Locomotive's router provides expressive syntax for drawing
// routes, including support for resourceful routes, namespaces, and nesting.
// MVC routes can be mapped to controllers using convenient
// `controller#action` shorthand.  Standard middleware in the form of
// `function(req, res, next)` is also fully supported.  Consult the Locomotive
// Guide on [routing](http://locomotivejs.org/guide/routing.html) for additional
// information.
module.exports = function routes() {
  this.root('professionnels#index');

  this.match('dossiers/:id', 'patients#cObtenirDossierPatientJson', {via : 'GET'});
  this.match('dossiers',     'patients#cCreerDossierPatientJson', {via : 'POST'});
  this.match('dossiers/:id', 'patients#cModifierDossierPatientJson', {via : 'PUT'});
  this.match('dossiers/:id', 'patients#cSupprimerDossierPatientJson', {via : 'DELETE'});

  this.match('pros/:id', 'professionnels#cObtenirProfessionnelsJson', {via : 'GET'});
  this.match('pros', 'professionnels#cCreerProfessionnelsJson', {via : 'POST'});
  this.match('pros/:id', 'professionnels#cModifierProfessionnelsJson', {via : 'PUT'});
  this.match('pros/:id', 'professionnels#cSupprimerProfessionnelsJson', {via : 'DELETE'});

  this.match('pros/ajouter/:id', 'professionnels#ajouter', {via : 'GET'});
  this.match('pros/consulter/:id', 'professionnels#consulter', {via : 'GET'});
  this.match('pros/modifier/:id', 'professionnels#modifier', {via : 'GET'});

  this.match('/', 'professionnels#index', {via : 'GET'});
};
