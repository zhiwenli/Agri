<?php

//用户状态处理
class User{
  private $db;                                                             //数据库操作对象

  function __construct(){
    $this->db = new Mysql();

    //设置SESSION过期时间
    ini_set('session.gc_maxlifetime', LOGIN_VALIDITY);
    if(!isset($_SESSION)){
      session_start();
    }
  }

  public function isLogin(){
    if (!isset($_SESSION) || FP::keyNotExitOrNoContent('user_id', $_SESSION)) {
      return false;
    }else{
      return true;
    }
  }

  //获取当前登录的用户信息，若未指定字段则返回全部信息，返回空表示未登录
  public function getCurrentUserMsg($key = null){

    if(!self::isLogin()){return null;}

    $userMsg = array();
    $userMsg = $_SESSION;
 
    if(FP::noContent($key)){
      return $userMsg;
    }else{
      return $userMsg[$key];
    }
  }

  //根据ID获取用户信息
  public function getUserMsgById($id){
    $this->db->select('user', "*", "user_id=".$id);
    $sqlState = $this->db->fetchArray(MYSQL_ASSOC);

    if (count($sqlState['result_array']) > 0) {
      return $sqlState['result_array'][0];
    }else{
      return array();
    }
  }

  //根据邮箱获取用户信息
  public function getUserMsgByEmail($email){
    $this->db->select('user', "*", "email='".$email."'");
    $sqlState = $this->db->fetchArray(MYSQL_ASSOC);

    if (count($sqlState['result_array']) > 0) {
      return $sqlState['result_array'][0];
    }else{
      return array();
    }
  }

  //获取全部用户信息
  public function getUserAttrArr(){
    $this->db->select('user', "*", " user_id>0 order by user_id DESC");  //逆序
    $sqlState = $this->db->fetchArray(MYSQL_ASSOC);

    if (count($sqlState['result_array']) > 0) {
      return $sqlState['result_array'];
    }else{
      return array();
    }
  }

  //注册
  public function register($userAttrArr){
    $state = array();

    $userAttrArr = $this->userAttrFilter($userAttrArr);

    $state = $this->insertCheck($userAttrArr);
    if (!$state['status']['success']) {
      return $state;
    }

    $state = $this->insertUniqueTest($userAttrArr);
    if (!$state['status']['success']) {
      return $state;
    }

    $userAttrArr = $this->setDefaultValue($userAttrArr);

    //insert
    $this->db->insert('user', $userAttrArr);
    $sqlResult = $this->db->getMessage();

    $state['status']['success'] = $sqlResult['success'];
    $state['status']['msg'] = $sqlResult['msg'];

    return $state;
  }

  //修改用户信息
  public function updateUser($userAttrArr){
    $state = array();

    $userAttrArr = $this->userAttrFilter($userAttrArr);

    $state = $this->updateCheck($userAttrArr);
    if (!$state['status']['success']) {
      return $state;
    }elseif (FP::keyNotExitOrNoContent('user_id', $userAttrArr)) {
      $state['status']['success'] = false;
      $state['status']['msg']['user_id'] = "用户ID为空";
      return $state;
    }

    $state = $this->updateUniqueTest($userAttrArr);
    if (!$state['status']['success']) {
      return $state;
    }

    if (array_key_exists('pwd', $userAttrArr)) {
      $userAttrArr['pwd'] = md5($userAttrArr['pwd']);
    }

    //update
    $this->db->update('user', $userAttrArr, 'user_id='.$userAttrArr['user_id']);
    $sqlResult = $this->db->getMessage();

    $state['status']['success'] = $sqlResult['success'];
    $state['status']['msg'] = $sqlResult['msg'];

    return $state;
  }

