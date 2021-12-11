<?php
include "../reply.php";
include "data_manager.php";
if (!isset($_REQUEST['path'])) die(echo_json(['status' => 'error', 'error' => 'invalid arguments, missing `path`']));
$a = $jd->get($_REQUEST['path']);
if (!$a) die(echo_json(['status' => 'error', 'error' => 'invalid arguments, path dont exists']));
if (isset($_REQUEST['hash'])){
    echo_json(md5(json_encode($a)));
} else{
    echo_jsond($a);
}

