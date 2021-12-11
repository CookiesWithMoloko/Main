<?php

if (defined("CFG_INIT")) return;
define("CFG_INIT", true);
error_reporting(E_ALL);
ini_set('display_errors', '1');
class Config{
    public $a;
    function __construct($path){
        try{
            $this->a = json_decode(file_get_contents($path), true);
        }
        catch(Exception $e){
            echo $e->getMessage();
        }
        
    }
    function get($path, $default=false){
        $t = $this->a;
        $path = explode(".", $path);
        for ($i = 0; $i < count($path); $i++){
            if (isset($t[$path[$i]])){
                $t = $t[$path[$i]];
            }
            else {
                $t = $default;
                break;
            }
        }
        return $t;
    }
}
class DataBase{
    public $conn;
    function __construct($conn){
        $this->conn = $conn;
        if ($this->conn->connect_error) die("SQL connection error.");
    }
    function fix($value){
        return $conn->real_escape_string($value);
    }
    function exec($query, $log=false){
        print_r($query.'<br>');
        $r = $this->conn->query($query);
        if (!$r) return false;
        if (gettype($r) == gettype(true)) return true;
        $r = $r->fetch_all();
        return $r;
    }
}
$cfg = new Config(__DIR__."/config.json");
$db = new DataBase(
    new mysqli(
        $cfg->get("database.auth.host"),
        $cfg->get("database.auth.user"),
        $cfg->get("database.auth.password"),
        $cfg->get("database.auth.database")
    )
);
function genUrl($url, $params){
    global $cfg;
    $url = ($url . "?" . urldecode(http_build_query($params)));
    $url = str_replace("%domain%", $cfg->get("settings.domain"), $url);
    return $url;
}