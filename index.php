<?php

if (isset($_SESSION['role']) && $_SESSION['role'] == 'admin') {
    header('Location: http://' . $_SERVER['HTTP_HOST'] . '/admin/index.html');
} else {
    header('Location: http://' . $_SERVER['HTTP_HOST'] . '/client/index.html');
}
