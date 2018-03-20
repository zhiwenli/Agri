<?php

class EntityOprt{
  private $db;                                                             //数据库操作对象

  function __construct(){
    $this->db = new Mysql();
  }

  //根据id获取一个entity的全部属性值，若为空则返回空数组
  public function getEntityAttr($type_id, $entity_id){
    $state = array();

    $tableName = FP::getTableName($type_id);

    $filter = "entity_id=".$entity_id;

    $user = new User();
    $userMsg = $user->getCurrentUserMsg();
    if ($userMsg['role'] == KEYBOARDER) {
      $filter .= " and create_by=".$userMsg['user_id'];
    }

    $this->db->select($tableName, "*", $filter);
    $state = $this->db->fetchArray(MYSQL_ASSOC);

    if($state['success']){
      if(count($state['result_array']) > 0){
        return $state['result_array'][0];
      }else{
        return array();
      }
      
    }else{
      FP::putLog($state['msg']);
      return array();
    }
  }

  //根据类型获取全部entity
  public function getEntityAttrArr($type_id){
    $state = array();

    $tableName = FP::getTableName($type_id);

    $filter = "type_id=".$type_id;

    $user = new User();
    $userMsg = $user->getCurrentUserMsg();
    if ($userMsg['role'] == KEYBOARDER) {
      $filter .= " and create_by=".$userMsg['user_id'];
    }

    $filter .= " order by entity_id DESC ";

    $this->db->select($tableName, "*", $filter);
    $state = $this->db->fetchArray(MYSQL_ASSOC);

    if($state['success']){
      if(count($state['result_array']) > 0){
        return $state['result_array'];
      }else{
        return array();
      }
      
    }else{
      FP::putLog($state['msg']);
      return array();
    }
  }

  //根据表名获取全部待审核的Entity
  public function getStatusWattingEntityAttrArr($tableName){
    $state = array();

    $filter = "status=".CHECK_STATUS_WAITTING;

    $filter .= " order by entity_id DESC ";

    $this->db->select($tableName, "*", $filter);
    $state = $this->db->fetchArray(MYSQL_ASSOC);

    if($state['success']){
      if(count($state['result_array']) > 0){
        return $state['result_array'];
      }else{
        return array();
      }
    }else{
      FP::putLog($state['msg']);
      return array();
    }
  }

  //插入一条entity数据，返回state中包含插入状态
  public function insert($entityAttrArr){

    $state = array();

    $entityAttrArr = $this->entityAttrFilter($entityAttrArr);              //清除空值
    $entityAttrArr = $this->str2number($entityAttrArr);
    
    $state = $this->entityAttrCheck($entityAttrArr);                       //检查 正常
    if (!$state['status']['success']) {
      return $state;
    }

    $entityAttrArr = $this->setDefaultValue($entityAttrArr);               //添加自动值
    $entityAttrArr = $this->setCreateUser($entityAttrArr);                 //添加创建人
    $entityAttrArr = $this->saveImageAndSetKey($entityAttrArr);            //保存并设置图像属性

    $tableName = FP::getTableName($entityAttrArr['type_id']);              //获取数据因当存储的表名

    //insert
    $this->db->insert($tableName, $entityAttrArr);
    $sqlResult = $this->db->getMessage();

    $state['status']['success'] = $sqlResult['success'];
    $state['status']['msg'] = $sqlResult['msg'];
    $state['insert_id'] = $sqlResult['insert_id'];

    $user = new User();
    FP::putLog('用户'.$user->getCurrentUserMsg('user_id').'添加了数据'.$sqlResult['insert_id'].' 于表'.$tableName);

    return $state;
  }

  //仅更新审核状态，update会自动更新

