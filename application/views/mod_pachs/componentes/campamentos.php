     <p style="background: #CBCBCB"><center><b>Listado de Campamentos</b></center></p>
  <form>

    <table class="table-striped table-hover table-condensed">
        <tr>
            <td>
                <div class="w3-row">
                    <div class="w3-col l8 m6"><p class="w3-margin-0"><strong>Unidad: </strong></p></div> 
                </div>
            </td>
            <td>
               <p><?= $consulta->uni_nombre ?></p>
           </td>
       </tr>
       <tr>
        <td>
            <div class="w3-row">
                <div class="w3-col l4 m6"><p class="w3-margin-0"><strong>Sector: </strong></p></div>
            </div>
        </td>
        <td>
            <p><?= $consulta->secp_sector ?></p>
        </td>
    </tr>
    
    <tr>
        <td>
            <div class="w3-row">
                <div class="w3-col l4 m6"><p class="w3-margin-0"><strong>Actividad: </strong></p></div>
            </div>
        </td>
        <td>
            <p><?= $consulta->secp_actividad ?></p>
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
            <p><?= $consulta->secp_descripcion ?></p>
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
            <img src="<?= base_url('/images/pachs') . '/' . $consulta->secp_imagen  ?>" id="imagen" width="250px" height="200px">
        </td>
    </tr>
    
</table>
</form>