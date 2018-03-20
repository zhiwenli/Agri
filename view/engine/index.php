<?php
$dir = '../../';
include_once $dir.'config/include.php';

FP::logingConfirmAndGuidance();

$activeBar = array(0, 0);

$user = new User();
$role = $user->getCurrentUserMsg('role');

//统计各类型待审核元素数量
$entity = new EntityOprt();
$specialityStatusWatting = count($entity->getStatusWattingEntityAttrArr('speciality'));
$stationStatusWatting = count($entity->getStatusWattingEntityAttrArr('station'));
$satelliteStatusWatting = count($entity->getStatusWattingEntityAttrArr('satellite'));

$stat = new Statistics();
$typeNumArr = $stat->getDifferentTypesNum();


include '../lzW/index.lzW';
