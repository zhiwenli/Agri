<?php
$dir = '../../';
include_once $dir.'config/include.php';

FP::logingConfirmAndGuidance();

$user = new User();
$state = $user->logout();
if ($state['status']['success']) {
  header("Location: ".$state['nextPage']); 
}
