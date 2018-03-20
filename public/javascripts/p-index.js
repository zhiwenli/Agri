/*
* 立即执行JS
* PC版主页的JS控制器, PC与移动端不同之处
* @Rely on : commonIndex.js
* @Author : hi@zhiwenli.com
* @Areate at : 2016-11-22 15:14:49
*/


//版权
//viewer.scene.frameState.creditDisplay.addDefaultCredit(new Cesium.Credit(' 沪ICP备xxxxxxxx号 | 北斗农业·中国 版权所有 ©2016 || '));

var camera = viewer.camera;
var entities = viewer.entities;
var scene = viewer.scene;

addScreenSwitchButton();
addTouchSwitchButton();
addNavigationButton();

//toolBar排序
resortToolBar();

//添加天气预报模块
var weatherBox = new CesiumLocationBox(viewer, 'lb', '/data/permanent/json', function(){
    hidePopDialogBox();
    CSB.hiddenThis();
  });

//设置版权文字居中
$('.copyright-text').css('left', ($('#cesiumContainer').width() - $('.copyright-text').width()) / 2);

//窗口尺寸变化时更新CSS
window.onresize = function(){
  //设置版权文字居中
  $('.copyright-text').css('left', ($('#cesiumContainer').width() - $('.copyright-text').width()) / 2);
  setPopDialogCSS();
}

window.onload = function(){

  //更改底部图片logo和超链接
  $('img[alt="Cesium"]').attr('src','/public/img/logo.png').attr('alt','北斗农业·中国').attr('title','北斗农业·中国').attr('height','20').attr('width','20');
  $('.cesium-credit-image>a[href="http://cesiumjs.org/"]').attr('href','http://www.bdsvv.com/');


  //修改菜单
  $("#navigation a:has(span)").not('#info').each(function(){
    $(this).click(function()
    {
      var next_ul=$(this).next();
      if(next_ul.attr('class')=='myHide')
      {
        next_ul.attr('class','myShow');
        $(this).find('span').text('-');
      }
      else{
        next_ul.attr('class','myHide');
        $(this).find('span').text('+');
      }
    })
  });
  $('.menu_first').
  each(function()
    {$(this).click(function()
      {
        var next_ul=$(this).next();
        if(next_ul.attr('class')=='myHide')
          {next_ul.attr('class','myShow');}
        else{next_ul.attr('class','myHide');}
      })
  });


  //通过js调整部分CSS样式
  setPopDialogCSS();

  //为cesium原生按钮设置监听
  originalButtonListener();

  //飞行时间为JS阻塞状态
  launchFly();

  testMoudel();
}
//以上是左侧菜单事件


//functions

/*设置cesium-viewer-toolbar中子元素的排列顺序*/
function resortToolBar(){
  var toolbar = document.getElementsByClassName('cesium-viewer-toolbar')[0];
  var childs = toolbar.childNodes;
  
  toolbar.appendChild(childs[6]);
  toolbar.appendChild(childs[9]);
  toolbar.appendChild(childs[9]);
  toolbar.appendChild(childs[4]);
  toolbar.appendChild(childs[8]);
  toolbar.appendChild(childs[4]);
}


//监听几个cesium自带按钮，使其被点击展开弹窗时立即关闭自定义的弹窗，在window.onload中调用
function originalButtonListener(){
  var toolbar = document.getElementsByClassName('cesium-viewer-toolbar')[0];
  var childs = toolbar.childNodes;
  
  childs[2].addEventListener("click", hideCustomBox);
  childs[3].addEventListener("click", hideCustomBox);
  childs[11].addEventListener("click", hideCustomBox);
}

function testMoudel(){
  // return;
  console.info('start test moudel');
}





// obor.js |||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
// obor.js ˇˇˇˇˇˇˇˇˇˇˇˇˇˇˇˇˇˇˇˇˇˇˇˇˇˇˇˇˇˇˇˇˇˇˇˇˇˇˇˇˇˇˇˇˇˇˇˇˇˇˇˇˇˇˇˇˇˇˇˇˇˇˇˇˇˇˇˇˇˇˇˇˇˇˇˇˇˇˇˇˇˇˇˇˇˇˇˇˇ

//全局变量 所有国家
var all_name_array=["中国","蒙古","韩国","俄罗斯","印度尼西亚","泰国","马来西亚","越南","新加坡","菲律宾","缅甸","柬埔寨","老挝","文莱","东帝汶","乌克兰","白俄罗斯","格鲁吉亚","阿塞拜疆","亚美尼亚","摩尔多瓦","印度","巴基斯坦","孟加拉国","斯里兰卡","阿富汗","尼泊尔","马尔代夫","不丹","沙特阿拉伯","阿联酋","阿曼","伊朗","土耳其","以色列","埃及","科威特","伊拉克","卡塔尔","约旦","黎巴嫩","巴林","也门共和国","叙利亚","巴勒斯坦","波兰","罗马尼亚","捷克共和国","斯洛伐克","保加利亚","匈牙利","拉脱维亚","立陶宛","斯洛文尼亚" ,"爱沙尼亚","克罗地亚" ,"阿尔巴尼亚","塞尔维亚","马其顿","波黑","黑山","哈萨克斯坦","乌兹别克斯坦","土库曼斯坦","吉尔吉斯斯坦","塔吉克斯坦","中非共和国","丹麦","乌干达","乌拉圭","乍得","伊拉克","伯利兹","佛得角","克罗地亚","冈比亚","冰岛","几内亚","几内亚比绍","凯尔盖朗群岛","列支敦士登","刚果民主共和国","利比亚","利比里亚","加拿大","加沙地带","加纳","加蓬","北马里亚纳群岛","南极洲","南非","博茨瓦纳","卢旺达","卢森堡","危地马拉","厄瓜多尔","厄立特里亚","古巴","吉布提","哥伦比亚","哥斯达黎加","喀麦隆","圣克里斯托弗和尼维斯联邦","圣多美岛和普林西比岛","圣露西亚","圣马力诺","圭亚那","坦桑尼亚","埃塞俄比亚","基里巴斯","塞内加尔","塞拉利昂","塞浦路斯","塞舌尔","墨西哥","多哥","多米尼克","多米尼加共和国","奥地利","委内瑞拉","安哥拉","安提瓜和巴布达","安道尔共和国","尼加拉瓜","尼日利亚","尼日尔","巴哈马","巴巴多斯","巴布亚新几内亚","巴拉圭","巴拿马","巴西","布基纳法索","布隆迪","希腊","德国","意大利","所罗门群岛","刚果","扬马延岛","挪威","摩洛哥","摩纳哥","文森特和格林纳丁斯","斐济","斯威士兰","斯瓦尔巴特群岛","新喀里多尼亚岛","新西兰","日本","智利","朝鲜","格林纳达","格陵兰","比利时","毛里求斯","汤加","沙特阿拉伯伊拉克中立区","法国","法属圭亚那","法属玻利尼西亚","法罗群岛","波多黎哥","波斯尼亚和黑塞哥维那","津巴布韦","洪都拉斯","海地","澳大利亚","爱尔兰","牙买加","特克斯和凯科斯群岛","特立尼达和多巴哥","玻利维亚","瑞典","瑞士","瓜德罗普","瓦努阿图","留尼汪岛","百慕大群岛","科摩罗伊斯兰","科特迪瓦","秘鲁","突尼斯","索马里","纳米比亚","美国","肯尼亚","芬兰","苏丹","苏里南","英国","荷兰","莫桑比克","莱索托","萨尔瓦多","葡萄牙","西撒哈拉","西班牙","西萨摩亚","贝宁","赞比亚","赤道几内亚","阿尔及利亚","阿根廷","马尔维那斯群岛","马恩岛","马拉维","马提尼克岛","马耳他","马达加斯加","马里"];


var all_lng_array=[105.21,106.920481,127.7669220000,37.619697,106.845599,100.992541,101.975766,108.277199,103.819836,120.984219,95.956223,104.990963,102.614429,114.727669,125.727539,31.16558,27.953389,43.356892,47.576927,45.038189,28.369885,78.96288,69.345116,90.356331,79.861243,67.709953,84.124008,73.5361034,90.433601,46.489012,53.847818,55.923255,53.688046,35.243322,34.851612,30.802498,47.481766,43.679291,51.183884,36.238414,35.86228,50.5577,48.516388,38.996815,35.233154,19.145136,24.96676,15.472962,19.699024,25.48583,19.503304,24.079635,23.881275,14.995463,25.013607,15.2,20.168331,21.005859,21.745275,18.4130763,19.37439,66.923684,64.585262,59.556278,74.766098,71.276093,20.9394440000,9.5017850000,32.2902750000,-55.7658350000,18.7322070000,43.6792910000,-88.4976500000,-23.6051721000,15.2000000000,-15.3101390000,-19.0208350000,-9.6966450000,-15.1804130000,69.3544626000,9.5553730000,15.8276590000,17.2283310000,-9.4294990000,-106.346771000,34.3088255000,-1.0231940000,11.6094440000,145.6739000000,135.0000000000,22.9375060000,24.6848660000,29.8738880000,6.1295830000,-90.2307590000,-78.1834060000,39.7823340000,-77.7811670000,42.5902750000,-74.2973330000,-83.7534280000,12.3547220000,-62.7829980000,6.6210611000,-89.4387562000,12.4577770000,-58.9301800000,34.8888220000,40.4896730000,-157.3630262000,-14.4523620000,-11.7798890000,33.4298590000,55.4919770000,-102.5527840000,0.8247820000,-61.3709760000,-70.1626510000,14.5500720000,-66.5897300000,17.8738870000,-61.7964280000,1.5218010000,-85.2072290000,8.6752770000,8.0816660000,-77.3962800000,-59.5431980000,143.9555500000,-58.4438320000,-80.7821270000,-51.9252800000,-1.5615930000,29.9188860000,21.8243120000,10.4515260000,12.5673800000,160.1561940000,13.1740348000,23.6702720000,8.4689460000,-7.0926200000,7.4246158000,-61.2008857727,178.0650320000,31.4658660000,23.6702720000,165.5000000000,174.8859710000,138.2529240000,-71.5429690000,127.5100930000,-61.6790000000,-42.6043030000,4.4699360000,57.5521520000,-175.1982420000,,2.2137490000,-53.1257820000,-149.4068430000,-6.9118060000,-66.5901490000,17.6790760000,29.1548570000,-86.2419050000,-72.2852150000,133.7751360000,-8.2438900000,-77.2975080000,-71.7979280000,-61.2225030000,-63.5886530000,18.6435010000,8.2275120000,-61.5510000000,166.9591580000,55.6000000000,-64.7903348000,43.3333000000,-5.5470800000,-75.0151520000,9.5374990000,46.1996160000,18.4904100000,-95.7128910000,37.9061930000,25.7481510000,30.2176360000,-56.0277830000,-3.4359730000,5.2912660000,35.5295620000,28.2336080000,-88.8965300000,-8.2244540000,-12.8858340000,-3.7492200000,-172.1046290000,2.3158340000,27.8493320000,10.2678950000,1.6596260000,-63.6166720000,-72.2166667000,-4.5480560000,34.3015250000,-61.0241740000,14.3754160000,46.8691070000,-3.9961660000];


var all_lat_array=[36.18,47.919624,35.9077570000,55.75561,-6.2087634,15.870032,4.210484,14.058324,1.352083,14.599512,21.913965,12.565679,19.85627,4.535277,-8.874217,48.379433,53.709807,42.315407,40.143105,40.069099,47.411631,20.593684,30.375321,23.684994,6.927079,33.93911,28.394857,1.977247,27.514162,24.443854,23.424076,21.512583,32.427908,38.963745,31.046051,26.820553,29.31166,33.223191,25.354826,30.585164,33.854721,26.0667,15.552727,34.802075,31.952162,51.919438,45.943161,49.817492,48.669026,42.733883,47.162494,56.603189,55.169438,46.151241,58.595272,45.1,41.153332,44.005859,41.608635,43.8562586,42.708678,48.019573,41.377491,38.969719,41.20438,38.861034,6.6111110000,56.2639200000,1.3733330000,-32.5227790000,15.4541660000,33.2231910000,17.1898770000,15.1201420000,45.1000000000,13.4431820000,64.9630510000,9.9455870000,11.8037490000,-49.3948275000,47.1660000000,-0.2280210000,26.3351000000,6.4280550000,56.1303660000,31.3546763000,7.9465270000,-0.8036890000,15.0979000000,-82.8627519000,-30.5594820000,-22.3284740000,-1.9402780000,49.8152730000,15.7834710000,-1.8312390000,15.1793840000,21.5217570000,11.8251380000,4.5708680000,9.7489170000,7.3697220000,17.357822,0.2602568000,13.8354794000,43.9423600000,4.8604160000,-6.3690280000,9.1450000000,1.8708833000,14.4974010000,8.4605550000,35.1264130000,-4.6795740000,23.6345010000,8.6195430000,15.4149990000,18.7356930000,47.5162310000,6.4237500000,-11.2026920000,17.0608160000,42.5062850000,12.8654160000,9.0819990000,17.6077890000,25.0342800000,13.1938870000,-6.3149930000,-23.4425030000,8.5379810000,-14.2350040000,12.2383330000,-3.3730560000,39.0742080000,51.1656910000,41.8719400000,-9.6457100000,-6.5733458000,77.5536040000,60.4720240000,31.7917020000,43.7384176000,13.2532294696,-17.7133710000,-26.5225030000,77.5536040000,-21.5000000000,-40.9005570000,36.2048240000,-35.6751470000,40.3398520000,12.1165000000,71.7069360000,50.5038870000,-20.3484040000,-21.1789860000,,46.2276380000,3.9338890000,-17.6797420000,61.8926350000,18.2208330000,43.9158860000,-19.0154380000,15.1999990000,18.9711870000,-25.2743980000,53.4129100000,18.1095810000,21.6940250000,10.6918030000,-16.2901540000,60.1281610000,46.8181880000,16.2650000000,-15.3767060000,-21.1000000000,32.2995068000,-11.6455000000,7.5399890000,-9.1899670000,33.8869170000,5.1521490000,-22.9576400000,37.0902400000,-0.0235590000,61.9241100000,12.8628070000,3.9193050000,55.3780510000,52.1326330000,-18.6656950000,-29.6099880000,13.7941850000,39.3998720000,24.2155270000,40.4636670000,-13.7590290000,9.3076900000,-13.1338970000,1.6508010000,28.0338860000,-38.4160970000,-3.5491667000,54.2361070000,-13.2543080000,14.6415280000,35.9374960000,-18.7669470000,17.5706920000];

//删除以上数组中的波斯尼亚和黑塞哥维那及其坐标
all_name_array.splice(163,1);
all_lng_array.splice(163,1);
all_lat_array.splice(163,1);
//纠正塞尔维亚坐标错误
all_lng_array.splice(57,1,20);all_lat_array.splice(57,1,43);






//全局变量一带一路国家
var name_array=["中国","蒙古","俄罗斯","印度尼西亚","泰国","马来西亚","越南","新加坡","菲律宾","缅甸","柬埔寨","老挝","文莱",
"东帝汶","乌克兰","白俄罗斯","格鲁吉亚","阿塞拜疆","亚美尼亚","摩尔多瓦","印度","巴基斯坦","孟加拉国","斯里兰卡","阿富汗",
"尼泊尔","马尔代夫","不丹","沙特阿拉伯","阿联酋","阿曼","伊朗","土耳其","以色列","埃及","科威特","伊拉克","卡塔尔","约旦","黎巴嫩","巴林",
"也门共和国","叙利亚","巴勒斯坦","波兰","罗马尼亚","捷克共和国","斯洛伐克","保加利亚","匈牙利","拉脱维亚","立陶宛","斯洛文尼亚" ,
"爱沙尼亚","克罗地亚" ,"阿尔巴尼亚","塞尔维亚","马其顿","波黑","黑山","哈萨克斯坦","乌兹别克斯坦","土库曼斯坦","吉尔吉斯斯坦","塔吉克斯坦","希腊","塞浦路斯"];



var lng_array=[116.406612,106.920481,37.619697,106.845599,100.992541,101.975766,108.277199,103.819836,120.984219,
95.956223,104.990963,102.614429,114.727669,125.727539,31.16558,27.953389,43.356892,47.576927,45.038189,
28.369885,78.96288,69.345116,90.356331,79.861243,67.709953,84.124008,73.5361034,90.433601,1.489012,53.847818,
55.923255,53.688046,35.243322,34.851612,30.802498,47.481766,43.679291,51.183884,36.238414,35.86228,50.5577,
48.516388,38.996815,35.233154,19.145136,24.96676,15.472962,19.699024,25.48583,19.503304,56.879635,23.881275,
14.995463,25.013607,15.2,20.168331,44.01652,21.745275,18.4130763,19.37439,66.923684,64.585262,59.556278,
74.766098,71.276093,22.321999,33.157350];

var lat_array=[39.904186,47.919624,55.75561,-6.2087634,15.870032,4.210484,14.058324,1.352083,14.599512,
21.913965,12.565679,17.962769,4.535277,-8.874217,48.379433,53.709807,42.315407,40.143105,40.069099,47.411631,
20.593684,30.375321,23.684994,6.927079,33.93911,28.394857,1.977247,27.514162,48.443854,23.424076,21.512583,
32.427908,38.963745,31.046051,26.820553,29.31166,33.223191,25.354826,30.585164,33.854721,26.0667,15.552727,
34.802075,31.952162,51.919438,45.943161,49.817492,48.669026,42.733883,47.162494,24.603189,55.169438,46.151241,
58.595272,45.1,41.153332,21.005859,41.608635,43.8562586,42.708678,48.019573,41.377491,38.969719,41.20438,38.861034,38.798016,35.019261];

//纠正塞尔维亚、沙特阿拉伯、拉脱维亚等国坐标错误
lng_array.splice(56,1,20);lng_array.splice(28,1,44.66);lng_array.splice(50,1,24.06);
lat_array.splice(56,1,43);lat_array.splice(28,1,24.79);lat_array.splice(50,1,56.97);

 //自定义全局函数worldname()，显示所有国名，方便下面的控制
 function worldname()
 {

  for(var i=0;i<all_name_array.length;i++){
    var obname=all_name_array[i];
      if (jQuery.inArray(obname,name_array)== -1){//判断是否在数组中

       viewer.entities.add({
         position : Cesium.Cartesian3.fromDegrees(all_lng_array[i], all_lat_array[i]),
         label : {
           text : all_name_array[i],
           font : '18px monospace ',
           translucencyByDistance : new Cesium.NearFarScalar(4e6, 1.0, 1e7, 0.0),//设置透明度随镜头的距离改变而改变
       //标签放到点的右侧
       horizontalOrigin:Cesium.HorizontalOrigin.LEFT,
       verticalOrigin:Cesium.VerticalOrigin.TOP,
       //根据视角距离改变标签大小比例
       pixelOffsetScaleByDistance:new Cesium.NearFarScalar(6.5e3, 2.0, 8.0e6, 10.0),
       fillColor : Cesium.Color.AQUA,
       outlineColor : Cesium.Color.BLACK,
       outlineWidth : 3,
       style : Cesium.LabelStyle.FILL_AND_OUTLINE
     }
   });
     }
     else{
      viewer.entities.add({
       position : Cesium.Cartesian3.fromDegrees(all_lng_array[i], all_lat_array[i]),
       label : {
         text : all_name_array[i],
         font : '18px monospace ',
           translucencyByDistance : new Cesium.NearFarScalar(4e6, 1.0, 1e7, 0.0),//设置透明度随镜头的距离改变而改变
       //标签放到点的右侧
       horizontalOrigin:Cesium.HorizontalOrigin.LEFT,
       verticalOrigin:Cesium.VerticalOrigin.TOP,
       //根据视角距离改变标签大小比例
       pixelOffsetScaleByDistance:new Cesium.NearFarScalar(6.5e3, 2.0, 8.0e6, 10.0),
       fillColor : Cesium.Color.GOLD,
       outlineColor : Cesium.Color.BLACK,
       outlineWidth : 3,
       style : Cesium.LabelStyle.FILL_AND_OUTLINE
     }
   });
    }
  }

};



//点击 沿线国家，飞到该地区
$("ul[name=along_country] li a").bind("click",
  function(){
        //alert("选择了"+$(this).html());

        var i;
        var country_name=$(this).html();
        for(i=0;i<name_array.length;i++)
        {
          if(country_name==name_array[i]  )

          {
            lng=lng_array[i];
            lat=lat_array[i];
            //alert("定位成功！马上飞到..."+name_array[i] );
            viewer.camera.flyTo({
              destination : Cesium.Cartesian3.fromDegrees(lng, lat, 3000000),
              orientation :   {
                heading : Cesium.Math.toRadians(0.0),
                pitch : Cesium.Math.toRadians( -80.0),
                roll : Cesium.Math.toRadians(0.0)
                    }//定制  以何种角度飞到目标处
                  });
//设定相机镜头中心位置
//viewer.camera.lookAt( Cesium.Cartesian3.fromDegrees(lng, lat), new Cesium.Cartesian3(0.0, -4790000.0, 5000000.0));

}

}     
});

//点击非沿线国家，飞到该地区
$("ul[name=all_country] li a").bind("click",
  function(){
    var non_OBOR_name_array=["韩国","中非共和国","丹麦","乌干达","乌拉圭","乍得","伊拉克","伯利兹","佛得角","克罗地亚","冈比亚",
    "冰岛","几内亚","几内亚比绍","凯尔盖朗群岛","列支敦士登","刚果民主共和国","利比亚","利比里亚","加拿大","加沙地带",
    "加纳","加蓬","北马里亚纳群岛","南极洲","南非","博茨瓦纳","卢旺达","卢森堡","危地马拉","厄瓜多尔","厄立特里亚",
    "古巴","吉布提","哥伦比亚","哥斯达黎加","喀麦隆","圣克里斯托弗和尼维斯联邦","圣多美岛和普林西比岛","圣露西亚",
    "圣马力诺","圭亚那","坦桑尼亚","埃塞俄比亚","基里巴斯","塞内加尔","塞拉利昂","塞浦路斯","塞舌尔","墨西哥","多哥",
    "多米尼克","多米尼加共和国","奥地利","委内瑞拉","安哥拉","安提瓜和巴布达","安道尔共和国","尼加拉瓜","尼日利亚",
    "尼日尔","巴哈马","巴巴多斯","巴布亚新几内亚","巴拉圭","巴拿马","巴西","布基纳法索","布隆迪","希腊","德国",
    "意大利","所罗门群岛","刚果","扬马延岛","挪威","摩洛哥","摩纳哥","文森特和格林纳丁斯","斐济","斯威士兰",
    "斯瓦尔巴特群岛","新喀里多尼亚岛","新西兰","日本","智利","朝鲜","格林纳达","格陵兰","比利时","毛里求斯","汤加",
    "沙特阿拉伯伊拉克中立区","法国","法属圭亚那","法属玻利尼西亚","法罗群岛","波多黎哥","波黑",
    "津巴布韦","洪都拉斯","海地","澳大利亚","爱尔兰","牙买加","特克斯和凯科斯群岛","特立尼达和多巴哥","玻利维亚",
    "瑞典","瑞士","瓜德罗普","瓦努阿图","留尼汪岛","百慕大群岛","科摩罗伊斯兰","科特迪瓦","秘鲁","突尼斯","索马里",
    "纳米比亚","美国","肯尼亚","芬兰","苏丹","苏里南","英国","荷兰","莫桑比克","莱索托","萨尔瓦多","葡萄牙",
    "西撒哈拉","西班牙","西萨摩亚","贝宁","赞比亚","赤道几内亚","阿尔及利亚","阿根廷","马尔维那斯群岛","马恩岛",
    "马拉维","马提尼克岛","马耳他","马达加斯加","马里","塞尔维亚"];



    var non_OBOR_lng_array=[127.7669220000,20.9394440000,9.5017850000,32.2902750000,-55.7658350000,18.7322070000,
    43.6792910000,-88.4976500000,-23.6051721000,15.2000000000,-15.3101390000,-19.0208350000,
    -9.6966450000,-15.1804130000,69.3544626000,9.5553730000,15.8276590000,17.2283310000,-9.4294990000,
    -106.346771000,34.3088255000,-1.0231940000,11.6094440000,145.6739000000,135.0000000000,22.9375060000,
    24.6848660000,29.8738880000,6.1295830000,-90.2307590000,-78.1834060000,39.7823340000,-77.7811670000,
    42.5902750000,-74.2973330000,-83.7534280000,12.3547220000,100.3047592000,6.6210611000,-89.4387562000,
    12.4577770000,-58.9301800000,34.8888220000,40.4896730000,-157.3630262000,-14.4523620000,-11.7798890000,
    33.4298590000,55.4919770000,-102.5527840000,0.8247820000,-61.3709760000,-70.1626510000,14.5500720000,
    -66.5897300000,17.8738870000,-61.7964280000,1.5218010000,-85.2072290000,8.6752770000,8.0816660000,
    -77.3962800000,-59.5431980000,143.9555500000,-58.4438320000,-80.7821270000,-51.9252800000,-1.5615930000,
    29.9188860000,21.8243120000,10.4515260000,12.5673800000,160.1561940000,13.1740348000,23.6702720000,
    8.4689460000,-7.0926200000,7.4246158000,-61.2008857727,178.0650320000,31.4658660000,23.6702720000,
    165.5000000000,174.8859710000,138.2529240000,-71.5429690000,127.5100930000,-61.6790000000,-42.6043030000,
    4.4699360000,57.5521520000,-175.1982420000,,2.2137490000,-53.1257820000,-149.4068430000,-6.9118060000,
    -66.5901490000,17.6790760000,29.1548570000,-86.2419050000,-72.2852150000,133.7751360000,-8.2438900000,
    -77.2975080000,-71.7979280000,-61.2225030000,-63.5886530000,18.6435010000,8.2275120000,-61.5510000000,
    166.9591580000,55.6000000000,-64.7903348000,43.3333000000,-5.5470800000,-75.0151520000,9.5374990000,
    46.1996160000,18.4904100000,-95.7128910000,37.9061930000,25.7481510000,30.2176360000,-56.0277830000,
    -3.4359730000,5.2912660000,35.5295620000,28.2336080000,-88.8965300000,-8.2244540000,-12.8858340000,
    -3.7492200000,-172.1046290000,2.3158340000,27.8493320000,10.2678950000,1.6596260000,-63.6166720000,
    -72.2166667000,-4.5480560000,34.3015250000,-61.0241740000,14.3754160000,46.8691070000,-3.9961660000,20];

    var non_OBOR_lat_array=[35.9077570000,6.6111110000,56.2639200000,1.3733330000,-32.5227790000,15.4541660000,33.2231910000,
    17.1898770000,15.1201420000,45.1000000000,13.4431820000,64.9630510000,9.9455870000,11.8037490000,
    -49.3948275000,47.1660000000,-0.2280210000,26.3351000000,6.4280550000,56.1303660000,31.3546763000,
    7.9465270000,-0.8036890000,15.0979000000,-82.8627519000,-30.5594820000,-22.3284740000,-1.9402780000,
    49.8152730000,15.7834710000,-1.8312390000,15.1793840000,21.5217570000,11.8251380000,4.5708680000,
    9.7489170000,7.3697220000,5.4239962000,0.2602568000,13.8354794000,43.9423600000,4.8604160000,
    -6.3690280000,9.1450000000,1.8708833000,14.4974010000,8.4605550000,35.1264130000,-4.6795740000,
    23.6345010000,8.6195430000,15.4149990000,18.7356930000,47.5162310000,6.4237500000,-11.2026920000,
    17.0608160000,42.5062850000,12.8654160000,9.0819990000,17.6077890000,25.0342800000,13.1938870000,
    -6.3149930000,-23.4425030000,8.5379810000,-14.2350040000,12.2383330000,-3.3730560000,39.0742080000,
    51.1656910000,41.8719400000,-9.6457100000,-6.5733458000,77.5536040000,60.4720240000,31.7917020000,
    43.7384176000,13.2532294696,-17.7133710000,-26.5225030000,77.5536040000,-21.5000000000,-40.9005570000,
    36.2048240000,-35.6751470000,40.3398520000,12.1165000000,71.7069360000,50.5038870000,-20.3484040000,
    -21.1789860000,,46.2276380000,3.9338890000,-17.6797420000,61.8926350000,18.2208330000,43.9158860000,
    -19.0154380000,15.1999990000,18.9711870000,-25.2743980000,53.4129100000,18.1095810000,21.6940250000,
    10.6918030000,-16.2901540000,60.1281610000,46.8181880000,16.2650000000,-15.3767060000,-21.1000000000,
    32.2995068000,-11.6455000000,7.5399890000,-9.1899670000,33.8869170000,5.1521490000,-22.9576400000,
    37.0902400000,-0.0235590000,61.9241100000,12.8628070000,3.9193050000,55.3780510000,52.1326330000,
    -18.6656950000,-29.6099880000,13.7941850000,39.3998720000,24.2155270000,40.4636670000,-13.7590290000,
    9.3076900000,-13.1338970000,1.6508010000,28.0338860000,-38.4160970000,-3.5491667000,54.2361070000,
    -13.2543080000,14.6415280000,35.9374960000,-18.7669470000,17.5706920000,43];

    var i;
    var country_name=$(this).html();

    for(i=0;i<non_OBOR_name_array.length;i++)
    {

      if(country_name==non_OBOR_name_array[i]  )

      {

            //alert("经度："+non_OBOR_lng_array[i]+","+"纬度："+non_OBOR_lat_array[i]);
            lng=non_OBOR_lng_array[i];
            lat=non_OBOR_lat_array[i];
            //alert("定位成功！马上飞到..."+country_name);
            viewer.camera.flyTo({
              destination : Cesium.Cartesian3.fromDegrees(lng, lat, 2000000),
              orientation :   {
                heading : Cesium.Math.toRadians(0.0),
                pitch : Cesium.Math.toRadians(-80.0),
                roll : 0.0
                    }//定制  以何种角度飞到目标处
                  }); 

//设定相机镜头中心位置
//viewer.camera.lookAt( Cesium.Cartesian3.fromDegrees(lng, lat), new Cesium.Cartesian3(0.0, -4790000.0, 5000000.0));
}


}






}

);


//加载动画start
//设置时钟

//路线显隐控制
$("li[id='route_control']").click(function(){
                    //viewer.clock.clockRange = Cesium.ClockRange.UNBOUNDED;
                    //viewer.clock.clockStep = Cesium.ClockStep.SYSTEM_CLOCK;
                     //viewer.clock.multiplier = 800;
                   });
//北线A
var northA_east=new Cesium.KmlDataSource();
var northA_west=new Cesium.KmlDataSource();
//var northA_point=new Cesium.KmlDataSource();
$("input[id='northA_line_checkbox']").click(function(){

  if($(this).prop('checked')==true)
  {
    document.getElementById('legendbox').src = "/public/img/route.jpg";
    document.getElementById('mylegend').style.display = 'block';
                    viewer.scene.morphTo2D(0.5);//切换为2D视图
                    $(".cesium-viewer-timelineContainer").show();
                    $(".cesium-viewer-animationContainer").show();
          //track the route start
          viewer.clock.shouldAnimate = true;
                    var track_NA_west=northA_west.load('/data/permanent/kml/northA_line_west.kml');//是个promise对象
          var track_NA_east=northA_east.load('/data/permanent/kml/northA_line_east.kml');//是个promise对象
          
          //var point_NA=northA_point.load('./kml/northA_point.kml');//是个promise对象
          viewer.entities.add(changchun);
          //添加点文件
          //viewer.dataSources.add(point_NA);

                    viewer.dataSources.add(track_NA_east).then(function(dataSource) {//kml加载完之后，设置clockrange，是指针不再前进，只能这样做！！！
                     viewer.clock.clockRange = Cesium.ClockRange.CLAMPED;
                   });
          viewer.dataSources.add(track_NA_west).then(function(dataSource) {//kml加载完之后，设置clockrange，是指针不再前进，只能这样做！！！
           viewer.clock.clockRange = Cesium.ClockRange.CLAMPED;
         });

          document.getElementsByClassName("cesium-viewer-timelineContainer")[0].style.display = "true"; 
          document.getElementsByClassName("cesium-viewer-animationContainer")[0].style.display = "true";
        }
        else
        { 
         if( $(".route").not("#northA_line_checkbox").prop("checked")==false){
          document.getElementById('mylegend').style.display = 'none';
        }
        (function(){
          var reco = $(".route").not("#northA_line_checkbox");
          var rearray=new Array();
          for(var i=0;i<reco.length;i++){
            if (reco[i].checked==true){
              rearray.push(reco[i]);
            }
          }
          if(!rearray.length){document.getElementById('mylegend').style.display = 'none';}
          else{document.getElementById('mylegend').style.display = 'block';}
        })();

        viewer.clock.shouldAnimate = false;
        viewer.clock.clockRange = Cesium.ClockRange.UNBOUNDED;
        viewer.clock.clockStep = Cesium.ClockStep.SYSTEM_CLOCK;
           //控制时间轴
           $(".cesium-viewer-timelineContainer").hide(); 
           $(".cesium-viewer-animationContainer").hide();  
          //REMOVE(必须是datasource对象)
          viewer.dataSources.remove(northA_east);
          viewer.dataSources.remove(northA_west);
          //viewer.dataSources.remove(northA_point);
          viewer.entities.remove(changchun);
                    //viewer.scene.morphTo3D();//.then(function(){viewer.homeButton.viewModel.command();});
          //回到home视图

          viewer.scene.morphTo3D(1.0); 
          function viewcon(){viewer.homeButton.viewModel.command();}
          window.setTimeout(viewcon,2000);
        }



      });

