#!/usr/bin/python
# -*- coding: utf-8 -*-
from sgp4.earth_gravity import wgs72
from sgp4.io import twoline2rv
#引入时间模块
import datetime
#json模块
import json
import sys,os
#公用时间数据
#从此处开始生成czml格式数据
#currentTime是以UTC时间输入的
currentTime = datetime.datetime.utcnow()
endTime=(currentTime+datetime.timedelta(hours=3))

#是UTC 时间，以便获取正确的坐标
current_time=currentTime.strftime('%Y-%m-%dT%H:%M:%S')
end_time=endTime.strftime('%Y-%m-%dT%H:%M:%S')
time_period=current_time+'Z'+'/'+end_time+'Z'
print currentTime,endTime
# #UTC8  时间
# UTC8_currentTime=currentTime+datetime.timedelta(hours=8)
# UTC8_endTime=UTC8_currentTime+datetime.timedelta(hours=1)
# print UTC8_currentTime,UTC8_endTime
# #是UTC 8 时间
# UTC8_current_time=UTC8_currentTime.strftime('%Y-%m-%dT%H:%M:%S')
# UTC8_end_time=UTC8_endTime.strftime('%Y-%m-%dT%H:%M:%S')
# UTC8_time_period=UTC8_current_time+'Z'+'/'+UTC8_end_time+'Z'

#生成第一个czml首个packet
def document_packet():
    document_packet=json.dumps({"version":'1.0',
                                "id":"document",
                                 "clock": {
      #输入时间戳时还是要转换成UTC+8
      "currentTime": current_time,
      "multiplier": 1,
      "interval": time_period,
      "step": "SYSTEM_CLOCK_MULTIPLIER",
      "range": "LOOP_STOP"
    }})
    #print document_packet
    return document_packet


#生成300秒间隔的时间-位置数据
def produce_position(every_sat):
    #引入新的时间变量，否则全局时间变量会累加
    position_time_start=currentTime
    position_time_end=endTime
    #print position_time_start,position_time_end
    #将时间-位置数据存储在这个数组中
    cartesian_array=[]

    #每隔1分钟 timedelta(minutes=5) 生成一个位置数据，一天共有288个300s
    flag=1
    while flag <= 180:
        #这里输入propagate的时间还是UTC时间
        year=position_time_start.year
        month=position_time_start.month
        day=position_time_start.day
        hour=position_time_start.hour
        minute=position_time_start.minute
        second=position_time_start.second
        #这里输入propagate的时间还是UTC时间
        x,y,z=every_sat.propagate(year,month,day,hour,minute,second)[0]
        #以time, x,y,z的格式放入数组cartesian_array
        #写入czml文件还是要转换成UTC+8
        cartesian_array.append((position_time_start).strftime("%Y-%m-%dT%H:%M:%S")+"Z")
        cartesian_array.append(x*1000)
        cartesian_array.append(y*1000)
        cartesian_array.append(z*1000)

        #时间间隔
        #在python的函数中和全局同名的变量，如果你有修改变量的值就会变成局部变量，
        # 在修改之前对该变量的引用自然就会出现没定义这样的错误了，
        # 如果确定要引用全局变量，并且要对它修改，必须在函数定义中加上global关键字，见函数头部。
        position_time_start=position_time_start+datetime.timedelta(minutes=5)
        #计数
        flag += 1

    #补充UTC时间的end_time的位置点坐标，避免出现轨迹缺口
    #凡是append的，都应抓换成UTC8时间
    # cartesian_array.append(UTC8_end_time+"Z")
    # end_x,end_y,end_z=every_sat.propagate(position_time_end.year,position_time_end.month,position_time_end.day,position_time_end.hour,position_time_end.minute,position_time_end.second)[0]
    # cartesian_array.append(end_x*1000)
    # cartesian_array.append(end_y*1000)
    # cartesian_array.append(end_z*1000)
    #catisian_array：['2016-10-29T10:33:59', 15129414.211933687, -39352346.489952944, -984646.6005878716,...]
    #print cartesian_array
    #print "done"
    return cartesian_array


