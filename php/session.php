<?php
require($_SERVER['DOCUMENT_ROOT'] . '/autoload.php');
/**
 * Автозагрузка системных констант
 */
require($_SERVER['DOCUMENT_ROOT'] . '/config/SystemConfig.php');

session_start();

$sessionkeys = array("hall_id", "film_id", "start_time");

$sessions = new Sessions();

if ($_POST['entity_method'] == 'CREATE') {
    // echo '<pre>';
    // var_dump($_POST);
    // echo '</pre>';
    $createsSession = new Session();
    $createsSession->addNewSession($_POST);
    $SessionData =  ['success' => true, 'message' => 'Запись о сеансе "'.
    $_POST['hall_id'] . ' ' . $_POST['film_id'] . ' ' .
    $_POST['start_time'] .'" создана!'];
    echo json_encode($SessionData);
}
