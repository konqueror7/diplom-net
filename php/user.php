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
$noUserData = ['success' => false, 'user' => null, 'session_array' => null];


/**
 * Для авторизации пользователя
 * методом User.login(), вызванного
 * из js-скрипта, производится
 * проверка наличия значении переменных
 * 'mail' и 'pwd' из массива $_POST
 * в файле users.json
 */
if ($_POST['user_method'] == 'LOGIN') {
    if (isset($_POST['mail']) && isset($_POST['pwd'])) {
      // Если 'mail' и 'pwd' установлены в массиве объектов $users ищем объекты имеющий такие же значения
        $findedUser = $users->newQuery()->find('mail', $_POST['mail'])->find('pwd', $_POST['pwd'])->getObjs(false);
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
            $userData = ['success' => true, 'user' => $_SESSION['name']];
            // вывод echo возвращается в качестве положительного ответа php-скрипта бэкенда
            // на XMLHttpRequest-запрос js-скрипта фронтэнда
            echo json_encode($userData);
        } else {
            // отрицательный ответ сервера, когда пользователь
            // не находится в массиве объектов из users.json
            echo json_encode($noUserData);
        }
    }
}

/**
 * Проверка наличия переменной $_SESSION['name']
 * вывод ее значения в виде json-строки
 * для передачи в метод User.fetch(),
 * вызванного js-скриптом
 * @var [type]
 */
if ($_POST['user_method'] == 'FETCH') {
    if (isset($_SESSION['name'])) {
        $userData = ['success' => true, 'user' => $_SESSION['name']];
        echo json_encode($userData);
    } else {
        $noUserData = ['success' => false, 'user' => null];
        echo json_encode($noUserData);
    }
}

/**
 * Для отмены авторизации пользователя
 * уничтожаются все переменные в $_SESSION
 */
if ($_POST['user_method'] == 'LOGOUT') {
    session_unset();
    $userData = ['success' => true, 'user' => null];
    echo json_encode($userData);
}
