<?php
if (isset($_FILES['image'])) {
    echo '<pre>';
    var_dump($_FILES['image']);
    echo '</pre>';
    if (is_uploaded_file($_FILES['image']['tmp_name'])) {
        $pathParts = pathinfo($_FILES['image']['name']);
        echo '<pre>';
        // var_dump(pathinfo($namebase));
        var_dump(pathinfo($_FILES['image']['name']));
        echo '</pre>';

        move_uploaded_file($_FILES['image']['tmp_name'], $_SERVER['DOCUMENT_ROOT'] . '/admin/i/'.$_POST['image_name']);

        // move_uploaded_file($_FILES['image']['tmp_name'], $_SERVER['DOCUMENT_ROOT'] . '/admin/i/'.$pathParts['basename']);
    }
} else {
    echo 'No image in $_FILES!';
}

if (isset($_POST['image_name'])) {
    var_dump($_POST['image_name']);
} else {
    echo '<br/>';
    echo 'No image in $_POST!';
}
