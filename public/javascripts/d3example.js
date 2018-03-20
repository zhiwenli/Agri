/*global d3, sharedObject */
(function () {
    "use strict";

    // Various accessors that specify the four dimensions of data to visualize.
    function x(d) { return d.income; }
    function y(d) { return d.lifeExpectancy; }
    function radius(d) { return d.population; }
    function color(d) { return d.region; }
    function key(d) { return d.name; }

    // Chart dimensions.
    var margin = {top: 19.5, right: 19.5, bottom: 19.5, left: 39.5},
        width = 960 - margin.right,
        height = 500 - margin.top - margin.bottom;

    // Various scales. These domains make assumptions of data, naturally.
    var xScale = d3.scale.log().domain([300, 1e5]).range([0, width]),//设置x轴的刻度范围
        yScale = d3.scale.linear().domain([10, 85]).range([height, 0]),
        radiusScale = d3.scale.sqrt().domain([0, 5e8]).range([0, 40]),
        colorScale = d3.scale.category20c();//构造一个另外20种颜色的序数比例尺

    // The x & y axes.
    var xAxis = d3.svg.axis().orient("bottom").scale(xScale).ticks(12, d3.format(".0")),//orient("bottom"):刻度位设置于横轴下面、scale(xScale)：指定刻度尺
        yAxis = d3.svg.axis().scale(yScale).orient("left");


    $("#chart").hide();
    // Create the SVG container and set the origin.
    var svg = d3.select("#chart").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
      .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");//设置svg的初始位置

    // Add the x-axis.
    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis);

    // Add the y-axis.
    svg.append("g")
        .attr("class", "y axis")       
        .call(yAxis);

    

    // Add an x-axis label.
    svg.append("text")
        .attr("class", "x label")
        .attr("text-anchor", "end")//设置svg中文字对齐方式为右对齐
        .attr("x", width)
        .attr("y", height - 6)
        .text("Per Capita GDP");

    // Add a y-axis label.
    svg.append("text")
        .attr("class", "y label")
        .attr("text-anchor", "end")
        .attr("y", 6)
        .attr("dy", ".75em")
        .attr("transform", "rotate(-90)")
        .text("Life Expetancy");

    // Add the year label; the value is set on transition.
    var label = svg.append("text")
        .attr("class", "year label")
        .attr("text-anchor", "start")
        .attr("y", 28)
        .attr("x", 30)
        .text("Current Year: 1800");

    // Load the data.
    d3.json("/data/permanent/json/nations_geo.json", function(nations) {

      // A bisector since many nation's data is sparsely-defined.
      var bisect = d3.bisector(function(d) { return d[0]; });//创建一个二等分函数

      // Positions the dots based on data.
      function position(dot) {
        dot .attr("cx", function(d) { return xScale(x(d)); })//返回d.income
            .attr("cy", function(d) { return yScale(y(d)); })//返回d.lifeExpectancy
            .attr("r", function(d) { return radiusScale(radius(d)); });//返回d.population
      }

      // Defines a sort order so that the smallest dots are drawn on top.
      function order(a, b) {//sort()调用order开始排序，此处应是从大到小排序
        return radius(b) - radius(a);
      }
      // Interpolates the dataset for the given (fractional) year.
      function interpolateData(year) {
        sharedObject.yearData = nations.map(function(d) {//jquery中map方法来遍历对象数组，参数d是指数组中的每个对象（这里即每个国家）
          return {
            name: d.name,
            region: d.region,
            income: interpolateValues(d.income, year),
            population: interpolateValues(d.population, year),
            lifeExpectancy: interpolateValues(d.lifeExpectancy, year),
            lat: d.lat,
            lon: d.lon
          };
        });

        return sharedObject.yearData;
      }

      // Add a dot per nation. Initialize the data at 1800, and set the colors.
      var dot = svg.append("g")//在svg中添加一个把相关于素进行组合的容器，以便统一设置相关样式
          .attr("class", "dots")
        .selectAll(".dot")
          .data(interpolateData(1800))//为每个国家赋予该年份的数据
        .enter().append("circle")//enter()获得占位符，因为data()追加数据时，".dot"对应的元素并不存在，所以要添加一定数量的占位符，并在后面append相应元素
          .attr("class", "dot")
          .style("fill", function(d) { return colorScale(color(d)); })
          .call(position)//d3中call方法，调用一个函数//对每个dot（即国家）赋予收入、寿命、人口数据
          .sort(order)//排序
		  .on("mouseover", function(d) { 
				sharedObject.dispatch.nationMouseover(d); //这里调用了事件nationMouseover，则触发监听事件做出响应，//该事件的作用是改变点的颜色
		  })
          .on("click", function(d){
              sharedObject.flyTo(d);//当点击时，在地球上飞到这个国家，这个在obor中定义
          });

      // Add a title.
      dot.append("title")
          .text(function(d) { return d.name; });


      // Tweens the entire chart by first tweening the year, and then the data.
      // For the interpolated data, the dots and label are redrawn.
      function tweenYear() {
        var year = d3.interpolateNumber(1800, 2009);
        return function(t) { displayYear(year(t)); };
      }

      // Updates the display to show the specified year.
      function displayYear(year) {
        dot.data(interpolateData(year), key).call(position).sort(order);
        label.text("Current Year: "+ Math.round(year));
      }

      // make displayYear global
      window.displayYear = displayYear;//定义全局变量，也可以直接写为displayYear=。。。

      // Finds (and possibly interpolates) the value for the specified year.
      function interpolateValues(values, year) {
        var i = bisect.left(values, year, 0, values.length - 1),
            a = values[i];
        if (i > 0) {
          var b = values[i - 1],
              t = (year - a[0]) / (b[0] - a[0]);
          return a[1] * (1 - t) + b[1] * t;
        }
        return a[1];
      }

      sharedObject.dispatch.on("nationMouseover.d3", function(nationObject) {//注册一个事件监听事件nationMouseover，当触发事件nationMouseover时，调用监听函数
          //该事件的作用是改变点的颜色
          dot.style("fill", function(d) {
                 if (typeof nationObject !== 'undefined' && d.name === nationObject.name) {
                     return "#00FF00";
                 }

                 return colorScale(color(d));
                 });
      });
    });
}());