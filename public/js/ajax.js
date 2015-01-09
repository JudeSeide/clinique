function loadPro(){
	var str = $("#leId").text();
	var id = str.substring(1, 25);

	var request = new XMLHttpRequest();
	var url = "/pros/" + id;

	request.open("GET", url, true);
	request.onreadystatechange = function() {
		if (request.readyState === 4 && request.status === 200) {
			var div = document.getElementById("content");
			div.innerHTML = '<pre>'+request.responseText+'</pre>';
		}else if (request.readyState === 4 && request.status !== 200){
			var div = document.getElementById("content");
			div.innerHTML = "Erreur : dossiers non-trouvés";
		}
	};
	request.send();
}

function modifier() {
	var str = $("#leId").text();
	var id = str.substring(1, 25);
	var nm = $("input#nom").val();
	var prnm = $("input#prenom").val();
	var sex = $("input#sexe").val();
	var spcialite = $("input#specialite").val();

	//Data to push
	var jsonData = JSON.stringify({
		_id : id,
		sexe : sex,
		nom : nm,
		prenom : prnm,
		specialite : spcialite
	});

	var request = new XMLHttpRequest();
	var url = "/pros/" + id;

	request.open("PUT", url, true);
	//request.setRequestHeader("Content-type", "application/json");
	request.onreadystatechange = function() {
		if (request.readyState === 4 && request.status === 200) {
			var div = document.getElementById("message");
			div.innerHTML = '<pre>'+request.responseText+'</pre>';
		}else if (request.readyState === 4 && request.status !== 200) {
			var div = document.getElementById("message");
			div.innerHTML = '<p>'+request.responseText+'</p>';
		}
	};
	request.send(jsonData);
}

function supprimer() {

    if (confirm("Confirmer la suppression du professionnel!") == true) {
        var str = $("#leId").text();
				var id = str.substring(1, 25);

				var request = new XMLHttpRequest();
				var url = "/pros/" + id;

				request.open("DELETE", url, true);
				request.onreadystatechange = function() {
					if (request.readyState === 4 && request.status === 200) {
						var temp = '/';
						location.replace(temp);
					}else if (request.readyState === 4 && request.status !== 200){
						var div = document.getElementById("content");
						div.innerHTML = "Erreur : Suppression échouée";
					}
				};
				request.send();
    }
}


function ajouter() {
	var nm = $("input#nom").val();
	var prnm = $("input#prenom").val();
	var sex = $("input#sexe").val();
	var spcialite = $("input#specialite").val();

	//Data to push
	var jsonData = JSON.stringify({
		sexe : sex,
		nom : nm,
		prenom : prnm,
		specialite : spcialite
	});

	var request = new XMLHttpRequest();
	var url = "/pros/";

	request.open("POST", url, true);
	//request.setRequestHeader("Content-type", "application/json");
	request.onreadystatechange = function() {
		if (request.readyState === 4 && request.status === 201) {
			var div = document.getElementById("message");
			var json = JSON.parse(request.responseText);

			div.innerHTML = '<p>Ajout du professionnel reussi</p>';

			var temp = '/pros/consulter/' + json._id;
			location.replace(temp);

		}else if (request.readyState === 4 && request.status !== 201) {
			var div = document.getElementById("message");
			div.innerHTML = '<p>'+request.responseText+'</p>';
			console.log(request);
		}
	};
	request.send(jsonData);
}
