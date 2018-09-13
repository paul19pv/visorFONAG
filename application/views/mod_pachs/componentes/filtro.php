<script src="<?php echo base_url() ?>js/listar_unidades.js"></script>
<!--<script src="<?php echo base_url() ?>js/pachs/js_capaz.js"></script>-->
<div class="w3-container">
  <h4><center>Manejo y Gestión de Areas de</center> <center>Conservación Hidrica</center></h4>
  <form>
    <div class="w3-row">
      <div class="w3-col l4 m4 s4">
        <label class="w3-label w3-text-black"><b>Unidad:</b></label>
      </div>
      <div class="w3-col l8 s8">
        <select class="w3-select w3-border" name="unipachs" id="unipachs" onchange="getSelectUnidades();">
          <option  value="" disabled selected>Seleccione</option>0
          <?php
          foreach ($consulta->result() as $fila) {
            ?>
            <option value="<?= $fila->uni_id ?>" ><?= $fila->uni_nombre ?></option>
            <?php 
          }
          ?>                                          
        </select>
      </div>
    </div>               
  </form>
  
</div>  


<div id="div_Poligono" class="w3-container w3-white w3-round" style="display: none;">

 <div class="w3-row">
  <div class="w3-col l2 m4 s12"><p class="w3-margin-0"><strong>Unidad </strong></p></div> 
  <div class="w3-col l10 m8 s12" style="text-align: left;" id="unidad" ></div> 
</div>

<div class="w3-row">
  <div class="w3-col l2 m4 s12"><p class="w3-margin-0"><strong>Sector </strong></p></div>
  <div class="w3-col l10 m8 s12" style="text-align: justify-all;" id="sector"></div>
</div>

<div class="w3-row">
  <div class="w3-col l12 m12 s12"><p class="w3-margin-0"><strong>Presión </strong></p></div>
  <div class="w3-col l12 m12 s12" style="text-align: justify-all;" id="presion"></div>
</div>

<div class="w3-row">
  <div class="w3-col l12 m12 s12"><p class="w3-margin-0"><strong>Actividad </strong></p></div>
  <div class="w3-col l12 m12 s12" style="text-align: justify-all;" id="actividad"></div>
</div>
<div class="w3-row">
  <div class="w3-col l12 m12 s12"><p class="w3-margin-0"><strong>Infraestructura </strong></p></div>
  <div class="w3-col l12 m12 s12" style="text-align: justify-all;" id="infraestructura"></div>
</div>
<div class="w3-row">
  <div class="w3-col l12 m12 s12"><p class="w3-margin-0"><strong>Información Geográfica Disponible </strong></p></div>
  <div class="w3-col l12 m12 s12" style="text-align: justify-all;" id="IGD"></div>
</div>
<div class="w3-row">
  <div class="w3-col l12 m12 s12"><p class="w3-margin-0"><strong>Instrumento de Gestión </strong></p></div>
  <div class="w3-col l12 m12 s12" style="text-align: justify-all;" id="IGestion"></div>
</div>

<div class="w3-row">
  <div class="w3-col l12 m12 s12"><p class="w3-margin-0"><strong>Especies Emblematicas </strong></p></div>
  <div class="w3-col l12 m12 s12" style="text-align: justify-all;" id="especies"></div>
</div>

</div>







