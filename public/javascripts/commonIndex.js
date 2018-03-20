/*
* 立即执行JS
* 创建Cesium视图、加载基础影像及其它必须控件控制
* @Rely on : imageryConfContainer.js Cesium.js functionsProvider.js
* @Author : hi@zhiwenli.com
* @Areate at : 2016-11-22 15:10:42
*/

//各个图层的缩放显示等级
var DISTANCE_DISPLAY_CONDITION_ARR = {
  'speciality_YBJP': new Cesium.DistanceDisplayCondition(0, 8.0e7),
  'speciality_ZY': new Cesium.DistanceDisplayCondition(0, 8.0e7),
  'speciality_NC': new Cesium.DistanceDisplayCondition(0, 8.0e7),
  'speciality_JD': new Cesium.DistanceDisplayCondition(0, 8.0e7),
  'station_YXWD': new Cesium.DistanceDisplayCondition(0, 8.0e7),
  'station_AX': new Cesium.DistanceDisplayCondition(0, 8.0e7),
  'station_DW': new Cesium.DistanceDisplayCondition(0, 8.0e7),
  'station_GR': new Cesium.DistanceDisplayCondition(0, 8.0e7),
  'satellite_VSAT': new Cesium.DistanceDisplayCondition(0, 8.0e7),
  'satellite_BDS': {
    'model': new Cesium.DistanceDisplayCondition(0, Number.MAX_VALUE),
    'label': new Cesium.DistanceDisplayCondition(0.0,1000000)
  },
  'satellite_GLONASS':{
    'model': new Cesium.DistanceDisplayCondition(0, Number.MAX_VALUE),
    'label': new Cesium.DistanceDisplayCondition(0.0,1000000)
  },
  'satellite_GPS': {
    'model': new Cesium.DistanceDisplayCondition(0, Number.MAX_VALUE),
    'label': new Cesium.DistanceDisplayCondition(0.0,1000000)
  }
};


//存储加载的特产和站点数据// var specialities, stations;
var layersDataSourceArr = {
  'speciality_YBJP': null,
  'speciality_ZY': null,
  'speciality_NC': null,
  'speciality_JD': null,
  'station_YXWD': null,
  'station_AX': null,
  'station_DW': null,
  'station_GR': null,
  'satellite_VSAT': null,
  'satellite_BDS': null,
  'satellite_GLONASS': null,
  'satellite_GPS': null
};


//########################################################## init

//########## Cesium init

//获取影像底图模型。FORM l_imageryView.js
var imageryViewModels = getImageryViews();
var terrainModels = getTerrainModels();


//创建主视图
var viewer = new Cesium.Viewer('cesiumContainer', {
  vrButton : true,
  baseLayerPicker : true,
  showRenderLoopErrors : false,
  imageryProviderViewModels: imageryViewModels,
  selectedImageryProviderViewModel: imageryViewModels[12],
  terrainProviderViewModels: terrainModels
});


//设置天空背景
// viewer.scene.skyBox.show=false;
// viewer.scene.sun.show=false;
// viewer.scene.backgroundColor=Cesium.Color.LIGHTSTEELBLUE; //设置天空蓝色背景


//设置logo、时间轴、动画容器隐藏
document.getElementsByClassName("cesium-viewer-timelineContainer")[0].style.display = "none";
document.getElementsByClassName("cesium-viewer-animationContainer")[0].style.display = "none";
document.getElementsByClassName("cesium-infoBox")[0].style.display = "none";
viewer.bottomContainer.style.display = "none";

//汉化
replace2Chinese();

//获取视图模型，该变量被
var viewModel = viewer.geocoder.viewModel;

//覆盖Cesium搜索启动函数，该函数被cesium-geocoder-input和cesium-geocoder-searchButton的相关动作触发
//而用户点击searchBox中的searchBox_typeButton则直接越过该层直接触发entitySearch()，效果相同
viewModel._searchCommand = Cesium.createCommand(function() {
    if (viewModel.isSearchInProgress) {
      cancelGeocode(viewModel);
    } else {
      entitySearch(viewModel);
    }
});

//########## end of cesium init



//##########Argi Project init

//加载亚洲国境线
viewer.dataSources.add(Cesium.KmlDataSource.load('/data/permanent/kml/asia-boundary.kml'));

//添加搜索图标和图层切换图标
addSearchButton();
setSearchBoxContainer();
addLayerSwitchButton();
addSpecialitySwitchButton();
addStationSwitchButton();
addSatelliteSwitchButton();