$("#northA_line>a").click( 
  function(){
    if($(this).parent().children()[0].checked==false){
      $(this).parent().children()[0].checked=true;
      viewer.clock.shouldAnimate = true;
      viewer.scene.morphTo2D(0.5);
      document.getElementById('legendbox').src = "/public/img/route.jpg";
      document.getElementById('mylegend').style.display = 'block';

          //控制时间轴
          $(".cesium-viewer-timelineContainer").show();
          //viewer.clock.multiplier = 800;
          $(".cesium-viewer-animationContainer").show(); 
          //track the route start
          viewer.clock.shouldAnimate = true;
                    var track_NA_west=northA_west.load('/data/permanent/kml/northA_line_west.kml');//是个promise对象
          var track_NA_east=northA_east.load('/data/permanent/kml/northA_line_east.kml');//是个promise对象
          
          //var point_NA=northA_point.load('./kml/northA_point.kml');//是个promise对象
          //添加点文件
          //viewer.dataSources.add(point_NA);

                    viewer.dataSources.add(track_NA_east).then(function(dataSource) {//kml加载完之后，设置clockrange，是指针不再前进，只能这样做！！！
                     viewer.clock.clockRange = Cesium.ClockRange.CLAMPED;
                   });
          viewer.dataSources.add(track_NA_west).then(function(dataSource) {//kml加载完之后，设置clockrange，是指针不再前进，只能这样做！！！
           viewer.clock.clockRange = Cesium.ClockRange.CLAMPED;
         });
          viewer.entities.add(changchun);
          //viewer.clock.clockStep = Cesium.ClockStep.SYSTEM_CLOCK_MULTIPLIER;
          //viewer.clock.multiplier = 10;
          document.getElementsByClassName("cesium-viewer-timelineContainer")[0].style.display = "true"; 
          document.getElementsByClassName("cesium-viewer-animationContainer")[0].style.display = "true";
        }
        else{
         $(this).parent().children()[0].checked=false;
         viewer.clock.shouldAnimate = false;
           //控制时间轴
           $(".cesium-viewer-timelineContainer").hide(); 
           $(".cesium-viewer-animationContainer").hide();  
          //REMOVE(必须是datasource对象)
          viewer.dataSources.remove(northA_east);
          viewer.dataSources.remove(northA_west);
          //viewer.dataSources.remove(northA_point);
          viewer.entities.remove(changchun);
          //回到home视图
          viewer.scene.morphTo3D(1.0); 
          function viewcon(){viewer.homeButton.viewModel.command();}
          window.setTimeout(viewcon,2000);
          
          (function(){
            var reco = $(".route").not("#northA_line_checkbox");
            var rearray=new Array();
            for(var i=0;i<reco.length;i++){
              if (reco[i].checked==true){
                rearray.push(reco[i]);
              }
            }
            if(!rearray.length){document.getElementById('mylegend').style.display = 'none';}
            else{document.getElementById('mylegend').style.display = 'block';}
          })();
        }  
      } 
      );

//北线B
var northB_line=new Cesium.KmlDataSource();
//var northB_point=new Cesium.KmlDataSource();
$("input[id='northB_line_checkbox']").click(function(){

  if($(this).prop('checked')==true)
  {
    viewer.clock.shouldAnimate = true;
    viewer.scene.morphTo2D(0.5);
    $(".cesium-viewer-timelineContainer").show();
    $(".cesium-viewer-animationContainer").show();
    document.getElementById('legendbox').src = "/public/img/route.jpg";
    document.getElementById('mylegend').style.display = 'block';
    //track the route start
    var track_NB=northB_line.load('/data/permanent/kml/northB_line.kml');//是个promise对象
    //var point_NB=northB_point.load('./kml/northB_point.kml');//是个promise对象
    viewer.entities.add(beijing_point);
    //添加点文件
    //viewer.dataSources.add(point_NB);
    //添加路径文件
        viewer.dataSources.add(track_NB).then(function(dataSource) {//kml加载完之后，设置clockrange，是指针不再前进，只能这样做！！！
         viewer.clock.clockRange = Cesium.ClockRange.CLAMPED;
       }); 
        document.getElementsByClassName("cesium-viewer-timelineContainer")[0].style.display = "true"; 
        document.getElementsByClassName("cesium-viewer-animationContainer")[0].style.display = "true";
      }
      else
      { 
        if($(".route").not("#northB_line_checkbox").prop("checked")==false){
          document.getElementById('mylegend').style.display = 'none';
        }
        viewer.clock.shouldAnimate = false;
        viewer.entities.remove(beijing_point);
          //REMOVE(必须是datasource对象)
          viewer.dataSources.remove(northB_line);
          //viewer.dataSources.remove(northB_point);
          //回到home视图
          viewer.scene.morphTo3D(1.0); 
          function viewcon(){viewer.homeButton.viewModel.command();}
          window.setTimeout(viewcon,2000);
          
          (function(){
            var reco = $(".route").not("#northB_line_checkbox");
            var rearray=new Array();
            for(var i=0;i<reco.length;i++){
              if (reco[i].checked==true){
                rearray.push(reco[i]);
              }
            }
            if(!rearray.length){document.getElementById('mylegend').style.display = 'none';}
            else{document.getElementById('mylegend').style.display = 'block';}
          })();
          $(".cesium-viewer-timelineContainer").hide(); 
          $(".cesium-viewer-animationContainer").hide();
        }



      });


$("#northB_line>a").click( 
  function(){
    if($(this).parent().children()[0].checked==false){
      viewer.clock.shouldAnimate = true;
      viewer.scene.morphTo2D(0.5);
      $(".cesium-viewer-timelineContainer").show();
      $(".cesium-viewer-animationContainer").show();
      $(this).parent().children()[0].checked=true;
      document.getElementById('legendbox').src = "/public/img/route.jpg";
      document.getElementById('mylegend').style.display = 'block';
    //track the route start
    var track_NB=northB_line.load('/data/permanent/kml/northB_line.kml');//是个promise对象
    //var point_NB=northB_point.load('./kml/northB_point.kml');//是个promise对象
    viewer.entities.add(beijing_point);
    //添加点文件
    //viewer.dataSources.add(point_NB);
    //添加路径文件

        viewer.dataSources.add(track_NB).then(function(dataSource) {//kml加载完之后，设置clockrange，是指针不再前进，只能这样做！！！
         viewer.clock.clockRange = Cesium.ClockRange.CLAMPED;
       });
        


        document.getElementsByClassName("cesium-viewer-timelineContainer")[0].style.display = "true"; 
        document.getElementsByClassName("cesium-viewer-animationContainer")[0].style.display = "true";
      }
      else{                    
       $(this).parent().children()[0].checked=false;
          //REMOVE(必须是datasource对象)
          viewer.dataSources.remove(northB_line);
          //viewer.dataSources.remove(northB_point);
          viewer.entities.remove(beijing_point);
          //回到home视图
          viewer.scene.morphTo3D(1.0); 
          function viewcon(){viewer.homeButton.viewModel.command();}
          window.setTimeout(viewcon,2000);
          viewer.clock.shouldAnimate = false;
          $(".cesium-viewer-timelineContainer").hide(); 
          $(".cesium-viewer-animationContainer").hide();
          (function(){
            var reco = $(".route").not("#northB_line_checkbox");
            var rearray=new Array();
            for(var i=0;i<reco.length;i++){
              if (reco[i].checked==true){
                rearray.push(reco[i]);
              }
            }
            if(!rearray.length){document.getElementById('mylegend').style.display = 'none';}
            else{document.getElementById('mylegend').style.display = 'block';}
          })();
        }
      } 
      );
//中线
var mid_line=new Cesium.KmlDataSource();
//var mid_point=new Cesium.KmlDataSource();
$("input[id='mid_line_checkbox']").click(function(){

  if($(this).prop('checked')==true)
  {
    viewer.clock.shouldAnimate = true;
    document.getElementById('legendbox').src = "/public/img/route.jpg";
    document.getElementById('mylegend').style.display = 'block';
          //track the route start
          viewer.clock.shouldAnimate = true;
          viewer.scene.morphTo2D(0.5);
          var track_mid=mid_line.load('/data/permanent/kml/mid_line.kml');//是个promise对象
          //var point_Mid=mid_point.load('./kml/mid_point.kml');//是个promise对象
          viewer.entities.add(beijing_point);
          //添加点文件
          //viewer.dataSources.add(point_Mid);

                    viewer.dataSources.add(track_mid).then(function(dataSource) {//kml加载完之后，设置clockrange，是指针不再前进，只能这样做！！！
                     viewer.clock.clockRange = Cesium.ClockRange.CLAMPED;
                   });

                    $(".cesium-viewer-timelineContainer").show(); 
                    $(".cesium-viewer-animationContainer").show();
                    document.getElementsByClassName("cesium-viewer-timelineContainer")[0].style.display = "true"; 
                    document.getElementsByClassName("cesium-viewer-animationContainer")[0].style.display = "true";
                  }
                  else
                  { 
                   (function(){
                    var reco = $(".route").not("#mid_line_checkbox");
                    var rearray=new Array();
                    for(var i=0;i<reco.length;i++){
                      if (reco[i].checked==true){
                        rearray.push(reco[i]);
                      }
                    }
                    if(!rearray.length){document.getElementById('mylegend').style.display = 'none';}
                    else{document.getElementById('mylegend').style.display = 'block';}
                  })();
                  viewer.clock.shouldAnimate = false;
          //REMOVE(必须是datasource对象)
          viewer.dataSources.remove(mid_line);
          //viewer.dataSources.remove(mid_point);
          viewer.entities.remove(beijing_point);
          //回到home视图
          viewer.scene.morphTo3D(1.0); 
          function viewcon(){viewer.homeButton.viewModel.command();}
          window.setTimeout(viewcon,2000);
          $(".cesium-viewer-timelineContainer").hide(); 
          $(".cesium-viewer-animationContainer").hide();  
        }



      });


$("#mid_line>a").click( 
  function(){
    if($(this).parent().children()[0].checked==false){
      viewer.clock.shouldAnimate = true;
      $(this).parent().children()[0].checked=true;
      document.getElementById('legendbox').src = "/public/img/route.jpg";
      document.getElementById('mylegend').style.display = 'block';
          //track the route start
          viewer.clock.shouldAnimate = true;
          viewer.scene.morphTo2D(0.5);
          var track_mid=mid_line.load('/data/permanent/kml/mid_line.kml');//是个promise对象
          //var point_Mid=mid_point.load('./kml/mid_point.kml');//是个promise对象
          viewer.entities.add(beijing_point);
          //添加点文件
          //viewer.dataSources.add(point_Mid);

                    viewer.dataSources.add(track_mid).then(function(dataSource) {//kml加载完之后，设置clockrange，是指针不再前进，只能这样做！！！
                     viewer.clock.clockRange = Cesium.ClockRange.CLAMPED;
                   });
                    $(".cesium-viewer-timelineContainer").show(); 
                    $(".cesium-viewer-animationContainer").show();
                    document.getElementsByClassName("cesium-viewer-timelineContainer")[0].style.display = "true"; 
                    document.getElementsByClassName("cesium-viewer-animationContainer")[0].style.display = "true";
                  }
                  else{
          //REMOVE(必须是datasource对象)
          viewer.dataSources.remove(mid_line);
          //viewer.dataSources.remove(mid_point);
          viewer.entities.remove(beijing_point);
          //回到home视图
          viewer.scene.morphTo3D(1.0); 
          function viewcon(){viewer.homeButton.viewModel.command();}
          window.setTimeout(viewcon,2000);
          viewer.clock.shouldAnimate = false;
          $(this).parent().children()[0].checked=false;
          $(".cesium-viewer-timelineContainer").hide(); 
          $(".cesium-viewer-animationContainer").hide();  
          (function(){
            var reco = $(".route").not("#mid_line_checkbox");
            var rearray=new Array();
            for(var i=0;i<reco.length;i++){
              if (reco[i].checked==true){
                rearray.push(reco[i]);
              }
            }
            if(!rearray.length){document.getElementById('mylegend').style.display = 'none';}
            else{document.getElementById('mylegend').style.display = 'block';}
          })();
        }
      } 
      );
//中心线
var center_line=new Cesium.KmlDataSource();
//var city_center= new Cesium.KmlDataSource();
$("input[id='center_line_checkbox']").click(function(){

  if($(this).prop('checked')==true)
  {
    viewer.clock.shouldAnimate = true;
    viewer.scene.morphTo2D(0.5);
    document.getElementById('legendbox').src = "/public/img/route.jpg";
    document.getElementById('mylegend').style.display = 'block';
    var centerline = center_line.load('/data/permanent/kml/center_line.kml',{});
                   // city_center.load('./kml/center_line.kml',{});
                   viewer.entities.add(lianyun);
                    viewer.dataSources.add(centerline).then(function(dataSource) {//kml加载完之后，设置clockrange，是指针不再前进，只能这样做！！！
                     viewer.clock.clockRange = Cesium.ClockRange.CLAMPED;
                   });
                   // viewer.dataSources.add(city_center);
                   $(".cesium-viewer-timelineContainer").show(); 

                   $(".cesium-viewer-animationContainer").show();
                   document.getElementsByClassName("cesium-viewer-timelineContainer")[0].style.display = "true"; 
                   document.getElementsByClassName("cesium-viewer-animationContainer")[0].style.display = "true";
                    //viewer.clock.clockStep=Cesium.ClockStep.SYSTEM_CLOCK_MULTIPLIER;
          //viewer.clock.multiplier = 4;
        }
        else
        { 
          (function(){
            var reco = $(".route").not("#center_line_checkbox");
            var rearray=new Array();
            for(var i=0;i<reco.length;i++){
              if (reco[i].checked==true){
                rearray.push(reco[i]);
              }
            }
            if(!rearray.length){document.getElementById('mylegend').style.display = 'none';}
            else{document.getElementById('mylegend').style.display = 'block';}
          })();
          viewer.clock.shouldAnimate = false;
          viewer.entities.remove(lianyun);
          viewer.dataSources.remove(center_line);
                    // viewer.dataSources.remove(city_center);
                    viewer.scene.morphTo3D(1.0); 
                    function viewcon(){viewer.homeButton.viewModel.command();}
                    window.setTimeout(viewcon,2000);
                    $(".cesium-viewer-timelineContainer").hide(); 
                    $(".cesium-viewer-animationContainer").hide();
                  }



                });

$("#center_line>a").click( 
  function(){
    if($(this).parent().children()[0].checked==false){
      viewer.clock.shouldAnimate = true;
      viewer.scene.morphTo2D(0.5);
      $(this).parent().children()[0].checked=true;
      document.getElementById('legendbox').src = "/public/img/route.jpg";
      document.getElementById('mylegend').style.display = 'block';
      var centerline = center_line.load('/data/permanent/kml/center_line.kml',{});
                    //city_center.load('./kml/center_line.kml',{});
                    viewer.entities.add(lianyun);
                    viewer.dataSources.add(centerline).then(function(dataSource) {//kml加载完之后，设置clockrange，是指针不再前进，只能这样做！！！
                     viewer.clock.clockRange = Cesium.ClockRange.CLAMPED;
                   });
                    //viewer.dataSources.add(city_center);
                    $(".cesium-viewer-timelineContainer").show(); 
          //viewer.clock.multiplier = 800;
          $(".cesium-viewer-animationContainer").show();
          document.getElementsByClassName("cesium-viewer-timelineContainer")[0].style.display = "true"; 
          document.getElementsByClassName("cesium-viewer-animationContainer")[0].style.display = "true";
        }
        else{

         viewer.clock.shouldAnimate = false;
         $(this).parent().children()[0].checked=false;
         $(".cesium-viewer-timelineContainer").hide(); 
         viewer.entities.remove(lianyun);
         viewer.dataSources.remove(center_line);
                    // viewer.dataSources.remove(city_center);
                    viewer.scene.morphTo3D(1.0); 
                    function viewcon(){viewer.homeButton.viewModel.command();}
                    window.setTimeout(viewcon,2000);
                    $(".cesium-viewer-animationContainer").hide();
                    (function(){
                      var reco = $(".route").not("#center_line_checkbox");
                      var rearray=new Array();
                      for(var i=0;i<reco.length;i++){
                        if (reco[i].checked==true){
                          rearray.push(reco[i]);
                        }
                      }
                      if(!rearray.length){document.getElementById('mylegend').style.display = 'none';}
                      else{document.getElementById('mylegend').style.display = 'block';}
                    })();
                  }
                } 
                );
//南线
var south_line=new Cesium.KmlDataSource();
var south_line2=new Cesium.KmlDataSource();
//var city_south= new Cesium.KmlDataSource();
$("input[id='south_line_checkbox']").click(function(){

  if($(this).prop('checked')==true)
  {
    viewer.clock.shouldAnimate = true;
    viewer.scene.morphTo2D(0.5);
    $(".cesium-viewer-timelineContainer").show(); 
    $(".cesium-viewer-animationContainer").show();
    document.getElementsByClassName("cesium-viewer-timelineContainer")[0].style.display = "true"; 
    document.getElementsByClassName("cesium-viewer-animationContainer")[0].style.display = "true";
    document.getElementById('legendbox').src = "/public/img/route.jpg";
    document.getElementById('mylegend').style.display = 'block';
    var track_south2= south_line2.load('/data/permanent/kml/south_line2.kml',{});
    var track_south = south_line.load('/data/permanent/kml/south_line.kml',{});

                    //var point_south= city_south.load('./kml/city_south.kml',{});
                    viewer.entities.add(quanzhou);
                    viewer.dataSources.add(track_south).then(function(dataSource) {//kml加载完之后，设置clockrange，是指针不再前进，只能这样做！！！
                     viewer.clock.clockRange = Cesium.ClockRange.CLAMPED;
                   });
                    viewer.dataSources.add(track_south2).then(function(dataSource) {//kml加载完之后，设置clockrange，是指针不再前进，只能这样做！！！
                     viewer.clock.clockRange = Cesium.ClockRange.CLAMPED;
                   });
                    //viewer.dataSources.add(point_south);
                    






                  }
                  else
                  { 
                    (function(){
                      var reco = $(".route").not("#south_line_checkbox");
                      var rearray=new Array();
                      for(var i=0;i<reco.length;i++){
                        if (reco[i].checked==true){
                          rearray.push(reco[i]);
                        }
                      }
                      if(!rearray.length){document.getElementById('mylegend').style.display = 'none';}
                      else{document.getElementById('mylegend').style.display = 'block';}
                    })();
                    viewer.clock.shouldAnimate = false;
                    viewer.entities.remove(quanzhou);
                    viewer.dataSources.remove(south_line);
                    viewer.dataSources.remove(south_line2);
          //viewer.dataSources.remove(city_south);
          //回到home视图
          viewer.scene.morphTo3D(1.0); 
          function viewcon(){viewer.homeButton.viewModel.command();}
          window.setTimeout(viewcon,2000);

          $(".cesium-viewer-timelineContainer").hide(); 
          $(".cesium-viewer-animationContainer").hide();
        }



      });

$("#south_line>a").click( 
  function(){
    if($(this).parent().children()[0].checked==false){
     viewer.clock.shouldAnimate = true;
     viewer.scene.morphTo2D(0.5);
     $(this).parent().children()[0].checked=true;
     document.getElementById('legendbox').src = "/public/img/route.jpg";
     document.getElementById('mylegend').style.display = 'block';
     var track_south2= south_line2.load('/data/permanent/kml/south_line2.kml',{});
     var track_south = south_line.load('/data/permanent/kml/south_line.kml',{});

                   // var point_south= city_south.load('./kml/city_south.kml',{});
                   viewer.entities.add(quanzhou);
                    viewer.dataSources.add(track_south).then(function(dataSource) {//kml加载完之后，设置clockrange，是指针不再前进，只能这样做！！！
                     viewer.clock.clockRange = Cesium.ClockRange.CLAMPED;
                   });
                     viewer.dataSources.add(track_south2).then(function(dataSource) {//kml加载完之后，设置clockrange，是指针不再前进，只能这样做！！！
                       viewer.clock.clockRange = Cesium.ClockRange.CLAMPED;
                     });


                    //viewer.dataSources.add(point_south);
                    $(".cesium-viewer-timelineContainer").show(); 
          //viewer.clock.startTime=Cesium.JulianDate.fromIso8601("2014-05-08T20:30:00Z");
          //viewer.clock.multiplier = 800;
          $(".cesium-viewer-animationContainer").show();
          document.getElementsByClassName("cesium-viewer-timelineContainer")[0].style.display = "true"; 
          document.getElementsByClassName("cesium-viewer-animationContainer")[0].style.display = "true";
        }
        else{

          viewer.clock.shouldAnimate = false;
          viewer.entities.remove(quanzhou);
          viewer.dataSources.remove(south_line);
          viewer.dataSources.remove(south_line2);
          //viewer.dataSources.remove(city_south);
          viewer.scene.morphTo3D(1.0); 
          function viewcon(){viewer.homeButton.viewModel.command();}
          window.setTimeout(viewcon,2000);
          $(".cesium-viewer-timelineContainer").hide(); 
          $(".cesium-viewer-animationContainer").hide();
          $(this).parent().children()[0].checked=false;
          (function(){
            var reco = $(".route").not("#south_line_checkbox");
            var rearray=new Array();
            for(var i=0;i<reco.length;i++){
              if (reco[i].checked==true){
                rearray.push(reco[i]);
              }
            }
            if(!rearray.length){document.getElementById('mylegend').style.display = 'none';}
            else{document.getElementById('mylegend').style.display = 'block';}
          })();
        }                     
      } 
      );


//加载动画end

//大国关系
$("li[id=Relations]>a").click(function(){
  viewer.clock.shouldAnimate = false;
});


//对华友好
var Relations_china= new Cesium.GeoJsonDataSource();
$("input[id='Relations_china_radio']").click(function(){

  if($(this).prop('checked')==true)
  {
    viewer.clock.shouldAnimate = false;
    Relations_china.load('/data/permanent/json/Relations_china.geojson',
    {
           stroke: Cesium.Color.GRAY,//设置边界颜色
          fill: Cesium.Color.RED.withAlpha(0.4),//填充色
        });
    viewer.dataSources.add(Relations_china);

    viewer.entities.add(russaa_flag);
    viewer.entities.add(Afghanistan_flag);
    viewer.entities.add(Pakistan_flag);
    viewer.entities.add(Belarus_flag);
    viewer.entities.add(Kazakhstan_flag);
    viewer.entities.add(Kyrgyzsaa_flag);
    viewer.entities.add(Laos_flag);
    viewer.entities.add(Mongoaa_flag);
    viewer.entities.add(Buraa_flag);
    viewer.entities.add(SriLanka_flag);
    viewer.entities.add(Tajikistan_flag);
    viewer.entities.add(Turkmenistaa_flag);
    viewer.entities.add(Uzbekistan_flag);
    viewer.entities.add(Iran_flag);
      //控制图例
      document.getElementById('legendbox').src = "/public/img/Relations.jpg";
      document.getElementById('mylegend').style.display = 'block';
      //$("input[type='checkbox']:not(#Relations_china_radio)").each(function(){$(this).attr('checked',false);});//not:排除选择器
    }
    else{
      viewer.dataSources.remove(Relations_china);

      viewer.entities.remove(russaa_flag);
      viewer.entities.remove(Afghanistan_flag);
      viewer.entities.remove(Pakistan_flag);
      viewer.entities.remove(Belarus_flag);
      viewer.entities.remove(Kazakhstan_flag);
      viewer.entities.remove(Kyrgyzsaa_flag);
      viewer.entities.remove(Laos_flag);
      viewer.entities.remove(Mongoaa_flag);
      viewer.entities.remove(Buraa_flag);
      viewer.entities.remove(SriLanka_flag);
      viewer.entities.remove(Tajikistan_flag);
      viewer.entities.remove(Turkmenistaa_flag);
      viewer.entities.remove(Uzbekistan_flag);
      viewer.entities.remove(Iran_flag);
      if($(".re").not("#Relations_china_radio").prop("checked")==false){
        document.getElementById('mylegend').style.display = 'none';
      }
    }



  });

