<?php
/**
 * 
 */
defined('BASEPATH') OR exit('No direct script access allowed');
class Pachs_model extends CI_Model
{
	function __construct() {
		parent::__construct();
	}

	public function get_unidad() {
		return $this->db->get('view_unidades');
	}

    //Listar los puntos en el mapa
	public function get_listar_pachs($uni_id){

		if ($uni_id !="null") {
			$array = array('uni_id' => $uni_id);
			$this->db->where($array);
		}
		else{
		}
		$query = $this->db->get('vew_sectores');
		return $query->result();
	}

	public function get_listar_modal($sec_id){
		$query= $this->db->get_where('vew_sectores',array('sec_id' => $sec_id));
		return $query->row();
	}




	//modulo de pachs Galo
	public function get_unidad_pachs()
	{
		return $this->db->get('view_pachs');
	}


	public function get_listar_pachs_G($uni_id){

		if ($uni_id !="null") {
			$array = array('uni_id' => $uni_id);
			$this->db->where($array);
		}
		else{
		}
		$query = $this->db->get('view_pachss');
		return $query->result();
	}


	public function get_listar_PA()
	{
		$query= $this->db->get('view_pachss');
		return $query->row();
	}

	
    //lista de coberturas para funcion json
	public function get_coberturas_json($uni_id) {
		$this->db->where('uni_id',$uni_id);
		$this->db->order_by('secp_id', 'ASC');
		$query= $this->db->get('sec_patch');
		return $query->result_array();
	}

	//Genera la consulta de la tabla caudales_ecologicos travez del id_uh
	public function getcaudales_query($uhidrica_id)
	{
		$query= $this->db->get_where('view_pachss',array('uni_id' => $uhidrica_id));
		return $query->row();
	}

	

}
?>

