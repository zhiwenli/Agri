/*
* 立即执行JS
* 移动端版主页的JS控制器, 移动端与PC不同之处
* @Rely on : commonIndex.js
* @Author : hi@zhiwenli.com
* @Areate at : 2016-11-22 16:45:29
*/

document.getElementsByClassName("cesium-viewer-fullscreenContainer")[0].style.display = "none";

//toolBar排序
resortToolBar();


//注记
var layers = viewer.scene.imageryLayers;
var cn_annotation=new Cesium.WebMapTileServiceImageryProvider({
  url :'http://t0.tianditu.com/cia_w/wmts',
  layer : 'cia',
  style : 'default',
  format : 'tiles',
  tileMatrixSetID : 'w'
});
layers.add(new Cesium.ImageryLayer(cn_annotation));

//创建比例尺、罗盘、导航图标
var scene = viewer.scene;
var conta=$(".funselect");
var contb=$("#funselection>li>a");
var ellipsoid = scene.globe.ellipsoid;
mapWidget=new mapWidget(viewer,scene,ellipsoid, "mobile");//此类在MyWidget文件中声明?
mapWidget.showScalebar();
mapWidget.doCompass();
mapWidget.doNavi();
mapWidget.movePick();

//添加天气预报模块
var weatherBox = new CesiumLocationBox(viewer, 'lb', '/data/permanent/json', function(){
    hidePopDialogBox();
    CSB.hiddenThis();
  });

//窗口尺寸变化时更新CSS
window.onresize = function(){
  setPopDialogCSS();
}

window.onload = function(){
  
  //通过js调整部分CSS样式
  setPopDialogCSS();

  //为cesium原生按钮设置监听
  originalButtonListener();

  //飞行时间为JS阻塞状态
  launchFly();

  addNavigationButton();
  CSB.setPosition(2, 85);
};


//functions ------------------------------------------------------------------

/*设置cesium-viewer-toolbar中子元素的排列顺序*/
function resortToolBar(){
  var toolbar = document.getElementsByClassName('cesium-viewer-toolbar')[0];
  var childs = toolbar.childNodes;
  
  toolbar.appendChild(childs[3]);
  toolbar.appendChild(childs[5]);
  toolbar.appendChild(childs[4]);
  toolbar.appendChild(childs[2]);
  toolbar.appendChild(childs[3]);
  toolbar.appendChild(childs[3]);
  toolbar.appendChild(childs[3]);
} 

//监听几个cesium自带按钮，使其被点击展开弹窗时立即关闭自定义的弹窗，在window.onload中调用
function originalButtonListener(){
  var toolbar = document.getElementsByClassName('cesium-viewer-toolbar')[0];
  var childs = toolbar.childNodes;
  
  childs[3].addEventListener("click", hideCustomBox);
  childs[5].addEventListener("click", hideCustomBox);
  childs[6].addEventListener("click", hideCustomBox);
}