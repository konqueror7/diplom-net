<?php

/**
 * Автозагрузка класссов
 */
require($_SERVER['DOCUMENT_ROOT'] . '/autoload.php');
/**
 * Автозагрузка системных констант
 */
require($_SERVER['DOCUMENT_ROOT'] . '/config/SystemConfig.php');

/**
* PHP QRCode library
* @var [type]
*/
include($_SERVER['DOCUMENT_ROOT'] . Config::PHPQRCODE_DIRECTORY . '/' . 'qrlib.php');

session_start();

$ticketkeys = array("session_id", "places");

$tickets = new Tickets();

if ($_POST['entity_method'] == 'LIST') {
    foreach ($_POST as $post_key => $post_value) {
        if (in_array($post_key, $ticketkeys)) {
            $ticketsList = $tickets->newQuery()->find($post_key, $post_value, true)->getObjs(true);

            if (count($ticketsList) > 0) {
                $ticketsListKeys = array();
                foreach ($ticketsList as $key => $value) {
                    $ticketsListKeys[$key] = $value;
                }
              // ключу 'success' присваивается значение true
              // ключу 'user' присваивается значение $findedUserKeys
                $ticketsData = ['success' => true, 'tickets' => $ticketsListKeys];
              // вывод echo возвращается в качестве положительного ответа php-скрипта бэкенда
              // на XMLHttpRequest-запрос js-скрипта фронтэнда
                echo json_encode($ticketsData);
            } else {
                $noData = ['success' => false, 'error' => 'Нет билета с таким параметром'];

              // отрицательный ответ сервера, когда пользователь
              // не находится в массиве объектов из users.json
                echo json_encode($noData);
            }
        }
    }
}

if ($_POST['entity_method'] == 'GETID') {
    if (isset($_POST['get_id'])) {
        $ticketGet = $tickets->newQuery()->byguid($_POST['get_id'])->getObjs(false);
        if (count($ticketGet) > 0) {
            $ticketGetKeys = array();
            foreach ($ticketGet[key($ticketGet)] as $key => $value) {
                $ticketGetKeys[$key] = $value;
            }
        }
        $ticketData = ['success' => true, 'ticket' => $ticketGetKeys];
        echo json_encode($ticketData);
        // print '<pre>';
        // var_dump($ticketget[key($ticketget)]);
        // print '</pre>';
    } else {
        $noData = ['success' => false, 'error' => 'Нет билета с таким ID'];
        echo json_encode($noData);
    }
}

if ($_POST['entity_method'] == 'CREATE') {
    $createsTicket = new Ticket();
    // $createsTicket->addNewTicket($_POST);
    $ticket_guid = $createsTicket->addNewTicket($_POST);
    // $createsHall = new Hall();
    // $createsHall->addNewHall($_POST['name']);
    // $ticketData =  ['success' => true, 'message' => 'Запись о билете создана!'];
    $ticketData =  ['success' => true, 'ticket' => $ticket_guid];
    // $ticketData =  ['success' => true, 'ticket' => $createsTicket];
    // $ticketData =  ['success' => true, 'ticket_guid' => $ticket_guid];
    // echo json_encode($hallData);
    echo json_encode($ticketData);
}

if ($_POST['entity_method'] == 'UPDATEID') {
    $ticketGet = $tickets->newQuery()->byguid($_POST['update_id'])->getObjs(false);
    if (count($ticketGet) > 0) {
        $tickets->updateTicketFromPost($_POST);
        // $ticketqrpng = $tickets->updateTicketFromPost($_POST);
        $ticketData = ['success' => true, 'message' => 'Данные о билете с ID = "'.$_POST['update_id'].' '.'" обновлены!'];
        // $ticketData = ['success' => true, 'message' => 'Данные о билете с ID = "'.$_POST['update_id'].' '.'" обновлены!', 'qrpng' => $ticketqrpng];
        echo json_encode($ticketData);
    } else {
        $noData = ['success' => false, 'error' => 'Нет записи о билете с таким ID'];
        echo json_encode($noData);
    }
    // echo json_encode($_POST);
}

//
// // outputs image directly into browser, as PNG stream
// QRcode::png('O-la-la!', $_SERVER['DOCUMENT_ROOT'] . Config::QRPNG_DIRECTORY . '/' . 'filename.png');
