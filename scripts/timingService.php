<?php
$dir = '../';
include_once $dir.'config/include.php';

echo getIP();

//清理无效文件
$systemMgr = new SystemMgr();

$systemMgr->noRecordImgClear();
$systemMgr->tempImgClear();