  //更新一条entity的数据, entity_id值必须已经存在
  public function update($entityAttrArr){
    $state = array();

    $entityAttrArr = $this->entityAttrFilter($entityAttrArr);              //清除空值
    $entityAttrArr = $this->str2number($entityAttrArr);

    //必须值如果存在，那么必须正常

    $state = $this->entityAttrUpdateCheck($entityAttrArr);
    if (!$state['status']['success']) {
      return $state;
    }

    $entityAttrArr['last_modify'] = FP::getDatetime();
    $entityAttrArr = $this->updateStatus($entityAttrArr);                  //权限更新检查
    $entityAttrArr = $this->saveImageAndSetKey($entityAttrArr);            //保存并设置图像属性

    $tableName = FP::getTableName($entityAttrArr['type_id']);

    $eid = $entityAttrArr['entity_id'];

    $this->db->update($tableName, $entityAttrArr, "entity_id=".$eid );
    $sqlResult = $this->db->getMessage();

    $state['status']['success'] = $sqlResult['success'];
    $state['status']['msg'] = $sqlResult['msg'];

    $user = new User();
    FP::putLog('用户'.$user->getCurrentUserMsg('user_id').'修改了数据'.$entityAttrArr['entity_id'].' 于表'.$tableName);

    return $state;
  }

  //删除一条entity，参数中必须包含type_id和entity_id
  public function delete($entityAttrArr){
    $state = array();

    $entityAttrArr = $this->str2number($entityAttrArr);

    if(!array_key_exists('type_id', $entityAttrArr)){
      $state['status']['success'] = false;
      $state['status']['msg']['type_id'] = "类型值为空";
    }elseif (!FP::entityTypeIdExist($entityAttrArr['type_id']))
    {
      $state['status']['success'] = false;
      $state['status']['msg']['type_id'] = "entity类型值异常";
    }

    if (!FP::entityTypeIdExist($entityAttrArr['entity_id'])) {
      $state['status']['success'] = false;
      $state['status']['msg']['entity_id'] = "entity id为空";
    }


    $tableName = FP::getTableName($entityAttrArr['type_id']);

    $this->db->delete($tableName, "entity_id=".$entityAttrArr['entity_id']);
    $sqlResult = $this->db->getMessage();

    
    if ($sqlResult['success'] && $sqlResult['affected_rows'] > 0) {
      $state['status']['success'] = $sqlResult['success'];
      $state['status']['msg'] = $sqlResult['msg'];

      $user = new User();
      FP::putLog('用户'.$user->getCurrentUserMsg('user_id').'删除了数据'.$entityAttrArr['entity_id'].' 于表'.$tableName);
    }elseif ($sqlResult['success'] && $sqlResult['affected_rows'] <= 0) {
      $state['status']['success'] = false;
      $state['status']['msg'] = '指定的数据不存在';
    }else{
      //SQL执行失败
      $state['status']['success'] = $sqlResult['success'];
      $state['status']['msg'] = $sqlResult['msg'];
    }

    return $state;
  }

  //根据关键词搜索entity,传入需要搜索的文本和类型数组
  public function entitySearch($text, $typeIdArr){
    $result = array();

    //获取所有要搜索的表名
    // $tableArr = array(
    //   'speciality' => false,
    //   'station' => false,
    //   'satellite' => false);
    // foreach ($typeIdArr as $key => $type_id) {
    //   $tableName = FP::getTableName($type_id);
    //   $tableArr[$tableName] = true;
    // }

    //搜索$typeIdArr全部指定的类型
    foreach ($typeIdArr as $index => $type_id) {
      $tableName = FP::getTableName($type_id);

      $this->db->select($tableName, "*", "type_id=".$type_id." and status=".CHECK_STATUS_PASS." and (name like '%".$text."%' or key_words like '%".$text."%')");
      $state = $this->db->fetchArray(MYSQL_ASSOC);
      if ($state['success']) {
        foreach ($state['result_array'] as $key => $value) {
          if(is_null($value['icon']))
            $state['result_array'][$key]['icon'] = '../'.FP::getDefaultTypeIcon((int)$value['type_id']);          //赋默认icon
        }
        $result = array_merge($result, $state['result_array']);
      }else{
        echo('ＳＥＡＲＣＨＥＲＲＯＲ！');
        FP::putLog('检索出错');
      }
    }

    // foreach ($tableArr as $tableName => $tableNameFlag) {
    //   if(!$tableNameFlag){continue;}

    //   $this->db->select($tableName, "*", " status=".CHECK_STATUS_PASS." and (name like '%".$text."%' or key_words like '".$text."')");
    //   $state = $this->db->fetchArray(MYSQL_ASSOC);
    //   if ($state['success']) {
    //     foreach ($state['result_array'] as $key => $value) {
    //       if(is_null($value['icon']))
    //         $state['result_array'][$key]['icon'] = '../'.FP::getDefaultTypeIcon((int)$value['type_id']);          //赋默认icon
    //     }
    //     $result = array_merge($result, $state['result_array']);
    //   }else{
    //     echo('ＳＥＡＲＣＨＥＲＲＯＲ！');
    //     FP::putLog('检索出错');
    //   }
    // }

    return $result;
  }

