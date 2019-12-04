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
                $noData = ['success' => false, 'error' => 'Нет сеансов с таким параметром'];

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

if ($_POST['entity_method'] == 'REMOVEID') {
    $sessionGet = $sessions->newQuery()->byguid($_POST['remove_id'])->getObjs(false);
    if (count($sessionGet) > 0) {
        $removesSession = new Session($_POST['remove_id']);
        $removesSession->delete();
        $sessionData = ['success' => true, 'message' => 'Данные о сеансе с ID = "'.$_POST['remove_id'].' '.'" удалены!'];
        echo json_encode($sessionData);
    } else {
        $noData = ['success' => false, 'error' => 'Нет записи о сеансе с таким ID = '.$_POST['remove_id'].'. Удалять нечего!'];
        echo json_encode($noData);
    }
}

if ($_POST['entity_method'] == 'GETID') {
    if (isset($_POST['get_id'])) {
        $sessionGet = $sessions->newQuery()->byguid($_POST['get_id'])->getObjs(false);
        if (count($sessionGet) > 0) {
            $sessionGetKeys = array();
            foreach ($sessionGet[key($sessionGet)] as $key => $value) {
                $sessionGetKeys[$key] = $value;
            }
        }
        $sessionData = ['success' => true, 'session' => $sessionGetKeys];
        echo json_encode($sessionData);
        // print '<pre>';
        // var_dump($hallget[key($hallget)]);
        // print '</pre>';
    } else {
        $noData = ['success' => false, 'error' => 'Нет сеанса с таким ID'];
        echo json_encode($noData);
    }
}