$("li[id=Relations_china]>a").click( 
  function(){
    if($(this).parent().children()[0].checked==false){    
      viewer.clock.shouldAnimate = false;
      $(this).parent().children()[0].checked=true;
      Relations_china.load('/data/permanent/json/Relations_china.geojson',
      {
       stroke: Cesium.Color.GRAY,
       fill: Cesium.Color.RED.withAlpha(0.4),
     });
      viewer.dataSources.add(Relations_china);

      viewer.entities.add(russaa_flag);
      viewer.entities.add(Afghanistan_flag);
      viewer.entities.add(Pakistan_flag);
      viewer.entities.add(Belarus_flag);
      viewer.entities.add(Kazakhstan_flag);
      viewer.entities.add(Kyrgyzsaa_flag);
      viewer.entities.add(Laos_flag);
      viewer.entities.add(Mongoaa_flag);
      viewer.entities.add(Buraa_flag);
      viewer.entities.add(SriLanka_flag);
      viewer.entities.add(Tajikistan_flag);
      viewer.entities.add(Turkmenistaa_flag);
      viewer.entities.add(Uzbekistan_flag);
      viewer.entities.add(Iran_flag);
          //控制图例
          document.getElementById('legendbox').src = "/public/img/Relations.jpg";
          document.getElementById('mylegend').style.display = 'block';
          //$("input[type='checkbox']:not(#Relations_china_radio)").each(function(){$(this).attr('checked',false);});
        }
        else{
          viewer.dataSources.remove(Relations_china);

          viewer.entities.remove(russaa_flag);
          viewer.entities.remove(Afghanistan_flag);
          viewer.entities.remove(Pakistan_flag);
          viewer.entities.remove(Belarus_flag);
          viewer.entities.remove(Kazakhstan_flag);
          viewer.entities.remove(Kyrgyzsaa_flag);
          viewer.entities.remove(Laos_flag);
          viewer.entities.remove(Mongoaa_flag);
          viewer.entities.remove(Buraa_flag);
          viewer.entities.remove(SriLanka_flag);
          viewer.entities.remove(Tajikistan_flag);
          viewer.entities.remove(Turkmenistaa_flag);
          viewer.entities.remove(Uzbekistan_flag);
          viewer.entities.remove(Iran_flag);
          $(this).parent().children()[0].checked=false;
          if($(".re").not("#Relations_china_radio").prop("checked")==false){
            document.getElementById('mylegend').style.display = 'none';    
          }
        }
      } 
      );
 //对华友好end
 
  //对美友好
  var Relations_usa= new Cesium.GeoJsonDataSource();
  var USA= new Cesium.GeoJsonDataSource();
  $("input[id='Relations_usa_radio']").click(function(){

    if($(this).prop('checked')==true)
    {
      viewer.clock.shouldAnimate = false;
      USA.load('/data/permanent/json/USA.geojson'
        ,{
          stroke: Cesium.Color.GRAY,
          fill: Cesium.Color.MEDIUMORCHID.withAlpha(0.8),
        });
      Relations_usa.load('/data/permanent/json/Relations_usa.geojson',
      {
       stroke: Cesium.Color.GRAY,
       fill: Cesium.Color.MEDIUMORCHID.withAlpha(0.6),
     });
      viewer.dataSources.add(Relations_usa);
      viewer.dataSources.add(USA);
      viewer.entities.add(Egypt_flag);
      viewer.entities.add(Afghanistanaa_flag);
      viewer.entities.add(Pakistanaa_flag);
      viewer.entities.add(Polandaa_flag);
      viewer.entities.add(Czekhaa_flag);
      viewer.entities.add(Kuwaitaa_flag);
      viewer.entities.add(Lebanon_flag);
      viewer.entities.add(Malaysiaa_flag);
      viewer.entities.add(Turkeyaa_flag);
      viewer.entities.add(Ukraine_flag);
      viewer.entities.add(Israelaa_flag);
      viewer.entities.add(Indonesiaa_flag);
      viewer.entities.add(Jordan_flag);
      viewer.entities.add(Singaporeaa_flag);
      viewer.entities.add(Iraqaa_flag);
      viewer.entities.add(Georgiaa_flag);
      viewer.entities.add(SaudiArabiaa_flag);
      viewer.entities.add(Bahrainaa_flag);
      //控制图例
      document.getElementById('legendbox').src = "/public/img/Relations.jpg";
      document.getElementById('mylegend').style.display = 'block';
            //$("input[type='checkbox']:not(#Relations_usa_radio)").each(function(){$(this).attr('checked',false);});
            
          }
          else{
            viewer.dataSources.remove(Relations_usa);
            viewer.dataSources.remove(USA);
            viewer.entities.remove(Egypt_flag);
            viewer.entities.remove(Afghanistanaa_flag);
            viewer.entities.remove(Pakistanaa_flag);
            viewer.entities.remove(Polandaa_flag);
            viewer.entities.remove(Czekhaa_flag);
            viewer.entities.remove(Kuwaitaa_flag);
            viewer.entities.remove(Lebanon_flag);
            viewer.entities.remove(Malaysiaa_flag);
            viewer.entities.remove(Turkeyaa_flag);
            viewer.entities.remove(Ukraine_flag);
            viewer.entities.remove(Israelaa_flag);
            viewer.entities.remove(Indonesiaa_flag);
            viewer.entities.remove(Jordan_flag);
            viewer.entities.remove(Singaporeaa_flag);
            viewer.entities.remove(Iraqaa_flag);
            viewer.entities.remove(Georgiaa_flag);
            viewer.entities.remove(SaudiArabiaa_flag);
            viewer.entities.remove(Bahrainaa_flag);
            (function(){
              var reco = $(".re").not("#Relations_usa");
              var rearray=new Array();
              for(var i=0;i<reco.length;i++){
                if (reco[i].checked==true){
                  rearray.push(reco[i]);
                }
              }
              if(!rearray.length){document.getElementById('mylegend').style.display = 'none';}
              else{document.getElementById('mylegend').style.display = 'block';}
            })();
          } 



        });

  $("li[id=Relations_usa]>a").click( 
    function(){
     if($(this).parent().children()[0].checked==false){
       viewer.clock.shouldAnimate = false;
       $(this).parent().children()[0].checked=true;
       USA.load('/data/permanent/json//USA.geojson'
         ,{
           stroke: Cesium.Color.GRAY,
           fill: Cesium.Color.MEDIUMORCHID.withAlpha(0.6),
         });
       Relations_usa.load('/data/permanent/json/Relations_usa.geojson',
       {
         stroke: Cesium.Color.GRAY,
         fill: Cesium.Color.MEDIUMORCHID.withAlpha(0.6),
       });
       viewer.dataSources.add(Relations_usa);
       viewer.dataSources.add(USA);
       viewer.entities.add(Egypt_flag);
       viewer.entities.add(Afghanistanaa_flag);
       viewer.entities.add(Pakistanaa_flag);
       viewer.entities.add(Polandaa_flag);
       viewer.entities.add(Czekhaa_flag);
       viewer.entities.add(Kuwaitaa_flag);
       viewer.entities.add(Lebanon_flag);
       viewer.entities.add(Malaysiaa_flag);
       viewer.entities.add(Turkeyaa_flag);
       viewer.entities.add(Ukraine_flag);
       viewer.entities.add(Israelaa_flag);
       viewer.entities.add(Indonesiaa_flag);
       viewer.entities.add(Jordan_flag);
       viewer.entities.add(Singaporeaa_flag);
       viewer.entities.add(Iraqaa_flag);
       viewer.entities.add(Georgiaa_flag);
       viewer.entities.add(SaudiArabiaa_flag);
       viewer.entities.add(Bahrainaa_flag);
                  //控制图例
                  document.getElementById('legendbox').src = "/public/img/Relations.jpg";
                  document.getElementById('mylegend').style.display = 'block';
                         //$("input[type='checkbox']:not(#Relations_usa_radio)").each(function(){$(this).attr('checked',false);});
                       }
                       else{
                         viewer.dataSources.remove(Relations_usa);
                         viewer.dataSources.remove(USA);
                         viewer.entities.remove(Egypt_flag);
                         viewer.entities.remove(Afghanistanaa_flag);
                         viewer.entities.remove(Pakistanaa_flag);
                         viewer.entities.remove(Polandaa_flag);
                         viewer.entities.remove(Czekhaa_flag);
                         viewer.entities.remove(Kuwaitaa_flag);
                         viewer.entities.remove(Lebanon_flag);
                         viewer.entities.remove(Malaysiaa_flag);
                         viewer.entities.remove(Turkeyaa_flag);
                         viewer.entities.remove(Ukraine_flag);
                         viewer.entities.remove(Israelaa_flag);
                         viewer.entities.remove(Indonesiaa_flag);
                         viewer.entities.remove(Jordan_flag);
                         viewer.entities.remove(Singaporeaa_flag);
                         viewer.entities.remove(Iraqaa_flag);
                         viewer.entities.remove(Georgiaa_flag);
                         viewer.entities.remove(SaudiArabiaa_flag);
                         viewer.entities.remove(Bahrainaa_flag);
                         $(this).parent().children()[0].checked=false;
                         (function(){
                          var reco = $(".re").not("#Relations_usa");
                          var rearray=new Array();
                          for(var i=0;i<reco.length;i++){
                            if (reco[i].checked==true){
                              rearray.push(reco[i]);
                            }
                          }
                          if(!rearray.length){document.getElementById('mylegend').style.display = 'none';}
                          else{document.getElementById('mylegend').style.display = 'block';}
                        })();
                      } 
                    }                   
                    );
 //对美友好end

 //对俄友好 
 var Relations_russia= new Cesium.GeoJsonDataSource();
 $("input[id='Relations_russia_radio']").click(function(){

  if($(this).prop('checked')==true)
  {
    viewer.clock.shouldAnimate = false;
    Relations_russia.load('/data/permanent/json/Relations_russia.geojson',
    {
     stroke: Cesium.Color.GRAY,
     fill: Cesium.Color.BLUE.withAlpha(0.6),
   });
    viewer.dataSources.add(Relations_russia);
    viewer.entities.add(Syria_flag);
    viewer.entities.add(Belarusbb_flag);
    viewer.entities.add(Kyrgyzsbb_flag);
    viewer.entities.add(Mongobb_flag);
    viewer.entities.add(Turkmenistbb_flag);
    viewer.entities.add(Uzbekistanbb_flag);
    viewer.entities.add(Iranbb_flag);
    viewer.entities.add(india_flag);
    viewer.entities.add(china_flag);
    viewer.entities.add(Tajikistanaa_flag);
      //控制图例
      document.getElementById('legendbox').src = "/public/img/Relations.jpg";
      document.getElementById('mylegend').style.display = 'block';
            //$("input[type='checkbox']:not(#Relations_russia_radio)").each(function(){$(this).attr('checked',false);});  
          }
          else{
            viewer.dataSources.remove(Relations_russia);
            viewer.entities.remove(Syria_flag);
            viewer.entities.remove(Belarusbb_flag);
            viewer.entities.remove(Kyrgyzsbb_flag);
            viewer.entities.remove(Mongobb_flag);
            viewer.entities.remove(Turkmenistbb_flag);
            viewer.entities.remove(Uzbekistanbb_flag);
            viewer.entities.remove(Iranbb_flag);
            viewer.entities.remove(india_flag);
            viewer.entities.remove(china_flag);
            viewer.entities.remove(Tajikistanaa_flag);
            (function(){
              var reco = $(".re").not("#Relations_russia");
              var rearray=new Array();
              for(var i=0;i<reco.length;i++){
                if (reco[i].checked==true){
                  rearray.push(reco[i]);
                }
              }
              if(!rearray.length){document.getElementById('mylegend').style.display = 'none';}
              else{document.getElementById('mylegend').style.display = 'block';}
            })();
          }           


        });

 $("li[id=Relations_russia]>a").click( 
  function(){
    if($(this).parent().children()[0].checked==false){
      viewer.clock.shouldAnimate = false;
      $(this).parent().children()[0].checked=true;
      Relations_russia.load('/data/permanent/json/Relations_russia.geojson',
      {
       stroke: Cesium.Color.GRAY,
       fill: Cesium.Color.BLUE.withAlpha(0.6),
     });
      viewer.dataSources.add(Relations_russia);
      viewer.entities.add(Syria_flag);
      viewer.entities.add(Belarusbb_flag);
      viewer.entities.add(Kyrgyzsbb_flag);
      viewer.entities.add(Mongobb_flag);
      viewer.entities.add(Turkmenistbb_flag);
      viewer.entities.add(Uzbekistanbb_flag);
      viewer.entities.add(Iranbb_flag);
      viewer.entities.add(india_flag);
      viewer.entities.add(china_flag);
      viewer.entities.add(Tajikistanaa_flag);
      //控制图例
      document.getElementById('legendbox').src = "/public/img/Relations.jpg";
      document.getElementById('mylegend').style.display = 'block';
            //$("input[type='checkbox']:not(#Relations_russia_radio)").each(function(){$(this).attr('checked',false);});
          }
          else{
           viewer.dataSources.remove(Relations_russia);
           viewer.entities.remove(Syria_flag);
           viewer.entities.remove(Belarusbb_flag);
           viewer.entities.remove(Kyrgyzsbb_flag);
           viewer.entities.remove(Mongobb_flag);
           viewer.entities.remove(Turkmenistbb_flag);
           viewer.entities.remove(Uzbekistanbb_flag);
           viewer.entities.remove(Iranbb_flag);
           viewer.entities.remove(india_flag);
           viewer.entities.remove(china_flag);
           viewer.entities.remove(Tajikistanaa_flag);
           $(this).parent().children()[0].checked=false;
           (function(){
            var reco = $(".re").not("#Relations_russia");
            var rearray=new Array();
            for(var i=0;i<reco.length;i++){
              if (reco[i].checked==true){
                rearray.push(reco[i]);
              }
            }
            if(!rearray.length){document.getElementById('mylegend').style.display = 'none';}
            else{document.getElementById('mylegend').style.display = 'block';}
          })();
        }          
      } 
      );
 //对俄友好end
  //对日友好
  var Relations_japan= new Cesium.GeoJsonDataSource();
  var JAPAN= new Cesium.GeoJsonDataSource();
  $("input[id='Relations_japan_radio']").click(function(){

    if($(this).prop('checked')==true)
    {
      viewer.clock.shouldAnimate = false;
      JAPAN.load('/data/permanent/json/JAPAN.geojson'
        ,{
          stroke: Cesium.Color.GRAY,
          fill: Cesium.Color.GRAY.withAlpha(0.8),
        });
      Relations_japan.load('/data/permanent/json/Relations_japan.geojson',
      {
       stroke: Cesium.Color.GRAY,
       fill: Cesium.Color.GRAY.withAlpha(0.6),
     });
      viewer.dataSources.add(Relations_japan);
      viewer.dataSources.add(JAPAN);
      viewer.entities.add(Philippine_flag);
      viewer.entities.add(Mongolia_flag);
      viewer.entities.add(Turkey_flag);
      viewer.entities.add(Thailand_flag);
      viewer.entities.add(Myanmar_flag);
      viewer.entities.add(Vietnam_flag);
      viewer.entities.add(Malaysia_flag);
      viewer.entities.add(Brunei_flag);
      viewer.entities.add(Indonesia_flag);
      viewer.entities.add(Turkmenistan_flag);
      viewer.entities.add(Azerbaijan_flag);
      viewer.entities.add(Kyrgyzstan_flag);
      viewer.entities.add(BANGLADESH_flag);
      viewer.entities.add(Kuwait_flag);

      //控制图例
      document.getElementById('legendbox').src = "/public/img/Relations.jpg";
      document.getElementById('mylegend').style.display = 'block';
            //$("input[type='checkbox']:not(#Relations_japan_radio)").each(function(){$(this).attr('checked',false);}); 
          }

          else{
            viewer.dataSources.remove(Relations_japan);
            viewer.dataSources.remove(JAPAN);
            viewer.entities.remove(Philippine_flag);
            viewer.entities.remove(Mongolia_flag);
            viewer.entities.remove(Turkey_flag);
            viewer.entities.remove(Thailand_flag);
            viewer.entities.remove(Myanmar_flag);
            viewer.entities.remove(Vietnam_flag);
            viewer.entities.remove(Malaysia_flag);
            viewer.entities.remove(Brunei_flag);
            viewer.entities.remove(Indonesia_flag);
            viewer.entities.remove(Turkmenistan_flag);
            viewer.entities.remove(Azerbaijan_flag);
            viewer.entities.remove(Kyrgyzstan_flag);
            viewer.entities.remove(BANGLADESH_flag);
            viewer.entities.remove(Kuwait_flag);
            (function(){
              var reco = $(".re").not("#Relations_japan");
              var rearray=new Array();
              for(var i=0;i<reco.length;i++){
                if (reco[i].checked==true){
                  rearray.push(reco[i]);
                }
              }
              if(!rearray.length){document.getElementById('mylegend').style.display = 'none';}
              else{document.getElementById('mylegend').style.display = 'block';}
            })();
          }       



        });

  $("li[id=Relations_japan]>a").click( 
    function(){
      if($(this).parent().children()[0].checked==false){
        viewer.clock.shouldAnimate = false;
        $(this).parent().children()[0].checked=true;
        JAPAN.load('/data/permanent/json/JAPAN.geojson'
          ,{
            stroke: Cesium.Color.GRAY,
            fill: Cesium.Color.GRAY.withAlpha(0.8),
          });
        Relations_japan.load('/data/permanent/json/Relations_japan.geojson',
        {
         stroke: Cesium.Color.GRAY,
         fill: Cesium.Color.GRAY.withAlpha(0.6),
       });
        viewer.dataSources.add(Relations_japan);
        viewer.dataSources.add(JAPAN);
        viewer.entities.add(Philippine_flag);
        viewer.entities.add(Mongolia_flag);
        viewer.entities.add(Turkey_flag);
        viewer.entities.add(Thailand_flag);
        viewer.entities.add(Myanmar_flag);
        viewer.entities.add(Vietnam_flag);
        viewer.entities.add(Malaysia_flag);
        viewer.entities.add(Brunei_flag);
        viewer.entities.add(Indonesia_flag);
        viewer.entities.add(Turkmenistan_flag);
        viewer.entities.add(Azerbaijan_flag);
        viewer.entities.add(Kyrgyzstan_flag);
        viewer.entities.add(BANGLADESH_flag);
        viewer.entities.add(Kuwait_flag);

      //控制图例
      document.getElementById('legendbox').src = "/public/img/Relations.jpg";
      document.getElementById('mylegend').style.display = 'block';
            //$("input[type='checkbox']:not(#Relations_japan_radio)").each(function(){$(this).attr('checked',false);});
          }
          else{
            viewer.dataSources.remove(Relations_japan);
            viewer.dataSources.remove(JAPAN);
            viewer.entities.remove(Philippine_flag);
            viewer.entities.remove(Mongolia_flag);
            viewer.entities.remove(Turkey_flag);
            viewer.entities.remove(Thailand_flag);
            viewer.entities.remove(Myanmar_flag);
            viewer.entities.remove(Vietnam_flag);
            viewer.entities.remove(Malaysia_flag);
            viewer.entities.remove(Brunei_flag);
            viewer.entities.remove(Indonesia_flag);
            viewer.entities.remove(Turkmenistan_flag);
            viewer.entities.remove(Azerbaijan_flag);
            viewer.entities.remove(Kyrgyzstan_flag);
            viewer.entities.remove(BANGLADESH_flag);
            viewer.entities.remove(Kuwait_flag);
            $(this).parent().children()[0].checked=false;
            (function(){
              var reco = $(".re").not("#Relations_japan");
              var rearray=new Array();
              for(var i=0;i<reco.length;i++){
                if (reco[i].checked==true){
                  rearray.push(reco[i]);
                }
              }
              if(!rearray.length){document.getElementById('mylegend').style.display = 'none';}
              else{document.getElementById('mylegend').style.display = 'block';}
            })();
          }
        } 

        );
 //对日友好end

  //对欧友好
  var Relations_europe= new Cesium.GeoJsonDataSource();
  var EU= new Cesium.GeoJsonDataSource();

  $("input[id='Relations_europe_radio']").click(function(){

    if($(this).prop('checked')==true)
    {
      viewer.clock.shouldAnimate = false;
      EU.load('/data/permanent/json/EU.geojson'
        ,{
          stroke: Cesium.Color.GRAY,
          fill: Cesium.Color.LIGHTSTEELBLUE.withAlpha(0.8),
        });
      Relations_europe.load('/data/permanent/json/Relations_europe.geojson',
      {
       stroke: Cesium.Color.GRAY,
       fill: Cesium.Color.LIGHTSTEELBLUE.withAlpha(0.6),
     });
      viewer.dataSources.add(Relations_europe);
      viewer.dataSources.add(EU);
      viewer.entities.add(Arab_flag);
      viewer.entities.add(Bahrain_flag);
      viewer.entities.add(Poland_flag);
      viewer.entities.add(Georgia_flag);
      viewer.entities.add(Czech_flag);
      viewer.entities.add(Qatar_flag);
      viewer.entities.add(Latvia_flag);
      viewer.entities.add(Lithuania_flag);
      viewer.entities.add(SaudiArabia_flag);
      viewer.entities.add(Slovak_flag);
      viewer.entities.add(Slovenia_flag);
      viewer.entities.add(Turkey2_flag);
      viewer.entities.add(Singapore_flag);
      viewer.entities.add(Hungary_flag);
      viewer.entities.add(Israel_flag);
      viewer.entities.add(Bulgaria_flag);
      //控制图例
      document.getElementById('legendbox').src = "/public/img/Relations.jpg";
      document.getElementById('mylegend').style.display = 'block';
           // $("input[type='checkbox']:not(#Relations_europe_radio)").each(function(){$(this).attr('checked',false);});
         }   
         else{
          viewer.dataSources.remove(Relations_europe);
          viewer.dataSources.remove(EU);
          viewer.entities.remove(Arab_flag);
          viewer.entities.remove(Bahrain_flag);
          viewer.entities.remove(Poland_flag);
          viewer.entities.remove(Georgia_flag);
          viewer.entities.remove(Czech_flag);
          viewer.entities.remove(Qatar_flag);
          viewer.entities.remove(Latvia_flag);
          viewer.entities.remove(Lithuania_flag);
          viewer.entities.remove(SaudiArabia_flag);
          viewer.entities.remove(Slovak_flag);
          viewer.entities.remove(Slovenia_flag);
          viewer.entities.remove(Turkey2_flag);
          viewer.entities.remove(Singapore_flag);
          viewer.entities.remove(Hungary_flag);
          viewer.entities.remove(Israel_flag);
          viewer.entities.remove(Bulgaria_flag);
          (function(){
            var reco = $(".re").not("#Relations_europe");
            var rearray=new Array();
            for(var i=0;i<reco.length;i++){
              if (reco[i].checked==true){
                rearray.push(reco[i]);
              }
            }
            if(!rearray.length){document.getElementById('mylegend').style.display = 'none';}
            else{document.getElementById('mylegend').style.display = 'block';}
          })();
        }                         

      });

  $("li[id=Relations_europe]>a").click( 
    function(){
      if($(this).parent().children()[0].checked==false){
        viewer.clock.shouldAnimate = false;
        $(this).parent().children()[0].checked=true;
        EU.load('/data/permanent/json/EU.geojson'
          ,{
            stroke: Cesium.Color.GRAY,
            fill: Cesium.Color.LIGHTSTEELBLUE.withAlpha(0.8),
          });
        Relations_europe.load('/data/permanent/json/Relations_europe.geojson',
        {
         stroke: Cesium.Color.GRAY,
         fill: Cesium.Color.LIGHTSTEELBLUE.withAlpha(0.6),
       });
        viewer.dataSources.add(Relations_europe);
        viewer.dataSources.add(EU);
        viewer.entities.add(Arab_flag);
        viewer.entities.add(Bahrain_flag);
        viewer.entities.add(Poland_flag);
        viewer.entities.add(Georgia_flag);
        viewer.entities.add(Czech_flag);
        viewer.entities.add(Qatar_flag);
        viewer.entities.add(Latvia_flag);
        viewer.entities.add(Lithuania_flag);
        viewer.entities.add(SaudiArabia_flag);
        viewer.entities.add(Slovak_flag);
        viewer.entities.add(Slovenia_flag);
        viewer.entities.add(Turkey2_flag);
        viewer.entities.add(Singapore_flag);
        viewer.entities.add(Hungary_flag);
        viewer.entities.add(Israel_flag);
        viewer.entities.add(Bulgaria_flag);
      //控制图例
      document.getElementById('legendbox').src = "/public/img/Relations.jpg";
      document.getElementById('mylegend').style.display = 'block';
            //$("input[type='checkbox']:not(#Relations_europe_radio)").each(function(){$(this).attr('checked',false);});  
          }
          else{
            viewer.dataSources.remove(Relations_europe);
            viewer.dataSources.remove(EU);
            viewer.entities.remove(Arab_flag);
            viewer.entities.remove(Bahrain_flag);
            viewer.entities.remove(Poland_flag);
            viewer.entities.remove(Georgia_flag);
            viewer.entities.remove(Czech_flag);
            viewer.entities.remove(Qatar_flag);
            viewer.entities.remove(Latvia_flag);
            viewer.entities.remove(Lithuania_flag);
            viewer.entities.remove(SaudiArabia_flag);
            viewer.entities.remove(Slovak_flag);
            viewer.entities.remove(Slovenia_flag);
            viewer.entities.remove(Turkey2_flag);
            viewer.entities.remove(Singapore_flag);
            viewer.entities.remove(Hungary_flag);
            viewer.entities.remove(Israel_flag);
            viewer.entities.remove(Bulgaria_flag);
            $(this).parent().children()[0].checked=false;
            (function(){
              var reco = $(".re").not("#Relations_europe");
              var rearray=new Array();
              for(var i=0;i<reco.length;i++){
                if (reco[i].checked==true){
                  rearray.push(reco[i]);
                }
              }
              if(!rearray.length){document.getElementById('mylegend').style.display = 'none';}
              else{document.getElementById('mylegend').style.display = 'block';}
            })();
          }

        });
 //对欧友好end
   //对印友好
   var Relations_india= new Cesium.GeoJsonDataSource();
   $("input[id='Relations_india_radio']").click(function(){

    if($(this).prop('checked')==true)
    {
      viewer.clock.shouldAnimate = false;
      Relations_india.load('/data/permanent/json/Relations_india.geojson',
      {
       stroke: Cesium.Color.GRAY,
       fill: Cesium.Color.YELLOW.withAlpha(0.6),
     });
      viewer.dataSources.add(Relations_india);
      viewer.entities.add(Bhutan_flag);
      viewer.entities.add(russia_flag);
      viewer.entities.add(BANGLADESH2_flag);
      viewer.entities.add(Nepal_flag);
      //控制图例
      document.getElementById('legendbox').src = "/public/img/Relations.jpg";
      document.getElementById('mylegend').style.display = 'block';
            //$("input[type='checkbox']:not(#Relations_india_radio)").each(function(){$(this).attr('checked',false);});
          }
          else{
            viewer.dataSources.remove(Relations_india);
            viewer.entities.remove(Bhutan_flag);
            viewer.entities.remove(russia_flag);
            viewer.entities.remove(BANGLADESH2_flag);
            viewer.entities.remove(Nepal_flag);
            (function(){
              var reco = $(".re").not("#Relations_india");
              var rearray=new Array();
              for(var i=0;i<reco.length;i++){
                if (reco[i].checked==true){
                  rearray.push(reco[i]);
                }
              }
              if(!rearray.length){document.getElementById('mylegend').style.display = 'none';}
              else{document.getElementById('mylegend').style.display = 'block';}
            })();
               /*$(".re").not("#Relations_india").each(function(){
               
               
               
            if($(this).prop("checked")==true){ 
            document.getElementById('mylegend').style.display = 'block';
                        
            }
                        else{document.getElementById('mylegend').style.display = 'none';}
                      });*/
                    }  


                  });

   $("li[id=Relations_india]>a").click( 
    function(){
      if($(this).parent().children()[0].checked==false){
        viewer.clock.shouldAnimate = false;
        $(this).parent().children()[0].checked=true;

        Relations_india.load('/data/permanent/json/Relations_india.geojson',
        {
         stroke: Cesium.Color.GRAY,
         fill: Cesium.Color.YELLOW.withAlpha(0.6),
       });
        viewer.dataSources.add(Relations_india);
        viewer.entities.add(Bhutan_flag);
        viewer.entities.add(russia_flag);
        viewer.entities.add(BANGLADESH2_flag);
        viewer.entities.add(Nepal_flag);
      //控制图例
      document.getElementById('legendbox').src = "/public/img/Relations.jpg";
      document.getElementById('mylegend').style.display = 'block';
            //$("input[type='checkbox']:not(#Relations_india_radio)").each(function(){$(this).attr('checked',false);});
          }
          else{
            viewer.dataSources.remove(Relations_india);
            viewer.entities.remove(Bhutan_flag);
            viewer.entities.remove(russia_flag);
            viewer.entities.remove(BANGLADESH2_flag);
            viewer.entities.remove(Nepal_flag);
            $(this).parent().children()[0].checked=false;
            (function(){
              var reco = $(".re").not("#Relations_india");
              var rearray=new Array();
              for(var i=0;i<reco.length;i++){
                if (reco[i].checked==true){
                  rearray.push(reco[i]);
                }
              }
              if(!rearray.length){document.getElementById('mylegend').style.display = 'none';}
              else{document.getElementById('mylegend').style.display = 'block';} 
            })();
          } 
        });
 //对印友好end


//国家治理
$("li[id=Nation_status]>a").click(function(){
  viewer.clock.shouldAnimate = false;
});
/*
$("li[id=Nation_status]>a").toggle( 
        function(){

       var promise = Cesium.GeoJsonDataSource.load('./json/Nation_status.geojson');
       promise.then(function(dataSource)
         {
        //Get the array of entities
        var json_entities = dataSource.entities.values;
        //alert(json_entities.length);
        for(var i=0;i<json_entities.length;i++)
           {
          var entity = json_entities[i];
          //设置边界颜色
          entity.polygon.outline = true;
          entity.polygon.outlineColor = Cesium.Color.GRAY;
          entity.polygon.outlineWidth = 3.0;
          //发光指数
          entity.polygon.material.glowPower=8;
          var name = entity.properties.Name;

          //控制图例
          document.getElementById('legendbox').src = "/public/img/nation_status.jpg";
          document.getElementById('mylegend').style.display = 'block';
          
          switch (name){
                //失败国家
                case "阿富汗": entity.polygon.material = Cesium.Color.RED;break;
                case "伊拉克": entity.polygon.material = Cesium.Color.RED;break;
                case "巴基斯坦": entity.polygon.material = Cesium.Color.RED;break;
                case "巴勒斯坦": entity.polygon.material = Cesium.Color.RED; break;
                case "俄罗斯": entity.polygon.material = Cesium.Color.RED;break;
                case "伊朗": entity.polygon.material = Cesium.Color.RED;break;
                case "塔吉克斯坦": entity.polygon.material = Cesium.Color.RED; break;
                case "吉尔吉斯斯坦": entity.polygon.material = Cesium.Color.RED; break;
                case "叙利亚": entity.polygon.material = Cesium.Color.RED; break;
                //稳定国家
                case "东帝汶": entity.polygon.material = Cesium.Color.TEAL; break;
                case "捷克": entity.polygon.material = Cesium.Color.TEAL; break;
                case "不丹": entity.polygon.material = Cesium.Color.TEAL; break;
                case "新加坡": entity.polygon.material = Cesium.Color.TEAL; break;
                case "罗马尼亚": entity.polygon.material = Cesium.Color.TEAL; break;
                case "克罗地亚": entity.polygon.material = Cesium.Color.TEAL; break;
                case "马来西亚": entity.polygon.material = Cesium.Color.TEAL; break;
                case "卡塔尔": entity.polygon.material = Cesium.Color.TEAL; break;
                case "保加利亚": entity.polygon.material = Cesium.Color.TEAL; break;
                case "科威特": entity.polygon.material = Cesium.Color.TEAL; break;
                case "斯洛文尼亚": entity.polygon.material = Cesium.Color.TEAL; break;               
                case "亚美尼亚": entity.polygon.material = Cesium.Color.TEAL; break;
                case "爱沙尼亚": entity.polygon.material = Cesium.Color.TEAL; break;
                case "立陶宛": entity.polygon.material = Cesium.Color.TEAL; break;
                case "蒙古": entity.polygon.material = Cesium.Color.TEAL; break;
                case "斯洛伐克": entity.polygon.material = Cesium.Color.TEAL; break;
                case "老挝": entity.polygon.material = Cesium.Color.TEAL; break;                
                case "印度尼西亚": entity.polygon.material = Cesium.Color.TEAL; break;
                case "塞尔维亚": entity.polygon.material = Cesium.Color.TEAL; break;
                case "阿联酋": entity.polygon.material = Cesium.Color.TEAL; break;
                case "阿尔巴尼亚": entity.polygon.material = Cesium.Color.TEAL; break;
                case "波斯尼亚和黑塞哥维那": entity.polygon.material = Cesium.Color.TEAL; break;
                case "越南": entity.polygon.material = Cesium.Color.TEAL; break;
                case "黑山": entity.polygon.material = Cesium.Color.TEAL; break;
                case "尼泊尔": entity.polygon.material = Cesium.Color.TEAL; break;
                case "马尔代夫": entity.polygon.material = Cesium.Color.TEAL; break;
                case "文莱": entity.polygon.material = Cesium.Color.TEAL; break;
                case "巴林": entity.polygon.material = Cesium.Color.TEAL; break;
                case "保加利亚": entity.polygon.material = Cesium.Color.TEAL; break;
                case "拉脱维亚": entity.polygon.material = Cesium.Color.TEAL; break;
                //比较稳定
                case "摩尔多瓦": entity.polygon.material = Cesium.Color.KHAKI; break;
                case "马其顿": entity.polygon.material = Cesium.Color.KHAKI; break;
                case "约旦": entity.polygon.material = Cesium.Color.KHAKI; break;
                case "格鲁吉亚": entity.polygon.material = Cesium.Color.KHAKI; break;
                case "阿曼": entity.polygon.material = Cesium.Color.KHAKI; break;
                case "沙特阿拉伯": entity.polygon.material = Cesium.Color.KHAKI; break;
                case "哈萨克斯坦": entity.polygon.material = Cesium.Color.KHAKI; break;
                case "孟加拉国": entity.polygon.material = Cesium.Color.KHAKI; break;
                case "土库曼斯坦": entity.polygon.material = Cesium.Color.KHAKI; break;
                case "白俄罗斯": entity.polygon.material = Cesium.Color.KHAKI;  break;
                case "柬埔寨": entity.polygon.material = Cesium.Color.KHAKI; break;
                case "乌兹别克斯坦": entity.polygon.material = Cesium.KHAKI;  break;
                case "斯里兰卡": entity.polygon.material = Cesium.Color.KHAKI;  break;
                //问题国家
                case "中国": entity.polygon.material = Cesium.Color.GOLDEN ;   break;
                case "泰国": entity.polygon.material = Cesium.Color.GOLDEN ;   break;
                case "阿塞拜疆": entity.polygon.material = Cesium.Color.GOLDEN ;   break;
                case "土耳其": entity.polygon.material = Cesium.Color.GOLDEN ;   break;
                case "以色列": entity.polygon.material = Cesium.Color.GOLDEN ;   break;
                case "印度": entity.polygon.material = Cesium.Color.GOLDEN ;   break;
                case "黎巴嫩": entity.polygon.material = Cesium.Color.GOLDEN ;   break;
                case "也门": entity.polygon.material = Cesium.Color.GOLDEN ;  break;
                case "乌克兰": entity.polygon.material = Cesium.Color.GOLDEN ;   break;
                case "菲律宾": entity.polygon.material = Cesium.Color.GOLDEN ;   break;
                case "埃及": entity.polygon.material = Cesium.Color.GOLDEN ;   break;
                case "缅甸": entity.polygon.material = Cesium.Color.GOLDEN ;   break;
                case "菲律宾": entity.polygon.material = Cesium.Color.GOLDEN ;   break;
                //default :alert("fill color");
                
                };

              
          };
          viewer.dataSources.add(dataSource);
  });
},
                
 function(){viewer.dataSources.removeAll();
      document.getElementById('mylegend').style.display = 'none';
      }
                   
 );
 //国家治理end
 */
//稳定国家
var Nation_stable= new Cesium.GeoJsonDataSource();
$("input[id='Nation_stable_checkbox']").click(function(){

  if($(this).prop('checked')==true)
  {
   Nation_stable.load('/data/permanent/json/Nation_status_stable.geojson',
   {
     stroke: Cesium.Color.GRAY,
     fill: Cesium.Color.TEAL.withAlpha(0.6),
   });

   viewer.dataSources.add(Nation_stable);
   viewer.clock.shouldAnimate = false;
      //控制图例
      document.getElementById('legendbox').src = "/public/img/nation_status.jpg";
      document.getElementById('mylegend').style.display = 'block';
    }
    else
    { 
      viewer.dataSources.remove(Nation_stable);
      (function(){
        var reco = $(".nation").not("#Nation_stable_checkbox");
        var rearray=new Array();
        for(var i=0;i<reco.length;i++){
          if (reco[i].checked==true){
            rearray.push(reco[i]);
          }
        }
        if(!rearray.length){document.getElementById('mylegend').style.display = 'none';}
        else{document.getElementById('mylegend').style.display = 'block';}
      })();
    }



  });


