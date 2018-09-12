<?php
/**
 * 
 */
class Impactos_model extends CI_Model
{
	function __construct() {
		parent::__construct();
	}

	public function get_unidad() {
		return $this->db->get('view_impactos');
	}



    //lista de coberturas para funcion json
	public function get_coberturas_json($uni_id) {
		$this->db->where('uni_id',$uni_id);
		$this->db->order_by('id_imp', 'ASC');
		$query= $this->db->get('impactos');
		return $query->result_array();
	}
}
?>