<?php
// 日志系统

$dir = '../model/';
include_once '../config/config.php';
include_once $dir.'FunctionsProvider.class.php';
include_once $dir.'visitorMsg.fun.php';

$ip = getIP();
$city = Getaddress($ip);
$client = isMobile() ? '移动端' : 'PC端';

FP::putLog($client.' 访问mobile版'.' (IP: '.$ip.' City: '.$city.' OS: '.GetOs().' Browser kernel: '.GetBrowser().')');
?>

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <META HTTP-EQUIV="Pragma" CONTENT="no-cache">    
  <META HTTP-EQUIV="Cache-Control" CONTENT="no-cache">
  <META HTTP-EQUIV="Expires" CONTENT="0">
  <meta name="author" content="lizhiwen, hi@zhiwenli.com, www.zhiwenli.com">
  <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no">
  <title>北斗农业•中国</title>

  <link rel="stylesheet" type="text/css" href="/Cesium/Widgets/widgets.css">
  <link rel="stylesheet" type="text/css" href="/public/stylesheets/custom-mobile.css">
  <link rel="stylesheet" type="text/css" href="/public/stylesheets/popBox-mobile.css">
  <style>
    
    /*weather*/
    @import url(/public/stylesheets/externalCSS/bootstrap.min.css);
    @import url(/public/stylesheets/weather.css);

    @import url(/public/stylesheets/comprehensiveSearchBox.css);

    html, body, #cesiumContainer {
        width: 100%; height: 100%; margin: 0; padding: 0; overflow: hidden;
    }

  </style>

</head>


<body>

  <div id="cesiumContainer">
    <div id="topLogo">
      <a href="http://www.bdsvv.com" target="_blank"><img class="serviceImg" src="/public/img/serviceImg.png" /></a>
    </div>
    <p class="copyright-text">©北斗农业·中国</p>

    <!-- 天气 -->
    <div id="lb" style="position: absolute; left:2px; top:47px; z-index: 2; transform:scale(0.73, 0.73); transform-origin:0% 0% 0px;"></div>

    <?php
      require 'popBox.php';
      require 'comprehensiveSearchBox.php';
    ?>

  </div>



  <script src="/Cesium/Cesium.js"></script>

  <!-- 引入外部JS库 -->
  <script src="http://apps.bdimg.com/libs/jquery/2.1.4/jquery.min.js"></script>
  <script type="text/javascript" src="/public/javascripts/externalJS/jquery-ui.js"></script>
  <script type="text/javascript" src="/public/javascripts/externalJS/googlemapsimage.js"></script>

  <!-- 引入天地图JS -->
  <script type="text/javascript" src="http://api.tianditu.com/js/maps.js"></script>
  <script type="text/javascript" src="http://api.tianditu.com/js/service.js"></script>

  <!-- 引入自定义JS -->
  <script type="text/javascript" src="/public/javascripts/overwriteCesiumJS/GeocoderViewModel.js"></script>
  <script type="text/javascript" src="/public/javascripts/ms/ajaxHTTP.js"></script>
  <script type="text/javascript" src="/public/javascripts/mapWidget.js"></script>
  <script type="text/javascript" src="/public/javascripts/functionsProvider.js"></script>
  <script type="text/javascript" src="/public/javascripts/imageryConfContainer.js"></script>
  <script type="text/javascript" src="/public/javascripts/commonIndex.js"></script>
  <script type="text/javascript" src="/public/javascripts/customBoxControll.js"></script>
  <script type="text/javascript" src="/public/javascripts/tdtFunctions_V2.js" ></script>
  <script type="text/javascript" src="/public/javascripts/externalJS/CesiumLocationBox.js"></script>

  <script type="text/javascript" src="/public/javascripts/m-index.js"></script>

   <div id="mapDiv"></div>
</body>
</html>