$("li[id=Nation_stable]>a").click( 
  function(){
    if($(this).parent().children()[0].checked==false){
     Nation_stable.load('/data/permanent/json/Nation_status_stable.geojson',
     {
       stroke: Cesium.Color.GRAY,
       fill: Cesium.Color.TEAL.withAlpha(0.6),
     });

     viewer.dataSources.add(Nation_stable);
     viewer.clock.shouldAnimate = false;
     $(this).parent().children()[0].checked=true;
      //控制图例
      document.getElementById('legendbox').src = "/public/img/nation_status.jpg";
      document.getElementById('mylegend').style.display = 'block';
    }
    else{
     viewer.dataSources.remove(Nation_stable);
     $(this).parent().children()[0].checked=false;
     (function(){
      var reco = $(".nation").not("#Nation_stable_checkbox");
      var rearray=new Array();
      for(var i=0;i<reco.length;i++){
        if (reco[i].checked==true){
          rearray.push(reco[i]);
        }
      }
      if(!rearray.length){document.getElementById('mylegend').style.display = 'none';}
      else{document.getElementById('mylegend').style.display = 'block';}
    })();

  }
} 

);
 //稳定国家end
 //比较稳定国家
 var Nation_better= new Cesium.GeoJsonDataSource();
 $("input[id='Nation_better_checkbox']").click(function(){

  if($(this).prop('checked')==true)
  {
   Nation_better.load('/data/permanent/json/Nation_status_better.geojson',
   {
     stroke: Cesium.Color.GRAY,
     fill: Cesium.Color.KHAKI.withAlpha(0.6),
   });

   viewer.dataSources.add(Nation_better);
   viewer.clock.shouldAnimate = false;
      //控制图例
      document.getElementById('legendbox').src = "/public/img/nation_status.jpg";
      document.getElementById('mylegend').style.display = 'block';
    }
    else
    { 
      viewer.dataSources.remove(Nation_better);
      (function(){
        var reco = $(".nation").not("#Nation_better_checkbox");
        var rearray=new Array();
        for(var i=0;i<reco.length;i++){
          if (reco[i].checked==true){
            rearray.push(reco[i]);
          }
        }
        if(!rearray.length){document.getElementById('mylegend').style.display = 'none';}
        else{document.getElementById('mylegend').style.display = 'block';}
      })();
    }               


  });

 $("li[id=Nation_better]>a").click( 
  function(){
    if($(this).parent().children()[0].checked==false){
     Nation_better.load('/data/permanent/json/Nation_status_better.geojson',
     {
       stroke: Cesium.Color.GRAY,
       fill: Cesium.Color.KHAKI.withAlpha(0.6),
     });

     viewer.dataSources.add(Nation_better);
     viewer.clock.shouldAnimate = false;
     $(this).parent().children()[0].checked=true;
      //控制图例
      document.getElementById('legendbox').src = "/public/img/nation_status.jpg";
      document.getElementById('mylegend').style.display = 'block';
    }
    else{
      viewer.dataSources.remove(Nation_better);
      $(this).parent().children()[0].checked=false;
      (function(){
        var reco = $(".nation").not("#Nation_better_checkbox");
        var rearray=new Array();
        for(var i=0;i<reco.length;i++){
          if (reco[i].checked==true){
            rearray.push(reco[i]);
          }
        }
        if(!rearray.length){document.getElementById('mylegend').style.display = 'none';}
        else{document.getElementById('mylegend').style.display = 'block';}
      })();

    }
  } 

  );
 //比较稳定国家end
  //问题国家
  var Nation_issue= new Cesium.GeoJsonDataSource();
  $("input[id='Nation_issue_checkbox']").click(function(){

    if($(this).prop('checked')==true)
    {
     Nation_issue.load('/data/permanent/json/Nation_status_issue.geojson',
     {
       stroke: Cesium.Color.GRAY,
       fill: Cesium.Color.GOLD.withAlpha(0.6),
     });

     viewer.dataSources.add(Nation_issue);
     viewer.clock.shouldAnimate = false;
      //控制图例
      document.getElementById('legendbox').src = "/public/img/nation_status.jpg";
      document.getElementById('mylegend').style.display = 'block';
    }
    else
    { 
      viewer.dataSources.remove(Nation_issue);
      (function(){
        var reco = $(".nation").not("#Nation_issue_checkbox");
        var rearray=new Array();
        for(var i=0;i<reco.length;i++){
          if (reco[i].checked==true){
            rearray.push(reco[i]);
          }
        }
        if(!rearray.length){document.getElementById('mylegend').style.display = 'none';}
        else{document.getElementById('mylegend').style.display = 'block';}
      })();

    }               

  });

  $("li[id=Nation_issue]>a").click( 
    function(){
      if($(this).parent().children()[0].checked==false){
        $(this).parent().children()[0].checked=true;
        Nation_issue.load('/data/permanent/json/Nation_status_issue.geojson',
        {
         stroke: Cesium.Color.GRAY,
         fill: Cesium.Color.GOLD.withAlpha(0.6),
       });

        viewer.dataSources.add(Nation_issue);
        viewer.clock.shouldAnimate = false;

      //控制图例
      document.getElementById('legendbox').src = "/public/img/nation_status.jpg";
      document.getElementById('mylegend').style.display = 'block';
    }
    else{viewer.dataSources.remove(Nation_issue);
     $(this).parent().children()[0].checked=false;
     (function(){
      var reco = $(".nation").not("#Nation_issue_checkbox");
      var rearray=new Array();
      for(var i=0;i<reco.length;i++){
        if (reco[i].checked==true){
          rearray.push(reco[i]);
        }
      }
      if(!rearray.length){document.getElementById('mylegend').style.display = 'none';}
      else{document.getElementById('mylegend').style.display = 'block';}
    })();

  }
} 

);
 //问题国家end
  //失败国家
  var Nation_failure= new Cesium.GeoJsonDataSource();
  $("input[id='Nation_failure_checkbox']").click(function(){

    if($(this).prop('checked')==true)
    {
     Nation_failure.load('/data/permanent/json/Nation_status_failure.geojson',
     {
       stroke: Cesium.Color.GRAY,
       fill: Cesium.Color.RED.withAlpha(0.6),
     });

     viewer.dataSources.add(Nation_failure);
     viewer.clock.shouldAnimate = false;
      //控制图例
      document.getElementById('legendbox').src = "/public/img/nation_status.jpg";
      document.getElementById('mylegend').style.display = 'block';
    }
    else
    { 
      viewer.dataSources.remove(Nation_failure);
      (function(){
        var reco = $(".nation").not("#Nation_failure_checkbox");
        var rearray=new Array();
        for(var i=0;i<reco.length;i++){
          if (reco[i].checked==true){
            rearray.push(reco[i]);
          }
        }
        if(!rearray.length){document.getElementById('mylegend').style.display = 'none';}
        else{document.getElementById('mylegend').style.display = 'block';}
      })();

    }             

  });

  $("li[id=Nation_failure]>a").click( 
    function(){
      if($(this).parent().children()[0].checked==false){
       Nation_failure.load('/data/permanent/json/Nation_status_failure.geojson',
       {
         stroke: Cesium.Color.GRAY,
         fill: Cesium.Color.RED.withAlpha(0.6),
       });

       viewer.dataSources.add(Nation_failure);
       viewer.clock.shouldAnimate = false;
       $(this).parent().children()[0].checked=true;
      //控制图例
      document.getElementById('legendbox').src = "/public/img/nation_status.jpg";
      document.getElementById('mylegend').style.display = 'block';
    }
    else{
      viewer.dataSources.remove(Nation_failure);
      $(this).parent().children()[0].checked=false;
      (function(){
        var reco = $(".nation").not("#Nation_failure_checkbox");
        var rearray=new Array();
        for(var i=0;i<reco.length;i++){
          if (reco[i].checked==true){
            rearray.push(reco[i]);
          }
        }
        if(!rearray.length){document.getElementById('mylegend').style.display = 'none';}
        else{document.getElementById('mylegend').style.display = 'block';}
      })();
    }
  } 

  );
 //失败国家end




//科特金文明
$("li[id=Kotkin_cival]>a").click(function(){
  viewer.clock.shouldAnimate = false;
});

/*
$("li[id=Kotkin_cival]>a").toggle( 
        function(){

       var promise = Cesium.GeoJsonDataSource.load('./json/Kotkin_cival.geojson');
       promise.then(function(dataSource)
         {
        //Get the array of entities
        var json_entities = dataSource.entities.values;
        //alert(json_entities.length);
        for(var i=0;i<json_entities.length;i++)
           {
          var entity = json_entities[i];
          //设置边界颜色
          entity.polygon.outline = true;
          entity.polygon.outlineColor = Cesium.Color.LIGHTSLATEGRAY;
          entity.polygon.outlineWidth = 3.0;
          //发光指数
          entity.polygon.material.glowPower=8;
          var name = entity.properties.Name;

          //控制图例
          document.getElementById('legendbox').src = "/public/img/KTJ.jpg";
          document.getElementById('mylegend').style.display = 'block';
          
          switch (name){
                //边界地区 淡紫色
                case "罗马尼亚": entity.polygon.material = Cesium.Color.MEDIUMORCHID; entity.polygon.extrudedHeight=200000;break;
                case "捷克": entity.polygon.material = Cesium.Color.MEDIUMORCHID; entity.polygon.extrudedHeight=200000;break;
                case "斯洛伐克": entity.polygon.material = Cesium.Color.MEDIUMORCHID; entity.polygon.extrudedHeight=200000;break;
                case "匈牙利": entity.polygon.material = Cesium.Color.MEDIUMORCHID;entity.polygon.extrudedHeight=200000; break;
                case "拉脱维亚": entity.polygon.material = Cesium.Color.MEDIUMORCHID; entity.polygon.extrudedHeight=200000;break;
                case "立陶宛": entity.polygon.material = Cesium.Color.MEDIUMORCHID; entity.polygon.extrudedHeight=200000;break;
                case "爱沙尼亚": entity.polygon.material = Cesium.Color.MEDIUMORCHID;entity.polygon.extrudedHeight=200000; break;

                //大阿拉伯 土黄色
                case "沙特阿拉伯": entity.polygon.material = Cesium.Color.PERU; entity.polygon.extrudedHeight=500000; break;
                case "阿联酋": entity.polygon.material = Cesium.Color.PERU ; entity.polygon.extrudedHeight=500000; break;
                case "以色列": entity.polygon.material = Cesium.Color.PERU ; entity.polygon.extrudedHeight=500000; break;
                case "埃及": entity.polygon.material = Cesium.Color.PERU ; entity.polygon.extrudedHeight=500000; break;
                case "科威特": entity.polygon.material = Cesium.Color.PERU ; entity.polygon.extrudedHeight=500000; break;
                case "卡塔尔": entity.polygon.material = Cesium.Color.PERU ; entity.polygon.extrudedHeight=500000; break;
                case "约旦": entity.polygon.material = Cesium.Color.PERU ; entity.polygon.extrudedHeight=500000; break;
                case "也门": entity.polygon.material = Cesium.Color.PERU ; entity.polygon.extrudedHeight=500000; break;
                case "巴勒斯坦": entity.polygon.material = Cesium.Color.PERU ; entity.polygon.extrudedHeight=500000; break;

                //单蹦国 淡粉色
                case "印度": entity.polygon.material = Cesium.Color.SALMON; entity.polygon.extrudedHeight=400000; break;
                case "孟加拉国": entity.polygon.material = Cesium.Color.SALMON; entity.polygon.extrudedHeight=400000; break;
                case "斯里兰卡": entity.polygon.material = Cesium.Color.SALMON; entity.polygon.extrudedHeight=400000; break;
                case "马尔代夫": entity.polygon.material = Cesium.Color.SALMON; entity.polygon.extrudedHeight=400000; break;
                case "不丹": entity.polygon.material = Cesium.Color.SALMON; entity.polygon.extrudedHeight=400000; break;
                case "波兰": entity.polygon.material = Cesium.Color.SALMON; entity.polygon.extrudedHeight=400000; break;
                //俄罗斯帝国 淡蓝色
                case "俄罗斯": entity.polygon.material = Cesium.Color.LIGHTSTEELBLUE; entity.polygon.extrudedHeight=600000; break;
                case "乌克兰": entity.polygon.material = Cesium.Color.LIGHTSTEELBLUE; entity.polygon.extrudedHeight=600000; break;
                case "白俄罗斯": entity.polygon.material = Cesium.Color.LIGHTSTEELBLUE; entity.polygon.extrudedHeight=600000; break;
                case "格鲁吉亚": entity.polygon.material = Cesium.Color.LIGHTSTEELBLUE; entity.polygon.extrudedHeight=600000; break;
                case "塞尔维亚": entity.polygon.material = Cesium.Color.LIGHTSTEELBLUE; entity.polygon.extrudedHeight=600000; break;
                case "蒙古": entity.polygon.material = Cesium.Color.LIGHTSTEELBLUE; entity.polygon.extrudedHeight=600000; break;
                case "亚美尼亚": entity.polygon.material = Cesium.Color.LIGHTSTEELBLUE; entity.polygon.extrudedHeight=600000; break;
                case "摩尔多瓦": entity.polygon.material = Cesium.Color.LIGHTSTEELBLUE; entity.polygon.extrudedHeight=600000; break;
                //橄榄共和国 淡绿色
                case "保加利亚": entity.polygon.material = Cesium.Color.PALEGREEN; entity.polygon.extrudedHeight=550000; break;
                case "斯洛文尼亚": entity.polygon.material = Cesium.Color.PALEGREEN; entity.polygon.extrudedHeight=550000;  break;
                case "克罗地亚": entity.polygon.material = Cesium.Color.PALEGREEN; entity.polygon.extrudedHeight=550000; break;
                case "阿尔巴尼亚": entity.polygon.material = Cesium.Color.PALEGREEN ; entity.polygon.extrudedHeight=550000;  break;
                case "黑山": entity.polygon.material = Cesium.Color.PALEGREEN ; entity.polygon.extrudedHeight=550000;  break;
                case "马其顿": entity.polygon.material = Cesium.Color.PALEGREEN ; entity.polygon.extrudedHeight=550000;  break;
                //狂野东部 土黄色
                case "阿塞拜疆": entity.polygon.material = Cesium.Color.KHAKI ; entity.polygon.extrudedHeight=680000;  break;
                case "巴基斯坦": entity.polygon.material = Cesium.Color.KHAKI; entity.polygon.extrudedHeight=680000;   break;
                case "阿富汗": entity.polygon.material = Cesium.Color.KHAKI; entity.polygon.extrudedHeight=680000;   break;
                case "哈萨克斯坦": entity.polygon.material = Cesium.Color.KHAKI ; entity.polygon.extrudedHeight=680000;   break;
                case "吉尔吉斯斯坦": entity.polygon.material = Cesium.Color.KHAKI; entity.polygon.extrudedHeight=680000;   break;
                case "塔吉克斯坦": entity.polygon.material = Cesium.Color.KHAKI; entity.polygon.extrudedHeight=680000;   break;
                //橡胶地带 银灰色
                case "印度尼西亚": entity.polygon.material = Cesium.Color.GAINSBORO ; entity.polygon.extrudedHeight=450000;  break;
                case "泰国": entity.polygon.material = Cesium.Color.GAINSBORO ; entity.polygon.extrudedHeight=450000;  break;
                case "马来西亚": entity.polygon.material = Cesium.Color.GAINSBORO ; entity.polygon.extrudedHeight=450000;  break;
                case "越南": entity.polygon.material = Cesium.Color.GAINSBORO ; entity.polygon.extrudedHeight=450000;  break;
                case "菲律宾": entity.polygon.material = Cesium.Color.GAINSBORO ; entity.polygon.extrudedHeight=450000;  break;
                case "缅甸": entity.polygon.material = Cesium.Color.GAINSBORO ; entity.polygon.extrudedHeight=450000;  break;
                case "柬埔寨": entity.polygon.material = Cesium.Color.GAINSBORO ; entity.polygon.extrudedHeight=450000;  break;
                case "老挝": entity.polygon.material = Cesium.Color.GAINSBORO ; entity.polygon.extrudedHeight=450000; break;
                case "文莱": entity.polygon.material = Cesium.Color.GAINSBORO ; entity.polygon.extrudedHeight=450000;  break;
                case "东帝汶": entity.polygon.material = Cesium.Color.GAINSBORO ; entity.polygon.extrudedHeight=450000;  break;
                //新土耳其帝国 重金色
                case "土耳其": entity.polygon.material = Cesium.Color.GOLDENROD; entity.polygon.extrudedHeight=350000;  break;
                case "波斯尼亚和黑塞哥维那": entity.polygon.material = Cesium.Color.GOLDENROD; entity.polygon.extrudedHeight=350000;  break;
                case "乌兹别克斯坦": entity.polygon.material = Cesium.Color.GOLDENROD; entity.polygon.extrudedHeight=350000;  break;
                case "土库曼斯坦": entity.polygon.material = Cesium.Color.GOLDENROD; entity.polygon.extrudedHeight=350000;  break;
                //伊朗斯坦 
                case "伊朗": entity.polygon.material = Cesium.Color.DARKCYAN; entity.polygon.extrudedHeight=480000;  break;
                case "伊拉克": entity.polygon.material = Cesium.Color.DARKCYAN; entity.polygon.extrudedHeight=480000; break;
                case "黎巴嫩": entity.polygon.material = Cesium.Color.DARKCYAN; entity.polygon.extrudedHeight=480000;  break;
                case "巴林": entity.polygon.material = Cesium.Color.DARKCYAN; entity.polygon.extrudedHeight=480000;  break;
                case "叙利亚": entity.polygon.material = Cesium.Color.DARKCYAN; entity.polygon.extrudedHeight=480000;  break;
                //中央王国
                case "中国": entity.polygon.material = Cesium.Color.CRIMSON; entity.polygon.extrudedHeight=700000; break;
                case "新加坡": entity.polygon.material = Cesium.Color.CRIMSON; entity.polygon.extrudedHeight=700000;  break;
                //default :alert("fill color");
                
                };

              
          };
          viewer.dataSources.add(dataSource);
  });
},
                
 function(){viewer.dataSources.removeAll();
      document.getElementById('mylegend').style.display = 'none';
      }
                   
 );
 //科特金文明end
 */
//边界国家
var Border_Areas= new Cesium.GeoJsonDataSource();
$("input[id='Border_Areas_checkbox']").click(function(){

  if($(this).prop('checked')==true)
  {
   Border_Areas.load('/data/permanent/json/Kotkin_Border_Areas.geojson',
   {
     stroke: Cesium.Color.GRAY,
     fill: Cesium.Color.MEDIUMORCHID.withAlpha(0.6),
   });

   viewer.dataSources.add(Border_Areas);
   viewer.clock.shouldAnimate = false;
      //控制图例
      document.getElementById('legendbox').src = "/public/img/KTJ.jpg";
      document.getElementById('mylegend').style.display = 'block';

    }
    else
    { 
      viewer.dataSources.remove(Border_Areas);
      (function(){
        var reco = $(".Kotkin").not("#Border_Areas_checkbox");
        var rearray=new Array();
        for(var i=0;i<reco.length;i++){
          if (reco[i].checked==true){
            rearray.push(reco[i]);
          }
        }
        if(!rearray.length){document.getElementById('mylegend').style.display = 'none';}
        else{document.getElementById('mylegend').style.display = 'block';}
      })();

    }               

  });

$("li[id='Border_Areas']>a").click( 
  function(){
    if($(this).parent().children()[0].checked==false){
     Border_Areas.load('/data/permanent/json/Kotkin_Border_Areas.geojson',
     {
       stroke: Cesium.Color.GRAY,
       fill: Cesium.Color.MEDIUMORCHID.withAlpha(0.6),
     });

     viewer.dataSources.add(Border_Areas);
     viewer.clock.shouldAnimate = false;
     $(this).parent().children()[0].checked=true;
      //控制图例
      document.getElementById('legendbox').src = "/public/img/KTJ.jpg";
      document.getElementById('mylegend').style.display = 'block';
    }
    else{
      viewer.dataSources.remove(Border_Areas);
      $(this).parent().children()[0].checked=false;
      (function(){
        var reco = $(".Kotkin").not("#Border_Areas_checkbox");
        var rearray=new Array();
        for(var i=0;i<reco.length;i++){
          if (reco[i].checked==true){
            rearray.push(reco[i]);
          }
        }
        if(!rearray.length){document.getElementById('mylegend').style.display = 'none';}
        else{document.getElementById('mylegend').style.display = 'block';}
      })();
    }
  } 
  );
 //边界国家end
//中央国家 
var Middle_Kingdom= new Cesium.GeoJsonDataSource();
$("input[id='Middle_Kingdom_checkbox']").click(function(){

  if($(this).prop('checked')==true)
  {
   Middle_Kingdom.load('/data/permanent/json/Kotkin_Middle_Kingdom.geojson',
   {
     stroke: Cesium.Color.GRAY,
     fill: Cesium.Color.CRIMSON.withAlpha(0.6),
   });

   viewer.dataSources.add(Middle_Kingdom);
   viewer.clock.shouldAnimate = false;
      //控制图例
      document.getElementById('legendbox').src = "/public/img/KTJ.jpg";
      document.getElementById('mylegend').style.display = 'block';
    }
    else
    { 
      viewer.dataSources.remove(Middle_Kingdom);
      (function(){
        var reco = $(".Kotkin").not("#Middle_Kingdom_checkbox");
        var rearray=new Array();
        for(var i=0;i<reco.length;i++){
          if (reco[i].checked==true){
            rearray.push(reco[i]);
          }
        }
        if(!rearray.length){document.getElementById('mylegend').style.display = 'none';}
        else{document.getElementById('mylegend').style.display = 'block';}
      })();

    }               

  });

$("li[id=Middle_Kingdom]>a").click( 
  function(){
    if($(this).parent().children()[0].checked==false){
     Middle_Kingdom.load('/data/permanent/json/Kotkin_Middle_Kingdom.geojson',
     {
       stroke: Cesium.Color.GRAY,
       fill: Cesium.Color.CRIMSON.withAlpha(0.6),
     });

     viewer.dataSources.add(Middle_Kingdom);
     viewer.clock.shouldAnimate = false;
     $(this).parent().children()[0].checked=true;
      //控制图例
      document.getElementById('legendbox').src = "/public/img/KTJ.jpg";
      document.getElementById('mylegend').style.display = 'block';
    }
    else{
      viewer.dataSources.remove(Middle_Kingdom);
      $(this).parent().children()[0].checked=false;
      (function(){
        var reco = $(".Kotkin").not("#Middle_Kingdom_checkbox");
        var rearray=new Array();
        for(var i=0;i<reco.length;i++){
          if (reco[i].checked==true){
            rearray.push(reco[i]);
          }
        }
        if(!rearray.length){document.getElementById('mylegend').style.display = 'none';}
        else{document.getElementById('mylegend').style.display = 'block';}
      })();

    }                    
  } 
  );
 //中央国家end
 //橄榄共和国
 var Olive_Republics= new Cesium.GeoJsonDataSource();
 $("input[id='Olive_Republics_checkbox']").click(function(){

  if($(this).prop('checked')==true)
  {
   Olive_Republics.load('/data/permanent/json/Kotkin_Olive_Republics.geojson',
   {
     stroke: Cesium.Color.GRAY,
     fill: Cesium.Color.PALEGREEN.withAlpha(0.6),
   });

   viewer.dataSources.add(Olive_Republics);
   viewer.clock.shouldAnimate = false;
      //控制图例
      document.getElementById('legendbox').src = "/public/img/KTJ.jpg";
      document.getElementById('mylegend').style.display = 'block';
    }
    else
    { 
      viewer.dataSources.remove(Olive_Republics);
      (function(){
        var reco = $(".Kotkin").not("#Olive_Republics_checkbox");
        var rearray=new Array();
        for(var i=0;i<reco.length;i++){
          if (reco[i].checked==true){
            rearray.push(reco[i]);
          }
        }
        if(!rearray.length){document.getElementById('mylegend').style.display = 'none';}
        else{document.getElementById('mylegend').style.display = 'block';}
      })();
    }



  });

 $("li[id=Olive_Republics]>a").click( 
  function(){
    if($(this).parent().children()[0].checked==false){
     Olive_Republics.load('/data/permanent/json/Kotkin_Olive_Republics.geojson',
     {
       stroke: Cesium.Color.GRAY,
       fill: Cesium.Color.PALEGREEN.withAlpha(0.6),
     });

     viewer.dataSources.add(Olive_Republics);
     viewer.clock.shouldAnimate = false;
     $(this).parent().children()[0].checked=true;
      //控制图例
      document.getElementById('legendbox').src = "/public/img/KTJ.jpg";
      document.getElementById('mylegend').style.display = 'block';
    }
    else{
      viewer.dataSources.remove(Olive_Republics);
      $(this).parent().children()[0].checked=false;
      (function(){
        var reco = $(".Kotkin").not("#Olive_Republics_checkbox");
        var rearray=new Array();
        for(var i=0;i<reco.length;i++){
          if (reco[i].checked==true){
            rearray.push(reco[i]);
          }
        }
        if(!rearray.length){document.getElementById('mylegend').style.display = 'none';}
        else{document.getElementById('mylegend').style.display = 'block';}
      })();
    }                    

  } 

  );
 //橄榄共和国end
 //俄罗斯帝国
 var Imperial_Russia= new Cesium.GeoJsonDataSource();
 $("input[id='Imperial_Russia_checkbox']").click(function(){

  if($(this).prop('checked')==true)
  {
    Imperial_Russia.load('/data/permanent/json/Kotkin_Imperial_Russia.geojson',
    {
     stroke: Cesium.Color.GRAY,
     fill: Cesium.Color.LIGHTSTEELBLUE.withAlpha(0.6),
   });

    viewer.dataSources.add(Imperial_Russia);
    viewer.clock.shouldAnimate = false;
      //控制图例
      document.getElementById('legendbox').src = "/public/img/KTJ.jpg";
      document.getElementById('mylegend').style.display = 'block';
    }
    else
    { 
      viewer.dataSources.remove(Imperial_Russia);

      (function(){
        var reco = $(".Kotkin").not("#Imperial_Russia_checkbox");
        var rearray=new Array();
        for(var i=0;i<reco.length;i++){
          if (reco[i].checked==true){
            rearray.push(reco[i]);
          }
        }
        if(!rearray.length){document.getElementById('mylegend').style.display = 'none';}
        else{document.getElementById('mylegend').style.display = 'block';}
      })();
    }



  });


 $("li[id=Imperial_Russia]>a").click( 
  function(){
    if($(this).parent().children()[0].checked==false){
     Imperial_Russia.load('/data/permanent/json/Kotkin_Imperial_Russia.geojson',
     {
       stroke: Cesium.Color.GRAY,
       fill: Cesium.Color.LIGHTSTEELBLUE.withAlpha(0.6),
     });

     viewer.dataSources.add(Imperial_Russia);
     viewer.clock.shouldAnimate = false;
     $(this).parent().children()[0].checked=true;
      //控制图例
      document.getElementById('legendbox').src = "/public/img/KTJ.jpg";
      document.getElementById('mylegend').style.display = 'block';
    }
    else{
      viewer.dataSources.remove(Imperial_Russia);
      $(this).parent().children()[0].checked=false;
      (function(){
        var reco = $(".Kotkin").not("#Imperial_Russia");
        var rearray=new Array();
        for(var i=0;i<reco.length;i++){
          if (reco[i].checked==true){
            rearray.push(reco[i]);
          }
        }
        if(!rearray.length){document.getElementById('mylegend').style.display = 'none';}
        else{document.getElementById('mylegend').style.display = 'block';}
      })();
    }
  } 
  );
 //俄罗斯帝国end
  //狂野东部 
  var Wild_East= new Cesium.GeoJsonDataSource();
  $("input[id='Wild_East_checkbox']").click(function(){

    if($(this).prop('checked')==true)
    {
     Wild_East.load('/data/permanent/json/Kotkin_Wild_East.geojson',
     {
       stroke: Cesium.Color.GRAY,
       fill: Cesium.Color.KHAKI.withAlpha(0.6),
     });

     viewer.dataSources.add(Wild_East);
     viewer.clock.shouldAnimate = false;
      //控制图例
      document.getElementById('legendbox').src = "/public/img/KTJ.jpg";
      document.getElementById('mylegend').style.display = 'block';
    }
    else
    { 
      viewer.dataSources.remove(Wild_East);
      (function(){
        var reco = $(".Kotkin").not("#IWild_East_checkbox");
        var rearray=new Array();
        for(var i=0;i<reco.length;i++){
          if (reco[i].checked==true){
            rearray.push(reco[i]);
          }
        }
        if(!rearray.length){document.getElementById('mylegend').style.display = 'none';}
        else{document.getElementById('mylegend').style.display = 'block';}
      })();

    }             

  });


  $("li[id=Wild_East]>a").click( 
    function(){
      if($(this).parent().children()[0].checked==false){
       Wild_East.load('/data/permanent/json/Kotkin_Wild_East.geojson',
       {
         stroke: Cesium.Color.GRAY,
         fill: Cesium.Color.KHAKI.withAlpha(0.6),
       });

       viewer.dataSources.add(Wild_East);
       viewer.clock.shouldAnimate = false;
       $(this).parent().children()[0].checked=true;
      //控制图例
      document.getElementById('legendbox').src = "/public/img/KTJ.jpg";
      document.getElementById('mylegend').style.display = 'block';
    }
    else{
      viewer.dataSources.remove(Wild_East);
      $(this).parent().children()[0].checked=false;
      (function(){
        var reco = $(".Kotkin").not("#IWild_East_checkbox");
        var rearray=new Array();
        for(var i=0;i<reco.length;i++){
          if (reco[i].checked==true){
            rearray.push(reco[i]);
          }
        }
        if(!rearray.length){document.getElementById('mylegend').style.display = 'none';}
        else{document.getElementById('mylegend').style.display = 'block';}
      })();
    }
  } 

  );
 //狂野东部end
   //伊朗斯坦
   var Iranistan= new Cesium.GeoJsonDataSource();
   $("input[id='Iranistan_checkbox']").click(function(){

    if($(this).prop('checked')==true)
    {
     Iranistan.load('/data/permanent/json/Kotkin_Iranistan.geojson',
     {
       stroke: Cesium.Color.GRAY,
       fill: Cesium.Color.DARKCYAN.withAlpha(0.6),
     });

     viewer.dataSources.add(Iranistan);
     viewer.clock.shouldAnimate = false;
      //控制图例
      document.getElementById('legendbox').src = "/public/img/KTJ.jpg";
      document.getElementById('mylegend').style.display = 'block';
    }
    else
    { 
      viewer.dataSources.remove(Iranistan);
      (function(){
        var reco = $(".Kotkin").not("#Iranistan_checkbox");
        var rearray=new Array();
        for(var i=0;i<reco.length;i++){
          if (reco[i].checked==true){
            rearray.push(reco[i]);
          }
        }
        if(!rearray.length){document.getElementById('mylegend').style.display = 'none';}
        else{document.getElementById('mylegend').style.display = 'block';}
      })();
    }         


  });


   $("li[id=Iranistan]>a").click( 
    function(){
      if($(this).parent().children()[0].checked==false){
       Iranistan.load('/data/permanent/json/Kotkin_Iranistan.geojson',
       {
         stroke: Cesium.Color.GRAY,
         fill: Cesium.Color.DARKCYAN.withAlpha(0.6),
       });

       viewer.dataSources.add(Iranistan);
       viewer.clock.shouldAnimate = false;
       $(this).parent().children()[0].checked=true;
      //控制图例
      document.getElementById('legendbox').src = "/public/img/KTJ.jpg";
      document.getElementById('mylegend').style.display = 'block';
    }
    else{
      viewer.dataSources.remove(Iranistan);
      $(this).parent().children()[0].checked=false;
      (function(){
        var reco = $(".Kotkin").not("#Iranistan_checkbox");
        var rearray=new Array();
        for(var i=0;i<reco.length;i++){
          if (reco[i].checked==true){
            rearray.push(reco[i]);
          }
        }
        if(!rearray.length){document.getElementById('mylegend').style.display = 'none';}
        else{document.getElementById('mylegend').style.display = 'block';}
      })();
    }
  } 
  );
 //伊朗斯坦end
    //大阿拉伯
    var Greater_Arabia= new Cesium.GeoJsonDataSource();
    $("input[id='Greater_Arabia_checkbox']").click(function(){

      if($(this).prop('checked')==true)
      {
       Greater_Arabia.load('/data/permanent/json/Kotkin_Greater_Arabia.geojson',
       {
         stroke: Cesium.Color.GRAY,
         fill: Cesium.Color.PERU.withAlpha(0.6),
       });

       viewer.dataSources.add(Greater_Arabia);
       viewer.clock.shouldAnimate = false;
      //控制图例
      document.getElementById('legendbox').src = "/public/img/KTJ.jpg";
      document.getElementById('mylegend').style.display = 'block';
    }
    else
    { 
      viewer.dataSources.remove(Greater_Arabia);
      (function(){
        var reco = $(".Kotkin").not("#Greater_Arabia_checkbox");
        var rearray=new Array();
        for(var i=0;i<reco.length;i++){
          if (reco[i].checked==true){
            rearray.push(reco[i]);
          }
        }
        if(!rearray.length){document.getElementById('mylegend').style.display = 'none';}
        else{document.getElementById('mylegend').style.display = 'block';}
      })();

    }             

  });


    $("li[id=Greater_Arabia]>a").click( 
      function(){
        if($(this).parent().children()[0].checked==false){
         Greater_Arabia.load('/data/permanent/json/Kotkin_Greater_Arabia.geojson',
         {
           stroke: Cesium.Color.GRAY,
           fill: Cesium.Color.PERU.withAlpha(0.6),
         });

         viewer.dataSources.add(Greater_Arabia);
         viewer.clock.shouldAnimate = false;
         $(this).parent().children()[0].checked=true;
      //控制图例
      document.getElementById('legendbox').src = "/public/img/KTJ.jpg";
      document.getElementById('mylegend').style.display = 'block';
    }
    else{
      viewer.dataSources.remove(Greater_Arabia);
      $(this).parent().children()[0].checked=false;
      (function(){
        var reco = $(".Kotkin").not("#Greater_Arabia_checkbox");
        var rearray=new Array();
        for(var i=0;i<reco.length;i++){
          if (reco[i].checked==true){
            rearray.push(reco[i]);
          }
        }
        if(!rearray.length){document.getElementById('mylegend').style.display = 'none';}
        else{document.getElementById('mylegend').style.display = 'block';}
      })();
    }
  } 

  );
 //大阿拉伯end

//土耳其帝国
var Ottoman_Empire= new Cesium.GeoJsonDataSource();
$("input[id='Ottoman_Empire_checkbox']").click(function(){

  if($(this).prop('checked')==true)
  {
   Ottoman_Empire.load('/data/permanent/json/Kotkin_Ottoman_Empire.geojson',
   {
     stroke: Cesium.Color.GRAY,
     fill: Cesium.Color.GOLDENROD.withAlpha(0.6),
   });

   viewer.dataSources.add(Ottoman_Empire);
   viewer.clock.shouldAnimate = false;
      //控制图例
      document.getElementById('legendbox').src = "/public/img/KTJ.jpg";
      document.getElementById('mylegend').style.display = 'block';
    }
    else
    { 
      viewer.dataSources.remove(Ottoman_Empire);
      (function(){
        var reco = $(".Kotkin").not("#Ottoman_Empire_checkbox");
        var rearray=new Array();
        for(var i=0;i<reco.length;i++){
          if (reco[i].checked==true){
            rearray.push(reco[i]);
          }
        }
        if(!rearray.length){document.getElementById('mylegend').style.display = 'none';}
        else{document.getElementById('mylegend').style.display = 'block';}
      })();

    }             

  });


