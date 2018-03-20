/*global define*/

    //原地址解析重载
    function geocode(viewModel) {
        console.log('start Bing geocode');
        var query = viewModel.searchText;

        if (/^\s*$/.test(query)) {
            //whitespace string
            return;
        }

        // If the user entered (longitude, latitude, [height]) in degrees/meters,
        // fly without calling the geocoder.
        var splitQuery = query.match(/[^\s,\n]+/g);
        if ((splitQuery.length === 2) || (splitQuery.length === 3)) {
            var longitude = +splitQuery[0];
            var latitude = +splitQuery[1];
            var height = (splitQuery.length === 3) ? +splitQuery[2] : 300.0;

            if (!isNaN(longitude) && !isNaN(latitude) && !isNaN(height)) {
                updateCamera(viewModel, Cesium.Cartesian3.fromDegrees(longitude, latitude, height));
                return;
            }
        }
        // viewModel._isSearchInProgress = true;  //阻止将搜索框变为searching字样

        var promise = Cesium.loadJsonp(viewModel._url + 'REST/v1/Locations', {
            parameters : {
                query : query,
                key : viewModel._key

            },
            callbackParameterName : 'jsonp'
        });

        var geocodeInProgress = viewModel._geocodeInProgress = Cesium.when(promise, function(result) {
            if (geocodeInProgress.cancel) {
                return;
            }
            viewModel._isSearchInProgress = false;

            if (result.resourceSets.length === 0) {
                viewModel.searchText = query; //(Not found)
                return;
            }

            var resourceSet = result.resourceSets[0];
            if (resourceSet.resources.length === 0) {
                viewModel.searchText = query; //(Not found)
                return;
            }

            var resource = resourceSet.resources[0];

            viewModel._searchText = query;           //已修改，设置为原字符而非返回的英文
            var bbox = resource.bbox;
            var south = bbox[0];
            var west = bbox[1];
            var north = bbox[2];
            var east = bbox[3];

            updateCamera(viewModel, Cesium.Rectangle.fromDegrees(west, south, east, north));
        }, function() {
            if (geocodeInProgress.cancel) {
                return;
            }

            viewModel._isSearchInProgress = false;
            viewModel.searchText = query;
        });
    }

    function cancelGeocode(viewModel) {
        viewModel._isSearchInProgress = false;
        if (defined(viewModel._geocodeInProgress)) {
            viewModel._geocodeInProgress.cancel = true;
            viewModel._geocodeInProgress = undefined;
        }
    }

    function updateCamera(viewModel, destination) {
      viewModel._scene.camera.flyTo({
          destination : destination,
          complete: function() {
              viewModel._complete.raiseEvent();
          },
          duration : viewModel._flightDuration,
          endTransform : Cesium.Matrix4.IDENTITY
      });
    }



// 天地图地址解析
var TdtSearch = {
  viewModel: null,
  viewHeight: 1000.0,

  tdtSearch: function(viewModel){
    this.viewModel = viewModel;
    var placeName = viewModel.searchText;

    if (/^\s*$/.test(placeName)) {
        //whitespace string
        return;
    }

    TdtSearch.search(placeName);
  },

  search: function(placeName){

    var config = {
      pageCapacity:10,  //每页显示的数量
      onSearchComplete:this.whenPointSearchResult  //接收数据的回调函数
    };

    var map = new TMap("mapDiv");
    map.centerAndZoom(new TLngLat(106,33),6); //设置为全国

    //创建搜索对象
    var localsearch = new TLocalSearch(map, config);

    localsearch.search(placeName);
  },

  whenPointSearchResult:function(results){
    var latlng = TdtSearch.praseSearchResult(results);

    if(!latlng.length){
        console.warn('天地图无结果，启动Bing搜索');
        geocode(TdtSearch.viewModel); // 调用Cesium自带Bing搜索
        return;
    }else if(latlng[0] == 'waitting'){
        // 等待第二次搜索结果
        return;
    }

    // 启动视野控制
    console.log('Go to ', latlng[0], latlng[1]);

    viewer.camera.flyTo({
      destination : Cesium.Cartesian3.fromDegrees(latlng[1], latlng[0], TdtSearch.viewHeight)
    });
  },

  praseSearchResult: function(results){
    var latlng = new Array();
    var resultType = parseInt(results.getResultType());
    
    switch(resultType){
      case 1:
        // 解析点数据结果
        // 若未搜索到奥任何结果将标记为类型1，且结果为false
        // console.info(results.getPois());
        if (results.getPois()) {
            latlngstr = results.getPois()[0]['lonlat'];
            latlng = [latlngstr.split(' ')[1], latlngstr.split(' ')[0]];
            TdtSearch.viewHeight = 1000.0; // 设置视角高度
        }
        break;
      case 2:
        // 解析推荐城市
        // console.info(results.getStatistics());
        var prioritySug = results.getStatistics()['priorityCitys'][0]['name'];
        var keyword = results.getStatistics()['keyword'];

        // 返回推荐城市时，使用第一个推荐城市与搜索关键词组合再次查询
        console.log('No direct result, retry search: ' + prioritySug + keyword);
        TdtSearch.search(prioritySug + keyword); // 第二次搜索时直接调用内部search函数启动搜索
        latlng = ['waitting', 'watting']; //提示调用者，暂时无需认定无搜索结果，待第二次精确搜索
        break;
      case 3:
        // 解析行政区划
        // console.info(results.getArea());
        latlngstr = results.getArea()['lonlat'];
        latlng = [latlngstr.split(',')[1], latlngstr.split(',')[0]];
        TdtSearch.viewHeight = 70000.0;  // 设置视角高度
        AdminBoundary.drawBoundary(results.getArea()['name']); //直接调用行政界线绘制类绘制行政边界，该边界线会在点击时移除
        break;
      default:
        console.log('search result is other type。');
        break;
    }

    return latlng;
  }
}