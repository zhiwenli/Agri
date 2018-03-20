<?php
$dir = '../../';
include_once $dir.'config/include.php';

FP::logingConfirmAndGuidance();



$tipType = $_GET['tipType'];
$tipMsg = $_GET['msg'];
include '../lzW/tipsPage.lzW';