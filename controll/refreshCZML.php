<?php
$dir = '../';
include_once $dir.'config/include.php';

$czmlObj1 = new optCZML();
$czmlObj1->updateCZML(1);

$czmlObj2 = new optCZML();
$czmlObj2->updateCZML(2);

$czmlObj3 = new optCZML();
$czmlObj3->updateCZML(3);

$czmlObj4 = new optCZML();
$czmlObj4->updateCZML(4);

$czmlObj11 = new optCZML();
$czmlObj11->updateCZML(11);

$czmlObj12 = new optCZML();
$czmlObj12->updateCZML(12);

$czmlObj13 = new optCZML();
$czmlObj13->updateCZML(13);

$czmlObj14 = new optCZML();
$czmlObj14->updateCZML(14);

$czmlObj21 = new optCZML();
$czmlObj21->updateCZML(21);

echo "Refreshed.";

?>