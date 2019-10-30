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

$hallkeys = array("name", "rows", "places", "seats_arrow");
// print '<pre>';
// var_dump($hallkeys);
// print '</pre>';

if ($_POST['entity_method'] == 'LIST') {
    $listkeys = array_keys($_POST);
    // print '<pre>';
    // var_dump($listkeys);
    // print '</pre>';
    foreach ($_POST as $post_key => $post_value) {
        if (in_array($post_key, $hallkeys)) {
            if (isset($_POST[$post_key]) && $_POST[$post_key] = '.+') {
                // print '<pre>';
                // var_dump($_POST);
                // print '</pre>';
                $hallsList = $halls->newQuery()->find($post_key, $_POST[$post_key], true)->getObjs(false);
            } else {
            // } elseif (isset($_POST[$post_key]) && $_POST[$post_key] != '.+') {
                $hallsList = $halls->newQuery()->find($post_key, $_POST[$post_key])->getObjs(false);
              // code...
            }
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

if ($_POST['entity_method'] == 'GET') {
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
        // print '<pre>';
        // var_dump($hallget[key($hallget)]);
        // print '</pre>';
    } else {
        $noData = ['success' => false, 'error' => 'Нет залов с таким ID'];
    }
}


// $hallsList = $halls->newQuery()->getObjs(false);
// $hallsList = $halls->newQuery()->find('hall_name', '.+', true)->getObjs(false);

// print '<pre>';
// var_dump($hallsList);
// print '</pre>';
