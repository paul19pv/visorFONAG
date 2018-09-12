//Funcion de listado de los poligonos en el mapa del modulo de Tania
var lista_poligonos = [];
var listado_capas = [];
function getSelectimpactos(){		
	map.data.forEach(function(feature) {
		map.data.remove(feature);
	});
	get_coberturas_sector();

	for (var i = 0; i < lista_poligonos.length; i++) {
		map.data.loadGeoJson(url_mapas + lista_poligonos[i].poligonos);
	
	}
	var selectedunidades = document.getElementById('unidadesImpactos').value;
	console.log(selectedunidades);

	
	map.data.setStyle(style_bf);
	map.data.addListener('click', info_map);
}

//cargar las coberturas de la base de datos y asignar a la variable lista_coberturas
function get_coberturas_sector() {
	lista_coberturas = [];
	lista_poligonos = [];
	var selectedunidades = $("#unidadesImpactos").val();
	console.log(selectedunidades);
	if (selectedunidades !== undefined) {
		var capas = $.ajax({
			url: "/visor/Mod_impactos/get_coberturas_impactos/" + selectedunidades,
			type: "GET",
			dataType: "json",
			async: false}).responseText;
		capas = JSON.parse(capas)
	
		for (var i = 0; i < capas.length; i++) {
			var item = {id: i + 1,  poligonos: capas[i].poligono_imp, agregado: false}
			lista_coberturas.push(item);
			lista_poligonos.push(item);
			

		}
	}
}

function style_bf(feature) {
	var selectedunidades = $("#unidadesImpactos").val();
	var color = "#FAC76E";
	var linea = "#000";
	return{
    	strokeColor: linea,
    	fillColor: color,
    	strokeWeight: 0.5,
    	fillOpacity: 0.9

    };
}


function info_map(event){
	
	var point = event.feature;
	var capa = event.feature;

	var infowindow = new google.maps.InfoWindow({
    	// marker.setAnimation(google.maps.Animation.BOUNCE);
    });
	infowindow.open(map);
	$("#div_capa").show();
	$("#etapa").html('<p>' + point.getProperty('etapa') + '</p>');
	$("#area").html('<p>' + point.getProperty('area') + '</p>');
	$("#cantidad").html('<p>' + point.getProperty('cantidad') + '</p>');
	$("#propietario").html('<p>' + point.getProperty('propietario') + '</p>');
	$("#ubicacion").html('<p>' + point.getProperty('ubicacion') + '</p>');
	$("#unidad").html('<p>' + point.getProperty('unidad') + '</p>');
	$("#captacion").html('<p>' + point.getProperty('captacion') + '</p>');
	$("#sistemas").html('<p>' + point.getProperty('sistemas') + '</p>');
	$("#mecanismo").html('<p>' + point.getProperty('mecanismo') + '</p>');
	$("#estrategia").html('<p>' + point.getProperty('estrategia') + '</p>');
	$("#fecha").html('<p>' + point.getProperty('fecha') + '</p>');
	$("#observaciones").html('<p>' + point.getProperty('observaciones') + '</p>');


	if( point.getProperty('observaciones')==="NULL"){
        $("#observaciones").hide();
        $("#ob").hide();
        
    }else{
    	  $("#observaciones").show();
    	  $("#ob").show();
    	
    }

}


