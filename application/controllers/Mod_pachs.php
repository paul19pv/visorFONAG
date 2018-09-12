<?php
/**
 * 
 */
class Mod_pachs extends CI_Controller
{
	public function __construct() {
		parent::__construct();
		$this->load->model('Pachs_model', 'pachs');
	}

	public function index()
	{
		$data['mapa']=$this->load->view('mod_pachs/componentes/mapa','',TRUE);
		$consulta['consulta']=$this->pachs->get_unidad_pachs();
		$consulta['consultas']=$this->pachs->get_listar_PA();
		$data['filtro']=$this->load->view('mod_pachs/componentes/filtro',$consulta,TRUE);
		$this->load->view("mod_pachs/home",$data);
	}



	// Tramos Get Caudales
	public function getcampamentos()
	{ 
		$uhidrica_id = $this->input->post('uhidrica_id');
		$tramos['consulta'] = $this->pachs->getcaudales_query($uhidrica_id);
		#$tramos['consultacau'] = $this->visor_model->getcaudales_nombre($caudales_id);
		$this->load->view("mod_pachs/componentes/campamentos",$tramos);
	}



	//listar unidades hidricas del pachs del GALO






	 //devolver lista de capas de recuperacion en formato json
    public function get_coberturas_pachs($uni_id) {
        $data = $this->pachs->get_coberturas_json($uni_id);
        echo json_encode($data);
    }


    


}
?>