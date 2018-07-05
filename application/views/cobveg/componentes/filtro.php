<div class="w3-container">
    <h3>Información Cartográfica</h3>
    <form>
        <div class="w3-row">
        <div class="w3-col l4 s4">
            <label class="w3-label w3-text-black"><b>Unidad:</b></label>
        </div>
        <div class="w3-col l8 s8">
            <label class="w3-label w3-text-black"><?= $unidad->uni_nombre ?></label>
        </div>
    </div>
    <div class="w3-row">
        <div class="w3-col l4 s4">
            <label class="w3-label w3-text-black"><b>Sector:</b></label>
        </div>
        
        <div class="w3-col l8 s8">
            <select class="w3-select w3-border" name="sectores" id="sectores">
                <option value="" disabled selected>Seleccione</option>
            <?php
            foreach ($sectores as $fila) {
                ?>
                <option value="<?= $fila->sec_id ?>" ><?= $fila->sec_nombre ?></option>
                <?php
            }
            ?>
            </select>
            
        </div>
    </div>
    </form>
    
</div>