<?php

defined('BASEPATH') OR exit('No direct script access allowed');

class CobVeg extends CI_Controller {

    public function __construct() {
        parent::__construct();
        $this->load->model('CobVeg_model', 'cobveg');
    }
    //pagina principal para el portal
    public function navegacion($sec_id,$ecosistema,$fase,$actividad){
        $data['mapa']=$this->load->view('cobveg/componentes/mapa','',TRUE);
        $data['seguimiento'] = $this->load->view('cobveg/componentes/seguimiento', $this->seguimiento($sec_id, $fase, $ecosistema,$actividad), TRUE);
        $this->load->view('cobveg/home', $data);
    }
    //pagina principal por unidades hídricas
    public function view_index($uni_id){
        $data['mapa']=$this->load->view('cobveg/componentes/mapa','',TRUE);
        $data['filtro']=$this->filtro($uni_id);
        $data['ficha']= $this->load->view('cobveg/componentes/ficha','',TRUE);
        $this->load->view('cobveg/home', $data);
    }
    //lista de sectores por unidad hídrica
    public function filtro($uni_id){
        $filtro['sectores']= $this->cobveg->get_sectores($uni_id);
        $filtro['unidad']= $this->cobveg->get_unidad($uni_id);
        $data= $this->load->view('cobveg/componentes/filtro',$filtro,TRUE);
        return $data;
    }

    
    public function view_capas($sec_id) {
        $data['sector'] = $this->cobveg->get_sector($sec_id);
        $data['datos'] = $this->cobveg->get_coberturas($sec_id);
        $this->load->view('cobveg/componentes/seguimiento',$data);
    }

    //datos para el componente seguimiento por fase, ecosistema y atividad
    public function seguimiento($sec_id, $fase,$ecosistema,$actividad) {
        $seguimiento['sector'] = $this->cobveg->get_sector($sec_id);
        $seguimiento['unidad']=$this->cobveg->get_unidad_sector($sec_id);
        $seguimiento['fase'] = $fase;
        $seguimiento['sec_id'] = $sec_id;
        $seguimiento['ecosistema']=$ecosistema;
        $seguimiento['actividad']=$actividad;
        $seguimiento['datos'] = $this->cobveg->get_coberturas_sector($sec_id, $fase,$ecosistema,$actividad);
        $data['seguimiento'] = $this->load->view('cobveg/componentes/seguimiento', $seguimiento, TRUE);
        return $data;
    }
 
    //cargar la seccion areas prioritarias
    public function view_areas($unidad) {
        $data_necesidad['unidad'] = $unidad;
        $data['necesidad'] = $this->load->view('cobveg/simulacion/necesidad.php', $data_necesidad, TRUE);
        $this->load->view('cobveg/areas', $data);
    }

    //vista de prueba
    public function view_informacion() {
        $this->load->view('cobveg/view_informacion');
    }

    

    //componente escenario
    public function view_escenario($demanda, $precipitacion) {
        $data['guayllabamba'] = $this->cobveg->get_modelo('Guayllabamba', $demanda, $precipitacion);
        $data['napo'] = $this->cobveg->get_modelo('Napo', $demanda, $precipitacion);
        $data['demanda'] = $demanda;
        $data['precipitacion'] = $precipitacion;
        $data['introduccion'] = $this->get_txt_esc($precipitacion);
        $this->load->view('cobveg/componentes/escenario', $data);
    }

    //devolver lista de capas en formato json
    public function get_coberturas_unidad($unidad, $demanda) {
        $data = $this->cobveg->get_coberturas_unidad($unidad, $demanda);
        echo json_encode($data);
    }

    //devolver lista de capas de recuperacion en formato json
    public function get_coberturas_sector($sector, $fase,$ecosistema,$actividad) {
        $data = $this->cobveg->get_coberturas_sector($sector, $fase,$ecosistema,$actividad);
        echo json_encode($data);
    }
    //devolver lista de capas de recuperacion en formato json
    public function get_coberturas($sector) {
        $data = $this->cobveg->get_coberturas_json($sector);
        echo json_encode($data);
    }

    //devolver lista de capas del modelo por demanda, precipitacion y cuenca en formato json
    public function get_coberturas_precipitacion($demanda, $precipitacion, $cuenca) {
        $data = $this->cobveg->get_coberturas_precipitacion($demanda, $precipitacion, $cuenca);
        echo json_encode($data);
    }
    //devolver lista de capas de recupracion por unidad en formato json
    public function get_recuperacion_unidad() {
        $data = $this->cobveg->get_recuperacion_unidad();
        echo json_encode($data);
    }


}
