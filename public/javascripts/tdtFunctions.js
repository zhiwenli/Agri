
// comprehensiveSearchBox VIEW
var CSB = {
	suggestInputEle: null,
	eleStack: new Array(),
	billboard: null,
	timeoutTask: null,

	showThis: function(){
		$("#comprehensiveSearchBox").fadeIn();
		NAVI_BDNY.hideOtherBox();

		this.init();
	},

	//隐藏主窗口
	hiddenThis: function(){
		$("#comprehensiveSearchBox").fadeOut('fast');
		CVC.clearAll();
		NAVI_BDNY.showOtherBox();
	},

	// 窗口初始化
	init(){
		//获取‘推荐宇宝’容器内容
		NAVI_BDNY.searchByType('1', CSB.setTJYBContent);
	},

	// 外部调用
	setPosition: function(left, top){
		$("#comprehensiveSearchBox").css('left', left);
		$("#comprehensiveSearchBox").css('top', top);
	},

	hiddenAllContent: function(){
		$('.tjyb').addClass('hiddenEle');
		$('.simple_search').addClass('hiddenEle');
		$('.poi_type').addClass('hiddenEle');
		$('.drive_route').addClass('hiddenEle');
		$('.publicTraffic_route').addClass('hiddenEle');
		$('.poi_type_search_result').addClass('hiddenEle');
	},

	chgSrchType: function(eleObj){

		$('.comprehensiveSearchBox_header_type').removeClass('comprehensiveSearchBox_header_type_selected');
		$(eleObj).addClass('comprehensiveSearchBox_header_type_selected');

		this.closeResultList();
		this.hiddenAllContent();

		var className = eleObj.id.replace("comprehensiveSearchBox_", "");
		$('.'+className).removeClass('hiddenEle');
		console.log(className);

		CVC.clearAll();
	},

	//设置‘推荐宇宝’模块具体内容
	setTJYBContent(pois){

		//设置列表内容
		$("#tjyb_result_list").empty();

		for (var i = 0; i < pois.length; i++) {
			var ele = '<div class="poi_type_search_result_list_level1" onclick="CSB.locationHighlightFocus(this);">\
				<div class="poiResultListLevel1_YBicon"></div>\
				<div class="poiResultListLevel2">\
				  <h>'+pois[i]['name']+'</h>\
				  <div class="poiResultListLevel3">\
				    <p>'+pois[i]['district']+'</p>\
				    <p>坐标：'+pois[i]['lng']+','+pois[i]['lat']+'</p>\
				    <label class="lonlat hiddenEle">'+pois[i]['lng']+' '+pois[i]['lat']+'</label>\
				  </div>\
				</div>\
				<div class="poi_type_search_result_navi" onclick="MNSL.showThis(\'mark\', CSB.getMarkPoint(this));"></div>\
			</div>';
			$("#tjyb_result_list").append(ele);
		}
	},

	//清除同div中input元素内容clearInputText,及其隐藏坐标
	clearInputText: function(ele){
		var div = ele.parentNode;
		$(div).find('input').val('');
		$(div).find('label').text('');
		$(div).find('.drive_route_clear_icon').addClass('hiddenEle');
	},

	simpleSearchOninput: function(value){
		console.info(value);
		value = $.trim(value);
		if(value){
			$('#simple_search_suggest').empty();
			Tdt.poiSuggest(value, this.showSimpleSearchSuggest);
		}
	},

	simpleSearchEnter: function(){
		if(event.keyCode ==13){
        	this.simpleSearchStart();
    	}
	},

	hotCityClick: function(ele){
		var keyword = $(ele).text();
		$('.simple_search_input > input').val(keyword);
		this.simpleSearchStart();
	},

	showSimpleSearchSuggest: function(result){
		 $('#simple_search_suggest').empty();

		var suggests = result.getSuggests();
		for (var i = 0; i < suggests.length && i < 10; i++) {
	      $('#simple_search_suggest').append('<li class="" onclick="CSB.simpleSearchSuggestClick(this);">'
	      	+suggests[i]['name']
	      	+'<small>-'+suggests[i]['address']+'</small>'
	      	+'</li>');
	    }

	    $('#simple_search_suggest').slideDown();
	},

	simpleSearchSuggestClick: function(ele){
		var keyword = $(ele).text().split('-')[1]+$(ele).text().split('-')[0];
		$('.simple_search_input > input').val(keyword);

		this.simpleSearchStart();
	},

	simpleSearchStart: function(){
		var keyword = $('.simple_search_input > input').val();
		Tdt.poiSearch(keyword, this.poiSearchCallback);

		$("#simple_search_suggest").slideUp('fast');
		this.closeResultList();
	},

	//简单搜索的回调函数
	poiSearchCallback: function(results){
	    var resultType = parseInt(results.getResultType());
	    
	    //面
	    if(resultType == 3){
	      CSB.showPoiSearchAreaResult(results.getArea());
	    }

	    //点
	    if (resultType == 1) {
	      CSB.showPoiSearchPointResults(results.getPois());
	    }
	},

	showPoiSearchAreaResult: function(area){
		if (area['points'] == undefined) {
			console.info("未搜索到结果");
		}

		var lat = area['lonlat'].split(',')[1];
	    var lng = area['lonlat'].split(',')[0];

	    CVC.flyTo(lng, lat);

		//绘制边界线
		polylines = AdminBoundary.getAllPolylinesPoints(area['points']);
		AdminBoundary.drawPolylines(polylines);

		// 显示列表
		$('.poi_type_search_result').removeClass('hiddenEle');

		//设置列表内容
		console.info(area);
		$("#poi_type_search_result_count").text('搜索到一座城市');

		$(".poi_type_search_result_list").empty();
		var ele = '<div class="poi_type_search_result_list_level1">\
		<div class="poiResultListLevel1_icon"></div>\
		<div class="poiResultListLevel2">\
		<h>'+area['name']+'</h>\
		<div class="poiResultListLevel3">\
		<p>已切换至'+area['name']+'</p>\
		</div></div></div>';
		$(".poi_type_search_result_list").append(ele);
	},

	showPoiSearchPointResults: function(pois){
		if (pois || pois.length == 0) {
			$("#poi_type_search_result_count").text("共搜索到"+pois.length+"条结果");
		}else{
			$("#poi_type_search_result_count").text("未搜索到结果，可能是当前视野范围内无匹配结果或视野范围过大，请重试。");
		}

		// 显示列表
		$('.poi_type_search_result').removeClass('hiddenEle');

		//设置列表内容
		$(".poi_type_search_result_list").empty();

		for (var i = 0; i < pois.length; i++) {
			var ele = '<div class="poi_type_search_result_list_level1" onclick="CSB.locationHighlightFocus(this);">\
				<div class="poiResultListLevel1_icon"></div>\
				<div class="poiResultListLevel2">\
				  <h>'+pois[i]['name']+'</h>\
				  <div class="poiResultListLevel3">\
				    <p>电话：'+pois[i]['phone']+'</p>\
				    <p>地址：'+pois[i]['address']+'</p>\
				    <label class="lonlat hiddenEle">'+pois[i]['lonlat']+'</label>\
				  </div>\
				</div>\
				<div class="poi_type_search_result_navi" onclick="MNSL.showThis(\'mark\', CSB.getMarkPoint(this));"></div>\
			</div>';
			$(".poi_type_search_result_list").append(ele);

			CSB.showResultListLevel1Location(ele);
		}

		//视角移至第一条结果
		if(pois.length > 0){
			var lon = pois[0]['lonlat'].split(' ')[0];
			var lat = pois[0]['lonlat'].split(' ')[1];

			CVC.flyTo(lon, lat);
		}
	},

	//分类搜索
	clsfSearch: function(ele){
		var keyword = $(ele).text();

		// 视野范围内搜索
		Tdt.poiSearchInBounds(keyword, this.clsfSearchCallback);

		console.log(keyword);
	},

	//分类搜索回调函数
	clsfSearchCallback: function(results){
		var resultType = parseInt(results.getResultType());
	    
	    //点
	    if (resultType == 1) {
	      CSB.showPoiSearchPointResults(results.getPois());
	    }else{
	      CSB.showPoiSearchPointResults(false);
	    }

	    $(".poi_type").addClass('hiddenEle');
	    CSB.eleStack.push('poi_type');
	},

	clsfSearch_NAVI_bdny: function(ele){
		var type = $(ele).attr('title');

		NAVI_BDNY.searchByType(type, CSB.clsfSearch_NAVI_bdnyCallback);
	},

	clsfSearch_NAVI_bdnyCallback: function(results){
		console.log('->>', results);

		var pois = new Array();
		for (var i = 0; i < results.length; i++) {
			var NAVI_bdnyEntity = new Array();
			NAVI_bdnyEntity['name'] = results[i]['name'];
			NAVI_bdnyEntity['phone'] = '';
			NAVI_bdnyEntity['address'] = '';
			NAVI_bdnyEntity['lonlat'] = results[i]['lng']+' '+results[i]['lat'];
			pois.push(NAVI_bdnyEntity);
		}

		CSB.showPoiSearchPointResults(pois);
		CSB.eleStack.push('poi_type');
		$(".poi_type").addClass('hiddenEle');

		//临时解决办法,隐藏位置标记并打开图层
		CVC.clearLocationBillboard();
		var layerId = getLayersIdByTypeId(results[0]['type_id']);
		var checked = document.getElementById(layerId).checked;
		if (!checked) {
		//模拟点击checked元素，以打开图层
			$('#'+layerId).trigger('click');
			console.log('Auto open layer: '+layerId);
		}
	},

	// 列表菜单返回
	closeResultList: function(){
		$('.poi_type_search_result').addClass('hiddenEle');
		$('.'+this.eleStack.pop()).removeClass('hiddenEle'); //显示被隐藏的div

		CVC.clearLocationBillboard();

		CSB.highLightLocationUnfocus();
	},

	showResultListLevel1Location: function(ele){
		var lnglat = $(ele).find('label').text();
		var lng = lnglat.split(' ')[0];
		var lat = lnglat.split(' ')[1];

		CVC.addLocationBillboard(lng, lat);
	},

	locationHighlightFocus: function(ele){
		var lonlat = $(ele).find('label').text();
		var lng = lonlat.split(' ')[0];
		var lat = lonlat.split(' ')[1];

		CVC.locationFocus(lng, lat);
	},

	highLightLocationUnfocus: function(){
		CVC.locationUnfocus();
	},

	//调用外部地图
	getMarkPoint: function(eleObj){
		var endPoint = $(eleObj.parentNode).find('label').text();
		endPoint = endPoint.split(' ');
		var endName = $(eleObj.parentNode).find('h').text();

		//AliMap test
		var point = lzWP(endPoint[0], endPoint[1], endName);
		return point;

	},

	// 添加途经点输入框
	addRouteThrough: function(){
		var routeThrough = $('.route_through');
		for (var i = 0; i < routeThrough.length; i++) {
			if($(routeThrough[i]).hasClass('hiddenEle')){
				$(routeThrough[i]).removeClass('hiddenEle');
				$(routeThrough[i]).val('');

				//更新页面元素
				if (i == routeThrough.length-1) {
					$('.drive_route_add_icon').addClass('hiddenEle');
				}
				this.resetExIconPosition();
				$('.drive_route_result_list').height($(".drive_route_result_list").height()-30);
				break;
			}
		}
	},

	// 隐藏途经点输入框
	removeRouteThrough: function(ele){
		$(ele.parentNode).addClass('hiddenEle');
		$('.drive_route_add_icon').removeClass('hiddenEle');
		this.resetExIconPosition();
		$('.drive_route_result_list').height($(".drive_route_result_list").height()+30);
	},

	//交换起始点输入框内容
	exchangeDriveStartEndInput: function(){
		var startText = $('.route_start>input').val();
		var endText = $('.route_end>input').val();
		$('.route_start>input').val(endText);
		$('.route_end>input').val(startText);

		var startLnglat = $('.route_start>label').text();
		var endLnglat = $('.route_end>label').text();
		$('.route_start>label').text(endLnglat);
		$('.route_end>label').text(startLnglat);
	},

	// 添加/减少途经点输入框时，更新图标位置
	resetExIconPosition: function(command){
		var routeThrough = $('.route_through');
		var numOfVisible = 0;
		var inputH = 30;
		for (var i = 0; i < routeThrough.length; i++) {
			inputH = parseInt($(routeThrough[i]).css('height'));
			if(!$(routeThrough[i]).hasClass('hiddenEle')){
				numOfVisible++;
			}
		}

		var marginTop = (numOfVisible+1)*inputH/2;
		$('#driveExchangeIcon').css('margin-top', marginTop);
	},

	driveInputOnchange: function(ele){
		this.timeoutTask = setTimeout(function(){
			var keyword = $(ele).val();
			CSB.driveSearchLatlng(keyword);
		}, 1000);

		$('#drive_search_suggest').fadeOut('fast');

		//清除当前显示结果
		CVC.clearAll();
		$('.drive_route_result_sum').addClass('hiddenEle');
		$('.drive_route_result_list').addClass('hiddenEle');

		this.syncPubTfcDrive();
	},

	driveSearchOninput: function(ele){
		var value = $.trim($(ele).val());
		$(ele.parentNode).find('a').text(value);
		$('#drive_search_suggest').empty();
		if(value){
			NAVI_BDNY.searchByKwd(value, this.showDriveSearchSuggestCallback);
			Tdt.poiSuggest(value, this.showDriveSearchSuggestCallback);
			this.suggestInputEle = ele;
			$(ele.parentNode).find('.drive_route_clear_icon').removeClass('hiddenEle');
		}else{
			$(ele.parentNode).find('.drive_route_clear_icon').addClass('hiddenEle');
		}
	},

	showDriveSearchSuggestCallback: function(result){
		
	    //由于有两种搜索回调使用该函数，因此进行检查，返回数组的是本地数据库搜索，对象则是天地图搜索
		if(Array.isArray(result)){
			for (var i = 0; i < result.length && i < 5; i++) {
		      $('#drive_search_suggest').prepend('<li class="" onclick="CSB.driveSearchSuggestClick(this);">'
		      	+result[i]['name']
		      	+'<small>-'+result[i]['district']+'</small>'
		      	+'<i class="hiddenEle">'+result[i]['lng']+','+result[i]['lat']+'</i>'
		      	+'</li>');
		    }
		}else{
			var suggests = result.getSuggests();
		    for (var i = 0; i < suggests.length && i < 10; i++) {
		      $('#drive_search_suggest').append('<li class="" onclick="CSB.driveSearchSuggestClick(this);">'
		      	+suggests[i]['name']
		      	+'<small>-'+suggests[i]['address']+'</small>'
		      	+'</li>');
		    }
		}

	    $('#drive_search_suggest').slideDown();
	},

	driveSearchSuggestClick: function(ele){
		clearTimeout(this.timeoutTask);

		var city = $(ele).text().split('-')[1]; //暂时不用
		var keyword = $(ele).text().split('-')[0];
		$(CSB.suggestInputEle).val(keyword);
		$('#drive_search_suggest').slideUp();

		if ($(ele).find('i').length > 0) {
			var lng = $(ele).find('i').text().split(',')[0];
			var lat = $(ele).find('i').text().split(',')[1];

			// 设置隐藏经纬度
		    console.log(lng+','+lat);
		    var inputDiv = CSB.suggestInputEle.parentNode;
		    $(inputDiv).find('label').text(lng+','+lat);
		    CSB.syncPubTfcDrive();

		    //视角飞行至目的地
		    CVC.setView(lng, lat);
		}else{
			CSB.driveSearchLatlng(city+keyword);
		}
	},

	driveSearchLatlng: function(keyword){
		console.log('search ->>>', keyword);
		if (keyword != '') {
			Tdt.poiSearch(keyword, this.driveSearchLatlngCallback);
		}
	},

	driveSearchLatlngCallback: function(results){
		var resultType = parseInt(results.getResultType());
	    var lat;
	    var lng;
	    
	    if (resultType == 1 && results.getPois().length>0) {//点
	      var pois = results.getPois();
	      lng = pois[0]['lonlat'].split(' ')[0];
		  lat = pois[0]['lonlat'].split(' ')[1];
		  $(CSB.suggestInputEle).val(pois[0]['name']);
	    }else if(resultType == 3){//面
	      var area = results.getArea();
	      lat = area['lonlat'].split(',')[1];
	      lng = area['lonlat'].split(',')[0];
	      $(CSB.suggestInputEle).val(area['name']);
	    }else{
	    	$(CSB.suggestInputEle).val('');
	    	$(CSB.suggestInputEle).attr('placeholder', '未查找到地点!');
	    	CSB.syncPubTfcDrive();
	    	return;
	    }

	    // 设置隐藏经纬度
	    console.log(lng+','+lat);
	    var inputDiv = CSB.suggestInputEle.parentNode;
	    $(inputDiv).find('label').text(lng+','+lat);
	    CSB.syncPubTfcDrive();

	    //视角飞行至目的地
	    CVC.setView(lng, lat);
	},

	//驾车搜索调用入口
	driveRouteSearch: function(){
		var points = this.getDriveAllInputPoint();
		if (!points) {console.warn('请输入正确的起点终点');return;}

		var policy = this.getDrivePolicy();

		//启动多点路径规划
		Tdt.multiDrivePlanning(points, policy, this.drivePlanningCallback);

		//绘制途经点标记
		for (var i = 0; i < points.length; i++) {
			points[i] = lzWP(points[i][0],points[i][1]);
		}
	    CVC.createRouteNodeMark(points);

	    //显示提示
	    $('.drive_route_result_sum').removeClass('hiddenEle');
	    $('.drive_route_result_sum>p').text('正在规划路径，请稍候...');
	},

	//提取用户输入的起始点和途经点
	getDriveAllInputPoint: function(){
		var strPoints = new Array();

		var start = $('.route_start>label').text();
		var end = $('.route_end>label').text();
		
		if (start == '') {//起终点检查
			$('.route_start>input').val('');
			$('.route_start>input').attr('placeholder', '请输入正确的起点!');
			this.syncPubTfcDrive();
			return false;
		}else if (end == '') {
			$('.route_end>input').val('');
			$('.route_end>input').attr('placeholder', '请输入正确的终点!');
			this.syncPubTfcDrive();
			return false;
		}

		strPoints.push(start);

		var routeThrough = $('.route_through');
		for (var i = 0; i < routeThrough.length; i++) {
			if(!$(routeThrough[i]).hasClass('hiddenEle') && $(routeThrough[i]).find('label').text() != ''){
				strPoints.push($(routeThrough[i]).find('label').text());
			}
		}
		
		strPoints.push(end);

		for (var i = 0; i < strPoints.length; i++) {
			strPoints[i] = new Array(strPoints[i].split(',')[0], strPoints[i].split(',')[1]);
		}

		return strPoints;
	},

	//设置路线规划策略
	setDrivePolicy: function(ele){
		$('.drive_strategy li').removeClass('policySelected');
		$(ele).addClass('policySelected');

		//触发驾车路线规划
		this.driveRouteSearch();
	},

	//获取驾车策略
	getDrivePolicy: function(){
		var policy = 0;
		if ($('.dir_fast_hov').hasClass('policySelected')) {
			policy = 0;
		}else if($('.dir_shor').hasClass('policySelected')){
			policy = 1;
		}else if($('.dir_walk').hasClass('policySelected')){
			policy = 2;
		}
		return policy;
	},

	drivePlanningCallback: function(result){

		var distance = 0;
	    var durtation = 0;
	    var routeTlatlon = new Array();
	    var routePlanArr = new Array();

		for (var i = 0; i < result.length; i++) {
			if(result[i].getNumPlans() <= 0){
				console.warn('第', i, '段路程没有搜索结果');
				return;
			}else{
				var routePlan = result[i].getPlan(0); //提取第一种方案
				distance += routePlan.getDistance();
	    		durtation += routePlan.getDuration();
	    		routeTlatlon = routeTlatlon.concat(routePlan.getPath());
	    		routePlanArr.push(routePlan);
			}
		}

	    $('.drive_route_result_sum>p').text('总路程 ' + distance.toFixed(1) + '公里，预计耗时 ' + parseFloat(durtation/3600).toFixed(1) + '小时');

	    var points = CSB.TLatLngArr2numArr(routeTlatlon);
	    CVC.drawGlowLine(points);
	    CVC.flyToMiniRect(points);

	    CSB.overviewDrivePlanningResult(routePlanArr);
	},

	//将天地图返回的Tlatlng对象数组转换为数值型
	TLatLngArr2numArr: function(Tlatlon){
	    var points = new Array();
	    for (var i = 0; i < Tlatlon.length - 1; i++) { 
	      points.push(Tlatlon[i].getLng(), Tlatlon[i].getLat());
	    }
	    return points;
	},

	// 显示详细路线
	overviewDrivePlanningResult: function(routePlanArr){
		$('.drive_route_result_list').empty();

		$('.drive_route_result_list').append('<div class="drive_route_result_list_start">\
          <div class="drive_route_result_list_startIcon"></div>\
          <p>'+$('.route_start>input').val()+'</p>\
        </div>');

		for (var i = 0; i < routePlanArr.length; i++) {
			var routePlan = routePlanArr[i];

			if (i > 0) {
				$('.drive_route_result_list').append('<div class="drive_route_result_list_through">\
		          <div class="drive_route_result_list_throughIcon"></div>\
		          <p>'+ $($('.route_through > input')[i-1]).val() +'</p>\
		        </div>');
			}

	        var liStr = '';
			for (var j = 0; j < routePlan.getNumRoutes(); j++) {
				var route = routePlan.getRoute(j);
				// console.info(route['strguide']);

				var latlngArr = '';
				var path = route.getPath();
				for (var k = 0; k < path.length; k++) {
					latlngArr += path[k].getLng() + ',' + path[k].getLat();
					if(k != path.length-1){
						latlngArr += ',';
					}
				}
				var label = '<label style="display: none;">'+latlngArr+'</label>';

				//路线细节
				var stepDetails = '';
				for (var k = 0; k < route.getNumSteps(); k++) {
					var description = route.getStep(k).getDescription();
					stepDetails += '<p>'+(k+1)+')'+description+'</p>';
				}

				liStr += '<li onclick="CSB.driveRouteFoces(this);">\
					<span>'+route['strguide']+'</span>'+label+
					'<i class="drive_route_details_icon"></i>'+
					'<div class="drive_route_details hiddenEle">'+stepDetails+
					'</div></li>';

				
			}

			$('.drive_route_result_list').append('<div class="drive_route_result_list_ol">\
	          <ol>'+liStr+'</ol>\
	        </div>');
		}

		$('.drive_route_result_list').append('<div class="drive_route_result_list_end">\
          <div class="drive_route_result_list_endIcon"></div>\
          <p>'+$('.route_end>input').val()+'</p>\
        </div>');


		$('.drive_route_result_list').removeClass('hiddenEle');
	},

	slideDriveRouteDetails: function(ele){
		var driveRouteDetails = $(ele).find('.drive_route_details');
		if($(driveRouteDetails).hasClass('hiddenEle')){
			$(driveRouteDetails).removeClass('hiddenEle');
			$(ele).find('.drive_route_details_icon').addClass('flip_horizintal');
		}else{
			$(driveRouteDetails).addClass('hiddenEle');
			$(ele).find('.drive_route_details_icon').removeClass('flip_horizintal');
		}

	},

	driveRouteFoces: function(ele){
		var pointsStr = $(ele).find('label').text();
		var points = pointsStr.split(',');

		for (var i = 0; i < points.length; i++) {
			points[i] = parseFloat(points[i]);
		}

		CVC.focusLine(points);
		CVC.flyToMiniRect(points);

		CSB.slideDriveRouteDetails(ele);
	},

	driveRouteUnfoces: function(ele){
		CVC.unfocusLine();
	},

	//同步公交与驾车的起点终点及其坐标
	syncPubTfcDrive: function(){
		if(!$('.drive_route').is(":hidden")){
			$('.pubTfc_route_start>input').val($('.route_start>input').val());
			$('.pubTfc_route_end>input').val($('.route_end>input').val());
			$('.pubTfc_route_start>label').text($('.route_start>label').text());
			$('.pubTfc_route_end>label').text($('.route_end>label').text());

			$('.pubTfc_route_start>input').attr('placeholder', $('.route_start>input').attr('placeholder'));
			$('.pubTfc_route_end>input').attr('placeholder', $('.route_end>input').attr('placeholder'));

		}else if(!$('.publicTraffic_route').is(":hidden")){
			$('.route_start>input').val($('.pubTfc_route_start>input').val());
			$('.route_end>input').val($('.pubTfc_route_end>input').val());
			$('.route_start>label').text($('.pubTfc_route_start>label').text());
			$('.route_end>label').text($('.pubTfc_route_end>label').text());

			$('.route_start>input').attr('placeholder', $('.pubTfc_route_start>input').attr('placeholder'));
			$('.route_end>input').attr('placeholder', $('.pubTfc_route_end>input').attr('placeholder'));
		}
	},

	//获取公交或驾车导航的起点终点，用于第三方导航使用
	getStartEndPoints: function(){
		var points = null;
		if(!$('.drive_route').is(":hidden")){
			points = CSB.getDriveAllInputPoint();
		}else if(!$('.publicTraffic_route').is(":hidden")){
			points = CSB.getPubTfcAllInputPoint();
		}
console.info(points, points[0], points[1]);
		if (!points) {
			console.warn('请输入正确的起点终点');
			return false;
		}

		var startPoint = points[0];
		var endPoint = points.pop();
		var startName = $('.route_start>input').val();
		var endName = $('.route_end>input').val();

		//convert to lzWP
		var startp = lzWP(startPoint[0], startPoint[1], startName);
		var endp = lzWP(endPoint[0], endPoint[1], endName);console.log('--->',startp, endp);
		return [startp, endp];
	},

	//公共交通
	//交换起始点输入框内容
	exchangePubTfcStartEndInput: function(){
		var startText = $('.pubTfc_route_start>input').val();
		var endText = $('.pubTfc_route_end>input').val();
		$('.pubTfc_route_start>input').val(endText);
		$('.pubTfc_route_end>input').val(startText);

		var startLnglat = $('.pubTfc_route_start>label').text();
		var endLnglat = $('.pubTfc_route_end>label').text();
		$('.pubTfc_route_start>label').text(endLnglat);
		$('.pubTfc_route_end>label').text(startLnglat);
	},

	pubTfcInputOnchange: function(ele){
		CSB.syncPubTfcDrive();
		$('#pubtfc_search_suggest').fadeOut();

		this.timeoutTask = setTimeout(function(){
			var keyword = $(ele).val();
			CSB.pubTfcSearchLatlng(keyword);
		}, 1000);
	},

	pubTfcSearchOninput: function(ele){
		var value = $.trim($(ele).val());
		if(value){
			$('#pubtfc_search_suggest').empty();
			NAVI_BDNY.searchByKwd(value, this.showPubTfcSearchSuggestCallback);
			Tdt.poiSuggest(value, this.showPubTfcSearchSuggestCallback);
			this.suggestInputEle = ele;
		}
	},

	showPubTfcSearchSuggestCallback: function(results){

	    //由于有两种搜索回调使用该函数，因此进行检查，返回数组的是本地数据库搜索，对象则是天地图搜索
		if(Array.isArray(results)){
			for (var i = 0; i < results.length && i < 5; i++) {
		      $('#pubtfc_search_suggest').prepend('<li class="" onclick="CSB.pubTfcSearchSuggestClick(this);">'
		      	+results[i]['name']
		      	+'<small>-'+results[i]['district']+'</small>'
		      	+'<i class="hiddenEle">'+results[i]['lng']+','+results[i]['lat']+'</i>'
		      	+'</li>');
		    }
		}else{
			var suggests = results.getSuggests();
		    for (var i = 0; i < suggests.length && i < 10; i++) {
		      $('#pubtfc_search_suggest').append('<li class="" onclick="CSB.pubTfcSearchSuggestClick(this);">'
		      	+suggests[i]['name']
		      	+'<small>-'+suggests[i]['address']
		      	+'</small></li>');
		    }
		}

	    $('#pubtfc_search_suggest').slideDown();
	},

	pubTfcSearchSuggestClick: function(ele){
		clearTimeout(this.timeoutTask);

		var keyword = $(ele).text().split('-')[1]+$(ele).text().split('-')[0];
		var showKeyword = $(ele).text().split('-')[0];
		$(this.suggestInputEle).val(showKeyword);
		$('#pubtfc_search_suggest').slideUp();

		if ($(ele).find('i').length > 0) {
			var lng = $(ele).find('i').text().split(',')[0];
			var lat = $(ele).find('i').text().split(',')[1];

			// 设置隐藏经纬度
		    console.log(lng+','+lat);
		    var inputDiv = CSB.suggestInputEle.parentNode;
		    $(inputDiv).find('label').text(lng+','+lat);
		    CSB.syncPubTfcDrive();

		    //视角飞行至目的地
		    CVC.setView(lng, lat);
		    
		    return;
		}else{
			CSB.pubTfcSearchLatlng(keyword);
		}
	},

	pubTfcSearchLatlng: function(keyword){
		Tdt.poiSearch(keyword, this.pubTfcSearchLatlngCallback);
	},

	pubTfcSearchLatlngCallback: function(results){
		var resultType = parseInt(results.getResultType());
	    var lat;
	    var lng;
	    
	    if (resultType == 1 && results.getCount()>0) {//点
	      var pois = results.getPois();
	      lng = pois[0]['lonlat'].split(' ')[0];
		  lat = pois[0]['lonlat'].split(' ')[1];
	    }else if(resultType == 3){//面
	      var area = results.getArea();
	      lat = area['lonlat'].split(',')[1];
	      lng = area['lonlat'].split(',')[0];
	    }else{
	    	console.warn(results, resultType);
	    	$(CSB.suggestInputEle).val('');
	    	$(CSB.suggestInputEle).attr('placeholder', '未查找到地点！');
	    	CSB.syncPubTfcDrive();
	    	return;
	    }

	    // 设置隐藏经纬度
	    console.log(lng+','+lat);
	    var inputDiv = CSB.suggestInputEle.parentNode;
	    $(inputDiv).find('label').text(lng+','+lat);
	    CVC.setView(lng, lat);
	    CSB.syncPubTfcDrive();
	},

	//公共交通路线搜索
	pubTfcRouteSearch: function(){
		var strPoints = this.getPubTfcAllInputPoint();
		if (!strPoints) {console.warn('请输入正确的起点终点');return;}

		var startPoint = strPoints[0];
		var endPoint = strPoints[1];

		var policy = this.getPubTfcPolicy();
		Tdt.transitPlanning(startPoint, endPoint, policy, this.pubTfcRouteSearchCallback);

		$('.pubTfc_result_sum>p').text('开始公交线路规划...');
		$('.pubTfc_result_sum').removeClass('hiddenEle');

		$('.publicTraffic_search_result_list').empty();
	},

	//提取用户输入的起始点和途经点
	getPubTfcAllInputPoint: function(){
		var strPoints = new Array();

		var start = $('.pubTfc_route_start>label').text();
		var end = $('.pubTfc_route_end>label').text();

		if (start == '') {//起终点检查
			$('.pubTfc_route_start>input').val('');
			$('.pubTfc_route_start>input').attr('placeholder', '请输入正确的起点!');
			this.syncPubTfcDrive();
			return false;
		}else if (end == '') {
			$('.pubTfc_route_end>input').val('');
			$('.pubTfc_route_end>input').attr('placeholder', '请输入正确的终点!');
			this.syncPubTfcDrive();
			return false;
		}

		strPoints.push(start);
		strPoints.push(end);

		for (var i = 0; i < strPoints.length; i++) {
			strPoints[i] = new Array(strPoints[i].split(',')[0], strPoints[i].split(',')[1]);
		}

		return strPoints;
	},

	//设置路线规划策略
	setPubTfcPolicy: function(ele){
		$('.publicTraffic_strategy li').removeClass('policySelected');
		$(ele).addClass('policySelected');

		//触发驾车路线规划
		this.pubTfcRouteSearch();
	},

	//获取驾车策略
	getPubTfcPolicy: function(){
		var policy = 1;
		if ($('.fast_hov').hasClass('policySelected')) {
			policy = 1;
		}else if($('.no_subway').hasClass('policySelected')){
			policy = 8;
		}else if($('.few_transfer').hasClass('policySelected')){
			policy = 2;
		}else if($('.mini_walk').hasClass('policySelected')){
			policy = 4;
		}
		return policy;
	},

	//解析公交线路结果
	pubTfcRouteSearchCallback: function(results){

		var numPlans = results.getNumPlans();	console.log('公交换乘方案数--->', numPlans);
		if (numPlans == 0) {
			$('.pubTfc_result_sum>p').text('未搜索到公交线路方案，请尝试驾车搜索。');
			$('.pubTfc_result_sum').removeClass('hiddenEle');
		}else{
			$('.pubTfc_result_sum').addClass('hiddenEle');
		}

		$('.publicTraffic_search_result_list').empty();

        // 解析多种公交换乘方案
		for (var index = 0; index < numPlans; index++) {
			
			var plan = results.getPlan(index); //第一个方案
			var duration = plan.getDuration();
			var distance = plan.getDistance()/1000;
			var lineName = plan.getLineName();
			var transferNum = lineName.length-1;

			var lineTransfer = '';
			for (var i = 0; i < lineName.length; i++) {
				lineTransfer += lineName[i];
				if (i != lineName.length-1) {lineTransfer += '-> ';}
			}

			//路线方案序号
			transferDIV = '<div class="bus_clik" id="busLineP_'+index+'">\
	          <div class="busLineP_serial">\
	            <span>'+(index+1)+'</span>\
	          </div>';

	        //路线方案概要
	        transferDIV += '<div class="transfer_top_con" onclick="CSB.slidePubTfcDeatils(this);">\
	            <h5>'+lineTransfer+'</h5>\
	            <div class="cost_overview">\
	              <p>换乘'+transferNum+'次/约'+distance+'公里</p>\
	              <label>约'+duration+'分钟</label>\
	            </div> \
	          </div>';

	        //路线方案换乘详情
	        var transferDetailsDIV = CSB.prasePubTfcTransferDetails(plan);
	        transferDIV += transferDetailsDIV;
      
      	    transferDIV += '</div>';

      	    //向视图中添加换乘方案
	        $('.publicTraffic_search_result_list').append(transferDIV);
	    }

	    //展开第一种方案
        $('#busLineP_0').find('.transfer_top_con').trigger("click");
	},

	//解析一种公交换乘方案的详细换乘信息
	//返回换乘描述div（class=publicTraffic_search_result_list_route）
	prasePubTfcTransferDetails: function(plan){

		//创建起点终点标识
		var startLabel = '<div class="publicTraffic_route_result_list_start">\
          <div class="publicTraffic_route_result_list_startIcon"></div>\
          <p>'+$('.pubTfc_route_start>input').val()+'</p>\
        </div>';
	    var endLabel = '<div class="publicTraffic_route_result_list_end">\
          <div class="publicTraffic_route_result_list_endIcon"></div>\
          <p>'+$('.pubTfc_route_end>input').val()+'</p>\
        </div>';

        //开始构建换乘详情div
        var transferDetailsDIV = '<div class="publicTraffic_search_result_list_route hiddenEle">';

        transferDetailsDIV+= startLabel;
		transferDetailsDIV+= '<div class="publicTraffic_route_result_list">';
		for (var i = 0; i < plan.getNumSegments(); i++) {
			var detail = plan.getDetails(i);

			var segmentType = detail.getSegmentType(); //获得本路段类型  1表示步行；2表示公交；3表示地铁；4表示地铁站内换乘。
			var stationStart = detail.getStationStart(); //获得本路段的起点
			var stationEnd = detail.getStationEnd(); //获得本路段的终点
			var segmentLine = detail.getSegmentLine(); //获得本路段的详细描述

			if (stationStart['name'] == '' && i == 0) {
				stationStart['name'] = '起点';
			}else if (stationEnd['name'] == '' && i == plan.getNumSegments()-1) {
				stationEnd['name'] = '终点';
			}

			var segmentIcon = 'walkIcon'; //交通方式图标
			var segmentDistance = ''; //距离/站数
			var segmentTypeDesc = '乘坐';
			if (segmentType == 1) { 
				segmentIcon = 'walkIcon';
				segmentDistance = segmentLine[0]['segmentDistance'] + '米';
				segmentTypeDesc = '步行';
			}else if(segmentType == 2){
				segmentIcon = 'busIcon';
				segmentDistance = segmentLine[0]['segmentStationCount'] + '站';
				segmentTypeDesc = '乘坐';
			}else if(segmentType == 3){
				segmentIcon = 'metroIcon';
				segmentDistance = segmentLine[0]['segmentStationCount'] + '站';
				segmentTypeDesc = '乘坐';
			}else if(segmentType == 4) { //换乘
				continue;
			}

			var segment = '<div class="publicTraffic_route_result_list2"  onclick="CSB.pubTfcFoces(this);">\
			    <div class="metro_pub_left '+segmentIcon+'"></div>\
			    <p>从'+stationStart['name']+segmentTypeDesc+'<font color="#5696DE">'+segmentLine[0]['lineName']+'</font>'+'至'+stationEnd['name']+'</p>\
			    <h6>'+segmentDistance+'</h6>\
			    <label style="display:none;">'+segmentLine[0]['linePoint']+'</label>\
			  </div>\
			  <hr>';

			transferDetailsDIV+= segment;
		}
		transferDetailsDIV+= '</div>';
		transferDetailsDIV+= endLabel;
		transferDetailsDIV+= '</div>';

		return transferDetailsDIV;
	},

	//展开、收起公交线路详情
	slidePubTfcDeatils: function(ele){
		var planArr = $('.publicTraffic_search_result_list .bus_clik');
		for (var i = 0; i < planArr.length; i++) {
			if(planArr[i].id == ele.parentNode.id){
				$(planArr[i]).find('.publicTraffic_search_result_list_route').removeClass('hiddenEle');
				this.showPubTfcLine(planArr[i].id);
			}else{
				$(planArr[i]).find('.publicTraffic_search_result_list_route').addClass('hiddenEle');
			}
		}
	},

	//显示一种公交规划方案的完整路线
	showPubTfcLine: function(planEleId){
		var labels = $('#'+planEleId+' .publicTraffic_route_result_list').find('label');
		var lnglatArr = '';
		for (var i = 0; i < labels.length; i++) {
			lnglatArr += $(labels[i]).text();
		}

		lnglatArr = lnglatArr.replace(new RegExp(";","gm"), ','); //替换全部
		lnglatArr = lnglatArr.split(',');
		lnglatArr.pop(); //去掉最后一个空值

		for (var i = 0; i < lnglatArr.length; i++) {
			lnglatArr[i] = parseFloat(lnglatArr[i]);
		}

	    CVC.drawGlowLine(lnglatArr);

	    var points = new Array();
	    for (var i = 0; i < lnglatArr.length; i++) {
	    	points.push(lnglatArr[i]);
	    }
        CVC.flyToMiniRect(points);

        var lzwPoints = new Array(lzWP(points[0], points[1]), lzWP(points[points.length-2], points[points.length-1]));
        CVC.createRouteNodeMark(lzwPoints);
	},

	pubTfcFoces: function(ele){
		var pointsStr = $(ele).find('label').text();

		pointsStr = pointsStr.replace(new RegExp(";","gm"), ','); //替换全部
		pointsStr = pointsStr.split(',');
		pointsStr.pop(); //去掉最后一个空值

		var points = new Array(pointsStr.length);
		for (var i = 0; i < pointsStr.length; i++) {
			points[i] = parseFloat(pointsStr[i]);
		}

		CVC.focusLine(points);
		CVC.flyToMiniRect(points);
	}
};


