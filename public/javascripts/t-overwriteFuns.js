

/*添加触摸模式切换按钮,仅在t-index.js中调用*/
function addTouchSwitchButton(){
  var touchSelectBoxButton = document.createElement('button');
  touchSelectBoxButton.setAttribute('type','button');
  touchSelectBoxButton.setAttribute('title','多点触控');
  touchSelectBoxButton.setAttribute('id','touchSelectBoxButton');
  touchSelectBoxButton.setAttribute('onclick','touchScreenSelectBox()');
  touchSelectBoxButton.setAttribute('class','cesium-button cesium-toolbar-button');
  touchSelectBoxButton.innerHTML = '<img style="width:100%;height:100%;" src="/public/img/touch_30_30.png">';
  
  var toolbar = document.getElementsByClassName('cesium-viewer-toolbar')[0];
  toolbar.appendChild(touchSelectBoxButton);
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
} 

// 存储每个entity的弹窗打开状态
var entityPopDialogBoxStatus = new Array();
$('#touchSelectBoxButton1 > img').attr('src', '/public/img/mouse_30_30.png');
$('#touchSelectBoxButton1').attr('title', '鼠标或单点触控');

//显示弹出信息框
function showPopDialogBox(dataSourceId, position){

  // if entity popDialog box alerdy exist, remove it, and re-buliding
  if (entityPopDialogBoxStatus['popDialogBox_' + dataSourceId]) {
    $('#popDialogBox_'+dataSourceId).remove();
  }

  //标志已存在该弹窗
  entityPopDialogBoxStatus['popDialogBox_' + dataSourceId] = true;

  // 复制性的弹窗
  var clonePopDialogBox = $('#popDialogBox').clone(true);

  //重新设置ID
  var randomStr = dataSourceId;
  clonePopDialogBox = modifyPopDialogBoxId(clonePopDialogBox, randomStr);

  //将新对象添加至html
  $('#popDialogBox').before(clonePopDialogBox);

  //设置信息
  setDialogBoxMsg(dataSourceId, randomStr);
  setPopDialogCSS(dataSourceId);

  //显示
  clonePopDialogBox.show();
  setPopDialogBoxPosition(position, clonePopDialogBox);
  clonePopDialogBox.animate({opacity: "1"}, "normal");

  hideLayerSelectBox();
  hideSearchBox();
  hideScreenSelectBox();
  hideSpecialitySelectBox();
  hideStationSelectBox();
  hideSatelliteSelectBox();
}

//修改弹窗本身及其子元素ID
function modifyPopDialogBoxId(popDialogBoxEle, randomStr){
  
  popDialogBoxEle.attr('id', 'popDialogBox_' + randomStr);

  popDialogBoxEle.find('*').each(function(i, ele){
    if ($(ele).attr('id')) {
      var oldId = $(ele).attr('id');
      $(ele).attr('id', oldId + '_' + randomStr);

      ele.onclick = holdHref;
    }
  });

  return popDialogBoxEle;
}

//set position for pop dialog box, make sure it will be not overflow current screen
function setPopDialogBoxPosition(clickPosition, popDialogBoxEle){

  var w = popDialogBoxEle.width();
  var h = popDialogBoxEle.height();

  var screenH = document.body.clientHeight;
  var screenW = document.body.clientWidth;

  if ((clickPosition.x + w) > screenW) {
    popDialogBoxEle.css('left', clickPosition.x - w - 15);
  }else{
    popDialogBoxEle.css('left', clickPosition.x + 15);
  }

  if ((clickPosition.y + h) > screenH) {
    var overHeight = clickPosition.y + h - screenH;
    popDialogBoxEle.css('top', clickPosition.y - overHeight);
  }else{
    popDialogBoxEle.css('top', clickPosition.y);
  }
}

//隐藏弹出信息框
function hidePopDialogBox(closeButton){

  var divId = $(closeButton).parent().attr('id');

  $('#'+divId).hide('fast', function(){
    $('#'+divId).remove(); //移除
  });
  entityPopDialogBoxStatus[divId] = false;

  AdminBoundary.clearPolylines();
}

