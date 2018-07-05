function getSelectsectores(){		
	map.data.forEach(function(feature) {
		map.data.remove(feature);
	});
	var selectedsectores = document.getElementById('unidades').value;
	console.log(selectedsectores);

	var capas = $.ajax({
		url: "/visor/Pachs/listar_sectores/" + selectedsectores,
		type: "GET",
		dataType: "json",
		async: false}).responseText;

	capas = JSON.parse(capas)
	map.data.addGeoJson(capas)
	map.data.addListener('click', info_map);

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
	
	$("#unidad").html('<p class="w3-margin-0">' + point.getProperty('unidad') + '</p>');
	$("#sector").html('<p class="w3-margin-0">' + point.getProperty('sector') + '</p>');
	$("#actividad").html('<p class="w3-margin-0">' + point.getProperty('actividad') + '</p>');
	$("#descripcion").html('<p class="w3-margin-0">' + point.getProperty('descripcion') + '</p>');
	$("#imagen").attr('src', point.getProperty('imagen'));

	
}

