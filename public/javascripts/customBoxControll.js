/*
* 依赖于CommonIndex.js
* 控制自定义窗口的样式、赋值、及动作实现
*/



/*******************************************************************
popDialogBox
*/

//显示弹出信息框
function showPopDialogBox(dataSourceId){

  setDialogBoxMsg(dataSourceId);
  
  $('#popDialogBox').show();
  $('#popDialogBox').animate({right:"3px" ,opacity: "1"}, "normal");

  hideLayerSelectBox();
  hideSearchBox();
  hideScreenSelectBox();
  hideTouchSelectBox();
  hideSpecialitySelectBox();
  hideStationSelectBox();
  hideSatelliteSelectBox();
  hideNavigationBox();

  weatherBox.reset();
}

//隐藏弹出信息框
function hidePopDialogBox(){
  $('#popDialogBox').animate({ right:"-75%" ,opacity: "0"}, "fast");
  $('#popDialogBox').hide();

  AdminBoundary.clearPolylines();
}

//通过id向服务器请求对应实体数据并将其写入至popDialogBox中
function setDialogBoxMsg(dataSourceId){
  $('document').ready(function(){
    $.ajax({
      type: 'GET',
      url: '/controll/getPopDialogBoxMsg.php?dataSourceId=' + dataSourceId,
      //data: ,
      dataType: 'json',
      success: function(data){
        if(data.status.success){
          //设置实体对应的弹窗内容
          $('#popDialogBox_head_title').html(data.headerText);

          $('#popDialogBox_govImage').attr("src", data.govImg);
          $('#popDialogBox_govUrl').attr("href", data.govUrl);
          $('.popDialogBox_descrip').css("background-image", "url('"+data.descripBg+"')");
          $('#popDialogBox_descripUrl').attr("href",data.descripUrl);
          $('#popDialogBox_descText1').html(data.descripText1);
          $('#popDialogBox_descText2').html(data.descripText2);setDescripText2(data.descripText2);
          $('#popDialogBox_descIcon').attr("src",data.descripIcon);
          $('#popDialogBox_2dBarcode').attr("src",data.descrip2dBarcode);
          $('#popDialogBox_barcode').attr("src",data.descripBarcode);
          $('#popDialogBox_logo').attr("src",data.descripLogo);

          // tools div
          $('.popDialogBox_tools').css("background-image", "url('"+data.toolsBg+"')");
          $.each(data.tools, function(index, value) {
            $('#popDialogBox_toolImg' + index).attr('src', value.img);
            $('#popDialogBox_toolText' + index).text(value.text);
            $('#popDialogBox_toolUrl' + index).attr('href', selectToolsUrl(value.url));
          });

          //绘制该entity对应地区的区域界线
          AdminBoundary.drawBoundary(data.district);

          setPopDialogCSS();

        }else{
          console.error('服务器返回数据错误', data.status.msg);
        }
      },
      error: function(XMLHttpRequest){
        console.error('服务器连接异常：' + XMLHttpRequest.status);
      }
    });
  });
}

// 根据当前客户端页面类型设置popDialogBox中URL为PC版或移动版
function selectToolsUrl(groupUrl){
  var url = groupUrl.split(';');
  if (url.length == 1) {
    // only one URL
    return url[0];
  }else if (url.length < 1) {
    // no URL
    console.warn('popDialogBox > tool > URL error');
    return '';
  }else{
    // 2 or more than 2 URL
    var thisPage = getCurrentPageName();
    if (thisPage == 'p-index') {
      //PC版URL
      return url[0];
    }else if (thisPage == 'm-index' || thisPage == 't-index') {// || thisPage == 't-index'
      //移动版URL
      return url[1];
    }else{
      //其它情况返回PC版
      return url[0];
    }
  }
}

//根据文字数量缩小文字字体
function setDescripText2(descripText2){
  var l = dataLength(descripText2);
  if(l <= 16){
    $('.popDialogBox_descText2').css('font-size', '23px');
  }else if (l > 16 && l <=26) {
    $('.popDialogBox_descText2').css('font-size', '16px');
  }else if(l > 26){
    $('.popDialogBox_descText2').css('font-size', '12px');
  }
}

