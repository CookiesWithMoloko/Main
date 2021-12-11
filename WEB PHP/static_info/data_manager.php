<?php
if (defined("JSON_EDITOR")) return;
define("JSON_EDITOR", true);
class JsonEditor{
    public $data;
    function __construct($path){
        if (!file_exists($path)) die('Invalid path');
        $this->data = json_decode(file_get_contents($path), true);
    }
    function get($path, $default = false){
        if (isset($this->data[$path])){
            return $this->data[$path];
        }
        return $default;
    }
}
$jd = new JsonEditor(__DIR__."/data.json");