/*
* 函数式JS
* 提供包含了所有imageryViewModels的数组
* @Rely on :  Cesium.js
* @Author : hi@zhiwenli.com
* @Areate at : 2016-11-22 15:29:36
*/


function getImageryViews (){

  //网络地图请求密钥
  //BingMaps
  Cesium.BingMapsApi.defaultKey ='At_Y5icOi-TIGvAWnAM8jsoPbHsgZNrzP7w_GbwdXblt7vgJihC4R7OLyLj0R0wV';


  //地图配置容器
  var imageryViewModels = [];

      
  imageryViewModels.push(new Cesium.ProviderViewModel({
      name : '天地图(遥感影像)',
      iconUrl : Cesium.buildModuleUrl('Widgets/Images/ImageryProviders/tdtImage.jpg'),
      tooltip : '天地图影像\nhttp://www.tianditu.com',
      creationFunction : function() {
          return new Cesium.WebMapTileServiceImageryProvider({
        url :'http://t0.tianditu.com/img_w/wmts',
        layer : 'img',
        style : 'default',
        format : 'tiles',
        tileMatrixSetID : 'w',
        maximumLevel: 18,
        credit:  new Cesium.Credit('Visual Earth Studio') 
       } ) ;   
      }
  }));

  imageryViewModels.push(new Cesium.ProviderViewModel({
      name : '天地图(矢量地图)',
      iconUrl : Cesium.buildModuleUrl('Widgets/Images/ImageryProviders/tdtMap.jpg'),
      tooltip : '天地图矢量地图\nhttp://www.tianditu.com',
      creationFunction : function() {
          return new Cesium.WebMapTileServiceImageryProvider({
        url :'http://t0.tianditu.com/vec_w/wmts',
        layer : 'vec',
        style : 'default',
        format : 'tiles',
        tileMatrixSetID : 'w',
        credit:  new Cesium.Credit('Visual Earth Studio') 
       } ) ;   
      }
  }));

  imageryViewModels.push(new Cesium.ProviderViewModel({
      name : '天地图(地形晕渲地图)',
      iconUrl : Cesium.buildModuleUrl('Widgets/Images/ImageryProviders/tdtDem.jpg'),
      tooltip : '天地图地形晕渲地图\nhttp://www.tianditu.com',
      creationFunction : function() {
          return new Cesium.WebMapTileServiceImageryProvider({
        url :'http://t0.tianditu.com/ter_w/wmts',
        layer : 'ter',
        style : 'default',
        format : 'tiles',
        tileMatrixSetID : 'w',
        credit:  new Cesium.Credit('Visual Earth Studio') 
       } ) ;   
      }
  }));


  imageryViewModels.push(new Cesium.ProviderViewModel({
      name : 'Black Marble 夜间灯光',
      iconUrl : Cesium.buildModuleUrl('Widgets/Images/ImageryProviders/blackMarble.png'),
      tooltip : '全球夜间灯光: The lights of cities and villages trace the outlines of civilization in this global view of the Earth at night as seen by NASA/NOAA\'s Suomi NPP satellite.',
      creationFunction : function() {
          return new Cesium.createTileMapServiceImageryProvider({
              url : '//cesiumjs.org/blackmarble',
              flipXY : true,
              maximumLevel : 8,
              credit : 'Black Marble imagery courtesy NASA Earth Observatory'
          });
      }
  }));


  imageryViewModels.push(new Cesium.ProviderViewModel({
      name : 'Bing Maps 航空影像',
      iconUrl : Cesium.buildModuleUrl('Widgets/Images/ImageryProviders/bingAerial.png'),
      tooltip : 'Bing Maps 航空影像（无标注） \nhttp://www.bing.com/maps',
      creationFunction : function() {
          return new Cesium.BingMapsImageryProvider({
              url : '//dev.virtualearth.net',
              key : 'W3MjBHkPYe6AoMEcdwjU~91eQwGiHbzj2BjHmmba51w~AireS2W_VyEpskRjetiH9S1go6iqFteAOfmWxR7Ab0QQe-NfJCvfDrdFhHwK_dO9',
              mapStyle : Cesium.BingMapsStyle.AERIAL
          });
      }
  }));

  imageryViewModels.push(new Cesium.ProviderViewModel({
      name : 'Bing Maps影像(含标注)',
      iconUrl : Cesium.buildModuleUrl('Widgets/Images/ImageryProviders/bingAerialLabels.png'),
      tooltip : 'Bing Maps 航空影像（含标注）：Bing Maps aerial imagery with label overlays \nhttp://www.bing.com/maps',
      creationFunction : function() {
          return new Cesium.BingMapsImageryProvider({
              url : '//dev.virtualearth.net',
               key : 'W3MjBHkPYe6AoMEcdwjU~91eQwGiHbzj2BjHmmba51w~AireS2W_VyEpskRjetiH9S1go6iqFteAOfmWxR7Ab0QQe-NfJCvfDrdFhHwK_dO9',
              mapStyle : Cesium.BingMapsStyle.AERIAL_WITH_LABELS
          });
      }
  }));

  imageryViewModels.push(new Cesium.ProviderViewModel({
      name : 'Bing Maps 道路地图',
      iconUrl : Cesium.buildModuleUrl('Widgets/Images/ImageryProviders/bingRoads.png'),
      tooltip : 'Bing Maps 道路：Bing Maps standard road maps\nhttp://www.bing.com/maps',
      creationFunction : function() {
          return new Cesium.BingMapsImageryProvider({
              url : '//dev.virtualearth.net',
               key : 'W3MjBHkPYe6AoMEcdwjU~91eQwGiHbzj2BjHmmba51w~AireS2W_VyEpskRjetiH9S1go6iqFteAOfmWxR7Ab0QQe-NfJCvfDrdFhHwK_dO9',
              mapStyle : Cesium.BingMapsStyle.ROAD
          });
      }
  }));


  imageryViewModels.push(new Cesium.ProviderViewModel({
      name : 'Natural Earth\u00a0II',
      iconUrl : Cesium.buildModuleUrl('Widgets/Images/ImageryProviders/naturalEarthII.png'),
      tooltip : 'Natural Earth II, darkened for contrast.\nhttp://www.naturalearthdata.com/',
      creationFunction : function() {
          return new Cesium.createTileMapServiceImageryProvider({
              url : Cesium.buildModuleUrl('Assets/Textures/NaturalEarthII')
          });
      }
  }));


imageryViewModels.push(new Cesium.ProviderViewModel({
            name: 'Mapbox 卫星影像',
            tooltip: 'Mapbox satellite imagery https://www.mapbox.com/maps/',
            iconUrl: Cesium.buildModuleUrl('Widgets/Images/ImageryProviders/mapboxSatellite.png'),
            creationFunction: function() {
                return new Cesium.MapboxImageryProvider({
                    mapId: 'mapbox.satellite',
                    accessToken: 'pk.eyJ1IjoiZGlnaXRhbGdsb2JlIiwiYSI6ImNpcGg5eGJmdTAxMjB0eG00YWpqa3lpa3AifQ.4Mid8YHSlUt50QbJmHrICQ',
                    credit: 'Mapbox, OpenStreetMap Contributors'
                });
            }
        }));

        imageryViewModels.push(new Cesium.ProviderViewModel({
            name: 'Mapbox 街道地图',
            tooltip: 'Mapbox streets imagery https://www.mapbox.com/maps/',
            iconUrl: Cesium.buildModuleUrl('Widgets/Images/ImageryProviders/mapboxTerrain.png'),
            creationFunction: function() {
                return new Cesium.MapboxImageryProvider({
                    mapId: 'mapbox.streets',
                    accessToken: 'pk.eyJ1IjoiZGlnaXRhbGdsb2JlIiwiYSI6ImNpcGg5eGJmdTAxMjB0eG00YWpqa3lpa3AifQ.4Mid8YHSlUt50QbJmHrICQ',
                    credit: 'Mapbox, OpenStreetMap Contributors'
                });
            }
        }));


        imageryViewModels.push(new Cesium.ProviderViewModel({
            name: 'Mapbox 基本街道地图',
            tooltip: 'Mapbox streets basic imagery https://www.mapbox.com/maps/',
            iconUrl: Cesium.buildModuleUrl('Widgets/Images/ImageryProviders/mapboxStreets.png'),
            creationFunction: function() {
                return new Cesium.MapboxImageryProvider({
                    mapId: 'mapbox.streets-basic',
                     accessToken: 'pk.eyJ1IjoiZGlnaXRhbGdsb2JlIiwiYSI6ImNpcGg5eGJmdTAxMjB0eG00YWpqa3lpa3AifQ.4Mid8YHSlUt50QbJmHrICQ',
                    credit: 'Mapbox, OpenStreetMap Contributors'
                
                });
            }
        }));

imageryViewModels.push(new Cesium.ProviderViewModel({
    name: 'Mapbox地形',
    iconUrl: Cesium.buildModuleUrl('Widgets/Images/ImageryProviders/mapboxTerrain.png'),
    tooltip: 'Satellite Imagery from Mapbox. \nhttp://mapbox.com',
    creationFunction: function () {
        return new Cesium.MapboxImageryProvider({
            mapId: 'mapbox.run-bike-hike',
//Get your Mapbox API Access Token here: http://mapbox.com
            accessToken: 'pk.eyJ1IjoiZGlnaXRhbGdsb2JlIiwiYSI6ImNpcGg5eGJmdTAxMjB0eG00YWpqa3lpa3AifQ.4Mid8YHSlUt50QbJmHrICQ',
            credit: 'Mapbox'
        });
    }
}));

  imageryViewModels.push(new Cesium.ProviderViewModel({
      name : 'ESRI 世界影像',
      iconUrl : Cesium.buildModuleUrl('Widgets/Images/ImageryProviders/esriWorldImagery.png'),
      tooltip : 'World Imagery provides one meter or better satellite and aerial imagery in many parts of the world and lower resolution satellite imagery worldwide.  The map includes NASA Blue Marble: Next Generation 500m resolution imagery at small scales (above 1:1,000,000), i-cubed 15m eSAT imagery at medium-to-large scales (down to 1:70,000) for the world, and USGS 15m Landsat imagery for Antarctica. The map features 0.3m resolution imagery in the continental United States and 0.6m resolution imagery in parts of Western Europe from DigitalGlobe. In other parts of the world, 1 meter resolution imagery is available from GeoEye IKONOS, i-cubed Nationwide Prime, Getmapping, AeroGRID, IGN Spain, and IGP Portugal.  Additionally, imagery at different resolutions has been contributed by the GIS User Community.\nhttp://www.esri.com',
      creationFunction : function() {
          return new Cesium.ArcGisMapServerImageryProvider({
              url : '//services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer',
              enablePickFeatures : false
          });
      }
  }));

  imageryViewModels.push(new Cesium.ProviderViewModel({
      name : 'ESRI 街道地图',
      iconUrl : Cesium.buildModuleUrl('Widgets/Images/ImageryProviders/esriWorldStreetMap.png'),
      tooltip : 'This worldwide street map presents highway-level data for the world. Street-level data includes the United States; much of Canada; Japan; most countries in Europe; Australia and New Zealand; India; parts of South America including Argentina, Brazil, Chile, Colombia, and Venezuela; Ghana; and parts of southern Africa including Botswana, Lesotho, Namibia, South Africa, and Swaziland.\nhttp://www.esri.com',
      creationFunction : function() {
          return new Cesium.ArcGisMapServerImageryProvider({
              url : '//services.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer',
              enablePickFeatures : false
          });
      }
  }));

  imageryViewModels.push(new Cesium.ProviderViewModel({
      name : 'ESRI 国家地理',
      iconUrl : Cesium.buildModuleUrl('Widgets/Images/ImageryProviders/esriNationalGeographic.png'),
      tooltip : 'This web map contains the National Geographic World Map service. This map service is designed to be used as a general reference map for informational and educational purposes as well as a basemap by GIS professionals and other users for creating web maps and web mapping applications.\nhttp://www.esri.com',
      creationFunction : function() {
          return new Cesium.ArcGisMapServerImageryProvider({
              url : '//services.arcgisonline.com/ArcGIS/rest/services/NatGeo_World_Map/MapServer/',
              enablePickFeatures : false
          });
      }
  }));


  imageryViewModels.push(new Cesium.ProviderViewModel({
     name : 'Open\u00adStreet\u00adMap',
     iconUrl : Cesium.buildModuleUrl('Widgets/Images/ImageryProviders/openStreetMap.png'),
     tooltip : 'OpenStreetMap (OSM) is a collaborative project to create a free editable map of the world.\nhttp://www.openstreetmap.org',
     creationFunction : function() {
         return new Cesium.createOpenStreetMapImageryProvider({
             url : '//a.tile.openstreetmap.org/'
         });
     }
  }));

  imageryViewModels.push(new Cesium.ProviderViewModel({
      name : 'Stamen 水体颜色',
      iconUrl : Cesium.buildModuleUrl('Widgets/Images/ImageryProviders/stamenWatercolor.png'),
      tooltip : 'Reminiscent of hand drawn maps, Stamen watercolor maps apply raster effect area washes and organic edges over a paper texture to add warm pop to any map.\nhttp://maps.stamen.com',
      creationFunction : function() {
          return Cesium.createOpenStreetMapImageryProvider({
              url : '//stamen-tiles.a.ssl.fastly.net/watercolor/',
              credit : 'Map tiles by Stamen Design, under CC BY 3.0. Data by OpenStreetMap, under CC BY SA.'
          });
    }
  }));

  imageryViewModels.push(new Cesium.ProviderViewModel({
      name : 'Stamen Toner 黑白地图',
      iconUrl : Cesium.buildModuleUrl('Widgets/Images/ImageryProviders/stamenToner.png'),
      tooltip : 'A high contrast black and white map.\nhttp://maps.stamen.com',
      creationFunction : function() {
          return Cesium.createOpenStreetMapImageryProvider({
              url : '//stamen-tiles.a.ssl.fastly.net/toner/',
              credit : 'Map tiles by Stamen Design, under CC BY 3.0. Data by OpenStreetMap, under CC BY SA.'
          });
      }
  }));

  imageryViewModels.push(new Cesium.ProviderViewModel({
    name: 'DigitalGlobe最新影像',
    iconUrl: Cesium.buildModuleUrl('Widgets/Images/ImageryProviders/dgmapsapi_gbm.png'),
    tooltip: 'Beautiful 50cm imagery focused on temporal currency \nhttp://developer.digitalglobe.com/maps-api',
    creationFunction: function () {
        return new Cesium.MapboxImageryProvider({
            mapId: 'digitalglobe.nal0g75k',
            accessToken: 'pk.eyJ1IjoiZGlnaXRhbGdsb2JlIiwiYSI6ImNpcGg5eGJmdTAxMjB0eG00YWpqa3lpa3AifQ.4Mid8YHSlUt50QbJmHrICQ',
            credit: 'DigitalGlobe Maps API'
        });
    }
}));

imageryViewModels.push(new Cesium.ProviderViewModel({
    name: 'DigitalGlobe影像+街道',
    iconUrl: Cesium.buildModuleUrl('Widgets/Images/ImageryProviders/dgmapsapi_gbmstr.png'),
    tooltip: 'Beautiful 50cm imagery focused on temporal currency \nhttp://developer.digitalglobe.com/maps-api',
    creationFunction: function () {
        return new Cesium.MapboxImageryProvider({
            mapId: 'digitalglobe.nal0mpda',
            accessToken: 'pk.eyJ1IjoiZGlnaXRhbGdsb2JlIiwiYSI6ImNpcGg5eGJmdTAxMjB0eG00YWpqa3lpa3AifQ.4Mid8YHSlUt50QbJmHrICQ',
            credit: 'DigitalGlobe Maps API, Mapbox, OpenStreetMap'
        });
    }
}));


/*
Google Map测试密钥AIzaSyBV9Ir9skml9c2i4iORl_Sa6OwspWtBwbk
Google Map申请密钥AIzaSyCAc4v7NbjqOmNI8sK1YcwndHhFva2AT18（不可用）
*/
imageryViewModels.push(new Cesium.ProviderViewModel({
            name : 'Google遥感影像',
            iconUrl : Cesium.buildModuleUrl('Widgets/Images/ImageryProviders/ge.jpg'),
            creationFunction : function() {
                return createGoogleMaps(Cesium,{key:"AIzaSyBV9Ir9skml9c2i4iORl_Sa6OwspWtBwbk",maptype:"satellite"});
            }
        }));   

imageryViewModels.push(new Cesium.ProviderViewModel({
            name : 'Google道路地图',
            iconUrl : Cesium.buildModuleUrl('Widgets/Images/ImageryProviders/geroad.png'),
            creationFunction : function() {
                return createGoogleMaps(Cesium,{key:"AIzaSyBV9Ir9skml9c2i4iORl_Sa6OwspWtBwbk",maptype:"roadmap"});
            }
        }));  

imageryViewModels.push(new Cesium.ProviderViewModel({
            name : 'Google影像+道路',
            iconUrl : Cesium.buildModuleUrl('Widgets/Images/ImageryProviders/gehybrid.jpg'),
            creationFunction : function() {
                return createGoogleMaps(Cesium,{key:"AIzaSyBV9Ir9skml9c2i4iORl_Sa6OwspWtBwbk",maptype:"hybrid"});
            }
        }));  

imageryViewModels.push(new Cesium.ProviderViewModel({
            name : 'Google地形',
            iconUrl : Cesium.buildModuleUrl('Widgets/Images/ImageryProviders/geterrain.jpg'),
            creationFunction : function() {
                return createGoogleMaps(Cesium,{key:"AIzaSyBV9Ir9skml9c2i4iORl_Sa6OwspWtBwbk",maptype:"terrain"});
            }
        }));   

  return imageryViewModels;

}

