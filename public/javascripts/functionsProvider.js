//公用函数

//设置cookie
function setCookie(name,value)
{
  var Days = 30;
  var exp = new Date();
  exp.setTime(exp.getTime() + Days*24*60*60*1000);
  document.cookie = name + "="+ escape (value) + ";expires=" + exp.toGMTString();
  console.log('set cookie', name, value);
}

//读取cookie
function getCookie(name)
{
  var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
  if(arr=document.cookie.match(reg))
  return unescape(arr[2]);
  else
  return null;
}

//通过类型ID获取图层控制CheckBox的ID
function getLayersIdByTypeId(type_id){
  var layerId = '';
  if (type_id == 1) {
    layerId = 'speciality_YBJP';
  }else if(type_id == 2){
    layerId = 'speciality_ZY';
  }else if(type_id == 3){
    layerId = 'speciality_NC';
  }else if(type_id == 4){
    layerId = 'speciality_JD';
  }else if(type_id == 11){
    layerId = 'station_YXWD';
  }else if(type_id == 12){
    layerId = 'station_AX';
  }else if(type_id == 13){
    layerId = 'station_DW';
  }else if(type_id == 14){
    layerId = 'station_GR';
  }else if(type_id == 21){
    layerId = 'satellite_VSAT';
  }

  return layerId;
}


function getTypeDefaultImg(type_id){
  var img = '';
  if (type_id === 0) {
    img = 'favorite_all.png';
  }else if (type_id === 1) {
    img = 'default_speciality_YBJP_img.png';
  }else if(type_id === 2){
    img = 'default_speciality_ZY_img.png';
  }else if(type_id === 3){
    img = 'default_speciality_NC_img.png';
  }else if(type_id === 4){
    img = 'default_speciality_JD_img.png';
  }else if(type_id === 11){
    img = 'default_station_YXWD_img.png';
  }else if(type_id === 12){
    img = 'default_station_AX_img.png';
  }else if(type_id === 13){
    img = 'default_station_DW_img.png';
  }else if(type_id === 14){
    img = 'default_station_GR_img.png';
  }else if(type_id === 21){
    img = 'default_satellite_VSAT_img.png';
  }else if(type_id === 100){
    img = 'location_icon.png';
  }

  return img;
}

// 取当前页面名称(不带后缀名)
function getCurrentPageName()
{
    var a = location.href;
    var b = a.split("/");
    var c = b.slice(b.length-1, b.length).toString(String).split(".");
    return c.slice(0, 1);
}

function checkURL(URL){
  var str=URL;
  //判断URL地址的正则表达式为:http(s)?://([\w-]+\.)+[\w-]+(/[\w- ./?%&=]*)?
  //下面的代码中应用了转义字符"\"输出一个字符"/"
  var Expression=/http(s)?:\/\/([\w-]+\.)+[\w-]+(\/[\w- .\/?%&=]*)?/;
  var objExp=new RegExp(Expression);
  
  if(objExp.test(str)==true){
    return true;
  }else{
    return false;
  }
} 

function randomString(len) {
　　len = len || 8;
　　var $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz1234567890';    /****默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1****/
　　var maxPos = $chars.length;
　　var pwd = '';
　　for (i = 0; i < len; i++) {
　　　　pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
　　}
　　return pwd;
}

//导航键规划


