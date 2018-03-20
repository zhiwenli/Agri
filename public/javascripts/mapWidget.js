
//对象1 wigets
function mapWidget(viewer,scene,ellipsoid,device)
{
	this.viewer = viewer;
	this.scene = scene;
	this.ellipsoid = ellipsoid;
	this.device = device;
	this.movePick = movePick;
	this.getcamera = getcamera;
	this.showScalebar = showScalebar;
	this.doCompass = doCompass;
	this.doNavi = doNavi;
	this.getStyle = getStyle;
	this.getNum = getNum;
	this.toRingRad = toRingRad;
	this.showlonlat = showlonlat;
	this.homeView = {destination:Cesium.Rectangle.fromDegrees(106.940573 - 12, 33.808406 + 12, 106 + 12, 33 - 12)};
	
	this.zoomRate = this.getcamera().carto.height/10;
	this.clickZoomIn = clickZoomIn;
	this.clickZoomOut = clickZoomOut;
	this.drawGraticule = drawGraticule;
}
	//经纬度高度获取
	function movePick()
	{
		var terrainlevel = 11;
 		if(this.device=="mobile"){
			/*mobile开始*/
			document.write("<div class=\"cesium-toolbar2\" id=\"cameraView\"><span id=\"long\">东经 106.9405°</span>;<span id=\"lat\"  style=\"padding-left: 2px;\">\t北纬 33.8084°</span><span style=\"padding-left: 2px;\" id=\"height\"></span>");
			$('#cameraView').css('font-size',this.device=="mobile"?"11px":"20px");
			var scene = this.scene;
			var ellipsoid =this.ellipsoid;
			var terrainProvider = new Cesium.CesiumTerrainProvider({//无法获取terrainprovider
				url : '//assets.agi.com/stk-terrain/world'
			});
			var handler;
			var previous = {'lon':'','lat':''};
			handler = new Cesium.ScreenSpaceEventHandler(scene.canvas);
			handler.setInputAction(function(movement) {
				var cartesian = this.viewer.camera.pickEllipsoid(movement.position, ellipsoid);
				var ray = this.viewer.camera.getPickRay(movement.position);
				var position = scene.globe.pick(ray, scene);
				
				if (cartesian||Cesium.defined(position)) {
					var cartographic = ellipsoid.cartesianToCartographic(cartesian);
					
					var longitude = Cesium.Math.toDegrees(cartographic.longitude);
					var longitudeString = this.showlonlat(longitude,'lon','mobile');
					var latitude = Cesium.Math.toDegrees(cartographic.latitude);
					var latitudeString = this.showlonlat(latitude,'lat','mobile');
					
					
					previous.lon = longitude;
					previous.lat = latitude;
					if(this.viewer.camera._mode === Cesium.SceneMode.SCENE3D&&Cesium.defined(position)){
						var positionCartographic = ellipsoid.cartesianToCartographic(position);
						var positions =[positionCartographic];
						var promise = Cesium.sampleTerrain(terrainProvider, terrainlevel, positions);  
						promise.then(function() {
							var height=positions[0].height.toFixed(0);
							var heightString;
							if(height)
								heightString = height;
							else heightString = "";
							document.getElementById("height").innerHTML=";\t海拔 "+heightString+"米";
						  }).otherwise(function(error){
							  //Display any errrors encountered while loading.
							  document.getElementById("height").innerHTML="";
						  });
					}
					//解决二维视图下双击选中跟踪对象时，鼠标获取经纬度清零问题
					if(this.viewer.camera._mode === Cesium.SceneMode.SCENE2D){
						if(Cesium.defined(this.viewer.trackedEntity)){
							var trackedCarto = ellipsoid.cartesianToCartographic(this.viewer.trackedEntity.position.getValue(this.viewer.clock.currentTime));
							var trackedLon = Cesium.Math.toDegrees(trackedCarto.longitude);
							var trackedLat = Cesium.Math.toDegrees(trackedCarto.latitude);
							longitudeString = this.showlonlat(longitude+trackedLon,'lon','pc');
							latitudeString = this.showlonlat(latitude+trackedLat,'lat','pc');
						}
					}
					document.getElementById("long").innerHTML=longitudeString;
					document.getElementById("lat").innerHTML="    \t"+latitudeString;
				} else {
					document.getElementById("long").innerHTML=this.showlonlat(previous.lon,'lon','mobile');
					document.getElementById("lat").innerHTML="    \t"+this.showlonlat(previous.lat,'lat','mobile');
					document.getElementById("height").innerHTML="";
				}
				//console.log(this.zoomRate);
			}, Cesium.ScreenSpaceEventType.LEFT_CLICK);
			/*mobile结束*/
		}
		/*-----PC端显示开始-----*/
		else{
			document.write("<div class=\"cesium-toolbar2\" id=\"cameraView\"><span id=\"long\">经度：</span><span id=\"lat\"  style=\"padding-left: 10px;\">    \t纬度：</span><span id=\"height\"  style=\"padding-left: 10px;\">    \t海拔：</span><span id=\"viewheight\"  style=\"padding-left: 10px;\">    \t视角高程：</span></div>\"");
			var scene = this.scene;
			var ellipsoid =this.ellipsoid;
			var terrainProvider = new Cesium.CesiumTerrainProvider({//无法获取terrainprovider
				url : '//assets.agi.com/stk-terrain/world'
			});
			var handler;
			handler = new Cesium.ScreenSpaceEventHandler(scene.canvas);
			handler.setInputAction(function(movement) {
				var cartesian = this.viewer.camera.pickEllipsoid(movement.endPosition, ellipsoid);
				var ray = this.viewer.camera.getPickRay(movement.endPosition);
				var position = scene.globe.pick(ray, scene);
				
				if (cartesian||Cesium.defined(position)) {
					var cartographic = ellipsoid.cartesianToCartographic(cartesian);
					var longitude = Cesium.Math.toDegrees(cartographic.longitude);
					var longitudeString = this.showlonlat(longitude,'lon','pc');
					var latitude = Cesium.Math.toDegrees(cartographic.latitude);
					var latitudeString = this.showlonlat(latitude,'lat','pc');
					var heightString = '';// = positionCartographic.height.toFixed(2);//cartographic.height.toFixed(2);
					
					var cameraheight0 = this.getcamera().carto.height;
					this.zoomRate = cameraheight0/10;
					//var cameraheight = cameraheight0.toFixed(0);
					//if(this.viewer.camera._mode === Cesium.SceneMode.COLUMBUS_VIEW) document.getElementById("height").innerHTML="";
					if(this.viewer.camera._mode === Cesium.SceneMode.SCENE3D&&Cesium.defined(position)){
						var positionCartographic = ellipsoid.cartesianToCartographic(position);
						var positions =[positionCartographic];
						var promise = Cesium.sampleTerrain(terrainProvider, terrainlevel, positions);  
						promise.then(function() {
							var height=positions[0].height.toFixed(2);
							var heightString;
							if(height)
								heightString = height;
							else heightString =  "未定义";
							document.getElementById("height").innerHTML='\t'+"海拔: "+heightString+' 米';
						  }).otherwise(function(error){
							  //Display any errrors encountered while loading.
							  document.getElementById("height").innerHTML="	\t海拔: 未定义";
						  });
					}
					else{ 
						document.getElementById("height").innerHTML="";
					}
					//解决二维视图下双击选中跟踪对象时，鼠标获取经纬度清零问题
					//但是由于真正获取的经纬度不在鼠标位置，所以会遇到到达一定纬度，就获取不到当前纬度的情况，无法解决
					if(this.viewer.camera._mode === Cesium.SceneMode.SCENE2D){
						if(Cesium.defined(this.viewer.trackedEntity)){
							// console.log(this.viewer.trackedEntity.position.getValue(this.viewer.clock.currentTime));
							var trackedCarto = ellipsoid.cartesianToCartographic(this.viewer.trackedEntity.position.getValue(this.viewer.clock.currentTime));
							var trackedLon = Cesium.Math.toDegrees(trackedCarto.longitude);
							var trackedLat = Cesium.Math.toDegrees(trackedCarto.latitude);
							longitudeString = this.showlonlat(longitude+trackedLon,'lon','pc');
							latitudeString = this.showlonlat(latitude+trackedLat,'lat','pc');
						}
					}
					document.getElementById("long").innerHTML="经度: "+longitudeString;
					document.getElementById("lat").innerHTML="    \t纬度: "+latitudeString;
					if(cameraheight0>1000)
						document.getElementById("viewheight").innerHTML= "    \t视角高程: "+(cameraheight0/1000).toFixed(2)+" 公里";
					else document.getElementById("viewheight").innerHTML= "    \t视角高程: "+cameraheight0.toFixed(0)+" 米";
					//document.getElementById("viewheight").innerHTML="    \t视角高程: "+cameraheight+' 米';
					
				} else {
					document.getElementById("long").innerHTML="经度：";
					document.getElementById("lat").innerHTML="    \t纬度：";
					document.getElementById("height").innerHTML="    \t海拔：";
					
				}
				//console.log(this.zoomRate);
			}, Cesium.ScreenSpaceEventType.MOUSE_MOVE);
			
			handler.setInputAction(function() {
				var cameraheight0 = this.getcamera().carto.height;
				this.zoomRate = cameraheight0/10;
				//var cameraheight = cameraheight0.toFixed(0);
				//console.log(this.zoomRate);
				if(cameraheight0>1000)
					document.getElementById("viewheight").innerHTML= "    \t视角高程: "+(cameraheight0/1000).toFixed(2)+" 公里";
				else document.getElementById("viewheight").innerHTML= "    \t视角高程: "+cameraheight0.toFixed(0)+" 米";
			}, Cesium.ScreenSpaceEventType.WHEEL);	
			
			var cameraheight0 = this.getcamera().carto.height;
			if(cameraheight0>1000)
				document.getElementById("viewheight").innerHTML= "    \t视角高程: "+(cameraheight0/1000).toFixed(2)+" 公里";
			else document.getElementById("viewheight").innerHTML= "    \t视角高程: "+cameraheight0.toFixed(0)+" 米"; 
			/*-----PC端显示结束-----*/
		}

	}
