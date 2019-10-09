<?php

if (isset($_POST)) {
    // print '<pre>';
    // echo $_POST;
    // var_dump($_POST);
    echo json_encode($_POST);
    // echo "Принято!";
    // print '</pre>';
    // $postArray = $_POST;
    // return $postArray;
} else {
    echo 'Нет сообщений';
}
// print '<p>И еще немножко нервно</p>';
