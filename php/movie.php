<?php
require($_SERVER['DOCUMENT_ROOT'] . '/autoload.php');
/**
 * Автозагрузка системных констант
 */
require($_SERVER['DOCUMENT_ROOT'] . '/config/SystemConfig.php');

session_start();

$moviekeys = array("name", "content", "image", "duration", "producer");

$movies = new Movies();

if ($_POST['entity_method'] == 'LIST') {
    foreach ($_POST as $post_key => $post_value) {
        if (in_array($post_key, $moviekeys)) {
            $moviesList = $movies->newQuery()->find($post_key, $post_value, true)->getObjs(true);

            if (count($moviesList) > 0) {
                $moviesListKeys = array();
                foreach ($moviesList as $key => $value) {
                    $moviesListKeys[$key] = $value;
                }
              // ключу 'success' присваивается значение true
              // ключу 'user' присваивается значение $findedUserKeys
                $moviesData = ['success' => true, 'movies' => $moviesListKeys];
              // вывод echo возвращается в качестве положительного ответа php-скрипта бэкенда
              // на XMLHttpRequest-запрос js-скрипта фронтэнда
                echo json_encode($moviesData);
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
    $createsMovie = new Movie();
    $createsMovie->addNewMovie($_POST);
    $MovieData =  ['success' => true, 'message' => 'Запись о фильме "'. $_POST['name'] .'" создана!'];
    echo json_encode($MovieData);
}

if ($_POST['entity_method'] == 'GETID') {
    if (isset($_POST['get_id'])) {
        $movieGet = $movies->newQuery()->byguid($_POST['get_id'])->getObjs(false);
        if (count($movieGet) > 0) {
            $movieGetKeys = array();
            foreach ($movieGet[key($movieGet)] as $key => $value) {
                $movieGetKeys[$key] = $value;
            }
        }
        $movieData = ['success' => true, 'movie' => $movieGetKeys];
        echo json_encode($movieData);
        // print '<pre>';
        // var_dump($hallget[key($hallget)]);
        // print '</pre>';
    } else {
        $noData = ['success' => false, 'error' => 'Нет фильма с таким ID'];
        echo json_encode($noData);
    }
}