//当前相机信息获取
	function getcamera()
	{
		var scene = this.scene;
		var destination = this.viewer.camera.position;//.toString();
		var carto = Cesium.Ellipsoid.WGS84.cartesianToCartographic(destination);
		var ray = new Cesium.Ray(destination,this.viewer.camera.direction);
		var raypoint = scene.globe.pick(ray, scene);
		var rayCarto = raypoint?(Cesium.Ellipsoid.WGS84.cartesianToCartographic(raypoint)):false;
		var orientation = 
		{heading : this.viewer.camera.heading,
		pitch : this.viewer.camera.pitch,
		roll : this.viewer.camera.roll};
		var mycamera={destination:destination,carto:carto,orientation:orientation,rayCarto:rayCarto};
		
		return mycamera;
	}
	//显示比例尺
	function showScalebar(){
		var cesiumContainer = document.getElementById("cesiumContainer");
		var barWidth = 100;//等于 lineWidth + svgpadding * 2
		var device = this.device;
		var barHeight = (device=="mobile")?10:20;
		var lineWidth = 90;
		var svgpadding = 5;
		var barHTML='<svg id=\"svgscalebar\" width=\"'+barWidth+'px\" height=\"'+barHeight+'px\" version=\"1.1\"'+
			'xmlns=\"http://www.w3.org/2000/svg\">'+
			'<line x1=\"'+svgpadding+'\" y1=\"'+barHeight+'\" x2=\"'+(lineWidth+svgpadding)+'\" y2=\"'+barHeight+'\"'+
			'style=\"stroke:rgb(255,255,255);stroke-width:2\"/>'+
			'<line x1=\"'+svgpadding+'\" y1=\"'+svgpadding+'\" x2=\"'+svgpadding+'\" y2=\"'+barHeight+'\"'+
			'style=\"stroke:rgb(255,255,255);stroke-width:2\"/>'+
			'<line x1=\"'+(lineWidth+svgpadding)+'\" y1=\"'+svgpadding+'\" x2=\"'+(lineWidth+svgpadding)+'\" y2=\"'+barHeight+'\"'+
			'style=\"stroke:rgb(255,255,255);stroke-width:2\"/></svg>'
		var scaleContainer = document.createElement('div');
		scaleContainer.className = 'scalebar';
		scaleContainer.setAttribute('id','scaleContainer');
		scaleContainer.setAttribute('style','width:'+barWidth+'px;height:'+barHeight+'px;');
		cesiumContainer.appendChild(scaleContainer);
		document.getElementById("scaleContainer").innerHTML=barHTML;
		var scaleConWidth = this.getNum(this.getStyle(scaleContainer,'width'));
		var scaleConHeight = this.getNum(this.getStyle(scaleContainer,'height'));
		//console.log('scaleConHeight',scaleConHeight);
		var scaletext = document.createElement('div');
		scaletext.className = 'scalebar';
		scaletext.setAttribute('id','scaletext');
		scaletext.setAttribute('style','width:'+scaleConWidth+'px;height:'+scaleConHeight+'px;background:rgba(255,255,255,0);');

		cesiumContainer.appendChild(scaletext);
		$('#scaletext').css({'font-size':(device=="mobile")?11:20+"px;"})
		document.getElementById("scaletext").innerHTML='<div id=\"scaletext\" style=\"display: inline-block;\">'+(this.device=="mobile"?'':'比例尺')+'</div>';
		
		var handler;

		/* var offsetLeft = document.getElementById("cesiumContainer").cesiumContainer.offsetLeft;
		console.log(offsetLeft); */
		
		var cesiumwidth = document.getElementById("cesiumContainer").clientWidth;
		var cesiumheight = document.getElementById("cesiumContainer").clientHeight;
		var scaleConWidth = document.getElementById("scaleContainer").clientWidth;
		var scaleConHeight = document.getElementById("scaleContainer").clientHeight;
		
		var paddingleft = this.getNum(this.getStyle(scaletext,'padding-left'));//console.log('paddingleft',paddingleft);
		var paddingbottom = this.getNum(this.getStyle(scaletext,'padding-bottom'));//console.log('paddingbottom',paddingbottom);
		var right = this.getNum(this.getStyle(scaletext,'right'));//console.log('right',right);
		var bottom = this.getNum(this.getStyle(scaletext,'bottom'));//console.log('bottom',bottom);
		var borderwidth = this.getNum(this.getStyle(scaletext,'border-width'));//console.log('borderwidth',borderwidth);
		
		//var windowleft =new Cesium.Cartesian2(cesiumwidth-scaleConWidth-10-10-1-95,cesiumheight-80-7-1);//如何获取svg长度
		var windowleft =new Cesium.Cartesian2(cesiumwidth-scaleConWidth-right-paddingleft-borderwidth-lineWidth-svgpadding,cesiumheight-bottom-paddingbottom-borderwidth);
		
		//var windowright =new Cesium.Cartesian2(cesiumwidth-scaleConWidth-10-1-5-10,cesiumheight-80-7-1);
		var windowright = new Cesium.Cartesian2(cesiumwidth-scaleConWidth-right-borderwidth-svgpadding-paddingleft,cesiumheight-bottom-paddingbottom-borderwidth);
		
		//console.log(cesiumwidth,scaleConWidth,right,paddingleft,borderwidth,lineWidth,svgpadding);
		//console.log(cesiumheight,bottom,paddingbottom,borderwidth);
		$(window).resize(function() {
			cesiumwidth = document.getElementById("cesiumContainer").clientWidth;
			cesiumheight = document.getElementById("cesiumContainer").clientHeight;
			scaleConWidth = document.getElementById("scaleContainer").clientWidth;
			scaleConHeight = document.getElementById("scaleContainer").clientHeight;
			
			paddingleft = this.getNum(this.getStyle(scaletext,'padding-left'));//console.log('paddingleft',paddingleft);
			paddingbottom = this.getNum(this.getStyle(scaletext,'padding-bottom'));//console.log('paddingbottom',paddingbottom);
			right = this.getNum(this.getStyle(scaletext,'right'));//console.log('right',right);
			bottom = this.getNum(this.getStyle(scaletext,'bottom'));//console.log('bottom',bottom);
			borderwidth = this.getNum(this.getStyle(scaletext,'border-width'));//console.log('borderwidth',borderwidth);
			//console.log('right',this.getStyle(scaletext,'right'));
			//var windowleft =new Cesium.Cartesian2(cesiumwidth-scaleConWidth-10-10-1-95,cesiumheight-80-7-1);//如何获取svg长度
			windowleft =new Cesium.Cartesian2(cesiumwidth-scaleConWidth-right-paddingleft-borderwidth-lineWidth-svgpadding,cesiumheight-bottom-paddingbottom-borderwidth);
			//console.log(windowleft);
			//var windowright =new Cesium.Cartesian2(cesiumwidth-scaleConWidth-10-1-5-10,cesiumheight-80-7-1);
			windowright = new Cesium.Cartesian2(cesiumwidth-scaleConWidth-right-borderwidth-svgpadding-paddingleft,cesiumheight-bottom-paddingbottom-borderwidth);
			/* console.log('resize windowleft',windowleft);
			console.log('resize windowright',windowleft);
			console.log(cesiumwidth,scaleConWidth,right,paddingleft,borderwidth,lineWidth,svgpadding);
			console.log(cesiumheight,bottom,paddingbottom,borderwidth); */
		});

		var scaleString = '';
		

		
		var viewchanged;
		this.viewer.camera.moveStart.addEventListener(function() {
			viewchanged=true;
		});

		this.viewer.camera.moveEnd.addEventListener(function() {
			viewchanged=false;
		});
		var device = this.device;
		this.viewer.clock.onTick.addEventListener(function(clock) {
			if(viewchanged){
				if(this.viewer.sceneMode == Cesium.SceneMode.SCENE3D||this.viewer.sceneMode == Cesium.SceneMode.COLUMBUS_VIEW){
					var ray1 = this.viewer.camera.getPickRay(windowleft);
					var position1 = this.scene.globe.pick(ray1, this.scene);
					var ray2 = this.viewer.camera.getPickRay(windowright);
					var position2 = this.scene.globe.pick(ray2, this.scene);
					if(position1&&position2){
						var distance = Cesium.Cartesian3.distance(position1,position2)
						if(distance>3000)
						document.getElementById("scaletext").innerHTML= (distance/1000).toFixed(0)+" 公里";
						else if(distance>1){document.getElementById("scaletext").innerHTML= distance.toFixed(0)+" 米";}
						else document.getElementById("scaletext").innerHTML= "1 米";
					}
					else document.getElementById("scaletext").innerHTML=(device=="mobile"?'':'比例尺');
				}
				else{
					var position1 = this.viewer.camera.pickEllipsoid(windowleft, this.ellipsoid);
					var position2 = this.viewer.camera.pickEllipsoid(windowright, this.ellipsoid);
					if(position1&&position2){
						var distance = Cesium.Cartesian3.distance(position1,position2)
						if(distance>3000)
						document.getElementById("scaletext").innerHTML= (distance/1000).toFixed(0)+" 公里";
						else if(distance>1){document.getElementById("scaletext").innerHTML= distance.toFixed(0)+" 米";}
						else document.getElementById("scaletext").innerHTML= "1 米";
					}
					else document.getElementById("scaletext").innerHTML=(device=="mobile"?'':'比例尺');
				}

			}
			
		})
		
	  }
	//指北针罗盘
	function doCompass()
	{
		var compassHTML='<div class="compass-outer-ring-background"></div>\
		<div class="compass-rotation-marker" style="display:none;"><svg class="cesium-svgPath-svg" width="145" height="145" viewBox="0 0 145 145"><path d="M 72.46875,22.03125 C 59.505873,22.050338 46.521615,27.004287 36.6875,36.875 L 47.84375,47.96875 C 61.521556,34.240041 83.442603,34.227389 97.125,47.90625 l 11.125,-11.125 C 98.401629,26.935424 85.431627,22.012162 72.46875,22.03125 z"></path></svg></div>\
		<div class="compass-outer-ring" ><svg class="cesium-svgPath-svg" width="145" height="145" viewBox="0 0 145 145"><path d="m 66.5625,0 0,15.15625 3.71875,0 0,-10.40625 5.5,10.40625 4.375,0 0,-15.15625 -3.71875,0 0,10.40625 L 70.9375,0 66.5625,0 z M 72.5,20.21875 c -28.867432,0 -52.28125,23.407738 -52.28125,52.28125 0,28.87351 23.413818,52.3125 52.28125,52.3125 28.86743,0 52.28125,-23.43899 52.28125,-52.3125 0,-28.873512 -23.41382,-52.28125 -52.28125,-52.28125 z m 0,1.75 c 13.842515,0 26.368948,5.558092 35.5,14.5625 l -11.03125,11 0.625,0.625 11.03125,-11 c 8.9199,9.108762 14.4375,21.579143 14.4375,35.34375 0,13.764606 -5.5176,26.22729 -14.4375,35.34375 l -11.03125,-11 -0.625,0.625 11.03125,11 c -9.130866,9.01087 -21.658601,14.59375 -35.5,14.59375 -13.801622,0 -26.321058,-5.53481 -35.4375,-14.5 l 11.125,-11.09375 c 6.277989,6.12179 14.857796,9.90625 24.3125,9.90625 19.241896,0 34.875,-15.629154 34.875,-34.875 0,-19.245847 -15.633104,-34.84375 -34.875,-34.84375 -9.454704,0 -18.034511,3.760884 -24.3125,9.875 L 37.0625,36.4375 C 46.179178,27.478444 58.696991,21.96875 72.5,21.96875 z m -0.875,0.84375 0,13.9375 1.75,0 0,-13.9375 -1.75,0 z M 36.46875,37.0625 47.5625,48.15625 C 41.429794,54.436565 37.65625,63.027539 37.65625,72.5 c 0,9.472461 3.773544,18.055746 9.90625,24.34375 L 36.46875,107.9375 c -8.96721,-9.1247 -14.5,-21.624886 -14.5,-35.4375 0,-13.812615 5.53279,-26.320526 14.5,-35.4375 z M 72.5,39.40625 c 18.297686,0 33.125,14.791695 33.125,33.09375 0,18.302054 -14.827314,33.125 -33.125,33.125 -18.297687,0 -33.09375,-14.822946 -33.09375,-33.125 0,-18.302056 14.796063,-33.09375 33.09375,-33.09375 z M 22.84375,71.625 l 0,1.75 13.96875,0 0,-1.75 -13.96875,0 z m 85.5625,0 0,1.75 14,0 0,-1.75 -14,0 z M 71.75,108.25 l 0,13.9375 1.71875,0 0,-13.9375 -1.71875,0 z"></path><path d="m 66.5625,0 0,15.15625 3.71875,0 0,-10.40625 5.5,10.40625 4.375,0 0,-15.15625 -3.71875,0 0,10.40625 L 70.9375,0 66.5625,0 z" style="fill:white;stroke:black;"></path></svg></div>\
		<div class="compass-gyro-background"></div>\
		<div class="compass-gyro"><svg class="cesium-svgPath-svg" width="145" height="145" viewBox="0 0 145 145"><path d="m 72.71875,54.375 c -0.476702,0 -0.908208,0.245402 -1.21875,0.5625 -0.310542,0.317098 -0.551189,0.701933 -0.78125,1.1875 -0.172018,0.363062 -0.319101,0.791709 -0.46875,1.25 -6.91615,1.075544 -12.313231,6.656514 -13,13.625 -0.327516,0.117495 -0.661877,0.244642 -0.9375,0.375 -0.485434,0.22959 -0.901634,0.471239 -1.21875,0.78125 -0.317116,0.310011 -0.5625,0.742111 -0.5625,1.21875 l 0.03125,0 c 0,0.476639 0.245384,0.877489 0.5625,1.1875 0.317116,0.310011 0.702066,0.58291 1.1875,0.8125 0.35554,0.168155 0.771616,0.32165 1.21875,0.46875 1.370803,6.10004 6.420817,10.834127 12.71875,11.8125 0.146999,0.447079 0.30025,0.863113 0.46875,1.21875 0.230061,0.485567 0.470708,0.870402 0.78125,1.1875 0.310542,0.317098 0.742048,0.5625 1.21875,0.5625 0.476702,0 0.876958,-0.245402 1.1875,-0.5625 0.310542,-0.317098 0.582439,-0.701933 0.8125,-1.1875 0.172018,-0.363062 0.319101,-0.791709 0.46875,-1.25 6.249045,-1.017063 11.256351,-5.7184 12.625,-11.78125 0.447134,-0.1471 0.86321,-0.300595 1.21875,-0.46875 0.485434,-0.22959 0.901633,-0.502489 1.21875,-0.8125 0.317117,-0.310011 0.5625,-0.710861 0.5625,-1.1875 l -0.03125,0 c 0,-0.476639 -0.245383,-0.908739 -0.5625,-1.21875 C 89.901633,71.846239 89.516684,71.60459 89.03125,71.375 88.755626,71.244642 88.456123,71.117495 88.125,71 87.439949,64.078341 82.072807,58.503735 75.21875,57.375 c -0.15044,-0.461669 -0.326927,-0.884711 -0.5,-1.25 -0.230061,-0.485567 -0.501958,-0.870402 -0.8125,-1.1875 -0.310542,-0.317098 -0.710798,-0.5625 -1.1875,-0.5625 z m -0.0625,1.40625 c 0.03595,-0.01283 0.05968,0 0.0625,0 0.0056,0 0.04321,-0.02233 0.1875,0.125 0.144288,0.147334 0.34336,0.447188 0.53125,0.84375 0.06385,0.134761 0.123901,0.309578 0.1875,0.46875 -0.320353,-0.01957 -0.643524,-0.0625 -0.96875,-0.0625 -0.289073,0 -0.558569,0.04702 -0.84375,0.0625 C 71.8761,57.059578 71.936151,56.884761 72,56.75 c 0.18789,-0.396562 0.355712,-0.696416 0.5,-0.84375 0.07214,-0.07367 0.120304,-0.112167 0.15625,-0.125 z m 0,2.40625 c 0.448007,0 0.906196,0.05436 1.34375,0.09375 0.177011,0.592256 0.347655,1.271044 0.5,2.03125 0.475097,2.370753 0.807525,5.463852 0.9375,8.9375 -0.906869,-0.02852 -1.834463,-0.0625 -2.78125,-0.0625 -0.92298,0 -1.802327,0.03537 -2.6875,0.0625 0.138529,-3.473648 0.493653,-6.566747 0.96875,-8.9375 0.154684,-0.771878 0.320019,-1.463985 0.5,-2.0625 0.405568,-0.03377 0.804291,-0.0625 1.21875,-0.0625 z m -2.71875,0.28125 c -0.129732,0.498888 -0.259782,0.987558 -0.375,1.5625 -0.498513,2.487595 -0.838088,5.693299 -0.96875,9.25 -3.21363,0.15162 -6.119596,0.480068 -8.40625,0.9375 -0.682394,0.136509 -1.275579,0.279657 -1.84375,0.4375 0.799068,-6.135482 5.504716,-11.036454 11.59375,-12.1875 z M 75.5,58.5 c 6.043169,1.18408 10.705093,6.052712 11.5,12.15625 -0.569435,-0.155806 -1.200273,-0.302525 -1.875,-0.4375 -2.262525,-0.452605 -5.108535,-0.783809 -8.28125,-0.9375 -0.130662,-3.556701 -0.470237,-6.762405 -0.96875,-9.25 C 75.761959,59.467174 75.626981,58.990925 75.5,58.5 z m -2.84375,12.09375 c 0.959338,0 1.895843,0.03282 2.8125,0.0625 C 75.48165,71.267751 75.5,71.871028 75.5,72.5 c 0,1.228616 -0.01449,2.438313 -0.0625,3.59375 -0.897358,0.0284 -1.811972,0.0625 -2.75,0.0625 -0.927373,0 -1.831062,-0.03473 -2.71875,-0.0625 -0.05109,-1.155437 -0.0625,-2.365134 -0.0625,-3.59375 0,-0.628972 0.01741,-1.232249 0.03125,-1.84375 0.895269,-0.02827 1.783025,-0.0625 2.71875,-0.0625 z M 68.5625,70.6875 c -0.01243,0.60601 -0.03125,1.189946 -0.03125,1.8125 0,1.22431 0.01541,2.407837 0.0625,3.5625 -3.125243,-0.150329 -5.92077,-0.471558 -8.09375,-0.90625 -0.784983,-0.157031 -1.511491,-0.316471 -2.125,-0.5 -0.107878,-0.704096 -0.1875,-1.422089 -0.1875,-2.15625 0,-0.115714 0.02849,-0.228688 0.03125,-0.34375 0.643106,-0.20284 1.389577,-0.390377 2.25,-0.5625 2.166953,-0.433487 4.97905,-0.75541 8.09375,-0.90625 z m 8.3125,0.03125 c 3.075121,0.15271 5.824455,0.446046 7.96875,0.875 0.857478,0.171534 1.630962,0.360416 2.28125,0.5625 0.0027,0.114659 0,0.228443 0,0.34375 0,0.735827 -0.07914,1.450633 -0.1875,2.15625 -0.598568,0.180148 -1.29077,0.34562 -2.0625,0.5 -2.158064,0.431708 -4.932088,0.754666 -8.03125,0.90625 0.04709,-1.154663 0.0625,-2.33819 0.0625,-3.5625 0,-0.611824 -0.01924,-1.185379 -0.03125,-1.78125 z M 57.15625,72.5625 c 0.0023,0.572772 0.06082,1.131112 0.125,1.6875 -0.125327,-0.05123 -0.266577,-0.10497 -0.375,-0.15625 -0.396499,-0.187528 -0.665288,-0.387337 -0.8125,-0.53125 -0.147212,-0.143913 -0.15625,-0.182756 -0.15625,-0.1875 0,-0.0047 -0.02221,-0.07484 0.125,-0.21875 0.147212,-0.143913 0.447251,-0.312472 0.84375,-0.5 0.07123,-0.03369 0.171867,-0.06006 0.25,-0.09375 z m 31.03125,0 c 0.08201,0.03503 0.175941,0.05872 0.25,0.09375 0.396499,0.187528 0.665288,0.356087 0.8125,0.5 0.14725,0.14391 0.15625,0.21405 0.15625,0.21875 0,0.0047 -0.009,0.04359 -0.15625,0.1875 -0.147212,0.143913 -0.416001,0.343722 -0.8125,0.53125 -0.09755,0.04613 -0.233314,0.07889 -0.34375,0.125 0.06214,-0.546289 0.09144,-1.094215 0.09375,-1.65625 z m -29.5,3.625 c 0.479308,0.123125 0.983064,0.234089 1.53125,0.34375 2.301781,0.460458 5.229421,0.787224 8.46875,0.9375 0.167006,2.84339 0.46081,5.433176 0.875,7.5 0.115218,0.574942 0.245268,1.063612 0.375,1.5625 -5.463677,-1.028179 -9.833074,-5.091831 -11.25,-10.34375 z m 27.96875,0 C 85.247546,81.408945 80.919274,85.442932 75.5,86.5 c 0.126981,-0.490925 0.261959,-0.967174 0.375,-1.53125 0.41419,-2.066824 0.707994,-4.65661 0.875,-7.5 3.204493,-0.15162 6.088346,-0.480068 8.375,-0.9375 0.548186,-0.109661 1.051942,-0.220625 1.53125,-0.34375 z M 70.0625,77.53125 c 0.865391,0.02589 1.723666,0.03125 2.625,0.03125 0.912062,0 1.782843,-0.0048 2.65625,-0.03125 -0.165173,2.736408 -0.453252,5.207651 -0.84375,7.15625 -0.152345,0.760206 -0.322989,1.438994 -0.5,2.03125 -0.437447,0.03919 -0.895856,0.0625 -1.34375,0.0625 -0.414943,0 -0.812719,-0.02881 -1.21875,-0.0625 -0.177011,-0.592256 -0.347655,-1.271044 -0.5,-2.03125 -0.390498,-1.948599 -0.700644,-4.419842 -0.875,-7.15625 z m 1.75,10.28125 c 0.284911,0.01545 0.554954,0.03125 0.84375,0.03125 0.325029,0 0.648588,-0.01171 0.96875,-0.03125 -0.05999,0.148763 -0.127309,0.31046 -0.1875,0.4375 -0.18789,0.396562 -0.386962,0.696416 -0.53125,0.84375 -0.144288,0.147334 -0.181857,0.125 -0.1875,0.125 -0.0056,0 -0.07446,0.02233 -0.21875,-0.125 C 72.355712,88.946416 72.18789,88.646562 72,88.25 71.939809,88.12296 71.872486,87.961263 71.8125,87.8125 z"></path></svg>\
	</div>';
		var cesiumContainer = document.getElementById("cesiumContainer");
		var compassContainer = document.createElement('div');
		compassContainer.className = 'compass';
		compassContainer.setAttribute('id','compass');
		compassContainer.setAttribute('title','拖动外环 : 旋转视角方向\n拖动内部陀螺仪 : 自由旋转地球\n双击陀螺仪 : 视角朝向复位\n提示 : Ctrl+左键拖动地球，也可以实现视角旋转');	
		cesiumContainer.appendChild(compassContainer);
		compassContainer.innerHTML = compassHTML;
		
		//console.log('cesiumContainer.position.left',cesiumContainer.offsetLeft);
		
		//document.write(compassHTML);
		var looking = false; 
		var ring = false;
		var camera = this.viewer.camera;
		
		var offsetLeft = cesiumContainer.offsetLeft;
		var offsetTop = cesiumContainer.offsetTop;
		var cesiumwidth = document.getElementById("cesiumContainer").clientWidth;
		// console.log('cesiumwidth',cesiumwidth);
		var cesiumheight = document.getElementById("cesiumContainer").clientHeight;
		var compass = document.getElementById("compass");
		var compassright = this.getNum(this.getStyle(compass,'right'));
		// console.log('compassright',compassright);
		var compasswidth = this.getNum(this.getStyle(compass,'width'));
		//console.log('compasswidth',compasswidth);
		var compasstop = this.getNum(this.getStyle(compass,'top'));
		var compassheight = this.getNum(this.getStyle(compass,'height'));
		var centerX = cesiumwidth-compassright-compasswidth/2;
		// var centerY = (compasstop*1-offsetTop*1+compassheight/2*1)*1;//2016.12.15删除
		var centerY = (compasstop*1+compassheight/2*1)*1;//2016.12.15添加
		
		//console.log(centerX);
		//console.log(centerY);
		//窗口变化，重算罗盘中点
		$(window).resize(function() {
			console.log("window Resize");
			 offsetLeft = document.getElementById("cesiumContainer").offsetLeft;
			 offsetTop = document.getElementById("cesiumContainer").offsetTop;
			 cesiumwidth = document.getElementById("cesiumContainer").clientWidth;
			//console.log('cesiumwidth',cesiumwidth);
			 cesiumheight = document.getElementById("cesiumContainer").clientHeight;
			 compass = document.getElementById("compass");
			 compassright = this.getNum(this.getStyle(compass,'right'));
			 compasswidth = this.getNum(this.getStyle(compass,'width'));
			//console.log('compasswidth',compasswidth);
			 compasstop = this.getNum(this.getStyle(compass,'top'));
			 compassheight = this.getNum(this.getStyle(compass,'height'));
			 centerX = cesiumwidth-compassright-compasswidth/2;
			 //centerY = (compasstop*1-offsetTop*1+compassheight/2*1)*1;//2016.12.15删除
			 centerY = (compasstop*1+compassheight/2*1)*1;//2016.12.15添加
		});
		$('#cesiumContainer').resize(function() {
			console.log("div Resize");
		}); 
		var handler = new Cesium.ScreenSpaceEventHandler(this.viewer.scene.canvas);	

		var startMousePosition;
		var mousePosition;
		var curheading = camera.heading;	
		
 		$(document).ready(function(){
			$(document).mousemove(function(e){
				if(ring||looking){
					mousePosition = {x:e.pageX-offsetLeft,y:e.pageY-offsetTop};
					if(ring){
						// console.log('epagexy: ',e.pageX,e.pageY);
						// console.log('offset: ',offsetLeft,offsetTop);						
						// console.log('mousePosition: ',mousePosition);
						// console.log('center: ',centerX,centerY);
						var rad1 = toRingRad(startMousePosition.x,startMousePosition.y,centerX,centerY);
						var rad2 = toRingRad(mousePosition.x,mousePosition.y,centerX,centerY);
						viewer.camera.setView({
							orientation:{
								heading : (curheading-(rad2-rad1)),
								pitch : viewer.camera.pitch,
								roll : viewer.camera.roll  
							}
						});
					}
				}
				
			}); 
			$(".compass-gyro-background").dblclick(function(){
				viewer.camera.flyTo({
					destination:viewer.camera.position,
					orientation:{
						heading : 0.0,
						pitch : viewer.camera.pitch,
						roll : viewer.camera.roll
					}
				});
			});
			$(".compass-gyro-background").mousedown(function(e){
				mousePosition = {x:e.pageX-offsetLeft,y:e.pageY-offsetTop};
				$(".compass-gyro").addClass("compass-gyro-active");
				$(".compass-gyro").addClass("cursor-grab");
				$(".compass-rotation-marker").css("display","block");
				looking = true;
					$(document).mouseup(function(){
						$(".compass-gyro").removeClass("compass-gyro-active");
						$(".compass-rotation-marker").css("display","none");
						looking = false;
						});
				});
			document.getElementsByClassName("compass-gyro-background")[0].addEventListener('touchstart',function(e){
				var touch = e.touches[0];
				mousePosition = {x:touch.pageX-offsetLeft,y:touch.pageY-offsetTop};
				$(".compass-gyro").addClass("compass-gyro-active");
				$(".compass-gyro").addClass("cursor-grab");
				$(".compass-rotation-marker").css("display","block");
				looking = true;
			}, false);
			document.getElementsByClassName("compass-gyro-background")[0].addEventListener('touchend',function(e){
				$(".compass-gyro").removeClass("compass-gyro-active");
				$(".compass-rotation-marker").css("display","none");
				looking = false;
			}, false);
			$(".compass-outer-ring").mousedown(function(e){
				ring = true;
				mousePosition=startMousePosition={x:e.pageX-offsetLeft,y:e.pageY-offsetTop};
					$(document).mouseup(function(){
						ring = false;
						curheading = camera.heading;
						});
				});
			}); 
			document.getElementsByClassName("compass-outer-ring")[0].addEventListener('touchstart',function(e){
				ring = true;
				var touch = e.touches[0];
				mousePosition=startMousePosition={x:touch.pageX-offsetLeft,y:touch.pageY-offsetTop};
			}, false);
			document.addEventListener('touchmove',function(e){
				if(ring||looking){
					var touch = e.touches[0];
					mousePosition = {x:touch.pageX-offsetLeft,y:touch.pageY-offsetTop};
					if(ring){
						var rad1 = toRingRad(startMousePosition.x,startMousePosition.y,centerX,centerY);
						var rad2 = toRingRad(mousePosition.x,mousePosition.y,centerX,centerY);
						viewer.camera.setView({
							orientation:{
								heading : (curheading-(rad2-rad1))
							}
						});
						//ring转动，heading变换
						//$(".compass-outer-ring").css("transform","rotate("+Cesium.Math.toDegrees(Math.PI*2-this.viewer.camera.heading)+"deg)");
					}
				}
			}, false);
			document.getElementsByClassName("compass-outer-ring")[0].addEventListener('touchend',function(){
				ring = false;
				curheading = camera.heading;
			}, false);
		
		var viewchanged;
		this.viewer.camera.moveStart.addEventListener(function() {
			viewchanged=true;
		});

		this.viewer.camera.moveEnd.addEventListener(function() {
			viewchanged=false;
		});
		
		this.viewer.clock.onTick.addEventListener(function(clock) {
			var heading = camera.heading;
			if (looking) {
				var xvec = (mousePosition.x - centerX) / (compasswidth*1);
				var yvec = -(mousePosition.y - centerY) / (compassheight*1);
				var rad = Math.atan((mousePosition.x-centerX)/(-mousePosition.y+centerY));
				var cameraHeight = this.ellipsoid.cartesianToCartographic(camera.position).height;
				var factor = cameraHeight/500000000;
				if((-mousePosition.y+centerY)>0){
					//$(".compass-outer-ring").css("transform","rotate("+Cesium.Math.toDegrees(Math.PI*2-heading)+"deg)");
					$(".compass-rotation-marker").css("transform","rotate("+Cesium.Math.toDegrees(rad)+"deg)");
					//if(roll>=0)
					//viewer.camera.lookUp(yvec * factor);
					//viewer.camera.twistRight(xvec * factor);
				}
				else{
					//$(".compass-outer-ring").css("transform","rotate("+Cesium.Math.toDegrees(Math.PI*2-heading)+"deg)");
					$(".compass-rotation-marker").css("transform","rotate("+Cesium.Math.toDegrees(rad+Math.PI)+"deg)");
					//if(roll>=0)
					//viewer.camera.lookUp(yvec * factor);
					//viewer.camera.twistRight(xvec * factor);
				}

				this.viewer.camera.rotateUp(yvec * factor);
				this.viewer.camera.twistRight(xvec * factor);
				//console.log(pitch/Math.PI*180);

			}
			
			$(".compass-outer-ring").css("transform","rotate("+Cesium.Math.toDegrees(Math.PI*2-heading)+"deg)");
			//console.log(heading/Math.PI*180);
			//console.log(homeview.destination);
			//console.log(roll/Math.PI*180);
			
			if(viewchanged)
			{
				//var extent = this.getExtent();
				//this.drawExtent(extent);
			}
		});
	}
	
	function transXY(offsetLeft,offsetTop,width,height,ox,oy){
		var x,y;
		var xfactor = width/(width+offsetLeft);
		var yfactor = height/(height+offsetTop);
		x = ox*xfactor;
		y = oy*yfactor;
		return {x:x,y:y};		
	}
	
	function doNavi()
	{
		var homeView = {destination:Cesium.Rectangle.fromDegrees(106.940573 - 12, 33.808406 + 12, 106 + 12, 33 - 12)};
		var cameraHeight = this.getcamera().carto.height.toFixed(2);
		var zoomRate = cameraHeight/10;
		//console.log(zoomRate);
		
		var naviHTML='    <div class="navigation-controls">\
			<div title="放大(Zoom In)" class="navigation-control" onclick="clickZoomIn()">\
				<div class="navigation-control-icon-zoom-in">+</div>\
			</div>\
			<div title="复位(Reset View)" class="navigation-control">\
				<div class="navigation-control-icon-reset" id="HomeView"><svg class="cesium-svgPath-svg" width="15" height="15" viewBox="0 0 15 15"><path d="M 7.5,0 C 3.375,0 0,3.375 0,7.5 0,11.625 3.375,15 7.5,15 c 3.46875,0 6.375,-2.4375 7.21875,-5.625 l -1.96875,0 C 12,11.53125 9.9375,13.125 7.5,13.125 4.40625,13.125 1.875,10.59375 1.875,7.5 1.875,4.40625 4.40625,1.875 7.5,1.875 c 1.59375,0 2.90625,0.65625 3.9375,1.6875 l -3,3 6.5625,0 L 15,0 12.75,2.25 C 11.4375,0.84375 9.5625,0 7.5,0 z"></path></svg></div>\
			</div>\
			<div title="缩小(Zoom Out)" class="navigation-control-last" onclick="clickZoomOut()">\
				<div class="navigation-control-icon-zoom-out">–</div>\
			</div>\
			</div>';
		$("#cesiumContainer").append(naviHTML);
		$("#HomeView").click(function(){
		  viewer.camera.flyTo(homeView);
		});
	}

	//辅助工具函数
	function getStyle(obj, attr)  
	{  
		if(obj.currentStyle)  
		{  
			return obj.currentStyle[attr];  
		}  
		else  
		{  
			return getComputedStyle(obj,null)[attr];  
		}  
	} 
	function getNum(text)
	{
		//var value = text.replace(/[^0-9]/ig,"");
		return parseFloat(text)?parseFloat(text):0;		
		//return value;
	}
	function toRingRad(x,y,centerX,centerY)
	{
		var rad;
		var test = Math.atan((x-centerX)/(-y+centerY));
		if((-y+centerY)>0)
		{
			rad=(test>=0)?test:(Math.PI*2+test);
		}
		else if((-y+centerY)==0) rad=(x>=0)?(Math.PI/2):(Math.PI/2*3);
		else
		{
			rad=(test<=0)?(Math.PI+test):(Math.PI+test);
		}
		return rad;
	}
	function showlonlat(num,lonlat,device)
	{
		var string ;
		if(device=="mobile"){
			if(lonlat=='lon')
			{
				if(num>180) num = -(360-num);
				if(num<-180) num = (360-num);
				if(num>0) string = '东经 '+Math.abs(num).toFixed(4)+'°';
				else if(num==0) string = Math.abs(num).toFixed(4);
				else string = '西经 '+Math.abs(num).toFixed(4)+'°';
			}
			else if(lonlat == 'lat')
			{
				if(num>0) string = '北纬 '+Math.abs(num).toFixed(4)+'°';
				else if(num==0) string = Math.abs(num).toFixed(4);
				else string = '南纬 '+Math.abs(num).toFixed(4)+'°';
			}
			else return false;
			return string;
		}
		else{
			if(lonlat=='lon')
			{
				if(num>180) num = -(360-num);
				if(num<-180) num = (360-num);
				if(num>0) string = Math.abs(num).toFixed(6)+'°东';
				else if(num==0) string = Math.abs(num).toFixed(6);
				else string = Math.abs(num).toFixed(6)+'°西';
			}
			else if(lonlat == 'lat')
			{
				if(num>0) string = Math.abs(num).toFixed(6)+'°北';
				else if(num==0) string = Math.abs(num).toFixed(6);
				else string = Math.abs(num).toFixed(6)+'°南';
			}
			else return false;
			return string;
		}
		
		
		
	}	
	function clickZoomIn()
	{
		viewer.camera.zoomIn(this.zoomRate);
		var cameraheight0 = this.getcamera().carto.height;
		this.zoomRate = cameraheight0/10;
	}
	function clickZoomOut()
	{
		viewer.camera.zoomOut(this.zoomRate);
		var cameraheight0 = this.getcamera().carto.height;
		this.zoomRate = cameraheight0/10;
	}
	