$("li[id=Ottoman_Empire]>a").click( 
  function(){
    if($(this).parent().children()[0].checked==false){
     Ottoman_Empire.load('/data/permanent/json/Kotkin_Ottoman_Empire.geojson',
     {
       stroke: Cesium.Color.GRAY,
       fill: Cesium.Color.GOLDENROD.withAlpha(0.6),
     });

     viewer.dataSources.add(Ottoman_Empire);
     viewer.clock.shouldAnimate = false;
     $(this).parent().children()[0].checked=true;
      //控制图例
      document.getElementById('legendbox').src = "/public/img/KTJ.jpg";
      document.getElementById('mylegend').style.display = 'block';
    }
    else{
      viewer.dataSources.remove(Ottoman_Empire);
      $(this).parent().children()[0].checked=false;
      (function(){
        var reco = $(".Kotkin").not("#Ottoman_Empire_checkbox");
        var rearray=new Array();
        for(var i=0;i<reco.length;i++){
          if (reco[i].checked==true){
            rearray.push(reco[i]);
          }
        }
        if(!rearray.length){document.getElementById('mylegend').style.display = 'none';}
        else{document.getElementById('mylegend').style.display = 'block';}
      })();
    }
  } 
  );
 //土耳其帝国end
 
    //橡胶带 
    var Rubber_Belt= new Cesium.GeoJsonDataSource();
    $("input[id='Rubber_Belt_checkbox']").click(function(){

      if($(this).prop('checked')==true)
      {
       Rubber_Belt.load('/data/permanent/json/Kotkin_Rubber_Belt.geojson',
       {
         stroke: Cesium.Color.GRAY,
         fill: Cesium.Color.GAINSBORO.withAlpha(0.6),
       });

       viewer.dataSources.add(Rubber_Belt);
       viewer.clock.shouldAnimate = false;
      //控制图例
      document.getElementById('legendbox').src = "/public/img/KTJ.jpg";
      document.getElementById('mylegend').style.display = 'block';
    }
    else
    { 
      viewer.dataSources.remove(Rubber_Belt);
      (function(){
        var reco = $(".Kotkin").not("#Rubber_Belt_checkbox");
        var rearray=new Array();
        for(var i=0;i<reco.length;i++){
          if (reco[i].checked==true){
            rearray.push(reco[i]);
          }
        }
        if(!rearray.length){document.getElementById('mylegend').style.display = 'none';}
        else{document.getElementById('mylegend').style.display = 'block';}
      })();
    }         


  });


    $("li[id=Rubber_Belt]>a").click( 
      function(){
        if($(this).parent().children()[0].checked==false){
         Rubber_Belt.load('/data/permanent/json/Kotkin_Rubber_Belt.geojson',
         {
           stroke: Cesium.Color.GRAY,
           fill: Cesium.Color.GAINSBORO.withAlpha(0.6),
         });

         viewer.dataSources.add(Rubber_Belt);
         viewer.clock.shouldAnimate = false;
         $(this).parent().children()[0].checked=true;
      //控制图例
      document.getElementById('legendbox').src = "/public/img/KTJ.jpg";
      document.getElementById('mylegend').style.display = 'block';
    }
    else{
      viewer.dataSources.remove(Rubber_Belt);
      $(this).parent().children()[0].checked=false;
      (function(){
        var reco = $(".Kotkin").not("#Rubber_Belt_checkbox");
        var rearray=new Array();
        for(var i=0;i<reco.length;i++){
          if (reco[i].checked==true){
            rearray.push(reco[i]);
          }
        }
        if(!rearray.length){document.getElementById('mylegend').style.display = 'none';}
        else{document.getElementById('mylegend').style.display = 'block';}
      })();
    }
  } 
  );

 //橡胶带end
//单蹦国
var Stand_Alones= new Cesium.GeoJsonDataSource();
$("input[id='Stand_Alones_checkbox']").click(function(){

  if($(this).prop('checked')==true)
  {
    Stand_Alones.load('/data/permanent/json/Kotkin_Stand_Alones.geojson',
    {
     stroke: Cesium.Color.GRAY,
     fill: Cesium.Color.SALMON.withAlpha(0.6),
   });

    viewer.dataSources.add(Stand_Alones);
    viewer.clock.shouldAnimate = false;
      //控制图例
      document.getElementById('legendbox').src = "/public/img/KTJ.jpg";
      document.getElementById('mylegend').style.display = 'block';
    }
    else
    { 
      viewer.dataSources.remove(Stand_Alones);
      (function(){
        var reco = $(".Kotkin").not("#Stand_Alones_checkbox");
        var rearray=new Array();
        for(var i=0;i<reco.length;i++){
          if (reco[i].checked==true){
            rearray.push(reco[i]);
          }
        }
        if(!rearray.length){document.getElementById('mylegend').style.display = 'none';}
        else{document.getElementById('mylegend').style.display = 'block';}
      })();
    }       


  });


$("li[id=Stand_Alones]>a").click( 
  function(){
    if($(this).parent().children()[0].checked==false){
     Stand_Alones.load('/data/permanent/json/Kotkin_Stand_Alones.geojson',
     {
       stroke: Cesium.Color.GRAY,
       fill: Cesium.Color.SALMON.withAlpha(0.6),
     });

     viewer.dataSources.add(Stand_Alones);
     viewer.clock.shouldAnimate = false;
     $(this).parent().children()[0].checked=true;
      //控制图例
      document.getElementById('legendbox').src = "/public/img/KTJ.jpg";
      document.getElementById('mylegend').style.display = 'block';
    }
    else{
      viewer.dataSources.remove(Stand_Alones);
      $(this).parent().children()[0].checked=false;
      (function(){
        var reco = $(".Kotkin").not("#Stand_Alones_checkbox");
        var rearray=new Array();
        for(var i=0;i<reco.length;i++){
          if (reco[i].checked==true){
            rearray.push(reco[i]);
          }
        }
        if(!rearray.length){document.getElementById('mylegend').style.display = 'none';}
        else{document.getElementById('mylegend').style.display = 'block';}
      })();
    }
  } 
  );
 //单蹦国end
//亨廷顿文明
//西方文明
var western= new Cesium.GeoJsonDataSource();
$("input[id='western_checkbox']").click(function(){

  if($(this).prop('checked')==true)
  {
   western.load('/data/permanent/json/Huntington_western.geojson',
   {
     stroke: Cesium.Color.GRAY,
     fill: Cesium.Color.DARKBLUE.withAlpha(0.6),
   });
   viewer.dataSources.add(western);
   viewer.clock.shouldAnimate = false;
 }
 else
 { 
  viewer.dataSources.remove(western);
  (function(){
    var reco = $(".HTD").not("#western_checkbox");
    var rearray=new Array();
    for(var i=0;i<reco.length;i++){
      if (reco[i].checked==true){
        rearray.push(reco[i]);
      }
    }
    if(!rearray.length){document.getElementById('mylegend').style.display = 'none';}
    else{document.getElementById('mylegend').style.display = 'block';}
  })();
}         


});

$("li[id=western]>a").click( 
  function(){
    if($(this).parent().children()[0].checked==false){
     western.load('/data/permanent/json/Huntington_western.geojson',
     {
       stroke: Cesium.Color.GRAY,
       fill: Cesium.Color.DARKBLUE.withAlpha(0.6),
     });
     viewer.dataSources.add(western);
     viewer.clock.shouldAnimate = false;
     $(this).parent().children()[0].checked=true;
   }
   else{
    viewer.dataSources.remove(western);
    $(this).parent().children()[0].checked=false;
    (function(){
      var reco = $(".HTD").not("#western_checkbox");
      var rearray=new Array();
      for(var i=0;i<reco.length;i++){
        if (reco[i].checked==true){
          rearray.push(reco[i]);
        }
      }
      if(!rearray.length){document.getElementById('mylegend').style.display = 'none';}
      else{document.getElementById('mylegend').style.display = 'block';}
    })();
  }
} 

);
 //西方文明end
//中华文明
var sinic= new Cesium.GeoJsonDataSource();
$("input[id='sinic_checkbox']").click(function(){

  if($(this).prop('checked')==true)
  {
   sinic.load('/data/permanent/json/Huntington_sinic.geojson',
   {
     stroke: Cesium.Color.GRAY,
     fill: Cesium.Color.RED.withAlpha(0.6),
   });
   viewer.dataSources.add(sinic);
   viewer.clock.shouldAnimate = false;
      //控制图例
      document.getElementById('legendbox').src = "/public/img/HengTDlegend.jpg";
      document.getElementById('mylegend').style.display = 'block';
    }
    else
    { 
      viewer.dataSources.remove(sinic);
      (function(){
        var reco = $(".HTD").not("#sinic_checkbox");
        var rearray=new Array();
        for(var i=0;i<reco.length;i++){
          if (reco[i].checked==true){
            rearray.push(reco[i]);
          }
        }
        if(!rearray.length){document.getElementById('mylegend').style.display = 'none';}
        else{document.getElementById('mylegend').style.display = 'block';}
      })();

    }             

  });

$("li[id=sinic]>a").click( 
  function(){
    if($(this).parent().children()[0].checked==false){
     sinic.load('/data/permanent/json/Huntington_sinic.geojson',
     {
       stroke: Cesium.Color.GRAY,
       fill: Cesium.Color.RED.withAlpha(0.6),
     });
     viewer.dataSources.add(sinic);
     viewer.clock.shouldAnimate = false;
     $(this).parent().children()[0].checked=true;

      //控制图例
      document.getElementById('legendbox').src = "/public/img/HengTDlegend.jpg";
      document.getElementById('mylegend').style.display = 'block';
    }
    else{
      viewer.dataSources.remove(sinic);
      $(this).parent().children()[0].checked=false;
      (function(){
        var reco = $(".HTD").not("#sinic_checkbox");
        var rearray=new Array();
        for(var i=0;i<reco.length;i++){
          if (reco[i].checked==true){
            rearray.push(reco[i]);
          }
        }
        if(!rearray.length){document.getElementById('mylegend').style.display = 'none';}
        else{document.getElementById('mylegend').style.display = 'block';}
      })();
    }
  } 
  );
 //中华文明end
//伊斯兰文明
var islanmic= new Cesium.GeoJsonDataSource();
$("input[id='islanmic_checkbox']").click(function(){

  if($(this).prop('checked')==true)
  {
   islanmic.load('/data/permanent/json/Huntington_islanmic.geojson',
   {
     stroke: Cesium.Color.GRAY,
     fill: Cesium.Color.MOCCASIN.withAlpha(0.6),
   });
   viewer.dataSources.add(islanmic);
   viewer.clock.shouldAnimate = false;
      //控制图例
      document.getElementById('legendbox').src = "/public/img/HengTDlegend.jpg";
      document.getElementById('mylegend').style.display = 'block';

    }
    else
    { 
      viewer.dataSources.remove(islanmic);
      (function(){
        var reco = $(".HTD").not("#islanmic_checkbox");
        var rearray=new Array();
        for(var i=0;i<reco.length;i++){
          if (reco[i].checked==true){
            rearray.push(reco[i]);
          }
        }
        if(!rearray.length){document.getElementById('mylegend').style.display = 'none';}
        else{document.getElementById('mylegend').style.display = 'block';}
      })();
    }         


  });
$("li[id=islanmic]>a").click( 
  function(){
    if($(this).parent().children()[0].checked==false){
     islanmic.load('/data/permanent/json/Huntington_islanmic.geojson',
     {
       stroke: Cesium.Color.GRAY,
       fill: Cesium.Color.MOCCASIN.withAlpha(0.6),
     });
     viewer.dataSources.add(islanmic);
     viewer.clock.shouldAnimate = false;
     $(this).parent().children()[0].checked=true;
      //控制图例
      document.getElementById('legendbox').src = "/public/img/HengTDlegend.jpg";
      document.getElementById('mylegend').style.display = 'block';
    }
    else{
      viewer.dataSources.remove(islanmic);
      $(this).parent().children()[0].checked=false;
      (function(){
        var reco = $(".HTD").not("#islanmic_checkbox");
        var rearray=new Array();
        for(var i=0;i<reco.length;i++){
          if (reco[i].checked==true){
            rearray.push(reco[i]);
          }
        }
        if(!rearray.length){document.getElementById('mylegend').style.display = 'none';}
        else{document.getElementById('mylegend').style.display = 'block';}
      })();
    }

  } 
  );
 //伊斯兰文明end
//东正教文明
var orthodox = new Cesium.GeoJsonDataSource();
$("input[id='orthodox_checkbox']").click(function(){

  if($(this).prop('checked')==true)
  {
   orthodox .load('/data/permanent/json/Huntington_orthodox.geojson',
   {
     stroke: Cesium.Color.GRAY,
     fill: Cesium.Color.DODGERBLUE.withAlpha(0.6),
   });
   viewer.dataSources.add(orthodox);
   viewer.clock.shouldAnimate = false;
          //控制图例
          document.getElementById('legendbox').src = "/public/img/HengTDlegend.jpg";
          document.getElementById('mylegend').style.display = 'block';
        }
        else
        { 
          viewer.dataSources.remove(orthodox);
          (function(){
            var reco = $(".HTD").not("#orthodox_checkbox");
            var rearray=new Array();
            for(var i=0;i<reco.length;i++){
              if (reco[i].checked==true){
                rearray.push(reco[i]);
              }
            }
            if(!rearray.length){document.getElementById('mylegend').style.display = 'none';}
            else{document.getElementById('mylegend').style.display = 'block';}
          })();
        }         


      });

$("li[id=orthodox]>a").click( 
  function(){
    if($(this).parent().children()[0].checked==false){
     orthodox .load('/data/permanent/json/Huntington_orthodox.geojson',
     {
       stroke: Cesium.Color.GRAY,
       fill: Cesium.Color.DODGERBLUE.withAlpha(0.6),
     });
     viewer.dataSources.add(orthodox);
     viewer.clock.shouldAnimate = false;
     $(this).parent().children()[0].checked=true;
      //控制图例
      document.getElementById('legendbox').src = "/public/img/HengTDlegend.jpg";
      document.getElementById('mylegend').style.display = 'block';
    }
    else{
      viewer.dataSources.remove(orthodox);
      $(this).parent().children()[0].checked=false;
      (function(){
        var reco = $(".HTD").not("#orthodox_checkbox");
        var rearray=new Array();
        for(var i=0;i<reco.length;i++){
          if (reco[i].checked==true){
            rearray.push(reco[i]);
          }
        }
        if(!rearray.length){document.getElementById('mylegend').style.display = 'none';}
        else{document.getElementById('mylegend').style.display = 'block';}
      })();
    }
  } 
  );
 //东正教文明end

//佛教文明
var buddhist= new Cesium.GeoJsonDataSource();
$("input[id='buddhist_checkbox']").click(function(){

  if($(this).prop('checked')==true)
  {
    buddhist.load('/data/permanent/json/Huntington_buddhist.geojson',
    {
     stroke: Cesium.Color.GRAY,
     fill: Cesium.Color.WHITE.withAlpha(0.6),
   });
    viewer.dataSources.add(buddhist);
    viewer.clock.shouldAnimate = false;
          //控制图例
          document.getElementById('legendbox').src = "/public/img/HengTDlegend.jpg";
          document.getElementById('mylegend').style.display = 'block';
        }
        else
        { 
          viewer.dataSources.remove(buddhist);
          (function(){
            var reco = $(".HTD").not("#buddhist_checkbox");
            var rearray=new Array();
            for(var i=0;i<reco.length;i++){
              if (reco[i].checked==true){
                rearray.push(reco[i]);
              }
            }
            if(!rearray.length){document.getElementById('mylegend').style.display = 'none';}
            else{document.getElementById('mylegend').style.display = 'block';}
          })();
        }       


      });

$("li[id=buddhist]>a").click( 
  function(){
    if($(this).parent().children()[0].checked==false){
     buddhist.load('/data/permanent/json/Huntington_buddhist.geojson',
     {
       stroke: Cesium.Color.GRAY,
       fill: Cesium.Color.WHITE.withAlpha(0.6),
     });
     viewer.dataSources.add(buddhist);
     viewer.clock.shouldAnimate = false;
     $(this).parent().children()[0].checked=true;
          //控制图例
          document.getElementById('legendbox').src = "/public/img/HengTDlegend.jpg";
          document.getElementById('mylegend').style.display = 'block';
        }
        else{
          viewer.dataSources.remove(buddhist);
          $(this).parent().children()[0].checked=false;
          (function(){
            var reco = $(".HTD").not("#buddhist_checkbox");
            var rearray=new Array();
            for(var i=0;i<reco.length;i++){
              if (reco[i].checked==true){
                rearray.push(reco[i]);
              }
            }
            if(!rearray.length){document.getElementById('mylegend').style.display = 'none';}
            else{document.getElementById('mylegend').style.display = 'block';}
          })();
        }
      } );

 //佛教文明end
//印度文明
var hindu= new Cesium.GeoJsonDataSource();
$("input[id='hindu_checkbox']").click(function(){

  if($(this).prop('checked')==true)
  {
    hindu.load('/data/permanent/json/Huntington_hindu.geojson',
    {
     stroke: Cesium.Color.GRAY,
     fill: Cesium.Color.ORANGE.withAlpha(0.6),
   });
    viewer.dataSources.add(hindu);
    viewer.clock.shouldAnimate = false;
          //控制图例
          document.getElementById('legendbox').src = "/public/img/HengTDlegend.jpg";
          document.getElementById('mylegend').style.display = 'block';
        }
        else
        { 
          viewer.dataSources.remove(hindu);
          (function(){
            var reco = $(".HTD").not("#hindu_checkbox");
            var rearray=new Array();
            for(var i=0;i<reco.length;i++){
              if (reco[i].checked==true){
                rearray.push(reco[i]);
              }
            }
            if(!rearray.length){document.getElementById('mylegend').style.display = 'none';}
            else{document.getElementById('mylegend').style.display = 'block';}
          })();

        }           

      });
$("li[id=hindu]>a").click( 
  function(){
    if($(this).parent().children()[0].checked==false){
     hindu.load('/data/permanent/json/Huntington_hindu.geojson',
     {
       stroke: Cesium.Color.GRAY,
       fill: Cesium.Color.ORANGE.withAlpha(0.6),
     });
     viewer.dataSources.add(hindu);
     viewer.clock.shouldAnimate = false;
     $(this).parent().children()[0].checked=true;
      //控制图例
      document.getElementById('legendbox').src = "/public/img/HengTDlegend.jpg";
      document.getElementById('mylegend').style.display = 'block';
    }
    else{
      viewer.dataSources.remove(hindu);
      $(this).parent().children()[0].checked=false;
      (function(){
        var reco = $(".HTD").not("#hindu_checkbox");
        var rearray=new Array();
        for(var i=0;i<reco.length;i++){
          if (reco[i].checked==true){
            rearray.push(reco[i]);
          }
        }
        if(!rearray.length){document.getElementById('mylegend').style.display = 'none';}
        else{document.getElementById('mylegend').style.display = 'block';}
      })();
    }
  } 

  );
 //印度文明end




//控制GDP图层
var GDP_data= new Cesium.KmlDataSource();
$("input[id='GDP_checkbox']").click(function(){

  if($(this).prop('checked')==true)
  {
    //当点击了checkbox之后，checkbox先变成了'checked'，才执行下面的代码
    document.getElementById('mylegend').style.display = 'none';
    GDP_data.load('/data/permanent/kml/gdpPerCapita_2008.kmz');
    viewer.dataSources.add(GDP_data);
    viewer.clock.shouldAnimate = false;
  }
  else
  {
    // $(this).parent().children()[0].checked=false;
    viewer.dataSources.remove(GDP_data);
  }

});

$("li[id='GDPcontrol']>a").click(function(){

  if($(this).parent().children()[0].checked==false){
    $(this).parent().children()[0].checked=true;
    document.getElementById('mylegend').style.display = 'none';
    GDP_data.load('/data/permanent/kml/gdpPerCapita_2008.kmz');
    viewer.dataSources.add(GDP_data);
    viewer.clock.shouldAnimate = false;
  }
  else{
    $(this).parent().children()[0].checked=false;
    viewer.dataSources.remove(GDP_data);
  }

});


//控制人口图层
var POP_data= new Cesium.KmlDataSource();
$("input[id='POP_checkbox']").click(function(){

  if($(this).prop('checked')==true)
          {//当点击了checkbox之后，checkbox先变成了'checked'，才执行下面的代码
        POP_data.load('/data/permanent/kml/pop.kml');
        viewer.dataSources.add(POP_data);
        viewer.clock.shouldAnimate = false;
        document.getElementById('legendbox').src = "/public/img/pop.jpg";
        document.getElementById('legendbox').style.display = 'block';
        document.getElementById('mylegend').style.display = 'block'; 
      }
      else
      { 
        if( $(".contro").not("#POP_checkbox").prop("checked")==false){
          document.getElementById('legendbox').style.display = 'none';
          document.getElementById('mylegend').style.display = 'none';
          viewer.dataSources.remove(POP_data);
        }
      }         


    });
$("li[id='POPcontrol']>a").click( 
  function(){
    if($(this).parent().children()[0].checked==false){
      $(this).parent().children()[0].checked=true;
      POP_data.load('/data/permanent/kml/pop.kml');
      viewer.dataSources.add(POP_data);
      viewer.clock.shouldAnimate = false;
      document.getElementById('legendbox').src = "/public/img/pop.jpg";
      document.getElementById('mylegend').style.display = 'block'; 
      document.getElementById('legendbox').style.display = 'block';
    }
    else{
    $(this).parent().children()[0].checked=false;
    document.getElementById('legendbox').style.display = 'none';
    viewer.dataSources.remove(POP_data);
    if($(".contro").not("#POP_checkbox").prop("checked")==false){
      document.getElementById('mylegend').style.display = 'none';
    }
  }                      


});

//亚投行
//一带一路亚投行小旗帜,
var AIIB01=['UAE','Oman','Azerbaijan','Egypt','Pakistan','Poland','Russia','Philippines','Kazakhstan','Kyrgyzstan',
'Cambodia','Qutar','Kuwait','Laos','Maldives','Malaysia','Mongolia','Bengal', 'Burma','Nepal','SaudiArabia','SriLanka',
'Tajikistan','Thailand','Turkey','Brunei','Uzbekistan','Singapore','Iran','Isreal','India','Indonesia','Jordan',
'Vietnam','China'];
var AIIB01_lng=[53.8478180000,57.3266601563,47.576927,30.802498,67.7636718750,19.145136,105.318756,121.7312622,66.923684,74.766098,
104.990963,51.183884,47.481766,102.495496,73.5361034,101.975766,103.846656,90.356331,95.956223,83.8806152344,45.0791620000,80.771797,
71.276093,100.992541,35.243322,114.727669,64.585262,103.819836,53.688046,34.851612,78.96288,113.921327,36.238414,
108.277199,104.1606903];
var AIIB01_lat=[23.424076,21.0947505331,40.143105,26.820553,28.0719803018,51.919438,61.52401,12.76894644,48.019573,41.20438,
12.565679,25.354826,29.31166,19.85627,1.977247,4.210484,46.862496,23.684994,21.913965,27.9264740399,23.8859420000,7.873054,
38.861034,15.870032,38.963745,4.535277,41.377491,1.352083,32.427908,31.046051,20.593684,-0.789275,30.585164,
14.058324,35.86804741];
//非一带一路亚投行小旗帜,
var AIIB02=['Austria','Brazil','Austrilia','Denmark','France','Finland','Germany','Iceland','Itlay','Luxemburg','Malta',
'Holland','NewZeland','Norway','Portuguese','SouthAfrica','Switzerland','UK','SouthKorea','Sweeden'];
var AIIB02_lng=[14.550072,-51.92528,133.775136,9.501785,2.213749,25.748151,10.451526,-19.020835,12.56738,6.129583,
14.375416,5.291266,174.885971,8.468946,-8.224454,22.937506,8.227512,-3.435973,127.766922,14.7875976563];
var AIIB02_lat=[47.516231,-14.235004,-25.274398,56.26392,46.227638,61.92411,51.165691,64.963051,41.87194,49.815273,
35.937496,52.132633,-40.900557,60.472024,39.399872,-30.559482,46.818188,55.378051,35.907757,59.3667939085];
$("li[id='AIIB_group']").click(function(){viewer.clock.shouldAnimate = false;
});
var AIIB_flag= new Cesium.KmlDataSource();
var AIIB= new Cesium.KmlDataSource();
$("input[id='AIIB_checkbox']").click(function(){

  if($(this).prop('checked')==true)
          {//当点击了checkbox之后，checkbox先变成了'checked'，才执行下面的代码
        AIIB.load('/data/permanent/kml/aib.kml');
        viewer.dataSources.add(AIIB);
                    //添加亚投行小旗帜
                    for(index in AIIB01)
                    {
                      viewer.entities.add({
                       id: AIIB01[index],
                       description : '<div style="background-color:#696969;font-family:Arial;color:#FFFFF0;font-size:15px;text-align:center;">“一带一路”沿线亚投行成员国家</div>',
//先经度后纬度
position : Cesium.Cartesian3.fromDegrees(AIIB01_lng[index], AIIB01_lat[index],50000),
label : {
 text : '亚投行成员',
 font : '11pt monospace',
 fillColor : Cesium.Color.BLUE,
 outlineColor: Cesium.Color.BLUE,
 translucencyByDistance : new Cesium.NearFarScalar(1.5e2, 1.0, 1.5e7, 0),
 style: Cesium.LabelStyle.FILL_AND_OUTLINE,
 outlineWidth : 1,
 verticalOrigin : Cesium.VerticalOrigin.TOP,
},
billboard : {
 image : '/public/img/AIIB_logo.png',
 scaleByDistance: new Cesium.NearFarScalar(1.5e2, 1.0, 1.5e7, 0.2),
 verticalOrigin : Cesium.VerticalOrigin.BOTTOM,
}

});
                    };
                    viewer.clock.shouldAnimate = false;
                    document.getElementById('legendbox').src = "/public/img/AIIB.jpg";
                    document.getElementById('mylegend').style.display = 'block';
                  }
                  else
                  { 
                    viewer.dataSources.remove(AIIB);
                        //移除亚投行小旗帜
                        for(index in AIIB01)
                        {
                          viewer.entities.removeById(AIIB01[index]);
            };  //根据id移除
            if( $(".aiib").not("#AIIB_checkbox").prop("checked")==false){
              document.getElementById('mylegend').style.display = 'none';
            }
          }



        });

$("li[id='AIIB']>a").click(
 function(){
  if($(this).parent().children()[0].checked==false){
    AIIB.load('/data/permanent/kml/aib.kml');
    viewer.dataSources.add(AIIB);
                       //添加亚投行小旗帜
                       for(index in AIIB01)
                       {
                        viewer.entities.add({
                         id: AIIB01[index],
                         description : '<div style="background-color:#696969;font-family:Arial;color:#FFFFF0;font-size:15px;text-align:center;">“一带一路”沿线亚投行成员国家</div>',
//先经度后纬度
position : Cesium.Cartesian3.fromDegrees(AIIB01_lng[index], AIIB01_lat[index],50000),
label : {
 text : '亚投行成员',
 font : '11pt monospace',
 fillColor : Cesium.Color.BLUE,
 outlineColor: Cesium.Color.BLUE,
 translucencyByDistance : new Cesium.NearFarScalar(1.5e2, 1.0, 1.5e7, 0),
 style: Cesium.LabelStyle.FILL_AND_OUTLINE,
 outlineWidth : 1,
 verticalOrigin : Cesium.VerticalOrigin.TOP,
},
billboard : {
 image : '/public/img/AIIB_logo.png',
 scaleByDistance: new Cesium.NearFarScalar(1.5e2, 1.0, 1.5e7, 0.2),
 verticalOrigin : Cesium.VerticalOrigin.BOTTOM,
}

});
                      };
                      $(this).parent().children()[0].checked=true;
      //控制图例
      document.getElementById('legendbox').src = "/public/img/AIIB.jpg";
      document.getElementById('mylegend').style.display = 'block'; 
    }
    else{
     viewer.dataSources.remove(AIIB);
                          //移除亚投行小旗帜
                          for(index in AIIB01)
                          {
                            viewer.entities.removeById(AIIB01[index]);
            };  //根据id移除
            $(this).parent().children()[0].checked=false;
            if( $(".aiib").not("#AIIB_checkbox").prop("checked")==false){
             document.getElementById('mylegend').style.display = 'none';
           }
         }                    
       } 

       );
var non_AIIB= new Cesium.KmlDataSource();
$("input[id='non_AIIB_checkbox']").click(function(){

  if($(this).prop('checked')==true)
          {//当点击了checkbox之后，checkbox先变成了'checked'，才执行下面的代码
        non_AIIB.load('/data/permanent/kml/noaib.kml');
        viewer.dataSources.add(non_AIIB);
                    //添加非一带一路亚投行小旗帜
                    for(index in AIIB02)
                    {
                      viewer.entities.add({
                       id: AIIB02[index],
                       description : '<div style="background-color:#696969;font-family:Arial;color:#FFFFF0;font-size:15px;text-align:center;">非“一带一路”沿线亚投行成员国家</div>',
//先经度后纬度
position : Cesium.Cartesian3.fromDegrees(AIIB02_lng[index], AIIB02_lat[index],50000),
label : {
 text : '亚投行成员',
 font : '11pt monospace',
 fillColor : Cesium.Color.BLUE,
 outlineColor: Cesium.Color.BLUE,
 translucencyByDistance : new Cesium.NearFarScalar(1.5e2, 1.0, 1.5e7, 0),
 style: Cesium.LabelStyle.FILL_AND_OUTLINE,
 outlineWidth : 1,
 verticalOrigin : Cesium.VerticalOrigin.TOP,
},
billboard : {
 image : '/public/img/AIIB_logo.png',
 scaleByDistance: new Cesium.NearFarScalar(1.5e2, 0.8, 1.5e7, 0.2),
 verticalOrigin : Cesium.VerticalOrigin.BOTTOM,
}

});
                    };
                    viewer.clock.shouldAnimate = false;
                    document.getElementById('legendbox').src = "/public/img/AIIB.jpg";
                    document.getElementById('mylegend').style.display = 'block';
                  }
                  else
                  { 
                    viewer.dataSources.remove(non_AIIB);
                    for(index in AIIB02)
                    {
                      viewer.entities.removeById(AIIB02[index]);
                    };  
                    if( $(".aiib").not("#non_AIIB_checkbox").prop("checked")==false){
                      document.getElementById('mylegend').style.display = 'none'; 
                    }                        
                  }



                });
$("li[id='non_AIIB']>a").click(
 function(){
   if($(this).parent().children()[0].checked==false){
    non_AIIB.load('/data/permanent/kml/noaib.kml');
          viewer.dataSources.add(non_AIIB); //添加非一带一路亚投行小旗帜
          for(index in AIIB02)
          {
            viewer.entities.add({
             id: AIIB02[index],
             description : '<div style="background-color:#696969;font-family:Arial;color:#FFFFF0;font-size:15px;text-align:center;">非“一带一路”沿线亚投行成员国家</div>',
//先经度后纬度
position : Cesium.Cartesian3.fromDegrees(AIIB02_lng[index], AIIB02_lat[index],50000),
label : {
 text : '亚投行成员',
 font : '11pt monospace',
 fillColor : Cesium.Color.BLUE,
 outlineColor: Cesium.Color.BLUE,
 translucencyByDistance : new Cesium.NearFarScalar(1.5e2, 1.0, 1.5e7, 0),
 style: Cesium.LabelStyle.FILL_AND_OUTLINE,
 outlineWidth : 1,
 verticalOrigin : Cesium.VerticalOrigin.TOP,
},
billboard : {
 image : '/public/img/AIIB_logo.png',
 scaleByDistance: new Cesium.NearFarScalar(1.5e2, 0.8, 1.5e7, 0.2),
 verticalOrigin : Cesium.VerticalOrigin.BOTTOM,
}

});
          };

          $(this).parent().children()[0].checked=true;
      //控制图例
      document.getElementById('legendbox').src = "/public/img/AIIB.jpg";
      document.getElementById('mylegend').style.display = 'block';
    }
    else{
      viewer.dataSources.remove(non_AIIB);
      for(index in AIIB02)
      {
        viewer.entities.removeById(AIIB02[index]);
      };  
      $(this).parent().children()[0].checked=false;
      if( $(".aiib").not("#non_AIIB_checkbox").prop("checked")==false){
        document.getElementById('mylegend').style.display = 'none';
      }
    }
  } 
  );
//反恐态势

$("li[id='anti_Terrorism']").click(function(){viewer.clock.shouldAnimate = false;});

var obor_anti_Terrorism= new Cesium.KmlDataSource();
$("input[id='anti_Terrorism01_checkbox']").click(function(){

  if($(this).prop('checked')==true)
          {//当点击了checkbox之后，checkbox先变成了'checked'，才执行下面的代码
        obor_anti_Terrorism.load('/data/permanent/kml/anti_Terrorism01.kml');
        viewer.dataSources.add(obor_anti_Terrorism);
        viewer.clock.shouldAnimate = false;
          //控制图例
          document.getElementById('legendbox').src = "/public/img/TerrorismRisk.jpg";
          document.getElementById('mylegend').style.display = 'block'; 

        }
        else
        { 
          viewer.dataSources.remove(obor_anti_Terrorism);
          if( $(".anti").not("#anti_Terrorism01_checkbox").prop("checked")==false){
            document.getElementById('mylegend').style.display = 'none'; 
          }                        
        }



      });

