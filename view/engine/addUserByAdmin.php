<?php
$dir = '../../';
include_once $dir.'config/include.php';


$user = new User();

if (!$user->isLogin() || $user->getCurrentUserMsg('role') != ADMIN) {
  $tipType = 'error';
  $tipMsg = '权限错误';
  include '../lzW/tipsPage.lzW';
  exit(0);
}

$activeBar = array(4, 2);
$role = $user->getCurrentUserMsg('role');

include '../lzW/addUserByAdmin.lzW';