//map navigate select list, CSB元素的附属页面元素
var MNSL = {
	startPoint: null,
	endPoint: null,
	type: null,
	mode: null,

	showThis: function(type, modeOrPoint){
		var flag = this.init(type, modeOrPoint);
		if (flag) {
			$('#mapNaviList').fadeIn('fast');
		}
	},

	hiddenThis: function(){
		$('#mapNaviList').fadeOut('fast');
	},

	//初始化第三方导航，type表示调用位置标记/导航，mode
	init: function(type, modeOrPoint){
		this.type = type;
		if(type == 'navi'){
			var mode = modeOrPoint;
			var points = CSB.getStartEndPoints();
			if (!points) {
				return false;
			}

			this.startPoint = points[0];
			this.endPoint = points[1];
			this.mode = mode;
		}else if(this.type == 'mark'){
			var point = modeOrPoint;
			this.endPoint = point;
		}
		return true;
	},

	callExternalMaps: function(mapType){
		if (this.type == 'navi') {
			MNSL.callExternalMapsNavi(mapType);
		}else if(this.type == 'mark'){
			MNSL.callExternalMapsMark(mapType);
		}else{
			console.warn('出现未知的操作类型！');
		}
	},

	callExternalMapsMark: function(mapType){

		switch(mapType){
			case '百度':
				NNB.callBaiduMapMark(this.endPoint);
				break;
			case '苹果':
				NNB.callIOSNativeMapMark(this.endPoint);
				break;
			case '高德':
				NNB.callAliMapMark(this.endPoint);
				break;
			case '腾讯':
				NNB.callQqMapMark(this.endPoint);
				break;
			default:
				console.warn('未知的第三方地图类型！');
		}

		this.hiddenThis();
	},

	//调用外部地图
	callExternalMapsNavi: function(mapType){
		
		switch(mapType){
			case '百度':
				NNB.callBaiduMapNavi(this.startPoint, this.endPoint, this.mode);
				break;
			case '苹果':
				NNB.callIOSNativeMapNavi(this.startPoint, this.endPoint, this.mode);
				break;
			case '高德':
				NNB.callAliMapNavi(this.startPoint, this.endPoint, this.mode);
				break;
			case '腾讯':
				NNB.callQqMapNavi(this.startPoint, this.endPoint, this.mode);
				break;
			default:
				console.warn('未知的第三方地图类型！');
		}

		this.hiddenThis();
		
	},


}