$("li[id='anti_Terrorism01']>a").click(
 function(){
   if($(this).parent().children()[0].checked==false){
    obor_anti_Terrorism.load('/data/permanent/kml/anti_Terrorism01.kml');
    viewer.dataSources.add(obor_anti_Terrorism);
    $(this).parent().children()[0].checked=true;
      //控制图例
      document.getElementById('legendbox').src = "/public/img/TerrorismRisk.jpg";
      document.getElementById('mylegend').style.display = 'block'; 
    }
    else{
      viewer.dataSources.remove(obor_anti_Terrorism);
      $(this).parent().children()[0].checked=false;
      if($(".anti").not("#anti_Terrorism01_checkbox").prop("checked")==false){
        document.getElementById('mylegend').style.display = 'none'; 
      }

    }
  } 
  );

var other_anti_Terrorism= new Cesium.KmlDataSource();
$("input[id='anti_Terrorism02_checkbox']").click(function(){

  if($(this).prop('checked')==true)
          {//当点击了checkbox之后，checkbox先变成了'checked'，才执行下面的代码
        other_anti_Terrorism.load('/data/permanent/kml/anti_Terrorism02.kml');
        viewer.dataSources.add(other_anti_Terrorism);
          //控制图例
          document.getElementById('legendbox').src = "/public/img/TerrorismRisk.jpg";
          document.getElementById('mylegend').style.display = 'block'; 

        }
        else
        { 
          viewer.dataSources.remove(other_anti_Terrorism);
          if( $(".anti").not("#anti_Terrorism02_checkbox").prop("checked")==false){
            document.getElementById('mylegend').style.display = 'none';
          }
        }



      });

$("li[id='anti_Terrorism02']>a").click(
 function(){
  if($(this).parent().children()[0].checked==false){
    other_anti_Terrorism.load('/data/permanent/kml/anti_Terrorism02.kml');
    viewer.dataSources.add(other_anti_Terrorism);
    $(this).parent().children()[0].checked=true;
      //控制图例
      document.getElementById('legendbox').src = "/public/img/TerrorismRisk.jpg";
      document.getElementById('mylegend').style.display = 'block'; 
    }
    else{
     viewer.dataSources.remove(other_anti_Terrorism);
     $(this).parent().children()[0].checked=false;
     if($(".anti").not("#anti_Terrorism02_checkbox").prop("checked")==false){
      document.getElementById('mylegend').style.display = 'none';
    }
  }
} 
);

  //添加国旗
 //亲日
 var Philippine_flag = new Cesium.Entity({ 
  id: '菲律宾',
               //先经度后纬度
               position : Cesium.Cartesian3.fromDegrees(120.88,16.03,300000),
               description : '<div style="background-color:#696969;font-family:Arial;color:#FFFFF0;font-size:20px;text-align:center;">亲   日</div>',

               

               billboard : {
                image : '/public/img/flag3/japan.png',
                scale:0.3,
                scaleByDistance: new Cesium.NearFarScalar(1.5e2, 1.0, 1.5e7, 0.2),
                verticalOrigin : Cesium.VerticalOrigin.TOP,
              }
            });
 var Mongolia_flag = new Cesium.Entity({ 
  id: '蒙古',
               //先经度后纬度
               position : Cesium.Cartesian3.fromDegrees(103.46,45.59,300000),
               description : '<div style="background-color:#696969;font-family:Arial;color:#FFFFF0;font-size:20px;text-align:center;">亲   华、亲  日、亲  俄</div>',


               billboard : {
                image : '/public/img/flag3/japan.png',
                scale:0.3,
                scaleByDistance: new Cesium.NearFarScalar(1.5e2, 1.0, 1.5e7, 0.2),
                verticalOrigin : Cesium.VerticalOrigin.TOP,
              }
            }); 
 var Turkey_flag = new Cesium.Entity({ 
  id: '土耳其',
               //先经度后纬度
               position : Cesium.Cartesian3.fromDegrees(35.43,39.16,300000),
               description : '<div style="background-color:#696969;font-family:Arial;color:#FFFFF0;font-size:20px;text-align:center;">亲   日</div>',



               billboard : {
                image : '/public/img/flag3/japan.png',
                scale:0.3,
                scaleByDistance: new Cesium.NearFarScalar(1.5e2, 1.0, 1.5e7, 0.2),
                verticalOrigin : Cesium.VerticalOrigin.TOP,
              }
            });
 var Thailand_flag = new Cesium.Entity({ 
  id: '泰国',
               //先经度后纬度
               position : Cesium.Cartesian3.fromDegrees(102.56,15.75,300000),
               description : '<div style="background-color:#696969;font-family:Arial;color:#FFFFF0;font-size:20px;text-align:center;">亲   日</div>',


               billboard : {
                image : '/public/img/flag3/japan.png',
                scale:0.3,
                scaleByDistance: new Cesium.NearFarScalar(1.5e2, 1.0, 1.5e7, 0.2),
                verticalOrigin : Cesium.VerticalOrigin.TOP,
              }
            }); 
 var Myanmar_flag = new Cesium.Entity({ 
  id: '缅甸',
               //先经度后纬度
               position : Cesium.Cartesian3.fromDegrees(96.44,21.02,300000),
               description : '<div style="background-color:#696969;font-family:Arial;color:#FFFFF0;font-size:20px;text-align:center;">亲   日</div>',


               billboard : {
                image : '/public/img/flag3/japan.png',
                scale:0.3,
                scaleByDistance: new Cesium.NearFarScalar(1.5e2, 1.0, 1.5e7, 0.2),
                verticalOrigin : Cesium.VerticalOrigin.TOP,
              }
            });  
 var Vietnam_flag = new Cesium.Entity({ 
  id: '越南',
               //先经度后纬度
               position : Cesium.Cartesian3.fromDegrees(105.39,21.77,300000),
               description : '<div style="background-color:#696969;font-family:Arial;color:#FFFFF0;font-size:20px;text-align:center;">亲   日</div>',



               billboard : {
                image : '/public/img/flag3/japan.png',
                scale:0.3,
                scaleByDistance: new Cesium.NearFarScalar(1.5e2, 1.0, 1.5e7, 0.2),
                verticalOrigin : Cesium.VerticalOrigin.TOP,
              }
            });
 var Malaysia_flag = new Cesium.Entity({ 
  id: '马来西亚',
               //先经度后纬度
               position : Cesium.Cartesian3.fromDegrees(102.42,4.26,300000),
               description : '<div style="background-color:#696969;font-family:Arial;color:#FFFFF0;font-size:20px;text-align:center;">亲   日、亲  美</div>',



               billboard : {
                image : '/public/img/flag3/japan.png',
                scale:0.3,
                scaleByDistance: new Cesium.NearFarScalar(1.5e2, 1.0, 1.5e7, 0.2),
                verticalOrigin : Cesium.VerticalOrigin.TOP,
              }
            }); 
 var Brunei_flag = new Cesium.Entity({ 
  id: '文莱',
               //先经度后纬度
               position : Cesium.Cartesian3.fromDegrees(114.59,4.51,300000),
               description : '<div style="background-color:#696969;font-family:Arial;color:#FFFFF0;font-size:20px;text-align:center;">亲   日 </div>',



               billboard : {
                image : '/public/img/flag3/japan.png',
                scale:0.3,
                scaleByDistance: new Cesium.NearFarScalar(1.5e2, 1.0, 1.5e7, 0.2),
                verticalOrigin : Cesium.VerticalOrigin.TOP,
              }
            }); 
 var  Indonesia_flag = new Cesium.Entity({ 
  id: '印度尼西亚',
               //先经度后纬度
               position : Cesium.Cartesian3.fromDegrees(113.44,-0.78,300000),
               description : '<div style="background-color:#696969;font-family:Arial;color:#FFFFF0;font-size:20px;text-align:center;">亲   日、亲  美</div>',



               billboard : {
                image : '/public/img/flag3/japan.png',
                scale:0.3,
                scaleByDistance: new Cesium.NearFarScalar(1.5e2, 1.0, 1.5e7, 0.2),
                verticalOrigin : Cesium.VerticalOrigin.TOP,
              }
            });
 var  Turkmenistan_flag = new Cesium.Entity({ 
  id: '土库曼斯坦',
               //先经度后纬度
               position : Cesium.Cartesian3.fromDegrees(58.32,39.71,300000),
               description : '<div style="background-color:#696969;font-family:Arial;color:#FFFFF0;font-size:20px;text-align:center;">亲   日、亲  华、亲  俄</div>',



               billboard : {
                image : '/public/img/flag3/japan.png',
                scale:0.3,
                scaleByDistance: new Cesium.NearFarScalar(1.5e2, 1.0, 1.5e7, 0.2),
                verticalOrigin : Cesium.VerticalOrigin.TOP,
              }
            });
 var  Azerbaijan_flag = new Cesium.Entity({ 
  id: '阿塞拜疆',
               //先经度后纬度
               position : Cesium.Cartesian3.fromDegrees(44.48,40.50,300000),
               description : '<div style="background-color:#696969;font-family:Arial;color:#FFFFF0;font-size:20px;text-align:center;">亲   日 </div>',



               billboard : {
                image : '/public/img/flag3/japan.png',
                scale:0.3,
                scaleByDistance: new Cesium.NearFarScalar(1.5e2, 1.0, 1.5e7, 0.2),
                verticalOrigin : Cesium.VerticalOrigin.TOP,
              }
            });
 var  Kyrgyzstan_flag = new Cesium.Entity({ 
  id: '吉尔吉斯斯坦',
               //先经度后纬度
               position : Cesium.Cartesian3.fromDegrees(74.09,42.09,300000),
               description : '<div style="background-color:#696969;font-family:Arial;color:#FFFFF0;font-size:20px;text-align:center;">亲   日、亲  华、亲  俄 </div>',



               billboard : {
                image : '/public/img/flag3/japan.png',
                scale:0.3,
                scaleByDistance: new Cesium.NearFarScalar(1.5e2, 1.0, 1.5e7, 0.2),
                verticalOrigin : Cesium.VerticalOrigin.TOP,
              }
            }); 
 var  BANGLADESH_flag = new Cesium.Entity({ 
  id: '孟加拉国',
               //先经度后纬度
               position : Cesium.Cartesian3.fromDegrees(89.90,24.33,300000),
               description : '<div style="background-color:#696969;font-family:Arial;color:#FFFFF0;font-size:20px;text-align:center;">亲   日、亲  印 </div>',


               billboard : {
                image : '/public/img/flag3/japan.png',
                scale:0.3,
                scaleByDistance: new Cesium.NearFarScalar(1.5e2, 1.0, 1.5e7, 0.2),
                verticalOrigin : Cesium.VerticalOrigin.TOP,
              }
            });
 var  Kuwait_flag = new Cesium.Entity({ 
  id: '科威特',
               //先经度后纬度
               position : Cesium.Cartesian3.fromDegrees(47.59,29.56,300000),
               description : '<div style="background-color:#696969;font-family:Arial;color:#FFFFF0;font-size:20px;text-align:center;">亲   日、亲  美 </div>',



               billboard : {
                image : '/public/img/flag3/japan.png',
                scale:0.3,
                scaleByDistance: new Cesium.NearFarScalar(1.5e2, 1.0, 1.5e7, 0.2),
                verticalOrigin : Cesium.VerticalOrigin.TOP,
              }
            });                
  //亲欧国旗 

  var  Arab_flag = new Cesium.Entity({ 
    id: '阿联酋',
               //先经度后纬度
               position : Cesium.Cartesian3.fromDegrees(54.04,23.88,300000),
               description : '<div style="background-color:#696969;font-family:Arial;color:#FFFFF0;font-size:20px;text-align:center;">亲   欧 </div>',



               billboard : {
                image : '/public/img/flag3/euro.png',
                scale:0.35,
                scaleByDistance: new Cesium.NearFarScalar(1.5e2, 1.0, 1.5e7, 0.2),
                verticalOrigin : Cesium.VerticalOrigin.TOP,
              }
            });   
  var  Bahrain_flag = new Cesium.Entity({ 
    id: '巴林',
               //先经度后纬度
               position : Cesium.Cartesian3.fromDegrees(51.17,25.85,300000),
               description : '<div style="background-color:#696969;font-family:Arial;color:#FFFFF0;font-size:20px;text-align:center;">亲   欧 </div>',



               billboard : {
                image : '/public/img/flag3/euro.png',
                scale:0.35,
                scaleByDistance: new Cesium.NearFarScalar(1.5e2, 1.0, 1.5e7, 0.2),
                verticalOrigin : Cesium.VerticalOrigin.TOP,
              }
            });   
  var  Bulgaria_flag = new Cesium.Entity({ 
    id: '保加利亚',
               //先经度后纬度
               position : Cesium.Cartesian3.fromDegrees(25.13,42.87,300000),
               description : '<div style="background-color:#696969;font-family:Arial;color:#FFFFF0;font-size:20px;text-align:center;">亲   欧 </div>',



               billboard : {
                image : '/public/img/flag3/euro.png',
                scale:0.35,
                scaleByDistance: new Cesium.NearFarScalar(1.5e2, 1.0, 1.5e7, 0.2),
                verticalOrigin : Cesium.VerticalOrigin.TOP,
              }
            });   
  var  Poland_flag = new Cesium.Entity({ 
    id: '波兰',
               //先经度后纬度
               position : Cesium.Cartesian3.fromDegrees(19.04,51.78,300000),
               description : '<div style="background-color:#696969;font-family:Arial;color:#FFFFF0;font-size:20px;text-align:center;">亲   欧、亲  美 </div>',



               billboard : {
                image : '/public/img/flag3/euro.png',
                scale:0.35,
                scaleByDistance: new Cesium.NearFarScalar(1.5e2, 1.0, 1.5e7, 0.2),
                verticalOrigin : Cesium.VerticalOrigin.TOP,
              }
            });   
  var  Georgia_flag = new Cesium.Entity({ 
    id: '格鲁吉亚',
               //先经度后纬度
               position : Cesium.Cartesian3.fromDegrees(44.07,41.85,300000),
               description : '<div style="background-color:#696969;font-family:Arial;color:#FFFFF0;font-size:20px;text-align:center;">亲   欧、亲  美 </div>',


               billboard : {
                image : '/public/img/flag3/euro.png',
                scale:0.35,
                scaleByDistance: new Cesium.NearFarScalar(1.5e2, 1.0, 1.5e7, 0.2),
                verticalOrigin : Cesium.VerticalOrigin.TOP,
              }
            });   
  var  Czech_flag = new Cesium.Entity({ 
    id: '捷克',
               //先经度后纬度
               position : Cesium.Cartesian3.fromDegrees(14.75,49.54,300000),
               description : '<div style="background-color:#696969;font-family:Arial;color:#FFFFF0;font-size:20px;text-align:center;">亲   欧、亲  美 </div>',



               billboard : {
                image : '/public/img/flag3/euro.png',
                scale:0.35,
                scaleByDistance: new Cesium.NearFarScalar(1.5e2, 1.0, 1.5e7, 0.2),
                verticalOrigin : Cesium.VerticalOrigin.TOP,
              }
            });   
  var  Qatar_flag = new Cesium.Entity({ 
    id: '卡塔尔',
               //先经度后纬度
               position : Cesium.Cartesian3.fromDegrees(51.52,25.35,300000),
               description : '<div style="background-color:#696969;font-family:Arial;color:#FFFFF0;font-size:20px;text-align:center;">亲   欧 </div>',



               billboard : {
                image : '/public/img/flag3/euro.png',
                scale:0.35,
                scaleByDistance: new Cesium.NearFarScalar(1.5e2, 1.0, 1.5e7, 0.2),
                verticalOrigin : Cesium.VerticalOrigin.TOP,
              }
            });   
  var  Latvia_flag = new Cesium.Entity({ 
    id: '拉脱维亚',
               //先经度后纬度
               position : Cesium.Cartesian3.fromDegrees(26.06,56.73,300000),
               description : '<div style="background-color:#696969;font-family:Arial;color:#FFFFF0;font-size:20px;text-align:center;">亲  欧 </div>',



               billboard : {
                image : '/public/img/flag3/euro.png',
                scale:0.35,
                scaleByDistance: new Cesium.NearFarScalar(1.5e2, 1.0, 1.5e7, 0.2),
                verticalOrigin : Cesium.VerticalOrigin.TOP,
              }
            });   
  var  Lithuania_flag = new Cesium.Entity({ 
    id: '立陶宛',
               //先经度后纬度
               position : Cesium.Cartesian3.fromDegrees(23.51,55.40,300000),
               description : '<div style="background-color:#696969;font-family:Arial;color:#FFFFF0;font-size:20px;text-align:center;">亲   欧 </div>',



               billboard : {
                image : '/public/img/flag3/euro.png',
                scale:0.35,
                scaleByDistance: new Cesium.NearFarScalar(1.5e2, 1.0, 1.5e7, 0.2),
                verticalOrigin : Cesium.VerticalOrigin.TOP,
              }
            });   
  var  SaudiArabia_flag = new Cesium.Entity({ 
    id: '沙特阿拉伯',
               //先经度后纬度
               position : Cesium.Cartesian3.fromDegrees(44.00,23.05,300000),
               description : '<div style="background-color:#696969;font-family:Arial;color:#FFFFF0;font-size:20px;text-align:center;">亲   欧、亲  美 </div>',



               billboard : {
                image : '/public/img/flag3/euro.png',
                scale:0.35,
                scaleByDistance: new Cesium.NearFarScalar(1.5e2, 1.0, 1.5e7, 0.2),
                verticalOrigin : Cesium.VerticalOrigin.TOP,
              }
            });   

  var  Slovak_flag = new Cesium.Entity({ 
    id: '斯洛伐克',
               //先经度后纬度
               position : Cesium.Cartesian3.fromDegrees(19.46,48.80,300000),
               description : '<div style="background-color:#696969;font-family:Arial;color:#FFFFF0;font-size:20px;text-align:center;">亲   欧 </div>',



               billboard : {
                image : '/public/img/flag3/euro.png',
                scale:0.35,
                scaleByDistance: new Cesium.NearFarScalar(1.5e2, 1.0, 1.5e7, 0.2),
                verticalOrigin : Cesium.VerticalOrigin.TOP,
              }
            });   
  var  Slovenia_flag = new Cesium.Entity({ 
    id: '斯洛文尼亚',
               //先经度后纬度
               position : Cesium.Cartesian3.fromDegrees(14.53,46.01,300000),
               description : '<div style="background-color:#696969;font-family:Arial;color:#FFFFF0;font-size:20px;text-align:center;">亲   欧 </div>',



               billboard : {
                image : '/public/img/flag3/euro.png',
                scale:0.35,
                scaleByDistance: new Cesium.NearFarScalar(1.5e2, 1.0, 1.5e7, 0.2),
                verticalOrigin : Cesium.VerticalOrigin.TOP,
              }
            });   
  var  Turkey2_flag = new Cesium.Entity({ 
    id: '土耳其',
               //先经度后纬度
               position : Cesium.Cartesian3.fromDegrees(32.74,39.45,300000),
               description : '<div style="background-color:#696969;font-family:Arial;color:#FFFFF0;font-size:20px;text-align:center;">亲   日、亲  美、亲  欧 </div>',



               billboard : {
                image : '/public/img/flag3/euro.png',
                scale:0.35,
                scaleByDistance: new Cesium.NearFarScalar(1.5e2, 1.0, 1.5e7, 0.2),
                verticalOrigin : Cesium.VerticalOrigin.TOP,
              }
            });   
  var  Singapore_flag = new Cesium.Entity({ 
    id: '新加坡',
               //先经度后纬度
               position : Cesium.Cartesian3.fromDegrees(103.78,1.38,300000),
               description : '<div style="background-color:#696969;font-family:Arial;color:#FFFFF0;font-size:20px;text-align:center;">亲   欧、亲  美 </div>',



               billboard : {
                image : '/public/img/flag3/euro.png',
                scale:0.35,
                scaleByDistance: new Cesium.NearFarScalar(1.5e2, 1.0, 1.5e7, 0.2),
                verticalOrigin : Cesium.VerticalOrigin.TOP,
              }
            });   
  var  Hungary_flag = new Cesium.Entity({ 
    id: '匈牙利',
               //先经度后纬度
               position : Cesium.Cartesian3.fromDegrees(19.48,46.96,300000),
               description : '<div style="background-color:#696969;font-family:Arial;color:#FFFFF0;font-size:20px;text-align:center;">亲   欧 </div>',


               billboard : {
                image : '/public/img/flag3/euro.png',
                scale:0.35,
                scaleByDistance: new Cesium.NearFarScalar(1.5e2, 1.0, 1.5e7, 0.2),
                verticalOrigin : Cesium.VerticalOrigin.TOP,
              }
            });   
  var  Israel_flag = new Cesium.Entity({ 
    id: '以色列',
               //先经度后纬度
               position : Cesium.Cartesian3.fromDegrees(34.87,30.98,300000),
               description : '<div style="background-color:#696969;font-family:Arial;color:#FFFFF0;font-size:20px;text-align:center;">亲   欧、亲  美 </div>',



               billboard : {
                image : '/public/img/flag3/euro.png',
                scale:0.35,
                scaleByDistance: new Cesium.NearFarScalar(1.5e2, 1.0, 1.5e7, 0.2),
                verticalOrigin : Cesium.VerticalOrigin.TOP,
              }
            });   
//对印友好
var  Bhutan_flag = new Cesium.Entity({ 
  id: '不丹',
               //先经度后纬度
               position : Cesium.Cartesian3.fromDegrees(90.39,27.48,300000),
               description : '<div style="background-color:#696969;font-family:Arial;color:#FFFFF0;font-size:20px;text-align:center;">亲   印 </div>',



               billboard : {
                image : '/public/img/flag3/india.png',
                scale:0.3,
                scaleByDistance: new Cesium.NearFarScalar(1.5e2, 1.0, 1.5e7, 0.2),
                verticalOrigin : Cesium.VerticalOrigin.TOP,
              }
            });
var  russia_flag = new Cesium.Entity({ 
  id: '俄罗斯',
               //先经度后纬度
               position : Cesium.Cartesian3.fromDegrees(40.40,57.97,300000),
               description : '<div style="background-color:#696969;font-family:Arial;color:#FFFFF0;font-size:20px;text-align:center;">亲   印、亲  华 </div>',



               billboard : {
                image : '/public/img/flag3/india.png',
                scale:0.3,
                scaleByDistance: new Cesium.NearFarScalar(1.5e2, 1.0, 1.5e7, 0.2),
                verticalOrigin : Cesium.VerticalOrigin.TOP,
              }
            });
var  BANGLADESH2_flag = new Cesium.Entity({ 
  id: '孟加拉国',
               //先经度后纬度
               position : Cesium.Cartesian3.fromDegrees(88.73,24.80,300000),
               description : '<div style="background-color:#696969;font-family:Arial;color:#FFFFF0;font-size:20px;text-align:center;">亲   印、亲  日 </div>',



               billboard : {
                image : '/public/img/flag3/india.png',
                scale:0.3,
                scaleByDistance: new Cesium.NearFarScalar(1.5e2, 1.0, 1.5e7, 0.2),
                verticalOrigin : Cesium.VerticalOrigin.TOP,
              }
            }); 
var  Nepal_flag = new Cesium.Entity({ 
  id: '尼泊尔',
               //先经度后纬度
               position : Cesium.Cartesian3.fromDegrees(84.84,27.74,300000),
               description : '<div style="background-color:#696969;font-family:Arial;color:#FFFFF0;font-size:20px;text-align:center;">亲   印 </div>',



               billboard : {
                image : '/public/img/flag3/india.png',
                scale:0.3,
                scaleByDistance: new Cesium.NearFarScalar(1.5e2, 1.0, 1.5e7, 0.2),
                verticalOrigin : Cesium.VerticalOrigin.TOP,
              }
            }); 


 //亲华国旗
 
 var Pakistan_flag = new Cesium.Entity({ 
   id: '巴基斯坦',
//先经度后纬度
position : Cesium.Cartesian3.fromDegrees(69.3451160000,30.3753210000,300000),
description : '<div style="background-color:#696969;font-family:Arial;color:#FFFFF0;font-size:20px;text-align:center;">亲美、亲华</div>',

billboard : {
 image : '/public/img/flag3/china.png',
 scale:0.3,
 scaleByDistance: new Cesium.NearFarScalar(1.5e2, 1.0, 1.5e7, 0.2),
 verticalOrigin : Cesium.VerticalOrigin.TOP,
}
});
//viewer.entities.add(Pakistan_flag);

var Afghanistan_flag = new Cesium.Entity({ 
 id: '阿富汗',
//先经度后纬度
position : Cesium.Cartesian3.fromDegrees(65.1489257813,33.6146192923,300000),
description : '<div style="background-color:#696969;font-family:Arial;color:#FFFFF0;font-size:20px;text-align:center;">亲美、亲华</div>',

billboard : {
 image : '/public/img/flag3/china.png',
 scale:0.3,
 scaleByDistance: new Cesium.NearFarScalar(1.5e2, 1.0, 1.5e7, 0.2),
 verticalOrigin : Cesium.VerticalOrigin.TOP,
}
});
//viewer.entities.add(Afghanistan_flag);
//白俄
var Belarus_flag = new Cesium.Entity({ 
 name: '白俄罗斯',
//先经度后纬度
position : Cesium.Cartesian3.fromDegrees(27.8613281250,53.3702205740,300000),
description : '<div style="background-color:#696969;font-family:Arial;color:#FFFFF0;font-size:20px;text-align:center;">亲俄、亲华</div>',

billboard : {
 image : '/public/img/flag3/china.png',
 scale:0.3,
 scaleByDistance: new Cesium.NearFarScalar(1.5e2, 1.0, 1.5e7, 0.2),
 verticalOrigin : Cesium.VerticalOrigin.TOP,
}
});
//viewer.entities.add(Belarus_flag);
//哈萨克斯坦
var Kazakhstan_flag = new Cesium.Entity({ 
 name: '哈萨克斯坦',
//先经度后纬度
position : Cesium.Cartesian3.fromDegrees(65.9838867188,47.4578085308,300000),
description : '<div style="background-color:#696969;font-family:Arial;color:#FFFFF0;font-size:20px;text-align:center;">亲华</div>',

billboard : {
 image : '/public/img/flag3/china.png',
 scale:0.3,
 scaleByDistance: new Cesium.NearFarScalar(1.5e2, 1.0, 1.5e7, 0.2),
 verticalOrigin : Cesium.VerticalOrigin.TOP,
}
});
//viewer.entities.add(Kazakhstan_flag);
//吉尔吉斯斯坦
var Kyrgyzsaa_flag = new Cesium.Entity({ 
 name: '吉尔吉斯斯坦',
//先经度后纬度
position : Cesium.Cartesian3.fromDegrees(77.30,42.09,300000),
description : '<div style="background-color:#696969;font-family:Arial;color:#FFFFF0;font-size:20px;text-align:center;">亲华、亲俄、亲日</div>',

billboard : {
 image : '/public/img/flag3/china.png',
 scale:0.3,
 scaleByDistance: new Cesium.NearFarScalar(1.5e2, 1.0, 1.5e7, 0.2),
 verticalOrigin : Cesium.VerticalOrigin.TOP,
}
});
//viewer.entities.add(Kyrgyzstan_flag);
//老挝
var Laos_flag = new Cesium.Entity({ 
 id: '老挝',
//先经度后纬度
position : Cesium.Cartesian3.fromDegrees(102.4954960000,19.856270000,300000),
description : '<div style="background-color:#696969;font-family:Arial;color:#FFFFF0;font-size:20px;text-align:center;">亲华</div>',

billboard : {
 image : '/public/img/flag3/china.png',
 scale:0.3,
 scaleByDistance: new Cesium.NearFarScalar(1.5e2, 1.0, 1.5e7, 0.2),
 verticalOrigin : Cesium.VerticalOrigin.TOP,
}
});
//viewer.entities.add(Laos_flag);
//蒙古
var Mongoaa_flag = new Cesium.Entity({ 
 name: '蒙古',
//先经度后纬度
position : Cesium.Cartesian3.fromDegrees(108.35,44.97,300000),
description : '<div style="background-color:#696969;font-family:Arial;color:#FFFFF0;font-size:20px;text-align:center;">亲华、亲俄、亲日</div>',

billboard : {
 image : '/public/img/flag3/china.png',
 scale:0.3,
 scaleByDistance: new Cesium.NearFarScalar(1.5e2, 1.0, 1.5e7, 0.2),
 verticalOrigin : Cesium.VerticalOrigin.TOP,
}
});
//viewer.entities.add(Mongolia_flag);
//缅甸
var Buraa_flag = new Cesium.Entity({ 
 name: '缅甸',
//先经度后纬度
position : Cesium.Cartesian3.fromDegrees(95.98,25.06,300000),
description : '<div style="background-color:#696969;font-family:Arial;color:#FFFFF0;font-size:20px;text-align:center;">亲华、亲日</div>',

billboard : {
 image : '/public/img/flag3/china.png',
 scale:0.3,
 scaleByDistance: new Cesium.NearFarScalar(1.5e2, 1.0, 1.5e7, 0.2),
 verticalOrigin : Cesium.VerticalOrigin.TOP,
}
});
//viewer.entities.add(Burma_flag);
//斯里兰卡
var SriLanka_flag= new Cesium.Entity({ 
 id: '斯里兰卡',
//先经度后纬度
position : Cesium.Cartesian3.fromDegrees(80.7717970000,7.8730540000,300000),
description : '<div.Cartesian3 style="background-color:#696969;font-family:Arial;color:#FFFFF0;font-size:20px;text-align:center;">亲华</div>',

billboard : {
 image : '/public/img/flag3/china.png',
 scale:0.3,
 scaleByDistance: new Cesium.NearFarScalar(1.5e2, 1.0, 1.5e7, 0.2),
 verticalOrigin : Cesium.VerticalOrigin.TOP,
}
});
//viewer.entities.add(SriLanka_flag);
//塔吉克斯坦
var Tajikistan_flag = new Cesium.Entity({ 
 name: '塔吉克斯坦  ',
//先经度后纬度
position : Cesium.Cartesian3.fromDegrees(71.2760930000,38.8610340000,300000),
description : '<div style="background-color:#696969;font-family:Arial;color:#FFFFF0;font-size:20px;text-align:center;">亲华、亲俄</div>',

billboard : {
 image : '/public/img/flag3/china.png',
 scale:0.3,
 scaleByDistance: new Cesium.NearFarScalar(1.5e2, 1.0, 1.5e7, 0.2),
 verticalOrigin : Cesium.VerticalOrigin.TOP,
}
});
//viewer.entities.add(Tajikistan_flag);
//土库曼斯坦
var Turkmenistaa_flag = new Cesium.Entity({ 
 name: '土库曼斯坦',
//先经度后纬度
position : Cesium.Cartesian3.fromDegrees(63.71,38.16,300000),
description : '<div style="background-color:#696969;font-family:Arial;color:#FFFFF0;font-size:20px;text-align:center;">亲华、亲俄、亲日</div>',

billboard : {
 image : '/public/img/flag3/china.png',
 scale:0.3,
 scaleByDistance: new Cesium.NearFarScalar(1.5e2, 1.0, 1.5e7, 0.2),
 verticalOrigin : Cesium.VerticalOrigin.TOP,
}
});
//viewer.entities.add(Turkmenistan_flag);

//乌兹别克斯坦
var Uzbekistan_flag = new Cesium.Entity({ 
 name: '乌兹别克斯坦',
//先经度后纬度
position : Cesium.Cartesian3.fromDegrees(64.5852620000,41.3774910000,300000),
description : '<div style="background-color:#696969;font-family:Arial;color:#FFFFF0;font-size:20px;text-align:center;">亲华、亲俄</div>',

billboard : {
 image : '/public/img/flag3/china.png',
 scale:0.3,
 scaleByDistance: new Cesium.NearFarScalar(1.5e2, 1.0, 1.5e7, 0.2),
 verticalOrigin : Cesium.VerticalOrigin.TOP,
}
});
//viewer.entities.add(Uzbekistan_flag);

