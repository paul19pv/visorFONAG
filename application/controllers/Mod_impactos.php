<?php
/**
 * 
 */
class Mod_impactos extends CI_Controller
{
	public function __construct() {
		parent::__construct();
		$this->load->model('Impactos_model', 'impactos');
	}

	public function index()
	{
		$data['mapa']=$this->load->view('mod_impactos/componentes/mapa','',TRUE);
		$consulta['consulta']=$this->impactos->get_unidad();
		$data['filtro']=$this->load->view('mod_impactos/componentes/filtro',$consulta,TRUE);
		$this->load->view("mod_impactos/home",$data);
	}


	 //devolver lista de capas de recuperacion en formato json
    public function get_coberturas_impactos($uni_id) {
        $data = $this->impactos->get_coberturas_json($uni_id);
        echo json_encode($data);
    }



}
?>