  //检查要输入的entity的属性值是否正常
  //1.必要值是否缺少；2.值范围是否正常
  private function entityAttrCheck($entityAttrArr){
    $state = array();
    $state['status']['success'] = true;
    
    if(!array_key_exists('type_id', $entityAttrArr)){
      $state['status']['success'] = false;
      $state['status']['msg']['type_id'] = "类型为空";
    }elseif (!FP::entityTypeIdExist($entityAttrArr['type_id']))
    {
      $state['status']['success'] = false;
      $state['status']['msg']['type_id'] = "entity类型值异常";
    }

    if(FP::keyNotExitOrNoContent('name', $entityAttrArr)){
      $state['status']['success'] = false;
      $state['status']['msg']['name'] = "名称为空";
    }

    if(FP::keyNotExitOrNoContent('lat', $entityAttrArr)){
      $state['status']['success'] = false;
      $state['status']['msg']['lat'] = "纬度为空";
    }else if(!FP::checkLatitude($entityAttrArr['lat'])){
      $state['status']['success'] = false;
      $state['status']['msg']['lat'] = "纬度值应在位于[-90, 90]之间";
    }

    if(FP::keyNotExitOrNoContent('lng', $entityAttrArr)){
      $state['status']['success'] = false;
      $state['status']['msg']['lng'] = "经度为空";
    }else if(!FP::checkLongtitude($entityAttrArr['lng'])){
      $state['status']['success'] = false;
      $state['status']['msg']['lng'] = "经度值应在位于[-180, 180]之间";
    }

    foreach ($_FILES as $key => $value) {
      if ($value['size'] <= 0){
        continue;
      }

      if($value['type'] != "image/jpg" && $value['type'] != "image/jpeg" && $value['type'] != "image/png"){
        $state['status']['success'] = false;
        $state['status']['msg'][$key] = "图片格式应为png、jpg、jpeg";
      }

      if ($value['size'] > 3096*1024) {
        $state['status']['success'] = false;
        $state['status']['msg'][$key] = "图片文件大小应小于3MB";
      }
    }

    return $state;

  }

  //更新检测，如果值存在，那么必须正常。type_id与entity_id必须存在。非管理员不可修改status字段
  private function entityAttrUpdateCheck($entityAttrArr){
    $state = array();
    $state['status']['success'] = true;
    
    if(!array_key_exists('type_id', $entityAttrArr)){
      $state['status']['success'] = false;
      $state['status']['msg']['type_id'] = "类型为空";
    }elseif (!FP::entityTypeIdExist($entityAttrArr['type_id'])){
      $state['status']['success'] = false;
      $state['status']['msg']['type_id'] = "entity类型值异常";
    }

    if(!array_key_exists('entity_id', $entityAttrArr)){
      $state['status']['success'] = false;
      $state['status']['msg']['entity_id'] = "entity_id为空";
    }

    if(array_key_exists('lat', $entityAttrArr) && !FP::checkLatitude($entityAttrArr['lat'])){
      $state['status']['success'] = false;
      $state['status']['msg']['lat'] = "纬度值应在位于[-90, 90]之间";
    }

    if(array_key_exists('lng', $entityAttrArr) && !FP::checkLongtitude($entityAttrArr['lng'])){
      $state['status']['success'] = false;
      $state['status']['msg']['lng'] = "经度值应在位于[-180, 180]之间";
    }

    //非管理员不可修改status字段
    if(array_key_exists("status", $entityAttrArr) 
      && ($entityAttrArr['status'] == CHECK_STATUS_PASS || $entityAttrArr['status'] == CHECK_STATUS_REFUSE)){
      $user = new User();
      $role = $user->getCurrentUserMsg('role');
      if($role != ADMIN){
        $state['status']['success'] = false;
        $state['status']['msg']['status'] = "权限不足";
      }
    }
    
    //检查文件
    foreach ($_FILES as $key => $value) {
      if ($value['size'] <= 0){
        continue;
      }

      if($value['type'] != "image/jpg" && $value['type'] != "image/jpeg" && $value['type'] != "image/png"){
        $state['status']['success'] = false;
        $state['status']['msg'][$key] = "图片格式应为png、jpg、jpeg";
      }

      if ($value['size'] > 3096*1024) {
        $state['status']['success'] = false;
        $state['status']['msg'][$key] = "图片文件大小应小于3MB";
      }
    }

    return $state;

  }