#model版packet
def object_packet(sat_name,sat_mission_date,line2,cartesian_data):
   #json.dumps将字典变成一个json字符串
    #第一个packet的id必须是"document"
    NORAD_ID=line2.split(' ')[1]
    object_id=sat_name
    object_description="<p>Name: "+sat_name+"</p> <p>NORAD Number: "+NORAD_ID+"</p>"\
   +"</p><p>Satus: In operation</p>"+"</p> <p>Orbit: MEO"+"</p><p>Owner: U.S.A</p>"\
   +"<p>Mission date: "+sat_mission_date+"</p>"
    object_packet=json.dumps({"id":object_id,

    "description":object_description,

    "model": {
        "gltf" : "/data/permanent/satellite_glb_model/GPS.glb",
        "scale" : 1,
        "minimumPixelSize": 30
    },
		"billboard":
     {
      "show": True,
      "scale": 0.5,
      "color": {
           "rgba": [204, 51, 204,255]
        },
      "image":"/public/img/GPSbillboard.png"
    },
	"label":{
      "style" : "FILL_AND_OUTLINE",
      "outlineWidth": 0.5,
      "horizontalOrigin": "LEFT",
      "pixelOffset": {"cartesian2": [45,-45]},
      "text": sat_name,
      "show": True,
      "outlineColor": {"rgba": [255,192,203,255]},
      "font": "10pt TimesNR",
      "fillColor": {"rgba": [255,192,203,255]}
    },

                             "availability":time_period,

                             "position":{"cartesian":cartesian_data,
                                  #千万别忘了加上内插设置
                                "interpolationDegree": 10,
                                "epoch": current_time+'Z',
                                "interpolationAlgorithm": "LAGRANGE",
                                "referenceFrame":"INERTIAL"
                                         },

                             "path":{
							         "material" : {
            "polylineOutline" : {
                "color" : {
                    "rgba" : [255, 0, 255, 255]
                },
                "outlineColor" : {
                    "rgba" : [0, 255, 255, 255]
                },
                "outlineWidth" : 3
            }
        },

                                     "resolution":120,
                                     "leadTime":0,
                                     "trailTime":1000,

                                     "show":[
        {"interval":time_period,
          "boolean": True}],

                                     "width":5
                                     }})
    #print object_packet
    return object_packet

#获取当前py文件所在的路径
#CurrentPath = os.getcwd()
#CurrentPath= os.path.split(os.path.realpath( sys.argv[0] ) )[0]
"""
__file__虽然是所在.py文件的完整路径，但是这个变量有时候返回相对路径，有时候返回绝对路径，
因此 还要用os.path.realpath()函数来处理一下。
os.path.realpath(__file__)输出是 “C:\\test\\sub\\sub_path.py”，
而os.path.split(os.path.realpath(__file__))[0]输 出才是“C:\\test\\sub”。
"""
CurrentPath=os.path.split(os.path.realpath(__file__))[0]

#保存到文件中
def save_czml(document_packet,object_packet):
    czml_data=document_packet+object_packet
    #print czml_data
    #去除名字里的空格
    fname="satellite_GPS"
    #生成的文件路径fpath
    fpath=CurrentPath+'/../data/current/'+fname
    fh = open(fpath+'.czml', 'w')
    fh.write('['+czml_data+']')
    fh.close()
    print fpath;


#读取TLE数据
def readTLEfile():
    #D:\\Cesium-1.25\\VizGNSS\\back-end\\spg4_prj\\
    #将内容全部读取到linelist中，每一行是一个列表元素
    linelist = open(CurrentPath+"/GPS_TLE.txt",'r').readlines()
    #删除重复的 卫星名，每两行表示一颗碎片
    TLElist = [line.strip() for line in linelist]
    #TLElist是TLE数据列表
    #print TLElist
    #索引计数
    sign=0
    #加上卫星名，TLEgroup是三行一组的列表
    TLEgroup=[]
    while sign<len(TLElist):
        TLEgroup.append([TLElist[sign],TLElist[sign+1],TLElist[sign+2]])
        sign=sign+3
    #print len(TLEgroup)
    #print TLEgroup
    return TLEgroup

#存储所有卫星object的数据
object_packet_string=''
#根据选中的卫星名生成对应的czml数据文件
def EverySAT(every_satellite_TLE):
    global object_packet_string
    sat_name=every_satellite_TLE[0].split("(")[0]
    sat_mission_date=every_satellite_TLE[0].split("(")[1].split(",")[1].replace(")","")
    line1=every_satellite_TLE[1]
    line2=every_satellite_TLE[2]
    every_sat=twoline2rv(line1, line2, wgs72)
    #生成time,x,y,z格式的cartisian_array数组中
    cartesian_data=produce_position(every_sat)
    #print cartesian_data
    #生成对象主体数据
    #object_packet=object_packet(cartesian_array)
    #print every_sat.satnum, cartesian_data
    object_packet_string=object_packet_string+',\n'+object_packet(sat_name,sat_mission_date,line2,cartesian_data)
	# print every_sat.satnum, object_packet_string

#获取三元组的TLE数组
TLEgroup=readTLEfile()
for every_satellite_TLE in TLEgroup:
    EverySAT(every_satellite_TLE)

# 生成czml首个packet
document_packet=document_packet()
#最后保存
save_czml(document_packet,object_packet_string)