//图层高亮时的对象控制，确保没每种类型只有一个高亮
var highlightObj = {'speciality' : null, 'station' : null, 'satellite' : null};

//显示默认图层
showData('speciality_YBJP');
showData('station_YXWD');
showData('satellite_VSAT');
showData('satellite_BDS');
$('#speciality_YBJP').attr("checked", true);
$('#station_YXWD').attr("checked", true);
$('#satellite_VSAT').attr("checked", true);
$('#satellite_BDS').attr("checked", true);

//设置HOME键视角
Cesium.Camera.DEFAULT_VIEW_RECTANGLE = Cesium.Rectangle.fromDegrees(70, 55, 137, 5);
//设置初始视角,作为页面加载后视角飞行的起点
viewer.camera.setView({
  destination: Cesium.Cartesian3.fromDegrees(-112,-60,1000000000)
});

//##########end of Argi Project init

//点击事件监听
var handler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas);
handler.setInputAction(function(click) {
  var pickedObject = scene.pick(click.position);
  if (Cesium.defined(pickedObject)) {
    // pop dialog here
    console.log("click entity ",pickedObject.id.id);

    var idArr = pickedObject.id.id.split('_')[0];
    if(idArr === 'speciality' || idArr === 'station' || idArr === 'satellite'){
      showPopDialogBox(pickedObject.id.id, click.position);
    }

  }else{
    hideCustomBox();hideTouchSelectBox();
  }
}, Cesium.ScreenSpaceEventType.LEFT_CLICK);

//########################################################## end of init


//TEST//////////

// console.warn();
// console.debug();
// console.info();
// console.assert();
// console.dir();//列出对象所有属性

//TEST/////////


//Functions===================================
//============================================

/*手动添加搜索图标*/
function addSearchButton(){
  var searchButton = document.createElement('button');
  searchButton.setAttribute('type','button');
  searchButton.setAttribute('title','搜索');
  searchButton.setAttribute('onclick','showSearchBox()');
  searchButton.setAttribute('class','cesium-button cesium-toolbar-button');
  searchButton.innerHTML = '<img style="padding:1px;" src="/public/img/searchButton.png">';
  $($(searchButton)).mouseenter(function(){
    showSearchBox();
  });

  var toolbar = document.getElementsByClassName('cesium-viewer-toolbar')[0];
  toolbar.insertBefore(searchButton, toolbar.firstChild);

  var searchBox = document.createElement('div');
  searchBox.setAttribute('id', 'searchButton');
  searchBox.setAttribute('style','relative');

  document.getElementById('cesiumContainer').appendChild(searchBox);
}

/*添加并设置SearchBoxContainer，其中一些组件来自Cesium自身*/  
/*通过调整Cesium控件组织，达到如下结构
searchBoxContainer{
 cesium-viewer-geocoderContainer{
  input{
   cesium-geocoder-input, 
   cesium-geocoder-searchButton
  }
 },
 searchBox
}*/
function setSearchBoxContainer(){

  //将cesium-viewer-geocoderContainer、cesium-geocoder-input的宽度固定，使其保持默认展开状态
  $('.cesium-viewer-geocoderContainer').css('width', 250);
  $('.cesium-geocoder-input').css('width', 250);

  //覆盖输入提示
  $('.cesium-geocoder-input').attr('placeholder', '请输入搜索内容开始搜索');

  //使用自定义图标覆盖原有搜索图标
  $('.cesium-geocoder-searchButton').html('<img style="width:100%; height:100%;" src="/public/img/117970386547243975.png">');
  //将geocoder控件添加至自定义的searchBoxContainer
  $('#searchBoxContainer').append($('.cesium-viewer-geocoderContainer'));
  //将自定义的搜索选项栏添加至geocodeer控件
  $('#searchBoxContainer').append($('#searchBox'));

  //显示searchBox
  $('#searchBox').css('display', 'block');

var switchButton = document.createElement('button');
  switchButton.setAttribute('type','button');
  switchButton.innerHTML = 'dmslkdnvsjndkjsnlkjvzdsnkgjbdf';
}

/*添加切换数据图标*/
function addLayerSwitchButton(){
  var switchButton = document.createElement('button');
  switchButton.setAttribute('type','button');
  switchButton.setAttribute('title','图层选择');
  switchButton.setAttribute('onclick','switchLayerSelectBox()');
  switchButton.setAttribute('class','cesium-button cesium-toolbar-button');
  switchButton.innerHTML = '<img style="padding:1px;" src="/public/img/layers30_30.png">';
  
  var toolbar = document.getElementsByClassName('cesium-viewer-toolbar')[0];
  toolbar.appendChild(switchButton);

  var switchBox = document.createElement('div');
  switchBox.setAttribute('id', 'switchButton');
  switchBox.setAttribute('style','relative');

  document.getElementById('cesiumContainer').appendChild(switchBox);
}

