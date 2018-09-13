function getSelectsectores(){		
	map.data.forEach(function(feature) {
		map.data.remove(feature);
	});
	$("#div_capa").hide();
	var selectedsectores = document.getElementById('unidades').value;
	console.log(selectedsectores);

	var capas = $.ajax({
		url: "/visor/Pachs/listar_sectores/" + selectedsectores,
		type: "GET",
		dataType: "json",
		async: false}).responseText;

	capas = JSON.parse(capas)

	map.data.addGeoJson(capas)
	map.data.setStyle(style_points);
	map.data.addListener('click', info_map);

}

//funcion para cambiar la imagen del mapa
function style_points(feature) {
	return{
    	icon: url_base+'images/iconos/icono_conservacion.png',
    };
}

//
function info_map(event){
	var point = event.feature;
	geo=point.getGeometry()
	geo.forEachLatLng(function(LatLng){
		point_info = new google.maps.LatLng({lat: LatLng.lat(), lng: LatLng.lng()}); 
});
	
	var infowindow = new google.maps.InfoWindow({
		
    });

	infowindow.open(map);

	$("#div_capa").show();
	
	$("#unidad").html('<p class="w3-margin-0" style="text-align: justify-all;"> ' + point.getProperty('unidad') + '</p>');
	$("#sector").html('<p class="w3-margin-0" style="text-align: justify-all;">' + point.getProperty('sector') + '</p>');
	$("#presion").html('<p class="w3-margin-0" style="text-align: justify-all;">' + point.getProperty('presion') + '</p>');
	$("#actividad").html('<p class="w3-margin-0" style="text-align: justify-all;">' + point.getProperty('actividad') + '</p>');
	$("#descripcion").html('<p class="w3-margin-0" style="text-align: justify-all;">' + point.getProperty('descripcion') + '</p>');
	$("#infraestructura").html('<p class="w3-margin-0" style="text-align: justify-all;">' + point.getProperty('infraestructura') + '</p>');
	$("#IGD").html('<p class="w3-margin-0" style="text-align: justify-all;">' + point.getProperty('IGD') + '</p>');
	$("#IGestion").html('<p class="w3-margin-0" style="text-align: justify-all;">' + point.getProperty('IGestion') + '</p>');
	$("#especies").html('<p class="w3-margin-0" style="text-align: justify-all;">' + point.getProperty('especies') + '</p>');
	$("#imagen").attr('src', point.getProperty('imagen'));

	
}

