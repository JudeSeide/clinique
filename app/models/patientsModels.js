var mongoose = require('mongoose');
var moment = require('moment');

var Dossiers = mongoose.model('dossiers');
var Patients = mongoose.model('patients');

var createSchema = require('json-gate').createSchema;

var schema = createSchema({
    "type": "object",
    "properties": {
        "sexe": {"type": "string","required": true},
        "nom": {"type": "string","required": true},
        "prenom": {"type": "string","required": true},
        "date_naissance": {"type": "string","required": true},
        "groupe_sanguin": {"type": "string","required": true},
        "poids_kg": {"type": "string","required": true},
        "taille_cm": {"type": "string","required": true},
        "don_organes": {"type": "string","required": true},
        "visites": {"type": "array","required": true}
    },
    additionalProperties: false
});

module.exports = {


    mObtenirDossierPatientJson : function(leId, callback){

        Dossiers.findOne({ _id : leId}, function(err, data){
            if(!err){
                callback(data);
            }else{
                callback(null);
            }
        });

    },

    mCreerDossierPatientJson : function(data, callback){

        try{
            schema.validate(data);

            var nouveauPatient = new Patients({
                sexe : data.sexe,
                nom : data.nom,
                prenom : data.prenom,
                date_naissance : data.date_naissance,
                groupe_naissance : data.groupe_naissance,
                groupe_sanguin : data.groupe_sanguin,
                poid_kg : data.poid_kg,
                taille_cm : data.taille_cm,
                don_organes : data.don_organes,
                visites : data.visites
            });

            nouveauPatient.save(function(err){
                if(!err){
                    callback(data);
                }else{
                    callback(null);
                }
            });

        }catch(erreur){
            callback(null);
        }

    },


    mModifierDossierPatientJson : function(leId, data, callback){

        Dossiers.find({_id : leId}, function(err, docs){
            if(docs != undefined && docs.length > 0){


                try{
                    schema.validate(data);

                    Dossiers.update({_id : leId},{
                        sexe : data.sexe,
                        nom : data.nom,
                        prenom : data.prenom,
                        date_naissance : data.date_naissance,
                        groupe_naissance : data.groupe_naissance,
                        groupe_sanguin : data.groupe_sanguin,
                        poid_kg : data.poid_kg,
                        taille_cm : data.taille_cm,
                        don_organes : data.don_organes,
                        visites : data.visites
                    },function(err){
                        if(!err){
                            callback(data);
                        }else{
                            callback(null);
                        }
                    });

                }catch(erreur){
                    callback(null);
                }
            }else{
                callback(null);
            }
        });


    },

    mSupprimerDossierPatientJson : function(leId, callback){

        Patients.find({_id : leId}, function(err, docs){

            if(docs != undefined && docs.length > 0){
                docs = docs[0];

                docs.visites.forEach(function(item){
                    var arrTmp = moment(item.date, 'YYYY-MM-DD').fromNow().split(' ');

                    if(arrTmp[1] == 'years'){

                        if(parseInt(arrTmp[0]) <= 5){
                            callback(null);
                        }
                    }
                });

                docs.remove();
                callback(docs);

            }else{
                callback(null);
            }
        });


    }
};