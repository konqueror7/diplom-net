<?php

/**
 * Автозагрузка класссов
 */
require($_SERVER['DOCUMENT_ROOT'] . '/autoload.php');
/**
 * Автозагрузка системных констант
 */
require($_SERVER['DOCUMENT_ROOT'] . '/config/SystemConfig.php');

session_start();

if ($_POST['entity_method'] == 'CREATE') {
    // $createsTicket = new Ticket();
    // $createsHall = new Hall();
    // $createsHall->addNewHall($_POST['name']);
    // $hallData =  ['success' => true, 'message' => 'Запись о зале создана!'];
    // echo json_encode($hallData);
    echo json_encode($_POST);
}