//获取字符串长度
function dataLength(fData) 
{ 
  if(fData == null) return 0;
    var intLength=0 
    for (var i=0;i<fData.length;i++) 
    { 
        if ((fData.charCodeAt(i) < 0) || (fData.charCodeAt(i) > 255)) 
            intLength=intLength+2 
        else 
            intLength=intLength+1    
    } 
    return intLength;
} 

//根据页面情况设定排版细节，需在屏幕加载及改变时调用
function setPopDialogCSS(){
  console.info("reset CSS");

  //控制govImg、descImg图片比例
  var popDialogBoxWidth = $('.popDialogBox').width();
  $('.popDialogBox_gov').height(popDialogBoxWidth/5);
  $('.popDialogBox_descrip').height(popDialogBoxWidth*2/3);

  var popDialogBox_descText1_width = $('#popDialogBox_descText1').width();
  $('#popDialogBox_descText1').css("left", (popDialogBoxWidth - popDialogBox_descText1_width) / 2);

  var popDialogBox_descIconText2_width = $('#popDialogBox_descIconText2').width();
  $('#popDialogBox_descIconText2').css("left", (popDialogBoxWidth - popDialogBox_descIconText2_width) / 2);

  //设置popDialogBox_tool排列
  var width = $(".popDialogBox_tools").width() - 10; //减10防止小数进位溢出
  var wid = $(".popDialogBox_toolGap").width() * 3;
  var borderWidth = parseInt($(".popDialogBox_tool").css("border-left-width"));
  var toolPadding = parseInt($(".popDialogBox_tool").css("padding-left"));

  //设置popDialogBox_tool的宽度，且高度跟随宽度
  var popDialogBox_toolWidth = (width-wid)/4 - (borderWidth+toolPadding)*2;
  $(".popDialogBox_tool").css("width", popDialogBox_toolWidth);
  $(".popDialogBox_tool").css("height", popDialogBox_toolWidth);
}



/*******************************************************************
layerSelectBox
*/

//切换图层选择框显示/隐藏
function switchLayerSelectBox(){
  var opacity = $('#layerSelectBox').css('display');
  if (opacity === 'none') {
    showLayerSelectBox();
  }else{
    hideLayerSelectBox();
  }
}

//显示图层选择框
function showLayerSelectBox(){
  $('#layerSelectBox').slideDown();

  hidePopDialogBox();
  hideSearchBox();
  hideScreenSelectBox();
  hideTouchSelectBox();
  hideSpecialitySelectBox();
  hideStationSelectBox();
  hideSatelliteSelectBox();
  hideNavigationBox();
}

//隐藏图层选择框
function hideLayerSelectBox(){
  $('#layerSelectBox').slideUp(100);
}

//控制特产/站点的图层显示
function checkboxChanged(id){
  var checkbox = document.getElementById(id);
  if (checkbox.checked) {
    showData(id);
  }else{
    removeData(id);
  }
}

//图层列表点击效果
$(".layerSelectBox_list>input").click(function (event){
  var parent, ink, d, x, y;
  parent = $(this).parent();
  //create .ink element if it doesn't exist
  if(parent.find(".ink").length == 0)
    parent.prepend("<span class='ink'></span>");

  ink = parent.find(".ink");
  //incase of quick double clicks stop the previous animation
  ink.removeClass("animate");
  
  //set size of .ink
  if(!ink.height() && !ink.width())
  {
    //use parent's width or height whichever is larger for the diameter to make a circle which can cover the entire element.
    d = Math.max(parent.outerWidth(), parent.outerHeight());
    ink.css({height: d, width: d});
  }
  
  //get click coordinates
  //logic = click coordinates relative to page - parent's position relative to page - half of self height/width to make it controllable from the center;
  x = event.pageX - parent.offset().left - ink.width()/2;
  y = event.pageY - parent.offset().top - ink.height()/2;
  
  //set the position and add class .animate
  ink.css({top: y+'px', left: x+'px'}).addClass("animate");
});




