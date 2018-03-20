<!-- comprehensive search -->
<div id="comprehensiveSearchBox" class="comprehensiveSearchBox hiddenEle">
    <img title="关闭"  class="comprehensiveSearchBox_close" onclick="CSB.hiddenThis();" src="/public/img/close.png"/>
  <!-- header -->
  <div class="comprehensiveSearchBox_header">
    <div class="comprehensiveSearchBox_header_type comprehensiveSearchBox_header_type_selected" id="comprehensiveSearchBox_tjyb" onclick="CSB.chgSrchType(this);">
      <p>推荐宇宝</p>
    </div>
    <div class="comprehensiveSearchBox_header_type" id="comprehensiveSearchBox_simple_search" onclick="CSB.chgSrchType(this);">
      <p>位置搜索</p>
    </div>
    <div class="comprehensiveSearchBox_header_type" id="comprehensiveSearchBox_poi_type" onclick="CSB.chgSrchType(this);">
      <p>分类搜索</p>
    </div>
    <div class="comprehensiveSearchBox_header_type" id="comprehensiveSearchBox_publicTraffic_route" onclick="CSB.chgSrchType(this);">
      <p>公交</p>
    </div>
    <div class="comprehensiveSearchBox_header_type" id="comprehensiveSearchBox_drive_route" onclick="CSB.chgSrchType(this);">
      <p>驾车</p>
    </div>
  </div>

  <!-- main content -->
  <div class="comprehensiveSearchBox_mainContent">

    <!-- 推荐宇宝 -->
    <div class="tjyb" >
      <div id="tjyb_result_list">
        <div class="poi_type_search_result_list_level1">
          <div class="poiResultListLevel1_icon"></div>
          <div class="poiResultListLevel2">
            <h>location</h>
            <div class="poiResultListLevel3">
              <p>tel</p>
              <p>address</p>
              <label class="lonlat hiddenEle"></label>
            </div>
          </div>
          <div class="poi_type_search_result_navi"></div>
        </div>

      </div>
    </div>
    <!-- end of 推荐宇宝 -->

    <!-- location search -->
    <div class="simple_search">
      <div class="simple_search_input">
        <input type="text" name="simple_search_input" placeholder="请输入搜索内容，如“北京天安门”" oninput="CSB.simpleSearchOninput(this.value);" onkeydown="CSB.simpleSearchEnter();">
        <i onclick="CSB.clearInputText(this);"></i>
        <button class="simple_search_launch" onclick="CSB.simpleSearchStart()"></button>
      </div>
      <ul id="simple_search_suggest" class="search_suggest">
        <li></li>
      </ul>

      <div class="hot_city">
        <label>热门城市：</label>
        <label style="cursor: pointer;" onclick="CSB.hotCityClick(this);">北京</label>
        <label style="cursor: pointer;" onclick="CSB.hotCityClick(this);">上海</label>
        <label style="cursor: pointer;" onclick="CSB.hotCityClick(this);">昆明</label>
        <label style="cursor: pointer;" onclick="CSB.hotCityClick(this);">广州</label>
        <label style="cursor: pointer;" onclick="CSB.hotCityClick(this);">深圳</label>
        <label style="cursor: pointer;" onclick="CSB.hotCityClick(this);">杭州</label>
      </div>
    </div>
    <!-- end od location search -->

    <!-- poi type search -->
    <div class="poi_type hiddenEle">
      <div class="poiListLevel1">
        <div class="poiListLevel1_icon goverment">
          <!-- 图标 -->
        </div>
        <div class="poiListLevel2">
          <h onclick="CSB.clsfSearch(this);">政府</h>
          <div class="poiListLevel3">
            <p onclick="CSB.clsfSearch(this);">政府机关</p>
            <p onclick="CSB.clsfSearch(this);">公检法</p>
            <p onclick="CSB.clsfSearch(this);">职能部门</p>
            <p onclick="CSB.clsfSearch(this);">国外机构</p>
          </div>
        </div>
      </div>

      <div class="poiListLevel1">
        <div class="poiListLevel1_icon education">
          <!-- 图标 -->
        </div>
        <div class="poiListLevel2">
          <h onclick="CSB.clsfSearch(this);">教育</h>
          <div class="poiListLevel3">
            <p onclick="CSB.clsfSearch(this);">幼儿园</p>
            <p onclick="CSB.clsfSearch(this);">小学</p>
            <p onclick="CSB.clsfSearch(this);">中学</p>
            <p onclick="CSB.clsfSearch(this);">大学</p>
            <p onclick="CSB.clsfSearch(this);">培训</p>
          </div>
        </div>
      </div>

      <div class="poiListLevel1">
        <div class="poiListLevel1_icon hospital">
          <!-- 图标 -->
        </div>
        <div class="poiListLevel2">
          <h onclick="CSB.clsfSearch(this);">医疗（卫生）</h>
          <div class="poiListLevel3">
            <p onclick="CSB.clsfSearch(this);">综合医院</p>
            <p onclick="CSB.clsfSearch(this);">诊所</p>
            <p onclick="CSB.clsfSearch(this);">药店</p>
            <p onclick="CSB.clsfSearch(this);">体检</p>
            <p onclick="CSB.clsfSearch(this);">宠物医疗</p>
          </div>
        </div>
      </div>

      <div class="poiListLevel1">
        <div class="poiListLevel1_icon life">
          <!-- 图标 -->
        </div>
        <div class="poiListLevel2">
          <h onclick="CSB.clsfSearch(this);">生活服务</h>
          <div class="poiListLevel3">
            <p onclick="CSB.clsfSearch(this);">餐饮</p>
            <p onclick="CSB.clsfSearch(this);">酒店</p>
            <p onclick="CSB.clsfSearch(this);">银行</p>
            <p onclick="CSB.clsfSearch(this);">景点</p>
            <p onclick="CSB.clsfSearch(this);">超市</p>
            <p onclick="CSB.clsfSearch(this);">ATM</p>
          </div>
        </div>
      </div>

      <div class="poiListLevel1">
        <div class="poiListLevel1_icon traffic">
          <!-- 图标 -->
        </div>
        <div class="poiListLevel2">
          <h onclick="CSB.clsfSearch(this);">交通出行</h>
          <div class="poiListLevel3">
            <p onclick="CSB.clsfSearch(this);">公交站</p>
            <p onclick="CSB.clsfSearch(this);">地铁站</p>
            <p onclick="CSB.clsfSearch(this);">停车场</p>
            <p onclick="CSB.clsfSearch(this);">加油站</p>
            <p onclick="CSB.clsfSearch(this);">服务区</p>
          </div>
        </div>
      </div>

      <div class="poiListLevel1">
        <div class="poiListLevel1_icon bdny">
          <!-- 本地数据库搜索 -->
        </div>
        <div class="poiListLevel2">
          <h onclick="" style="cursor: default;">北斗农业</h>
          <div class="poiListLevel3">
            <p onclick="CSB.clsfSearch_NAVI_bdny(this);" title="1">宇宝</p>
            <p onclick="CSB.clsfSearch_NAVI_bdny(this);" title="2">莊园</p>
            <p onclick="CSB.clsfSearch_NAVI_bdny(this);" title="3">农场</p>
            <p onclick="CSB.clsfSearch_NAVI_bdny(this);" title="4">基地</p>
            <p onclick="CSB.clsfSearch_NAVI_bdny(this);" title="11">展销</p>
            <p onclick="CSB.clsfSearch_NAVI_bdny(this);" title="12">展馆</p>
            <p onclick="CSB.clsfSearch_NAVI_bdny(this);" title="13">展厅</p>
            <p onclick="CSB.clsfSearch_NAVI_bdny(this);" title="14">养生</p>
            <p onclick="CSB.clsfSearch_NAVI_bdny(this);" title="21">VSAT</p>
          </div>
        </div>
      </div>


    </div><!-- end of poi type search -->

    <!-- ############################################################### -->
    <!-- poi type search -->
    <div class="poi_type_search_result hiddenEle">
      <div class="poi_type_search_result_header">
        <!-- <p>在</p>
        <label id="poi_type_search_result_local">上海市</label> -->
        <p id="poi_type_search_result_count">共找到xxx条结果</p>
        <h6 onclick="CSB.closeResultList();">返回</h6>
      </div>

      <div class="poi_type_search_result_list">
        <div class="poi_type_search_result_list_level1 hiddenEle">
          <div class="poiResultListLevel1_icon"></div>
          <div class="poiResultListLevel2">
            <h>location</h>
            <div class="poiResultListLevel3">
              <p>tel</p>
              <p>address</p>
              <label class="lonlat hiddenEle"></label>
            </div>
          </div>
          <div class="poi_type_search_result_navi"></div>
        </div>

      </div>
    </div><!-- end of poi type search -->


     <!-- ############################################################### -->
    <!-- drive route search -->
    <div class="drive_route hiddenEle">
      <div class="search_options">
        <i id = "driveExchangeIcon" class="exchangeIcon" onclick="CSB.exchangeDriveStartEndInput();"></i>
        <div class="location_inputs">
          <div class="location_input route_start">
            <input type="text" oninput="CSB.driveSearchOninput(this);" onchange="CSB.driveInputOnchange(this);" autocomplete="off" placeholder="输入起点">
            <a class="hiddenEle"></a>
            <label class="hiddenEle"></label>
            <i class="drive_route_input_start_icon"></i>
            <i title="清空" class="drive_route_clear_icon hiddenEle" onclick="CSB.clearInputText(this);"></i>
            <i title="添加途径地" class="drive_route_add_icon" onclick="CSB.addRouteThrough();"></i>
          </div>

          <?php for ($i=0; $i < 5; $i++) { ?>
          <div class="location_input route_through hiddenEle">
            <input type="text" oninput="CSB.driveSearchOninput(this);" onchange="CSB.driveInputOnchange(this);" autocomplete="off" placeholder="输入途经点">
            <label class="hiddenEle"></label>
            <i class="drive_route_input_through_icon"></i>
            <i title="清空" class="drive_route_clear_icon hiddenEle" onclick="CSB.clearInputText(this);"></i>
            <i title="移除途径地" class="drive_route_remove_icon" onclick="CSB.removeRouteThrough(this);"></i>
          </div>
          <?php } ?>

          <div class="location_input route_end">
            <input type="text" oninput="CSB.driveSearchOninput(this);" onchange="CSB.driveInputOnchange(this);" autocomplete="off" placeholder="输入终点">
            <label class="hiddenEle"></label>
            <i class="drive_route_input_end_icon"></i>
            <i title="清空" class="drive_route_clear_icon hiddenEle" onclick="CSB.clearInputText(this);"></i>
          </div>

          <ul id="drive_search_suggest" class="search_suggest hiddenEle">
            <li></li>
          </ul>
        </div>
        <button class="external_search_button" onclick="MNSL.showThis('navi', 'drive');" title="语音导航"></button>
        <button class="search_button" onclick="CSB.driveRouteSearch();" title="路径规划"></button>

        <div class="drive_strategy">
          <ul>
            <li id="route_style_fast " class="dir_fast_hov policySelected" onclick="CSB.setDrivePolicy(this);">最快线路</li>
            <li id="route_style_shortest" class="dir_shor" onclick="CSB.setDrivePolicy(this);">最短线路</li>
            <li id="route_style_minhspeed" class="dir_walk" onclick="CSB.setDrivePolicy(this);">少走高速</li>
          </ul>
        </div>

      </div> 

      <div class="drive_route_result_sum hiddenEle">
        <p></p>
      </div>

      <div class="drive_route_result_list hiddenEle">
        <div class="drive_route_result_list_start">
          <div class="drive_route_result_list_startIcon"></div>
          <p>起点</p>
        </div>

        <div class="drive_route_result_list_through">
          <div class="drive_route_result_list_throughIcon"></div>
          <p>途径</p>
        </div>

        <div class="drive_route_result_list_ol">
          <ol>
            <li>
              <span>路线描述</span>
              <i class="drive_route_details_icon"></i>
              <div class="drive_route_details hiddenEle">
                <p>线路详情</p>
              </div>
            </li>
          </ol>
        </div>

        <div class="drive_route_result_list_end">
          <div class="drive_route_result_list_endIcon"></div>
          <p>终点</p>
        </div>
      </div>
    </div><!-- end of drive route search -->

    <!-- public traffic route search -->
    <div class="publicTraffic_route hiddenEle">
      <div class="search_options">
        <i class="exchangeIcon" onclick="CSB.exchangePubTfcStartEndInput();"></i>
        <div class="location_inputs">
          <div class="location_input pubTfc_route_start">
            <input type="text" name="startPoint" oninput="CSB.pubTfcSearchOninput(this);" onchange="CSB.pubTfcInputOnchange(this);" autocomplete="off" placeholder="输入起点">
            <label class="hiddenEle"></label>
            <i class="drive_route_input_start_icon"></i>
            <i title="清空" class="pubTfc_route_clear_icon" onclick="CSB.clearInputText(this);"></i>
          </div>

          <div class="location_input pubTfc_route_end">
            <input type="text" name="endPoint" oninput="CSB.pubTfcSearchOninput(this);" onchange="CSB.pubTfcInputOnchange(this);" autocomplete="off" placeholder="输入终点">
            <label class="hiddenEle"></label>
            <i class="drive_route_input_end_icon"></i>
            <i title="清空" class="pubTfc_route_clear_icon" onclick="CSB.clearInputText(this);"></i>
          </div>

          <ul id="pubtfc_search_suggest" class="search_suggest hiddenEle">
            <li></li>
          </ul>
        </div>
        <button class="external_search_button" onclick="MNSL.showThis('navi', 'pubTfc');" title="语音导航"></button>
        <button class="pubTfcSearchBtn" onclick="CSB.pubTfcRouteSearch();" title="搜索"></button>

        <div class="publicTraffic_strategy">
          <ul>
            <li class="fast_hov policySelected" onclick="CSB.setPubTfcPolicy(this);">较快捷</li>
            <li class="no_subway" onclick="CSB.setPubTfcPolicy(this);">不坐地铁</li>
            <li class="few_transfer" onclick="CSB.setPubTfcPolicy(this);">少换乘</li>
            <li class="mini_walk" onclick="CSB.setPubTfcPolicy(this);">少步行</li>
          </ul>
        </div>
      </div><!-- end of search options -->

      <div class="pubTfc_result_sum hiddenEle">
        <p></p>
      </div>

      <div class="publicTraffic_search_result_list">
        <!-- 公交线路展示示例 -->
        <div class="bus_clik hiddenEle" id="busLineP_0">
          <div class="busLineP_serial">
            <span>1</span>
          </div>

          <div class="transfer_top_con" onclick="CSB.slidePubTfcDeatils(this);">
            <h5>地铁3号线 -> 180区间线</h5>
            <div class="cost_overview">
              <p>换乘3次/约12.3公里</p>
              <label>约45分钟</label>
            </div> 
          </div>

          <div class="publicTraffic_search_result_list_route">
            <div class="publicTraffic_route_result_list_start">
              <div class="publicTraffic_route_result_list_startIcon"></div>
              <p>华东师范大学中北校区</p>
            </div>

            <div class="publicTraffic_route_result_list">
              <div class="publicTraffic_route_result_list2" onclick="CSB.pubTfcFoces(this);">
                <div class="metro_pub_left walkIcon"></div>
                <p>从西凌新邨北门步行至西藏南路站5号口</p>
                <h6>526米</h6>
                <label>112,28;113,34</label>
              </div>
              <hr>
              <div class="publicTraffic_route_result_list2">
                <div class="metro_pub_left busIcon"></div>
                <p>乘坐嘉广线在锦秋花园瑞康路下车</p>
                <h6>4站</h6>
                <label>112,28;113,34</label>
              </div>
              <hr>
              <div class="publicTraffic_route_result_list2">
                <div class="metro_pub_left metroIcon"></div>
                <p>乘坐地铁12号线在龙漕路站下车</p>
                <h6>6站</h6>
                <label>112,28;113,34</label>
              </div>
              <hr>
              <div class="publicTraffic_route_result_list2">
                <div class="metro_pub_left walkIcon"></div>
                <p>从龙川路罗秀路步行至好德便利NO.260</p>
                <h6>156米</h6>
                <label>112,28;113,34</label>
              </div>
              <hr>
            </div>

            <div class="publicTraffic_route_result_list_end">
              <div class="publicTraffic_route_result_list_endIcon"></div>
              <p>华东师范大学闵行校区</p>
            </div>
          </div>

      </div>
      
      </div><!-- end of publicTraffic_search_result_list -->
    </div><!-- end of public traffic route -->

  </div>
  <!-- end of main content -->
  