// 操作cesium视图  cesium view control
var CVC = {
	locationHighlight: null,
	locationMarkArr: new Array(),
	glowingLine: null,
	glowingRedLine: null,
	routeNodeMark: new Array(),

	clearAll: function(){
		this.clearGlowLine();
		this.unfocusLine();
		this.clearRouteNodeMark();
		this.clearLocationBillboard();
		this.locationUnfocus();
	},

	setView: function(lng, lat){
		viewer.camera.setView({
		    destination : Cesium.Cartesian3.fromDegrees(lng, lat, 5000.0)
		});
	},

	//获取视野矩形边界范围
	getScopeBounds: function(){
		var cRecatangle = viewer.camera.computeViewRectangle();

		var bounds = new Array();
		bounds['west'] = Cesium.Math.toDegrees(cRecatangle.west);
		bounds['east'] = Cesium.Math.toDegrees(cRecatangle.east);
		bounds['south'] = Cesium.Math.toDegrees(cRecatangle.south);
		bounds['north'] = Cesium.Math.toDegrees(cRecatangle.north);

		return bounds;
	},

	flyTo: function (lng, lat) {
		viewer.camera.flyTo({
		    destination : Cesium.Cartesian3.fromDegrees(lng, lat, 2500.0),
		    duration : 1
	    });
	},

	flyToMiniRect: function(latlngArr){
		var minLat= latlngArr[1];
		var maxLat= latlngArr[1];
		var minLng= latlngArr[0];
		var maxLng= latlngArr[0];
		for (var i = 0; i < latlngArr.length; i++) {
			if (i%2 == 1) {
				minLat = minLat > latlngArr[i] ? latlngArr[i] : minLat;
				maxLat = maxLat < latlngArr[i] ? latlngArr[i] : maxLat;
			}else{
				minLng = minLng > latlngArr[i] ? latlngArr[i] : minLng;
				maxLng = maxLng < latlngArr[i] ? latlngArr[i] : maxLng;
			}

		}

		var marginV = (maxLng-minLng)/3;
		var marginH = (maxLat-minLat)/3;

		var rect = Cesium.Rectangle.fromDegrees(minLng-marginV, minLat-marginH, maxLng+marginV, maxLat+marginH);
		viewer.camera.flyTo({
	      destination : rect
	    });
	},

	addLocationBillboard: function(lng, lat){
		var entity = viewer.entities.add({
	        position : Cesium.Cartesian3.fromDegrees(lng, lat),
	        billboard :{
	            image : '/public/img/spotlight_poi.png',
	            width : 22,
	            height : 40,
	            verticalOrigin : Cesium.VerticalOrigin.BOTTOM
        	}
    	});
		this.locationMarkArr.push(entity);
		return entity;
	},

	clearLocationBillboard: function(){
		for (var i = 0; i < this.locationMarkArr.length; i++) {
			viewer.entities.remove(this.locationMarkArr[i]);
		}
	},

	locationFocus: function(lng, lat){
		this.locationUnfocus();
		this.flyTo(lng, lat);
		
	    this.locationHighlight = viewer.entities.add({
	        position : Cesium.Cartesian3.fromDegrees(lng, lat),
	        point : {
	            show : true,
	            color : Cesium.Color.SKYBLUE.withAlpha(0.9),
	            pixelSize : 8,
	            outlineColor : Cesium.Color.YELLOW.withAlpha(0.5),
	            outlineWidth : 2
	        }
    	});
	},

	locationUnfocus: function(){
		if (this.locationHighlight) {
			viewer.entities.remove(this.locationHighlight);
			this.locationHighlight = null;
		}
	},

	//绘制线条（路线）
	drawGlowLine: function(points){
		console.log('-->draw polyline');
		this.clearGlowLine();

		var polylineEntity = viewer.entities.add({
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
		this.glowingLine = polylineEntity;
	},

	//清除线路
	clearGlowLine: function(){
		if (this.glowingLine) {
		  viewer.entities.remove(this.glowingLine);
		  this.glowingLine = null;
		}
	},

	focusLine: function(points){
		this.unfocusLine();

		var polylineEntity = viewer.entities.add({
		  name : 'Glowing red line',
		  polyline : {
		    positions : Cesium.Cartesian3.fromDegreesArray(points),
		    width : 13,
		    material : new Cesium.PolylineGlowMaterialProperty({
		      glowPower : 0.5,
		      color : Cesium.Color.RED
		    })
		  }
		});
		this.glowingRedLine = polylineEntity;
	},

	unfocusLine: function(){
		if (this.glowingRedLine) {
		  viewer.entities.remove(this.glowingRedLine);
		  this.glowingRedLine = null;
		}
	},

	//创建路径起点 途经点 终点 billboard
	createRouteNodeMark: function(pointsArr){

		this.clearRouteNodeMark();

		for (var i = 0; i < pointsArr.length; i++) {
			var img = '';
			if (i == 0) {img = '/public/img/startPoint.png'}
			else if (i == pointsArr.length-1) {img = '/public/img/endPoint.png'}
			else {img = '/public/img/throughPoint.png'}

			var entity = viewer.entities.add({
		        position : Cesium.Cartesian3.fromDegrees(pointsArr[i].lng, pointsArr[i].lat),
		        billboard :{
		            image : img,
		            width : 30,
		            height : 50,
		            pixelOffset : new Cesium.Cartesian2(0.0, -30)
	        	}
	    	});
			this.routeNodeMark.push(entity);
		}	
	},

	clearRouteNodeMark: function(){
		for (var i = 0; i < this.routeNodeMark.length; i++) {
			viewer.entities.remove(this.routeNodeMark[i]);
		}
	}
};




// 天地图数据请求功能模块
var Tdt = {
	map: null,
	multiDrivePlanningConfig: {
		pointArr: new Array(),
		resultArr: new Array(),
		outCallback: null,
		innerCallbackTimes: 0
	},

	//创建地图对象
	init: function(){
		if (!this.map) {
			try{
				this.map = new TMap('mapDiv');
				this.map.centerAndZoom(new TLngLat(116.40969, 39.89945), 12);

			}catch(err){
				console.warn('天地图对象初始化错误, 将无法调用相关功能', err);
			}
		}
	},

	setScope: function(){
		var bounds = CVC.getScopeBounds();
		var west = bounds['west'];
		var east = bounds['east'];
		var south = bounds['south'];
		var north = bounds['north'];

		var northeast = new TLngLat(east, north);
		var southwest = new TLngLat(west, south);
		var arr = new Array(northeast, southwest);
		this.map.setViewport(arr);
	},

	poiSuggest: function(keyword, callback){
		this.init();
		this.setScope();
		var config = {
			onSearchComplete: callback
		};
		var localsearch = new TLocalSearch(this.map, config);
    	localsearch.search(keyword, 4);
    	console.log('search suggest ' + keyword);
	},

	poiSearch: function(keyword, callback){
		this.init();
		this.setScope();
		var config = {
			pageCapacity: 50,
			onSearchComplete: callback
		};
		var localsearch = new TLocalSearch(this.map, config);
    	localsearch.search(keyword, 1);
    	console.log('search poi ' + keyword);
	},

	//矩形区域内搜索
	poiSearchInBounds: function(keyword, callback){
		this.init();
		this.setScope();

		//设置当前视野边界
		var b = CVC.getScopeBounds();
		var bounds = new TBounds(b['west'], b['south'], b['east'], b['north']); 

		var config = {
			pageCapacity: 50,
			onSearchComplete: callback
		};
		var localsearch = new TLocalSearch(this.map, config);
    	localsearch.searchInBounds(keyword, bounds);
    	console.log('search poi in bounds' + keyword);
	},

	// 多点导航（带途经点）
	multiDrivePlanning: function(pointArr, policy, outCallback){
		this.multiDrivePlanningConfig.pointArr = new Array();
		this.multiDrivePlanningConfig.outCallback = outCallback;
		this.multiDrivePlanningConfig.innerCallbackTimes = 0;
		
		for (var i = 0; i < pointArr.length-1; i++) {
			Tdt.drivePlanning(pointArr[i], pointArr[i+1], policy, Tdt.multiDrivePlanningCallback);
			this.multiDrivePlanningConfig.pointArr.push(new TLngLat(pointArr[i][0], pointArr[i][1]));
		}
		this.multiDrivePlanningConfig.resultArr = new Array(this.multiDrivePlanningConfig.pointArr);
	},

	//多点导航回调
	multiDrivePlanningCallback: function(result){
		//若返回为空，在该回调函数被调用前，天地图内部代码即会报错
		var startPoint = result.getPlan().getPath()[0];

		for (var i = 0; i < Tdt.multiDrivePlanningConfig.pointArr.length; i++) {
			var latlng = Tdt.multiDrivePlanningConfig.pointArr[i];

			if (latlng.getLng() == startPoint.getLng() && latlng.getLat() == startPoint.getLat()) {
				Tdt.multiDrivePlanningConfig.resultArr[i] = result;
			}
		}

		Tdt.multiDrivePlanningConfig.innerCallbackTimes++;
		console.info('收到路线回调', Tdt.multiDrivePlanningConfig.innerCallbackTimes);

		if(Tdt.multiDrivePlanningConfig.innerCallbackTimes == Tdt.multiDrivePlanningConfig.pointArr.length){
			//全部请求均已收到回复，准备调用外部回调
			console.info('路线回调已全部收到，调用外部回调');
			Tdt.multiDrivePlanningConfig.outCallback(Tdt.multiDrivePlanningConfig.resultArr);
		}
	},

	drivePlanning: function(startPoint, endPoint, policy, callback){
	    this.init();
	    
	    var drivingRoute = new TDrivingRoute(this.map);

	    //设置规划策略(0-最少时间；1-最短距离；2-避开高速；3-步行), 和回调函数
	    drivingRoute.setPolicy(policy);
	    drivingRoute.setSearchCompleteCallback(callback);

		var startLngLat = new TLngLat(startPoint[0], startPoint[1]);
	    var endLngLat = new TLngLat(endPoint[0], endPoint[1]);

	    //启动驾车路线搜索
	    drivingRoute.search(startLngLat, endLngLat);
	},

	transitPlanning: function(startPoint, endPoint, policy, callback){
		this.init();

		//创建公交搜索对象
    	transitRoute = new TTransitRoute(this.map, {policy:1});

    	//设置规划策略(1-最少时间；2-最少换乘；4-最少步行；8-不坐地铁), 和回调函数
	    transitRoute.setPolicy(policy);
	    transitRoute.setSearchCompleteCallback(callback);

	    var startLngLat = new TLngLat(startPoint[0], startPoint[1]);
	    var endLngLat = new TLngLat(endPoint[0], endPoint[1]);

	    transitRoute.search(startLngLat,endLngLat);
	}
}


//该类用于在WEB应用中调起移动端导航软件
//目前支持百度地图、高德地图、苹果自带地图
var NNB = {
	iosNativeMapUrl: 'http://maps.apple.com/', //苹果地图
	BaidMapUrl: 'http://api.map.baidu.com/', //百度地图
	AliMapUrl: 'http://uri.amap.com/', //高德地图
	QqMapUrl: 'http://apis.map.qq.com/tools/', //腾讯地图

	callIOSNativeMapMark: function(endPoint){
		//p苹果使用高德地图。由于高德内部错误，调用导航规划时需要预先调用坐标转换，将坐标转换为高德坐标
		var win = window.open();
		$.ajax({
		    type: 'GET',
		    url: 'http://restapi.amap.com/v3/assistant/coordinate/convert?locations='+endPoint.lng+','+endPoint.lat+'&coordsys=gps&key=d2fc71c7da13f2e09698d915237b7900&output=JSON',
		    dataType: 'json', //返回的数据格式
		    error: function(XMLHttpRequest){
		        console.error('服务器响应异常：' + XMLHttpRequest.status);
		    },
		    success: function(result){
		    	if (result['status'] != '1') {console.warn('高德坐标系转换错误', result['status']);}
		    	
				var paras = new Array();
				paras['ll'] = result['location'];
				paras['q'] = endPoint.name;

				var url = NNB.iosNativeMapUrl+'?'+NNB.KV2Str(paras);console.info(url);
				win.location = url;
			}
		});
	},

	callIOSNativeMapNavi: function(startPoint, endPoint, mode){
		//p苹果使用高德地图。由于高德内部错误，调用导航规划时需要预先调用坐标转换，将坐标转换为高德坐标
		var win = window.open();
		$.ajax({
		    type: 'GET',
		    url: 'http://restapi.amap.com/v3/assistant/coordinate/convert?locations='+startPoint.lng+','+startPoint.lat+'|'+endPoint.lng+','+endPoint.lat+'&coordsys=gps&key=d2fc71c7da13f2e09698d915237b7900&output=JSON',
		    dataType: 'json', //返回的数据格式
		    error: function(XMLHttpRequest){
		        console.error('服务器响应异常：' + XMLHttpRequest.status);
		    },
		    success: function(result){
		    	if (result['status'] != '1') {console.warn('高德坐标系转换错误', result['status']);}
		    	var points = result['locations'].split(';');

				var paras = new Array();
				paras['ll'] = points[1];
				paras['daddr'] = endPoint.name;
				paras['q'] = endPoint.name;
				paras['sll'] = points[0];
				paras['saddr'] = startPoint.name;
				paras['dirflg'] = mode == 'pubTfc' ? 'r' : 'd';

				var url = NNB.iosNativeMapUrl+'?'+NNB.KV2Str(paras);console.info(url);
				win.location = url;
			}
		});
	},

	callAliMapMark: function(endPoint){
		var paras = new Array();
		paras['position'] = endPoint.lng+','+endPoint.lat;
		paras['name'] = endPoint.name;
		paras['coordinate'] = 'wgs84';
		paras['callnative'] = '1';

		var url = this.AliMapUrl+'marker'+'?'+NNB.KV2Str(paras);
		window.open(url);
	},

	callAliMapNavi: function(startPoint, endPoint, mode){
		//由于高德内部错误，调用导航规划时需要预先调用坐标转换，将坐标转换为高德坐标
		var win = window.open();
		$.ajax({
		    type: 'GET',
		    url: 'http://restapi.amap.com/v3/assistant/coordinate/convert?locations='+startPoint.lng+','+startPoint.lat+'|'+endPoint.lng+','+endPoint.lat+'&coordsys=gps&key=d2fc71c7da13f2e09698d915237b7900&output=JSON',
		    dataType: 'json', //返回的数据格式
		    error: function(XMLHttpRequest){
		        console.error('服务器响应异常：' + XMLHttpRequest.status);
		    },
		    success: function(result){
		    	console.log(result);
		    	if (result['status'] != '1') {console.warn('高德坐标系转换错误', result['status']);}
		    	var points = result['locations'].split(';');

		    	var paras = new Array();
				paras['from'] = points[0]+','+startPoint.name;
				paras['to'] = points[1]+','+endPoint.name;
				paras['mode'] = mode == 'pubTfc' ? 'bus' : 'car';
				paras['coordinate'] = 'gaode';
				paras['callnative'] = '1';

				var url = NNB.AliMapUrl+'navigation'+'?'+NNB.KV2Str(paras);console.info(url);
				win.location = url;
		    }
		  });
	},

	callBaiduMapMark(endPoint){
		var paras = new Array();
		paras['location'] = endPoint.lat+','+endPoint.lng;
		paras['title'] = endPoint.name;
		paras['content'] = endPoint.name;
		paras['output'] = 'html';
		paras['coord_type'] = 'wgs84';
		paras['src'] = '北斗农业·中国|北斗农业·中国';

		var url = this.BaidMapUrl+'marker'+'?'+NNB.KV2Str(paras);
		window.open(url);
	},

	callBaiduMapNavi: function(startPoint, endPoint, mode){
		var paras = new Array();
		paras['origin'] = 'latlng:'+startPoint.lat+','+startPoint.lng+'|name:'+startPoint.name;
		paras['destination'] = 'latlng:'+endPoint.lat+','+endPoint.lng+'|name:'+endPoint.name;
		paras['origin_region'] = '上海';
		paras['destination_region'] = '上海';
		paras['mode'] = mode == 'pubTfc' ? 'transit' : 'driving';
		paras['output'] = 'html';
		paras['coord_type'] = 'wgs84';
		paras['src'] = '北斗农业·中国|北斗农业·中国';

		var url = this.BaidMapUrl+'direction'+'?'+NNB.KV2Str(paras);console.info(url);
		window.open(url);
	},

	callQqMapMark(endPoint){
		var paras = new Array();
		paras['type'] = '0';
		paras['marker'] = 'coord:' + endPoint.lat + ',' + endPoint.lng + ';title:' + endPoint.name + ';addr:' + endPoint.name + ';coordtype:1';
		// paras['coord_type'] = '1';
		paras['key'] = 'YIHBZ-C2AHS-AWJOS-66IJZ-IXIY5-XUB2N';
		paras['referer'] = '北斗农业·中国';

		var url = this.QqMapUrl+'poimarker'+'?'+NNB.KV2Str(paras);console.info(url);
		window.open(url);
	},

	callQqMapNavi(startPoint, endPoint, mode){
		var paras = new Array();
		paras['sword'] = startPoint.name;
		paras['spointx'] = startPoint.lng;
		paras['spointy'] = startPoint.lat;
		paras['eword'] = endPoint.name;
		paras['epointx'] = endPoint.lng;
		paras['epointy'] = endPoint.lat;
		paras['transport'] = mode == 'pubTfc' ? '1' : '2';;
		paras['coordtype'] = '1';

		var paras_ = new Array();
		paras_['back'] = '0';
		paras_['key'] = 'YIHBZ-C2AHS-AWJOS-66IJZ-IXIY5-XUB2N';
		paras_['referer'] = '北斗农业·中国';

		//构造规则依据http://lbs.qq.com/tool/component-route.html
		var url = this.QqMapUrl + 'routeplan/' + NNB.KV2Str(paras) + '?' + NNB.KV2Str(paras_);
		window.open(url);
	},


	//将键值对数组转换为字符串形式
	KV2Str: function(kvArr){
		var str = '';
		for (key in kvArr) {
			str += '&' + key + '=' + kvArr[key];
		}console.log(str, str.length);
		str = str.substring(1);console.log(str);
		return str;
	}
}


//导航功能与北斗农业耦合部分
var NAVI_BDNY = {

	searchAll: function(callback){
		var form = new FormData();
		form.append('requestOpt', '_searchEntity');
		form.append('text', '');
		form.append('1', true);
		form.append('2', true);
		form.append('3', true);
		form.append('4', true);
		form.append('11', true);
		form.append('12', true);
		form.append('13', true);
		form.append('14', true);
		form.append('21', true);

		sendPostFormObj(form, '/controll/ControllTest.php', callback);
	},

	searchByType: function(type, callback){
		var form = new FormData();
		form.append('requestOpt', '_searchEntity');
		form.append('text', '');
		form.append(type, true);

		sendPostFormObj(form, '/controll/ControllTest.php', callback);
	},

	searchByKwd: function(keyword, callback){
		//全部查询
		var typeSearchFlagArr = new Array(true, true, true, true, true, true, true, true, true, true, true);
		var form = new FormData();
	    form.append('requestOpt', '_searchEntity');
		form.append('text', keyword);
		form.append('1', typeSearchFlagArr[0]);
		form.append('2', typeSearchFlagArr[1]);
		form.append('3', typeSearchFlagArr[2]);
		form.append('4', typeSearchFlagArr[3]);
		form.append('11', typeSearchFlagArr[4]);
		form.append('12', typeSearchFlagArr[5]);
		form.append('13', typeSearchFlagArr[6]);
		form.append('14', typeSearchFlagArr[7]);
		form.append('21', typeSearchFlagArr[8]);

		sendPostFormObj(form, '/controll/ControllTest.php', callback);
	},

	hideOtherBox: function(){
		$('.compass').hide();
		$('.navigation-controls').hide();

		weatherBox.reset(); //关闭天气控件的展开
	},

	showOtherBox: function(){
		$('.compass').show();
		$('.navigation-controls').show();
	}
}
