<div id="popDialogBox" class="popDialogBox">
  <img title="返回" class="popDialogBox_back" onclick="leaveIframe(this);" src="/public/img/back.png" style="display: none;" />
  <img title="关闭"  class="popDialogBox_close" onclick="hidePopDialogBox(this);" src="/public/img/close.png"/>
  
  <div class="popDialogBox_mian">
    
    <div class="popDialogBox_head">
      <p id="popDialogBox_head_title" class="popDialogBox_head_title">北斗农业·中国</p>
    </div>

    <div class="popDialogBox_gov">
      <a id="popDialogBox_govUrl" href="http://www.baidu.com" target='_blank'>
        <img id="popDialogBox_govImage" src="" class="popDialogBox_govImage" />
      </a>
    </div>

    <a id="popDialogBox_descripUrl" href="" target='_blank'>
      <div class="popDialogBox_descrip">
        
          <p id="popDialogBox_descText1" class="popDialogBox_descText1">北斗农业·中国</p>

          <div id="popDialogBox_descIconText2" class="popDialogBox_descIconText2">
            <img id="popDialogBox_descIcon" class="popDialogBox_descIcon" src="" />
            <p id="popDialogBox_descText2" class="popDialogBox_descText2"></p>
          </div>

          <img id="popDialogBox_2dBarcode" class="popDialogBox_2dBarcode" src="" />
          <img id="popDialogBox_barcode" class="popDialogBox_barcode" src="" />
          <img id="popDialogBox_logo" class="popDialogBox_logo" src="" />
      </div>
    </a>

    <div id="popDialogBox_tools" class="popDialogBox_tools">

      <?php
      //循环输出8个tool工具栏
        for ($i=1; $i <= 8; $i++) {
          $tool = "<div class='popDialogBox_tool'>
          <a id='popDialogBox_toolUrl".$i."' class='popDialogBox_toolUrl' href='' target='_blank'><img id='popDialogBox_toolImg".$i."' class='popDialogBox_toolImage' src='' /><p id='popDialogBox_toolText".$i."' class='popDialogBox_toolText'></p></a>
          </div>";

          if (($i%4) !== 0) {
            $tool = $tool."<div class='popDialogBox_toolGap'></div>";
          }
          echo $tool;
        }
      ?>

    </div>
  </div> <!-- end od popDialogBox_mian -->
  <div id="popDialogBox_foot" class="popDialogBox_foot" style="display: none;">
      <p id="popDialogBox_foot_title" class="popDialogBox_foot_title">北斗农业·中国</p>
  </div>
  <iframe id="popDialogBox_iframe" class="popDialogBox_iframe" src="" style="display: none;"></iframe><!-- sandbox="allow-scripts" 可禁止跨域跳转 -->
</div> <!-- end of popDialogBox -->


<div id="layerSelectBox" class="layerSelectBox">

  <p style="margin: 6px 6px; font-weight: bold; color: white; text-align: left;">图层控制</p>

  <hr/>
  <div class="layerSelectBox_list">
    <input type="checkbox" id="speciality_YBJP" onchange="checkboxChanged(this.id)" />
    <label for="speciality_YBJP"> 宇宝精品</label>
  </div>
   <div class="layerSelectBox_list">
    <input type="checkbox" id="speciality_ZY" onchange="checkboxChanged(this.id)" /> 
    <label for="speciality_ZY"> 莊园</label>
  </div>
  <div class="layerSelectBox_list">
    <input type="checkbox" id="speciality_NC" onchange="checkboxChanged(this.id)" /> 
    <label for="speciality_NC"> 农场</label>
  </div>
    <div class="layerSelectBox_list">
    <input type="checkbox" id="speciality_JD" onchange="checkboxChanged(this.id)" /> 
    <label for="speciality_JD"> 基地</label>
  </div>

  <hr/>
  <div class="layerSelectBox_list">
    <input type="checkbox" id="station_YXWD" onchange="checkboxChanged(this.id)" /> 
    <label for="station_YXWD"> 展销</label>
  </div>
  <div class="layerSelectBox_list">
    <input type="checkbox" id="station_AX" onchange="checkboxChanged(this.id)" /> 
    <label for="station_AX"> 展馆</label>
  </div>
  <div class="layerSelectBox_list">
    <input type="checkbox" id="station_DW" onchange="checkboxChanged(this.id)" /> 
    <label for="station_DW"> 展厅</label>
  </div>  
  <div class="layerSelectBox_list">
    <input type="checkbox" id="station_GR" onchange="checkboxChanged(this.id)" /> 
    <label for="station_GR"> 养生</label>
  </div>

  <hr/>
  <div class="layerSelectBox_list">
    <input type="checkbox" id="satellite_VSAT" onchange="checkboxChanged(this.id)" /> 
    <label for="satellite_VSAT"> VSAT地球站</label>
  </div>  
  <div class="layerSelectBox_list">
    <input type="checkbox" id="satellite_BDS" onchange="checkboxChanged(this.id)" /> 
    <label for="satellite_BDS">中国北斗(BDS)</label>
  </div>  
  <div class="layerSelectBox_list">
    <input type="checkbox" id="satellite_GPS" onchange="checkboxChanged(this.id)" /> 
    <label for="satellite_GPS">美国GPS</label>
  </div>  
  <div class="layerSelectBox_list">
    <input type="checkbox" id="satellite_GLONASS" onchange="checkboxChanged(this.id)" hover="background-color:yellow;"/> 
    <label for="satellite_GLONASS"> 俄国GLONASS</label>
  </div>  

  <hr/>
  <p style="margin: 6px 7px; color: white; font-size: 10px; text-align: center;" onclick="callHCHT()">版本：1.00<br/>版权所有©北斗农业·中国</p>
