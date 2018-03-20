<?php
//临时图片文件清理 /public/img/temp/
//无记录图片清理 /public/img/user/
//数据库备份


class SystemMgr
{
  
  function __construct()
  {
    # code...
  }

  //临时图片清理
  function tempImgClear(){
    $files = self::getFilesInDir(ROOT_PATH.PUBLIC_TEMP_IMG_PATH);
    echo("Start to delete some temp image!<br>");
    echo(ROOT_PATH.PUBLIC_TEMP_IMG_PATH."<br>");

    $i = 0;
    foreach ($files as $key => $filename) {
      //delete
      unlink(ROOT_PATH.PUBLIC_TEMP_IMG_PATH.$filename);
      $i++;
      echo($filename.' --------------------------> deleted.<br>');
    }
    echo($i.' files have been deleted.<br>');
  }

  //无记录图片清理
  function noRecordImgClear(){
    $allImg = array('' > '');

    $tableList = array('user', 'speciality', 'station', 'satellite');

    $mysql = new Mysql();

    foreach ($tableList as $index => $table) {
      $mysql->select($table);
      $result = $mysql->fetchArray(MYSQL_ASSOC);
      if ($result['success']) {
        foreach ($result['result_array'] as $key => $row) {
          foreach ($row as $key => $value) {
            $allImg[$value] = null;
          }
          
        }
      }
    }

    $files = self::getFilesInDir(ROOT_PATH.PUBLIC_USER_IMG_PATH);

    echo("Start to delete some image which not record in database!<br>");
    echo(ROOT_PATH.PUBLIC_USER_IMG_PATH."<br>");

    $i = 0;
    foreach ($files as $key => $filename) {
      if(array_key_exists($filename, $allImg)){
        //echo($filename.'   --------------------------> exist.<br>');
      }else{
        echo($filename.' --------------------------> deleted.<br>');

        //delete
        unlink(ROOT_PATH.PUBLIC_USER_IMG_PATH.$filename);
        $i++;
      }
    }

    echo($i.' files have been deleted.<br>');
    
  }

  //数据库备份
  function mySQLBackup(){
    $file = DB_BACKUP_PATH.'db.sql';

    //调用系统命令执行
    $cfg_dbuser = DB_USER;
    $cfg_dbpwd = BD_PWD;
    $cfg_dbname = DB_NAME;
    echo $str = "mysqldump -u".$cfg_dbuser." -p".$cfg_dbpwd." ".$cfg_dbname." > ".$file; //有问题，生成的文件老是为空，已使用crontab命令替代
    $x = exec($str);
    echo($x);
  }


  //遍历文件夹
  private function getFilesInDir($dir){

  //PHP遍历文件夹下所有文件 
  $handle=opendir($dir.".");
  
  //定义用于存储文件名的数组
  $array_file = array();

  while (false !== ($file = readdir($handle))) 
  { 
    if ($file != "." && $file != "..") {
      $array_file[] = $file;
    }
  }

  closedir($handle);
  return $array_file;
  }

}