</div>


<div id="mapNaviList" class="mapNaviList" style="display: none;">
  <div class="mapNavi" onclick="MNSL.gotoMap('百度');">
    <p>百度地图</p>
  </div>
  <div class="mapNavi" onclick="MNSL.gotoMap('苹果');">
    <p>苹果地图</p>
  </div>
  <div class="mapNavi" onclick="MNSL.gotoMap('高德');">
    <p>高德地图</p>
  </div>
  <div class="mapNavi" onclick="MNSL.gotoMap('腾讯');">
    <p>腾讯地图</p>
  </div>
  <div class="mapNavi" onclick="MNSL.hiddenThis();">
    <p>取消</p>
  </div>

  <!-- <div class="mapNavi" onclick="MNSL.callExternalMaps('百度');">
    <p>百度地图</p>
  </div>
  <div class="mapNavi" onclick="MNSL.callExternalMaps('苹果');">
    <p>苹果地图</p>
  </div>
  <div class="mapNavi" onclick="MNSL.callExternalMaps('高德');">
    <p>高德地图</p>
  </div>
  <div class="mapNavi" onclick="MNSL.callExternalMaps('腾讯');">
    <p>腾讯地图</p>
  </div>
  <div class="mapNavi" onclick="MNSL.hiddenThis();">
    <p>取消</p>
  </div> -->
</div>