//伊朗
var Iran_flag = new Cesium.Entity({ 
 name: '伊朗',
//先经度后纬度
position : Cesium.Cartesian3.fromDegrees(53.6880460000,32.4279080000,300000),
description : '<div style="background-color:#696969;font-family:Arial;color:#FFFFF0;font-size:20px;text-align:center;">亲华、亲俄</div>',

billboard : {
 image : '/public/img/flag3/china.png',
 scale:0.3,
 scaleByDistance: new Cesium.NearFarScalar(1.5e2, 1.0, 1.5e7, 0.2),
 verticalOrigin : Cesium.VerticalOrigin.TOP,
}
});
var russaa_flag = new Cesium.Entity({ 
 name: '俄罗斯',
//先经度后纬度
position : Cesium.Cartesian3.fromDegrees(50.03,56.55,300000),
description : '<div style="background-color:#696969;font-family:Arial;color:#FFFFF0;font-size:20px;text-align:center;">亲华、亲俄</div>',

billboard : {
 image : '/public/img/flag3/china.png',
 scale:0.3,
 scaleByDistance: new Cesium.NearFarScalar(1.5e2, 1.0, 1.5e7, 0.2),
 verticalOrigin : Cesium.VerticalOrigin.TOP,
}
});
//亲美国旗
//埃及
var Egypt_flag = new Cesium.Entity({ 
 id: '埃及',
//先经度后纬度
position : Cesium.Cartesian3.fromDegrees(28.9599609375,25.9580446733,300000),
description : '<div style="background-color:#696969;font-family:Arial;color:#FFFFF0;font-size:20px;text-align:center;">亲  美</div>',

billboard : {
 image : '/public/img/flag3/usa.png',
 scale:0.3,
 scaleByDistance: new Cesium.NearFarScalar(1.5e2, 1.0, 1.5e7, 0.2),
 verticalOrigin : Cesium.VerticalOrigin.TOP,
}
});
//viewer.entities.add(Egypt_flag);

//波兰
var Polandaa_flag = new Cesium.Entity({ 
 name: '波兰',
//先经度后纬度
position : Cesium.Cartesian3.fromDegrees(16.45,53.53,300000),
description : '<div style="background-color:#696969;font-family:Arial;color:#FFFFF0;font-size:20px;text-align:center;">亲   美、亲   欧</div>',

billboard : {
 image : '/public/img/flag3/usa.png',
 scale:0.3,
 scaleByDistance: new Cesium.NearFarScalar(1.5e2, 1.0, 1.5e7, 0.2),
 verticalOrigin : Cesium.VerticalOrigin.TOP,
}
});
//viewer.entities.add(Poland_flag);

//捷克
var Czekhaa_flag = new Cesium.Entity({ 
 name: '捷克',
//先经度后纬度
position : Cesium.Cartesian3.fromDegrees(17.33,49.37,300000),
description : '<div style="background-color:#696969;font-family:Arial;color:#FFFFF0;font-size:20px;text-align:center;">亲   美、亲   欧</div>',

billboard : {
 image : '/public/img/flag3/usa.png',
 scale:0.3,
 scaleByDistance: new Cesium.NearFarScalar(1.5e2, 1.0, 1.5e7, 0.2),
 verticalOrigin : Cesium.VerticalOrigin.TOP,
}
});
//viewer.entities.add(Czekh_flag);


//科威特
var  Kuwaitaa_flag = new Cesium.Entity({ 
 name: ' 科威特',
//先经度后纬度
position : Cesium.Cartesian3.fromDegrees(48.46,29.05,300000),
description : '<div style="background-color:#696969;font-family:Arial;color:#FFFFF0;font-size:20px;text-align:center;">亲   美、亲   日</div>',

billboard : {
 image : '/public/img/flag3/usa.png',
 scale:0.3,
 scaleByDistance: new Cesium.NearFarScalar(1.5e2, 1.0, 1.5e7, 0.2),
 verticalOrigin : Cesium.VerticalOrigin.TOP,
}
});
//viewer.entities.add(Kuwait_flag);
//黎巴嫩
var  Lebanon_flag = new Cesium.Entity({ 
 id: '黎巴嫩',
//先经度后纬度
position : Cesium.Cartesian3.fromDegrees(35.8622850000,33.8547210000,300000),
description : '<div style="background-color:#696969;font-family:Arial;color:#FFFFF0;font-size:20px;text-align:center;">亲   美</div>',

billboard : {
 image : '/public/img/flag3/usa.png',
 scale:0.3,
 scaleByDistance: new Cesium.NearFarScalar(1.5e2, 1.0, 1.5e7, 0.2),
 verticalOrigin : Cesium.VerticalOrigin.TOP,
}
});
//viewer.entities.add(Lebanon_flag);
//马来西亚
var  Malaysiaa_flag = new Cesium.Entity({ 
 name: '马来西亚',
//先经度后纬度
position : Cesium.Cartesian3.fromDegrees(113.85,3.02,300000),
description : '<div style="background-color:#696969;font-family:Arial;color:#FFFFF0;font-size:20px;text-align:center;">亲   美、亲   日</div>',

billboard : {
 image : '/public/img/flag3/usa.png',
 scale:0.3,
 scaleByDistance: new Cesium.NearFarScalar(1.5e2, 1.0, 1.5e7, 0.2),
 verticalOrigin : Cesium.VerticalOrigin.TOP,
}
});
//viewer.entities.add(Malaysia_flag);

//土耳其
var  Turkeyaa_flag = new Cesium.Entity({ 
 name: '土耳其',
//先经度后纬度
position : Cesium.Cartesian3.fromDegrees(40.57,38.85,300000),
description : '<div style="background-color:#696969;font-family:Arial;color:#FFFFF0;font-size:20px;text-align:center;">亲   美、亲   欧、亲   日</div>',

billboard : {
 image : '/public/img/flag3/usa.png',
 scale:0.3,
 scaleByDistance: new Cesium.NearFarScalar(1.5e2, 1.0, 1.5e7, 0.2),
 verticalOrigin : Cesium.VerticalOrigin.TOP,
}
});
//viewer.entities.add(Turkey_flag);
//乌克兰
var  Ukraine_flag = new Cesium.Entity({ 
 id: '乌克兰',
//先经度后纬度
position : Cesium.Cartesian3.fromDegrees(31.1655800000,48.3794330000,300000),
description : '<div style="background-color:#696969;font-family:Arial;color:#FFFFF0;font-size:20px;text-align:center;">亲   美</div>',

billboard : {
 image : '/public/img/flag3/usa.png',
 scale:0.3,
 scaleByDistance: new Cesium.NearFarScalar(1.5e2, 1.0, 1.5e7, 0.2),
 verticalOrigin : Cesium.VerticalOrigin.TOP,
}
});
//viewer.entities.add(Ukraine_flag);

//以色列
var  Israelaa_flag = new Cesium.Entity({ 
 name: '以色列',
//先经度后纬度
position : Cesium.Cartesian3.fromDegrees(34.91,30.32,300000),
description : '<div style="background-color:#696969;font-family:Arial;color:#FFFFF0;font-size:20px;text-align:center;">亲   美、亲   欧</div>',

billboard : {
 image : '/public/img/flag3/usa.png',
 scale:0.3,
 scaleByDistance: new Cesium.NearFarScalar(1.5e2, 1.0, 1.5e7, 0.2),
 verticalOrigin : Cesium.VerticalOrigin.TOP,
}
});
//viewer.entities.add(Israel_flag);
//印尼
var Indonesiaa_flag = new Cesium.Entity({ 
 name: '印度尼西亚',
//先经度后纬度
position : Cesium.Cartesian3.fromDegrees(102.37,-1.58,300000),
description : '<div style="background-color:#696969;font-family:Arial;color:#FFFFF0;font-size:20px;text-align:center;">亲   美、亲   日</div>',

billboard : {
 image : '/public/img/flag3/usa.png',
 scale:0.3,
 scaleByDistance: new Cesium.NearFarScalar(1.5e2, 1.0, 1.5e7, 0.2),
 verticalOrigin : Cesium.VerticalOrigin.TOP,
}
});
//viewer.entities.add(Indonesia_flag);

//约旦
var Jordan_flag = new Cesium.Entity({ 
 id: '约旦',
//先经度后纬度
position : Cesium.Cartesian3.fromDegrees(36.2384140000,30.5851640000,300000),
description : '<div style="background-color:#696969;font-family:Arial;color:#FFFFF0;font-size:20px;text-align:center;">亲   美</div>',

billboard : {
 image : '/public/img/flag3/usa.png',
 scale:0.3,
 scaleByDistance: new Cesium.NearFarScalar(1.5e2, 1.0, 1.5e7, 0.2),
 verticalOrigin : Cesium.VerticalOrigin.TOP,
}
});
//viewer.entities.add(Jordan_flag);

//新加坡
var Singaporeaa_flag = new Cesium.Entity({ 
 name: '新加坡',
//先经度后纬度
position : Cesium.Cartesian3.fromDegrees(104.85,1.48,300000),
description : '<div style="background-color:#696969;font-family:Arial;color:#FFFFF0;font-size:20px;text-align:center;">亲   美、亲   欧</div>',

billboard : {
 image : '/public/img/flag3/usa.png',
 scale:0.3,
 scaleByDistance: new Cesium.NearFarScalar(1.5e2, 1.0, 1.5e7, 0.2),
 verticalOrigin : Cesium.VerticalOrigin.TOP,
}
});
//viewer.entities.add(Singapore_flag);

//格鲁吉亚
var Georgiaa_flag = new Cesium.Entity({ 
 name: '格鲁吉亚',
//先经度后纬度
position : Cesium.Cartesian3.fromDegrees(42.52,42.94,300000),
description : '<div style="background-color:#696969;font-family:Arial;color:#FFFFF0;font-size:20px;text-align:center;">亲   美、亲   欧</div>',

billboard : {
 image : '/public/img/flag3/usa.png',
 scale:0.3,
 scaleByDistance: new Cesium.NearFarScalar(1.5e2, 1.0, 1.5e7, 0.2),
 verticalOrigin : Cesium.VerticalOrigin.TOP,
}
});
//viewer.entities.add(Georgia_flag);
//沙特
var SaudiArabiaa_flag = new Cesium.Entity({ 
 name: '沙特阿拉伯',
//先经度后纬度
position : Cesium.Cartesian3.fromDegrees(47.09,21.25,300000),
description : '<div style="background-color:#696969;font-family:Arial;color:#FFFFF0;font-size:20px;text-align:center;">亲   美、亲   欧</div>',

billboard : {
 image : '/public/img/flag3/usa.png',
 scale:0.3,
 scaleByDistance: new Cesium.NearFarScalar(1.5e2, 1.0, 1.5e7, 0.2),
 verticalOrigin : Cesium.VerticalOrigin.TOP,
}
});
//viewer.entities.add(SaudiArabia_flag);
//巴林
var Bahrainaa_flag = new Cesium.Entity({ 
 name: '巴林',
//先经度后纬度
position : Cesium.Cartesian3.fromDegrees(50.61,26.67,300000),
description : '<div style="background-color:#696969;font-family:Arial;color:#FFFFF0;font-size:20px;text-align:center;">亲   美、亲   欧</div>',

billboard : {
 image : '/public/img/flag3/usa.png',
 scale:0.3,
 scaleByDistance: new Cesium.NearFarScalar(1.5e2, 1.0, 1.5e7, 0.2),
 verticalOrigin : Cesium.VerticalOrigin.TOP,
}
});
//viewer.entities.add(Bahrain_flag);
//伊拉克
var Iraqaa_flag = new Cesium.Entity({ 
 name: '伊拉克',
//先经度后纬度
position : Cesium.Cartesian3.fromDegrees(43.09,35.06,300000),
description : '<div style="background-color:#696969;font-family:Arial;color:#FFFFF0;font-size:20px;text-align:center;">亲   美、亲   欧</div>',

billboard : {
 image : '/public/img/flag3/usa.png',
 scale:0.3,
 scaleByDistance: new Cesium.NearFarScalar(1.5e2, 1.0, 1.5e7, 0.2),
 verticalOrigin : Cesium.VerticalOrigin.TOP,
}
});
var Pakistanaa_flag = new Cesium.Entity({ 
 name: '巴基斯坦',
//先经度后纬度
position : Cesium.Cartesian3.fromDegrees(66.14,27.37,300000),
description : '<div style="background-color:#696969;font-family:Arial;color:#FFFFF0;font-size:20px;text-align:center;">亲美、亲华</div>',

billboard : {
 image : '/public/img/flag3/usa.png',
 scale:0.3,
 scaleByDistance: new Cesium.NearFarScalar(1.5e2, 1.0, 1.5e7, 0.2),
 verticalOrigin : Cesium.VerticalOrigin.TOP,
}
});
//viewer.entities.add(Pakistan_flag);

var Afghanistanaa_flag = new Cesium.Entity({ 
 name: '阿富汗',
//先经度后纬度
position : Cesium.Cartesian3.fromDegrees(63.71,32.05,300000),
description : '<div style="background-color:#696969;font-family:Arial;color:#FFFFF0;font-size:20px;text-align:center;">亲美、亲华</div>',

billboard : {
 image : '/public/img/flag3/usa.png',
 scale:0.3,
 scaleByDistance: new Cesium.NearFarScalar(1.5e2, 1.0, 1.5e7, 0.2),
 verticalOrigin : Cesium.VerticalOrigin.TOP,
}
});
//以下是对俄友好，再加上白俄、吉尔吉斯斯坦、蒙古、塔吉克、土库曼、乌兹别克、伊朗、中国、印度
//叙利亚
var Syria_flag = new Cesium.Entity({ 
 id: '叙利亚',
//先经度后纬度
position : Cesium.Cartesian3.fromDegrees(38.9968150000,34.8020750000,300000),
description : '<div style="background-color:#696969;font-family:Arial;color:#FFFFF0;font-size:20px;text-align:center;">亲   俄</div>',

billboard : {
 image : '/public/img/flag3/russia.png',
 scale:0.3,
 scaleByDistance: new Cesium.NearFarScalar(1.5e2, 1.0, 1.5e7, 0.2),
 verticalOrigin : Cesium.VerticalOrigin.TOP,
}
});
//白俄
var Belarusbb_flag = new Cesium.Entity({ 
 name: '白俄罗斯',
//先经度后纬度
position : Cesium.Cartesian3.fromDegrees(30.00,52.41,300000),
description : '<div style="background-color:#696969;font-family:Arial;color:#FFFFF0;font-size:20px;text-align:center;">亲俄、亲华</div>',

billboard : {
 image : '/public/img/flag3/russia.png',
 scale:0.3,
 scaleByDistance: new Cesium.NearFarScalar(1.5e2, 1.0, 1.5e7, 0.2),
 verticalOrigin : Cesium.VerticalOrigin.TOP,
}
});
//viewer.entities.add(Belarus_flag);

//吉尔吉斯斯坦
var Kyrgyzsbb_flag = new Cesium.Entity({ 
 name: '吉尔吉斯斯坦',
//先经度后纬度
position : Cesium.Cartesian3.fromDegrees(71.44,41.91,300000),
description : '<div style="background-color:#696969;font-family:Arial;color:#FFFFF0;font-size:20px;text-align:center;">亲华、亲俄、亲日</div>',

billboard : {
 image : '/public/img/flag3/russia.png',
 scale:0.3,
 scaleByDistance: new Cesium.NearFarScalar(1.5e2, 1.0, 1.5e7, 0.2),
 verticalOrigin : Cesium.VerticalOrigin.TOP,
}
});
var Mongobb_flag = new Cesium.Entity({ 
 name: '蒙古',
//先经度后纬度
position : Cesium.Cartesian3.fromDegrees(93.26,48.23,300000),
description : '<div style="background-color:#696969;font-family:Arial;color:#FFFFF0;font-size:20px;text-align:center;">亲华、亲俄、亲日</div>',

billboard : {
 image : '/public/img/flag3/russia.png',
 scale:0.3,
 scaleByDistance: new Cesium.NearFarScalar(1.5e2, 1.0, 1.5e7, 0.2),
 verticalOrigin : Cesium.VerticalOrigin.TOP,
}
});

//土库曼斯坦
var Turkmenistbb_flag = new Cesium.Entity({ 
 name: '土库曼斯坦',
//先经度后纬度
position : Cesium.Cartesian3.fromDegrees(58.79,38.19,300000),
description : '<div style="background-color:#696969;font-family:Arial;color:#FFFFF0;font-size:20px;text-align:center;">亲华、亲俄、亲日</div>',

billboard : {
 image : '/public/img/flag3/russia.png',
 scale:0.3,
 scaleByDistance: new Cesium.NearFarScalar(1.5e2, 1.0, 1.5e7, 0.2),
 verticalOrigin : Cesium.VerticalOrigin.TOP,
}
});
//viewer.entities.add(Turkmenistan_flag);

//乌兹别克斯坦
var Uzbekistanbb_flag = new Cesium.Entity({ 
 name: '乌兹别克斯坦',
//先经度后纬度
position : Cesium.Cartesian3.fromDegrees(60.28,43.67,300000),
description : '<div style="background-color:#696969;font-family:Arial;color:#FFFFF0;font-size:20px;text-align:center;">亲华、亲俄</div>',

billboard : {
 image : '/public/img/flag3/russia.png',
 scale:0.3,
 scaleByDistance: new Cesium.NearFarScalar(1.5e2, 1.0, 1.5e7, 0.2),
 verticalOrigin : Cesium.VerticalOrigin.TOP,
}
});
//viewer.entities.add(Uzbekistan_flag);

//伊朗
var Iranbb_flag = new Cesium.Entity({ 
 name: '伊朗',
//先经度后纬度
position : Cesium.Cartesian3.fromDegrees(58.10,27.76,300000),
description : '<div style="background-color:#696969;font-family:Arial;color:#FFFFF0;font-size:20px;text-align:center;">亲华、亲俄</div>',

billboard : {
 image : '/public/img/flag3/russia.png',
 scale:0.3,
 scaleByDistance: new Cesium.NearFarScalar(1.5e2, 1.0, 1.5e7, 0.2),
 verticalOrigin : Cesium.VerticalOrigin.TOP,
}
});
var india_flag = new Cesium.Entity({ 
 name: '印度',
//先经度后纬度
position : Cesium.Cartesian3.fromDegrees(80.32,23.31,300000),
description : '<div style="background-color:#696969;font-family:Arial;color:#FFFFF0;font-size:20px;text-align:center;"> 亲俄</div>',

billboard : {
 image : '/public/img/flag3/russia.png',
 scale:0.3,
 scaleByDistance: new Cesium.NearFarScalar(1.5e2, 1.0, 1.5e7, 0.2),
 verticalOrigin : Cesium.VerticalOrigin.TOP,
}
});
var china_flag = new Cesium.Entity({ 
 name: '中国',
//先经度后纬度
position : Cesium.Cartesian3.fromDegrees(105.21,36.18,300000),
description : '<div style="background-color:#696969;font-family:Arial;color:#FFFFF0;font-size:20px;text-align:center;"> 亲俄</div>',

billboard : {
 image : '/public/img/flag3/russia.png',
 scale:0.3,
 scaleByDistance: new Cesium.NearFarScalar(1.5e2, 1.0, 1.5e7, 0.2),
 verticalOrigin : Cesium.VerticalOrigin.TOP,
}
});
var Tajikistanaa_flag = new Cesium.Entity({ 
 name: '塔吉克斯坦  ',
//先经度后纬度
position : Cesium.Cartesian3.fromDegrees(56.31,39.76,300000),
description : '<div style="background-color:#696969;font-family:Arial;color:#FFFFF0;font-size:20px;text-align:center;">亲华、亲俄</div>',

billboard : {
 image : '/public/img/flag3/russia.png',
 scale:0.3,
 scaleByDistance: new Cesium.NearFarScalar(1.5e2, 1.0, 1.5e7, 0.2),
 verticalOrigin : Cesium.VerticalOrigin.TOP,
}
});

 //动画路线节点城市
 /*var city_name=['德黑兰','伊斯坦布尔','西安','莫斯科','乌鲁木齐','霍尔果斯','撒马尔罕','杜尚别','威尼斯','比什凯克','阿拉木图','兰州','鹿特丹','杜伊斯堡',
                '连云港','北京','阿斯坦纳','巴黎','布达佩斯','西安','郑州','悉尼','马尼拉','雅典','内罗毕','泉州','广州','湛江','海口','北海','河内','吉隆坡',
                '雅加达','科伦坡','加尔各答','长春','吉林'];*/
                var beijing_point = new Cesium.Entity({ 
                 name: '北京',
//先经度后纬度
position : Cesium.Cartesian3.fromDegrees(116.4019081027881,39.91078079912655),


billboard : {
 image : '/public/img/trackMid01.png',
 scale:1.3,
 scaleByDistance: new Cesium.NearFarScalar(1.5e2, 1.0, 1.5e7, 0.2),
 verticalOrigin : Cesium.VerticalOrigin.CENTER,
}
});
                var quanzhou  = new Cesium.Entity({ 
                 name: '泉州',
//先经度后纬度
position : Cesium.Cartesian3.fromDegrees(118.6758426161456,24.85613674615557),


billboard : {
 image : '/public/img/trackMid01.png',
 scale:1.3,
 scaleByDistance: new Cesium.NearFarScalar(1.5e2, 1.0, 1.5e7, 0.2),
 verticalOrigin : Cesium.VerticalOrigin.CENTER,
}
});
                var lianyun  = new Cesium.Entity({ 
                 name: '连云港',
//先经度后纬度
position : Cesium.Cartesian3.fromDegrees(119.2161308451903,34.58746950802766),


billboard : {
 image : '/public/img/trackMid01.png',
 scale:1.3,
 scaleByDistance: new Cesium.NearFarScalar(1.5e2, 1.0, 1.5e7, 0.2),
 verticalOrigin : Cesium.VerticalOrigin.CENTER,
}
});
                var changchun = new Cesium.Entity({ 
                 name: '长春',
//先经度后纬度
position : Cesium.Cartesian3.fromDegrees(125.19,43.54),


billboard : {
 image : '/public/img/trackMid01.png',
 scale:1.3,
 scaleByDistance: new Cesium.NearFarScalar(1.5e2, 1.0, 1.5e7, 0.2),
 verticalOrigin : Cesium.VerticalOrigin.CENTER,
}
});





//视频监控
//此视频表示视频监控中的监控5和监控6
(function controlvideo(){
  var point =new Array(3);
  var lat=[121.460848,121.463458,121.455477];
  var lon=[31.030939,31.041072,31.0342];
  creatpalcemark();
  var position=[];
  position[0]= new Cesium.Cartesian3.fromDegrees(121.460848,31.030939,350);
  position[1]= new Cesium.Cartesian3.fromDegrees(121.463458,31.041072,350);
    //creatvideo();
    function creatpalcemark(){
      var i;
      for(i=4;i<6;i++){
        (function(j){
                        //$(".cesium-infoBox-iframe ").css({position:"absolute",top:"26px",left:"-20px", width:"100%"});
                        //$(".cesium-infoBox-description").css("margin-right","0px");
                        var t=j-4;
                        point[t]=new Cesium.Entity({

                          name:'监控视频'+(j+1),
                          position: Cesium.Cartesian3.fromDegrees(lat[t],lon[t],10),
                          description: '<div >\
                          <video autoplay loop controls width="400" height="360" >\
                          <source src="/public/img/webcam_sample.webm" type="video/webm">\
                          </source>\
                          </div>\
                          </video>',
                          billboard:{
                            image:'/public/img/mycamera.png',
                            scale:0.2,
                            scaleByDistance: new Cesium.NearFarScalar(0, 0.2, 1.5e7, 0.1),
                            verticalOrigin : Cesium.VerticalOrigin.CENTER,
                          }
                        });
                        $(".video").eq(t).click(function(){//复选框点击
                          if($(this).prop('checked')==true){
                            viewer.camera.flyTo({
                              destination:position[t]
                            });
                            viewer.entities.add(point[t]);
                          }
                          else{
                            viewer.entities.remove(point[t]);
                                //viewer.homeButton.viewModel.command();//回到主视图
                              }
                            });
                        $(".control>a").eq(t).click(function(){//列表点击
                          if($(this).parent().children()[0].checked==false){
                            $(this).parent().children()[0].checked=true;

                            viewer.camera.flyTo({
                              destination:position[t]
                            });

                            viewer.entities.add(point[t]);
                          } 
                          else{
                            $(this).parent().children()[0].checked=false;
                            viewer.entities.remove(point[t]);
                                //viewer.homeButton.viewModel.command();
                              }
                            });
                      })(i);             
                    }


                  }



                })();  

//功能选项
(function(){

  var ellipsoid = scene.globe.ellipsoid;
    myWidget=new mapWidget(viewer,scene,ellipsoid,"pc");//此类在MyWidget文件中声明
    myWidget.showScalebar();
    myWidget.doCompass();
    myWidget.doNavi();
    var Graticule = myWidget.drawGraticule(); 
    myWidget.movePick();
    // $(".navigation-controls").show();
    // $(".compass").show();
    // $(".scalebar").show();
    // $(".cesium-toolbar2").show();

    var layers = viewer.scene.imageryLayers;
    var cn=new Cesium.WebMapTileServiceImageryProvider({
      url :'http://t0.tianditu.com/cia_w/wmts',
      layer : 'cia',
      style : 'default',
      format : 'tiles',
      tileMatrixSetID : 'w'
    });
    var en=new Cesium.WebMapTileServiceImageryProvider({
      url :'http://t0.tianditu.com/eia_w/wmts',
      layer : 'eia',
      style : 'default',
      format : 'tiles',
      tileMatrixSetID : 'w'     
    });                    
    var imageLabelCn =  new Cesium.ImageryLayer(cn);
    var imageLabelEn =  new Cesium.ImageryLayer(en);
    layers.add(imageLabelCn); //默认是中文注记
    var imageTdtGlc =  new Cesium.ImageryLayer(new Cesium.WebMapTileServiceImageryProvider({
      url :'http://glcdata.tianditu.com/glc_w/wmts',
      layer : 'glc',
      style : 'default',
      format : 'tiles',
      tileMatrixSetID : 'w'
    }));
    imageTdtGlc.alpha = 0.8;

    var conta=$(".funselect");
    var contb=$("#funselection>li>a");

    for(var i=0;i<7;i++){
      (function(j){
        conta.eq(j).click(function(){
          switch(j){
            case 0:
            if($(this).prop('checked')==true){
              $(".navigation-controls").show();
              $(".compass").show();
            } 
            else{
              $(".navigation-controls").hide();
              $(".compass").hide();
            }

            break;
            case 3:
            if($(this).prop('checked')==true){
              $(".scalebar").show();
            } 
            else{
              $(".scalebar").hide();

            }
            break;
            case 1:
            if($(this).prop('checked')==true){
              Graticule.setVisible(true);
            } 
            else{
              Graticule.setVisible(false);
            }
            break;
            case 2:
            if($(this).prop('checked')==true){
              $(".cesium-toolbar2").show();

            } 
            else{
              $(".cesium-toolbar2").hide();

            }
            break;
            case 4:
            if($(this).prop('checked')==true){ 
              layers.add(imageLabelCn);
            }
            else{
              layers.remove(imageLabelCn,false);
            }
            break;
            case 5:
            if($(this).prop('checked')==true){
              layers.add(imageLabelEn);

            }
            else{
              layers.remove(imageLabelEn,false);
            }
            break;
            case 6:
            if($(this).prop('checked')==true){
              document.getElementById('legendbox').src = "/public/img/global30.png";
              document.getElementById('mylegend').style.display = 'block';
              layers.add(imageTdtGlc);

            }
            else{
              layers.remove(imageTdtGlc,false);
              document.getElementById('mylegend').style.display = 'none';
            }
            break;
          }
        });
        contb.eq(j).click(function(){
          switch(j){
            case 0:
            if($(this).parent().children()[0].checked==false){
              $(this).parent().children()[0].checked=true;
              $(".navigation-controls").show();
              $(".compass").show();
            } 
            else{
              $(this).parent().children()[0].checked=false;
              $(".navigation-controls").hide();
              $(".compass").hide();
            }
            break;
            case 3:
            if($(this).parent().children()[0].checked==false){
              $(this).parent().children()[0].checked=true;
              $(".scalebar").show();

            } 
            else{
              $(this).parent().children()[0].checked=false;
              $(".scalebar").hide();

            }
            break;
            case 1:
            if($(this).parent().children()[0].checked==false){
              $(this).parent().children()[0].checked=true;
              Graticule.setVisible(true);

            } 
            else{
              $(this).parent().children()[0].checked=false;
              Graticule.setVisible(false);

            }
            break;
            case 2:
            if($(this).parent().children()[0].checked==false){
              $(this).parent().children()[0].checked=true;
              $(".cesium-toolbar2").show();

            } 
            else{
              $(this).parent().children()[0].checked=false;
              $(".cesium-toolbar2").hide();

            }
            break;
            case 4:
            if($(this).parent().children()[0].checked==false){
              $(this).parent().children()[0].checked=true;
              layers.add(imageLabelCn);

            } 
            else{
              $(this).parent().children()[0].checked=false;
              layers.remove(imageLabelCn,false);

            }
            break;
            case 5:
            if($(this).parent().children()[0].checked==false){
              $(this).parent().children()[0].checked=true;
              layers.add(imageLabelEn);

            } 
            else{
              $(this).parent().children()[0].checked=false;
              layers.remove(imageLabelEn,false);

            }
            break;
            case 6:
            if($(this).parent().children()[0].checked==false){
              $(this).parent().children()[0].checked=true;
              document.getElementById('legendbox').src = "/public/img/global30.png";
              document.getElementById('mylegend').style.display = 'block';
              layers.add(imageTdtGlc);

            } 
            else{
              $(this).parent().children()[0].checked=false;
              document.getElementById('mylegend').style.display = 'none';
              layers.remove(imageTdtGlc,false);

            }
            break;
          }

        });
      })(i);
    }  
    
  })(); 



//中资项目（视频）


