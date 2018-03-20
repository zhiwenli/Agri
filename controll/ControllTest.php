<?php
//测试调用model模块检测其正确性
//无需调用直接执行的文件不应该被include
$dir = '../';
include_once $dir.'config/include.php';

if($_SERVER['REQUEST_METHOD'] !== "POST"){
  FP::gotoDefaultPage();
  return;
}elseif (FP::keyNotExitOrNoContent('requestOpt', $_POST)) {
  $state['status']['success'] = false;
  $state['status']['msg'] = '操作类型未知 | ';
  $state['postPara'] = $_POST;
  echo json_encode($state);
  return;
}

//收集POST传入数据
$postAttrArr = array();                                                  //全局存储
foreach($_POST as $key => $value) {
  $postAttrArr[$key] = $value;
}

if ($postAttrArr['requestOpt'] === '_insert') {
  insertEntityData($postAttrArr);
}elseif ($postAttrArr['requestOpt'] === '_update') {
  updateEntityData($postAttrArr);
}elseif($postAttrArr['requestOpt'] === '_delete'){
  deleteEntityData($postAttrArr);
}elseif($postAttrArr['requestOpt'] === '_register'){
  register($postAttrArr);
}elseif($postAttrArr['requestOpt'] === '_updateUser'){
  updateUser($postAttrArr);
}elseif($postAttrArr['requestOpt'] === '_login'){
  login($postAttrArr);
}elseif($postAttrArr['requestOpt'] === '_logout'){
  logout($postAttrArr);
}elseif($postAttrArr['requestOpt'] === '_forgotPassword'){
  forgotPassword($postAttrArr);
}elseif($postAttrArr['requestOpt'] === '_updateUser'){
  forgotPassword($postAttrArr);  //???
}elseif($postAttrArr['requestOpt'] === '_deleteUser'){
  deleteUser($postAttrArr);
}elseif($postAttrArr['requestOpt'] === '_searchEntity'){
  searchEntity($postAttrArr);
}else{
  $state['status']['success'] = false;
  $state['status']['msg'] = '操作类型异常';
  echo json_encode($state);
  return;
}


//对应操作

///////////////////////////////////////////////////////////////////////// Entity增删改查
//插入Entity数据
function insertEntityData($postAttrArr){
  //调用Model模块的inert函数进行处理
  $entityOprt = new EntityOprt();
  $state = $entityOprt->insert($postAttrArr);

  if($state['status']['success']){
    updateCZMLWhenOptSuccess($state['status']['success'], (int)$postAttrArr['type_id']);
    $tableName = FP::getTableName($postAttrArr['type_id']);
    $state['nextPage'] = '/view/engine/addEntity.php?step=2&type_id='.$postAttrArr['type_id'].'&entity_id='.$state['insert_id'];
  }else{
    $state['postPara'] = $postAttrArr;
  }

  echo json_encode($state);                                           //如何做到先返回结果结束连接，再更新CZML?
  return;
}

//更新Entity数据
function updateEntityData($postAttrArr){
  $entityOprt = new EntityOprt();
  $state = $entityOprt->update($postAttrArr);

  updateCZMLWhenOptSuccess($state['status']['success'], (int)$postAttrArr['type_id']);

  //如果数据更新成功，返回更新后的数据
  if($state['status']['success']){
    $tableName = FP::getTableName($postAttrArr['type_id']);
    $state['dataSourceId'] = $tableName."_".$postAttrArr['entity_id'];
    $state['nextPage'] = '/view/engine/addEntity.php?step=2&type_id='.$postAttrArr['type_id'].'&entity_id='.$postAttrArr['entity_id'];
  }

  echo json_encode($state);
  return;
}

//删除entity数据
function deleteEntityData($postAttrArr){
  $entityOprt = new EntityOprt();
  $state = $entityOprt->delete($postAttrArr);

  updateCZMLWhenOptSuccess($state['status']['success'], (int)$postAttrArr['type_id']);

  echo json_encode($state);
  return;
}

//搜索entity数据
function searchEntity($postAttrArr){

  $text = $postAttrArr['text'];

  $typeIdArr = array();
  foreach ($postAttrArr as $key => $value) {
    if (FP::EntityTypeId2TypeName((int)$key) != '' && $value == 'true') {
      $typeIdArr[] = (int)$key;
    }
  }

  $entityOprt = new EntityOprt();
  $state = $entityOprt->entitySearch($text, $typeIdArr);

  echo json_encode($state);
  return;
}

//传入状态和类型id，用于根据操作结果决定是否更新对应类型的CZML
function updateCZMLWhenOptSuccess($success, $type_id){
    if($success){
      //更新CZML
      $czmlObj = new optCZML();
      $czmlObj->updateCZML($type_id);
  }
}


///////////////////////////////////////////////////////////////////////// User增删改查登录注销
//注册
function register($postAttrArr){
  $user = new User();
  $state = $user->register($postAttrArr);

  echo json_encode($state);
  return;
}

function updateUser($postAttrArr){
  $user = new User();
  $state = $user->updateUser($postAttrArr);

  echo json_encode($state);
  return;
}

function login($postAttrArr){
  $user = new User();
  $state = $user->login($postAttrArr);

  echo json_encode($state);
  return;
}

function logout($postAttrArr){
  $user = new User();
  $state = $user->logout();

  echo json_encode($state);
  return;
}

function forgotPassword($postAttrArr){
  $user = new User();
  $state = $user->forgotPassword($postAttrArr);

  echo json_encode($state);
  return;
}

function deleteUser($postAttrArr){
  $user = new User();
  $user_id = $postAttrArr['user_id'];
  $state = $user->deleteUser($user_id);

  echo json_encode($state);
  return;
}