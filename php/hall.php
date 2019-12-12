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

$halls = new Halls();

$hallkeys = array("name", "rows", "places", "vip", "dis", "vip_price", "std_price");

if ($_POST['entity_method'] == 'LIST') {
    foreach ($_POST as $post_key => $post_value) {
        if (in_array($post_key, $hallkeys)) {
            // print($post_key);
            $hallsList = $halls->newQuery()->find($post_key, $post_value, true)->getObjs(true);
            if (count($hallsList) > 0) {
                $hallsListKeys = array();
                foreach ($hallsList as $key => $value) {
                    $hallsListKeys[$key] = $value;
                }
              // ключу 'success' присваивается значение true
              // ключу 'user' присваивается значение $findedUserKeys
                $hallsData = ['success' => true, 'halls' => $hallsListKeys];
              // вывод echo возвращается в качестве положительного ответа php-скрипта бэкенда
              // на XMLHttpRequest-запрос js-скрипта фронтэнда
                echo json_encode($hallsData);
            } else {
                $noData = ['success' => false, 'error' => 'Нет залов с такими параметрами'];

              // отрицательный ответ сервера, когда пользователь
              // не находится в массиве объектов из users.json
                echo json_encode($noData);
            }
        }
    }
}

if ($_POST['entity_method'] == 'GETID') {
    if (isset($_POST['get_id'])) {
        $hallGet = $halls->newQuery()->byguid($_POST['get_id'])->getObjs(false);
        if (count($hallGet) > 0) {
            $hallGetKeys = array();
            foreach ($hallGet[key($hallGet)] as $key => $value) {
                $hallGetKeys[$key] = $value;
            }
        }
        $hallData = ['success' => true, 'hall' => $hallGetKeys];
        echo json_encode($hallData);
    } else {
        $noData = ['success' => false, 'error' => 'Нет залов с таким ID'];
        echo json_encode($noData);
    }
}

if ($_POST['entity_method'] == 'CREATE') {
    $createsHall = new Hall();
    $createsHall->addNewHall($_POST['name']);
    $hallData =  ['success' => true, 'message' => 'Запись о зале создана!'];
    echo json_encode($hallData);
}

if ($_POST['entity_method'] == 'UPDATEID') {
    $hallGet = $halls->newQuery()->byguid($_POST['update_id'])->getObjs(false);
    if (count($hallGet) > 0) {
        $halls->updateHallFromPost($_POST);
        $hallData = ['success' => true, 'message' => 'Данные о зале с ID = "'.$_POST['update_id'].' '.'" обновлены!'];
        echo json_encode($hallData);
    } else {
        $noData = ['success' => false, 'error' => 'Нет записи о зале с таким ID'];
        echo json_encode($noData);
    }
}

if ($_POST['entity_method'] == 'REMOVEID') {
    $hallGet = $halls->newQuery()->byguid($_POST['remove_id'])->getObjs(false);
    if (count($hallGet) > 0) {
        $removesHall = new Hall($_POST['remove_id']);
        $removesHall->delete();
        $hallData = ['success' => true, 'message' => 'Данные о зале с ID = "'.$_POST['remove_id'].' '.'" удалены!'];
        echo json_encode($hallData);
    } else {
        $noData = [
          'success' => false,
          'error' => 'Нет записи о зале с таким ID = '.$_POST['remove_id'].'. Удалять нечего!'
        ];
        echo json_encode($noData);
    }
}
