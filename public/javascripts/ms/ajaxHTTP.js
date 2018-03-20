
function sendPostFormObj(form, targetUrl, callback){
  console.log("send a Ajax HTTP");

  form = formDataFilter(form);

  $.ajax({
    type: 'POST',
    url: targetUrl,
    data: form,
    contentType: false, //取消默认值，使用XMLHttpRequest自动赋值（传文件）
    processData: false, //避免Ajax对formdata的格式化，交由XMLHttpRequest处理（传文件）
    dataType: 'json', //返回的数据格式
    success: callback,
    error: function(XMLHttpRequest){
        console.error('服务器响应异常：' + XMLHttpRequest.status);
    }
  });

  return false;
}

function sendPostForm(formId, targetUrl, callback){
  var form = new FormData(document.getElementById(formId));
  sendPostFormObj(form, targetUrl, callback);

  return false;
}

//ＷＡＲＮＮＩＮＧ！ 待改进
//该函数执行部分在各种移动端均爆出错误，因此使用try catch finally
//过滤掉formData中超过限制大小的文件
function formDataFilter(formdata){
  try{
    var arr = formdata.keys();
    for (var key of arr){
      var value = formdata.get(key);

      if (typeof(value) === 'object' && value.size > 3096*1024) {
        formdata.delete(key);
        console.warn('文件大小超过预期，已丢弃该文件，', value.name, value.size, 'KB');
      }
    }
  }catch(err){
    console.err('表单文件过滤函数出错，formDataFilter()');
  }finally{
    return formdata;
  }

}


//Response functions
//-----------------------------------------------------------------------

function loginFormRespond(data){
  if(data.status.success){
    // $('.login-register-tips').html('登录成功');
    window.location.href=data.nextPage;
  }else{
    $('.login-register-tips').html(data.status.msg);
    $('#pwd').val('');
  }
}

function forgotPasswordRespond(data){
  if(data.status.success){
    $('#forgotPassword-tips').html('已发送密码找回链接，请前往邮箱查看，链接将于30分钟后失效。');
    setTimeout(function(){
        window.location.reload(true);
    }, 3000);
  }else{
    $('#forgotPassword-tips').html(data.status.msg);
  }
}

function registerFormRespond(data){
  if(data.status.success){
    $('.login-register-tips').html('注册成功！即将前往登录页面');
    alert('操作成功，即将自动跳转');
    setTimeout(function(){
        window.location.href="/view/engine/login.php";
    }, 1500);
  }else{
    $('.login-register-tips').html(data.status.msg);
    $('#pwd').val($('#pwd_conform').val());

    $.each(data.status.msg, function(objName, objValue) {
        //console.log(this);
        $('#'+objName+'_tips').html(objValue);
    });
    }
}

function addUserByAdminFormRespond(data){
  if(data.status.success){
    alert('已成功添加用户！');
    setTimeout(function(){
        window.location.href="/view/engine/userTable.php?type_id=100";
    }, 500);
  }else{
    $('.login-register-tips').html(data.status.msg);
    $('#pwd').val($('#pwd_conform').val());

    $.each(data.status.msg, function(objName, objValue) {
        //console.log(this);
        $('#'+objName+'_tips').html(objValue);
    });
    }
}

function updateUserRespond(data){
  if(data.status.success){
    window.location.href="/view/engine/";
  }else{
    $('#pwd').val($('#pwd_conform').val());

    $.each(data.status.msg, function(objName, objValue) {
      $('#'+objName+'_tips').html(objValue);
    });
  }
}

function addEntityStep1FormRespond(data){
    if(data.status.success){
      console.log("添加成功，准备前往" + data.nextPage);
      window.location.href=data.nextPage;
  }else{

    $.each(data.status.msg, function(objName, objValue) {
        //console.log(this);
        $('#'+objName+'_tips').html(objValue);
        $('#'+objName+'_tips').css("display", 'inline');
    });
    }
}

function refreshPreviewEntityIcon(data){
  if(data.status.success){
    $.each(data.imgPathArr, function(objName, objValue) {
        var name = $("input[name='name']").val();
        var lat = $("input[name='lat']").val();
        var lng = $("input[name='lng']").val();
        entityPreview(name, lat, lng, objValue);
    });
  }else{
    $.each(data.status.msg, function(objName, objValue) {
        $('#'+objName+'_tips').html(objValue);
        $('#'+objName+'_tips').css("display", 'inline');
    });
  }
}

function addEntityStep2FormRespond(data){
  if(data.status.success){
    console.log("EntityStep2 success");
    $("#oprtTip").show();
    $("#oprtTip").attr("class", "label label-success pull-right");
    $("#oprtTip").html("保存成功");
    $("#oprtTip").fadeOut(6000); //callback可选
    showPopDialogBox(data.dataSourceId);
  }else{
    $("#oprtTip").show();
    $("#oprtTip").attr("class", "label label-danger pull-right");
    $("#oprtTip").html("保存失败");
    $("#oprtTip").fadeOut(6000);
    $.each(data.status.msg, function(objName, objValue) {
        $('#'+objName+'_tips').html(objValue);
        $('#'+objName+'_tips').css("display", 'inline');
    });
  }
}

function searchEntityRespond(data){
  var maxShowNum = 50;   //最大显示搜索结果条数
  var i = 0;

  $.each(data, function(objName, objValue) {
    if(++i > maxShowNum) {
      return false; //相当于break，true相当于continue
    }
    // objValue.key_words = objValue.key_words ? '('+objValue.key_words+')' : '';
    objValue.key_words = '';
    $("#searchBox_resultListOL").append('<li class="searchBox_resultListLI" onclick="flyTo('+objValue.lat+','+objValue.lng+','+objValue.type_id+');" ><img src="/public/img/userImg/'+objValue.icon+'"><span style="font-weight:bold;">'+objValue.name+'</span><small>'+objValue.key_words+'</small></li>');
  });

  if (i == 0) {
    $("#searchBox_resultList_tips").show();
  }else {
    $("#searchBox_resultList_tips").hide();
  }

  $("#searchBox_resultList").slideDown();
  
}