</div>

<div id="searchBoxContainer"></div>

<div id="searchBox" class=''>
<!-- <img title="Close" class="popDialogBox_close" onclick="hideSearchBox(this.parentNode.id);" src="/public/img/close.png"/> -->
  <div class="searchBox_typeButtonsContianer">

    <div class="searchBox_typeButtonContainer">
      <button id="searchBox_typeButton-1" class="searchBox_typeButton" style="background-image: url(/public/img/default_speciality_YBJP_img.png);" onclick="setSearchType(this)" ></button>
      <p><label for="searchBox_typeButton-1">宇宝</label></p>
    </div>

    <div class="searchBox_typeButtonContainer">
      <button id="searchBox_typeButton-2" class="searchBox_typeButton" style="background-image: url(/public/img/default_speciality_ZY_img.png);" onclick="setSearchType(this)" ></button>
      <p><label for="searchBox_typeButton-2">莊园</label></p>
    </div>

    <div class="searchBox_typeButtonContainer">
      <button id="searchBox_typeButton-3" class="searchBox_typeButton" style="background-image: url(/public/img/default_speciality_NC_img.png);" onclick="setSearchType(this)" ></button>
      <p><label for="searchBox_typeButton-3">农场</label></p>
    </div>
    <div class="searchBox_typeButtonContainer">
      <button id="searchBox_typeButton-4" class="searchBox_typeButton" style="background-image: url(/public/img/default_speciality_JD_img.png);" onclick="setSearchType(this)" ></button>
      <p><label for="searchBox_typeButton-4">基地</label></p>
    </div>
    <div class="searchBox_typeButtonContainer">
      <button id="searchBox_typeButton-11" class="searchBox_typeButton" style="background-image: url(/public/img/default_station_YXWD_img.png);" onclick="setSearchType(this)" ></button>
      <p><label for="searchBox_typeButton-11">展销</label></p>
    </div>
    <div class="searchBox_typeButtonContainer">
      <button id="searchBox_typeButton-12" class="searchBox_typeButton" style="background-image: url(/public/img/default_station_AX_img.png);" onclick="setSearchType(this)" ></button>
      <p><label for="searchBox_typeButton-12">展馆</label></p>
    </div>
    <div class="searchBox_typeButtonContainer">
      <button id="searchBox_typeButton-13" class="searchBox_typeButton" style="background-image: url(/public/img/default_station_DW_img.png);" onclick="setSearchType(this)" ></button>
      <p><label for="searchBox_typeButton-13">展厅</label></p>
    </div>
    <div class="searchBox_typeButtonContainer">
      <button id="searchBox_typeButton-14" class="searchBox_typeButton" style="background-image: url(/public/img/default_station_GR_img.png);" onclick="setSearchType(this)" ></button>
      <p><label for="searchBox_typeButton-14">养生</label></p>
    </div>
    <div class="searchBox_typeButtonContainer">
      <button id="searchBox_typeButton-21" class="searchBox_typeButton" style="background-image: url(/public/img/default_satellite_VSAT_img.png);" onclick="setSearchType(this)" ></button>
      <p><label for="searchBox_typeButton-21">VSAT</label></p>
    </div>
    <div class="searchBox_typeButtonContainer">
      <button id="searchBox_typeButton-100" class="searchBox_typeButton" style="background-image: url(/public/img/location_icon.png);" onclick="setSearchType(this)" ></button>
      <p><label for="searchBox_typeButton-100">位置</label></p>
    </div>

    <div class="searchBox_typeButtonContainer">
      <button id="searchBox_typeButton-0" class="searchBox_typeButton" style="background-image: url(/public/img/favorite_all.png); border-width: 2px; opacity: 1; border-color: blue;" onclick="setSearchType(this)" ></button>
      <p><label for="searchBox_typeButton-0">全部</label></p>
    </div>

  </div>

  <div id="searchBox_resultList" class="searchBox_resultList">
    <h5>搜索结果：</h5>
    <p id="searchBox_resultList_tips" style="display: none; margin: 10px;"><small>未匹配到结果</small></p>
    <ol class="searchBox_resultListOL" id="searchBox_resultListOL">
      <!-- <li class="searchBox_resultListLI" onclick="flyTo(30.052714,105.241836,1);"><img src="/public/img/userImg/../default_speciality_YBJP_img.png"><span style="font-weight:bold;">Test Entity</span><small>Key Words</small></li> -->
    </ol>
  </div>
</div>

