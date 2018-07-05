<script src="<?php echo base_url() ?>js/listar_unidades.js"></script>
<!--<script src="<?php echo base_url() ?>js/pachs/js_capaz.js"></script>-->
<div class="w3-container">
    <h3>Información Cartográfica</h3>
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

<!--
<script type="text/javascript">
    $(document).ready(function(){
        $('#unipachs').on('change',function(){
            getSelectUnidades();
            var uhidrica_id = $(this).val();
            //alert(uhidrica_id);
            if (uhidrica_id == '') {
                $('#div_campamentos').prop('disabled',true);
            }else if(uhidrica_id>1){
                $.ajax({
                    url:"<?php echo base_url() ?>Mod_pachs/getcampamentos",
                    type:"POST",
                    data:{'uhidrica_id' : uhidrica_id},
                    success:function(data){
                        $('#div_campamentos').html(data);
                    },
                    error:function(){
                        alert('No contiene campamentos esta Unidad Hidrica');
                    }

                });
            }
        });
    });
</script>
-->






<div id="div_capa" class="w3-container w3-white w3-round" style="display: none;">
    <form>
        <table class="table-striped table-hover table-condensed">
            <p style="background: #CBCBCB"><center><b>Listado de Campamentos</b></center></p>
            <tr>
                <td>
                    <div class="w3-row">
                        <div class="w3-col l8 m6"><p class="w3-margin-0"><strong>Unidad: </strong></p></div> 
                    </div>
                </td>
                <td>
                 <p class="w3-row" id="unidad"></p>
             </td>
         </tr>
         <tr>
            <td>
                <div class="w3-row">
                    <div class="w3-col l4 m6"><p class="w3-margin-0"><strong>Sector: </strong></p></div>
                </div>
            </td>
            <td>
               <p class="w3-row" id="sector"></p>
           </td>
       </tr>

       <tr>
        <td>
            <div class="w3-row">
                <div class="w3-col l4 m6"><p class="w3-margin-0"><strong>Actividad: </strong></p></div>
            </div>
        </td>
        <td>
           <p class="w3-row" id="actividad"></p>
       </td>
   </tr>
   <tr>
       <td><br></td>
   </tr>

   <tr>
    <td>
        <div class="w3-row">
            <div class="w3-col l4 m6"><p class="w3-margin-0"><strong>Descripcion: </strong></p></div>
        </div>
    </td>
    <td>
       <p class="w3-row" id="descripcion"></p>
   </td>
</tr>
<tr>
   <td><br></td>
</tr>

<tr>
    <td>
        <div class="w3-row">
            <div class="w3-col l4 m6"><p class="w3-margin-0"><strong>Imagen: </strong></p></div>
        </div>
    </td>
    <td>

       <div class="w3-col l8 m6" ></div>
       <img src="" id="imagen" width="300px" height="250px">
   </td>
</tr>
<tr>
    <td>
        <div class="w3-row" id="no">
            <div class="w3-col l8 m6"><p class="w3-margin-0"><strong> Nombre</strong></p></div> 
        </div>
    </td>
    <td>
     <p id="nombre"></p>
 </td>
</tr>


</table>
</form>

</div>




<div id="div_Poligono" class="w3-container w3-white w3-round" style="display: none;">

<form>
        <table class="table-striped table-hover table-condensed">
            <p style="background: #CBCBCB"><center><b>Listado de Campamentos</b></center></p>
            <tr>
                <td>
                    <div class="w3-row">
                        <div class="w3-col l8 m6"><p class="w3-margin-0"><strong>Unidad: </strong></p></div> 
                    </div>
                </td>
                <td>
                 <p class="w3-row" id="unidades"></p>
             </td>
         </tr>
         <tr>
            <td>
                <div class="w3-row">
                    <div class="w3-col l4 m6"><p class="w3-margin-0"><strong>Sector: </strong></p></div>
                </div>
            </td>
            <td>
               <p class="w3-row" id="sectores"></p>
           </td>
       </tr>

       <tr>
        <td>
            <div class="w3-row">
                <div class="w3-col l4 m6"><p class="w3-margin-0"><strong>Actividad: </strong></p></div>
            </div>
        </td>
        <td>
           <p class="w3-row" id="actividades"></p>
       </td>
   </tr>
   <tr>
       <td><br></td>
   </tr>

   <tr>
    <td>
        <div class="w3-row">
            <div class="w3-col l4 m6"><p class="w3-margin-0"><strong>Descripcion: </strong></p></div>
        </div>
    </td>
    <td>
       <p class="w3-row" id="descripciones"></p>
   </td>
</tr>


</table>
</form>
</div>