//提供三维地形
function getTerrainModels(){

  var DEMproviderViewModels = [];

  // WGS84椭球体地形服务：无地形起伏
  DEMproviderViewModels.push(new Cesium.ProviderViewModel({
      name : 'WGS84椭球体',
      iconUrl : Cesium.buildModuleUrl('Widgets/Images/TerrainProviders/Ellipsoid.png'),
      tooltip : 'WGS84 standard ellipsoid, also known as EPSG:4326',
      creationFunction : function() {
          return new Cesium.EllipsoidTerrainProvider();
      }
  }));


   // VR-TheWorld地形服务：有地形起伏，速度较慢，但不受防火墙屏蔽，可作为一个替代的方案
  DEMproviderViewModels.push(new Cesium.ProviderViewModel({
      name : 'VR World世界地形', 
      iconUrl : Cesium.buildModuleUrl('Widgets/Images/TerrainProviders/VR_world.jpg'),//请替换掉这个图标
      tooltip : 'VT MÄK VR-TheWorld Server',
      creationFunction : function() {
          return new Cesium.VRTheWorldTerrainProvider({
              url : 'http://www.vr-theworld.com/vr-theworld/tiles1.0.0/73/'   //注意此处使用http,而不是https.               
          });
      }
  }));

  // STK地形服务：有地形起伏，速度快，但IP地址（54.192.119.75）受到防火墙屏蔽
  DEMproviderViewModels.push(new Cesium.ProviderViewModel({
      name : 'STK世界地形', 
      iconUrl : Cesium.buildModuleUrl('Widgets/Images/TerrainProviders/STK_world.jpg'),//请替换掉这个图标
      tooltip : 'High-resolution, mesh-based terrain for the entire globe. Free for use on the Internet. Closed-network options are available.\nhttp://www.agi.com',
      creationFunction : function() {
          return new Cesium.CesiumTerrainProvider({
              url : 'https://assets.agi.com/stk-terrain/world',
              requestWaterMask : true,
              requestVertexNormals : true
          });
      }
  }));

  // STK地形服务：有地形起伏，速度快，IP地址不受到防火墙屏蔽
  DEMproviderViewModels.push(new Cesium.ProviderViewModel({
      name : 'STK世界地形2', 
      iconUrl : Cesium.buildModuleUrl('Widgets/Images/TerrainProviders/STK_world2.PNG'),//请替换掉这个图标
      tooltip : 'High-resolution, mesh-based terrain for the entire globe. Free for use on the Internet. Closed-network options are available.\nhttp://www.agi.com',
      creationFunction : function() {
          return new Cesium.CesiumTerrainProvider({
              url : 'https://assets02.agi.com/stk-terrain/world',
              requestWaterMask : true,
              requestVertexNormals : true
          });
      }
  }));

  // ArcticDEM地形服务
  DEMproviderViewModels.push(new Cesium.ProviderViewModel({
      name : 'ArcticDEM世界地形',
      iconUrl : Cesium.buildModuleUrl('Widgets/Images/TerrainProviders/arcticdem.jpg'),//请注意这个图标的位置
      tooltip : 'ArcticDEM地形服务\nhttps://www.pgc.umn.edu/guides/arcticdem/introduction-to-arcticdem/',
      creationFunction : function() {
          return new Cesium.CesiumTerrainProvider({
              url : 'http://assets.agi.com/stk-terrain/v1/tilesets/ArticDEM/tiles',
              requestWaterMask : true,
              requestVertexNormals : true
          });
      }
  }));

  return DEMproviderViewModels;
}