// 路径规划导航框总控
var Navigation = {
  startPoint: {
    lat: null,
    lng: null
  },
  endPoint: {
    lat: null,
    lng: null
  },

  setStartPoint: function(startLat, startLng){
    this.startPoint.lat = startLat;
    this.startPoint.lng = startLng;
  },

  setEndPoint: function(endLat, endLng){
    this.endPoint.lat = endLat;
    this.endPoint.lng = endLng;
  },

  setSiteViewer: function(lat, lng){

    if(NavigateSiteSelect.resultDisplayEle == "navigationBox_suggests1"){
      Navigation.setStartPoint(lat, lng);
      //set billboard
      if (NavigateSiteSelect.startBilldoard) {
        viewer.entities.remove(NavigateSiteSelect.startBilldoard);
      }
      NavigateSiteSelect.startBilldoard = viewer.entities.add({
        position : Cesium.Cartesian3.fromDegrees(lng, lat),
        billboard :{
            image : '/public/img/startPoint.png',
            width : 35,
            height : 60,
            pixelOffset : new Cesium.Cartesian2(0.0, -30),
        }
      });
    }else if(NavigateSiteSelect.resultDisplayEle == "navigationBox_suggests2"){
      Navigation.setEndPoint(lat, lng);
      // set billboard
      if (NavigateSiteSelect.endBilldoard) {
        viewer.entities.remove(NavigateSiteSelect.endBilldoard);
      }
      NavigateSiteSelect.endBilldoard = viewer.entities.add({
        position : Cesium.Cartesian3.fromDegrees(lng, lat),
        billboard :{
            image : '/public/img/endPoint.png',
            width : 35,
            height : 60,
            pixelOffset : new Cesium.Cartesian2(0.0, -30),
        }
      });
    }

    //视角前往目标点
    viewer.camera.flyTo({
      destination : Cesium.Cartesian3.fromDegrees(lng, lat, 5000.0),
      orientation : {
        heading : Cesium.Math.toRadians(0),
        pitch : Cesium.Math.toRadians(-90.0),
        roll : 0.0
      }
    });

  },

  routeSearch: function(){

    if (!Navigation.startPoint.lng 
      || !Navigation.startPoint.lat 
      || !Navigation.endPoint.lng 
      || !Navigation.endPoint.lat ) {
      $('#navigationBox_tips').text('请输入正确的起始点！');
      return false;
    }  

    var start = new Array(this.startPoint.lng, this.startPoint.lat);
    var end = new Array(this.endPoint.lng, this.endPoint.lat);

    console.log('Ready navigation ', start, end);

    // start navigation search
    RoutePlanning.routePlanning(start, end);

    return false; //阻止表单递交
  }
}

//启动地点搜索建议词查询
function localSuggestSearch(keyword, ulEleID){
  keyword = keyword.replace(/(^\s*)|(\s*$)/g, ""); //清除前后空格
  if(keyword == '') {
    if(ulEleID == 'navigationBox_suggests1'){
      Navigation.setStartPoint(null, null);
    }else if(ulEleID == 'navigationBox_suggests2'){
      Navigation.setEndPoint(null, null);
    }
    return;}
  NavigateSiteSelect.localSuggest(keyword, ulEleID);
}

