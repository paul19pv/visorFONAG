var velocidad = 5000;
var indicecapa = 0;
var var_timer;
var capa_actual = '';

var lista_coberturas = [];
var listado_capas = [];

/*var map;
var url_mapas = 'http://localhost:8070/visor/geojson/';
var url_base = 'http://localhost:8070/visor/';
*/
//$( window ).on( "load", function() {
$(function(){
    refresh_map()
    load_geojson();
    $("#div_leyenda").hide();
    $("#tab_seguimiento").tabs();
    $("#velocidad").click(function () {
        velocidad = $(this).val()*100;
        console.log(velocidad)
    });
    $("#btn_animacion").click(function () {
        if (listado_capas.length > 1 && velocidad > 0) {
            if ($(this).html() === "Iniciar") {
                iniciarAnimacion();
                $(this).html("Detener");
            } else {
                detenerAnimacion();
                $(this).html("Iniciar");
            }
        }
    });
    //habilitar/deshabilitar checks precipitacion
    $("#chk_periodos").click(conmutar_periodos);
    $('#div_periodos input').click(precipitacion);
    
});
//cargar mapa
function refresh_map(){
    var latitud=$("#sec_latitud").val();
    var longitud=$("#sec_longitud").val();
    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: parseFloat(latitud), lng: parseFloat(longitud)},
        //center: {lat: -0.2, lng: -78.50},
        zoom: 13,
        mapTypeId: google.maps.MapTypeId.HYBRID,
        mapTypeControlOptions: {
            mapTypeIds: [
                google.maps.MapTypeId.ROADMAP,
                google.maps.MapTypeId.TERRAIN,
                google.maps.MapTypeId.SATELLITE,
                google.maps.MapTypeId.HYBRID
            ],
            style: google.maps.MapTypeControlStyle.DROPDOWN_MENU,
            position: google.maps.ControlPosition.LEFT_TOP
        }
    });
    addLayer('fonag01:Ambito_FONAG');
}
//cargar capas por sector
function load_geojson() {
    
    get_coberturas_sector();
    for (var i = 0; i < lista_coberturas.length; i++) {
        map.data.loadGeoJson(url_mapas + lista_coberturas[i].layer);
    }
    map.data.setStyle(style_bf);
    map.data.addListener('click', info_map);
    //map.data.addListener('mouseout', hide_info);
}

//cargar las coberturas de la base de datos y asignar a la variable lista_coberturas
function get_coberturas_sector() {
    lista_coberturas = [];
    var sector = $("#txt_sector").val();
    if (sector !== undefined) {
        var capas = $.ajax({
            url: "/visor/CobVeg/get_coberturas/" + sector,
            type: "GET",
            dataType: "json",
            async: false}).responseText;
        capas = JSON.parse(capas)
        for (var i = 0; i < capas.length; i++) {
            var item = {id: i + 1, nombre: capas[i].seg_nombre, periodo: capas[i].seg_periodo, layer: capas[i].seg_archivo, ecosistema:capas[i].seg_ecosistema, agregado: false}
            lista_coberturas.push(item);
        }
    }

}
function style_bf(feature) {
    var anio =parseFloat(feature.getProperty('ANIO')).toFixed(0)
    var color = "#FF8C00";
    var show_layer = false;
    var limite = listado_capas.length;
    for (var i = 0; i < limite; i++) {
        var periodo=listado_capas[i].periodo;
        if (anio.toString() === periodo.toString()) {
            show_layer = true;
        }
        else if(periodo==="2005-2011" && (anio>=2005 && anio<=2011)){
            show_layer = true;
        }
    }
    return{
        fillColor: color,
        strokeWeight: 1,
        strokeColor: color,
        visible: show_layer,
        fillOpacity: 0.5
    };

}
function animacion(feature) {
    var capa = feature.getProperty('CAPA');
    var color = "#FF8C00";
    var show_layer = false;
    if (capa === capa_actual) {
        show_layer = true;
        info_cobertura(feature);
    }

    return{
        fillColor: color,
        strokeWeight: 1,
        strokeColor: color,
        visible: show_layer,
        fillOpacity: 0.5
    };

}