/*******************************************************************
searchBox
*/

//切换搜索弹窗显示/隐藏
function switchSearchBox(){
  var opacity = $('#searchBoxContainer').css('display');
  if (opacity === 'none') {
    showSearchBox();
  }else{
    hideSearchBox();
  }
}

function showSearchBox(){
  $('#searchBoxContainer').slideDown();
  
  hidePopDialogBox();
  hideLayerSelectBox();
  hideScreenSelectBox();
  hideTouchSelectBox();
  hideSpecialitySelectBox();
  hideStationSelectBox();
  hideSatelliteSelectBox();
  hideNavigationBox();
}

function hideSearchBox(){
  $('#searchBoxContainer').slideUp(200);
}

//设置搜索类型范围
function setSearchType(obj){

  var idArr = new Array('0', '1', '2', '3', '4', '11', '12', '13', '14', '21', '100');

  var buttonIdArr = new Array();
  for (var i = 0; i < idArr.length; i++) {
    buttonIdArr[i] = 'searchBox_typeButton-'+idArr[i];
  }
  
  for (var i = 0; i < buttonIdArr.length; i++) {

    if (buttonIdArr[i] == obj.id){
      $($(obj)).css('border-top-width', '2px');
      $($(obj)).css('border-color', 'blue');
      $($(obj)).css('opacity', '1');
      
    }else{
      $('#'+buttonIdArr[i]).css('border-top-width', '1px');
      $('#'+buttonIdArr[i]).css('border-color', '#d4b466');
      $('#'+buttonIdArr[i]).css('opacity', '0.6');
    }
  }

  entitySearch(viewModel);  //viewModel视图模型来自CommonIndex.js全局变量
}

//设置搜索范围并调用数据库搜索即Bing搜索
function entitySearch(viewModel){

  if(viewModel._searchText == '') return;

  console.log('start search.');

  $('#searchBox_resultList').slideUp(100);
  $("#searchBox_resultListOL li").remove();


  var typeSearchFlagArr = new Array(false, false, false, false, false, false, false, false, false);

  var idArr = new Array('0', '1', '2', '3', '4', '11', '12', '13', '14', '21', '100');
  var buttonIdArr = new Array();
  for (var i = 0; i < idArr.length; i++) {
    buttonIdArr[i] = 'searchBox_typeButton-'+idArr[i];
  }
  //使用按钮透明度判断按钮是否被选中（弃用边框宽度判断，因在高分辨率显示屏上出现异常）
  if ($('#'+buttonIdArr[0]).css('opacity') == '1'){
    //全部查询
    for (var i = 0; i < typeSearchFlagArr.length; i++) {
      typeSearchFlagArr[i] = true;
    }
    GeoSearch(viewModel);  //调用Cesium原生Bing地标解析
    constructFormAndSend(viewModel, typeSearchFlagArr);   //http请求数据库查询

  }else if($('#'+buttonIdArr[10]).css('opacity') == '1'){
    //仅地址查询
    GeoSearch(viewModel);  //调用Cesium原生Bing地标解析

  }else{
    //仅指定类型查询
    for (var i = 1; i < buttonIdArr.length - 1; i++) {
      if ($('#'+buttonIdArr[i]).css('opacity') == '1'){

        typeSearchFlagArr[i-1] = true;
      }
    }

    constructFormAndSend(viewModel, typeSearchFlagArr);   //http请求数据库查询
  }
}

//地理查询（地标、城市、行政区）
function GeoSearch(viewModel){

  //首先使用天地图进行搜索，搜索失败后再由天地图搜索调起原生的geocode进行bing搜索
  TdtSearch.tdtSearch(viewModel);

  // geocode(viewModel);
}

