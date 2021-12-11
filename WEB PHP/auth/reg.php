<?php
include '../config.php';
include "../reply.php";

$first_name = get_s('first_name');
$last_name = get_s('last_name');
$education_level = get_s('education_level', intval);
$email = get_s('email');
$password = get_s('password', md5);

$table_users = $cfg->get('database.tables.users');
if (count($db->exec("SELECT 1 FROM `$table_users` WHERE `email` LIKE '$email' LIMIT 1")) == 1){
    echo_json(['status' => 'error', 'error' => 'This user already exists, use another email']);
}

$t = $db->exec("INSERT INTO `$table_users`
    (
        `first_name`,
        `last_name`,
        `education_level`,
        `email`,
        `password`,
        `events`,
        `achievements`
    )
    VALUES
    (
        '$first_name',
        '$last_name',
        '$education_level',
        '$email',
        '$password',
        '[]',
        '[]'
    )
");
if ($t){
    echo_json(['status' => 'success']);
}
else {
    echo_json(['status' => 'error', 'error' => 'SQL error.']);
}
