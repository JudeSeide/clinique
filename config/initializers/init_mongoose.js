var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var Dossiers = new Schema({
    _id : String,
    sexe : String,
    nom : String,
    prenom : String,
    date_naissance : String,
    groupe_sanguin : String,
    poids_kg : String,
    taille_cm : String,
    don_organes : String,
    visites : [{
        date : String,
        nom : String,
        prenom : String,
        specialite : String
    }]
});

var Patients = new Schema({
    sexe : String,
    nom : String,
    prenom : String,
    date_naissance : String,
    groupe_sanguin : String,
    poids_kg : String,
    taille_cm : String,
    don_organes : String,
    visites : [{
        date : String,
        nom : String,
        prenom : String,
        specialite : String
    }]
});

var Professionnels = new Schema({
  //  _id : String,
    sexe : String,
    nom : String,
    prenom : String,
    specialite : String//,
  //  patients_2014 : [{
  //      nom : String,
  //      prenom : String
  //  }],
  //  nbr_visites : String
});

mongoose.model("dossiers", Dossiers, "dossiers");
mongoose.model("patients", Patients, "dossiers");

mongoose.model("professionnels", Professionnels, "professionnels");

mongoose.connect('mongodb://localhost/SEIJ04019006');
db = mongoose.connection;
db.on("error", console.error.bind(console, "Erreur de connection sur mongoDB"));
db.once("open", function callback(){});
