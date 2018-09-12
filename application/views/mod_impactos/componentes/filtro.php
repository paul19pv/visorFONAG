<script src="<?php echo base_url() ?>js/listar_impactos.js"></script>
<div class="w3-container">
    <h3>Informacion Cartografica</h3>
    <form>
        <div class="w3-row">
            <div class="w3-col l4 s4">
                <label class="w3-label w3-text-black"><b>Unidad:</b></label>
            </div>
            <div class="w3-col l8 s8">
                <select class="w3-select w3-border" name="unidadesImpactos" id="unidadesImpactos" onchange="getSelectimpactos();">
                    <option value="" disabled selected>Seleccione</option>
                   <?php
                    foreach ($consulta->result() as $fila) {
                        ?>
                        <option value="<?= $fila->uni_id ?>" ><?=$fila->uni_nombre ?></option>
                        <?php 
                    }
                    ?>                   
                </select>
            </div>
        </div>               
    </form>
</div>



<div id="div_capa" class="w3-container w3-white w3-round" style="display: none;">
    <p style="background: #CBCBCB"><center><b>Reportes de Indicador de Impactos FONAG EPMAPS</b></center></p>
      <form>
    <table class="table-striped table-hover table-condensed">
       
        <tr>
            <td colspan="1">
                <div class="w3-row">
                    <div class="w3-col l8 m6"><p class="w3-margin-0"><strong>Etapa Monitoreo: </strong></p></div> 
                </div>
            </td>
            
            <td>
               <p id="etapa"></p>
           </td>
       </tr>
       <tr>
        <td>
            <div class="w3-row">
                <div class="w3-col l4 m6"><p class="w3-margin-0"><strong>Área de conservación por interes hídrico: </strong></p></div>
            </div>
        </td>
        <td>
            <p id="area"></p>
        </td>
    </tr>
    
    <tr>
        <td>
            <div class="w3-row">
                <div class="w3-col l4 m6"><p class="w3-margin-0"><strong>Superficie: </strong></p></div>
            </div>
        </td>
        <td>
            <p id="cantidad"></p>
        </td>
    </tr> 
    <tr>
        <td>
            <div class="w3-row">
                <div class="w3-col l4 m6"><p class="w3-margin-0"><strong>Propietario: </strong></p></div>
            </div>
        </td>
        <td>
            <p id="propietario"></p>
        </td>
    </tr>
   
    <tr>
        <td>
            <div class="w3-row">
                <div class="w3-col l4 m6"><p class="w3-margin-0"><strong>Ubicación: </strong></p></div>
            </div>
        </td>
        <td>
            <p id="ubicacion"></p>
        </td>
    </tr>
   <tr>
        <td>
            <div class="w3-row">
                <div class="w3-col l4 m6"><p class="w3-margin-0"><strong>Unidad: </strong></p></div>
            </div>
        </td>
        <td>
            <p id="unidad"></p>
        </td>
    </tr>
 <tr>
        <td>
            <div class="w3-row">
                <div class="w3-col l4 m6"><p class="w3-margin-0"><strong>Captación que impacta: </strong></p></div>
            </div>
        </td>
        <td>
            <p id="captacion"></p>
        </td>
    </tr>
     <tr>
        <td>
            <div class="w3-row">
                <div class="w3-col l4 m6"><p class="w3-margin-0"><strong>Sistemas de conducción: </strong></p></div>
            </div>
        </td>
        <td>
            <p id="sistemas"></p>
        </td>
    </tr>
     <tr>
        <td>
            <div class="w3-row">
                <div class="w3-col l4 m6"><p class="w3-margin-0"><strong>Mecanismo de Conservación: </strong></p></div>
            </div>
        </td>
        <td>
            <p id="mecanismo"></p>
        </td>
    </tr>
     <tr>
        <td>
            <div class="w3-row">
                <div class="w3-col l4 m6"><p class="w3-margin-0"><strong>Estrategia Aplicada: </strong></p></div>
            </div>
        </td>
        <td>
            <p id="estrategia"></p>
        </td>
    </tr>
     <tr>
        <td>
            <div class="w3-row">
                <div class="w3-col l4 m6"><p class="w3-margin-0"><strong>Fecha incorporación: </strong></p></div>
            </div>
        </td>
        <td>
            <p id="fecha"></p>
        </td>
    </tr>
     <tr>
        <td>
            <div class="w3-row" id="ob">
                <div class="w3-col l4 m6"><p class="w3-margin-0"><strong>Observaciones: </strong></p></div>
            </div>
        </td>
        <td>
            <p id="observaciones"></p>
        </td>
    </tr>
</table>
</form>

</div>


