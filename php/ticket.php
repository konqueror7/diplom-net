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
include($_SERVER['DOCUMENT_ROOT'] . Config::PHPCODE_DIRECTORY . Config::PHPQRCODE_DIRECTORY . '/' . 'qrlib.php');

session_start();

$ticketkeys = array("session_id", "places");

$tickets = new Tickets();

/**
 * Извлечение списка объектов по значению одного из свойств,
 * указанных в массиве $ticketkeys
 */
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
              // ключу 'tickets' присваивается значение $ticketsListKeys
                $ticketsData = ['success' => true, 'tickets' => $ticketsListKeys];
              // вывод echo возвращается в качестве положительного ответа php-скрипта бэкенда
              // на fetch-запрос js-скрипта фронтэнда
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

/**
 * Извлечение объекта билета по его ID
 */
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
    } else {
        $noData = ['success' => false, 'error' => 'Нет билета с таким ID'];
        echo json_encode($noData);
    }
}

/**
 * Создание объекта нового билета и ответ
 * об успешном выполнении запроса
 */
if ($_POST['entity_method'] == 'CREATE') {
    $createsTicket = new Ticket();
    $ticket_guid = $createsTicket->addNewTicket($_POST);
    $ticketData =  ['success' => true, 'ticket' => $ticket_guid];
    echo json_encode($ticketData);
}

/**
 * Добавление и изменение информации
 * в объекте билета по его ID
 */
if ($_POST['entity_method'] == 'UPDATEID') {
    $ticketGet = $tickets->newQuery()->byguid($_POST['update_id'])->getObjs(false);
    if (count($ticketGet) > 0) {
        $tickets->updateTicketFromPost($_POST);
        $ticketData = [
            'success' => true,
            'message' => 'Данные о билете с ID = "'.$_POST['update_id'].' '.'" обновлены!'
        ];
        echo json_encode($ticketData);
    } else {
        $noData = ['success' => false, 'error' => 'Нет записи о билете с таким ID'];
        echo json_encode($noData);
    }
}
