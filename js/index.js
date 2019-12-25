

var selected = document.querySelector('.selected .right');
var clearEle = '<i class="close">x</i>';
var searchBtn = document.querySelector('.search-box .search');
var searchInput = document.querySelector('.search-box input');
var searchClear = document.querySelector('.search-box .clear');
var clearAll = document.querySelector('.selected .clear-all');

var dataList = [
    {
        name: '乐嘉科技',
        code: 'sh688886',
        time: '2018-08-03',
        rise: '+9.4',
        shouru: '35.34亿',
        lirun: '12.4亿',
        shiying: '6.8',
        market: '132.80'
    },
    {
        name: 'as科技',
        code: 'sh688885',
        time: '2019-12-20',
        rise: '+8.4',
        shouru: '45.34亿',
        lirun: '14.4亿',
        shiying: '7.8',
        market: '32.80'
    },
    {
        name: 'ww科技',
        code: 'sh688884',
        time: '2018-08-05',
        rise: '+7.4',
        shouru: '25.34亿',
        lirun: '16.4亿',
        shiying: '6.5',
        market: '13.80'
    },
    {
        name: 'ff科技',
        code: 'sh688883',
        time: '2019-11-28',
        rise: '+6.4',
        shouru: '15.34亿',
        lirun: '18.4亿',
        shiying: '4.8',
        market: '232.80'
    },
    {
        name: 'aw科技',
        code: 'sh688882',
        time: '2018-12-26',
        rise: '+5.4',
        shouru: '55.34亿',
        lirun: '10.4亿',
        shiying: '6.0',
        market: '532.80'
    },
]
var conditions={
    name: '',
    code: '',
    time: undefined,
    rise: '',
    shouru: '',
    lirun: '',
    shiying: '',
    market: undefined
};
setList(conditions);

clearAll.onclick = function(){  //清楚所有
    selected.innerHTML = '';
    searchInput.value = '';
    var activeAll = document.querySelectorAll('.condition .active');
    for(var i=0;i<activeAll.length;i++){
        remove(activeAll[i]);
    }
    setList()
}

searchBtn.onclick = function(){  //搜索关键字
    if(searchInput.value != ''){
        var span;
        if(selected.querySelector('.search-cell')){
            span = selected.querySelector('.search-cell')
        }else{
            span = document.createElement('span')
        }
        span.innerHTML = searchInput.value + clearEle;
        span.className = 'cell search-cell';
        selected.appendChild(span);

        conditions.name = searchInput.value;
        setList(conditions);
    }
}
searchClear.onclick = function(){  //清楚搜索
    searchInput.value = '';
    if(selected.querySelector('.search-cell')){
        selected.removeChild(selected.querySelector('.search-cell'));

        conditions.name = '';
        setList(conditions);
    }
}

//根据时间筛选
var timeCell = document.querySelectorAll('.time-cell .right .cell');
for(var i=0;i<timeCell.length;i++){
    var timeCellClear = timeCell[i].querySelector('.close')
    timeCell[i].onclick = function(){
        for(var j=0;j<timeCell.length;j++){
            remove(timeCell[j])
        }
        add(this);
        var span;
        if(selected.querySelector('.time-cell')){
            span = selected.querySelector('.time-cell')
        }else{
            span = document.createElement('span')
        }
        span.innerHTML = this.innerHTML;
        span.className = 'cell time-cell';
        selected.appendChild(span);

        if(this.getAttribute('data-key') == 'day'){
            conditions.time = {
                start: new Date(new Date()-7*24*3600*1000),
                end:new Date()
            }
            setList(conditions);
        }else if(this.getAttribute('data-key') == 'month'){
            conditions.time = {
                start: new Date(new Date()-30*24*3600*1000),
                end:new Date()
            }
            setList(conditions);
        }else if(this.getAttribute('data-key') == 'year'){
            conditions.time = {
                start: new Date(new Date()-365*24*3600*1000),
                end:new Date()
            }
            setList(conditions);
        }
    }
    timeCellClear.addEventListener('click',function(e){
        e.stopPropagation();
        remove(this.parentNode);
        selected.removeChild(selected.querySelector('.time-cell'));
        conditions.time = undefined;
        setList(conditions);
    })
}

//切换轮次
var rotationCell = document.querySelectorAll('.rotation-cell .right .cell');
for(var i=0;i<rotationCell.length;i++){
    var rotationCellClear = rotationCell[i].querySelector('.close')
    rotationCell[i].onclick = function(){
        for(var j=0;j<rotationCell.length;j++){
            remove(rotationCell[j])
        }
        add(this);
        var span;
        if(selected.querySelector('.rotation-cell')){
            span = selected.querySelector('.rotation-cell')
        }else{
            span = document.createElement('span')
        }
        span.innerHTML = this.innerHTML;
        span.className = 'cell rotation-cell';
        selected.appendChild(span);

        conditions.rotation = ''
        setList(conditions);
    }
    rotationCellClear.addEventListener('click',function(e){
        e.stopPropagation();
        remove(this.parentNode);
        selected.removeChild(selected.querySelector('.rotation-cell'));
        conditions.rotation = '';
        setList(conditions);
    })
}

//根据市值筛选
var marketCell = document.querySelectorAll('.market-cell .right .cell');
for(var i=0;i<marketCell.length;i++){
    var marketCellClear = marketCell[i].querySelector('.close')
    marketCell[i].onclick = function(){
        for(var j=0;j<marketCell.length;j++){
            remove(marketCell[j])
        }
        add(this);
        var span;
        if(selected.querySelector('.market-cell')){
            span = selected.querySelector('.market-cell')
        }else{
            span = document.createElement('span')
        }
        span.innerHTML = this.innerHTML;
        span.className = 'cell market-cell';
        selected.appendChild(span);

        conditions.market = {
            min: this.getAttribute('data-min'),
            max: this.getAttribute('data-max')
        }
        setList(conditions);
    }
    marketCellClear.addEventListener('click',function(e){
        e.stopPropagation();
        remove(this.parentNode);
        selected.removeChild(selected.querySelector('.market-cell'));
        conditions.market = undefined;
        setList(conditions);
    })
}

//获取列表
function setList(conditions){
    var tbody = document.querySelector('table tbody');
    var list = conditions?filter(conditions, dataList):dataList;
    tbody.innerHTML = '';
    for(var i=0;i<list.length;i++){
        var tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${list[i].name}</td>
            <td>${list[i].code}</td>
            <td>${list[i].time}</td>
            <td>${list[i].rise}</td>
            <td>${list[i].shouru}</td>
            <td>${list[i].lirun}</td>
            <td>${list[i].shiying}</td>
            <td>${list[i].market}</td>
        `;
        tbody.appendChild(tr);
    }
}

//根据条件过滤列表
function filter(condition, data){
    return data.filter(item => {
        return Object.keys(condition).every(key => {
            if(key == 'name'){
                return String(item[key]).toLowerCase().includes(String(condition[key]).trim().toLowerCase() )
            }else if(key == 'time'){
                if(condition[key]){
                    return condition[key].start < new Date(item[key]) && new Date(item[key]) < condition[key].end
                }else{
                    return true
                }
            }else if(key == 'market'){
                if(condition[key]){
                    return condition[key].min < parseInt(item[key]) && (condition[key].max?parseInt(item[key]) < condition[key].max:true)
                }else{
                    return true
                }
            }else{
                return true
            }
        })
    })
}

function add(el){
    el.classList.add("active");
}; 
function remove(el){
    el.classList.remove("active");
};