//数据库搜索，构造查询表单并调用函数发送Ajax
function constructFormAndSend(viewModel, typeSearchFlagArr){

  var form = new FormData();
  form.append('requestOpt', '_searchEntity');
  form.append('text', viewModel._searchText);
  form.append('1', typeSearchFlagArr[0]);
  form.append('2', typeSearchFlagArr[1]);
  form.append('3', typeSearchFlagArr[2]);
  form.append('4', typeSearchFlagArr[3]);
  form.append('11', typeSearchFlagArr[4]);
  form.append('12', typeSearchFlagArr[5]);
  form.append('13', typeSearchFlagArr[6]);
  form.append('14', typeSearchFlagArr[7]);
  form.append('21', typeSearchFlagArr[8]);

  sendPostFormObj(form, '/controll/ControllTest.php', searchEntityRespond);
}

function flyTo(lat, lng, type_id){

  var layerId = getLayersIdByTypeId(type_id);
  var checked = document.getElementById(layerId).checked;
  if (!checked) {
    //模拟点击checked元素，以打开图层
    $('#'+layerId).trigger('click');
    console.log('Auto open layer: '+layerId);
  }

  viewer.camera.flyTo({
    destination : Cesium.Cartesian3.fromDegrees(lng, lat, 30000.0)
  });

}


/*******************************************************************
screenSelectBox
*/
function switchScreenSelectBox(){
  if ($('.screenSelectBox').css('display') == 'none') {
    showScreenSelectBox();
  }else{
    hideScreenSelectBox();
  }
}

function showScreenSelectBox(){
  var left = $('#screenSelectBoxButton').offset().left - $('#cesiumContainer').offset().left;
  $('.screenSelectBox').css('top', 40);
  $('.screenSelectBox').css('left', left);
  $('.screenSelectBox').slideDown('fast');

  hidePopDialogBox();
  hideLayerSelectBox();
  hideSearchBox();
  hideTouchSelectBox();
  hideSpecialitySelectBox();
  hideStationSelectBox();
  hideSatelliteSelectBox();
  hideNavigationBox();
}

function hideScreenSelectBox(){
  $('.screenSelectBox').slideUp('fast');
}

function switchScreen(obj){
  var clickedImg = $('#'+obj.id+'>img').attr('src');
  var targetType = getTargetScreen(clickedImg);
  if (targetType == 'full') {
    fullScreen();
  }else if(targetType == 'normal'){
    normalScreen();
  }else if(targetType == 'rich'){
    richScreen();
  }

  hideScreenSelectBox();
  exchangeImgSrc('screenSelectBoxButton', obj.id); ////对调图标

}

//切换全屏状态
function fullScreen(){
  if (getCurrentScreen() != 'full') {console.log('fulls');
    $('.cesium-fullscreenButton').trigger('click');
  }

  $('#navigation').hide();
  $('#title').hide();
  $('#cesiumContainer').css('width', '100%');
  $('#cesiumContainer').css('height', '100%');
}

function normalScreen(){
  if (getCurrentScreen() == 'full') {
    $('.cesium-fullscreenButton').trigger('click');
  }
  $('#navigation').hide();
  $('#title').hide();
  $('#cesiumContainer').css('width', '100%');
  $('#cesiumContainer').css('height', '100%');
}

function richScreen(){
  if (getCurrentScreen() == 'full') {
    $('.cesium-fullscreenButton').trigger('click');
  }
  $('#navigation').show();
  $('#title').show();
  $('#cesiumContainer').css('width', '85%');
  $('#cesiumContainer').css('height', '87%');
}

function getCurrentScreen(){
  var imgPath = "/public/img/";
  if ($('#screenSelectBoxButton>img').attr('src') == imgPath+'fullScreenButton.png') {
    return 'full';
  }else if($('#screenSelectBoxButton>img').attr('src') == imgPath+'normalScreenButton.png'){
    return 'normal';
  }else if($('#screenSelectBoxButton>img').attr('src') == imgPath+'richScreenButton.png'){
    return 'rich';
  }
  console.error('未知的屏幕类型');
}

