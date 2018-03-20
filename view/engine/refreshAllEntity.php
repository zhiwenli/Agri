<?php
//主动刷新所有Entity数据
$dir = '../../';
include_once $dir.'config/include.php';

FP::logingConfirmAndGuidance();

$user = new User();
$role = $user->getCurrentUserMsg('role');

if ($role != ADMIN) {
  $tipType = 'error';
  $tipMsg = '您无权访问请求的页面！';
  include '../lzW/tipsPage.lzW';
  exit(0);
}

$czmlObj = new optCZML();

$czmlObj->updateCZML(YBJP);
$czmlObj->updateCZML(ZY);
$czmlObj->updateCZML(NC);
$czmlObj->updateCZML(JD);
$czmlObj->updateCZML(YXWD);
$czmlObj->updateCZML(AX);
$czmlObj->updateCZML(DW);
$czmlObj->updateCZML(GR);
$czmlObj->updateCZML(VSAT);


$tipType = 'success';
$tipMsg = '已主动刷新全部entity数据';
include '../lzW/tipsPage.lzW';