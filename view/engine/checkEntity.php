<?php
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

if(FP::keyNotExitOrNoContent('tableName', $_GET) || 
  ($_GET['tableName'] != 'speciality'
  && $_GET['tableName'] != 'station'
  && $_GET['tableName'] != 'satellite')){
  $tipType = 'error';
  $tipMsg = '参数错误！';
  include '../lzW/tipsPage.lzW';
  exit(0);
}

$activeBar = array(0, 0);

$entityOprt = new EntityOprt();
$D = $entityOprt->getStatusWattingEntityAttrArr($_GET['tableName']);

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

//数据易读加工
for ($i=0; $i < count($D); $i++) {
  $D[$i]['level'] = FP::getReadabilityLevel($D[$i]['level']);
  $D[$i]['status'] = FP::getReadabilityStatus($D[$i]['status']);

  $D[$i]['create_by'] = $user->getUserMsgById($D[$i]['create_by'])['name'];
  $D[$i]['create_dept'] = $user->getUserMsgById($D[$i]['create_by'])['dept'];
}

include '../lzW/entityTable.lzW';