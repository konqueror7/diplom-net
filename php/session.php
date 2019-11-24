<?php
require($_SERVER['DOCUMENT_ROOT'] . '/autoload.php');
/**
 * Автозагрузка системных констант
 */
require($_SERVER['DOCUMENT_ROOT'] . '/config/SystemConfig.php');

session_start();

$sessionkeys = array("hall_id", "film_id", "start_time");

$sessions = new Sessions();

if ($_POST['entity_method'] == 'LIST') {
    foreach ($_POST as $post_key => $post_value) {
        if (in_array($post_key, $sessionkeys)) {
            $sessionsList = $sessions->newQuery()->find($post_key, $post_value, false)->getObjs(true);

            if (count($sessionsList) > 0) {
                $sessionsListKeys = array();
                foreach ($sessionsList as $key => $value) {
                    $sessionsListKeys[$key] = $value;
                }
              // ключу 'success' присваивается значение true
              // ключу 'user' присваивается значение $findedUserKeys
                $sessionsData = ['success' => true, 'sessions' => $sessionsListKeys];
              // вывод echo возвращается в качестве положительного ответа php-скрипта бэкенда
              // на XMLHttpRequest-запрос js-скрипта фронтэнда
                echo json_encode($sessionsData);
            } else {
                $noData = ['success' => false, 'error' => 'Нет залов с такими параметрами'];

              // отрицательный ответ сервера, когда пользователь
              // не находится в массиве объектов из users.json
                echo json_encode($noData);
            }
        }
    }
}


if ($_POST['entity_method'] == 'CREATE') {
    $createsSession = new Session();
    $createsSession->addNewSession($_POST);
    $SessionData =  ['success' => true, 'message' => 'Запись о сеансе "'.
    $_POST['hall_id'] . ' ' . $_POST['film_id'] . ' ' .
    $_POST['start_time'] .'" создана!'];
    echo json_encode($SessionData);
}
