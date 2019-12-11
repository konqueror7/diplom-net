<?php

/**
 * Ответ сервера при наличии данных в $_POST
 */
// if (isset($_POST)) {
//     // echo 'Have reply!';
//     // echo json_encode($arrayName = array('title' => '1222'));
//     echo json_encode($_POST);
// }

/**
 * Ответ сервера при наличии данных в 'php://input'
 */
$arr = file_get_contents('php://input');
echo json_encode($arr);
