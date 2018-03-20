<?php
$dir = '../../';
include_once $dir.'config/include.php';

FP::logingConfirmAndGuidance();

$user = new User();
$role = $user->getCurrentUserMsg('role');

if(FP::keyNotExitOrNoContent('type_id', $_GET) || FP::keyNotExitOrNoContent('entity_id', $_GET)){
  $tipType = 'error';
  $tipMsg = '参数错误！';
  include '../lzW/tipsPage.lzW';
  exit(0);
}

$activeBar = array(0, 0);

$entityOprt = new EntityOprt();
$D = $entityOprt->getEntityAttr($_GET['type_id'], $_GET['entity_id']);

$tableName = FP::getTableName($_GET['type_id']);

if (count($D) <= 0) {
  $tipType = 'error';
  $tipMsg = '参数错误！';
  include '../lzW/tipsPage.lzW';
  exit(0);
}

//var_dump($D);


include '../lzW/preview.lzW';