<!-- 切换屏幕布局弹窗 -->
<div class="screenSelectBox" style="display: none;">
  <button type="button" id="screenSelectBoxButton1" class="cesium-button cesium-toolbar-button cesium-sceneModePicker-dropDown-icon cesium-sceneModePicker-visible" onclick="switchScreen(this);">
    <img src="/public/img/richScreenButton.png">
  </button>
  <button type="button" id="screenSelectBoxButton2" class="cesium-button cesium-toolbar-button cesium-sceneModePicker-dropDown-icon cesium-sceneModePicker-visible" onclick="switchScreen(this);">
    <img src="/public/img/fullScreenButton.png">
  </button>
</div>

<!-- 切换精品类型弹窗 -->
<div class="specialitySelectBox" style="display: none;">
  <button type="button" id="specialitySelectBoxButton3" class="cesium-button cesium-toolbar-button cesium-sceneModePicker-dropDown-icon cesium-sceneModePicker-visible" title="莊园" onclick="switchSpeciality(this);">
    <img src="/public/img/ZY_30_30.png">
  </button>
  <button type="button" id="specialitySelectBoxButton2" class="cesium-button cesium-toolbar-button cesium-sceneModePicker-dropDown-icon cesium-sceneModePicker-visible" title="农场" onclick="switchSpeciality(this);">
    <img src="/public/img/NC_30_30.png">
  </button>
  <button type="button" id="specialitySelectBoxButton1" class="cesium-button cesium-toolbar-button cesium-sceneModePicker-dropDown-icon cesium-sceneModePicker-visible" title="基地" onclick="switchSpeciality(this);">
    <img src="/public/img/JD_30_30.png">
  </button>
</div>

<!-- 切换站点类型弹窗 -->
<div class="stationSelectBox" style="display: none;">
  <button type="button" id="stationSelectBoxButton1" class="cesium-button cesium-toolbar-button cesium-sceneModePicker-dropDown-icon cesium-sceneModePicker-visible" title="展馆" onclick="switchStation(this);">
    <img src="/public/img/AX_30_30.png">
  </button>
  <button type="button" id="stationSelectBoxButton2" class="cesium-button cesium-toolbar-button cesium-sceneModePicker-dropDown-icon cesium-sceneModePicker-visible" title="展厅" onclick="switchStation(this);">
    <img src="/public/img/DW_30_30.png">
  </button>
  <button type="button" id="stationSelectBoxButton3" class="cesium-button cesium-toolbar-button cesium-sceneModePicker-dropDown-icon cesium-sceneModePicker-visible" title="养生" onclick="switchStation(this);">
    <img src="/public/img/GR_30_30.png">
  </button>
</div>

<!-- 切换定位类型弹窗 -->
<div class="satelliteSelectBox" style="display: none;">
  <button type="button" id="satelliteSelectBoxButton1" class="cesium-button cesium-toolbar-button cesium-sceneModePicker-dropDown-icon cesium-sceneModePicker-visible" title="中国北斗(BDS)" onclick="switchSatellite(this);">
    <img src="/public/img/BDS_30_30.png">
  </button>
  <button type="button" id="satelliteSelectBoxButton2" class="cesium-button cesium-toolbar-button cesium-sceneModePicker-dropDown-icon cesium-sceneModePicker-visible" title="美国GPS" onclick="switchSatellite(this);">
    <img src="/public/img/GPS_30_30.png">
  </button>
  <button type="button" id="satelliteSelectBoxButton3" class="cesium-button cesium-toolbar-button cesium-sceneModePicker-dropDown-icon cesium-sceneModePicker-visible" title="俄国GLONASS" onclick="switchSatellite(this);">
    <img src="/public/img/GLONASS_30_30.png">
  </button>
</div>


<!-- 切换定位类型弹窗 -->
<div class="touchSelectBox" style="display: none;">
  <button type="button" id="touchSelectBoxButton1" class="cesium-button cesium-toolbar-button cesium-sceneModePicker-dropDown-icon cesium-sceneModePicker-visible" title="多点触控" onclick="switchTouchScreen(this);">
    <img src="/public/img/touch_30_30.png">
  </button>
</div>


<!-- 导航窗口 -->
<!-- <div id="navigationBox" class="navigationBox" style="display: none;">

  <h3>路径规划</h3>
  <img title="关闭"  class="navigationBox_close" onclick="hideNavigationBox(this);" src="/public/img/close.png"/>

  <form class="navigationBox_form">
    <label for="startPoint">起点</label>
    <input type="text" id="navigationBox_startPointInput" name="startPoint" autocomplete="off" oninput="localSuggestSearch(this.value, 'navigationBox_suggests1');">
    <ul id="navigationBox_suggests1" class="navigationBox_suggests">
      <li></li>
    </ul>

    <label for="endPoint">终点</label>
    <input type="text" id="navigationBox_endPointInput" name="endPoint" autocomplete="off" oninput="localSuggestSearch(this.value, 'navigationBox_suggests2');">
    <ul id="navigationBox_suggests2" class="navigationBox_suggests">
      <li></li>
    </ul>

    <button onclick="return Navigation.routeSearch();">搜索路线</button>
    <p id="navigationBox_tips"></p>
  </form>

</div> -->