//通过id向服务器请求对应实体数据并将其写入至popDialogBox中
function setDialogBoxMsg(dataSourceId, randomStr){
  $('document').ready(function(){
    $.ajax({
      type: 'GET',
      url: '/controll/getPopDialogBoxMsg.php?dataSourceId=' + dataSourceId,
      //data: ,
      dataType: 'json',
      success: function(data){
        if(data.status.success){
          //设置实体对应的弹窗内容
          $('#popDialogBox_head_title_' + randomStr).html(data.headerText);

          $('#popDialogBox_govImage_' + randomStr).attr("src", data.govImg);
          $('#popDialogBox_govUrl_' + randomStr).attr("href", data.govUrl);
          $('#popDialogBox_descripUrl_' + randomStr + ' > .popDialogBox_descrip').css("background-image", "url('"+data.descripBg+"')");
          $('#popDialogBox_descripUrl_' + randomStr).attr("href",data.descripUrl);
          $('#popDialogBox_descText1_' + randomStr).html(data.descripText1);
          $('#popDialogBox_descText2_' + randomStr).html(data.descripText2);setDescripText2(data.descripText2, '#popDialogBox_descText2_' + randomStr);
          $('#popDialogBox_descIcon_' + randomStr).attr("src",data.descripIcon);
          $('#popDialogBox_2dBarcode_' + randomStr).attr("src",data.descrip2dBarcode);
          $('#popDialogBox_barcode_' + randomStr).attr("src",data.descripBarcode);
          $('#popDialogBox_logo_' + randomStr).attr("src",data.descripLogo);

          // tools div
          $('#popDialogBox_tools > .popDialogBox_tools').css("background-image", "url('"+data.toolsBg+"')");
          $.each(data.tools, function(index, value) {
            $('#popDialogBox_toolImg' + index+ '_' + randomStr).attr('src', value.img);
            $('#popDialogBox_toolText' + index+ '_' + randomStr).text(value.text);
            $('#popDialogBox_toolUrl' + index+ '_' + randomStr).attr('href', selectToolsUrl(value.url));
          });

          console.info(data.descripText2);

          //绘制该entity对应地区的区域界线
          AdminBoundary.drawBoundary(data.district);

          setPopDialogCSS(dataSourceId);

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

//根据页面情况设定排版细节，需在屏幕加载及改变时调用
function setPopDialogCSS(sourceId){
  console.info("reset CSS");

  //控制govImg、descImg图片比例
  var popDialogBoxWidth = $('#popDialogBox_'+sourceId).width();
  $('.popDialogBox_gov').height(popDialogBoxWidth/5);
  $('.popDialogBox_descrip').height(popDialogBoxWidth*2/3);

  var popDialogBox_descText1_width = $('#popDialogBox_descText1_'+sourceId).width();
  $('#popDialogBox_descText1_'+sourceId).css("left", (popDialogBoxWidth - popDialogBox_descText1_width) / 2);

  var popDialogBox_descIconText2_width = $('#popDialogBox_descIconText2_'+sourceId).width();
  $('#popDialogBox_descIconText2_'+sourceId).css("left", (popDialogBoxWidth - popDialogBox_descIconText2_width) / 2);

  //设置popDialogBox_tool排列
  var width = $("#popDialogBox_tools_"+sourceId).width() - 10; //减10防止小数进位溢出
  var wid = $(".popDialogBox_toolGap").width() * 3;
  var borderWidth = parseInt($(".popDialogBox_tool").css("border-left-width"));
  var toolPadding = parseInt($(".popDialogBox_tool").css("padding-left"));

  //设置popDialogBox_tool的宽度，且高度跟随宽度
  var popDialogBox_toolWidth = (width-wid)/4 - (borderWidth+toolPadding)*2;
  $("#popDialogBox_tools_"+sourceId+" > .popDialogBox_tool").css("width", popDialogBox_toolWidth);
  $("#popDialogBox_tools_"+sourceId+" > .popDialogBox_tool").css("height", popDialogBox_toolWidth);
}


//根据文字数量缩小文字字体
function setDescripText2(descripText2, eleId){
  var l = dataLength(descripText2);
  if(l <= 16){
    $(eleId).css('font-size', '23px');
  }else if (l > 16 && l <=26) {
    $(eleId).css('font-size', '16px');
  }else if(l > 26){
    $(eleId).css('font-size', '12px');
  }
}

function holdHref(e){
  e.preventDefault(e);
  
  if(!this.href){return;}
  console.log(this.href); // 'this' means that the ele who was clicked

  var sourceId = getPopDialogBoxSourceId(this.id);

  hidePopDialogBox_main(sourceId);
  showIframe(sourceId, this.href);
}

function leaveIframe(backEle){
  var sourceId = getPopDialogBoxSourceId(backEle.parentNode.id);
  showPopDialogBox_main(sourceId);
  hideIframe(sourceId);
  hidePopDialogBox_back(sourceId);

  setPopDialogCSS(sourceId);
}


function hidePopDialogBox_main(sourceId){
  $('#popDialogBox_' + sourceId + ' > .popDialogBox_mian').hide();
}

function showPopDialogBox_main(sourceId){
  $('#popDialogBox_' + sourceId + ' > .popDialogBox_mian').show();
}

function showPopDialogBox_back(sourceId){
  $('#popDialogBox_' + sourceId + ' > .popDialogBox_back').fadeIn();
}

function hidePopDialogBox_back(sourceId){
  $('#popDialogBox_' + sourceId + ' > .popDialogBox_back').fadeOut();
}

function showIframe(sourceId, url){
  $('#popDialogBox_iframe_' + sourceId).attr('src', url);
  $('#popDialogBox_iframe_' + sourceId).slideDown('slow');

  $('#popDialogBox_foot_' + sourceId).show();

  showPopDialogBox_back(sourceId);
}

function hideIframe(sourceId){
  $('#popDialogBox_foot_' + sourceId).hide();
  $('#popDialogBox_iframe_' + sourceId).slideUp();

  setPopDialogCSS(sourceId);
}

function getPopDialogBoxSourceId(anyId){
  var arr = anyId.split('_');
  var sourceId = arr[arr.length - 2] + '_' + arr[arr.length - 1];
  return sourceId;
}