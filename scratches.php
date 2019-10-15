<?php
//login__form -> data -> user.login(data) -> createRequest

$userData = ['success' => true,
            'user' => [
                'email' => 'interpreter@interpreter.com',
                'password' => 'user',
                'name' => 'Пользователь',
                'role' => 'user'
            ],
];

if (isset($_GET['mail']) && isset($_GET['pwd'])) {
    echo json_encode($userData);
}
