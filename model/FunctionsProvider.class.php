<?php
//提供功能独立的功能函数

class FP{

  //判断一个值为null或‘’
  public static function noContent($var){
    if(is_null($var) || $var === ''){
      return true;
    }
  }

  //数组中不存在该键，或存在当键值为空
  public static function keyNotExitOrNoContent($key, $arr){
    if(!array_key_exists($key, $arr) || self::noContent($arr[$key])){
      return true;
    }else{
      return false;    
    }
  }

  //获得当前日期时间（Mysql datetime格式）
  public static function getDatetime(){
    $l = localtime();
    $date = ($l[5]+1900).'-'.($l[4]+1).'-'.$l[3].' '.$l[2].':'.$l[1].':'.$l[0];
    return $date;
  }

  //根据entity类型(type_id)获取数据库表名
  public static function getTableName($type_id){
    $tableName = '';

    if($type_id == YBJP || $type_id == ZY || $type_id == NC || $type_id == JD){
      $tableName = "speciality";
    }elseif($type_id == YXWD || $type_id == AX || $type_id == DW || $type_id == GR){
      $tableName = "station";
    }elseif($type_id == VSAT) {
      $tableName = "satellite";
    }else{
      FP::putLog('未根据type_id找到数据库表名');
    }

    return $tableName;
  }

  public static function putLog($content){
    $file = PHP_LOG_FILE;

    $content = self::getDatetime()." ==> ".$content.PHP_EOL;

    file_put_contents($file, $content, FILE_APPEND);

  }

  //检查entity类型是否存在
  public static function entityTypeIdExist($type_id){
    if ($type_id == YBJP ||
        $type_id == ZY ||
        $type_id == NC ||
        $type_id == JD ||
        $type_id == YXWD ||
        $type_id == AX ||
        $type_id == DW ||
        $type_id == GR ||
        $type_id == VSAT){
      return true;
    }else{
      return false;
    }
  }

  public static function EntityTypeId2TypeName($type_id){
    $typeName = '';
    if ($type_id === YBJP) {
      $typeName = 'YBJP';
    }elseif ($type_id === ZY) {
      $typeName = 'ZY';
    }elseif ($type_id === NC) {
      $typeName = 'NC';
    }elseif ($type_id === JD) {
      $typeName = 'JD';
    }elseif ($type_id === YXWD) {
      $typeName = 'YXWD';
    }elseif ($type_id === AX) {
      $typeName = 'AX';
    }elseif ($type_id === DW) {
      $typeName = 'DW';
    }elseif ($type_id === GR) {
      $typeName = 'GR';
    }elseif ($type_id === VSAT) {
      $typeName = 'VSAT';
    }

    return $typeName;
  }

  //返回默认页面
  public static function gotoDefaultPage($delay=0){
    sleep($delay);                                                      //seconds
    header("Location: ".DOMAIN_NAME); 
    exit;                                                               //确保重定向h后代码不会继续执行
  }


  //检查经度范围
  public static function checkLongtitude($lng){
    if ($lng > 180 || $lng < -180) {
      return false;
    }else{
      return true;
    }
  }

  //检查维度值范围
  public  static function checkLatitude($lat){
    if ($lat > 90 || $lat < -90) {
      return false;
    }else{
      return true;
    }
  }

  //验证邮箱格式
  public static function checkEmailFormat($email){ 
    $reg='/^\w[-\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\.)+[A-Za-z]{2,14}$/'; 
    if(preg_match($reg,$email)){
      return true; 
    }
    return false; 
  }

  //验证手机号码格式
  public static function checkTelFormat($tel){ 
    $reg='/^1[34578]{1}\d{9}$/';
    if(preg_match($reg,$tel)){
      return true;
    }
    return false;
  }

  //登录确认及引导
  public static function logingConfirmAndGuidance(){
    $user = new User();
    if (!$user->isLogin()) {
      header("Location: http://www.bdnyzg.com/view/engine/login.php"); 
      exit(0);
    }
  }

  //用于输出页面左边栏是否展开或选中的CSS class
  public static function isUnfold($activeBar, $firstLevel, $secondLevel=0){
    if($activeBar[0] === $firstLevel && $secondLevel === 0){
      echo 'class="active"';
    }elseif($activeBar[0] === $firstLevel && $secondLevel === $activeBar[1]){
      echo 'class="active"';
    }
  }

  //随机字符串发生器
  public static function getRandChar($length=8){
   $str = null;
   $strPol = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789abcdefghijklmnopqrstuvwxyz";
   $max = strlen($strPol)-1;

   for($i=0;$i<$length;$i++){
    usleep(rand(500,15000));
    $str.=$strPol[rand(0,$max)];//rand($min,$max)生成介于min和max两个数之间的一个随机整数
   }
   return $str;
  }

  //修改文件名字符串中的文件名（不影响后缀）
  public static function createUploadFileName($fileName){
    return time().'_'.self::getRandChar().'.'.substr($fileName, strrpos($fileName, '.') + 1);
  }

