<?php

//数据库连接类
class Mysql {

     private $db_host;       //数据库主机
     private $db_user;       //数据库登陆名
     private $db_pwd;        //数据库登陆密码
     private $db_name;       //数据库名
     private $db_charset;    //数据库字符编码
     private $db_pconn;      //长连接标识位
     private $debug;         //调试开启
     private $conn;          //数据库连接标识
     private $state = array();      //数据库操纵信息

 //    private $sql = "";      //待执行的SQL语句

     public function __construct(){
        $this->db_host = 'localhost';
        $this->db_user = DB_USER;
        $this->db_pwd = BD_PWD;
        $this->db_name = DB_NAME;
        $this->db_charset = 'utf8';
        $this->db_pconn = false;
        $this->result = '';
        $this->debug = true;
        $this->initConnect();
     }

     // public function __construct($db_host, $db_user, $db_pwd, $db_name, $db_chaeset = 'utf8', $db_pconn = false, $debug = false) {
     //     $this->db_host = $db_host;
     //     $this->db_user = $db_user;
     //     $this->db_pwd = $db_pwd;
     //     $this->db_name = $db_name;
     //     $this->db_charset = $db_chaeset;
     //     $this->db_pconn = $db_pconn;
     //     $this->result = '';
     //     $this->debug = $debug;
     //     $this->initConnect();
     // }

     public function initConnect() {
         if ($this->db_pconn) {
             $this->conn = @mysql_pconnect($this->db_host, $this->db_user, $this->db_pwd);
         } else {
             $this->conn = @mysql_connect($this->db_host, $this->db_user, $this->db_pwd);
         }
         if ($this->conn) {
             $this->query("SET NAMES " . $this->db_charset);
         } else {
             $this->state['success'] = false;
             $this->state['msg'] = "数据库连接出错，错误编号：" . mysql_errno() . "错误原因：" . mysql_error();
         }
         FP::getRandChar(20);
         $this->selectDb($this->db_name);
     }

     public function selectDb($dbname) {
         if ($dbname == "") {
             $this->db_name = $dbname;
         }
         if (!mysql_select_db($this->db_name, $this->conn)) {
             $this->state['success'] = false;
             $this->state['msg'] = "数据库不可用";
         }
     }

     public function query($sql, $debug = false) {
         if (!$debug) {
             $this->result = @mysql_query($sql, $this->conn);
         } else {

         }
         if ($this->result == false) {
            $this->state['success'] = false;
            $this->state['msg'] = "sql执行出错，错误编号：" . mysql_errno() . "错误原因：" . mysql_error() . "错误语句：" . $sql;
         }else{
            $this->state['success'] = true;
         }

     }

     public function select($tableName, $columnName = "*", $where = "") {
         $sql = "SELECT " . $columnName . " FROM " . $tableName;
         $sql .= $where ? " WHERE " . $where : null;
         $this->query($sql);
     }

     public function findAll($tableName) {
         $sql = "SELECT * FROM $tableName";
         $this->query($sql);
     }

     public function insert($tableName, $column = array()) {
         $columnName = "";
         $columnValue = "";
         foreach ($column as $key => $value) {
             $columnName .= $key . ",";
             $columnValue .= "'" . $value . "',";
         }
         $columnName = substr($columnName, 0, strlen($columnName) - 1);
         $columnValue = substr($columnValue, 0, strlen($columnValue) - 1);
         $sql = "INSERT INTO $tableName($columnName) VALUES($columnValue)";
         $this->query($sql);
         if($this->result){
            $this->state['success'] = true;
            $this->state['msg'] = "数据插入成功";
            $this->state['insert_id'] = mysql_insert_id($this->conn);
         }
     }

     public function update($tableName, $column = array(), $where = "") {
         $updateValue = "";
         foreach ($column as $key => $value) {
             $updateValue .= $key . "='" . $value . "',";
         }
         $updateValue = substr($updateValue, 0, strlen($updateValue) - 1);
         $sql = "UPDATE $tableName SET $updateValue";
         $sql .= $where ? " WHERE $where" : null;
         $this->query($sql);
         if($this->result){
            $this->state['success'] = true;
             $this->state['msg'] = "数据更新成功";
             $this->state['affected_rows'] = mysql_affected_rows($this->conn);
         }
     }

     public function delete($tableName, $where = ""){
         $sql = "DELETE FROM $tableName";
         $sql .= $where ? " WHERE $where" : null;
         $this->query($sql);
         if($this->result){
            $this->state['success'] = true;
            $this->state['msg'] = "数据删除成功";
            $this->state['affected_rows'] = mysql_affected_rows($this->conn);
         }
     }

     public function fetchArray($result_type = MYSQL_BOTH){
         $resultArray = array();
         $i = 0;
         if ($this->result) {
            while($result = mysql_fetch_array($this->result, $result_type)){
              $resultArray[$i] = $result;
              $i++;
            }
            $this->state['result_array'] = $resultArray;
         }
         
         return $this->state;
     }

     //$satte中包含操作成功状态，错误提示、操作结果
     public function getMessage(){
         return $this->state;
     }

     public function freeResult(){
         @mysql_free_result($this->result);
     }

    //注销析构函数，貌似会带来报错
     // public function __destruct() {
     //     if(!empty($this->result)){
     //         $this->freeResult();
     //     }
     //     mysql_close($this->conn);
     // }
 }
 

 /* 操作示例
  //select    查
 $db->select("user", "*", "username = 'system'");
 $result = $db->fetchArray(MYSQL_ASSOC);
 print_r($result);
 dump($db->printMessage());

 //insert    增
 //$userInfo = array('username'=>'system', 'password' => md5("system"));
 //$db->insert("user", $userInfo);
 //dump($db->printMessage());

 //update    改
 //$userInfo = array('password' => md5("123456"));
 //$db->update("user", $userInfo, "id = 2");
 //dump($db->printMessage());

 //delete    删
 //$db->delete("user", "id = 1");
 //dump($db->printMessage());

 //findAll   查询全部
 $db->findAll("user");
 $result = $db->fetchArray();
 dump($result);
 */