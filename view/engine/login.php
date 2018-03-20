<?php
$dir = '../../';
include_once $dir.'config/include.php';

$user = new User();
if ($user->isLogin()) {
  header("Location: http://www.bdnyzg.com/view/engine/index.php"); 
  exit(0);
}

include '../lzW/login.lzW';