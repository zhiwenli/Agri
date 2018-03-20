<?php
// 日志系统

$dir = '../model/';
include_once '../config/config.php';
include_once $dir.'FunctionsProvider.class.php';
include_once $dir.'visitorMsg.fun.php';

$ip = getIP();
$city = Getaddress($ip);
$client = isMobile() ? '移动端' : 'PC端';

FP::putLog($client.' 访问多点触控版'.' (IP: '.$ip.' City: '.$city.' OS: '.GetOs().' Browser kernel: '.GetBrowser().')');
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
  <link rel="stylesheet" type="text/css" href="/public/stylesheets/popBox-pc.css">
  <style>
    @import url(/public/stylesheets/externalCSS/bootstrap.min.css);
    @import url(/public/stylesheets/externalCSS/jquery-ui.css);
    @import url(/public/stylesheets/externalCSS/d3chart.css);
    @import url(/public/stylesheets/obor_css.css);
    @import url(/public/stylesheets/bucket.css);
    @import url(/public/stylesheets/webwidget_vertical_menu.css);
    @import url(/public/stylesheets/measureBoxStyle.css);

    /*weather*/
    @import url(/public/stylesheets/weather.css);

    @import url(/public/stylesheets/comprehensiveSearchBox.css);

    @import url(/Cesium/Widgets/widgets.css);

    @import url(/public/stylesheets/custom-pc.css);
    .axis path,
    .axis line {
     fill: none;
     stroke: white;
   }

   a{
      box-sizing: content-box;
    }
   <!--修改时钟的大小-->

   .cesium-viewer-animationContainer 
   {width: 160px !important; height: 100px !important; position: absolute; bottom: 0px; left: 0px; overflow: hidden ;}
   .cesium-viewer-animationContainer  svg
   {width: 160px !important; height:100px !important; position: absolute; bottom: 0px; left: 0px; overflow: hidden;}
 </style>

 <!-- js库在尾部引入 -->
</head>


<body>
  <div id="title">
    <div id="one">
      <a href="/view/engine/" target="_blank"><img  id='logo' src="/public/img/obor-logo.gif" ></a>
      <a href="http://www.bdsvv.com/" target="_blank"><img class="main-title-img" src="/public/img/the_mianTitle.png" /></a>
    </div>

    <div class="wrap">
      <div id="pic_list_2" class="scroll_horizontal">
        <a><img src="/public/img/slider/control.jpg" class="prev" ></a>

        <div class="box">
          <ul class="list">
            <?php 
            for($i=0; $i<8; $i++){
              printf("<li><a href='#''><img src='/public/img/slider/slider0%u.jpg' class='img'></a></li>", $i+1);
            } 
            ?>
          </ul>
        </div>
      </div> 
    </div>
  </div>


  <!-- Cesium Container -->
  <div id="cesiumContainer">
    
    <a href="http://www.bdsvv.com" target="_blank"><div class="serviceImg1"></div></a>
    <a onclick="navigationBoxToggle();"><div class="serviceImg2"></div></a>
    <p class="copyright-text"><big></b><big>©</big></big> 北斗农业·中国 滇ICP备15000913号-5</p>

    <!-- 天气 -->
    <div id="lb" style="position: absolute; left:280px; top:15px; z-index: 99;"></div>

    <?php
    require 'popBox.php';
    require 'comprehensiveSearchBox.php';
    ?>

    <div id="radio" style="position:absolute; top:5px; right:45%; height: 30px;z-index:2">
      <input type="radio" id="health" name="healthwealth" checked="checked"><label for="health">健康</label><!--lable for属性 与相应id值的input绑定-->
      <input type="radio" id="wealth" name="healthwealth"><label for="wealth">财富</label>
    </div>
    <div id="chart" style="position:absolute; top:20px; left:20px; z-index:99"></div>
    <div id="info" title="国民健康与财富" style="position:absolute; bottom:15%; right:3%; z-index:9999"></div>

  </div>

  <!-- 引入具体html内容 -->
  <?php require 'p-index-navigation.php'; ?>



  <script src="/Cesium/Cesium.js"></script> 

  <!-- 引入外部JS库 -->
  <!-- <script type="text/javascript" src="/public/javascripts/externalJS/jquery-1.4.4.min.js"></script> -->
  <script src="http://apps.bdimg.com/libs/jquery/2.1.4/jquery.min.js"></script>
  <script type="text/javascript" src="/public/javascripts/externalJS/jquery-ui.js"></script>
  <script type="text/javascript" src="/public/javascripts/externalJS/d3.v3.min.js"></script>
  <script type="text/javascript" src="/public/javascripts/externalJS/echarts.common.min.js" charset="utf-8"></script>
  <script type="text/javascript" src="/public/javascripts/externalJS/turf.min.js" charset="utf-8"></script>
  <script>
    var sharedObject = {
      dispatch : d3.dispatch("nationMouseover"),//创建一个定制的事件分发器，这里的定制事件是"nationMouseover"，然后可以以属性的形式来访问事件相应属性，如dispatch.nationMouseover
      yearData : [],
      flyTo : null
    };
  </script>
  <script type="text/javascript" src="/public/javascripts/externalJS/jquery.cxscroll.min.js"></script>
  <script type="text/javascript" src="/public/javascripts/externalJS/webwidget_vertical_menu.js"></script>
  <script type="text/javascript" src="/public/javascripts/externalJS/googlemapsimage.js"></script>


  <!-- 引入Cesium的JS -->
  <script type="text/javascript" src="/public/javascripts/externalJS/Sandcastle-header.js"></script>

  <!-- 引入天地图JS -->
  <script type="text/javascript" src="http://api.tianditu.com/js/maps.js"></script>
  <script type="text/javascript" src="http://api.tianditu.com/js/service.js"></script>

  <!-- 引入自定义JS -->
  <script type="text/javascript" src="/public/javascripts/overwriteCesiumJS/GeocoderViewModel.js"></script>
  <script type="text/javascript" src="/public/javascripts/ms/ajaxHTTP.js"></script>
  <script type="text/javascript" src="/public/javascripts/d3example.js"></script>
  <script type="text/javascript" src="/public/javascripts/mapWidget.js"></script>
  <script type="text/javascript" src="/public/javascripts/functionsProvider.js"></script>
  <script type="text/javascript" src="/public/javascripts/imageryConfContainer.js"></script>
  <script type="text/javascript" src="/public/javascripts/commonIndex.js"></script>
  <script type="text/javascript" src="/public/javascripts/tdtFunctions.js" ></script>
  <script type="text/javascript" src="/public/javascripts/externalJS/CesiumLocationBox.js"></script>
  <script type="text/javascript" src="/public/javascripts/customBoxControll.js"></script>
  <!-- <script type="text/javascript" language="javascript" charset="utf-8" src="/public/javascripts/obor.js" ></script> -->
  <script>
    $("#pic_list_2").cxScroll({direction:"right",step:1,time:10,speed:2000 });
  </script>
  
  <script type="text/javascript" src="/public/javascripts/drawing.js"></script>

  <script type="text/javascript" src="/public/javascripts/t-overwriteFuns.js"></script>
  
  <script type="text/javascript" src="/public/javascripts/t-index.js"></script>
  
  <div id="mapDiv"></div>
</body>
</html>