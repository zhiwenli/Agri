//提供浏览器端Javascript功能函数


function pwdLen(id){
  var pwd = document.getElementById(id).value;
  if(pwd.length < 8){
    $('#'+id+'_tips').html('密码长度应不小于8位');
    return false;
  }else{
    $('#'+id+'_tips').html('');
    return true;
  }
}

function pwdconfirm(pwd, pwd_conform){
  var rp = $('#'+pwd).val();
  var rpc = $('#'+pwd_conform).val();

  if (rp !== rpc) {
    $('#'+pwd_conform+'_tips').html('两次输入的密码应当一致');
    return false;
  }else{
    $('#'+pwd_conform+'_tips').html('');
    return true;
  }
}

//对传入的id对应的元素值进行md5加密
function encryptionEle(pwd){
  document.getElementById(pwd).value = md5(document.getElementById(pwd).value);
}

//cesiuim entity预览
function startEntityPreview(){

  var type_id = $("#type_id").val();
  var name = $("input[name='name']").val();
  var lat = $("input[name='lat']").val();
  var lng = $("input[name='lng']").val();
  var img = $("input[name='icon']").val();

  var default_icon = getTypeDefaultIcon(Number(type_id));
  var original_icon = $("#original_icon").html();       //数据库中已经设置的图片

  if (lat == '' || lng == '') {return;}                 //未设置经纬度不予刷新

  if (img == '' && original_icon == '') {
    entityPreview(name, lat, lng, '/public/img/'+default_icon);
  }else if(img == '' && original_icon != ''){
    entityPreview(name, lat, lng, '/public/img/userImg/'+original_icon);
  }else if(img != ""){
    //如果用户选择了文件，就Ajax上传临时文件,在其回调中重新刷新图标
    sendPostForm('addEntityStep1', '/controll/tempFileRecive.php', refreshPreviewEntityIcon);
  }

}

function getTypeDefaultIcon(type_id){
  var default_icon = '';
  if (type_id == 1) {
    default_icon = 'default_speciality_YBJP_img.png';
  }else if (type_id == 2) {
    default_icon = 'default_speciality_ZY_img.png';
  }else if (type_id == 3) {
    default_icon = 'default_speciality_NC_img.png';
  }else if (type_id == 4) {
    default_icon = 'default_speciality_JD_img.png';
  }else if (type_id == 11) {
    default_icon = 'default_station_YXWD_img.png';
  }else if (type_id == 12) {
    default_icon = 'default_station_AX_img.png';
  }else if (type_id == 13) {
    default_icon = 'default_station_DW_img.png';
  }else if (type_id == 14) {
    default_icon = 'default_station_GR_img.png';
  }else if (type_id == 21) {
    default_icon = 'default_satellite_VSAT_img.png';
  }

  return default_icon;
}

function fileInputChk(fileInputWidget) {

  var tipId = fileInputWidget.name + "_tips";
  var f = fileInputWidget.files;

  //判断文件大小 字节。实际控制文件大小为3MB
  if (f[0].size > 3096*1024) {
    $('#'+tipId).show();
    $('#'+tipId).html("文件超过限制大小2MB，目前大小为: "+f[0].size/1024+" KB");
  }else{
    $('#'+ tipId).hide();
  }
}

//前往修改entity的页面
function modifyEntity(type_id, entity_id){
  var url = "/view/engine/addEntity.php?type_id="+type_id+"&entity_id="+entity_id;
  window.open(url);
}

function deleteEntity(type_id, entity_id){

  if(!confirm("放弃后将无法恢复，确认放弃该条数据？")){
    return false;
  }

  var form = new FormData();
  form.append("requestOpt", "_delete");
  form.append("type_id", type_id);
  form.append("entity_id", entity_id);
  sendPostFormObj(form, '/controll/ControllTest.php', function(data){
    if(!data.status.success){console.error("删除失败, "+data.status.msg);}
    window.location.href="entityTable.php?type_id="+type_id; 
  });
}

function modifyUser(user_id){
  window.location.href="updateUser.php?user_id="+user_id;
}

function deleteUser(user_id){

  if(!confirm("删除后将无法恢复，确认删除该用户？")){
    return false;
  }

  var form = new FormData();
  form.append("requestOpt", "_deleteUser");
  form.append("user_id", user_id);
  sendPostFormObj(form, '/controll/ControllTest.php', function(data){
    if(!data.status.success){console.error("删除失败, "+data.status.msg);}
    // window.location.href="userTable.php?type_id=100";
    window.location.reload();
  });
}

function changeStatus(eleObj, type_id, entity_id){

  return flase;   //禁用快速切换状态功能

  var status = $("#"+eleObj.id).html();

  var form = new FormData();
  form.append("requestOpt", "_update");
  form.append("type_id", type_id);
  form.append("entity_id", entity_id);

  if (status == "待审核") {
    //待审改上线
    form.append("status", 20);
    sendPostFormObj(form, '/controll/ControllTest.php', function(data){
      if(data.status.success){
        $("#"+eleObj.id).attr("class", "label label-success label-mini");
        $("#"+eleObj.id).html("已上线");
      }
    });
  }else if(status == "已上线"){
    //上线改拒绝
    form.append("status", 0);
    sendPostFormObj(form, '/controll/ControllTest.php', function(data){
      if(data.status.success){
        $("#"+eleObj.id).attr("class", "label label-danger label-mini");
        $("#"+eleObj.id).html("已拒绝");
      }
    });
  }else if(status == "已拒绝"){
    //拒绝改待审
    form.append("status", 5);
    sendPostFormObj(form, '/controll/ControllTest.php', function(data){
      if(data.status.success){
        $("#"+eleObj.id).attr("class", "label label-warning label-mini");
        $("#"+eleObj.id).html("待提交");
      }
    });
  }else if(status == "待提交"){
    //拒绝改待审
    form.append("status", 10);
    sendPostFormObj(form, '/controll/ControllTest.php', function(data){
      if(data.status.success){
        $("#"+eleObj.id).attr("class", "label label-info label-mini");
        $("#"+eleObj.id).html("待审核");
      }
    });
  }
}

