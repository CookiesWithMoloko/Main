<?php
include "../config.php";
include "../reply.php";

$token = $get_s('token');
$table_users = $cfg->get('database.tables.users');

$t = $db->exec("SELECT * FROM `$table_users` WHERE `token`='$token' LIMIT 1");

if (count($t) == 0){
    echo_json(
        [
            'status' => 'error',
            'error' => 'Invalid token'
        ]
    );
}
$t = $t[0];
echo_json(
    [
        'status' => 'success',
        'data' => [
            'id' => $t[0],
            'first_name' => $t[1],
            'last_name' => $t[2],
            'education_level' => $t[3],
            'email' => $t[4],
            'rate' => $t[5],
            'achievements' => $t[10],
            'events' => $t[11],
            'recomendation' => $t[12]
        ] 
    ]
);
