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

/**
 * Создание переменной $users -
 * @var Users - объект класса Users в который загружается массив объектов из файла users.json
 */
$users = new Users();

/**
 * Создание массива, который будет использоваться как отрицательный ответ PHP-сервера
 * @var array - ассоциативный массив из двух ключей
 *
 */
$noUserData = ['success' => false, 'user' => null];


/**
 * Условие проверки наличия ключей 'mail' и 'pwd' в массиве $_GET
 * @var [type]
 */
if (isset($_GET['mail']) && isset($_GET['pwd'])) {
    // Если 'mail' и 'pwd' установлены в массиве объектов $users ищем объекты имеющий такие же значения
    $findedUser = $users->newQuery()->find('mail', $_GET['mail'])->find('pwd', $_GET['pwd'])->getObjs(false);
    // Если массив найденных объектов не пустой, то все ключи (кроме 'pwd')
    // и их значения копируются в массив $_SESSION
    // и в объект $findedUserKeys
    if (count($findedUser) > 0) {
        $findedUserKeys = array();
        foreach ($findedUser[key($findedUser)] as $key => $value) {
            if ($key != 'pwd') {
              // code...
                $findedUserKeys[$key] = $value;
                $_SESSION[$key] = $value;
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