function getTargetScreen(imgSrc){
  var imgPath = "/public/img/";
  if (imgSrc == imgPath+'fullScreenButton.png') {
    return 'full';
  }else if(imgSrc == imgPath+'normalScreenButton.png'){
    return 'normal';
  }else if(imgSrc == imgPath+'richScreenButton.png'){
    return 'rich';
  }else{
    console.error('未知的屏幕类型');
  }
}

function getTargetLayer(imgSrc){
  var imgPath = "/public/img/";
  if(imgSrc == imgPath+'YBJP_30_30.png'){
    return 'YBJP';
  }else if(imgSrc == imgPath+'JD_30_30.png'){
    return 'JD';
  }else if(imgSrc == imgPath+'NC_30_30.png'){
    return 'NC';
  }else if(imgSrc == imgPath+'ZY_30_30.png'){
    return 'ZY';
  }else if(imgSrc == imgPath+'YXWD_30_30.png'){
    return 'YXWD';  
  }else if(imgSrc == imgPath+'AX_30_30.png'){
    return 'AX';
  }else if(imgSrc == imgPath+'DW_30_30.png'){
    return 'DW';
  }else if(imgSrc == imgPath+'GR_30_30.png'){
    return 'GR';
  }else if(imgSrc == imgPath+'VSAT_30_30.png'){
    return 'VSAT';
  }else if(imgSrc == imgPath+'GPS_30_30.png'){
    return 'GPS';
  }else if(imgSrc == imgPath+'BDS_30_30.png'){
    return 'BDS';
  }else if(imgSrc == imgPath+'GLONASS_30_30.png'){
    return 'GLONASS';
  }else if(imgSrc == imgPath+'touch_30_30.png'){
    return 'touchModel';
  }else if(imgSrc == imgPath+'mouse_30_30.png'){
    return 'mouseModel';
  }else{
    console.error('未知的图层类型');
  }
}

function exchangeImgSrc(objId1, objId2){
  var imgSrc1 = $('#'+objId1+'>img').attr('src');
  var imgSrc2 = $('#'+objId2+'>img').attr('src');

  var title1 = $('#'+objId1).attr('title');
  var title2 = $('#'+objId2).attr('title');

  $('#'+objId1+'>img').attr('src', imgSrc2);
  $('#'+objId2+'>img').attr('src', imgSrc1);

  $('#'+objId1).attr('title', title2);
  $('#'+objId2).attr('title', title1);  
}


/*******************************************************************
specialitySelectBox
*/
function switchSpecialitySelectBox(){
  if ($('.specialitySelectBox').css('display') == 'none') {
    showSpecialitySelectBox();
  }else{
    hideSpecialitySelectBox();
  }

  //取消闪烁
  if(highlightObj['speciality'] != null){
    highlightObj['speciality'].stopHighlight();
    highlightObj['speciality'] = null;
    $('#specialitySelectBoxButton').css('-webkit-filter', 'grayscale(80%)');
  }else{
    var clickedImg = $('#specialitySelectBoxButton>img').attr('src');
    var targetType = getTargetLayer(clickedImg);
    if (targetType == 'YBJP') {
      selectedLayer('speciality_YBJP');
    }else if(targetType == 'JD'){
      selectedLayer('speciality_JD');
    }else if(targetType == 'NC'){
      selectedLayer('speciality_NC');
    }else if(targetType == 'ZY'){
      selectedLayer('speciality_ZY');
    }
    $('#specialitySelectBoxButton').css('-webkit-filter', 'grayscale(0%)');
  }
}

function showSpecialitySelectBox(){
  var left = $('#specialitySelectBoxButton').offset().left - $('#cesiumContainer').offset().left;
  $('.specialitySelectBox').css('left', left);
  $('.specialitySelectBox').slideDown('fast');

  hidePopDialogBox();
  hideLayerSelectBox();
  hideSearchBox();
  hideTouchSelectBox();
  hideScreenSelectBox();
  hideStationSelectBox();
  hideSatelliteSelectBox();
  hideNavigationBox();
}

function hideSpecialitySelectBox(){
  $('.specialitySelectBox').slideUp('fast');
}

