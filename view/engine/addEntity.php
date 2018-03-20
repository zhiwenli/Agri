<?php
$dir = '../../';
include_once $dir.'config/include.php';

FP::logingConfirmAndGuidance();

$user = new User();
$role = $user->getCurrentUserMsg('role');

if ((FP::keyNotExitOrNoContent('step', $_GET) || $_GET['step'] === '1') && !FP::keyNotExitOrNoContent('tableName', $_GET) 
    &&($_GET['tableName'] === 'speciality' || 
    $_GET['tableName'] === 'station' || 
    $_GET['tableName'] === 'satellite')) {
  //插入entity基本信息
  include '../lzW/addEntityStep1.lzW';

}elseif((FP::keyNotExitOrNoContent('step', $_GET) || $_GET['step'] === '1')
  && !FP::keyNotExitOrNoContent('type_id', $_GET)
  && !FP::keyNotExitOrNoContent('entity_id', $_GET)){
  //更新entity基本信息
  $entityOprt = new EntityOprt();
  $D = $entityOprt->getEntityAttr($_GET['type_id'], $_GET['entity_id']);

  if(count($D) <= 0){
    $tipType = 'error';
    $tipMsg = '参数错误';
    include '../lzW/tipsPage.lzW';
    exit(0);
  }

  $_GET['tableName'] = FP::getTableName($_GET['type_id']);

  include '../lzW/addEntityStep1.lzW';

}elseif ($_GET['step'] === '2' && !FP::keyNotExitOrNoContent('entity_id', $_GET) && !FP::keyNotExitOrNoContent('type_id', $_GET)) {
  //更新entity弹窗你信息
  $entityOprt = new EntityOprt();
  $D = $entityOprt->getEntityAttr($_GET['type_id'], $_GET['entity_id']);

  if(count($D) <= 0){
    $tipType = 'error';
    $tipMsg = '参数错误,未找到请求的entity';
    include '../lzW/tipsPage.lzW';
    exit(0);
    }
  //success
  include '../lzW/addEntityStep2.lzW';
}else{
  $tipType = 'error';
  $tipMsg = '参数错误';
  include '../lzW/tipsPage.lzW';
  exit(0);
}


