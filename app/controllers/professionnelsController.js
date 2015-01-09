var locomotive = require('locomotive')
    , Controller = locomotive.Controller;

var Professionnel = require('../models/professionnelsModels.js');

var professionnelsController = new Controller();


professionnelsController.before('cObtenirProfessionnelsJson', function(next){
    var self = this;

    var leId = self.req.params.id;

    Professionnel.mObtenirProfessionnelsJson(leId, function(data){
        if(!data){
            self._codeRest = 404;
            self._data = {"Erreur!" : "Ce professionnel n'existe pas."};
        }else{
            self._codeRest = 200;
            self._data = data;
        }

        next();
    });
});

professionnelsController.cObtenirProfessionnelsJson = function() {
    this.res.status(this._codeRest).json(this._data);
}


professionnelsController.before('cCreerProfessionnelsJson', function(next){
    var self = this;

    self.req.on('data', function(data){
        var unProfessionnel = JSON.parse(data.toString());

        Professionnel.mCreerProfessionnelsJson(unProfessionnel, function(data){
            if(!data){
                self._codeRest = 400;
                self._data = {"Erreur!" : "L'insertion du nouveau professionnel a échouée."};
            }else{
                self._codeRest = 201;
                self._data = data;
            }

            next();
        });
    });
});

professionnelsController.cCreerProfessionnelsJson = function(){
    this.res.status(this._codeRest).json(this._data);
}

professionnelsController.before('cModifierProfessionnelsJson', function(next){
    var self = this;
    var leId = self.req.params.id;

    self.req.on('data', function(data){
      console.log(data);
        var unProfessionnel = JSON.parse(data.toString());

        Professionnel.mModifierProfessionnelsJson(leId, unProfessionnel, function(data){
            if(!data){
                self._codeRest = 400;
                self._data = {"Erreur!" : "La modification du professionnel a échouée."};
            }else{
                self._codeRest = 200;
                self._data = data;
            }

            next();
        });
    });
});

professionnelsController.cModifierProfessionnelsJson = function(){
    this.res.status(this._codeRest).json(this._data);
}


professionnelsController.before('cSupprimerProfessionnelsJson', function(next){
    var self = this;
    var leId = self.req.params.id;


    Professionnel.mSupprimerProfessionnelsJson(leId, function(data){
        if(!data){
            self._codeRest = 400;
            self._data = {"Erreur!" : "La suppression du professionnel a échouée."};
        }else{
            self._codeRest = 200;
            self._data = {"OK" : "La suppression du professionnel a réussie."};
        }

        next();
    });

});

professionnelsController.cSupprimerProfessionnelsJson = function(){
    this.res.status(this._codeRest).json(this._data);
}

professionnelsController.index = function() {
    this.title = "TP3 | Page d'accueil";

    var self = this;

    Professionnel.mObtenirLesProfessionnelsJson(function(data){
      if(!data){
        self._codeRest = 404;
        self._data = {"Erreur!" : "Il n'existe encore aucun professionnel."};
      }else{
        self._codeRest = 200;
        self._data = data;
        self.description = {pros: self._data };
        self.render(self.description);
      }
    });
}

professionnelsController.ajouter = function() {
  this.title = "TP3 | Formulaire de création d'un professionnel";
  this.render('ajouter');
}

professionnelsController.consulter = function() {
  this.title = "TP3 | Consultation d'un professionnel";
  var self = this;

  var leId = self.req.params.id;
  this.render('consulter', {id : leId});
}

professionnelsController.modifier = function() {
  this.title = "TP3 | Modification d'un professionnel";
  var self = this;

  var leId = self.req.params.id;
  this.render('modifier', {id : leId});
}

module.exports = professionnelsController;
