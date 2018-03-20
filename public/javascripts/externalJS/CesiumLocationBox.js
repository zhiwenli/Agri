/**
 * Created by 3dgis on 2017/4/5.
 */

/**
 *
 */
var CesiumLocationBox = (function(Cesium,$){
    /**
     * check a obj is empty or not
     * @private
     * @param obj
     * @returns {boolean}
     */
    function isEmpty(obj) {

        // null and undefined are "empty"
        if (obj == null) return true;

        // Assume if it has a length property with a non-zero value
        // that that property is correct.
        if (obj.length > 0)    return false;
        if (obj.length === 0)  return true;

        // If it isn't an object at this point
        // it is empty, but it can't be anything *but* empty
        // Is it empty?  Depends on your application.
        if (typeof obj !== "object") return true;

        // Otherwise, does it have any properties of its own?
        // Note that this doesn't handle
        // toString and valueOf enumeration bugs in IE < 9
        for (var key in obj) {
            if (hasOwnProperty.call(obj, key)) return false;
        }
        return true;
    }

    /**
     * if Cesium and jquery are not defined, throw an Error
     */
    if(isEmpty(Cesium) || isEmpty($)){
        throw new Error('Cesium or jquery not defined!')
    }
    /**
     * a constructor for Cesium location box(CLB)
     * @param viewer
     * @param container element
     * @constructor
     */
    function CLB(viewer,containerId,datapath,whenOpenCallback){
        this._container=document.getElementById(containerId);
        this._viewer=viewer;
        this._currentLocation = this.getCameraLocation();
        this._currentGbcode = '156310000';//this.invGeocode(this._currentLocation);
        this._currentWea = {weather:'晴',tmp:'22~16℃',icon:'d00'};//this.getWeather(this._currentGbcode);
		this._datapath = datapath;
		this._whenOpenCallback = whenOpenCallback?whenOpenCallback:function(){};
        this.init();
        this.updateLocation();
    }

    /**
     * init UI
     */
    CLB.prototype.init=function(){
        $(this._container).append('<button type="button" class="btn btn-default" id="citydrowndown"><span class="weather-city">城市</span><span class="caret"></span></button><ul id="city-dropdown-menu" class="dropdown-menu list-group" style="padding: 0 0 0 0;width:300px;"><li class="list-group-item">当前: <span id="curentcity">全球</span><button id="citydropdown-hide" type="button" class="close"><span >&times;</span><span class="sr-only">Close</span></button></span></li><li class="list-group-item"><form class="form-inline" onsubmit="return false"><div class="input-group"><input id="clb_searchbox" type="text" class="form-control" placeholder="请输入地名" style="height:30px;background-color: rgba(0,0,0,0.0);color: white;"><span class="input-group-btn"><button id="clb-search-btn" class="btn btn-default weather-search-button" type="button"></button></span></div><ul class="dropdown-menu" id="searchlist" style="width:100%"></ul></form></li><li class="list-group-item"><ul class="nav nav-tabs" role="tablist"><li class="active" id="clb_china"><a href="#china">中国</a></li><li id="clb_countries"><a href="#countries">国家或地区</a></li></ul><div class="tab-content"><div id="clb-china-tab" class="tab-pane active"><div id="citylist" style="overflow:scroll;height: 100%;"></div></div><div id="clb-countries-tab" class="tab-pane"><div id="countrylist" style="overflow:scroll;height: 100%;"></div></div></div></li></ul><div id="weather-btn-group" class="btn-group text-left" role="group"><button id="clb-weather-button" type="button" class="btn btn-default dropdown-toggle weather-button" style="display: none;"><span id="weather-day1" style="display:inline-block;width:100px"><span style="color:#e0e658;">今</span><span class="weather-icon"></span><span class="weather-info"></span></span><span id="weather-day2" style="display:inline-block;visibility:hidden;width:100px"><span style="color:#e0e658;">明</span><span class="weather-icon"></span><span class="weather-info"></span></span><span id="weather-day3" style="display:inline-block;visibility:hidden;width:100px"><span style="color:#e0e658;">后</span><span class="weather-icon"></span><span class="weather-info"></span></span><span id="weather-button-caret" class="caret" style="visibility:hidden;"></span></button><ul id="clb-weather-dropdown" class="dropdown-menu" style="width: 326px;"><li style="text-align: center;"><a id="weather-dropdown-cityname" href="javascript:;" style="display: inline;font-weight: bold;">city</a><button id="weatherdropdown-hide" type="button" class="close" style="padding:0 10px 0 10px;"><span >&times;</span><span class="sr-only">Close</span></button></li><li><a href="javascript:;" style="padding-left: 5px;padding-right: 5px;white-space: normal;border-top:1px solid #ccc;border-bottom:1px solid #ccc;"><span id="weather-day1-detail" style="display:inline-block;width:100px;text-align: center;"><div></div><div class="weather-icon"></div><div></div><div></div><div></div><div></div></span><span id="weather-day2-detail" style="display:inline-block;width:100px;text-align: center;"><div></div><div class="weather-icon"></div><div></div><div></div><div></div><div></div></span><span id="weather-day3-detail" style="display:inline-block;width:100px;text-align: center;"><div></div><div class="weather-icon"></div><div></div><div></div><div></div><div></div></span></a></li><li><a id="weather-index" href="javascript:;" style="padding:10px 10px 10px 20px;white-space: normal;text-align: left;border-bottom:1px solid #ccc;"><div></div><div></div><div></div></a><a href="javascript:;"><span id="weather-updatetime"></span><span id="clb-seemore"></span></a></li></ul></div></div>');

        /**
         * deploy UI event
         */
        $(document).ready(function () {
			$(this._container).hide();
            //搜索框输入事件
            $('#clb_searchbox').bind('input propertychange', function() {
                console.log($("#clb_searchbox").val())
                this.query($("#clb_searchbox").val())
            }.bind(this));

            //搜索框回车事件和向下事件
            $('#clb_searchbox').keypress(function(event){
                var keycode = (event.keyCode ? event.keyCode : event.which);
                if(keycode == '13'){
					if($('#searchlist').find('a').length){
						$('#searchlist').find('a').eq(0).click();
					}
                    else{
						$('#searchlist').empty();
						$('#searchlist').append('<li><a href="###">未找到结果</a></li>');
						$('#searchlist').show();
					}
                }
            }.bind(this));

            //搜索按钮点击事件
            $('#clb-search-btn').click(function () {
                if($('#searchlist').find('a').length){
					$('#searchlist').find('a').eq(0).click();
				}
				else{
					$('#searchlist').empty();
					$('#searchlist').append('<li><a href="#">未找到结果</a></li>');
					$('#searchlist').show();
				}
            }.bind(this));

            //城市下拉菜单点击事件
            $("#citydrowndown").click(function(){
				if($('#city-dropdown-menu').is(':hidden')){
					this._whenOpenCallback();
				}
				$('#city-dropdown-menu').toggle();
                var menuheight = $('#clb-china-tab').height();
                var menutop = $('#clb-china-tab').offset().top;
                var windowheight = $(window).height();
                if(menuheight+menutop>windowheight){
                    $('#clb-china-tab').height(windowheight*0.8-menutop);
                    $('#clb-countries-tab').height(windowheight*0.8-menutop);
                    console.log('height change')
                }

                $('#clb-weather-dropdown').hide();
                $("#clb-weather-button").css('width','100px');
                $('#weather-day2').css('visibility','hidden');
                $('#weather-day3').css('visibility','hidden');
                $('#weather-button-caret').css('visibility','hidden');
            }.bind(this));

            //添加标签页点击事件
            $("#clb_china").click(function(){
                $(this).addClass("active");
                $("#clb_countries").removeClass("active");
                $('#clb-countries-tab').removeClass("active");
                $('#clb-china-tab').addClass("active");
            });
            $("#clb_countries").click(function(){
                $(this).addClass("active");
                $("#clb_china").removeClass("active");
                $('#clb-china-tab').removeClass("active");
                $('#clb-countries-tab').addClass("active");
            });

            //关闭按钮
            $('#citydropdown-hide').click(function () {
                console.log('city drop down hide');
                $('#city-dropdown-menu').hide();
            })
            //关闭按钮
            $('#weatherdropdown-hide').click(function () {
                console.log('city drop down hide');
                $('#clb-weather-dropdown').hide();
            })

            //生成国内城市列表
            $.getJSON(this._datapath+"/citylist.json",function(result){
                $.each(result, function(i1, group){
                    // console.log(i1);
                    if(i1=='municipalities'){
                        var provtr = $("<tr></tr>");
                        var citytd = $("<td></td>");
                        $.each(group,function(i2,city){
                            var span = $("<a style='cursor: pointer;color:#e0e658;'></a>");
                            span.text(city.n+' ');
                            var garr = city.g.split(',')
                            // console.log(garr);
                            span.click(function () {
                                viewer.camera.flyTo({
                                    destination:Cesium.Cartesian3.fromDegrees(parseFloat(garr[0]), parseFloat(garr[1]),100000)
                                })
                            });
                            citytd.append(span);
                        })
                        provtr.append("<td style='color:#5596de;'>直辖市</td>",citytd);
                        var tbody = $("<tbody></tbody>").append(provtr);
                        $("#citylist").append($('<table class="table"></table>').append(tbody));
                    }
                    if(i1=='provinces'){
                        var grouptb = $('<table class="table"></table>');
                        var tbody = $("<tbody></tbody>");
                        $.each(group,function (i2,province) {
                            // console.log(province.n);
                            var provtr = $("<tr></tr>");
                            var citytd = $("<td></td>");
                            $.each(province.cities,function (i3,city) {
                                // console.log(city.n);
                                var span = $("<a style='cursor: pointer;color:#fff;'></a>");
                                span.text(city.n+' ');
                                var garr = city.g.split(',')
                                // console.log(garr);
                                span.click(function () {
                                    viewer.camera.flyTo({
                                        destination:Cesium.Cartesian3.fromDegrees(parseFloat(garr[0]), parseFloat(garr[1]),100000)
                                    })
                                });
                                citytd.append(span);
                            })
                            var provtd=$("<td><a style='cursor: pointer;color:#e0e658;'>"+province.n+" </a></td>");
                            var pgarr = province.g.split(',')
                            provtd.click(function () {
                                viewer.camera.flyTo({
                                    destination: Cesium.Cartesian3.fromDegrees(parseFloat(pgarr[0]), parseFloat(pgarr[1]), 1000000)
                                })
                            });
                            provtr.append(provtd,citytd);
                            tbody.append(provtr);
                        })
                        grouptb.append(tbody)
                        $("#citylist").append(grouptb);
                    }
                    if(i1=="other"){
                        var provtr = $("<tr></tr>");
                        $.each(group,function(i2,city){
                            var citytd = $("<td></td>");
                            var span = $("<a style='cursor: pointer;color:#e0e658;'></a>");
                            span.text(city.n+' ');
                            var garr = city.g.split(',')
                            // console.log(garr);
                            span.click(function () {
                                viewer.camera.flyTo({
                                    destination:Cesium.Cartesian3.fromDegrees(parseFloat(garr[0]), parseFloat(garr[1]),100000)
                                })
                            });
                            citytd.append(span);
                            provtr.append(citytd);
                        })
                        $("#citylist").append($('<table class="table"></table>').append('<tbody></tbody>').append(provtr));
                    }

                });
            });

            //生成国家列表
            $.getJSON(this._datapath+"/countrylist_zh.json",function(result){
                var countrytb = $('<table class="table"></table>');
                var tbody = $("<tbody></tbody>");
                $.each(result, function(i1, continent){
                    // console.log(province.n);
                    var contitr = $("<tr></tr>");
                    var countrytd = $("<td></td>");
                    $.each(continent.countries,function (i2,country) {
                        //console.log(country.name);
                        var span = $("<a style='cursor: pointer;color:#fff;'></a>");
                        span.text(country.name+' ');

                        span.click(function () {
                            viewer.camera.flyTo({
                                destination:Cesium.Cartesian3.fromDegrees(country.lon, country.lat,1000000)
                            })
                        });
                        countrytd.append(span);
                    })
                    contitr.append("<td style='color:#e0e658;'>"+continent.name+"  </td>",countrytd);
                    tbody.append(contitr);
                });
                countrytb.append(tbody)
                $("#countrylist").append(countrytb);
            });

            //天气组件定义事件
            $("#clb-weather-button").mouseover(function () {
                $("#clb-weather-button").css('width','300px');
            })
            $('#clb-weather-button').click(function () {
				if($('#clb-weather-dropdown').is(':hidden')){
					this._whenOpenCallback();
				}
                $('#clb-weather-dropdown').toggle();
                $('#city-dropdown-menu').hide();
            }.bind(this))
            $("#weather-btn-group").mouseleave(function () {
                if($('#clb-weather-dropdown').css('display')=='block'){
                    $("#clb-weather-button").css('width','300px');

                    $('#weather-day2').css('visibility','visible');
                    $('#weather-day3').css('visibility','visible');
                    $('#weather-button-caret').css('visibility','visible');
                }
                if($('#clb-weather-dropdown').css('display')=='none'){
                    $("#clb-weather-button").css('width','100px');
                    $('#weather-day2').css('visibility','hidden');
                    $('#weather-day3').css('visibility','hidden');
                    $('#weather-button-caret').css('visibility','hidden');
                }
            })
            $("#clb-weather-button")[0].addEventListener("transitionend", function() {
                if($("#clb-weather-button").width()==300){
                    $('#weather-day2').css('visibility','visible');
                    $('#weather-day3').css('visibility','visible');
                    $('#weather-button-caret').css('visibility','visible');
                }
            }, true);
        }.bind(this));

        $(window).resize(function(){
            console.log('window resize');
            var menuheight = $('#clb-china-tab').height();
            var menutop = $('#clb-china-tab').offset().top;
            var windowheight = $(window).height();
            if(menuheight+menutop>windowheight){
                $('#clb-china-tab').height(windowheight*0.8-menutop);
                $('#clb-countries-tab').height(windowheight*0.8-menutop);
                console.log('height change')
            }
        });
    }

    /**
     * show search list, and move camera to the area
     * @param input
     * @returns {boolean}
     */
    CLB.prototype.query=function (input) {
        var list=$("#searchlist");
        list.empty();
        if(input==''){
            list.hide();
            return false;
        }

        if(input){
            var endpoint='http://map.tianditu.com/query.shtml?postStr='
            var query = '{"keyWord":"'+input+'","level":"12","mapBound":"-180,-90,180,90","queryType":"1","start":"0","count":"10"}&type=query';

            $.getJSON(endpoint+query, function(data){
                if(data.area){
                    if(data.area.points){
                        var grouparr = data.area.points[0].region.split(',');
                        // console.log(grouparr);
                        var arr = [];
                        grouparr.forEach(function (el) {
                            var tmparr = el.split(' ');
                            arr.push(parseFloat(tmparr[0]));
                            arr.push(parseFloat(tmparr[1]));
                        });
                        var cartesians = Cesium.Cartesian3.fromDegreesArray(arr);
                        var boundsphere = Cesium.BoundingSphere.fromPoints(cartesians);
                        var li=$("<li><a href='#'>"+data.area.name+"</a></li>");
                        li.click(function () {
                            $('#clb_searchbox').val(data.area.name);
                            viewer.camera.flyToBoundingSphere(boundsphere);
                            list.hide();
                        })
                        list.append(li);
                    }
                    else{
                        var level = parseInt(data.area.level);
                        var lonlat = data.area.lonlat;
                        var arr = lonlat.split(",");
                        var lon = parseFloat(arr[0]);
                        var lat = parseFloat(arr[1]);
                        var li=$("<li><a href='#'>"+data.area.name+"</a></li>");
                        li.click(function () {
							console.log(lon, lat,64000000/Math.pow(2,level));
                            $('#clb_searchbox').val(data.area.name);
                            viewer.camera.flyTo({
                                destination:Cesium.Cartesian3.fromDegrees(lon, lat,64000000/Math.pow(2,level))
                            });
                            list.hide();
                        })
                        list.append(li)
                    }
                }
                else if(data.pois){
                    data.pois.forEach(function(item){
                        var lonlat = item.lonlat;
                        var arr = lonlat.split(" ");
                        var lon = parseFloat(arr[0]);
                        var lat = parseFloat(arr[1]);
                        var li=$("<li><a href='#'>"+item.name+"</a></li>");
                        li.click(function () {
                            $('#clb_searchbox').val(item.name);
                            viewer.camera.flyTo({
                                destination:Cesium.Cartesian3.fromDegrees(lon, lat,1000)
                            });
                            list.hide();
                        })
                        list.append(li)
                    })
                }
                else {
					console.log(data);
					list.hide();
					// list.empty();
					// if(input){
						// list.append('<li><a href="#">未找到结果</a></li>');
						// list.show();
					// }
                    console.log('empty');
                }
                if(list.text()){
                    list.show();
                }
            }.bind(this));
        }

        // var pattern = new RegExp("^"+input);
        //
        // //搜索城市
        // $.getJSON(this._datapath+"/citylist.json",function(result){
        //     $.each(result, function(i1, group){
        //         // console.log(i1);
        //         if(i1=='municipalities'){
        //             $.each(group,function(i2,city){
        //                 if(pattern.test(city.n)){
        //                     var li=$("<li><a href='#'>"+city.n+"</a></li>");
        //                     var garr = city.g.split(',')
        //                     li.click(function () {
        //                         $('#clb_searchbox').val(city.n);
        //                         viewer.camera.flyTo({
        //                             destination:Cesium.Cartesian3.fromDegrees(parseFloat(garr[0]), parseFloat(garr[1]),100000)
        //                         });
        //                         list.hide();
        //                     })
        //                     list.append(li)
        //                 }
        //             })
        //         }
        //         if(i1=='provinces'){
        //             $.each(group,function (i2,province) {
        //                 if(pattern.test(province.n)){
        //                     var li=$("<li><a href='#'>"+province.n+"</a></li>");
        //                     var garr = province.g.split(',')
        //                     li.click(function () {
        //                         $('#clb_searchbox').val(province.n);
        //                         viewer.camera.flyTo({
        //                             destination:Cesium.Cartesian3.fromDegrees(parseFloat(garr[0]), parseFloat(garr[1]),1000000)
        //                         });
        //                         list.hide();
        //                     })
        //                     list.append(li)
        //                 }
        //                 $.each(province.cities,function (i3,city) {
        //                     if(pattern.test(city.n)){
        //                         var li=$("<li><a href='#'>"+city.n+"</a></li>");
        //                         var garr = city.g.split(',')
        //                         li.click(function () {
        //                             $('#clb_searchbox').val(city.n);
        //                             viewer.camera.flyTo({
        //                                 destination:Cesium.Cartesian3.fromDegrees(parseFloat(garr[0]), parseFloat(garr[1]),100000)
        //                             });
        //                             list.hide();
        //                         })
        //                         list.append(li)
        //                     }
        //                 }.bind(this))
        //             })
        //         }
        //         if(i1=="other"){
        //             $.each(group,function(i2,city){
        //                 if(pattern.test(city.n)){
        //                     var li=$("<li><a href='#'>"+city.n+"</a></li>");
        //                     var garr = city.g.split(',')
        //                     li.click(function () {
        //                         $('#clb_searchbox').val(city.n);
        //                         viewer.camera.flyTo({
        //                             destination:Cesium.Cartesian3.fromDegrees(parseFloat(garr[0]), parseFloat(garr[1]),100000)
        //                         });
        //                         list.hide();
        //                     })
        //                     list.append(li)
        //                 }
        //             })
        //         }
        //     });
        //     list.show();
        // });
        //
        // //搜索国家
        // $.getJSON(this._datapath+"/countrylist_zh.json",function(result){
        //     $.each(result, function(i1, continent){
        //         $.each(continent.countries,function (i2,country) {
        //             if(pattern.test(country.name)){
        //                 var li=$("<li><a href='#'>"+country.name+"</a></li>");
        //                 li.click(function () {
        //                     $('#clb_searchbox').val(country.name);
        //                     viewer.camera.flyTo({
        //                         destination:Cesium.Cartesian3.fromDegrees(country.lon, country.lat,1000000)
        //                     });
        //                     list.hide();
        //                 })
        //                 list.append(li)
        //             }
        //         })
        //     });
        //     list.show();
        // });
    }

    /**
     * input a number, then return the day of the week
     * @param int
     * @returns {String}
     */
    function getweekday(int) {
        switch (int){
            case 1:
                return '周一';
            case 2:
                return '周二';
            case 3:
                return '周三';
            case 4:
                return '周四';
            case 5:
                return '周五';
            case 6:
                return '周六';
            case 7:
                return '周日';
            default:
                return '';
        }
    }
    /**
     * update weather info in UI
     * @param wea
     * @returns {boolean}
     */
    CLB.prototype.updateWeather=function (wea) {
        if(isEmpty(wea)){
            $("#clb-weather-button").hide();
            $("#clb-weather-dropdown").hide();
            console.log('no weather object');
            return false;
        }
        console.log(wea);
        $("#clb-weather-button").show();
        for(var i=1;i<4;i++){
            $(this._container).find('#weather-day'+i).find('.weather-info').html(wea.dw[i-1].tmp);
            $(this._container).find('#weather-day'+i).find('.weather-icon').attr('class','weather-icon '+wea.ic[i-1]);
            var day_detail = $(this._container).find('#weather-day'+i+'-detail');
            // console.log(day_detail);
            var day_icon = day_detail.find('.weather-icon');
            day_icon.attr('class','weather-icon '+wea.ic[i-1]);
            var date = new Date();
            var mydate='';
            var day='';
            if(i==1) {
                day='今天';
                mydate=date.getMonth()+1+'月'+date.getDate()+'日';
            }
            else if (i==2) {
                day=getweekday(date.getDay()+1);
                mydate=date.getMonth()+1+'月'+(date.getDate()+1)+'日';
            }
            else if(i==3) {
                day=getweekday(date.getDay()+2);
                mydate=date.getMonth()+1+'月'+(date.getDate()+2)+'日'
            }
            day_icon.siblings('div')[0].innerHTML=('<div style="color:dodgerblue">'+day+'</div><div style="font-weight: bold;">'+mydate+'</div>');
            day_icon.siblings('div')[1].innerHTML=(wea.dw[i-1].tmp);
            day_icon.siblings('div')[2].innerHTML=(wea.dw[i-1].fa);
            day_icon.siblings('div')[3].innerHTML=(wea.dw[i-1].fe);
            day_icon.siblings('div')[4].innerHTML=(wea.dw[i-1].fg);
        }
        $(this._container).find('#weather-index').children()[0].innerHTML=wea.index[0].i2+': '+wea.index[0].i4;
        $(this._container).find('#weather-index').children()[1].innerHTML=wea.index[2].i2+': '+wea.index[2].i4;
        $(this._container).find('#weather-index').children()[2].innerHTML=wea.index[1].i2+': '+wea.index[1].i4;

        var seemore = $(this._container).find('#clb-seemore');
        seemore.html('<a href="http://www.weather.com.cn/weather1d/'+wea.wcode+'.shtml" target="_blank" style="color:dodgerblue">查看更多</a>');
        seemore.css('float','right');
        $(this._container).find('#weather-updatetime').text(wea.dt);
        console.log('updateWeather done');
    }

    /**
     *get the current location of camera
     * @return Object
     */
    CLB.prototype.getCameraLocation = function(){
        var width = $("#cesiumContainer").width();
        var height = $("#cesiumContainer").height();
        var offsetTop = $("#cesiumContainer").offset().top;
        var offsetLeft = $("#cesiumContainer").offset().left;
        var center = new Cesium.Cartesian2(width/2+offsetLeft,height/2+offsetTop);
        var cartesian = viewer.camera.pickEllipsoid(center);
        if(!Cesium.defined(cartesian)) {
            console.log('center not on globe');
            return null;
        }
        var radians = Cesium.Cartographic.fromCartesian(cartesian);
        var degrees = {
            latitude:Cesium.Math.toDegrees(radians.latitude),
            longitude:Cesium.Math.toDegrees(radians.longitude),
            height:Cesium.Math.toDegrees(radians.height)
        };
        console.log('getCameraLocation done');
        return degrees;
    };
    /**
     * update current location when camera move end
     */
    CLB.prototype.updateLocation = function () {
        viewer.camera.moveEnd.addEventListener(function(){
            this._currentLocation=this.getCameraLocation()||null;//this._currentLocation;
            this._currentGbcode = this.invGeocode(this._currentLocation);//||this._currentGbcode;
            console.log('updateLocation done');
        }.bind(this))
    }
    /**
     * transform coordinates to city name by Tianditu API http://weather.tianditu.com/weather/changeArea?type=changeCity&postStr={'lonlat' : '121,31', 'level' : '4','zoom':'11'}
     */
    CLB.prototype.invGeocode=function(coordinates){
        if(!coordinates||isEmpty(coordinates)){
            console.log('coordinates is empty');
            $(this._container).find('#curentcity').text('');
            $(this._container).find('#weather-dropdown-cityname').text('');
            // $(this._container).find('.weather-city').hide();
            $(this._container).hide();
            console.log('not a city');
            this.getWeather('','');
            return null;
        }
        var input={"lonlat":''+coordinates.longitude+','+coordinates.latitude,'level':'5'};
        var url= 'http://weather.tianditu.com/weather/changeArea?type=changeCity&postStr='+JSON.stringify(input);
        $.getJSON(url, function(data){
            var name = data.name;
            var gbcode=data.gbcode;
            var parentName = data.parentName;
            var parentGbcode = data.parentGbcode;
            if(name && gbcode && parentName && parentGbcode){
                // $(this._container).find('.weather-city').show();
                $(this._container).show();
                $(this._container).find('#curentcity').text(name);
                $(this._container).find('#weather-dropdown-cityname').text(name);
                $(this._container).find('.weather-city').html(parentName+' > '+name);
                this.getWeather(gbcode,parentGbcode);
                console.log('invGeocode done');
                return gbcode;
            }
            else{
                $(this._container).find('#curentcity').text('');
                $(this._container).find('#weather-dropdown-cityname').text('');
                // $(this._container).find('.weather-city').hide();
                $(this._container).hide();
                console.log('not a city');
                this.getWeather('','');
                return null;
            }
        }.bind(this));
    }
    /**
     * get weather from 'http://weather.tianditu.com/weather/weathers?gbcode=' by gbcode
     */
    CLB.prototype.getWeather=function (gbcode,parentGbcode) {
        if(!gbcode||!parentGbcode) this.updateWeather({});
        var url = 'http://weather.tianditu.com/weather/weathers?gbcode='+gbcode;
        $.getJSON(url, function(data){
            if(data.currentdata.length){
                this.updateWeather(data.currentdata[0]);
                console.log('getWeather done(current district)');
                return data.currentdata[0];
            }
            else{
                if(parentGbcode=='0') this.updateWeather({});
                else{
                    var url2='http://weather.tianditu.com/weather/weathers?gbcode='+parentGbcode;
                    $.getJSON(url2, function(data){
                        if(data.currentdata.length){
                            var ptoday = data.currentdata[0].dw[0];
                            var picon = data.currentdata[0].ic[0];
                            this.updateWeather(data.currentdata[0]);
                            console.log('getWeather done(parent district)');
                            return data.currentdata[0];//{weather:ptoday.fa,tmp:ptoday.tmp,icon:picon}
                        }
                        else{
                            console.log('no weather report');
                            return null;
                        }
                    }.bind(this));
                }
            }
        }.bind(this));
    }
	/**
	 * close all dropdown, UI reset
	 */
	CLB.prototype.reset=function(){
		$('#city-dropdown-menu').hide();
		$('#clb-weather-dropdown').hide();
		$("#clb-weather-button").css('width','100px');
		$('#weather-day2').css('visibility','hidden');
		$('#weather-day3').css('visibility','hidden');
		$('#weather-button-caret').css('visibility','hidden');
	}

    return CLB;
})(window.Cesium||{},window.$||{});

