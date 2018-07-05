<?php
    /**
     * 
     */
    defined('BASEPATH') OR exit('No direct script access allowed');
    class Pachs extends CI_Controller
    {

        public function __construct() {
            parent::__construct();
            $this->load->model('Pachs_model', 'pachs');
        }

        public function index()
        {
            $data['title']= "PACHS";
            $data['mapa']=$this->load->view('pachs/componentes/mapa','',TRUE);
            $consulta['consulta']=$this->pachs->get_unidad();
            $data['filtro']=$this->load->view('pachs/componentes/filtro',$consulta,TRUE);
            $this->load->view("pachs/home",$data);
        }

      
        //lista de los sectores
        public function listar_sectores($uni_id){
            $result=$this->pachs->get_listar_pachs($uni_id); 
            foreach ($result as $fila) {
                $punto=array(
                    'type'=>'Feature',
                    'id'=>$fila->sec_id,
                    'properties'=>array(
                        'unidad'=>$fila->uni_nombre,
                        'sector'=>$fila->sec_nombres,
                        'actividad'=>$fila->sec_actividad,
                        'descripcion'=>$fila->sec_descripcion,
                        'imagen'=>base_url('/images/pachs') . '/' . $fila->sec_imagen,

                    ),
                    'geometry'=>array(
                        'type'=>'Point',
                        'coordinates'=>[floatval($fila->sec_longitud),floatval($fila->sec_latitud)]
                    )
                );
                $puntos[]=$punto;
            }
            $array_padre['type']='FeatureCollection';
            $array_padre['features']=$puntos;
        //var_dump ($array_padre);
            echo json_encode($array_padre);
        }
    }

    ?>