  //清除传入为空的entity属性值, 以及数据库中不存在的列
  private function entityAttrFilter($entityAttrArr){
    foreach ($entityAttrArr as $key => $value) {
      if(!in_array($key, json_decode(ENTITY_ATTR_DB_COLUMNS, true))){
        unset($entityAttrArr[$key]);
      }

      if(FP::noContent($value)){
        unset($entityAttrArr[$key]);
      }
    }
    return $entityAttrArr;
  }

  //将表单传递的字符串转换为数值
  private function str2number($entityAttrArr){
    if(!FP::keyNotExitOrNoContent('entity_id', $entityAttrArr)){
      $entityAttrArr['entity_id'] = (int)$entityAttrArr['entity_id'];
    }

    if(!FP::keyNotExitOrNoContent('type_id', $entityAttrArr)){
      $entityAttrArr['type_id'] = (int)$entityAttrArr['type_id'];
    }

    if(!FP::keyNotExitOrNoContent('level', $entityAttrArr)){
      $entityAttrArr['level'] = (int)$entityAttrArr['level'];
    }
    
    return $entityAttrArr;
  }

  //添加自动值，修改时间。审核状态,,,只在插入的时候调用
  private function setDefaultValue($entityAttrArr){

    $entityAttrArr['last_modify'] = FP::getDatetime();

    $entityAttrArr['status'] = CHECK_STATUS_TEMP;

    # 其它默认值
    return $entityAttrArr;
  }

  //添加创建人
  private function setCreateUser($entityAttrArr){
    $user = new User();
    $entityAttrArr['create_by'] = $user->getCurrentUserMsg('user_id');
    return $entityAttrArr;
  }


  //如果检测到上传了文件，则存储文件并设置对应字段为文件路径
  private function saveImageAndSetKey($entityAttrArr){
    foreach ($_FILES as $key => $value) {
      if($value['size'] == 0 || $value['size'] > 3096*1024){
        continue;
      }
      $value['name'] = FP::createUploadFileName($value['name']);          //重命名

      move_uploaded_file($value["tmp_name"], '..'.PUBLIC_USER_IMG_PATH.$value["name"]);

      $entityAttrArr[$key] = $value["name"];
    }

    return $entityAttrArr;
  }

  //更新状态
  private function updateStatus($entityAttrArr){

    if (!array_key_exists('status', $entityAttrArr)) {
      return $entityAttrArr;
    }

    $user = new User();
    $role = $user->getCurrentUserMsg('role');

    if ($role == ADMIN) {
      //不干涉管理员权限
      return $entityAttrArr;
    }

    if($entityAttrArr['status'] == CHECK_STATUS_PASS
      || $entityAttrArr['status'] == CHECK_STATUS_REFUSE){
      $entityAttrArr['status'] = CHECK_STATUS_TEMP; //干扰用户盗用管理员权限
    }
    return $entityAttrArr;
  }
}