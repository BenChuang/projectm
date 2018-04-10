const MyTimeflow = function (board) {
    this.board = board;
    this.boardArea = this.board.boardArea;
    this.boardArea.style.width = "300px";


    this.init();
};

MyTimeflow.prototype.init = function () {
    function getVirtulData(year) {
        year = year || '2017';
        var date = +echarts.number.parseDate(year + '-01-01');
        var end = +echarts.number.parseDate((+year + 1) + '-01-01');
        var dayTime = 3600 * 24 * 1000;
        var data = [];
        for (var time = date; time < end; time += dayTime) {
            data.push([
                echarts.format.formatTime('yyyy-MM-dd', time),
                Math.floor(Math.random() * 10000)
            ]);
        }
        return data;
    }

    var data = getVirtulData(2018);

    option = {
        backgroundColor: '#404a59',

        title: {
            top: 30,
            text: '2016年某人每天的步数',
            left: 'center',
            textStyle: {
                color: '#fff'
            }
        },
        tooltip : {
            trigger: 'item'
        },
        legend: {
            top: '30',
            left: '100',
            data:['步数', 'Top 12'],
            textStyle: {
                color: '#fff'
            }
        },
        calendar: [{
            top: 100,
            left: 'center',
            range: ['2018-01-01', '2018-06-30'],
            splitLine: {
                show: true,
                lineStyle: {
                    color: '#000',
                    width: 4,
                    type: 'solid'
                }
            },
            yearLabel: {
                formatter: '{start}  1st',
                textStyle: {
                    color: '#fff'
                }
            },
            itemStyle: {
                normal: {
                    color: '#323c48',
                    borderWidth: 1,
                    borderColor: '#111'
                }
            }
        }, {
            top: 340,
            left: 'center',
            range: ['2018-07-01', '2018-12-31'],
            splitLine: {
                show: true,
                lineStyle: {
                    color: '#000',
                    width: 4,
                    type: 'solid'
                }
            },
            yearLabel: {
                formatter: '{start}  2nd',
                textStyle: {
                    color: '#fff'
                }
            },
            itemStyle: {
                normal: {
                    color: '#323c48',
                    borderWidth: 1,
                    borderColor: '#111'
                }
            }
        }],
        series : [
            {
                name: '步数',
                type: 'scatter',
                coordinateSystem: 'calendar',
                data: data,
                symbolSize: function (val) {
                    return val[1] / 500;
                },
                itemStyle: {
                    normal: {
                        color: '#ddb926'
                    }
                }
            },
            {
                name: '步数',
                type: 'scatter',
                coordinateSystem: 'calendar',
                calendarIndex: 1,
                data: data,
                symbolSize: function (val) {
                    return val[1] / 500;
                },
                itemStyle: {
                    normal: {
                        color: '#ddb926'
                    }
                }
            }
        ]
    };

    let myChart = echarts.init(this.boardArea);
    myChart.setOption(option);

};