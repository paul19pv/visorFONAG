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
    
    /*load_geojson();
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
    $("#zoom_01").elevateZoom();*/
});

//cargar capas por sector
function load_geojson() {
    get_coberturas_sector();
    for (var i = 0; i < lista_coberturas.length; i++) {
        map.data.loadGeoJson(url_mapas + lista_coberturas[i].layer);
        console.log(lista_coberturas[i].layer)
    }
    map.data.setStyle(style_bf);
    map.data.addListener('click', info_map);
    //map.data.addListener('mouseout', hide_info);
}

//cargar las coberturas de la base de datos y asignar a la variable lista_coberturas
function get_coberturas_sector() {
    lista_coberturas = [];
    var sector = $("#txt_sector").val();
    var fase = $("#txt_fase").val();
    var ecosistema = $("#txt_ecosistema").val();
    var actividad = $("#txt_actividad").val();
    if (sector !== undefined && fase !== undefined) {
        var capas = $.ajax({
            url: "/visor/CobVeg/get_coberturas_sector/" + sector + "/" + fase + "/" + ecosistema+"/"+actividad,
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
    var capa = feature.getProperty('CAPA');
    var ecosistema = feature.getProperty('ECOSISTEMA').toLowerCase()==='paramo'?'paramo':'bosque';
    var color = "#FF8C00";
    var show_layer = false;
    var limite = listado_capas.length;
    for (var i = 0; i < limite; i++) {
        if (capa === listado_capas[i].nombre && ecosistema===listado_capas[i].ecosistema) {
            console.log("true")
            show_layer = true;
        }
        //console.log("false")
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
    console.log(capa_actual)
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
function conmutar_cobertura(capa, agregado) {
    var num_coberturas = lista_coberturas.length;
    if (capa !== 'todos') {
        for (var i = 0; i < num_coberturas; i++) {
            if (lista_coberturas[i].nombre === capa) {
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