// 绘制行政界线
var AdminBoundary = {
  glowingLines: null,

  drawBoundary: function(palceName){
    AdminBoundary.search(palceName);
  },

  search: function(searchContent){

    var config = {
      pageCapacity:10,  //每页显示的数量 
      onSearchComplete:this.whenBoundarySearchResult  //接收数据的回调函数
    };

    var map=new TMap("mapDiv");
    map.centerAndZoom(new TLngLat(106,33),6); //设置为全国

    //创建搜索对象
    var localsearch = new TLocalSearch(map, config);

    localsearch.search(searchContent);
  },

  whenBoundarySearchResult: function(results){
    AdminBoundary.clearPolylines();  //清除现有边界线

    var resultType = parseInt(results.getResultType());
    var polylines = new Array();
    if (resultType == 3 && results.getArea()['points'] != undefined) {
      polylines = AdminBoundary.getAllPolylinesPoints(results.getArea()['points']);
      if ($('#district_tips')) {
        $('#district_tips').css('display', 'none');
      }
    }else{
      console.warn('未搜索到边界线');
      if ($('#district_tips')) {
        $('#district_tips').html('未查找到该行政区的边界线，请检查输入');
        $('#district_tips').css('display', 'inline');
      }
      return;
    }

    AdminBoundary.drawPolylines(polylines);
  },

  strLatLng2arr: function(str){
    var latLng = new Array();
    var points = str.split(',');
    for(var i = 0; i < points.length; i++){
      latLng.push(points[i].split(' ')[0], points[i].split(' ')[1]);
    }
    return latLng;
  },

  getAllPolylinesPoints: function(areas){
    var polylines = new Array();
    for (var i = 0; i < areas.length; i++) {
      var polyline = AdminBoundary.strLatLng2arr(areas[i]['region']);
      polylines.push(polyline);
    }
    return polylines;
  },

  drawPolylines: function(polylines){
    console.log('-->draw polylines');

    this.clearPolylines();
    this.glowingLines = new Array();

    for (var i = 0; i < polylines.length; i++) {
      var polylineEntity = viewer.entities.add({
        name : 'Glowing blue line',
        polyline : {
          positions : Cesium.Cartesian3.fromDegreesArray(polylines[i]),
          width : 10,
          material : new Cesium.PolylineGlowMaterialProperty({
            glowPower : 0.2,
            color : Cesium.Color.BLUE
          })
        }
      });
      this.glowingLines.push(polylineEntity);
    }
    
  },

  clearPolylines: function(){
    if (this.glowingLines) {
      console.log('-->clear polyline');

      for (var i = 0; i < this.glowingLines.length; i++) {
        viewer.entities.remove(this.glowingLines[i]);
      }

      this.glowingLines = null;
    }
  }
}


//地址解析
var code = {}


//路径规划
var RoutePlanning = {
  map: null,
  glowingLine: null,

  init: function(){
    this.map = new T.Map("mapDiv");
    this.map.centerAndZoom(new T.LngLat(106,33),6); //设置为全国
  },

  routePlanning: function(startPoint, endPoint){
    RoutePlanning.init();
    RoutePlanning.drivePlanning(startPoint, endPoint);
  },

  drivePlanning: function(startPoint, endPoint){
    var config = {
      policy: 0,  //驾车策略 
      onSearchComplete: RoutePlanning.whenRouteSearchResult  //检索完成后的回调函数 
    }; 

    var drivingRoute = new T.DrivingRoute(this.map, config);

    var startLngLat = new T.LngLat(startPoint[0], startPoint[1]);
    var endLngLat = new T.LngLat(endPoint[0], endPoint[1]);

    //设置规划策略
    //0-最少时间；1-最短距离；2-避开高速；3-步行
    drivingRoute.setPolicy(0);

    //启动驾车路线搜索
    drivingRoute.search(startLngLat, endLngLat); 
  },

  whenRouteSearchResult: function(result){

    if(!result['RoutePlans']){
      console.warn('no route results');
      $('#navigationBox_tips').text('未搜索到路线');
      return;
    }

    var routes = result['RoutePlans'][0];console.log(routes);

    $('#navigationBox_tips').text('总路程 ' + routes['dis'] + '公里，预计耗时 ' + parseInt(routes['dur']/60) + '分钟');

    var distance = routes['dis'];
    var durtation = routes['dur'];
    var routeLatLng = routes['routelatlon'];

    var points = RoutePlanning.strLatLng2arr(routeLatLng);
    RoutePlanning.drawPolyline(points);
  },

  strLatLng2arr: function(str){
    var points = new Array();
    var strPointsArr = str.split(';');
    for (var i = 0; i < strPointsArr.length - 1; i++) {
      points.push(strPointsArr[i].split(',')[0], strPointsArr[i].split(',')[1]);
    }
    return points;
  },

  drawPolyline: function(points){
    console.log('-->draw polyline');
    RoutePlanning.clearPolyline();

    this.glowingLine = viewer.entities.add({
      name : 'Glowing green line',
      polyline : {
        positions : Cesium.Cartesian3.fromDegreesArray(points),
        width : 12,
        material : new Cesium.PolylineGlowMaterialProperty({
          glowPower : 0.2,
          color : Cesium.Color.GREEN
        })
      }
    });
  },

  clearPolyline: function(){
    if (this.glowingLine) {
      viewer.entities.remove(this.glowingLine);
    }
  }

}