/**
 * Created by thomas on 27/01/14.
 * Edited by ChrisWong on 19/11/15.
 */

var Graticule = (function() {

    function defaultValue(options, defaultOptions) {
        var newOptions = {}, option;
        for(option in options) {
            newOptions[option] = options[option];
        }
        for(option in defaultOptions) {
            if(newOptions[option] === undefined) {
                newOptions[option] = defaultOptions[option];
            }
        }
        return newOptions;
    }

    function _(description, scene) {

        description = description || {};

        this._tilingScheme = description.tilingScheme || new Cesium.GeographicTilingScheme();

        this._color = description.color || new Cesium.Color(1.0, 1.0, 1.0, 0.4);

        this._tileWidth = description.tileWidth || 256;
        this._tileHeight = description.tileHeight || 256;

        this._ready = true;

        // default to decimal intervals
        this._sexagesimal = description.sexagesimal || false;
        this._numLines = description.numLines || 50;

        this._scene = scene;
        this._labels = new Cesium.LabelCollection();
        scene.primitives.add(this._labels);
        this._polylines = new Cesium.PolylineCollection();
		this._specLines = new Cesium.PolylineCollection();
		this._specLines2 = new Cesium.PolylineCollection();
		this._baseLines = new Cesium.PolylineCollection();
		
		//console.log('start');
        scene.primitives.add(this._polylines);
        scene.primitives.add(this._specLines);
        scene.primitives.add(this._specLines2);
        scene.primitives.add(this._baseLines);
		//console.log('end');
        this._ellipsoid = scene.globe.ellipsoid;
		this._isCross = false;

        var canvas = document.createElement('canvas');
        canvas.width = 256;
        canvas.height = 256;
        this._canvas = canvas;

    };

    var definePropertyWorks = (function() {
        try {
            return 'x' in Object.defineProperty({}, 'x', {});
        } catch (e) {
            return false;
        }
    })();

    /**
     * Defines properties on an object, using Object.defineProperties if available,
     * otherwise returns the object unchanged.  This function should be used in
     * setup code to prevent errors from completely halting JavaScript execution
     * in legacy browsers.
     *
     * @private
     *
     * @exports defineProperties
     */
    var defineProperties = Object.defineProperties;
    if (!definePropertyWorks || !defineProperties) {
        defineProperties = function(o) {
            return o;
        };
    }

    defineProperties(_.prototype, {
        url : {
            get : function() {
                return undefined;
            }
        },

        proxy : {
            get : function() {
                return undefined;
            }
        },

        tileWidth : {
            get : function() {
                return this._tileWidth;
            }
        },

        tileHeight: {
            get : function() {
                return this._tileHeight;
            }
        },

        maximumLevel : {
            get : function() {
                return 18;
            }
        },

        minimumLevel : {
            get : function() {
                return 0;
            }
        },
        tilingScheme : {
            get : function() {
                return this._tilingScheme;
            }
        },
        rectangle : {
            get : function() {
                return this._tilingScheme.rectangle;
            }
        },
        tileDiscardPolicy : {
            get : function() {
                return undefined;
            }
        },
        errorEvent : {
            get : function() {
                return this._errorEvent;
            }
        },
        ready : {
            get : function() {
                return this._ready;
            }
        },
        credit : {
            get : function() {
                return this._credit;
            }
        },
        hasAlphaChannel : {
            get : function() {
                return true;
            }
        }
    });

     _.prototype.makeLabel = function(lng, lat, text, top, color) {
        this._labels.add({
            position : this._ellipsoid.cartographicToCartesian(new Cesium.Cartographic(lng, lat, 10.0)),
            text : text,
            font : '15px 微软雅黑',
            fillColor : Cesium.Color.WHITE,
            //outlineColor : 'white',
            //style : Cesium.LabelStyle.FILL,
            pixelOffset : new Cesium.Cartesian2(5, top ? 15 : -15),
            eyeOffset : Cesium.Cartesian3.ZERO,
            horizontalOrigin : Cesium.HorizontalOrigin.LEFT,
            verticalOrigin : top ? Cesium.VerticalOrigin.BOTTOM : Cesium.VerticalOrigin.TOP,
            scale : 1.0
        });
    };
	_.prototype.makeLabel4Spec = function(lng, lat, text, top, color) {
        this._labels.add({
            position : this._ellipsoid.cartographicToCartesian(new Cesium.Cartographic(lng, lat, 10.0)),
            text : text,
            font : '20px 微软雅黑',
            fillColor : Cesium.Color.YELLOW,
            outlineColor : Cesium.Color.BLACK,
            style : Cesium.LabelStyle.FILL_AND_OUTLINE,
            pixelOffset : new Cesium.Cartesian2(5, top ? 20 : -20),
            eyeOffset : Cesium.Cartesian3.ZERO,
            horizontalOrigin : Cesium.HorizontalOrigin.LEFT,
            verticalOrigin : top ? Cesium.VerticalOrigin.BOTTOM : Cesium.VerticalOrigin.TOP,
            scale : 1.0
        });
    };

    _.prototype._drawGrid = function(extent) {

        if(this._currentExtent && this._currentExtent.equals(extent)) {
            return;
        }
        this._currentExtent = extent;
		//console.log(Cesium.Math.toDegrees(extent.west),Cesium.Math.toDegrees(extent.east),Cesium.Math.toDegrees(extent.south),Cesium.Math.toDegrees(extent.north));
        this._polylines.removeAll();
        this._specLines.removeAll();
        this._specLines2.removeAll();
        this._baseLines.removeAll();
        this._labels.removeAll();
		//console.log('this._polylines',this._polylines._polylines.length);
        var minPixel = 0;
        var maxPixel = this._canvasSize;

        var dLat = 0, dLng = 0, index;
		
		var linewidth = 0.5;
		
        // get the nearest to the calculated value
        for(index = 0; index < mins.length && dLat < ((extent.north - extent.south) / 10); index++) {
            dLat = mins[index];
        }
		//console.log(0,Cesium.Math.toDegrees(extent.west),Cesium.Math.toDegrees(extent.east))
		//判断extent是否横跨180经线
		//if(extent.east>(Math.PI/2) && extent.east<Math.PI && extent.west<(-Math.PI/2) && extent.west>-Math.PI)
		if(this._isCross===true)
		{
			for(index = 0; index < mins.length && dLng < ((Math.PI*2 - extent.west + extent.east) / 10); index++) {
				dLng = mins[index];
			}
			//console.log(1,Cesium.Math.toDegrees(extent.west),Cesium.Math.toDegrees(extent.east),Cesium.Math.toDegrees(extent.south),Cesium.Math.toDegrees(extent.north));
			var minLng = (extent.west < 0 ? Math.ceil(extent.west / dLng) : Math.floor(extent.west / dLng)) * dLng;
			var minLat = (extent.south < 0 ? Math.ceil(extent.south / dLat) : Math.floor(extent.south / dLat)) * dLat;
			var maxLng = (extent.east < 0 ? Math.ceil(extent.east / dLng) : Math.floor(extent.east / dLng)) * dLng;    
			var maxLat = (extent.north < 0 ? Math.ceil(extent.north / dLat) : Math.floor(extent.north / dLat)) * dLat;
			
			// extend to make sure we cover for non refresh of tiles
			minLng = Math.max(minLng - 2 * dLng, -Math.PI);
			maxLng = Math.min(maxLng + 2 * dLng, Math.PI);
			minLat = Math.max(minLat - 2 * dLat, -Math.PI / 2);
			maxLat = Math.min(maxLat + 2 * dLat, Math.PI / 2);
			//console.log(1,Cesium.Math.toDegrees(minLng),Cesium.Math.toDegrees(maxLng),Cesium.Math.toDegrees(dLng));
			
			var ellipsoid = this._ellipsoid;
			var lat, lng, granularity = Cesium.Math.toRadians(1);
			
			//画经线
			var latitudeText = minLat + Math.floor((maxLat - minLat) / dLat / 2) * dLat+dLat/2;
			for(lng = minLng; lng < Cesium.Math.toRadians(180); lng += dLng) {
				// draw meridian
				var path = [];
				for(lat = minLat; lat < maxLat; lat += granularity) {
					path.push(new Cesium.Cartographic(lng, lat))
				}
				path.push(new Cesium.Cartographic(lng, maxLat));
				this._polylines.add({
					positions : ellipsoid.cartographicArrayToCartesianArray(path),
					width: linewidth
				});
				var degLng = Cesium.Math.toDegrees(lng);
				if(!(around(degLng,0,0.01)||around(degLng,180,0.01)||around(degLng,-180,0.01))){
					this.makeLabel(lng, latitudeText, this._sexagesimal ? this._decToSex(degLng) : degreeToText(degLng,dLng,'lon'), false);
				}
			}
			for(lng = Cesium.Math.toRadians(-180); lng <maxLng ; lng += dLng) {
				// draw meridian
				var path = [];
				for(lat = minLat; lat < maxLat; lat += granularity) {
					path.push(new Cesium.Cartographic(lng, lat))
				}
				path.push(new Cesium.Cartographic(lng, maxLat));
				this._polylines.add({
					positions : ellipsoid.cartographicArrayToCartesianArray(path),
					width: linewidth
				});
				var degLng = Cesium.Math.toDegrees(lng);
				if(!(around(degLng,0,0.01)||around(degLng,180,0.01)||around(degLng,-180,0.01))) this.makeLabel(lng, latitudeText, this._sexagesimal ? this._decToSex(degLng) : degreeToText(degLng,dLng,'lon'), false);
			}
			//画纬线
			var longitudeText = minLng + Math.floor((Math.PI*2+(maxLng - minLng)) / dLng / 2) * dLng+dLng/2;
			var longitudeText = longitudeText<Math.PI ? longitudeText : (-Math.PI+longitudeText-Math.PI);
			for(lat = minLat; lat < maxLat; lat += dLat) {
				// draw parallels
				var path = [];
				for(lng = minLng; lng < Cesium.Math.toRadians(180); lng += granularity) {
					path.push(new Cesium.Cartographic(lng, lat));
				}
				//path.pop();
				path.push(new Cesium.Cartographic(Cesium.Math.toRadians(180), lat));
				this._polylines.add({
					positions : ellipsoid.cartographicArrayToCartesianArray(path),
					width: linewidth,
				});
				path = [];
				//console.log(path.length);
				for(lng = Cesium.Math.toRadians(-180); lng < maxLng; lng += granularity) {
					path.push(new Cesium.Cartographic(lng, lat));
				}
				path.push(new Cesium.Cartographic(maxLng, lat));
				this._polylines.add({
					positions : ellipsoid.cartographicArrayToCartesianArray(path),
					width: linewidth,
				});
				var degLat = Cesium.Math.toDegrees(lat);
				if(!(around(degLat,0,0.01)))
				this.makeLabel(longitudeText, lat, this._sexagesimal ? this._decToSex(degLat) : degreeToText(degLat,dLat,'lat'), true);
				//console.log(Cesium.Math.toDegrees(longitudeText));
			}
			
			//特殊经纬线
			for(i in specLines)
			{
				//为什么material要加在循环里面才不会报错，否则会说object destroy？
				var material1 = Cesium.Material.fromType('Color', {
					color : new Cesium.Color(1.0, 1.0, 0.0, 1.0)
				});
				var material2 = Cesium.Material.fromType('Color', {
					color : new Cesium.Color(1.0, 1.0, 0.0, 1.0)
				});
				var path = [];
				for(lng = minLng; lng < Cesium.Math.toRadians(180); lng += granularity) {
					path.push(new Cesium.Cartographic(lng, Cesium.Math.toRadians(specLines[i])));
				}
				//path.pop();
				path.push(new Cesium.Cartographic(Cesium.Math.toRadians(180), Cesium.Math.toRadians(specLines[i])));
				this._specLines.add({
					positions : ellipsoid.cartographicArrayToCartesianArray(path),
					material : material1,
					width: 1,
				});
				path = [];
				for(lng = Cesium.Math.toRadians(-180); lng < maxLng; lng += granularity) {
					path.push(new Cesium.Cartographic(lng, Cesium.Math.toRadians(specLines[i])));
				}
				path.push(new Cesium.Cartographic(maxLng, Cesium.Math.toRadians(specLines[i])));
				this._specLines.add({
					positions : ellipsoid.cartographicArrayToCartesianArray(path),
					material : material2,
					width: 1
				});
				this.makeLabel4Spec(longitudeText+dLng, Cesium.Math.toRadians(specLines[i]), i, true);
			}
			//特殊经纬线2
			for(i in specLines2)
			{
				//为什么material要加在循环里面才不会报错，否则会说object destroy？
				var material2 = Cesium.Material.fromType('Color', {
					color : new Cesium.Color(1.0, 1.0, 0.0, 1.0)
				});
				var path = [];
				for(lat = minLat; lat < maxLat; lat += granularity) {
					path.push(new Cesium.Cartographic(Cesium.Math.toRadians(specLines2[i]), lat))
				}
				path.push(new Cesium.Cartographic(Cesium.Math.toRadians(specLines2[i]), maxLat));
				this._specLines2.add({
					positions : ellipsoid.cartographicArrayToCartesianArray(path),
					material : material2,
					width: 1
				});
				this.makeLabel4Spec(Cesium.Math.toRadians(specLines2[i]),latitudeText, i, false);
			}
		}
		else{
			for(index = 0; index < mins.length && dLng < ((extent.east - extent.west) / 10); index++) {
				dLng = mins[index];
			}
			//console.log(2,Cesium.Math.toDegrees(extent.west),Cesium.Math.toDegrees(extent.east),Cesium.Math.toDegrees(extent.south),Cesium.Math.toDegrees(extent.north));
			// round iteration limits to the computed grid interval
			var minLng = (Math.floor(extent.west / dLng)) * dLng;
			var minLat = (extent.south < 0 ? Math.ceil(extent.south / dLat) : Math.floor(extent.south / dLat)) * dLat;
			var maxLng = (Math.ceil(extent.east / dLng)) * dLng;    //原来这两行dling和dlat写反了，已经改回来了
			var maxLat = (extent.north < 0 ? Math.ceil(extent.north / dLat) : Math.floor(extent.north / dLat)) * dLat;

			// extend to make sure we cover for non refresh of tiles
			minLng = Math.max(minLng - 2 * dLng, -Math.PI);
			maxLng = Math.min(maxLng + 2 * dLng, Math.PI);
			minLat = Math.max(minLat - 2 * dLat, -Math.PI / 2);
			maxLat = Math.min(maxLat + 2 * dLat, Math.PI / 2);
			//console.log(2,Cesium.Math.toDegrees(minLng),Cesium.Math.toDegrees(maxLng),Cesium.Math.toDegrees(dLng));
			var ellipsoid = this._ellipsoid;
			var lat, lng, granularity = Cesium.Math.toRadians(1);

			// labels positions
			var latitudeText = minLat + Math.floor((maxLat - minLat) / dLat / 2) * dLat+dLat/2;
			for(lng = minLng; lng < maxLng; lng += dLng) {
				// draw meridian
				var path = [];
				for(lat = minLat; lat < maxLat; lat += granularity) {
					path.push(new Cesium.Cartographic(lng, lat))
				}
				path.push(new Cesium.Cartographic(lng, maxLat));
				this._polylines.add({
					positions : ellipsoid.cartographicArrayToCartesianArray(path),
					width: linewidth
				});
				var degLng = Cesium.Math.toDegrees(lng);
				if(!(around(degLng,0,0.01)||around(degLng,180,0.01)||around(degLng,-180,0.01))) this.makeLabel(lng, latitudeText, this._sexagesimal ? this._decToSex(degLng) : degreeToText(degLng,dLng,'lon'), false);
			}
			
			// lats
			var longitudeText = minLng + Math.floor((maxLng - minLng) / dLng / 2) * dLng+dLng/2;
			for(lat = minLat; lat < maxLat; lat += dLat) {
				// draw parallels
				var path = [];
				for(lng = minLng; lng < maxLng; lng += granularity) {
					path.push(new Cesium.Cartographic(lng, lat))
				}
				path.push(new Cesium.Cartographic(maxLng, lat));
				this._polylines.add({
					positions : ellipsoid.cartographicArrayToCartesianArray(path),
					width: linewidth,
				});
				var degLat = Cesium.Math.toDegrees(lat);
				if(!(around(degLat,0,0.01)))
				this.makeLabel(longitudeText, lat, this._sexagesimal ? this._decToSex(degLat) : degreeToText(degLat,dLat,'lat'), true);
			}
			
			//特殊经纬线
			for(i in specLines)
			{
				//为什么material要加在循环里面才不会报错，否则会说object destroy？
				var material = Cesium.Material.fromType('Color', {
					color : new Cesium.Color(1.0, 1.0, 0.0, 1.0)
				});
				var path = [];
				for(lng = minLng; lng < maxLng; lng += granularity) {
					path.push(new Cesium.Cartographic(lng, Cesium.Math.toRadians(specLines[i])));
				}
				path.push(new Cesium.Cartographic(maxLng, Cesium.Math.toRadians(specLines[i])));
				this._specLines.add({
					positions : ellipsoid.cartographicArrayToCartesianArray(path),
					material : material,
					width: 1
				});
				this.makeLabel4Spec((minLng+maxLng)/2-granularity, Cesium.Math.toRadians(specLines[i]), i, true);
			}
			//特殊经纬线2
			for(i in specLines2)
			{
				//为什么material要加在循环里面才不会报错，否则会说object destroy？
				var material2 = Cesium.Material.fromType('Color', {
					color : new Cesium.Color(1.0, 1.0, 0.0, 1.0)
				});
				var path = [];
				for(lat = minLat; lat < maxLat; lat += granularity) {
					path.push(new Cesium.Cartographic(Cesium.Math.toRadians(specLines2[i]), lat))
				}
				path.push(new Cesium.Cartographic(Cesium.Math.toRadians(specLines2[i]), maxLat));
				this._specLines2.add({
					positions : ellipsoid.cartographicArrayToCartesianArray(path),
					material : material2,
					width: 1
				});
				this.makeLabel4Spec(Cesium.Math.toRadians(specLines2[i]),latitudeText, i, false);
			}
		}
		
		//绘制基础经纬网start
 		var ellipsoid = this._ellipsoid;
		var lat, lng, granularity = Cesium.Math.toRadians(1);
		dLat = Cesium.Math.toRadians(10.0);
		dLng = Cesium.Math.toRadians(10.0);
		var minLat = -Math.PI/2;
		var maxLat = Math.PI/2;
		var minLng = -Math.PI;
		var maxLng = Math.PI;
		// labels positions
		var latitudeText = minLat + Math.floor((maxLat - minLat) / dLat / 2) * dLat+dLat/2;
		for(lng = minLng; lng < maxLng; lng += dLng) {
			// draw meridian
			var path = [];
			for(lat = minLat; lat < maxLat; lat += granularity) {
				path.push(new Cesium.Cartographic(lng, lat))
			}
			path.push(new Cesium.Cartographic(lng, maxLat));
			this._baseLines.add({
				positions : ellipsoid.cartographicArrayToCartesianArray(path),
				width: linewidth
			});
			var degLng = Cesium.Math.toDegrees(lng);
			//this.makeLabel(lng, latitudeText, this._sexagesimal ? this._decToSex(degLng) : degreeToText(degLng,dLng,'lon'), false);
		}
		
		// lats
		var longitudeText = minLng + Math.floor((maxLng - minLng) / dLng / 2) * dLng+dLng/2;
		for(lat = minLat; lat < maxLat; lat += dLat) {
			// draw parallels
			var path = [];
			for(lng = minLng; lng < maxLng; lng += granularity) {
				path.push(new Cesium.Cartographic(lng, lat))
			}
			path.push(new Cesium.Cartographic(maxLng, lat));
			this._baseLines.add({
				positions : ellipsoid.cartographicArrayToCartesianArray(path),
				width: linewidth,
			});
			var degLat = Cesium.Math.toDegrees(lat);
			//this.makeLabel(longitudeText, lat, this._sexagesimal ? this._decToSex(degLat) : degreeToText(degLat,dLat,'lat'), true);
		} 
		//绘制基础经纬网end
		//console.log('south polar',pointInWindow(this._scene,this._scene.canvas,180,-90));
		//console.log('north polar',pointInWindow(this._scene,this._scene.canvas,180,90));
		console.log('this._polylines',this._polylines.length);
		console.log('this._labels',this._labels.length);
		console.log('this._specLines',this._specLines.length);
		console.log('this._baseLines',this._baseLines.length);
		console.log('this._specLines2',this._specLines2.length);
		
    };

    _.prototype.requestImage = function(x, y, level) {

        if(this._show) {
            this._drawGrid(this._getExtentView());
        }

        return this._canvas;
    };

    _.prototype.setVisible = function(visible) {
        this._show = visible;
        if(!visible) {
            this._polylines.removeAll();
			this._specLines.removeAll();
			this._specLines2.removeAll();
			this._baseLines.removeAll();
            this._labels.removeAll();
        } else {
            this._currentExtent = null;
            this._drawGrid(this._getExtentView());
        }
    }

    _.prototype.isVisible = function() {
        return this._show;
    }

    _.prototype._decToSex = function(d) {
        var degs = Math.floor(d);
        var mins = ((Math.abs(d) - degs) * 60.0).toFixed(2);
        if (mins == "60.00") { degs += 1.0; mins = "0.00"; }
        return [degs, ":", mins].join('');
    };

    _.prototype._getExtentView = function(){
        var camera = this._scene.camera ;
        var canvas = this._scene.canvas;
		var container = document.getElementById("cesiumContainer");
		var width = getNum(getStyle(container,'width'));
		var height = getNum(getStyle(container,'height'));
		var leftup = new Cesium.Cartesian2(0, 0);
		var rightdown = new Cesium.Cartesian2(width, height);
		var rightup = new Cesium.Cartesian2(width,0);
		var leftdown = new Cesium.Cartesian2(0, height)	;	
		
		// Translate coordinates
		var corners = [
            camera.pickEllipsoid(leftup, this._ellipsoid),
            camera.pickEllipsoid(rightup, this._ellipsoid),
            camera.pickEllipsoid(leftdown, this._ellipsoid),
            camera.pickEllipsoid(rightdown, this._ellipsoid)
        ];
		$(window).resize(function() {			
			width = getNum(getStyle(container,'width'));
			height = getNum(getStyle(container,'height'));
			leftup = new Cesium.Cartesian2(0, 0);
			rightdown = new Cesium.Cartesian2(width, height);
			rightup = new Cesium.Cartesian2(width,0);
			leftdown = new Cesium.Cartesian2(0, height)	;
			
		});
		//four angle in sky
		if(corners[0]===undefined&&corners[3]===undefined&&corners[1]===undefined&&corners[2]===undefined){
			this._isCross = false;
			return Cesium.Rectangle.MAX_VALUE;
		}
		//at least one angle on earth
		else{
			//leftup and rightup in sky, leftdown and rightdown on earth
			if((!isCartesian3(corners[0])&&isCartesian3(corners[2])&&isCartesian3(corners[3]))||(!isCartesian3(corners[1])&&isCartesian3(corners[2])&&isCartesian3(corners[3]))){	
				var y1 = leftup.y;
				var y2 = leftdown.y;
				// Define differences and error check
				var sy = (y1 < y2) ? 1 : -1;
				// Main loop
				while (!isCartesian3(corners[0])&&!(y1==y2)) {
					y1 += sy;
					corners[0] = camera.pickEllipsoid({x:leftup.x, y:y1}, this._ellipsoid);	
				}
				var y1 = rightup.y;

				// Define differences and error check
				var sy = (y1 < y2) ? 1 : -1;
				// Main loop
				while (!isCartesian3(corners[1])&&!(y1==y2)){
					y1 += sy;
					corners[1] = camera.pickEllipsoid({x:rightup.x, y:y1}, this._ellipsoid);	
				}
				var y1 = rightup.y;
				var sy = (y1 < y2) ? 1 : -1;
				var center = camera.pickEllipsoid({x:(rightup.x+leftup.x)/2, y:y1}, this._ellipsoid);
				while (!isCartesian3(center)&&!(y1==y2)) {
					y1 += sy;
					center = camera.pickEllipsoid({x:(rightup.x+leftup.x)/2, y:y1}, this._ellipsoid);	
				}
				corners.push(center);
				if(pointInWindow(this._scene,canvas,180,90)){
					var rect = this._cartoToRect(this._ellipsoid.cartesianArrayToCartographicArray(corners));
					rect.north = Math.PI/2;
					rect.west = -Math.PI;
					rect.east = Math.PI;
					return rect;
				}
				else if(pointInWindow(this._scene,canvas,180,-90)){
					var rect = this._cartoToRect(this._ellipsoid.cartesianArrayToCartographicArray(corners));

					rect.south = -Math.PI/2;

					rect.west = -Math.PI;
					rect.east = Math.PI;
					return rect;
				}
				if(Array.isArray(corners) && corners.length>3){
					var rect = this._cartoToRect(this._ellipsoid.cartesianArrayToCartographicArray(corners));
					if(rect) return rect;
				}
			}
			//only rightdown on earth
			else if(!isCartesian3(corners[0])&&!isCartesian3(corners[1])&&!isCartesian3(corners[2])){
				var x1 = leftdown.x;
				var x2 = rightdown.x;
				// Define differences and error check
				var sx = (x1 < x2) ? 1 : -1;
				// Main loop
				while (!isCartesian3(corners[2])&&!(x1==x2)) {
					x1 += sx;
					corners[2] = camera.pickEllipsoid({x:x1, y:leftdown.y}, this._ellipsoid);
					corners[0] = corners[2];
				}
				
				var y1 = rightup.y;
				var y2 = rightdown.y;
				// Define differences and error check
				var sy = (y1 < y2) ? 1 : -1;
				// Main loop
				while (!isCartesian3(corners[1])&&!(y1==y2)){
					y1 += sy;
					corners[1] = camera.pickEllipsoid({x:rightup.x, y:y1}, this._ellipsoid);	
				}
				var y1 = rightup.y;
				var sy = (y1 < y2) ? 1 : -1;
				var center = camera.pickEllipsoid({x:(rightup.x+leftup.x)/2, y:y1}, this._ellipsoid);
				while (!isCartesian3(center)&&!(y1==y2)) {
					y1 += sy;
					center = camera.pickEllipsoid({x:(rightup.x+leftup.x)/2, y:y1}, this._ellipsoid);	
				}
				if(center) corners.push(center);
				if(pointInWindow(this._scene,canvas,180,90)){
					var rect = this._cartoToRect(this._ellipsoid.cartesianArrayToCartographicArray(corners));
					rect.north = Math.PI/2;
					rect.west = -Math.PI;
					rect.east = Math.PI;
					return rect;
				}
				else if(pointInWindow(this._scene,canvas,180,-90)){
					var rect = this._cartoToRect(this._ellipsoid.cartesianArrayToCartographicArray(corners));
					rect.south = -Math.PI/2;
					rect.west = -Math.PI;
					rect.east = Math.PI;
					return rect;
				}
				if(Array.isArray(corners) && corners.length>3){
					var rect = this._cartoToRect(this._ellipsoid.cartesianArrayToCartographicArray(corners));
					if(rect) return rect;
				}
			}
			//only leftdown on earth
			else if(!isCartesian3(corners[0])&&!isCartesian3(corners[1])&&!isCartesian3(corners[3])){
				//console.log('start');
				var x1 = rightdown.x;
				var x2 = leftdown.x;
				//console.log('x1,x2',x1,x2);
				// Define differences and error check
				var sx =  1;
				// Main loop
				while (!isCartesian3(corners[3])&&!(x1==x2)) {
					x1 -= sx;
					corners[3] = camera.pickEllipsoid({x:x1, y:rightdown.y}, this._ellipsoid);
					//corners.splice(1,1);
					corners[1] = corners[3];
				}
				//console.log('1 end');
				var y1 = leftup.y;
				var y2 = leftdown.y;
				// Define differences and error check
				var sy = (y1 < y2) ? 1 : -1;
				// Main loop
				while (!isCartesian3(corners[0])&&!(y1==y2)) {
					y1 += sy;
					corners[0] = camera.pickEllipsoid({x:leftup.x, y:y1}, this._ellipsoid);	
				}
				//console.log('2 end');

				var y1 = rightup.y;
				var sy = (y1 < y2) ? 1 : -1;
				var center = camera.pickEllipsoid({x:(rightup.x+leftup.x)/2, y:y1}, this._ellipsoid);
				while (!isCartesian3(center)&&!(y1==y2)) {
					y1 += sy;
					center = camera.pickEllipsoid({x:(rightup.x+leftup.x)/2, y:y1}, this._ellipsoid);	
				}
				//console.log('3 end');

				if(center) corners.push(center);
				if(pointInWindow(this._scene,canvas,180,90)){
					var rect = this._cartoToRect(this._ellipsoid.cartesianArrayToCartographicArray(corners));
					rect.north = Math.PI/2;
					rect.west = -Math.PI;
					rect.east = Math.PI;
					return rect;
				}
				else if(pointInWindow(this._scene,canvas,180,-90)){
					var rect = this._cartoToRect(this._ellipsoid.cartesianArrayToCartographicArray(corners));
					rect.south = -Math.PI/2;
					rect.west = -Math.PI;
					rect.east = Math.PI;
					return rect;
				}
				if(Array.isArray(corners) && corners.length>2){
					var rect = this._cartoToRect(this._ellipsoid.cartesianArrayToCartographicArray(corners));
					if(rect) return rect;
				}
			}
			//all angles on earth
			else if(isCartesian3(corners[0])&&isCartesian3(corners[1])&&isCartesian3(corners[2])&&isCartesian3(corners[3])){
				var center = camera.pickEllipsoid({x:(rightup.x+leftup.x)/2, y:leftup.y}, this._ellipsoid);
				//console.log('center',center);
				corners.push(center);
				if(pointInWindow(this._scene,canvas,180,90)){
					var rect = this._cartoToRect(this._ellipsoid.cartesianArrayToCartographicArray(corners));
					rect.north = Math.PI/2;
					rect.west = -Math.PI;
					rect.east = Math.PI;
					//console.log('northpole');
					return rect;
				}
				else if(pointInWindow(this._scene,canvas,180,-90)){
					var rect = this._cartoToRect(this._ellipsoid.cartesianArrayToCartographicArray(corners));
					rect.south = -Math.PI/2;
					rect.west = -Math.PI;
					rect.east = Math.PI;
					//console.log('southpole');
					return rect;
				}
				return this._cartoToRect(this._ellipsoid.cartesianArrayToCartographicArray(corners));
			}	
		}
		//other situation rarely seen, so we don't getExtent
        return Cesium.Rectangle.MAX_VALUE;
    }
	
    function gridPrecision(dDeg) {
        if (dDeg < 0.01) return 3;
        if (dDeg < 0.1) return 2;
        if (dDeg < 1) return 1;
        return 0;
    }
	function degreeToText(num,dDeg,lonlat)
	{
		var string ;
		if(lonlat=='lon')
		{
			if(num>0) string = Math.abs(num).toFixed(gridPrecision(dDeg))+'°E';
			else if(num==0) string = Math.abs(num).toFixed(gridPrecision(dDeg));
			else string = Math.abs(num).toFixed(gridPrecision(dDeg))+'°W';
		}
		else if(lonlat == 'lat')
		{
			if(num>0) string = Math.abs(num).toFixed(gridPrecision(dDeg))+'°N';
			else if(num==0) string = Math.abs(num).toFixed(gridPrecision(dDeg));
			else string = Math.abs(num).toFixed(gridPrecision(dDeg))+'°S';
		}
		else return false;
		return string;
	}
	
	function isCartesian3(data){
		if(data instanceof Cesium.Cartesian3) return true;
		else return false;
	}
	
	function crossTest(cartoArray){
		var rect = Cesium.Rectangle.fromCartographicArray(cartoArray);
		if(rect.east-rect.west>Math.PI) {return true;}
		else return false;
	}

    var mins = [
        Cesium.Math.toRadians(0.05),
        Cesium.Math.toRadians(0.1),
        Cesium.Math.toRadians(0.2),
        Cesium.Math.toRadians(0.5),
        Cesium.Math.toRadians(1.0),
        Cesium.Math.toRadians(2.0),
        Cesium.Math.toRadians(5.0),
        Cesium.Math.toRadians(10.0)
    ];

	var specLines = {'北极圈' : 66.5,
					 '北回归线' : 23.5,
					 '赤道' : 0,
					 '南回归线' : -23.5,
					 '南极圈' : -66.5
					 };
	var specLines2 = {
		'本初子午线':0,
		'逆子午线':180
	};
	
    function loggingMessage(message) {
        var logging = document.getElementById('logging');
        logging.innerHTML += message;
    }

	function CartographicIn360(lon,lat){
		this.longitude = lon;
		this.latitude =lat;
	}
	_.prototype._cartoToRect = function(cartoArray){
		var arr360 = [];
		var i=0;
		if(Array.isArray(cartoArray)){
			if(crossTest(cartoArray)){
				this._isCross = true;
				for(i=0;i<cartoArray.length;i++){
					arr360.push(new CartographicIn360(toggleBF(cartoArray[i].longitude) , cartoArray[i].latitude));
				}
				var minlon =Math.PI;
				var maxlon = -Math.PI;
				var minlat = Math.PI/2;
				var maxlat = -Math.PI/2;
				for(i=0;i<cartoArray.length;i++){
					if(arr360[i].longitude < minlon) minlon = arr360[i].longitude;
					if(arr360[i].longitude > maxlon) maxlon = arr360[i].longitude;
					if(arr360[i].latitude < minlat) minlat = arr360[i].latitude;
					if(arr360[i].latitude > maxlat) maxlat = arr360[i].latitude;
				}
				var rect = new Cesium.Rectangle(toggleBF(minlon),minlat,toggleBF(maxlon),maxlat);
				return rect;
			}
			else{
				this._isCross = false;
				return Cesium.Rectangle.fromCartographicArray(cartoArray);
			}	
		}
		return false;
	}
	
	function arrayIsInBack(cartoArray){
		var count = 0;
		if(Array.isArray(cartoArray)){
			for(var i =0 ; i < cartoArray.length ; i++){
				if(cartoArray[i].longitude<Math.PI/2 || cartoArray[i].longitude<-Math.PI/2)
					count++;
			}
		}
		if(count==4) return true;
		return false;
	}
	function toggleBF(lon){
		if(lon){
			var longitude = lon>0 ? lon-Math.PI : lon+Math.PI;
			return longitude;
		}
		return null;
	}
	function pointInWindow(scene,canvas,lon,lat){
		var carto = Cesium.Cartographic.fromDegrees(lon, lat);
		//判断point是否在窗口所面对的这一半球
		var cartesian3 = Cesium.Ellipsoid.WGS84.cartographicToCartesian(carto);
		if(cartesian3){
			var camera = scene.camera ;
			var occluder = new Cesium.EllipsoidalOccluder(Cesium.Ellipsoid.WGS84, camera.position);
			var isvisible = occluder.isPointVisible(cartesian3);
		}
		//判断point是否在窗口内
		var cartesian2 = Cesium.SceneTransforms.wgs84ToWindowCoordinates(scene, cartesian3);
		if(cartesian2){
			var leftup = new Cesium.Cartesian2(0, 0);
			var rightdown = new Cesium.Cartesian2(canvas.width, canvas.height);
			var rightup = new Cesium.Cartesian2(canvas.width,0);
			var leftdown = new Cesium.Cartesian2(0, canvas.height);
			var test1 = Cesium.pointInsideTriangle(cartesian2, leftup, rightup, rightdown);
			var test2 = Cesium.pointInsideTriangle(cartesian2, leftup, leftdown, rightdown);
		}
		//console.log('isvisible',isvisible);
		//console.log('upright triangle',test1);
		//console.log('downleft triangle',test2);
		if((test1===true||test2===true)&&isvisible===true) return true;
		else return false;
	}
	
	function around(num,ref,d){
		if(num>ref-d&&num<ref+d) return true;
		else return false;
	}
	
    return _;

})();