  public static function getReadabilityUserRole($role){
    $str = "";
    if ($role == 100) {
      $str = "录入员";
    }elseif($role == 10){
      $str = "审核员";
    }
    return $str;
  }

  public static function getReadabilityType($type){
    $str = "";
    if ($type == 1) {
      $str = "宇宝";
    }elseif($type == 2){
      $str = "庄园";
    }elseif($type == 3){
      $str = "农场";
    }elseif($type == 4){
      $str = "基地";
    }elseif($type == 11){
      $str = "网点";
    }elseif($type == 12){
      $str = "爱心";
    }elseif($type == 13){
      $str = "单位";
    }elseif($type == 14){
      $str = "个人";
    }elseif($type == 21){
      $str = "VSAT";
    }
    return $str;
  }

  public static function getReadabilityTableName($tableName){
    $str = "";
    if ($tableName == 'speciality') {
      $str = "精品";
    }elseif($tableName == 'station'){
      $str = "站点";
    }elseif($tableName == 'satellite'){
      $str = "基站";
    }
    return $str;
  }

  public static function getReadabilityLevel($level){
    $str = "";
    if ($level == 0) {
      $str = "国家";
    }elseif($level == 10){
      $str = "省";
    }elseif($level == 20){
      $str = "市";
    }elseif($level == 30){
      $str = "县/区";
    }
    return $str;
  }

  public static function getDefaultTypeIcon($type_id){
    $icon = '';
    if ($type_id === YBJP) {
      $icon = DEFAULT_SPECIALITY_YBJP_IMG;
    }elseif ($type_id === ZY) {
      $icon = DEFAULT_SPECIALITY_ZY_IMG;
    }elseif ($type_id === NC) {
      $icon = DEFAULT_SPECIALITY_NC_IMG;
    }elseif ($type_id === JD) {
      $icon = DEFAULT_SPECIALITY_JD_IMG;
    }elseif ($type_id === YXWD) {
      $icon = DEFAULT_STATION_YXWD_IMG;
    }elseif ($type_id === AX) {
      $icon = DEFAULT_STATION_AX_IMG;
    }elseif ($type_id === DW) {
      $icon = DEFAULT_STATION_DW_IMG;
    }elseif ($type_id === GR) {
      $icon = DEFAULT_STATION_GR_IMG;
    }elseif ($type_id === VSAT) {
      $icon = DEFAULT_SATELLITE_VSAT_IMG;
    }else{
      //无法确定图层类型时使用宇宝精品图标
      $defaultIconPath = DEFAULT_SPECIALITY_YBJP_IMG;
    }
    return $icon;
  }

  public static function getReadabilityStatus($status){
    $str = "";
    if ($status == CHECK_STATUS_REFUSE) {
      $str = "已退回";
    }elseif($status == CHECK_STATUS_WAITTING){
      $str = "待审核";
    }elseif($status == CHECK_STATUS_TEMP){
      $str = "待提交";
    }elseif($status == CHECK_STATUS_PASS){
      $str = "已上线";
    }
    return $str;
  }

  //发呀么发邮件啊
  public static function sendEmail($data){

    //配置发件人信息
    $conf['Host'] = MAIL_HOST;
    $conf['Port'] = 25;
    $conf['From'] = MAIL_ADDRESS;
    $conf['FromName'] = "北斗农业·中国";
    $conf['UserName'] = substr(MAIL_ADDRESS, 0, strpos(MAIL_ADDRESS, '@'));
    $conf['Password'] = MAIL_PWD;

    $body=$data['body'];

    $mail=new PHPMailer();//得到一个PHPMailer实例
    //$mail->SMTPSecure='tls';
    $mail->CharSet="utf-8"; //设置编码
    $mail->IsSMTP();//设置采用SMTP方式发送邮件
    $mail->Host=$conf['Host'];//设置SMTP邮件服务器的地址
    $mail->Port=$conf['Port'];//设置邮件服务器的端口，默认为25
    $mail->From=$conf['From']; //设置发件人的邮箱地址
    $mail->FromName=$conf['FromName'];//设置发件人的姓名
    $mail->Username=$conf['UserName'];
    $mail->Password=$conf['Password'];
    $mail->AddAddress($data['addresseeAddr'], $data['addresseeName']);//设置收件的地址(参数1)和姓名(参数2)
    $mail->SMTPAuth=true;//开启SMTP认证
    $mail->Subject=$data['subject'];//设置邮件的标题
    //$mail->AltBody="text/html";
    $mail->Body=$body;//邮件内容
    $mail->IsHTML(true);//设置内容是否为html类型
    //$mail->WordWrap=50;      //设置每行的字符数
    //$mail->AddReplyTo("samzhang@tencent.com","samzhang");     //设置回复的收件人的地址

    $mail->SMTPDebug=1;
    if($mail->Send()){//发送邮件
      return true;
    }else{
      return false;
    }
  }

  /*修改字符串键值对中的键值，用于将URL中的某参数设为某值,传入URL ？后字符串，若字符串中不存在key参数将添加*/
  function url_set_value($url,$key,$value){
    parse_str($url, $output);

    $output[$key] = $value;

    return http_build_query($output); 
  }

}