<script src="<?php echo base_url() ?>js/listar_unidades.js"></script>
<!--<script src="<?php echo base_url() ?>js/pachs/js_capaz.js"></script>-->
<div class="w3-container">
  <h3><center>Manejo y Gestión de Areas de</center> <center>Conservación Hidrica</center></h3>
  <form>
    <div class="w3-row">
      <div class="w3-col l4 s4">
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
  <div id="div_campamentos"></div>
</div>  


<div id="div_Poligono" class="w3-container w3-white w3-round" style="display: none;">

 <div class="w3-row">
    <div class="w3-col l2 m4 s12"><p class="w3-margin-0"><strong>Unidad </strong></p></div> 
    <div class="w3-col l10 m8 s12" style="text-align: left;" id="unidad" ></div> 
</div>






  
  <form>
    <table class="table-striped table-hover table-condensed">
     
      <tr>
        <td>
          <div class="w3-row">
            <div class="w3-col l8 m6"><p class="w3-margin-0"><strong>Unidad </strong></p></div> 
          </div>
        </td>
        <td>
         <p id="unidad"></p>
       </td>
     </tr>
     <tr>
      <td>
        <div class="w3-row">
          <div class="w3-col l4 m6"><p class="w3-margin-0"><strong>Sector </strong></p></div>
        </div>
      </td>
      <td>
       <p id="sector"></p>
     </td>
   </tr>

   <tr>
      <td>
        <div class="w3-row">
          <div class="w3-col l4 m6"><p class="w3-margin-0"><strong>Presion </strong></p></div>
        </div>
      </td>
      <td>
       <p id="presion"></p>
     </td>
   </tr>

   <tr>
    <td>
      <div class="w3-row">
        <div class="w3-col l4 m6"><p class="w3-margin-0"><strong>Actividades </strong></p></div>
      </div>
    </td>
    <td>
     <p id="actividad"></p>
   </td>
 </tr>
 

 <tr>
  <td>
    <div class="w3-row">
      <div class="w3-col l4 m6"><p class="w3-margin-0"><strong>Infraestructura </strong></p></div>
    </div>
  </td>
  <td>
   <p id="infraestructura"></p>
 </td>
</tr>

<tr>
  <td>
    <div class="w3-row" id="no">
      <div class="w3-col l4 m6"><p class="w3-margin-0"><strong>Información Geográfica Disponible</strong></p></div> 
    </div>
  </td>
  <td>
   <p id="IGD"></p>
 </td>
</tr>

<tr>
  <td>
    <div class="w3-row" id="no">
      <div class="w3-col l4 m6"><p class="w3-margin-0"><strong>Instrumento de Gestión</strong></p></div> 
    </div>
  </td>
  <td>
   <p id="IGestion"></p>
 </td>
</tr>
<tr>
  <td>
    <div class="w3-row" id="no">
      <div class="w3-col l4 m6"><p class="w3-margin-0"><strong>Especies Emblematicas</strong></p></div> 
    </div>
  </td>
  <td>
   <p id="especies"></p>
 </td>
</tr>

</table>
</form>

</div>







