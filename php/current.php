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
// session_destroy();


$users = new Users();


$noUserData = ['success' => false, 'error' => 'Необходима авторизация'];

// $_GET['name'] = '';
// // $allUsers = $users->newQuery()->getObjs(false);
// $usersList = $users->newQuery()->find('name', '.+', true)->getObjs(false);
// print '<pre>';
// var_dump($usersList);
// print '</pre>';

if (isset($_SESSION['name'])) {
    $findedUser = $users->newQuery()->find('name', $_SESSION['name'])->getObjs(false);
    // Если массив найденных объектов не пустой, то все ключи (кроме 'pwd')
    // и их значения копируются в массив $_SESSION
    // и в объект $findedUserKeys
    if (count($findedUser) > 0) {
        $findedUserKeys = array();
        foreach ($findedUser[key($findedUser)] as $key => $value) {
            if ($key != 'pwd') {
              // code...
                $findedUserKeys[$key] = $value;
            }
        }
        // ключу 'success' присваивается значение true
        // ключу 'user' присваивается значение $findedUserKeys
        $userData = ['success' => true, 'user' => $findedUserKeys];
        // вывод echo возвращается в качестве положительного ответа php-скрипта бэкенда
        // на XMLHttpRequest-запрос js-скрипта фронтэнда
        echo json_encode($userData);
    } else {
        // отрицательный ответ сервера, когда пользователь
        // не находится в массиве объектов из users.json
        echo json_encode($noUserData);
    }
}
