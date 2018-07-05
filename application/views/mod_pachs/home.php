<html>
    <head>
        <?php header("Access-Control-Allow-Origin: *"); ?>
        <meta http-equiv = "content-type" content = "text/html; charset=utf-8" />

        <link href = "<?php echo base_url() ?>css/jquery-ui.css" rel = "stylesheet" />

        <link rel = "stylesheet" href = "http://www.w3schools.com/lib/w3.css">
        <!--<link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css">-->
        <link href = "<?php echo base_url() ?>css/style.css" rel = "stylesheet" />

        
        <script src = "<?php echo base_url() ?>js/jquery.js"></script>
        <script src="<?php echo base_url() ?>js/jquery-ui.js"></script>
        <script src="<?php echo base_url() ?>js/js_mapa.js"></script>
        <script src="<?php echo base_url() ?>js/js_wms.js"></script>
        <script src='https://maps.googleapis.com/maps/api/js?key=AIzaSyB5dESKyIaf42zTejjg4ClShw9rXq-_trM'></script>

    </head>
    <body>
        <!--Mapa Base-->
        <!-- Contenido Principal-->
            <div class="w3-row">
                <div class="w3-col l3 m4">
                   <?= $filtro ?>
                </div>
                <div class="w3-col l9 m8">
                 <?php echo $mapa; ?>
                </div>
            </div>
        







    </body>
</html>