function switchSpeciality(obj){
  var clickedImg = $('#'+obj.id+'>img').attr('src');
  var targetType = getTargetLayer(clickedImg);
  if (targetType == 'YBJP') {
    selectedLayer('speciality_YBJP');
  }else if(targetType == 'JD'){
    selectedLayer('speciality_JD');
  }else if(targetType == 'NC'){
    selectedLayer('speciality_NC');
  }else if(targetType == 'ZY'){
    selectedLayer('speciality_ZY');
  }

  hideSpecialitySelectBox();
  exchangeImgSrc('specialitySelectBoxButton', obj.id); ////对调图标
  $('#specialitySelectBoxButton').css('-webkit-filter', 'grayscale(0%)'); //灰色标记正在闪烁的图层
}


/*******************************************************************
 * stationSelectBox
 * */
function switchStationSelectBox(){
  if ($('.stationSelectBox').css('display') == 'none') {
    showStationSelectBox();
  }else{
    hideStationSelectBox();
  }

  //取消闪烁
  if(highlightObj['station'] != null){
    highlightObj['station'].stopHighlight();
    highlightObj['station'] = null;
    $('#stationSelectBoxButton').css('-webkit-filter', 'grayscale(80%)');
  }else{
    var clickedImg = $('#stationSelectBoxButton>img').attr('src');
    var targetType = getTargetLayer(clickedImg);
    if (targetType == 'YXWD') {
      selectedLayer('station_YXWD');
    }else if(targetType == 'AX'){
      selectedLayer('station_AX');
    }else if(targetType == 'DW'){
      selectedLayer('station_DW');
    }else if(targetType == 'GR'){
      selectedLayer('station_GR');
    }
    $('#stationSelectBoxButton').css('-webkit-filter', 'grayscale(0%)');
  }

}

function showStationSelectBox(){
  var left = $('#stationSelectBoxButton').offset().left - $('#cesiumContainer').offset().left;
  $('.stationSelectBox').css('left', left);
  $('.stationSelectBox').slideDown('fast');

  hidePopDialogBox();
  hideLayerSelectBox();
  hideSearchBox();
  hideTouchSelectBox();
  hideScreenSelectBox();
  hideSpecialitySelectBox();
  hideSatelliteSelectBox();
  hideNavigationBox();
}

function hideStationSelectBox(){
  $('.stationSelectBox').slideUp('fast');
}

function switchStation(obj){
  var clickedImg = $('#'+obj.id+'>img').attr('src');
  var targetType = getTargetLayer(clickedImg);
  if (targetType == 'YXWD') {
    selectedLayer('station_YXWD');
  }else if(targetType == 'AX'){
    selectedLayer('station_AX');
  }else if(targetType == 'DW'){
    selectedLayer('station_DW');
  }else if(targetType == 'GR'){
    selectedLayer('station_GR');
  }

  hideStationSelectBox();
  exchangeImgSrc('stationSelectBoxButton', obj.id); ////对调图标
  $('#stationSelectBoxButton').css('-webkit-filter', 'grayscale(0%)'); //灰色标记正在闪烁的图层
}


/*******************************************************************
 * satelliteSelectBox
 * */
function switchSatelliteSelectBox(){
  if ($('.satelliteSelectBox').css('display') == 'none') {
    showSatelliteSelectBox();
  }else{
    hideSatelliteSelectBox();
  }

  //取消闪烁/显示
  var clickedImg = $('#satelliteSelectBoxButton>img').attr('src');
  var targetType = getTargetLayer(clickedImg);
  if(highlightObj['satellite'] != null){
    highlightObj['satellite'].stopHighlight();
    highlightObj['satellite'] = null;
    if(targetType == 'BDS' || targetType == 'GPS' || targetType == 'GLONASS'){
      layerOnOffBySelectBox('satellite_' + targetType, false);
    }
    $('#satelliteSelectBoxButton').css('-webkit-filter', 'grayscale(80%)');
  }else{
    if (targetType == 'VSAT') {
      selectedLayer('satellite_VSAT');
    }else if(targetType == 'BDS'){
      selectedLayer('satellite_BDS');
    }else if(targetType == 'GPS'){
      selectedLayer('satellite_GPS');
    }else if(targetType == 'GLONASS'){
      selectedLayer('satellite_GLONASS');
    }
    $('#satelliteSelectBoxButton').css('-webkit-filter', 'grayscale(0%)');
  }

}

