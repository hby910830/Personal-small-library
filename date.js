
//写一个函数getIntv，获取从当前时间到指定日期的间隔时间
function getIntv(time){
    var day = 1000*60*60*24;
    var nextDate = Date.parse(time),
        nowDate = Date.now(),
        intv = nextDate-nowDate;
    var days = Math.floor(intv/day),
        hours = Math.floor((intv-days*day)/day*24),
        minutes = Math.floor((intv-days*day-hours*day/24)/day*24*60),
        seconds = Math.floor((intv-days*day-hours*day/24-minutes*day/24/60)/day*24*60*60);
    return '现在距'+time+'还有'+days+"天"+hours+"小时"+minutes+"分"+seconds+"秒";
}

var str = getIntv("2016-05-27");


//把数字日期改成中文日期

function getChsDate(datestr){
    var time = new Date(datestr);
    var chn = ['零','一','二','三','四','五','六','七','八','九','十',
                 '十一','十二','十三','十四','十五','十六','十七','十八',
                 '十九','二十','二十一','二十二','二十三','二十四','二十五',
                 '二十六','二十七','二十八','二十九','三十','三十一'
              ];

    var dataArr = datestr.split('-'),
        year = dataArr[0],
        month = parseInt(dataArr[1]), //去掉月份里的零
        day = parseInt(dataArr[2]); //去掉日期里的零
    
    return chn[year[0]]+chn[year[1]]+chn[year[2]]+chn[year[3]] + '年' + chn[month] +'月' + chn[day] + '日';

}

var str = getChsDate('2016-04-19'); // 二零一六年四月十九日    

//写一个函数获取N天前的日期

function getLastNDays(date) {
    var during = date*24*60*60*1000,
        fulltime = Date.now()-during,
        d = new Date(fulltime);
    
    return d.getFullYear()+'-'+(d.getMonth()+1)+'-'+d.getDate(); 
}
getLastNDays(7)//"2016-4-27"
getLastNDays(14)//"2016-4-20"