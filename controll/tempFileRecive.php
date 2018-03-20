<?php
//测试调用model模块检测其正确性
//无需调用直接执行的文件不应该被include
$dir = '../';
include_once $dir.'config/include.php';

$state = array();

if($_SERVER['REQUEST_METHOD'] !== "POST"){
  FP::gotoDefaultPage();
  return;
}

$state['status']['success'] = true;

foreach ($_FILES as $key => $value) {
  if($value['size'] == 0){
    continue;
  }
  if ($value['size'] > 3096*1024) {
    $state['status']['success'] = false;
    $state['status']['msg'][$key] = "图片应小于3MB";
  }
  $value['name'] = FP::createUploadFileName($value['name']);          //重命名

  move_uploaded_file($value["tmp_name"], '..'.PUBLIC_TEMP_IMG_PATH.$value["name"]);

  $state['imgPathArr'][$key] = PUBLIC_TEMP_IMG_PATH.$value["name"];
}

echo json_encode($state);