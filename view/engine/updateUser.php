<?php
$dir = '../../';
include_once $dir.'config/include.php';


$user = new User();
if ($user->isLogin() && !FP::keyNotExitOrNoContent('user_id', $_GET)) {
  //已登录，直接进入修改个人信息页面
  $role = $user->getCurrentUserMsg('role');
  $D = $user->getUserMsgById($_GET['user_id']);

  $activeBar = array(0, 0);

  include '../lzW/updateUser.lzW';
  return;
}



//启动找回密码验证
if (FP::keyNotExitOrNoContent('mark', $_GET) || FP::keyNotExitOrNoContent('user_id', $_GET)) {
  $tipType = 'error';
  $tipMsg = '参数错误';
  include '../lzW/tipsPage.lzW';
  exit(0);
}

$user = new User();
$userMsg = $user->getUserMsgById($_GET['user_id']);
$timeStamp =substr($_GET['mark'], strpos($_GET['mark'], '_')+1);

//验证Mark正确性及其有效期
if ($userMsg['forgot_password']!== $_GET['mark']) {
  $tipType = 'error';
  $tipMsg = '链接无效';
  include '../lzW/tipsPage.lzW';
  exit(0);
}elseif (time() - $timeStamp > 60*30) {
  //30分钟后链接失效
  $tipType = 'error';
  $tipMsg = '链接已过期';
  include '../lzW/tipsPage.lzW';
  exit(0);
}

//验证通过
$user->autoLogin($userMsg);

$role = $user->getCurrentUserMsg('role');
$D = $userMsg;

$activeBar = array(0, 0);

include '../lzW/updateUser.lzW';