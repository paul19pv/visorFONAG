
//Funcion de listado de los puntos en el mapa del modulo pachs del GALO

var lista_poligonos = [];
var listado_capas = [];

function getSelectUnidades() {

	map.data.forEach(function(feature) {
		map.data.remove(feature);
	});
	
	get_coberturas_sector();
	//get_poligonos_sector();

	
	for (var i = 0; i < lista_poligonos.length; i++) {
		map.data.loadGeoJson(url_mapas + lista_poligonos[i].poligonos);
	}

	map.data.setStyle(style_bf);
	map.data.addListener('click', info_map);
}



//cargar las coberturas de la base de datos y asignar a la variable lista_coberturas
function get_coberturas_sector() {
	lista_coberturas = [];
	lista_poligonos = [];
	var selectedunidades = $("#unipachs").val();
	console.log(selectedunidades);
	if (selectedunidades !== undefined) {
		var capas = $.ajax({
			url: "/visor/Mod_pachs/get_coberturas_pachs/" + selectedunidades,
			type: "GET",
			dataType: "json",


			async: false}).responseText;
		capas = JSON.parse(capas)
	
		for (var i = 0; i < capas.length; i++) {
			var item = {id: i + 1,  poligonos: capas[i].secp_poligono, agregado: false}
			lista_coberturas.push(item);
			lista_poligonos.push(item);
		}
	}
}


function style_bf(feature) {
	var selectedunidades = $("#unipachs").val();
	var color = "#00BCD4";
	var linea = "#fff";
	return{
    	strokeColor: linea,
    	fillColor: color,
    	strokeWeight: 1.5,
    	fillOpacity: 0.8
    };
}



function info_map(event){
	var capa = event.feature;
	//div_Poligono
	$("#div_Poligono").show();
	$("#unidad").html('<p">' +capa.getProperty('unidad') + '</p>');
	$("#sector").html('<p">' +capa.getProperty('sector') + '</p>');
	$("#presion").html('<p">' +capa.getProperty('presion') + '</p>');
	$("#actividad").html('<p">' +capa.getProperty('actividad') + '</p>');
	$("#infraestructura").html('<p">' +capa.getProperty('infraestructura') + '</p>');
	$("#IGD").html('<p">' +capa.getProperty('IGD') + '</p>');
	$("#IGestion").html('<p">' +capa.getProperty('IGestion') + '</p>');
	$("#especies").html('<p">' +capa.getProperty('especies') + '</p>');
}