/*添加右侧菜单栏开关按钮,仅在p-index.js中调用*/
function addScreenSwitchButton(){
  var screenSelectBoxButton = document.createElement('button');
  screenSelectBoxButton.setAttribute('type','button');
  screenSelectBoxButton.setAttribute('title','切换视图');
  screenSelectBoxButton.setAttribute('id','screenSelectBoxButton');
  screenSelectBoxButton.setAttribute('onclick','switchScreenSelectBox()');
  screenSelectBoxButton.setAttribute('class','cesium-button cesium-toolbar-button');
  screenSelectBoxButton.innerHTML = '<img style="width:100%;height:100%;" src="/public/img/normalScreenButton.png">';
  
  var toolbar = document.getElementsByClassName('cesium-viewer-toolbar')[0];
  toolbar.appendChild(screenSelectBoxButton);
}


/*添加触摸模式切换按钮,仅在t-index.js中调用*/
function addTouchSwitchButton(){
  var touchSelectBoxButton = document.createElement('button');
  touchSelectBoxButton.setAttribute('type','button');
  touchSelectBoxButton.setAttribute('title','鼠标或单点触控');
  touchSelectBoxButton.setAttribute('id','touchSelectBoxButton');
  touchSelectBoxButton.setAttribute('onclick','touchScreenSelectBox()');
  touchSelectBoxButton.setAttribute('class','cesium-button cesium-toolbar-button');
  touchSelectBoxButton.innerHTML = '<img style="width:100%;height:100%;" src="/public/img/mouse_30_30.png">';
  
  var toolbar = document.getElementsByClassName('cesium-viewer-toolbar')[0];
  toolbar.appendChild(touchSelectBoxButton);
}

function addNavigationButton(){
  var navigationBoxButton = document.createElement('button');
  navigationBoxButton.setAttribute('type','button');
  navigationBoxButton.setAttribute('title','导航');
  navigationBoxButton.setAttribute('id','navigationBoxButton');
  navigationBoxButton.setAttribute('onclick','navigationBoxToggle()');
  navigationBoxButton.setAttribute('class','cesium-button cesium-toolbar-button');
  navigationBoxButton.innerHTML = '<img style="width:100%;height:100%;" src="/public/img/navigation_30_30.png">';
  
  var toolbar = document.getElementsByClassName('cesium-viewer-toolbar')[0];
  toolbar.appendChild(navigationBoxButton);
}

/*添加精品切换按钮*/
function addSpecialitySwitchButton(){
  var specialitySelectBoxButton = document.createElement('button');
  specialitySelectBoxButton.setAttribute('type','button');
  specialitySelectBoxButton.setAttribute('title','宇宝精品');
  specialitySelectBoxButton.setAttribute('id','specialitySelectBoxButton');
  specialitySelectBoxButton.setAttribute('onclick','switchSpecialitySelectBox()');
  specialitySelectBoxButton.setAttribute('class','cesium-button cesium-toolbar-button');
  specialitySelectBoxButton.innerHTML = '<img style="width:100%;height:100%;" src="/public/img/YBJP_30_30.png">';
  
  var toolbar = document.getElementsByClassName('cesium-viewer-toolbar')[0];
  toolbar.appendChild(specialitySelectBoxButton);
}

/*添加站点切换按钮*/
function addStationSwitchButton(){
  var stationSelectBoxButton = document.createElement('button');
  stationSelectBoxButton.setAttribute('type','button');
  stationSelectBoxButton.setAttribute('title','展销');
  stationSelectBoxButton.setAttribute('id','stationSelectBoxButton');
  stationSelectBoxButton.setAttribute('onclick','switchStationSelectBox()');
  stationSelectBoxButton.setAttribute('class','cesium-button cesium-toolbar-button');
  stationSelectBoxButton.innerHTML = '<img style="width:100%;height:100%;" src="/public/img/YXWD_30_30.png">';
  
  var toolbar = document.getElementsByClassName('cesium-viewer-toolbar')[0];
  toolbar.appendChild(stationSelectBoxButton);
}

