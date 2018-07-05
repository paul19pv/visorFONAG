
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
	
	var selectedunidades = document.getElementById('unipachs').value;
	console.log(selectedunidades);
	var capas = $.ajax({
		url: "/visor/Mod_pachs/listar_unidades/" + selectedunidades,
		type: "GET",
		dataType: "json",
		async: false}).responseText;

	capas = JSON.parse(capas)
	map.data.addGeoJson(capas)
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
	var color = "#FAC76E";
	var linea = "#000";
	return{
    	strokeColor: linea,
    	fillColor: color,
    	strokeWeight: 0.5,
    	fillOpacity: 0.5

    };
}



function info_map(event){
	
	var point = event.feature;
	var capa = event.feature;

	geo=point.getGeometry()
	geo.forEachLatLng(function(LatLng){
		point_info = new google.maps.LatLng({lat: LatLng.lat(), lng: LatLng.lng()}); 
	});
	var infowindow = new google.maps.InfoWindow({
    	// marker.setAnimation(google.maps.Animation.BOUNCE);
    });


	infowindow.open(map);


	if (point.getProperty('tipo')=='point') {
		$("#div_capa").show();
		$("#div_Poligono").hide();
	}else {
		$("#div_Poligono").show();
		$("#div_capa").hide();
	}


	// Div Capa
	$("#nombre").html('<p>' + point.getProperty('nombre') + '</p>');
	$("#unidad").html('<p">' +point.getProperty('unidad') + '</p>');
	$("#sector").html('<p">' +point.getProperty('sector') + '</p>');
	$("#actividad").html('<p">' +point.getProperty('actividad') + '</p>');
	$("#descripcion").html('<p">' +point.getProperty('descripcion') + '</p>');
	$("#imagen").attr('src', point.getProperty('imagen'));


	//div_Poligono
	$("#unidades").html('<p>' + point.getProperty('unidad') + '</p>');
	$("#sectores").html('<p">' +point.getProperty('sector') + '</p>');
	$("#actividades").html('<p">' +point.getProperty('actividad') + '</p>');
	$("#descripciones").html('<p">' +point.getProperty('descripcion') + '</p>');

	if( point.getProperty('nombre')==="NULL"){
        $("#nombre").hide();
        $("#no").hide();
    }else{
    	  $("#nombre").show();
    	  $("#no").show();
    }



}