function showSatelliteSelectBox(){
  var left = $('#satelliteSelectBoxButton').offset().left - $('#cesiumContainer').offset().left;
  $('.satelliteSelectBox').css('left', left);
  $('.satelliteSelectBox').slideDown('fast');

  hidePopDialogBox();
  hideLayerSelectBox();
  hideSearchBox();
  hideTouchSelectBox();
  hideScreenSelectBox();
  hideSpecialitySelectBox();
  hideStationSelectBox();
  hideNavigationBox();
}

function hideSatelliteSelectBox(){
  $('.satelliteSelectBox').slideUp('fast');
}

function switchSatellite(obj){
  var clickedImg = $('#'+obj.id+'>img').attr('src');
  var targetType = getTargetLayer(clickedImg);
  if (targetType == 'VSAT') {
    selectedLayer('satellite_VSAT');
  }else if(targetType == 'BDS'){
    selectedLayer('satellite_BDS');
  }else if(targetType == 'GPS'){
    selectedLayer('satellite_GPS');
  }else if(targetType == 'GLONASS'){
    selectedLayer('satellite_GLONASS');
  }

  hideSatelliteSelectBox();
  exchangeImgSrc('satelliteSelectBoxButton', obj.id); ////对调图标
  $('#satelliteSelectBoxButton').css('-webkit-filter', 'grayscale(0%)'); //灰色标记正在闪烁的图层
}


//打开图层并闪烁显示
function selectedLayer(layerId){
  console.info('selected-->' + layerId);

  var waitTime = 0; //等待图层加载的时间ms

  //停止现有的闪烁
  var layerType = layerId.substr(0, layerId.indexOf('_'));
  if (highlightObj[layerType] != null) {
    highlightObj[layerType].stopHighlight();
    highlightObj[layerType] = null;
  }

  //加载图层（如果未加载）
  var checked = document.getElementById(layerId).checked;
  if (!checked) {
    //模拟点击checked元素，以打开图层
    $('#'+layerId).trigger('click');
    console.log('ready to auto open layer: '+layerId);

    waitTime = 1000;
  }

  //卫星图层无需闪烁，且保持仅一个卫星图层开启
  if(layerId == 'satellite_BDS'){
    highlightObj[layerType] = new highlightLayers([]); //给与空闪烁对象但不闪烁
    lookAtSatellite();
    layerOnOffBySelectBox('satellite_GPS', false);
    layerOnOffBySelectBox('satellite_GLONASS', false);
    return;
  }else if(layerId == 'satellite_GPS'){
    highlightObj[layerType] = new highlightLayers([]); //给与空闪烁对象但不闪烁
    lookAtSatellite();
    layerOnOffBySelectBox('satellite_BDS', false);
    layerOnOffBySelectBox('satellite_GLONASS', false);
    return;
  }else if(layerId == 'satellite_GLONASS'){
    highlightObj[layerType] = new highlightLayers([]); //给与空闪烁对象但不闪烁
    lookAtSatellite();
    layerOnOffBySelectBox('satellite_GPS', false);
    layerOnOffBySelectBox('satellite_BDS', false);
    return;
  }

  setTimeout(function(){

    if (layersDataSourceArr[layerId] == null) {console.warn('图层数据为空，请重试。'); return;}

    console.info('Heightlight-->', layerId);
    var entities = layersDataSourceArr[layerId].entities.values;

    highlightObj[layerType] = new highlightLayers(entities);
    highlightObj[layerType].highlightEntities();

    regainLanuchView();
  }, waitTime);
}

