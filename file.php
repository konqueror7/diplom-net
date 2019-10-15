<?php

// require('autoload.php');
// require('config/SystemConfig.php');

// echo '<pre>';
// var_dump($_SERVER);
// echo '</pre>';


if (isset($_POST)) {
    // print '<pre>';
    // echo $_POST;
    // var_dump($_POST);
    echo json_encode($_SERVER);
    // echo json_encode($_POST);
    // echo "Принято!";
    // print '</pre>';
    // $postArray = $_POST;
    // return $postArray;
}
