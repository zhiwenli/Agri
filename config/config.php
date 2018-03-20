<?php

//系统配置

//设置时区
date_default_timezone_set("Asia/Shanghai");

//database
define("DB_USER", "ecnu");
define("BD_PWD", "ecnu2016");
define("DB_NAME", "Agri");

//mail
define('MAIL_HOST', 'smtp.163.com');
define('MAIL_ADDRESS', 'lizhiwen_xyz@163.com');
define('MAIL_PWD', 'wyzse121');

//CZML config
define("CZML_ENTITY_CONFIG", json_encode(array(
  "billboard" => array(
      "width" => 40,
      "height"=> 40,
      "heightReference"=> "CLAMP_TO_GROUND",
      "verticalOrigin"=> "BOTTOM"
    ),

  "label" => array(
    'font' => 'bold 12pt monospace',
    "verticalOrigin" => "TOP",
    "pixelOffset" => array(
      "cartesian2" => [0, -50]
    ),
    "fillColor" => array(
      "rgba" => [255, 242, 58, 255] //金色
    ),

    "style" => "FILL_AND_OUTLINE",
    "heightReference"=> "CLAMP_TO_GROUND",
    "verticalOrigin"=> "BOTTOM"
  )
)));

//分级显示
//不同级别图标完整出现时的视距距离,单位为米
define("BILLBOARD_ENTIRELY_DISPLAY_DISTANCE", json_encode(array(
  'nation' => 6.0e7,
  'provience' => 3.5e6,
  'city' => 2.2e6,
  'county' => 5.5e5
  )));
//完全显示前大小、透明度的渐变距离
define("BILLBOARD_DISPLAY_BUFFER_DISTANCE", 2.0e6);


//路径
define('PUBLIC_IMG_PATH', '/public/img/');
define('PUBLIC_TEMP_IMG_PATH', '/public/img/temp/'); //临时图片路径
define('PUBLIC_USER_IMG_PATH', '/public/img/userImg/');
define('CURRENT_DATA', dirname(__FILE__).'/../data/current/'); //curent 数据目录

define('ROOT_PATH', '/data/wwwroot/default'); //网站根目录


//数据库备份路径
define('DB_BACKUP_PATH', '/data/wwwroot/default/backup/DB/');


//定义默认跳转位置
define('DEFAULT_GOTO_HREF', 'http://www.bdsvv.com/');

//logo图片
define('LOGO', 'logo.png');
define('LOGO_BLACK_BG', 'logo-blackBg.jpg');

//实体类型值
define('YBJP', 1);
define('ZY', 2);
define('NC', 3);
define('JD', 4);
define('YXWD', 11);
define('AX', 12);
define('DW', 13);
define('GR', 14);
define('VSAT', 21);

//实体的默认图标
define('DEFAULT_SPECIALITY_YBJP_IMG', 'default_speciality_YBJP_img.png');
define('DEFAULT_SPECIALITY_ZY_IMG', 'default_speciality_ZY_img.png');
define('DEFAULT_SPECIALITY_NC_IMG', 'default_speciality_NC_img.png');
define('DEFAULT_SPECIALITY_JD_IMG', 'default_speciality_JD_img.png');
define('DEFAULT_STATION_YXWD_IMG', 'default_station_YXWD_img.png');
define('DEFAULT_STATION_AX_IMG', 'default_station_AX_img.png');
define('DEFAULT_STATION_DW_IMG', 'default_station_DW_img.png');
define('DEFAULT_STATION_GR_IMG', 'default_station_GR_img.png');
define('DEFAULT_SATELLITE_VSAT_IMG', 'default_satellite_VSAT_img.png');

//弹窗选项栏默认图标
define('DEFAULT_SPECIALITY_TOOLS_IMG', json_encode(array(
  'srfrvfdfsdf.png',
  'fdsctrwstbe.png',
  'qweSD1ewewGe.png',
  'dfaswhgfe980.png',
  '4vjmkuaw.png',
  'rv34rv3warvwe.png',
  'rvaeravwerverw.png',
  '46bfghfgh3464.png',
)));

define('DEFAULT_STATION_TOOLS_IMG', json_encode(array(
  '45ynssdfave.png',
  '43wt4bsdf.png',
  'ereby6sw.png',
  'sdfsrtnbrt34.png',
  '6sdfmu56.png',
  'yy6ysdfs65.png',
  'ewrfabwer.png',
  'warabwer.png'
)));

define('DEFAULT_SATELLITE_TOOLS_IMG', json_encode(array(
  'q4bgfhb436.png',
  'abvertbr.png',
  'awsef20juy.png',
  'y4sdfgb5y5.png',
  'aesdfrvw.png',
  'erwervawer235v.png',
  'asdwervarve.png',
  'ervwervw.png'
)));


//系统名称
define('MS_NAME', '北斗农业·中国');
define('DOMAIN_NAME', 'http://www.bdnyzg.com');
define('MANAGE_PATH', '/view/engine/');


//审核状态
define('CHECK_STATUS_REFUSE', 0);
define('CHECK_STATUS_TEMP', 5);
define('CHECK_STATUS_WAITTING', 10);
define('CHECK_STATUS_PASS', 20);

//用户角色
define("ADMIN", 10);
define("KEYBOARDER", 100);


define('ENTITY_ATTR_DB_COLUMNS', json_encode(array(
    'entity_id',
    'type_id',
    'create_by',
    'last_modify',
    'status',
    'name',
    'level',
    'province',
    'city',
    'district',
    'lat',
    'lng',
    'icon',
    'key_words',
    'popDialogBox_title',
    'popDialogBox_govImg',
    'popDialogBox_govUrl',
    'popDialogBox_descBg',
    'popDialogBox_descUrl',
    'popDialogBox_descText1',
    'popDialogBox_descText2',
    'popDialogBox_descIcon',
    'popDialogBox_2dBarcode',
    'popDialogBox_barcode',
    'popDialogBox_logo',
    'popDialogBox_toolImg1',
    'popDialogBox_toolText1',
    'popDialogBox_toolUrl1',
    'popDialogBox_toolImg2',
    'popDialogBox_toolText2',
    'popDialogBox_toolUrl2',
    'popDialogBox_toolImg3',
    'popDialogBox_toolText3',
    'popDialogBox_toolUrl3',
    'popDialogBox_toolImg4',
    'popDialogBox_toolText4',
    'popDialogBox_toolUrl4',
    'popDialogBox_toolImg5',
    'popDialogBox_toolText5',
    'popDialogBox_toolUrl5',
    'popDialogBox_toolImg6',
    'popDialogBox_toolText6',
    'popDialogBox_toolUrl6',
    'popDialogBox_toolImg7',
    'popDialogBox_toolText7',
    'popDialogBox_toolUrl7',
    'popDialogBox_toolImg8',
    'popDialogBox_toolText8',
    'popDialogBox_toolUrl8'
  )));

define('USER_ATTR_DB_COLUMNS', json_encode(array(
  'user_id',
  'name',
  'email',
  'pwd',
  'tel',
  'dept',
  'role',
  'last_login',
  'forgot_password'
  )));

//日志文件
define('PHP_LOG_FILE', "/data/wwwroot/default/log/phpLog");


//登录有效期,秒
define('LOGIN_VALIDITY', 3600*0.5);

//num of records in one page
define('NUM_OF_RECORD_IN_PAGE', 10);
