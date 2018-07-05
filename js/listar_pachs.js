//Funcion de listado de los puntos en el mapa del modulo pachs de Susana
var lista_poligonos = [];
function getSelectUnidades_pachs() {
	
	map.data.forEach(function(feature) {
		map.data.remove(feature);
	});

	get_coberturas_sector_pachs();

	for (var i = 0; i < lista_poligonos.length; i++) {
		map.data.loadGeoJson(url_mapas + lista_poligonos[i].poligonos);
	}
	var selectedunidades = document.getElementById('unidadesPa').value;
	console.log(selectedunidades);

	map.data.setStyle(style_bf);
	map.data.addListener('click', info_map);
}

	//cargar las coberturas de la base de datos y asignar a la variable lista_coberturas
	function get_coberturas_sector_pachs() {
	lista_poligonos = [];
	var selectedunidades = $("#unidadesPa").val();
	console.log(selectedunidades);
	if (selectedunidades !== undefined) {
		var capas = $.ajax({
			url: "/visor/M_pachs/get_coberturas_pachs_S/" + selectedunidades,
			type: "GET",
			dataType: "json",
			async: false}).responseText;
		capas = JSON.parse(capas)
	
		for (var i = 0; i < capas.length; i++) {
			var item = {id: i + 1,  poligonos: capas[i].sector_poligonos,  agregado: false}	
			lista_poligonos.push(item);		
		}
	}

}



function style_bf(feature) {
	var selectedunidades = $("#unidadesPa").val();
	var color = "#EAF92A";
	var linea = "#EAF92A";
	return{
    	strokeColor: linea,
    	fillColor: color,
    	strokeWeight: 4,
    	fillOpacity: 0.5

    };
}



function info_map(event){
	var capa = event.feature;
	$("#div_capa").show();
	$("#unidad").html('<p class="w3-margin-0">' + capa.getProperty('unidad') + '</p>');
	

}

