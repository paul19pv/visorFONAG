<script src="<?php echo base_url() ?>js/listar_sectores.js"></script>
<div class="w3-container">
    <h3><center>Acuerdos para la conservación y</center> <center>sostenibilidad</center></h3>
    <form>
        <div class="w3-row">
            <div class="w3-col l4 m4 s4">
                <label class="w3-label w3-text-black"><b>Unidad:</b></label>
            </div>
            <div class="w3-col l8 s8">
                <select class="w3-select w3-border" name="unidades" id="unidades" onchange="getSelectsectores();">
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



<!--listado de resultados -->
<div id="div_capa" class="w3-container w3-white w3-round" style="display: none;">    
 <div class="w3-row">
    <div class="w3-col l2 m4 s12"><p class="w3-margin-0"><strong>Unidad </strong></p></div> 
    <div class="w3-col l10 m8 s12" style="text-align: left;" id="unidad" ></div> 
</div>
<br>
<div class="w3-row">
    <div class="w3-col l2 m4 s12"><p class="w3-margin-0"><strong>Sector </strong></p></div>
    <div class="w3-col l10 m8 s12" style="text-align: justify-all;" id="sector"></div>
</div>
<br>
<div class="w3-row">
    <div class="w3-col l12 m12 s12"><p class="w3-margin-0"><strong>Presión </strong></p></div>
    <div class="w3-col l12 m12 s12"  id="presion"></div>
</div>
<br>
<div class="w3-row">
    <div class="w3-col l12 m12 s12"><p class="w3-margin-0"><strong>Actividad </strong></p></div>
    <div class="w3-col l12 m12 s12" style="text-align: justify-all;" id="actividad"></div>
</div>
<br>
<div class="w3-row">
    <div class="w3-col l12 m12 s12"><p class="w3-margin-0"><strong>Descripción </strong></p></div>
    <div class="w3-col l12 m12 s12" style="text-align: justify-all;" id="descripcion"></div>
</div>
<br>
<div class="w3-row">
    <div class="w3-col l12 m12 s12">
        <img src="" id="imagen" style="width: 100%; height: auto " /> 
    </div>

</div>

</div>
