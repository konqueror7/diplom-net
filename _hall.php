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
// $hallsList = $halls->newQuery()->byguid('o1')->getObjs();
// $hallsList = $halls->newQuery()->getObjs(false)->byguid('o2');
// print '<pre>';
// var_dump($hallsList);
// print '</pre>';

$noData = ['success' => false, 'error' => 'Нет зала с таким id'];

if ($_POST['entity_method'] == 'GET') {
  // code...
    if (isset($_POST['get_id'])) {
        $hallget = $halls->newQuery()->byguid($_POST['get_id'])->getObjs(false);
        print '<pre>';
        var_dump($hallget);
        print '</pre>';

        if (count($hallget) > 0) {
            $hallgetKeys = array();
            foreach ($hallgetKeys as $key => $value) {
                $hallgetKeys[$key] = $value;
            }
          // ключу 'success' присваивается значение true
          // ключу 'user' присваивается значение $findedUserKeys
            $hallsData = ['success' => true, 'hall' => $hallgetKeys];
          // вывод echo возвращается в качестве положительного ответа php-скрипта бэкенда
          // на XMLHttpRequest-запрос js-скрипта фронтэнда
            echo json_encode($hallsData);
        } else {
          // отрицательный ответ сервера, когда пользователь
          // не находится в массиве объектов из users.json
            echo json_encode($noData);
        }
    }
}


// $hallsList = $halls->newQuery()->getObjs(false);
// $hallsList = $halls->newQuery()->find('hall_name', '.+', true)->getObjs(false);

// print '<pre>';
// var_dump($hallsList);
// print '</pre>';
