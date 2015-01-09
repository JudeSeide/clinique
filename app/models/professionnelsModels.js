var mongoose = require('mongoose');
var moment = require('moment');

var Professionnels = mongoose.model('professionnels');

var createSchema = require('json-gate').createSchema;

var schema = createSchema({
    "type": "object",
    "properties": {
        "sexe": {"type": "string","required": true},
        "nom": {"type": "string","required": true},
        "prenom": {"type": "string","required": true},
        "specialite": {"type": "string","required": true},
        "nbr_patients" : {"type": "integer","required": true},
        "nbr_visites" : {"type": "integer","required": true},
        "patients_2014": {"type": "array","required": true}
    },
    additionalProperties: false
});

module.exports = {

    mObtenirProfessionnelsJson : function(leId, callback){

        Professionnels.findOne({ _id : leId}, function(err, data){
            if(!err){
                callback(data);
            }else{
                callback(null);
            }
        });

    },

    mObtenirLesProfessionnelsJson : function(callback){
        Professionnels.find(function(err, data){
            if(!err){
                callback(data);
            }else{
                callback(null);
            }
        });

    },

    mCreerProfessionnelsJson : function(data, callback){

        try{
            //schema.validate(data);

            var nouveauProfessionnel = new Professionnels({
                sexe : data.sexe,
                nom : data.nom,
                prenom : data.prenom,
                specialite : data.specialite//,
                //nbr_patients : data.nbr_patients,
                //nbr_visites : data.nbr_visites,
                //patients_2014 : data.patients_2014
            });

            nouveauProfessionnel.save(function(err){
                if(!err){
                    Professionnels.findOne({ sexe : data.sexe, nom : data.nom, prenom : data.prenom, specialite : data.specialite}, function(err, data){
                        if(!err){
                            callback(data);
                        }else{
                            callback(null);
                        }
                    });
                }else{
                    callback(null);
                }
            });

        }catch(erreur){
            callback(null);
        }

    },

    mModifierProfessionnelsJson : function(leId, data, callback){

        Professionnels.find({_id : leId}, function(err, docs){
            if(docs != undefined && docs.length > 0){

                try{
                  //  schema.validate(data);

                    Professionnels.update({_id : leId},{
                      $set : {
                        sexe : data.sexe,
                        nom : data.nom,
                        prenom : data.prenom,
                        specialite : data.specialite
                        //  nbr_patients : data.nbr_patients,
                        //  nbr_visites : data.nbr_visites,
                        //  patients_2014 : data.patients_2014
                      }
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

    mSupprimerProfessionnelsJson : function(leId, callback){

        Professionnels.find({_id : leId}, function(err, docs){
            if(docs != undefined && docs.length > 0){

                try{
                  //  schema.validate(data);

                    Professionnels.remove({_id : leId}
                      ,function(err){
                        if(!err){
                            callback(docs);
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



    }
};