//entity状态修改为提交审核
function submitToAudit(type_id, entity_id){

  if(!confirm("您输入的数据，将提交给管理员进行审核并发布。请您再次确认：是否提交审核？")){
    return false;
  }

  var form = new FormData();
  form.append("requestOpt", "_update");
  form.append("entity_id", entity_id);
  form.append("type_id", type_id);
  form.append("status", 10);

  sendPostFormObj(form, '/controll/ControllTest.php', function(data){
      if(data.status.success){
        $("#oprtTip").show();
        $("#oprtTip").attr("class", "label label-warning pull-right");
        $("#oprtTip").html("已提交审核");
        $("#oprtTip").fadeOut(3000, function(){
          window.location.href = "/view/engine/entityTable.php?type_id="+type_id;
        });
      }
    });
}

//鼠标移动至输入框即标出对应popdialog元素
function mouseoverInputEle(ele){
  var eleName = ele.name;
  var color = "red";


  if(eleName.indexOf("Img") > 0 || 
    eleName.indexOf("Bg") > 0 || 
    eleName.indexOf("Icon") > 0 || 
    eleName.indexOf("Barcode") > 0 || 
    eleName.indexOf("barcode") > 0 || 
    eleName.indexOf("logo") > 0
    ){
    //图片
    color = "red";
    $("#preview_"+eleName).css("border-style", "dashed");
    $("#preview_"+eleName).css("border-width", "5px");
    $("#preview_"+eleName).css("border-color", color);
  }else if (eleName.indexOf("Text") > 0 || 
    eleName.indexOf("title") > 0
    ) {
    //文字
    color = "yellow";
    $("#preview_"+eleName).css("border-style", "dashed");
    $("#preview_"+eleName).css("border-width", "5px");
    $("#preview_"+eleName).css("border-color", color);
  }else if(eleName.indexOf("Url") > 0){
    //链接
    // color = ;
    if (ele.name == "popDialogBox_govUrl") {
      ($("#preview_"+eleName)).parent().css("border-style", "dashed");
      ($("#preview_"+eleName)).parent().css("border-width", "5px");
      ($("#preview_"+eleName)).parent().css("border-color", "GoldenRod");
    }else if(ele.name == "popDialogBox_descUrl"){
      ($("#preview_"+eleName)).children().css("border-style", "dashed");
      ($("#preview_"+eleName)).children().css("border-width", "6px");
      ($("#preview_"+eleName)).children().css("border-color", "GoldenRod");
    }else if(ele.name.indexOf("popDialogBox_toolUrl") >= 0){
      ($("#preview_"+eleName)).parent().css("border-width", "5px");
    }
    
  }

}

//鼠标离开即回复元素标记
function mouseoutInputEle(ele){

  if(ele.name.indexOf("Url") > 0){
    //链接
    // color = ;
    if (ele.name == "popDialogBox_govUrl") {
      ($("#preview_"+ele.name)).parent().css("border-style", "none");
    }else if(ele.name == "popDialogBox_descUrl"){
      ($("#preview_"+ele.name)).children().css("border-style", "none");
    }else if(ele.name.indexOf("popDialogBox_toolUrl") >= 0){
      ($("#preview_"+ele.name)).parent().css("border-width", "2px");
    }
    
  }else{
    $("#preview_"+ele.name).css("border-style", "none");
  }
}

//addEntityStep2提交更新,只提交当前元素数据和必须的配置项信息
function updateEntity(ele){
  var formId = "addEntityStep2";
  var form = new FormData(document.getElementById(formId));

  var newform = new FormData();
  newform.append("requestOpt", form.get("requestOpt"));
  newform.append("type_id", form.get('type_id'));
  newform.append("entity_id", form.get('entity_id'));
  newform.append("status", form.get('status'));
  newform.append(ele.name, form.get(ele.name));
  return sendPostFormObj(newform, '/controll/ControllTest.php', addEntityStep2FormRespond);
}

//获取字符串长度
function dataLength(fData)
{
    var intLength=0;
    if (!fData) {return intLength;}
    for (var i=0;i<fData.length;i++)
    {
        if ((fData.charCodeAt(i) < 0) || (fData.charCodeAt(i) > 255))
            intLength=intLength+2
        else 
            intLength=intLength+1
    }
    return intLength;
}

//加载
function loadCharts(){
  var doughnut1Data = {
  labels: [
      "精品",
      "网点",
      "VSAT"
  ],
  datasets: [
      {
          data: [300, 50, 100],
          backgroundColor: [
              "#FF6384",
              "#36A2EB",
              "#FFCE56"
          ],
          hoverBackgroundColor: [
              "#FF6384",
              "#36A2EB",
              "#FFCE56"
          ]
      }]
  };

  var ctx = document.getElementById("doughnut1").getContext("2d");

  var myDoughnutChart = new Chart(ctx, {
    type: 'doughnut',
    data: doughnut1Data
  });
}

