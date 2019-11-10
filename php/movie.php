<?php
require($_SERVER['DOCUMENT_ROOT'] . '/autoload.php');
/**
 * Автозагрузка системных констант
 */
require($_SERVER['DOCUMENT_ROOT'] . '/config/SystemConfig.php');

session_start();

$moviekeys = array("name", "content", "image", "duration", "producer");

$movies = new Movies();

if ($_POST['entity_method'] == 'CREATE') {
    $createsMovie = new Movie();
    $createsMovie->addNewMovie($_POST);
    $MovieData =  ['success' => true, 'message' => 'Запись о фильме "'. $_POST['name'] .'" создана!'];
    echo json_encode($MovieData);
}