//将中资项目中所做的视频加到视频监控中，以下所有注释“中资”可以替换为“视频监控”   
//创建导航菜单
function menu(){
        var sdiv=$("<div></div>");//jquery创建元素
        sdiv.attr({"class":"webwidget_vertical_menu","id":"webwidget_vertical_menu"});
        sdiv.hide();
        $("#cesiumContainer").append(sdiv);
        sdiv.css({position:"absolute",left:"18%",top:"15%"});
        //在js中写html代码
        var shtml= ''+
        '<ul>'+
        '<li><a href="#">展示方式</a>'+
        '<ul>'+
        '<li><a class="displayform" href="#">平铺</a></li>'+
        '<li><a class="displayform" href="#">竖立</a></li>'+
        '<li><a class="displayform" href="#">球状</a></li>'+
        '<li><a class="displayform" href="#">立体</a></li>'+
        '</ul>'+
        '</li>'+
        '<li><a href="#">播放控制</a>'+
        '<ul>'+
        '<li><a class="playcontrol" href="#">播放</a></li> '+
        '<li><a class="playcontrol" href="#">暂停</a></li> '+

        '</ul>'+
        '</li>'+              
        '</ul>'+
        '<div style="clear: both"></div>';
        sdiv.append(shtml);
        $("#webwidget_vertical_menu").webwidget_vertical_menu({
          menu_width: '160',
          menu_height: '25',
          menu_margin: '2',
          menu_text_size: '12',
          menu_text_color: '#CCC',
          menu_background_color: '#666',
          menu_border_size: '2',
          menu_border_color: '#000',
          menu_border_style: 'solid',
          menu_background_hover_color: '#999',
          directory: 'img'
        });
      } 
    //js创建元素
   /* var video = document.createElement('video');
    video.preload = 'auto';
    video.loop = 'loop';
    video.controls = 'controls';
    video.crossorigin = 'crossorigin';
    video.setAttribute("id","trailer");
    video.innerHTML='\
        <source src="http://cesiumjs.org/videos/Sandcastle/big-buck-bunny_trailer.webm" type="video/webm">\
        <source src="http://cesiumjs.org/videos/Sandcastle/big-buck-bunny_trailer.mp4" type="video/mp4">\
        <source src="http://cesiumjs.org/videos/Sandcastle/big-buck-bunny_trailer.mov" type="video/quicktime">\
        Your browser does not support the <code>video</code> element.\
        ';    

        $("body").append(video);*/

        function Makeentity(){
          var entityposition=[[121.441357,31.037057,15],[121.446438,31.025668,15],[121.455978,31.028300,15],[121.451396,31.040331,15]];
        var posone=new Array(4);//将各出实体的位置定义在一个数组中
        posone[0]=new Cesium.Cartesian3.fromDegrees(121.441357,31.037057,350);
        posone[1]=new Cesium.Cartesian3.fromDegrees(121.446438,31.025668,350);
        posone[2]=new Cesium.Cartesian3.fromDegrees(121.455978,31.028300,350);
        posone[3]=new Cesium.Cartesian3.fromDegrees(121.451396,31.040331,350);
        //var posone=new Cesium.Cartesian3.fromDegreesArrayHeights(pos0);          
        //vico1.position=posone;
        var coord=new Array(4); //将各处矩形的坐标定义在一个数组中       
        coord[0]=new Cesium.Rectangle.fromDegrees(121.441117, 31.036927, 121.441597, 31.037187);
        coord[1]=new Cesium.Rectangle.fromDegrees(121.446198, 31.025538, 121.446678, 31.025798);
        coord[2]=new Cesium.Rectangle.fromDegrees(121.455738, 31.028170, 121.456218, 31.028430);
        coord[3]=new Cesium.Rectangle.fromDegrees(121.451156, 31.040201, 121.451636, 31.040461);
        var coorw=new Array(4);//将各处wall的坐标定义在一个数组中
        coorw[0]=new Cesium.Cartesian3.fromDegreesArrayHeights([121.441117,31.037187,20,121.441597,31.037187,20]);
        coorw[1]=new Cesium.Cartesian3.fromDegreesArrayHeights([121.446198,31.025798,20,121.446678,31.025798,20]);
        coorw[2]=new Cesium.Cartesian3.fromDegreesArrayHeights([121.455738,31.028430,20,121.456218,31.028430,20]);
        coorw[3]=new Cesium.Cartesian3.fromDegreesArrayHeights([121.451156,31.040461,20,121.451636,31.040461,20]);
        var coore=new Array(4);//将各处ellipsoid的坐标定义在一个数组中
        coore[0]=new Cesium.Cartesian3.fromDegrees(121.441357,31.037057,15);
        coore[1]=new Cesium.Cartesian3.fromDegrees(121.446438,31.025668,15);
        coore[2]=new Cesium.Cartesian3.fromDegrees(121.455978,31.028300,15);
        coore[3]=new Cesium.Cartesian3.fromDegrees(121.451396,31.040331,15);
        var coorb=new Array(4);//将各处box的坐标定义在一个数组中
        coorb[0]=new Cesium.Cartesian3.fromDegrees(121.441357,31.037057,30);
        coorb[1]=new Cesium.Cartesian3.fromDegrees(121.446438,31.025668,30);
        coorb[2]=new Cesium.Cartesian3.fromDegrees(121.455978,31.028300,30);
        coorb[3]=new Cesium.Cartesian3.fromDegrees(121.451396,31.040331,30);
        var a1= new Cesium.Entity({
         rectangle: {}
       });
        //竖立(wall) 
        var b1 =new Cesium.Entity({
          wall : {}
        });
        //球体
        var c1=new Cesium.Entity({
          ellipsoid:{}
        });
        //方体
        var d1=new Cesium.Entity({
          box:{}
        });
        var a2= new Cesium.Entity({
         rectangle: {}
       });
        var b2 =new Cesium.Entity({
          wall : {}
        });
        var c2=new Cesium.Entity({
          ellipsoid:{}
        });
        var d2=new Cesium.Entity({
          box:{}
        });
        var d1=new Cesium.Entity({
          box:{}
        });
        var a3= new Cesium.Entity({
         rectangle: {}
       });
        var b3 =new Cesium.Entity({
          wall : {}
        });
        var c3=new Cesium.Entity({
          ellipsoid:{}
        });
        var d3=new Cesium.Entity({
          box:{}
        });
        var d1=new Cesium.Entity({
          box:{}
        });
        var a4= new Cesium.Entity({
         rectangle: {}
       });
        var b4 =new Cesium.Entity({
          wall : {}
        });
        var c4=new Cesium.Entity({
          ellipsoid:{}
        });
        var d4=new Cesium.Entity({
          box:{}
        });
        var arr1=[a1,b1,c1,d1];var arr2=[a2,b2,c2,d2];var arr3=[a3,b3,c3,d3];var arr4=[a4,b4,c4,d4];
        var entityarray=[arr1,arr2,arr3,arr4];
        this.enarray=function(){
          return entityarray;
        }
        
        this.posone=function(){
          return posone;
        }
        this.coord=function(){
          return coord;
        }
        this.coorw=function(){
          return coorw;
        }
        this.coore=function(){
          return coore;
        }
        this.coorb=function(){
          return coorb;
        }
      }
      menu(); 
      var entitymade= new Makeentity();
      var posone=entitymade.posone();
      var coord=entitymade.coord();
      var coorw=entitymade.coorw();
      var coore=entitymade.coore();
      var coorb=entitymade.coorb();
      var vicos=entitymade.enarray();
      var displayform=$(".displayform");
    var judge=[0,0,0,0];//设置判断指针，用来传递给播放菜单判断哪一类项目被触发
    
    function entityadd(n){

     //加载不同展示方式实体时，将其表示为函数参数n，参数值0、1、2、3分别表示为平铺，竖立，球状，立体
     for(var s=0;s<4;s++){
            if(judge[s]==true){//注意，一定要用==，不然就是错的，=表示将其赋值为true
              viewer.entities.add(vicos[s][n]);
            }
          }
        }

  //函数entityrem： 当点击菜单种某一种展示方式（如球体）时，先判断有多少类型的项目的judge为true，然后将所有为true的项目进行遍历，
  //在这些项目中，当前不被加载的展示方式它们对应的实体删除
  function entityrem(n){
    for(var s=0;s<4;s++){
      if(judge[s]==true){
        viewer.entities.remove(vicos[s][n]);
      }
    }
  }
  //函数enfalserem，删除所有值为false的项目中所有的实体
  function enfalserem(){
    for(var s=0;s<4;s++){
      if(judge[s]==false){
        for(var b=0;b<4;b++){
          viewer.entities.remove(vicos[s][b]);
        }
      }
    }
  }
    //视频播放控制，即播放/暂停
    function menucontrol(){ 
        //var videoElement = document.getElementById('trailer');
        //videoElement.style.display="none";
        var videoElement=$(".trailer");
        videoElement.css("display","none");
        //建立各项目的字符串数组，每个元素代表各自的播放路径        
        var itempath= new Array(4);
        itempath[0]='/data/webcam_sample.webm';
        itempath[1]='/data/webcam_sample.webm';
        itempath[2]='/data/webcam_sample.webm';
        itempath[3]='/data/webcam_sample.webm';        
        videoElement[0].src=itempath[0]; 
        videoElement[1].src=itempath[1]; 
        videoElement[2].src=itempath[2]; 
        videoElement[3].src=itempath[3]; 
        
        //控制视频播放/暂停,通过建立对象的方法来实现
        var playcon=[{},{},{},{}];
        var playneedle;
        for(var i=0;i<4;i++){
          (function(j){  
            playcon[j].on=function(){
              videoElement[j].play();
              playneedle=true;
            }
            playcon[j].off=function(){
              videoElement[j].pause();
              playneedle=false;
            }
          })(i);

        }
        for(var i=0;i<4;i++){
          playcon[i].off(); 
        //为不同的项目赋予不同的视频类型
        vicos[i][0].rectangle.material=videoElement[i];
        vicos[i][1].wall.material=videoElement[i];
        vicos[i][2].ellipsoid.material=videoElement[i];
        vicos[i][3].box.material=videoElement[i];
      } 
        //写播放控制的函数  
        function playcontrol(){

          $(".playcontrol").eq(0).click(function(){
            if(!playneedle){
              for(var i=0;i<4;i++){
                playcon[i].on(); 
              } 
            }            
          });
          $(".playcontrol").eq(1).click(function(){
            if(playneedle){
              for(var i=0;i<4;i++){
                playcon[i].off(); 
              } 
            }            
          });
        } 
        playcontrol(); 
        return playcon;
      }


      function enattr(){
        for(var m=0;m<4;m++){
          for(var n=0;n<4;n++){
            vicos[m][n].name='视频监控'+(m+1);
          }
        }
        for(var j=0;j<4;j++){

          vicos[j][0].position= posone[j];
          vicos[j][0].rectangle.rotation=Cesium.Math.toRadians(18.0);
          vicos[j][0].rectangle.coordinates=coord[j];
          vicos[j][1].wall.positions=coorw[j];
          vicos[j][2].position=coore[j];
          vicos[j][3].position= coorb[j];
            vicos[j][2].ellipsoid.radii=new Cesium.Cartesian3(15,15,15);//定义圆球的半径；
            vicos[j][3].box.dimensions=new Cesium.Cartesian3(25,25,20);//定义方体长宽高
          }
        }
        function start(){ 
          enattr();              
          var playcon=menucontrol();
          var project=$(".videot");
          var proj=$(".control2>a");   
          for(var i=0;i<4;i++){
            (function(j){
              project.eq(j).click(function(){

                if($(this).prop('checked')==true){
                         //函数entityadd： 当点击菜单种某一种展示方式（如球体）时，先判断有多少类型的项目的judge为true，然后将所有为true的项目加载球体

                        judge[j]=1;//表示该类型项目被触发
                        playcon[j].on();
                        for(var t=0;t<4;t++){          
                          (function(k){
                            displayform.eq(k).click(function(){
                              switch(k){
                                case 0:
                                entityadd(0);
                                            entityrem(1);//删除值为true的项目中当前不展示的实体1/2/3
                                            entityrem(2);
                                            entityrem(3);
                                            enfalserem();//删除所有值为false的项目中所有的实体
                                            break;
                                            case 1:
                                            entityadd(1);
                                            entityrem(0);
                                            entityrem(2); 
                                            entityrem(3);
                                            enfalserem();
                                            break;
                                            case 2:
                                            entityadd(2);
                                            entityrem(0);
                                            entityrem(1); 
                                            entityrem(3);
                                            enfalserem();
                                            break;
                                            case 3:
                                            entityadd(3);
                                            entityrem(1);
                                            entityrem(2); 
                                            entityrem(0);
                                            enfalserem();
                                            break;

                                          }
                                        });    
                          })(t);
                        }   
                        $("#webwidget_vertical_menu").show();
                        viewer.entities.add(vicos[j][0]);
                        viewer.camera.flyTo({
                          destination : posone[j],
                          oientation:{
                            heading : Cesium.Math.toRadians(0.0),
                            pitch : Cesium.Math.toRadians(10.0),
                            roll : Cesium.Math.toRadians(0.0)
                          }
                        });
                      }
                      else{
                        judge[j]=0; 
                        enfalserem();
                        (function(){
                          var rearray=[];
                          var projectarr=[];
                          projectarr[j]=project;
                          var reco=[];
                            var projectarray=jQuery.makeArray(projectarr[j]);//强制转化成可以操作的数组，因为projectarr[j]实际上是一个类数组结构
                            projectarray.splice(j,1);
                            var reco=projectarray;
                            var relen=reco.length;
                            for(var i=0;i<relen;i++){
                              if (reco[i].checked==true){
                                rearray.push(reco[i]);
                              }
                            }
                            if(!rearray.length){$("#webwidget_vertical_menu").hide();}
                            else{$("#webwidget_vertical_menu").show();}
                          })();
                        }
                      });

              proj.eq(j).click(function(){
                if($(this).parent().children()[0].checked==false){
                  $(this).parent().children()[0].checked=true;
                  playcon[j].on();
                  judge[j]=1;
                  for(var t=0;t<4;t++){          
                    (function(k){
                      displayform.eq(k).click(function(){
                        switch(k){
                          case 0:
                          entityadd(0);
                                            entityrem(1);//删除值为true的项目中当前不展示的实体1/2/3
                                            entityrem(2);
                                            entityrem(3);
                                            enfalserem();//删除所有值为false的项目中所有的实体
                                            break;
                                            case 1:
                                            entityadd(1);
                                            entityrem(0);
                                            entityrem(2); 
                                            entityrem(3);
                                            enfalserem();
                                            break;
                                            case 2:
                                            entityadd(2);
                                            entityrem(0);
                                            entityrem(1); 
                                            entityrem(3);
                                            enfalserem();
                                            break;
                                            case 3:
                                            entityadd(3);
                                            entityrem(1);
                                            entityrem(2); 
                                            entityrem(0);
                                            enfalserem();
                                            break;

                                          }
                                        });    
                    })(t);
                  }   
                  $("#webwidget_vertical_menu").show();
                  viewer.entities.add(vicos[j][0]);
                  viewer.camera.flyTo({
                    destination : posone[j],
                    oientation:{
                      heading : Cesium.Math.toRadians(0.0),
                      pitch : Cesium.Math.toRadians(10.0),
                      roll : Cesium.Math.toRadians(0.0)}
                    });
                }
                else{
                  $(this).parent().children()[0].checked=false;
                  judge[j]=0; 
                  enfalserem();
                  (function(){
                    var rearray=[];
                    var projectarr=[];
                    projectarr[j]=project;
                    var reco=[];
                            var projectarray=jQuery.makeArray(projectarr[j]);//强制转化成可以操作的数组，因为projectarr[j]实际上是一个类数组结构
                            projectarray.splice(j,1);
                            var reco=projectarray;
                            var relen=reco.length;
                            for(var i=0;i<relen;i++){
                              if (reco[i].checked==true){
                                rearray.push(reco[i]);
                              }
                            }
                            if(!rearray.length){$("#webwidget_vertical_menu").hide();}
                            else{$("#webwidget_vertical_menu").show();}
                          })();
                        }
                      });
            })(i);    
          }

        }

        start(); 


    //重要板块
    //点击相应国家，飞到相应区域
    
    $(".imarea>ul>li>a").each(function(){
      var country_name=$(this).html();
      $(this).bind("click",function(){
        for(var i=0;i<name_array.length;i++){
          if(country_name==name_array[i]){
            lng=lng_array[i];
            lat=lat_array[i];
                    //alert("定位成功！马上飞到..."+name_array[i] );
                    viewer.camera.flyTo({
                      destination : Cesium.Cartesian3.fromDegrees(lng, lat, 3000000),
                      orientation :{
                        heading : Cesium.Math.toRadians(0.0),
                        pitch : Cesium.Math.toRadians( -80.0),
                        roll : Cesium.Math.toRadians(0.0)
                        }//定制  以何种角度飞到目标处
                      });
                  }
                  else{
                    continue;
                  }
                }
              });
    });  

    //点击相应的版块,飞到相应的区域,并默认加载对应图层
    (function(){
      var cee=new Cesium.KmlDataSource(); var wai=new Cesium.KmlDataSource();var mai=new Cesium.KmlDataSource();var sai=new Cesium.KmlDataSource();
      var eai=new Cesium.KmlDataSource();var ase=new Cesium.KmlDataSource();var ci=new Cesium.KmlDataSource();
      var imarea=[cee,wai,mai,sai,eai,ase,ci];
        /* var waisa = wai.load('./kml/WestAsia.kml',{});var maisa = mai.load('./kml/CentralAsia.kml',{});
        var saisa = sai.load('./kml/SouthAsia.kml',{});var eaisa = eai.load('./kml/EasternAsia',{});var asean = ase.load('./kml/ASEAN.kml',{});
        var cis = ci.load('./kml/cis.kml',{});*/

        //定义飞到的位置
        var flypo=[];
        flypo[0]=new Cesium.Cartesian3.fromDegrees(24.52344, 45.347852, 5000000);
        flypo[1]=new Cesium.Cartesian3.fromDegrees(46.789378,21.412996, 7000000);
        flypo[2]=new Cesium.Cartesian3.fromDegrees(64.993633, 42.495913, 5000000);
        flypo[3]=new Cesium.Cartesian3.fromDegrees(79.045977, 18.011586, 7000000);
        flypo[4]=new Cesium.Cartesian3.fromDegrees(109.737737, 32.271913, 7000000);
        flypo[5]=new Cesium.Cartesian3.fromDegrees(113.411740, 1.698890, 7000000);
        flypo[6]=new Cesium.Cartesian3.fromDegrees(43.52344, 46.347852, 7000000);
        //定义kml文件的路径
        var kmlpath=[];
        kmlpath[0]='/data/permanent/kml/ceeurope.kml';kmlpath[1]='/data/permanent/kml/WestAsia.kml';kmlpath[2]='/data/permanent/kml/CentralAsia.kml';kmlpath[3]='/data/permanent/kml/SouthAsia.kml';
        kmlpath[4]='/data/permanent/kml/EasternAsia.kml';kmlpath[5]='/data/permanent/kml/ASEAN.kml';kmlpath[6]='/data/permanent/kml/cis.kml';
        

        //定义飞到函数
        function flyto(i){
          viewer.camera.flyTo({
            destination : flypo[i],
            orientation :{
              heading : Cesium.Math.toRadians(0.0),
              pitch : Cesium.Math.toRadians(-85.0),
              roll : Cesium.Math.toRadians(10.0)
                    }//定制  以何种角度飞到目标处
                  });
        }
        
        for(var i=0;i<7;i++){
          (function(j){
            $(".imarea>a").eq(j).click(function(){
              flyto(j);
            }); 
            $(".areashow").eq(j).click(
              function(){
                   if($(this).prop('checked')==true){//注意！在判断checked，disabled这些二元值属性时，只能用prop，它与attr的区别详看书上或者网上
                    var t = imarea[j].load(kmlpath[j]);
                    viewer.dataSources.add(t); 
                  }
                  else{
                    viewer.dataSources.remove(imarea[j]);
                  }
              }); 
          })(i);
        }    
        for(var i=0;i<7;i++){
          (function(j){
           $(".ashow>a").eq(j).click(
            function(){
              if($(this).parent().children().prop("checked")==false){
                $(this).parent().children().prop("checked",true);
                var t = imarea[j].load(kmlpath[j]);
                viewer.dataSources.add(t); 
              }
              else{
                $(this).parent().children()[0].checked=false;
                viewer.dataSources.remove(imarea[j]);
                              }
                            }); 
         })(i);
       }

     })();


 //社会发展  
 (function(){ 

  socialde();      
  function socialde(){
    var ellipsoid = viewer.scene.globe.ellipsoid;
    var polylines = [];
    var colorScale = d3.scale.category20c();//构造一个另外20种颜色的序数比例尺
    var selectedData = "health";
    var selectedNation = 'undefined'
    //$("#radio").buttonset();//选择按钮集中的所有后代
    $("#radio").css("font-size", "12px");
    $("#radio").css("font-size", "12px");
    $("#radio").hide();
    $("input[name='healthwealth']").change(function(d){
        selectedData = d.target.id;//target确定具体哪个元素触发了事件
        updateLineData();
        //$(".close").click(function(){$(".infoframe").show();});
      });
    // - update all polylines by resizing the polyline，当每年的数据产生变化时，都更新线条
    // - show jquery info window
    function updateLineData() {

      var xScale = d3.scale.log().domain([300, 1e5]).range([0, 10000000.0]);
        var yScale = d3.scale.linear().domain([10, 85]).range([0, 10000000.0]);//此处创建比例尺是为了设置线条的高度，这与d3example中设置的不同（那个是为了显示图表）
        var widthScale = d3.scale.sqrt().domain([0, 5e8]).range([5, 30]);

        for (var i=0; i<polylines.length; i++) {
            var nation = sharedObject.yearData[i];//获取第i个国家在某一年的数据
            var polyline = polylines[i];

            if (selectedData === "health") {
              polyline.positions = ellipsoid.cartographicArrayToCartesianArray([
                Cesium.Cartographic.fromDegrees(nation.lon, nation.lat, 0.0),
                Cesium.Cartographic.fromDegrees(nation.lon, nation.lat, yScale(nation.lifeExpectancy))
                ]);
            } else {
              polyline.positions = ellipsoid.cartographicArrayToCartesianArray([
                Cesium.Cartographic.fromDegrees(nation.lon, nation.lat, 0.0),
                Cesium.Cartographic.fromDegrees(nation.lon, nation.lat, xScale(nation.income))
                ]);
            }
            polyline.width = widthScale(nation.population);

            // push data to polyline so that we have mouseover information available
            polyline.nationData = nation;//将nation数据（即年份数据赋值给polyline.nationData）
            if (nation.name === selectedNation) {

              $("#info table").remove();
              $("#info p").remove();
              $("#info").append("<p style=\"background-color:#696969;height:30px;font-size:16px;font-weight:bold;padding-top:5px;margin:0 \">&nbsp;"+Math.round(year)+":&nbsp;"+nation.name+"</p>");
              $("#info").append("<table> \
                <tr><td>预期寿命:</td><td>" +parseFloat(nation.lifeExpectancy).toFixed(1)+"</td><td>（岁）</td></tr>\
                <tr><td>人均财富:</td><td>" +parseFloat(nation.income).toFixed(0)+"</td><td>（美元）</td></tr>\
                <tr><td>人口总数:</td><td>" +parseFloat(nation.population).toFixed(0)+"</td><td>（人）</td></tr>\
                </table>\
                ");
              $("#info").append("<div>\
               <img class=\"close\" src=\"/public/img/close.png\" style=\"width:25px;height:25px;position:absolute;right:5px;top:3px;z-index:10001;cursor:pointer\"></div>");
              $("#info table").css({"font-size":"15px","font-weight":"bold","background":"#808080","margin":"0","padding":"0"});
              $("#info table tr").css({"margin":"0","padding":"0"});
              $("#info").css({"border":"solid 3px #F0F8FF","border-radius":"6px","background-color":"#808080"});
              $(".close").click(function(){$("#info").hide();}); 
               // var x=document.getElementById("close");
                //x.addEventListener("click",function(){document.getElementById('info').style.display = 'none';},false);
              }

            //polyline.material.uniforms.outlineWidth = yScale(nation.lifeExpectancy);
          }

        }
    // called from our custom animate() function whenever the timeline advances 1 year

    var year = 1800;
    function animate() {
    // var gregorianDate = viewer.clock.currentTime.toGregorianDate();
        var currentTime1 = viewer.clock.currentTime; //JulianDate
        var gregorianDate = Cesium.JulianDate.toGregorianDate(currentTime1);//时间格式转换
        var currentYear = gregorianDate.year + gregorianDate.month/12;// + gregorianDate.day/31;
        if (currentYear !== year && typeof window.displayYear !== 'undefined'){//当year与时间轴上的年份currentYear不等时，更新线条
            window.displayYear(currentYear);//更新显示年份，以及年份数据，该函数写在d3example第138行
            year = currentYear;

            updateLineData();
            //$(".close").click(function(){$(".infoframe").show();});
          }

        }

        function tick() {
        viewer.scene.initializeFrame();//初始化框架，useDefaultRenderLoop设置为false
        animate();//根据年份变化更新线条
        viewer.scene.render();//渲染scene,默认情况下是自动渲染的，当useDefaultRenderLoop is set to false时，不自动渲染，
        Cesium.requestAnimationFrame(tick);//反复迭代，以更新时间和线条
      }

     // If the mouse is over the billboard, change its scale and color
    var highlightBarHandler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas);//声明一个屏幕事件处理句柄，参数为待加入事件的元素
    highlightBarHandler.setInputAction(
      function (movement) {
        var pickedObject = viewer.scene.pick(movement.endPosition);
        if (Cesium.defined(pickedObject) && Cesium.defined(pickedObject.primitive)) {
          if (Cesium.defined(pickedObject.primitive.nationData)) {
            sharedObject.dispatch.nationMouseover(pickedObject.primitive.nationData);
          }
        }
      },
      Cesium.ScreenSpaceEventType.MOUSE_MOVE
      );

    var flyToHandler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas);
    flyToHandler.setInputAction(
      function (movement) {
        var pickedObject = viewer.scene.pick(movement.position);

        if (Cesium.defined(pickedObject) && Cesium.defined(pickedObject.primitive)) {
          if (Cesium.defined(pickedObject.primitive.nationData)) {
            sharedObject.flyTo(pickedObject.primitive.nationData);
          }
        }
      },
      Cesium.ScreenSpaceEventType.LEFT_CLICK
      );
    function nationover(){
    // Response to a nation's mouseover event
    sharedObject.dispatch.on("nationMouseover.cesium", function(nationObject) {
      for (var i=0; i<polylines.length; i++) {
        var polyline = polylines[i];
        if (polyline.nationData.name === nationObject.name) {
          polyline.material.uniforms.color = Cesium.Color.fromCssColorString('#00ff00');
        }
        else {
          polyline.material.uniforms.color = Cesium.Color.fromCssColorString(colorScale(polyline.nationData.region));
        }
      }

      selectedNation = nationObject.name;

      $("#info").empty();

      $("#info").append("<p style=\"background-color:#696969;height:30px;font-size:16px;font-weight:bold;padding-top:5px;margin:0\">&nbsp;"+Math.round(year)+":&nbsp;"+nationObject.name+"</p>");
      $("#info").append("<table> \
        <tr><td>预期寿命:</td><td>" +parseFloat(nationObject.lifeExpectancy).toFixed(1)+"</td><td>（岁）</td></tr>\
        <tr><td>人均财富:</td><td>" +parseFloat(nationObject.income).toFixed(0)+"</td><td>（美元）</td></tr>\
        <tr><td>人口总数:</td><td>" +parseFloat(nationObject.population).toFixed(0)+"</td><td>（人）</td></tr>\
        </table>\
        ");
      $("#info").append("<div>\
        <img class=\"close\" src=\"/public/img/close.png\" style=\"width:25px;height:25px;position:absolute;right:5px;top:3px;z-index:10001;cursor:pointer\"></div>");
      $("#info table").css({"font-size":"15px","font-weight":"bold","background":"#808080","margin":"0","padding":"0"});
      $("#info").css({"border":"solid 3px #F0F8FF","border-radius":"6px","background-color":"#808080"});
      $("#info table tr").css({"margin":"0","padding":"0"});
      $("#info").show();
      $(".close").click(function(){$("#info").hide();});
            //var x=document.getElementById("close");
           // x.addEventListener("click",function(){document.getElementById('info').style.display = 'none';},false);
            /*$("#info").dialog({
                title : nationObject.name,
                width: 300,
                height: 150,
                modal: false,
                position: {my: "right center", at: "right center", of: "canvas"},
                show: "slow"
              });*/
            });
  }

  var dirCartesian = new Cesium.Cartesian3();
    sharedObject.flyTo = function(d) {//定义sharedObject对象的flyTo方法，sharedObject在obor.html中声明，是一个全局对象
      var destination = Cesium.Cartographic.fromDegrees(d.lon, d.lat-20.0, 10000000.0);
      var destCartesian = ellipsoid.cartographicToCartesian(destination);
      destination = ellipsoid.cartesianToCartographic(destCartesian);

        // only fly there if it is not the camera's current position
        if (!ellipsoid
          .cartographicToCartesian(destination)
          .equalsEpsilon(viewer.scene.camera.positionWC, Cesium.Math.EPSILON6)) {

            /* var flight = Cesium.CameraFlightPath.createAnimationCartographic(viewer.scene, {
            destination : destination
            });
            viewer.scene.animations.add(flight);
            */
            viewer.camera.flyTo({
              destination : Cesium.Cartesian3.fromDegrees(d.lon, d.lat-20.0, 10000000.0)
            });

          }
        };
        function time(){
        // setup clockview model
        var yearPerSec = 86400*365;
        viewer.clock.clockRange = Cesium.ClockRange.LOOP_STOP;//设置时间轴时间循环重新开始
        viewer.clock.startTime = Cesium.JulianDate.fromIso8601("1800-01-02");
        viewer.clock.currentTime = Cesium.JulianDate.fromIso8601("1800-01-02");
        viewer.clock.stopTime = Cesium.JulianDate.fromIso8601("2015-01-02");
        viewer.clock.clockStep = Cesium.ClockStep.SYSTEM_CLOCK_MULTIPLIER;
        viewer.clock.multiplier = yearPerSec*3;//设置tick每次调用时的步长，必须先将Cesium.ClockStep.SYSTEM_CLOCK_MULTIPLIER设置好//实际上就是设置速度，自己可以调试一下看看
        viewer.clock.shouldAnimate = false;
        viewer.animation.viewModel.setShuttleRingTicks([yearPerSec, yearPerSec*5, yearPerSec*10, yearPerSec*50]);//animation就是指圆形的小钟//此处就是设置ring的范围，就是小钟边上那个小三角形，不懂自己可以注释掉运行看看有什么变化

        viewer.animation.viewModel.dateFormatter = function(date, viewModel) {//设置小钟上的时间显示格式
            // var gregorianDate = date.toGregorianDate();
            var gregorianDate = Cesium.JulianDate.toGregorianDate(date);

            return 'Year: ' + gregorianDate.year;
          };

        // setup timeline  设置时间条
        function onTimelineScrub(e) {
          viewer.clock.currentTime = e.timeJulian;
          viewer.clock.shouldAnimate = false;
        }
        viewer.timeline.addEventListener('settime', onTimelineScrub, false);
        viewer.timeline.updateFromClock();//时间条与时钟同步更新
        viewer.timeline.zoomTo(viewer.clock.startTime, viewer.clock.stopTime);  //设置时间条的起始时间

        //viewer.scene.morphToColumbusView();
      }


     // Load the data.
     var polylineCollection = new Cesium.PolylineCollection();
     function dataload(){
      d3.json("/data/permanent/json/nations_geo.json", function(nations) {
        var ellipsoid = viewer.scene.globe.ellipsoid;
        var primitives = viewer.scene.primitives;


            // for each nation defined in nations_geo.json, create a polyline at that lat, lon
            for (var i = 0; i < nations.length; i++){
              var nation = nations[i];

              var widePolyline = polylineCollection.add();
              widePolyline.positions = ellipsoid.cartographicArrayToCartesianArray([
                    Cesium.Cartographic.fromDegrees(nation.lon, nation.lat, 0.0),   //Cartographic:地理坐标，且经纬度是用弧度表示的//此方法是表示将度数表示的地理坐标转化为弧度表示的地理坐标
                    Cesium.Cartographic.fromDegrees(nation.lon, nation.lat, 100.0)
                    ]);

                // Set a polyline's width
                var outlineMaterial = Cesium.Material.fromType('PolylineOutline');//选择渲染材料类型PolylineOutline
                outlineMaterial.uniforms.outlineWidth = 3.0;
                outlineMaterial.uniforms.outlineColor = new Cesium.Color(0.0, 0.0, 0.0, 1.0);
                outlineMaterial.uniforms.color = Cesium.Color.fromCssColorString(colorScale(nation.region));//颜色设置为css方式的颜色值,具体颜色用d3中的colorScale来构造
                widePolyline.material = outlineMaterial;

                polylines.push(widePolyline);
              }

            primitives.add(polylineCollection);//在视图中加载polylineCollection
          });
    }



$("#de_checkbox").click(function(){
      /* var shtm="\
          <div id=\"radio\" style=\"position:absolute; top:0px; right:50%; height: 30px\">\
              <input type=\"radio\" id=\"health\" name=\"healthwealth\" checked=\"checked\"><label for=\"health\">健康</label>\
              <input type=\"radio\" id=\"wealth\" name=\"healthwealth\"><label for=\"wealth\">财富</label>\
      </div>\
      <div id=\"chart\"></div>\
      <div id=\"info\" title=\"国民健康与财富\"></div> ";
      document.write(shtm);*/
      if($(this).prop('checked')==true){
      //viewer.clock.shouldAnimate = true;
      $(".cesium-viewer-timelineContainer").show();
      $(".cesium-viewer-animationContainer").show();
      $("#chart").show();
      $("#radio").show();
      $("#info").show();
      dataload();
      tick();
      nationover();
      time();
      //$(".close").toggle(function(){$("#info").hide();});
      //viewer.fullscreenButton.viewModel.fullscreenElement = document.body;

      var stamenTonerImagery = viewer.baseLayerPicker.viewModel.imageryProviderViewModels[14];
      viewer.baseLayerPicker.viewModel.selectedImagery = stamenTonerImagery;//选择加载特定的图层
    } 
    else{
      viewer.clock.shouldAnimate = false;
      viewer.clock.clockRange = Cesium.ClockRange.UNBOUNDED;
      viewer.clock.clockStep = Cesium.ClockStep.SYSTEM_CLOCK;//回复由系统决定时针的前进速度
      $(".cesium-viewer-timelineContainer").hide();
      $(".cesium-viewer-animationContainer").hide();
      $("#chart").hide();
      $("#radio").hide();
      $("#info").hide();
      polylineCollection.removeAll();
      polylines=[];
      var stamenTonerImagery = viewer.baseLayerPicker.viewModel.imageryProviderViewModels[0];
      viewer.baseLayerPicker.viewModel.selectedImagery = stamenTonerImagery;
    }
  });
    
    $("li[id='decontrol']>a").click(function(){
      if($(this).parent().children()[0].checked==false){
        $(this).parent().children()[0].checked=true;
        $(".cesium-viewer-timelineContainer").show();
        $(".cesium-viewer-animationContainer").show();
        $("#chart").show();
        $("#radio").show();
        $("#info").show();
        dataload();
        tick();
        nationover();
                    //$(".close").click(function(){$("#info").hide();});
                    time();
                    var stamenTonerImagery = viewer.baseLayerPicker.viewModel.imageryProviderViewModels[14];
                    viewer.baseLayerPicker.viewModel.selectedImagery = stamenTonerImagery;//选择加载特定的图层
                  }
                  else{
                    viewer.clock.shouldAnimate = false;
                    $(this).parent().children()[0].checked=false;
                    viewer.clock.clockRange = Cesium.ClockRange.UNBOUNDED;
                    viewer.clock.clockStep = Cesium.ClockStep.SYSTEM_CLOCK;//回复由系统决定时针的前进速度
                    $(".cesium-viewer-timelineContainer").hide(); 
                    $(".cesium-viewer-animationContainer").hide();
                    $("#chart").hide();
                    $("#radio").hide();
                    $("#info").hide();
                    polylineCollection.removeAll();
                    polylines=[];
                    var stamenTonerImagery = viewer.baseLayerPicker.viewModel.imageryProviderViewModels[0];
                    viewer.baseLayerPicker.viewModel.selectedImagery = stamenTonerImagery;
                  }
                });
  } 
})();