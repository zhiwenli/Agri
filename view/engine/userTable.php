<?php
$dir = '../../';
include_once $dir.'config/include.php';

FP::logingConfirmAndGuidance();

if (FP::keyNotExitOrNoContent('type_id', $_GET)) {
  $tipType = 'error';
  $tipMsg = '参数错误';
  include '../lzW/tipsPage.lzW';
  exit(0);
}

$user = new User();
$role = $user->getCurrentUserMsg('role');
if ($role != ADMIN) {
  $tipType = 'warning';
  $tipMsg = '权限受限';
  include '../lzW/tipsPage.lzW';
  exit(0);
}

$D = $user->getUserAttrArr();

//页码控制
$page = array('index' => 1, 'sum' => ceil(count($D)/NUM_OF_RECORD_IN_PAGE));
$page['sum'] = $page['sum'] > 0 ? $page['sum'] : 1;
$page['index'] = FP::keyNotExitOrNoContent('page', $_GET) ? 1 : (int)$_GET['page'];
$page['index'] = $page['index'] <= 0 ? 1 : $page['index'];
$page['index'] = $page['index'] > $page['sum'] ? $page['sum'] : $page['index'];
$pageData = array();
$start = ($page['index'] - 1) * NUM_OF_RECORD_IN_PAGE + 1;
$end = $page['index'] * NUM_OF_RECORD_IN_PAGE;
 for ($i=$start; $i <= $end && $i <= count($D); $i++) { 
   $pageData[] = $D[$i - 1];
 }
//将$pageData赋值给$D;
$D = $pageData;


//要展开的sideBar
$activeBar = array(0, 0);

if ($_GET['type_id'] == 1) {
  $activeBar = array(1, 1);
}elseif ($_GET['type_id'] == 2) {
  $activeBar = array(1, 2);
}elseif ($_GET['type_id'] == 3) {
  $activeBar = array(1, 3);
}elseif ($_GET['type_id'] == 4) {
  $activeBar = array(1, 4);
}elseif ($_GET['type_id'] == 11) {
  $activeBar = array(2, 1);
}elseif ($_GET['type_id'] == 12) {
  $activeBar = array(2, 2);
}elseif ($_GET['type_id'] == 13) {
  $activeBar = array(2, 3);
}elseif ($_GET['type_id'] == 14) {
  $activeBar = array(2, 4);
}elseif ($_GET['type_id'] == 21) {
  $activeBar = array(3, 1);
}elseif ($_GET['type_id'] == 100) {
  $activeBar = array(4, 1);
}

//数据易读加工
for ($i=0; $i < count($D); $i++) {
  $D[$i]['role'] = FP::getReadabilityUserRole($D[$i]['role']);
}

include '../lzW/userTable.lzW';