// 缩放至卫星视角
function lookAtSatellite(){
  viewer.camera.flyTo({
      destination : Cesium.Cartesian3.fromDegrees(105, 15, 100000000.0),
      orientation : {
        heading : Cesium.Math.toRadians(0),
        pitch : Cesium.Math.toRadians(-90),
        roll : 0.0 
      },
      complete : function(){
        console.info("look at satellite.");
      }
    });
}

// 恢复至初始视角
function regainLanuchView(){
  viewer.camera.flyTo({
      destination : Cesium.Cartesian3.fromDegrees(105, 15, 5000000.0),
      orientation : {
        heading : Cesium.Math.toRadians(0),
        pitch : Cesium.Math.toRadians(-68.0),
        roll : 0.0
      },
      complete : function(){
        console.info("fly to lanuch view.");
      }
    });
}

/**
* class 高亮图层类
*/
function highlightLayers(entities){
  this.entities = entities;
  this.frequency = 1.5; // 次/秒
  this.originalColor = null;
  this.intervalID = null;

  this.highlightEntities = function(){
    if (this.entities.length <= 0) {return;}
    this.originalColor = this.entities[0].label.fillColor._value;
    var that = this;
    this.intervalID = setInterval(function(){
      that.highlight();
    }, 1000/this.frequency);
  }

  this.highlight = function(){
    var targetColor, targetScale;

    if(this.cesiumColorEqual(this.entities[0].label.fillColor._value, this.originalColor)){
      targetColor = Cesium.Color.RED;
      targetScale = 1.5;
    }else{
      targetColor = this.originalColor;
      targetScale = 1;
    }

    for (var i = 0; i < this.entities.length; i++){
      var entity = this.entities[i];
      entity.label.fillColor = targetColor;
      entity.billboard.scale = targetScale;
    }
  }

  this.stopHighlight = function(){
    if(this.intervalID != null){
      clearInterval(this.intervalID); //清除定时器
    }

    for (var i = 0; i < this.entities.length; i++){
      var entity = this.entities[i];
      entity.label.fillColor = this.originalColor;
      entity.billboard.scale = 1;
    }
  }

  this.cesiumColorEqual = function(c1, c2){
    if(c1.red == c2.red &&
    c1.blue == c2.blue &&
    c1.green == c2.green &&
    c1.alpha == c2.alpha){
      return true;
    }else{
      return false;
    }
  }
}


/* 多人触摸模式切换 */
function touchScreenSelectBox(){
  if ($('.touchSelectBox').css('display') == 'none') {console.log('touchScreenSelectBox');
    showTouchSelectBox();
  }else{
    hideTouchSelectBox();
  }
  return;
}

function showTouchSelectBox(){

  var left = $('#touchSelectBoxButton').offset().left - $('#cesiumContainer').offset().left;
  $('.touchSelectBox').css('left', left);
  $('.touchSelectBox').slideDown('fast');

  hidePopDialogBox();
  hideLayerSelectBox();
  hideSearchBox();
  hideScreenSelectBox();
  hideSpecialitySelectBox();
  hideStationSelectBox();
  hideSatelliteSelectBox();
  hideNavigationBox();
}

function hideTouchSelectBox(){
  $('.touchSelectBox').slideUp('fast');
}

function switchTouchScreen(obj){
  var clickedImg = $('#'+obj.id+'>img').attr('src');
  var screenModel = getTargetLayer(clickedImg);
  if(screenModel == 'touchModel'){
    window.location.href="/view/t-index.php";
  }else if(screenModel == 'mouseModel'){
    window.location.href="/view/p-index.php";
  }
}


/* 导航窗口 */
function navigationBoxToggle(){
  if($('#comprehensiveSearchBox').is(":hidden")){
    showNavigationBox();
  }else{
    hideNavigationBox();
  }
}

function showNavigationBox(){
  CSB.showThis();

  hidePopDialogBox();
  hideLayerSelectBox();
  hideSearchBox();
  hideScreenSelectBox();
  hideSpecialitySelectBox();
  hideStationSelectBox();
  hideSatelliteSelectBox();
  hideTouchSelectBox();
}

function hideNavigationBox(){
  CSB.hiddenThis();
}
