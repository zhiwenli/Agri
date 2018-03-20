<?php

//CZML操作类
//包含生成CZML等函数

class optCZML {

  private $document;
  private $type;
  private $version;
  private $entitiesMsgArr = array();

  //CZML config
  private $CZMLEntityConfig;
  private $BILLBOARD_ENTIRELY_DISPLAY_DISTANCE;
  private $BILLBOARD_DISPLAY_BUFFER_DISTANCE;
  private $defaultIconPath;
  private $databaseTableName; //大分类 speciality, station, satellite

  public function updateCZML($type_id){
    $tableName = FP::getTableName($type_id);
    $typeName = FP::EntityTypeId2TypeName($type_id);

    //查询数据
    $db = new Mysql();
    $db->select($tableName, "*", "type_id=".$type_id." and status=".CHECK_STATUS_PASS);
    $state = $db->fetchArray(MYSQL_ASSOC);

    if (!$state['success']) {
      FP::putLog('更新CZML失败'.$state['msg']);
      exit;
    }

    $this->init($typeName, $state['result_array']);                                       //初始化
    
    $czml = $this->getCZML();                                                 //提取CZML json

    //写入文件
    $outputFilePath = CURRENT_DATA.$tableName.'_'.$typeName.'.czml';
    file_put_contents($outputFilePath, $czml);

    FP::putLog('更新CZML'.$outputFilePath);
  }

  //获取CZML,如果没有则创建
  protected function getCZML(){
    if(empty($CZML)){
      $CZML_Arr = $this->createCZML();
    }
    $CZMLjson = print_r($CZML_Arr, true);
    return $CZMLjson;
  }

  //初始化
  private function init($type, $entitiesMsgArr, $document = "document", $version="1.0"){
    $this->document = $document;
    $this->type = $type;
    $this->version = $version;
    $this->entitiesMsgArr = $entitiesMsgArr;

    $this->CZMLEntityConfig = json_decode(CZML_ENTITY_CONFIG, true);
    $this->BILLBOARD_ENTIRELY_DISPLAY_DISTANCE = json_decode(BILLBOARD_ENTIRELY_DISPLAY_DISTANCE, true);
    $this->BILLBOARD_DISPLAY_BUFFER_DISTANCE = BILLBOARD_DISPLAY_BUFFER_DISTANCE;

    if ($type === 'YBJP') {
      $this->defaultIconPath = PUBLIC_IMG_PATH.DEFAULT_SPECIALITY_YBJP_IMG;
      $this->databaseTableName = 'speciality';
    }elseif ($type === 'ZY') {
      $this->defaultIconPath = PUBLIC_IMG_PATH.DEFAULT_SPECIALITY_ZY_IMG;
      $this->databaseTableName = 'speciality';
    }elseif ($type === 'NC') {
      $this->defaultIconPath = PUBLIC_IMG_PATH.DEFAULT_SPECIALITY_NC_IMG;
      $this->databaseTableName = 'speciality';
    }elseif ($type === 'JD') {
      $this->defaultIconPath = PUBLIC_IMG_PATH.DEFAULT_SPECIALITY_JD_IMG;
      $this->databaseTableName = 'speciality';
    }elseif ($type === 'YXWD') {
      $this->defaultIconPath = PUBLIC_IMG_PATH.DEFAULT_STATION_YXWD_IMG;
      $this->databaseTableName = 'station';
    }elseif ($type === 'AX') {
      $this->defaultIconPath = PUBLIC_IMG_PATH.DEFAULT_STATION_AX_IMG;
      $this->databaseTableName = 'station';
    }elseif ($type === 'DW') {
      $this->defaultIconPath = PUBLIC_IMG_PATH.DEFAULT_STATION_DW_IMG;
      $this->databaseTableName = 'station';
    }elseif ($type === 'GR') {
      $this->defaultIconPath = PUBLIC_IMG_PATH.DEFAULT_STATION_GR_IMG;
      $this->databaseTableName = 'station';
    }elseif ($type === 'VSAT') {
      $this->defaultIconPath = PUBLIC_IMG_PATH.DEFAULT_SATELLITE_VSAT_IMG;
      $this->databaseTableName = 'satellite';
    }else{
      //无法确定图层类型时使用宇宝精品图标
      $defaultIconPath = PUBLIC_IMG_PATH.DEFAULT_SPECIALITY_YBJP_IMG;
    }
  }

  //创建CZML
  private function createCZML(){
    $entitiesArr = array();

    $CZML_Head = array(
      "id" => $this->document,
      "name" => $this->type,
      "version" => $this->version
    );

    array_push($entitiesArr, $CZML_Head);

    $entitiesArr = $this->entityArr2CZMLArr($entitiesArr);

    return json_encode($entitiesArr);
  }
  
  //将包含元素信息的$this->entitiesMsgArr数组转换成CZML键值对形式的数组并添加至$entitiesArr
  private function entityArr2CZMLArr($entitiesArr){

    for ($i=0; $i < sizeof($this->entitiesMsgArr); $i++) {
      $entityMsg = $this->entitiesMsgArr[$i];
      $entity = array();

      $entity['id'] = $this->databaseTableName.'_'.(double)$entityMsg['entity_id'];
      $entity['name'] = $entityMsg['name'];
      $entity['position'] = array('cartographicDegrees' => [(double)$entityMsg['lng'], (double)$entityMsg['lat'], 0]);
      $entity['billboard'] = array('image' => is_null($entityMsg['icon']) ? $this->defaultIconPath : PUBLIC_USER_IMG_PATH.$entityMsg['icon']);
      $entity['label'] = array('text' => $entityMsg['name']);

      $entity = $this->setDisplayLevel($entity, $entityMsg['level']);

      $entity = $this->setCZMLStyle($entity);

      array_push($entitiesArr, $entity);
    }

    return $entitiesArr;
  }