//获取搜索建议
var NavigateSiteSelect = {
  map: null,
  config: null,
  resultDisplayEle: null,
  startBilldoard: null,
  endBillboard: null,

  init: function(ulEleID){
    this.map = new T.Map("mapDiv");
    this.map.centerAndZoom(new T.LngLat(106,33),6); //设置为全国
    this.config = {
      pageCapacity:5,    //每页显示的数量
      onSearchComplete:NavigateSiteSelect.localSuggestResult  //接收数据的回调函数
    };
    this.resultDisplayEle = ulEleID;
  },

  localSuggest: function(keyword, ulEleID){
    NavigateSiteSelect.init(ulEleID);
    var localsearch = new T.LocalSearch(this.map, this.config);

    localsearch.search(keyword, 4);
    // localsearch.search(keyword, 1);
  },

  localSuggestResult: function(result){
    
    var suggests = result.getSuggests();

    $('#'+NavigateSiteSelect.resultDisplayEle).empty();

    for (var i = 0; i < suggests.length && i < 5; i++) {
      $('#'+NavigateSiteSelect.resultDisplayEle).append('<li class="navigationBox_suggestsLi" onclick="NavigateSiteSelect.searchLatlng(this);">'+suggests[i]['name']+'<small>-'+suggests[i]['address']+'</small>'+'</li>');
    }

    $('#'+NavigateSiteSelect.resultDisplayEle).slideDown();
  },

  searchLatlng: function(ele){
    var keyword = $(ele).text().split('-')[1]+$(ele).text().split('-')[0];

    this.map = new T.Map("mapDiv");
    this.map.centerAndZoom(new T.LngLat(106,33),6); //设置为全国
    var config = {
      pageCapacity: 5,    //每页显示的数量
      onSearchComplete: NavigateSiteSelect.latlngSearchResult  //接收数据的回调函数
    };

    var localsearch = new T.LocalSearch(this.map, config);

    localsearch.search(keyword, 1);

    //设置页面
    $('#'+NavigateSiteSelect.resultDisplayEle).val($(ele).text().split('-')[0]);
    if(NavigateSiteSelect.resultDisplayEle == "navigationBox_suggests1"){
      $('#navigationBox_suggests1').slideUp();
    }else if(NavigateSiteSelect.resultDisplayEle == "navigationBox_suggests2"){
      $('#navigationBox_suggests2').slideUp();
    }
  },

  latlngSearchResult: function(results){
    var lat, lng;
    var resultType = parseInt(results.getResultType());
    // console.warn(results.getPois()[0]);
    
    if (resultType == 1) {
      lat = results.getPois()[0]['lonlat'].split(' ')[1];
      lng = results.getPois()[0]['lonlat'].split(' ')[0];
    }else if(resultType == 3){
      lat = results.getArea()['lonlat'].split(',')[1];
      lng = results.getArea()['lonlat'].split(',')[0];
    }else{
      console.warn('未搜索到地点');
      if(NavigateSiteSelect.resultDisplayEle == "navigationBox_suggests1"){
        $('#navigationBox_startPointInput').val('(未搜索到起点位置)');
      }else if(NavigateSiteSelect.resultDisplayEle == "navigationBox_suggests2"){
        $('#navigationBox_endPointInput').val('(未搜索到终点位置)');
      }
      return;
    }

    if(NavigateSiteSelect.resultDisplayEle == "navigationBox_suggests1"){
        $('#navigationBox_startPointInput').val(results.getKeyword());
      }else if(NavigateSiteSelect.resultDisplayEle == "navigationBox_suggests2"){
        $('#navigationBox_endPointInput').val(results.getKeyword());
      }

    Navigation.setSiteViewer(lat, lng);
  }

}