function iniciarAnimacion() {
    $("input.w3-check").prop("disabled", true);
    $("input.w3-radio").prop("disabled", true);
    $("#div_info").show();
    capa_actual = listado_capas[0].nombre;
    map.data.setStyle(animacion);
    console.log("capa agregada ini", capa_actual);
    indicecapa = 1;
    var_timer = setInterval(activar_cobertura, velocidad);
}
function detenerAnimacion() {
    $("input.w3-check").prop("disabled", false);
    $("input.w3-radio").prop("disabled", false);
    $("input.w3-check").prop("checked", false);
    $("#chk_periodos").prop("checked", false);
    $("#div_info").hide();
    indicecapa = 0;
    clearInterval(var_timer);
    capa_actual = '';
    eliminar_coberturas();
    map.data.setStyle(animacion);
    $("#div_capa").hide();
}
function precipitacion() {
    //console.log(capa_actual)
    if ($(this).is(":checked"))
    {
        if ($(this).val() !== 'todos') {
            capa_actual = $(this).val();
        }
        conmutar_cobertura($(this).val(), true);
        $("#div_leyenda").show();
    } else {
        capa_actual = '';
        conmutar_cobertura($(this).val(), false);
    }
    actualizar_coberturas();
    map.data.setStyle(style_bf);
    $("#div_capa").hide();
}

function activar_cobertura() {
    var verCobertura = false;
    var numero_capas = listado_capas.length;
    while (!verCobertura) {
        console.log("while", listado_capas.length);
        if (indicecapa >= numero_capas) {
            indicecapa = 0;
            capa_actual = '';
            map.data.setStyle(animacion);
            console.log("capa eliminada", capa_actual);
        }
        if (numero_capas > 1) {
            if (indicecapa > 0 && indicecapa < numero_capas) {
                if (capa_actual === listado_capas[indicecapa - 1].nombre) {
                    console.log("capa eliminada", capa_actual);
                    capa_actual = '';
                    map.data.setStyle(animacion);
                }
                if (capa_actual !== listado_capas[indicecapa - 1].nombre) {
                    capa_actual = listado_capas[indicecapa].nombre;
                    //map.data.setStyle(animacion);
                    setTimeout(agregar_capa, 1000);
                    //info_cobertura(listado_capas[indicecapa]);
                    //map.data.setStyle(animacion);
                    console.log("capa agregada0", capa_actual);
                    verCobertura = true;
                }
            } else {
                capa_actual = listado_capas[indicecapa].nombre;
                //map.data.setStyle(animacion);
                setTimeout(agregar_capa, 1000);
                //info_cobertura(listado_capas[indicecapa]);
                console.log("capa agregada1", capa_actual);
                verCobertura = true;
            }
        }
        indicecapa++;
    }
}
function agregar_capa() {
    map.data.setStyle(animacion);
}
function conmutar_cobertura(periodo, agregado) {
    var num_coberturas = lista_coberturas.length;
    if (periodo !== 'todos') {
        for (var i = 0; i < num_coberturas; i++) {
            if (lista_coberturas[i].periodo.toString() === periodo.toString()) {
                if (agregado) {
                    lista_coberturas[i].agregado = true;
                } else {
                    lista_coberturas[i].agregado = false;
                }
            }else if(periodo === '2005-2011' && (parseFloat(lista_coberturas[i].periodo)>=2005 && parseFloat(lista_coberturas[i].periodo)<2011) ){
                if (agregado) {
                    lista_coberturas[i].agregado = true;
                } else {
                    lista_coberturas[i].agregado = false;
                }
            }
        }
    } else {
        for (var i = 0; i < num_coberturas; i++) {
            if (agregado) {
                lista_coberturas[i].agregado = true;
            } else {
                lista_coberturas[i].agregado = false;
            }
        }
    }
}
function actualizar_coberturas() {
    listado_capas = [];
    var limite = lista_coberturas.length;
    for (var i = 0; i < limite; i++) {
        if (lista_coberturas[i].agregado) {
            listado_capas.push(lista_coberturas[i]);
        } else {
            listado_capas.slice(i, 1);
        }
    }
}
//vaciar los array cuando terminne la animacion
function eliminar_coberturas() {
    listado_capas = [];
    var num_coberturas = lista_coberturas.length;
    for (var i = 0; i < num_coberturas; i++) {
        lista_coberturas[i].agregado = false;
    }
    console.log("limpiar");
}
function conmutar_periodos() {
    $("input.chk_periodos").prop("disabled", this.checked);
    $("input.chk_periodos").prop("checked", this.checked);
}
function info_map(event) {
    var capa = event.feature;
    $("#div_capa").show();
    $("#unidad").html('<p class="w3-margin-0">' + capa.getProperty('U_HIDRICA') + '</p>');
    $("#sector").html('<p class="w3-margin-0">' + capa.getProperty('SECTOR') + '</p>');
    $("#propietario").html('<p class="w3-margin-0">' + capa.getProperty('PROPIETARI') + '</p>');
    $("#ecosistema").html('<p class="w3-margin-0">' + capa.getProperty('ECOSISTEMA') + '</p>');
    $("#estrategia").html('<p class="w3-margin-0">' + capa.getProperty('T_RECUPERA') + '</p>');
    $("#actividad").html('<p class="w3-margin-0">' + capa.getProperty('FASE_RECUP') + '</p>');
    $("#anio").html('<p class="w3-margin-0">' + parseFloat(capa.getProperty('ANIO')).toFixed(0) + '</p>');
    
    $("#pendiente").html('<p class="w3-margin-0">' + capa.getProperty('A_P_PENDIE') + '</p>');
    $("#metodo").html('<p class="w3-margin-0">' + capa.getProperty('A_P_METOD') + '</p>');
    $("#dimension").html('<p class="w3-margin-0">' + capa.getProperty('A_P_DIMENS') + '</p>');
    $("#especies").html('<p class="w3-margin-0">' + capa.getProperty('ESPECIES') + '</p>');
    $("#num_plantas").html('<p class="w3-margin-0">' + capa.getProperty('A_P_ESPNUM') + '</p>');
    $("#area_plan").html('<p class="w3-margin-0">'+parseFloat(capa.getProperty('AREA_REG')).toFixed(2) + ' ha</p>');   
    
    $("#area_plan01").html('<p class="w3-margin-0">'+parseFloat(capa.getProperty('AREA_REG')).toFixed(2) + ' ha</p>');   
    $("#area_man").html('<p class="w3-margin-0">'+parseFloat(capa.getProperty('A_P_ARHA')).toFixed(2) + ' ha</p>');   
    
    $("#lon_cer").html('<p class="w3-margin-0">'+parseFloat(capa.getProperty('P_C_LONGME')).toFixed(2) + ' metros</p>');
    $("#area_cer").html('<p class="w3-margin-0">'+parseFloat(capa.getProperty('AREA_REG')).toFixed(2) + ' metros</p>');
    
    if( capa.getProperty('FASE_RECUP')==="Plantacion" && capa.getProperty('T_RECUPERA')==="Activa"){
        $("#plantacion").show();
        $("#pla_man").hide();
        $("#cercado").hide();
    }
    else if( capa.getProperty('FASE_RECUP')==="Mantenimiento" && capa.getProperty('T_RECUPERA')==="Activa"){
        $("#pla_man").show();
        $("#plantacion").hide();
        $("#cercado").hide();
    }
    else if( capa.getProperty('T_RECUPERA')==="Pasiva"){
        $("#cercado").show();
        $("#plantacion").hide();
        $("#pla_man").hide();
    }
    
    else{
        $("#cercado").hide();
        $("#plantacion").hide();
        $("#pla_man").hide();
    }
    
}   

