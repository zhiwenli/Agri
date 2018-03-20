<?php
$start = microtime (true);

$dir = '../';
include_once $dir.'config/include.php';

//设置返回数据格式为json，编码为utf8
header('Content-Type:application/json;charset=utf-8');

$return = array(
  'status' => array(
    'success' => false,
    'msg' => ''
    )
);

if($_SERVER['REQUEST_METHOD'] !== 'GET'){
  $return['status']['msg'] = '非GET请求';
  echo json_encode($return);
  return;
}



//从传回的大类名_id号中提取出数据库表名和id
$id = substr($_GET['dataSourceId'], strrpos($_GET['dataSourceId'], '_') + 1);
$tableName = substr($_GET['dataSourceId'], 0, strrpos($_GET['dataSourceId'], '_'));

//设定8个默认的工具按钮图标
$defaultToolsImg = array();
if ($tableName === 'speciality') {
  $defaultToolsImg = json_decode(DEFAULT_SPECIALITY_TOOLS_IMG, true);
}elseif ($tableName === 'station') {
  $defaultToolsImg = json_decode(DEFAULT_STATION_TOOLS_IMG, true);
}elseif ($tableName === 'satellite') {
  $defaultToolsImg = json_decode(DEFAULT_SATELLITE_TOOLS_IMG, true);
}else{
  $return['status']['msg'] = 'id异常，不包id头类型：'.$tableName;
  echo json_encode($return);
  return;
}

//SQL query
$db = new mysql();
$db->select($tableName, "*", "entity_id=".$id);
$sqlreturn = $db->fetchArray(MYSQL_ASSOC);
if ($sqlreturn['success']) {
  $sqlreturn = $sqlreturn['result_array'][0];
}else{
  FP::putLog("查询PopDialog信息出错，详情：".$sqlreturn['msg']);
}

$return['district'] = is_null($sqlreturn['district']) ? null : $sqlreturn['district'];

$return['headerText'] = is_null($sqlreturn['popDialogBox_title']) ? '北斗农业·中国' : $sqlreturn['popDialogBox_title'];
$return['govImg'] = is_null($sqlreturn['popDialogBox_govImg']) ? '' : PUBLIC_USER_IMG_PATH.$sqlreturn['popDialogBox_govImg'];
$return['govUrl'] = $sqlreturn['popDialogBox_govUrl'];
$return['descripBg'] = is_null($sqlreturn['popDialogBox_descBg']) ? '' : PUBLIC_USER_IMG_PATH.$sqlreturn['popDialogBox_descBg'];
$return['descripUrl'] = $sqlreturn['popDialogBox_descUrl'];
$return['descripText1'] = $sqlreturn['popDialogBox_descText1'];
$return['descripText2'] = $sqlreturn['popDialogBox_descText2'];
$return['descripIcon'] = is_null($sqlreturn['popDialogBox_descIcon']) ? PUBLIC_IMG_PATH.DEFAULT_SPECIALITY_YBJP_IMG : PUBLIC_USER_IMG_PATH.$sqlreturn['popDialogBox_descIcon'];
$return['descrip2dBarcode'] = is_null($sqlreturn['popDialogBox_2dBarcode']) ? '' : PUBLIC_USER_IMG_PATH.$sqlreturn['popDialogBox_2dBarcode'];
$return['descripBarcode'] = is_null($sqlreturn['popDialogBox_barcode']) ? '' : PUBLIC_USER_IMG_PATH.$sqlreturn['popDialogBox_barcode'];
$return['descripLogo'] = is_null($sqlreturn['popDialogBox_logo']) ? PUBLIC_IMG_PATH.LOGO_BLACK_BG : PUBLIC_USER_IMG_PATH.$sqlreturn['popDialogBox_logo'];
$return['toolsBg'] = is_null($sqlreturn['popDialogBox_toolsBg']) ? '' : PUBLIC_USER_IMG_PATH.$sqlreturn['popDialogBox_toolsBg'];

//设置8个工具按钮的图标、名称、链接
$tools = array();
for ($i = 1; $i <= 8; $i++) {
  $tools[$i] = array(
    'img' => is_null($sqlreturn['popDialogBox_toolImg'.$i]) ? PUBLIC_IMG_PATH.$defaultToolsImg[$i - 1] : PUBLIC_USER_IMG_PATH.$sqlreturn['popDialogBox_toolImg'.$i],
    'text' => is_null($sqlreturn['popDialogBox_toolText'.$i]) ? "默认文字" : $sqlreturn['popDialogBox_toolText'.$i],
    'url' => is_null($sqlreturn['popDialogBox_toolUrl'.$i]) ? DEFAULT_GOTO_HREF : $sqlreturn['popDialogBox_toolUrl'.$i]
  );
}
$return['tools'] = $tools;

//标记为执行成功
$return['status']['success'] = true;

// sleep(1); //休眠1秒
$return['status']['spendTime'] = microtime (true) - $start; //输出处理耗时 秒

echo json_encode($return);
return;
?>