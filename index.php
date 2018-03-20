<?php
header("Content-Type:text/html; charset=utf8");
date_default_timezone_set('prc'); //设置默认时区
require_once 'model/visitorMsg.fun.php';

$ss = $_SERVER["HTTP_REFERER"]; //获得访问来源URL

$timeStamp = time();
$datetime = date('Y-m-d H:i:s',$timeStamp);
$ip = getIP();
$adr = Getaddress($ip);
$brow = GetBrowser();
$OS = GetOs();
$isMobile = isMobile();
$deviceDetail = mobile_cate();


//河南临时访问控制
$ip_ = strstr($ip, 0, 7);
if ($ip_ == strstr('123.149.206.228', 0, 7)) {
	header("Location: /t/view/p-index.php");
}
   
// $id = getLastInsertId();

//判断用户是电脑登陆还是手机登陆
if ($isMobile == 0) {  header("Location: /view/p-index.php");
}elseif ($isMobile == 1) {  header("Location: /view/m-index.php");
}else{
  echo '抱歉，网页发生了异常，请联系管理员 hi@zhiwenli.com 修复';
  exit;
}

?>