/*添加基站/卫星切换按钮*/
function addSatelliteSwitchButton(){
  var satelliteSelectBoxButton = document.createElement('button');
  satelliteSelectBoxButton.setAttribute('type','button');
  satelliteSelectBoxButton.setAttribute('title','VSAT地球站');
  satelliteSelectBoxButton.setAttribute('id','satelliteSelectBoxButton');
  satelliteSelectBoxButton.setAttribute('onclick','switchSatelliteSelectBox()');
  satelliteSelectBoxButton.setAttribute('class','cesium-button cesium-toolbar-button');
  satelliteSelectBoxButton.innerHTML = '<img style="width:100%;height:100%;" src="/public/img/VSAT_30_30.png">';
  
  var toolbar = document.getElementsByClassName('cesium-viewer-toolbar')[0];
  toolbar.appendChild(satelliteSelectBoxButton);
}


//显示数据到viewer，如果数据尚未加载则主动加载
//@paras String-图层Id（即html标签中的id）;
function showData(dataSourceId){

  if(layersDataSourceArr[dataSourceId] != null){
    addData(layersDataSourceArr[dataSourceId], DISTANCE_DISPLAY_CONDITION_ARR[dataSourceId]);
  }
  else{
    //加载数据, 该项目中12个图层均在此处load
    var czmlp = Cesium.CzmlDataSource.load('/data/current/' + dataSourceId + '.czml').then(function(dataSource){
      console.log("load data", dataSourceId);
      layersDataSourceArr[dataSourceId] = dataSource;
      addData(dataSource, DISTANCE_DISPLAY_CONDITION_ARR[dataSourceId]);
    });
  }
}

//添加数据到视窗
function addData(dataSource, distanceDisplayCondition){
  viewer.dataSources.add(dataSource);
  var entities = dataSource.entities.values;
  for (var i = 0; i < entities.length; i++)
  {
    var entity = entities[i];
    if (distanceDisplayCondition['label'] != undefined && distanceDisplayCondition['model'] != undefined) {
      //卫星远近显示控制
      entity.label.distanceDisplayCondition = distanceDisplayCondition['label'];
      entity.model.distanceDisplayCondition = distanceDisplayCondition['model'];

      entity.orientation= new Cesium.VelocityOrientationProperty(entity.position);


      viewer.clock.canAnimate = true; //!!!!每次add卫星数据会导致Cesium时钟暂停，需要重新启动时钟
       // viewer.clock.multiplier = 5000; 
     }else{
      //图片远近显示控制
      //已改为写入CZML
    }
  }
}

//移除已显示的数据
function removeData(dataSourceId){
  if (layersDataSourceArr[dataSourceId] != null) {
    console.log("remove Data");
    viewer.dataSources.remove(layersDataSourceArr[dataSourceId], false);
  }
}

//页面加载完成后调用函数,用于设置初始视角以及部分CSS。在p-index.js和m-index.js中赋予window.onload()
//运行时会阻塞JS
function launchFly(){

  if(getCookie('role') == 'admin'){ /////////////////////////////////////////////////////////////////////////////  开发者模式
    viewer.camera.flyHome(1);
    console.warn('ADMIN');

    $('#comprehensiveSearchBox').removeClass('hiddenEle');

    $("#comprehensiveSearchBox_tjyb").trigger("click");

    $(".hahahahaha").removeClass('hiddenEle');

    CVC.flyTo(121.4, 31.2);

    return;
  }

  var launchFlyTime = 5000; //mini seconds

  //页面加载完成后飞行至Home视角
  viewer.camera.flyHome(launchFlyTime/1000); //seconds
  
  //设置倾斜视角
  setTimeout(function() {
    viewer.camera.flyTo({
      destination : Cesium.Cartesian3.fromDegrees(105, 15, 5000000.0),
      orientation : {
        heading : Cesium.Math.toRadians(0),
        pitch : Cesium.Math.toRadians(-68.0),
        roll : 0.0
      },
      complete : function(){
        console.info("Launch fly complete.");
      }
    });
  }, launchFlyTime + 500);

}

//通过模拟点击图层复选框控制图层开关，其保持各个图层控制器状态一致
//layerId(string)-图层id, flag(bool)-开true、关false
function layerOnOffBySelectBox(layerId, flag){

  var checked = document.getElementById(layerId).checked;
  if (checked != flag) { //目标状态和现有状态不一致
    //模拟点击checked元素，以开关图层
    $('#'+layerId).trigger('click');
  }
}


