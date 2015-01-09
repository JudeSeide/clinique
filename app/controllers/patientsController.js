var locomotive = require('locomotive')
  , Controller = locomotive.Controller;

var Patient = require('../models/patientsModels.js');

var patientsController = new Controller();


patientsController.before('cObtenirDossierPatientJson', function(next){
    var self = this;

    var leId = self.req.params.id;

    Patient.mObtenirDossierPatientJson(leId, function(data){
        if(!data){
            self._codeRest = 404;
            self._data = {"Erreur!" : "Ce patient n'existe pas."};
        }else{
            self._codeRest = 200;
            self._data = data;
        }

        next();
    });
});

patientsController.cObtenirDossierPatientJson = function() {
    this.res.status(this._codeRest).json(this._data);
}


patientsController.before('cCreerDossierPatientJson', function(next){
    var self = this;

    self.req.on('data', function(data){
        unProfessionnel = JSON.parse(data.toString());

        Patient.mCreerDossierPatientJson(unProfessionnel, function(data){
            if(!data){
                self._codeRest = 400;
                self._data = {"Erreur!" : "L'insertion du nouveau patient a échouée."};
            }else{
                self._codeRest = 201;
                self._data = data;
            }

            next();
        });
    });
});

patientsController.cCreerDossierPatientJson = function(){
    this.res.status(this._codeRest).json(this._data);
}

patientsController.before('cModifierDossierPatientJson', function(next){
    var self = this;
    var leId = self.req.params.id;

    self.req.on('data', function(data){
        unProfessionnel = JSON.parse(data.toString());

        Patient.mModifierDossierPatientJson(leId, unProfessionnel, function(data){
            if(!data){
                self._codeRest = 400;
                self._data = {"Erreur!" : "La modification du patient a échouée."};
            }else{
                self._codeRest = 200;
                self._data = data;
            }

            next();
        });
    });
});

patientsController.cModifierDossierPatientJson = function(){
    this.res.status(this._codeRest).json(this._data);
}


patientsController.before('cSupprimerDossierPatientJson', function(next){
    var self = this;
    var leId = self.req.params.id;


    Patient.mSupprimerDossierPatientJson(leId, function(data){
        if(!data){
            self._codeRest = 400;
            self._data = {"Erreur!" : "La suppression du patient a échouée."};
        }else{
            self._codeRest = 200;
            self._data = {"OK" : "La suppression du patient a réussie."};
        }

        next();
    });

});

patientsController.cSupprimerDossierPatientJson = function(){
    this.res.status(this._codeRest).json(this._data);
}

module.exports = patientsController;