function hide_info(event) {
    $("#div_capa").hide();
    $("#div_capa").html('');
}
function info_cobertura(capa) {
    $("#div_capa").show();
    $("#area").html('<p class="w3-margin-0">'+parseFloat(capa.getProperty('AREA_REG')).toFixed(2) + ' ha</p>');
    $("#propietario").html('<p class="w3-margin-0">' + capa.getProperty('PROPIETARI') + '</p>');
    $("#ecosistema").html('<p class="w3-margin-0">' + capa.getProperty('ECOSISTEMA') + '</p>');
    $("#estrategia").html('<p class="w3-margin-0">' + capa.getProperty('T_RECUPERA') + '</p>');
    $("#actividad").html('<p class="w3-margin-0">' + capa.getProperty('FASE_RECUP') + '</p>');
    $("#unidad").html('<p class="w3-margin-0">' + capa.getProperty('U_HIDRICA') + '</p>');
    $("#sector").html('<p class="w3-margin-0">' + capa.getProperty('SECTOR') + '</p>');
    $("#anio").html('<p class="w3-margin-0">' + parseFloat(capa.getProperty('ANIO')).toFixed(0) + '</p>');
    $("#especies").html('<p class="w3-margin-0">' + capa.getProperty('ESPECIES') + '</p>');
}
function leyenda() {
    //console.log("leyenda");
    //var legend = document.createElement('div');
    var legend = document.getElementById('div_leyenda');
    //legend.id = 'legend';
    var content = [];
    content.push('<h6>Periodo</h6>');
    content.push('<div><div class="indicador muybaja"></div><div class="w3-validate">Muy Baja</div></div>');
    content.push('<div><div class="indicador baja"></div><div class="w3-validate">Baja</div></div>');
    content.push('<div><div class="indicador moderada"></div><div class="w3-validate">Moderada</div></div>');
    content.push('<div><div class="indicador alta"></div><div class="w3-validate">Alta</div></div>');
    content.push('<div><div class="indicador muyalta"></div><div class="w3-validate">Muy Alta</div></div>');
    legend.innerHTML = content.join('');
    legend.index = 1;
    //map.controls[google.maps.ControlPosition.RIGHT_BOTTOM].push(legend);
}