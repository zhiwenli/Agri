<?php

//返回用户IP地址
function getIP() 
{ 
global $ip; 

if (getenv("HTTP_CLIENT_IP")) 
$ip = getenv("HTTP_CLIENT_IP"); 
else if(getenv("HTTP_X_FORWARDED_FOR")) 
$ip = getenv("HTTP_X_FORWARDED_FOR"); 
else if(getenv("REMOTE_ADDR")) 
$ip = getenv("REMOTE_ADDR"); 
else 
$ip = "Unknow"; 

return $ip; 
}

////获得访客浏览器类型
function GetBrowser(){
	if(!empty($_SERVER['HTTP_USER_AGENT'])){
		$br = $_SERVER['HTTP_USER_AGENT'];
		if (preg_match('/MSIE/i',$br)) {    
			$br = 'MSIE';
		}elseif (preg_match('/Firefox/i',$br)) {
			$br = 'Firefox';
		}elseif (preg_match('/Chrome/i',$br)) {
			$br = 'Chrome';
		}elseif (preg_match('/Safari/i',$br)) {
			$br = 'Safari';
		}elseif (preg_match('/Opera/i',$br)) {
			$br = 'Opera';
		}else {
			$br = 'Other';
		}
		return $br;
	}else{return "";} 
}

////获得访客浏览器语言
function GetLang(){
	if(!empty($_SERVER['HTTP_ACCEPT_LANGUAGE'])){
		$lang = $_SERVER['HTTP_ACCEPT_LANGUAGE'];
		$lang = substr($lang,0,5);
		if(preg_match("/zh-cn/i",$lang)){
			$lang = "简体中文";
		}elseif(preg_match("/zh/i",$lang)){
			$lang = "繁体中文";
		}else{
			$lang = "English";
		}
		return $lang;

	}else{return "获取浏览器语言失败！";}
}

////获取访客操作系统
function GetOs(){
	if(!empty($_SERVER['HTTP_USER_AGENT'])){
		$OS = $_SERVER['HTTP_USER_AGENT'];
		if (preg_match('/win/i',$OS)) {
			$OS = 'Windows';
		}elseif (preg_match('/mac/i',$OS)) {
			$OS = 'MAC';
		}elseif (preg_match('/linux/i',$OS)) {
			$OS = 'Linux';
		}elseif (preg_match('/unix/i',$OS)) {
			$OS = 'Unix';
		}elseif (preg_match('/bsd/i',$OS)) {
			$OS = 'BSD';
		}else {
			$OS = 'Other';
		}
		return $OS;  
	}else{return "获取访客操作系统信息失败！";}   
}

////获得访客真实ip
function _Getip(){
		if(!empty($_SERVER["HTTP_CLIENT_IP"])){   
			$ip = $_SERVER["HTTP_CLIENT_IP"];
		}
	   if(!empty($_SERVER['HTTP_X_FORWARDED_FOR'])){ //获取代理ip
	   	$ips = explode(',',$_SERVER['HTTP_X_FORWARDED_FOR']);
	   }
	   if($ip){
	   	$ips = array_unshift($ips,$ip); 
	   }
	   
	   $count = count($ips);
	   for($i=0;$i<$count;$i++){   
	     if(!preg_match("/^(10|172\.16|192\.168)\./i",$ips[$i])){//排除局域网ip
	     	$ip = $ips[$i];
	     	break;    
	     }  
	 }  
	 $tip = empty($_SERVER['REMOTE_ADDR']) ? $ip : $_SERVER['REMOTE_ADDR']; 
	   if($tip=="127.0.0.1"){ //获得本地真实IP
	   	return get_onlineip();   
	   }else{
	   	return $tip; 
	   }
	}

	  ////获得本地真实IP
	function get_onlineip() {
		$mip = file_get_contents("http://city.ip138.com/city0.asp");
		if($mip){
			preg_match("/\[.*\]/",$mip,$sip);
			$p = array("/\[/","/\]/");
			return preg_replace($p,"",$sip[0]);
		}else{return "获取本地IP失败！";}
	}

	  ////根据ip获得访客所在地地名
	function Getaddress($ip=''){
		if(empty($ip)){
			$ip = _Getip();    
		}
		$ipadd = file_get_contents("http://int.dpool.sina.com.cn/iplookup/iplookup.php?ip=".$ip);//根据新浪api接口获取
		if($ipadd){
	   		$charset = iconv("gbk","utf-8",$ipadd);
	   		preg_match_all("/[\x{4e00}-\x{9fa5}]+/u",$charset,$ipadds);

	   	 // $ipadds;   //一个二维数组
	 	  	$adr="";
	  	 	foreach ($ipadds as $key) {
		   		foreach ($key as $key1) {
		   			$adr = $adr.$key1;
		   		}
	   			return $adr;
			} 
		}else{
			return "查找地名失败";
		} 
	}


//判断用户是否手机登陆
function isMobile(){  
	$useragent=isset($_SERVER['HTTP_USER_AGENT']) ? $_SERVER['HTTP_USER_AGENT'] : '';  
	$useragent_commentsblock=preg_match('|\(.*?\)|',$useragent,$matches)>0?$matches[0]:'';  	  

	//php中函数可以嵌套
	function CheckSubstrs($substrs,$text){  
		foreach($substrs as $substr)  
			if(false!==strpos($text,$substr)){  
				return true;  
			}  
			return false;  
	}
	$mobile_os_list=array('Google Wireless Transcoder','Windows CE','WindowsCE','Symbian','Android','armv6l','armv5','Mobile','CentOS','mowser','AvantGo','Opera Mobi','J2ME/MIDP','Smartphone','Go.Web','Palm','iPAQ','iOS');
	$mobile_token_list=array('Profile/MIDP','Configuration/CLDC-','160×160','176×220','240×240','240×320','320×240','UP.Browser','UP.Link','SymbianOS','PalmOS','PocketPC','SonyEricsson','Nokia','BlackBerry','Vodafone','BenQ','Novarra-Vision','Iris','NetFront','HTC_','Xda_','SAMSUNG-SGH','Wapaka','DoCoMo','iPhone','iPod','iPad');  
		  
	$found_mobile=CheckSubstrs($mobile_os_list,$useragent_commentsblock) ||  
			  CheckSubstrs($mobile_token_list,$useragent);  
		  
	if ($found_mobile){  
		return "1";  
	}else{
		return "0";
	}
}

//得到用户手机详细信息
function mobile_cate() {
	$user_agent = $_SERVER['HTTP_USER_AGENT'];
	return $user_agent;
}


?>