//汉化
function replace2Chinese(){
  var cesium_baseLayerPicker_sectionTitle = document.getElementsByClassName("cesium-baseLayerPicker-sectionTitle");
  cesium_baseLayerPicker_sectionTitle[0].innerHTML = '影像';
  cesium_baseLayerPicker_sectionTitle[1].innerHTML = '地形';

  var cesium_baseLayerPicker_itemLabel = document.getElementsByClassName("cesium-baseLayerPicker-itemLabel");
  // cesium_baseLayerPicker_itemLabel[cesium_baseLayerPicker_itemLabel.length - 1].innerHTML = 'STK World Terrain';

  var cesium_navigation_button_left = document.getElementsByClassName("cesium-navigation-button-left");
  cesium_navigation_button_left[0].innerHTML = cesium_navigation_button_left[0].innerHTML.replace('>Mouse', '>鼠标');

  var cesium_navigation_button_right = document.getElementsByClassName("cesium-navigation-button-right");
  cesium_navigation_button_right[0].innerHTML = cesium_navigation_button_right[0].innerHTML.replace('>Touch', '>触屏');

  var cesium_navigation_help_instructions = document.getElementsByClassName("cesium-navigation-help-instructions");
  cesium_navigation_help_instructions[0].innerHTML = cesium_navigation_help_instructions[0].innerHTML.replace("Pan view", "平移视图");
  cesium_navigation_help_instructions[0].innerHTML = cesium_navigation_help_instructions[0].innerHTML.replace("Left click + drag", "点击左键 + 拖拽");
  cesium_navigation_help_instructions[0].innerHTML = cesium_navigation_help_instructions[0].innerHTML.replace("Zoom view", "缩放视图");
  cesium_navigation_help_instructions[0].innerHTML = cesium_navigation_help_instructions[0].innerHTML.replace("Right click + drag, or", "点击右键 + 拖拽; 或上下滚动鼠标滚轮");
  cesium_navigation_help_instructions[0].innerHTML = cesium_navigation_help_instructions[0].innerHTML.replace("Mouse wheel scroll", "");
  cesium_navigation_help_instructions[0].innerHTML = cesium_navigation_help_instructions[0].innerHTML.replace("Rotate view", "旋转视图");
  cesium_navigation_help_instructions[0].innerHTML = cesium_navigation_help_instructions[0].innerHTML.replace("Middle click + drag, or", "中键点击 + 拖拽; 或CTRL + 点击左/右键 + 拖拽");
  cesium_navigation_help_instructions[0].innerHTML = cesium_navigation_help_instructions[0].innerHTML.replace("CTRL + Left/Right click + drag", "");

  cesium_navigation_help_instructions[1].innerHTML = cesium_navigation_help_instructions[1].innerHTML.replace("Pan view", "平移视图");
  cesium_navigation_help_instructions[1].innerHTML = cesium_navigation_help_instructions[1].innerHTML.replace("One finger drag", "单指拖拽");
  cesium_navigation_help_instructions[1].innerHTML = cesium_navigation_help_instructions[1].innerHTML.replace("Zoom view", "缩放视图");
  cesium_navigation_help_instructions[1].innerHTML = cesium_navigation_help_instructions[1].innerHTML.replace("Two finger pinch", "两指控制缩放");
  cesium_navigation_help_instructions[1].innerHTML = cesium_navigation_help_instructions[1].innerHTML.replace("Tilt view", "倾斜视图");
  cesium_navigation_help_instructions[1].innerHTML = cesium_navigation_help_instructions[1].innerHTML.replace("Two finger drag, same direction", "两指向同一方向拖拽");
  cesium_navigation_help_instructions[1].innerHTML = cesium_navigation_help_instructions[1].innerHTML.replace("Rotate view", "旋转视图");
  cesium_navigation_help_instructions[1].innerHTML = cesium_navigation_help_instructions[1].innerHTML.replace("Two finger drag, opposite direction", "两指向相反方向拖拽");
}

// 隐藏全部自定义弹窗
function hideCustomBox(){
  hidePopDialogBox();
  hideLayerSelectBox();
  hideSearchBox();
  hideScreenSelectBox();
  
  hideSpecialitySelectBox();
  hideStationSelectBox();
  hideSatelliteSelectBox();

  // hideNavigationBox();
} 


//============================================
//End of functions============================


//custom class

//坐标点
function lzWP(lng, lat, name, addr){
  var point = new Object;
  point.lat = lat ? lat : 0;
  point.lng = lng ? lng : 0;
  point.name = name ? name : '';
  point.addr = addr ? addr : '';
  return point;
}
//end of custom class