function drawGraticule()
{
	var graticule = new Graticule({
            tileWidth: 512,
            tileHeight: 512,
            numLines: 10,
        }, this.scene);
	this.scene.imageryLayers.addImageryProvider(graticule);
	graticule.setVisible(false);
	return graticule;
}
//jQuery本身的resize不能监测div的大小变化
//resize of div  
(function($, h, c) {  
    var a = $([]),  
    e = $.resize = $.extend($.resize, {}),  
    i,  
    k = "setTimeout",  
    j = "resize",  
    d = j + "-special-event",  
    b = "delay",  
    f = "throttleWindow";  
    e[b] = 250;  
    e[f] = true;  
    $.event.special[j] = {  
        setup: function() {  
            if (!e[f] && this[k]) {  
                return false;  
            }  
            var l = $(this);  
            a = a.add(l);  
            $.data(this, d, {  
                w: l.width(),  
                h: l.height()  
            });  
            if (a.length === 1) {  
                g();  
            }  
        },  
        teardown: function() {  
            if (!e[f] && this[k]) {  
                return false;  
            }  
            var l = $(this);  
            a = a.not(l);  
            l.removeData(d);  
            if (!a.length) {  
                clearTimeout(i);  
            }  
        },  
        add: function(l) {  
            if (!e[f] && this[k]) {  
                return false;  
            }  
            var n;  
            function m(s, o, p) {  
                var q = $(this),  
                r = $.data(this, d);  
                r.w = o !== c ? o: q.width();  
                r.h = p !== c ? p: q.height();  
                n.apply(this, arguments);  
            }  
            if ($.isFunction(l)) {  
                n = l;  
                return m;  
            } else {  
                n = l.handler;  
                l.handler = m;  
            }  
        }  
    };  
    function g() {  
        i = h[k](function() {  
            a.each(function() {  
                var n = $(this),  
                m = n.width(),  
                l = n.height(),  
                o = $.data(this, d);  
                if (m !== o.w || l !== o.h) {  
                    n.trigger(j, [o.w = m, o.h = l]);  
                }  
            });  
            g();  
        },  
        e[b]);  
    }  
})(jQuery, this);  