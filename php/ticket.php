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

if ($_POST['entity_method'] == 'CREATE') {
    $createsTicket = new Ticket();
    $createsTicket->addNewTicket($_POST);
    // $createsHall = new Hall();
    // $createsHall->addNewHall($_POST['name']);
    $ticketData =  ['success' => true, 'message' => 'Запись о билете создана!'];
    // echo json_encode($hallData);
    echo json_encode($ticketData);
}
