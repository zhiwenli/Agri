//该类用于在WEB应用中调起移动端导航软件
//目前支持百度地图、高德地图、苹果自带地图

var NNB = {
	iosNativeMapUrl: 'http://maps.apple.com/',
	iosBaidMapUrl: 'baidumap://map/direction',
	iosAliMapUrl: 'iosamap://path',

	callIOSNativeMapMark: function(){

	},

	callIOSNativeMapNavi: function(){

	},

	//将键值对数组转换为字符串形式
	KV2Str: function(kvArr){
		var str;
		for (key in kvArr) {
			str += key + '=' + kvArr + '&';
		}console.log(str);
		str = str.substring(0, str.lengh-1);console.log(str);
		return str;
	}
}