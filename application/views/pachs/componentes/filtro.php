<script src="<?php echo base_url() ?>js/listar_sectores.js"></script>
<div class="w3-container">
    <h3>Información Cartográfica</h3>
    <form>
        <div class="w3-row">
            <div class="w3-col l4 s4">
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
    <p style="background: #CBCBCB"><center><b>Listado de Actividades</b></center></p>
  <form>
    <table class="table-striped table-hover table-condensed">
       
        <tr>
            <td>
                <div class="w3-row">
                    <div class="w3-col l8 m6"><p class="w3-margin-0"><strong>Unidad: </strong></p></div> 
                </div>
            </td>
            <td>
               <div class="w3-col l4 m6" id="unidad"></div>
           </td>
       </tr>
       <tr>
        <td>
            <div class="w3-row">
                <div class="w3-col l4 m6"><p class="w3-margin-0"><strong>Sector: </strong></p></div>
            </div>
        </td>
        <td>
            <div class="w3-col l8 m6" id="sector"></div>
        </td>
    </tr>
    
    <tr>
        <td>
            <div class="w3-row">
                <div class="w3-col l4 m6"><p class="w3-margin-0"><strong>Actividad: </strong></p></div>
            </div>
        </td>
        <td>
            <div class="w3-col l8 m6" id="actividad"></div>
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
            <div class="w3-col l8 m6" id="descripcion"></div>
        </td>
    </tr>
    <tr>
        <td></td>
    </tr>
    <tr>
        <td></td>
    </tr>
       <tr>
        <td></td>
    </tr>
    <tr>
        <td></td>
    </tr>
       <tr>
        <td></td>
    </tr>
    <tr>
        <td></td>
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

    <!--<tr>
        <td>
            <div class="w3-row">
                <div class="w3-col l4 m6"><p class="w3-margin-0"><strong>Actividades </strong></p>
                </div>
            </div>
        </td>
        <td>
            <a href="#" id="<?php echo $fila->uni_id ?>" class="create-user" style="text-decoration: none; color: #fff; text-decoration: overline; cursor: pointer;"><img src="<?=base_url()?>/images/iconos/leer.png" height="50px" width="150px"></a>
        </td>
    </tr>
-->
</table>
</form>



<!--

<script type="text/javascript">
    $( function() {
        $("#dialog-form").hide();
        function abrir(){
            $("#dialog-form").show(); 
            $( "#dialog-form" ).dialog({
                opacity: 1,
                height: 400,
                width: 900,
                modal: true,     
            });
        }

        $(".create-user").on('click',function(e){     
            e.preventDefault()
            var uni_id = $(this).attr('id');
            console.log(uni_id)
            $.ajax({
                url:"<?php echo base_url() ?>Pachs/get_unidades_pachs",
                type:"POST",
                data:{'uni_id' : uni_id},
                success:function(data){
                    $('#dialog-form').html(data);
                },
                error:function(){
                    alert('No contiene información');
                }
            });
            abrir("open"); 
        });
    });
</script>

<div id="dialog-form" title="Lista de actividades del PACHS"></div>
-->
</div>
