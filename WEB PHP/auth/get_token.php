<?php
include "../config.php";
include "../reply.php";

$email = get_s('email');
$password = get_s('email', md5);

$table_users = $cfg->get('database.tables.users');
$r = $db->exec("SELECT `id`, `password` FROM `$table_users` WHERE `email`='$email'");
if (count($r) == 0){
    echo_json(
        [
            'status' => 'error',
            'error' => 'Invalid email'
        ]
    );
}
if ($r[0][1] != $password) echo_json(
    [
        'status' => 'error',
        'error' => 'Invalid password'
    ]
);

do {
    $token = md5(rand(1, 1000)) . md5(rand(1000, 2000));
} while (count($db->exec("SELECT 1 FROM `$table_users` WHERE `token`='$token'")) > 0);
$id = $r[0][0];
$db->exec("UPDATE `$table_users` SET `token`='$token' WHERE `id`='$id'");

echo_json(
    [
        'status' => 'success',
        'token' => $token
    ]
);