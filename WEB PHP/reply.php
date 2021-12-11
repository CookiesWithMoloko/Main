<?php
function echo_json($a){
    header('Content-Type: application/json');
    die(json_encode($a));
}
function get($a){
    isset($_REQUEST[$a]) || echo_json(['status' => 'error', 'error' => "Invalid arguments, `$a` dont exists."]);
    return $_REQUEST[$a];
}
function get_s($a, $f = false){
    if (!$f){
        global $db;
        $f = $db->fix;
    }
    return $f(get($a));
}