  //删除用户
  public function deleteUser($user_id){
    $state = array();

    $this->db->delete('user', "user_id='".$user_id."'");
    $sqlResult = $this->db->getMessage();

    if($sqlResult['success'] && $sqlResult['affected_rows'] > 0) {
      $state['status']['success'] = $sqlResult['success'];
      $state['status']['msg'] = $sqlResult['msg'];

      FP::putLog('用户'.$this->getCurrentUserMsg('user_id').'删除了用户'.$user_id);
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

  //登录
  public function login($userAttrArr){
    $state = array();
    $state['status']['success'] = false;

    if(FP::keyNotExitOrNoContent('email', $userAttrArr)){
      $state['status']['success'] = false;
      $state['status']['msg'] = '请输入账号名(邮箱)';
    }elseif(FP::keyNotExitOrNoContent('pwd', $userAttrArr)){
      $state['status']['success'] = false;
      $state['status']['msg'] = '请输入密码';
    }

    if($state['status']['success']) {return $state;}

    $userAttrArr['pwd'] = md5($userAttrArr['pwd']); 

    $this->db->select('user', "*", "email='".$userAttrArr['email']."' and pwd='".$userAttrArr['pwd']."'");
    $sqlState = $this->db->fetchArray(MYSQL_ASSOC);

    if ($sqlState['success']) {
      if(count($sqlState['result_array']) > 0){
        $this->loginSuccess($sqlState['result_array'][0]);                        //登陆成功
        $state['status']['success'] = true;
        $state['nextPage'] = DOMAIN_NAME.MANAGE_PATH;//
      }else{
        $state['status']['success'] = false;
        $state['status']['msg'] = '用户名或密码错误';
      }
    }else{
      $state['status']['success'] = false;
      $state['status']['msg'] = '内部数据库错误'.$sqlState['msg'];
      FP::putLog("数据库查询用户名密码出错，详情：".$sqlState['msg']);
    }

    return $state;
  }

  //自动登录
  public function autoLogin($userMsg){
    $this->loginSuccess($userMsg);
  }

  //登出
  public function logout(){
    if($_SESSION){
      session_destroy();                                                          //注销
      FP::putLog($_SESSION['user_id'].'~'.$_SESSION['name'].' 用户登出');
    }

    $state = array();
    $state['status']['success'] = true;
    $state['nextPage'] = MANAGE_PATH;

    return $state;
  }

  //忘记密码，发送召回邮件
  public function forgotPassword($userAttrArr){
    $state = array();

    if(FP::keyNotExitOrNoContent('email', $userAttrArr)){
      $state['status']['success'] = false;
      $state['status']['msg'] = '请输入邮箱';
      return $state;
    }

    $userMsg = self::getUserMsgByEmail($userAttrArr['email']);

    if (count($userMsg) == 0) {
      $state['status']['success'] = false;
      $state['status']['msg'] = '用户不存在';
      return $state;
    }

    $mailData = array();
    $mailData['addresseeAddr'] = $userMsg['email'];
    $mailData['addresseeName'] = $userMsg['name'];
    $mailData['subject'] = '北斗农业·中国 找回密码';

    $mark = ''.FP::getRandChar(20).'_'.time();
    $url = 'http://www.bdnyzg.com/view/engine/updateUser.php?mark='.$mark.'&user_id='.$userMsg['user_id'];

    $mailBody = '<a target="_blank" href="'.$url.'">重置密码</a><br>请点击以上链接重置密码，链接将在30分钟后失效。<br>若无法跳转请直接访问：'.$url.'<br><br>这是来自北斗农业·中国的重置密码邮件，若您未进行相关操作请忽略该邮件。';
    $mailData['body'] = $mailBody;

    FP::sendEmail($mailData);


    //记录url参数
    $para = array('forgot_password' => $mark);
    $this->db->update('user', $para, 'user_id='.$userMsg['user_id']);
    $sqlResult = $this->db->getMessage();

    $state['status']['success'] = $sqlResult['success'];
    $state['status']['msg'] = $sqlResult['msg'];

    return $state;
  }

  //清除传入为空的user属性值, 以及数据库中不存在的列
  private function userAttrFilter($userAttrArr){
    foreach ($userAttrArr as $key => $value) {
      if(!in_array($key, json_decode(USER_ATTR_DB_COLUMNS, true))){
        unset($userAttrArr[$key]);
      }

      if(FP::noContent($value)){
        unset($userAttrArr[$key]);
      }
    }
    return $userAttrArr;
  }

  //插入数据检查
  private function insertCheck($userAttrArr){
    $state = array();
    $state['status']['success'] = true;


    if(FP::keyNotExitOrNoContent('name', $userAttrArr)){
      $state['status']['success'] = false;
      $state['status']['msg']['name'] = '请填写姓名';
    }

    if(FP::keyNotExitOrNoContent('email', $userAttrArr)){
      $state['status']['success'] = false;
      $state['status']['msg']['email'] = '请填写邮箱';
    }elseif(!FP::checkEmailFormat($userAttrArr['email'])){
      $state['status']['success'] = false;
      $state['status']['msg']['email'] = '请填写正确的电子邮箱地址';
    }

    if (FP::keyNotExitOrNoContent('pwd', $userAttrArr)){
      $state['status']['success'] = false;
      $state['status']['msg']['pwd'] = '请填写密码';
    }elseif (strlen($userAttrArr['pwd']) < 8){
      $state['status']['success'] = false;
      $state['status']['msg']['pwd'] = '密码长度应不小于8位';
    }

    if (FP::keyNotExitOrNoContent('tel', $userAttrArr)){
      $state['status']['success'] = false;
      $state['status']['msg']['tel'] = '请填写手机号码';
    }elseif(!FP::checkTelFormat($userAttrArr['tel'])){
      $state['status']['success'] = false;
      $state['status']['msg']['tel'] = '请填写中国大陆地区11位移动电话号码';
    }

    if (FP::keyNotExitOrNoContent('dept', $userAttrArr)){
      $state['status']['success'] = false;
      $state['status']['msg']['dept'] = '请填写所属单位';
    }

    return $state;
  }

  //修改数据检查
  private function updateCheck($userAttrArr){
    $state = array();
    $state['status']['success'] = true;

    if(array_key_exists('email', $userAttrArr) && !FP::checkEmailFormat($userAttrArr['email'])){
      $state['status']['success'] = false;
      $state['status']['msg']['email'] = '请填写正确的电子邮箱地址';
    }

    if (array_key_exists('pwd', $userAttrArr) && strlen($userAttrArr['pwd']) < 8){
      $state['status']['success'] = false;
      $state['status']['msg']['pwd'] = '密码长度应不小于8位';
    }

    if(array_key_exists('tel', $userAttrArr) && !FP::checkTelFormat($userAttrArr['tel'])){
      $state['status']['success'] = false;
      $state['status']['msg']['tel'] = '请填写中国大陆地区11位移动电话号码';
    }

    return $state;
  }

  private function setDefaultValue($userAttrArr){
    $userAttrArr['role'] = 100;
    $userAttrArr['pwd'] = md5($userAttrArr['pwd']);
    return $userAttrArr;
  }

  private function insertUniqueTest($userAttrArr){
    $state = array();
    $state['status']['success'] = true;

    //检测邮箱
    $this->db->select('user', "user_id", "email='".$userAttrArr['email']."'");
    $sqlState = $this->db->fetchArray(MYSQL_ASSOC);

    if($sqlState['success']){
      if(count($sqlState['result_array']) > 0){
        $state['status']['success'] = false;
        $state['status']['msg']['email'] = '该邮箱已注册';
      }
    }else{
      FP::putLog('邮箱重复性检测出错，详情：'.$state['msg']);
    }

    //检测电话号码
    $this->db->select('user', "user_id", "tel='".$userAttrArr['tel']."'");
    $sqlState = $this->db->fetchArray(MYSQL_ASSOC);

    if($sqlState['success']){
      if(count($sqlState['result_array']) > 0){
        $state['status']['success'] = false;
        $state['status']['msg']['tel'] = '该号码已注册';
      }
    }else{
      FP::putLog('电话重复性检测出错，详情：'.$sqlState['msg']);
    }

    return $state;
  }

  //修改的唯一检查需要增加查找条件不为自身
  private function updateUniqueTest($userAttrArr){
    $state = array();
    $state['status']['success'] = true;

    //检测邮箱
    $this->db->select('user', "user_id", "email='".$userAttrArr['email']."' "."and user_id!=".$userAttrArr['user_id']);
    $sqlState = $this->db->fetchArray(MYSQL_ASSOC);

    if($sqlState['success']){
      if(count($sqlState['result_array']) > 0){
        $state['status']['success'] = false;
        $state['status']['msg']['email'] = '该邮箱已注册';
      }
    }else{
      FP::putLog('邮箱重复性检测出错，详情：'.$state['msg']);
    }

    //检测电话号码
    $this->db->select('user', "user_id", "tel='".$userAttrArr['tel']."' "."and user_id!=".$userAttrArr['user_id']);
    $sqlState = $this->db->fetchArray(MYSQL_ASSOC);

    if($sqlState['success']){
      if(count($sqlState['result_array']) > 0){
        $state['status']['success'] = false;
        $state['status']['msg']['tel'] = '该号码已注册';
      }
    }else{
      FP::putLog('电话重复性检测出错，详情：'.$sqlState['msg']);
    }

    return $state;
  }

  private function loginSuccess($userMsg){
    $_SESSION['user_id'] = $userMsg['user_id'];
    $_SESSION['name'] = $userMsg['name'];
    $_SESSION['email'] = $userMsg['email'];
    $_SESSION['tel'] = $userMsg['tel'];
    $_SESSION['role'] = $userMsg['role'];

    $last_login = array('last_login' => FP::getDatetime());

    //update
    $this->db->update('user', $last_login, 'user_id='.$userMsg['user_id']);
    $sqlResult = $this->db->getMessage();
    if ($sqlResult['success']) {
      $ip = getIP();
      $city = Getaddress($ip);
      FP::putLog($userMsg['user_id'].'~'.$userMsg['name'].' 用户登入'.'(IP: '.$ip.' City: '.$city.' OS: '.GetOs().' Browser: '.GetBrowser().')');
    }else{
      FP::putLog('更新最近登录时间出错，详情：'.$sqlResult['msg']);
    }
  }

}