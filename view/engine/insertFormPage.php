<?php
$dir = '../../';
include_once $dir.'config/include.php';

$data = array();
if(FP::keyNotExitOrNoContent('type_id', $_GET) || FP::keyNotExitOrNoContent('entity_id', $_GET)){
  echo '请求参数错误';
}else{
  $entityOprt = new EntityOprt();
  $data = $entityOprt->getEntityAttr($_GET['type_id'], $_GET['entity_id']);
}

include '../lzW/formPage.lzW';
//echo htmlspecialchars($str);//输出HTML实体，将预定义的<、>转换为HTML实体