  //设置分级显示
  private function setDisplayLevel($entity, $level){

    //不同级别图标完整出现时的视距距离
    $entirelyDisplayDistance = $this->BILLBOARD_ENTIRELY_DISPLAY_DISTANCE;
    //完全显示前大小、透明度的渐变距离
    $displayBufferDistance = $this->BILLBOARD_DISPLAY_BUFFER_DISTANCE;

    switch ($level) {
      case 0:
        //国家级
        $entity['billboard']['scaleByDistance'] = array('nearFarScalar' => [$entirelyDisplayDistance['nation'], 1.0, $entirelyDisplayDistance['nation'] + $displayBufferDistance * 100, 0]);
        $entity['billboard']['translucencyByDistance'] = array('nearFarScalar' => [$entirelyDisplayDistance['nation'], 1.0, $entirelyDisplayDistance['nation'] + $displayBufferDistance * 100, 0.8]);
        $entity['label']['translucencyByDistance'] = array('nearFarScalar' => [$entirelyDisplayDistance['nation'], 1.0, $entirelyDisplayDistance['nation'] + $displayBufferDistance * 100, 0]);
        break;

      case 10:
        //省、直辖市
        $entity['billboard']['scaleByDistance'] = array('nearFarScalar' => [$entirelyDisplayDistance['provience'], 1.0, $entirelyDisplayDistance['provience'] + $displayBufferDistance * 18, 0]);
        $entity['billboard']['translucencyByDistance'] = array('nearFarScalar' => [$entirelyDisplayDistance['provience'], 1.0, $entirelyDisplayDistance['provience'] + $displayBufferDistance * 18, 0.8]);
        $entity['label']['translucencyByDistance'] = array('nearFarScalar' => [$entirelyDisplayDistance['provience'], 1.0, $entirelyDisplayDistance['provience'] + $displayBufferDistance, 0]);
        break;

      case 20:
        //市
        $entity['billboard']['scaleByDistance'] = array('nearFarScalar' => [$entirelyDisplayDistance['city'], 1.0, $entirelyDisplayDistance['city'] + $displayBufferDistance * 3, 0]);
        $entity['billboard']['translucencyByDistance'] = array('nearFarScalar' => [$entirelyDisplayDistance['city'], 1.0, $entirelyDisplayDistance['city'] + $displayBufferDistance * 3, 0.8]);
        $entity['label']['translucencyByDistance'] = array('nearFarScalar' => [$entirelyDisplayDistance['city'], 1.0, $entirelyDisplayDistance['city'] + $displayBufferDistance, 0]);
        break;

      case 30:
        //县
        $entity['billboard']['scaleByDistance'] = array('nearFarScalar' => [$entirelyDisplayDistance['county'], 1.0, $entirelyDisplayDistance['county'] + $displayBufferDistance, 0]);
        $entity['billboard']['translucencyByDistance'] = array('nearFarScalar' => [$entirelyDisplayDistance['county'], 1.0, $entirelyDisplayDistance['county'] + $displayBufferDistance, 0.8]);
        $entity['label']['translucencyByDistance'] = array('nearFarScalar' => [$entirelyDisplayDistance['county'], 1.0, $entirelyDisplayDistance['county'] + $displayBufferDistance, 0]);
        break;

      default:
        //同 县
        $entity['billboard']['scaleByDistance'] = array('nearFarScalar' => [$entirelyDisplayDistance['county'], 1.0, $entirelyDisplayDistance['county'] + $displayBufferDistance, 0]);
        $entity['billboard']['translucencyByDistance'] = array('nearFarScalar' => [$entirelyDisplayDistance['county'], 1.0, $entirelyDisplayDistance['county'] + $displayBufferDistance, 0.8]);
        $entity['label']['translucencyByDistance'] = array('nearFarScalar' => [$entirelyDisplayDistance['county'], 1.0, $entirelyDisplayDistance['county'] + $displayBufferDistance, 0]);
        break;
    }

    return $entity;
  }

  //设置CZML中实体的样式
  private function setCZMLStyle($entity){

    $entity['billboard']['width'] = $this->CZMLEntityConfig['billboard']['width'];
    $entity['billboard']['height'] = $this->CZMLEntityConfig['billboard']['height'];
    $entity['billboard']['heightReference'] = $this->CZMLEntityConfig['billboard']['heightReference'];
    $entity['billboard']['verticalOrigin'] = $this->CZMLEntityConfig['label']['verticalOrigin'];

    $entity['label']['font'] = $this->CZMLEntityConfig['label']['font'];
    $entity['label']['verticalOrigin'] = $this->CZMLEntityConfig['label']['verticalOrigin'];
    $entity['label']['pixelOffset'] = $this->CZMLEntityConfig['label']['pixelOffset'];
    $entity['label']['fillColor'] = $this->CZMLEntityConfig['label']['fillColor'];
    $entity['label']['style'] = $this->CZMLEntityConfig['label']['style'];
    $entity['label']['heightReference'] = $this->CZMLEntityConfig['label']['heightReference'];
    $entity['label']['verticalOrigin'] = $this->CZMLEntityConfig['label']['verticalOrigin'];

    return $entity;
  }

}

?>