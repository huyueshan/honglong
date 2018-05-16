//-- DOM操作
const DOM = {
	//-- 获取标签
	getTag(name) {
		return window.document.getElementsByTagName(name)[0]
	},
	//-- 更换标题
	title(name){
		this.getTag('title').innerHTML = name
	},
	//-- 创建DOM
	create(name='div'){
		return document.createElement(name)
	},
	//-- 设置属性
	setAttr(node,name,value){
		node && node.setAttribute(name.replace(/\s/g,''),value)
	},
	//-- 添加DOM
	addBody(child){
		this.getTag('body').appendChild(child)
	},
	//-- 移除body中的dom
	removeBody(child){
		this.getTab('body').removeChild(child);	
	},
	//-- 插入script
	script(url,callback){
		let script = this.create('script')
		this.setAttr(script,'src',url+'?callback=callback')
		script.onload = script.onreadystatechange = function(){  
			if(script.readyState && script.readyState != 'loaded' && script.readyState != 'complete') return
			script.onreadystatechange = script.onload = null  
			callback && callback() 
		}  
		this.addBody(script)
	}
}

//-- 基础，类似underscore
const _ = {
	op(){
		let op = Object.prototype
		return {
			ostring	: op.toString,
			hasOwn	: op.hasOwnProperty,
		}
	},
	isFunction(it){
		return this.op().ostring.call(it) === '[object Function]'
	},
	isArray(it) {
		return this.op().ostring.call(it) === '[object Array]'
	},
	isObject(it) {
		return this.op().ostring.call(it) === '[object Object]'
	},
	isString(it) {
		return this.op().ostring.call(it) === '[object String]'
	},
	isUndefine(it) {
		return this.op().ostring.call(it) === '[object Undefined]'
	},
	isBool(it) {
		return this.op().ostring.call(it) === '[object Boolean]'
	},
	isNumber(it) {
		return it%1 >= 0
	},
	hasArr(val,array){
		let res = false
		array.map((value) => {
			if(value === val){
				res = true
			}
		})
		return res
	},
	removeArr(val,array){
		array.map((value,i) => {
			value === val && array.splice(i,1)
		})
		return array
	},
	hasProp(obj, prop){
		return this.op().hasOwn.call(obj, prop)
	},
	eachProp(obj, func){
		for(let prop in obj){
			if(this.hasProp(obj, prop)){
				if(func(obj[prop], prop)){
					break;
				}
			}
		}
	},
	mixin(target, source) {  
		if(source){
			this.eachProp(source, function(value, prop) {
				if (!this.hasProp(target, prop)) {
					if (this.isObject(value) && value &&
						!this.isArray(value) && !this.isFunction(value) &&
						!(value instanceof RegExp)){
						if(!target[prop]){
							target[prop] = {};
						}
						_.mixin(target[prop], value);
					}else{
						target[prop] = value;
					}
				}else{
					target[prop] = value;
				}
			}.bind(this))
		}
		return target;
	},
	filterSpace(txt){
		return txt.replace(/\s/g,'')
	},
	cut(txt){
		return this.filterSpace(txt).split('|')
	},
	random(min,max){
		let under	= max ? min : 0
		let top		= max || min
		return parseInt(Math.random()*(top-under+1) + under)
	},
	objEqual(a, b){
		let objA = Object.getOwnPropertyNames(a)
		let objB = Object.getOwnPropertyNames(b)
		if (objA.length != objB.length) {
			return false
		}
		for (var i = 0; i < objA.length; i++) {
			var propName = objA[i]
			if(_.isArray(a[propName])){
				if(a[propName].length != b[propName].length){
				}else{
					for (let j = 0; j < a[propName].length; j++){
						let cItemA = a[propName][j]
						let cItemB = b[propName][j]
						if(_.isObject(cItemA)){
							_.objEqual(cItemA, cItemB)
						}
					}
				}
			}else{
				if(_.isObject(a[propName])){
					_.objEqual(a[propName], b[propName])
				}else{
					if (a[propName] !== b[propName]) {
						return false
					}					
				}
			}
		}
		return true
	}
}
//-- 改造时间
const TranTime = (data,mat) => {
	let format = mat || 'yyyy-MM-dd hh:mm:ss'
	if(data=='0' || data==''){
		return format="--";
	}
	let time = new Date(data*1000)
       var date = {
			"M+": time.getMonth() + 1,
			"d+": time.getDate(),
			"h+": time.getHours(),
			"m+": time.getMinutes(),
			"s+": time.getSeconds(),
			"q+": Math.floor((time.getMonth() + 3) / 3),
			"S+": time.getMilliseconds()
       }
       if(/(y+)/i.test(format)){
			format = format.replace(RegExp.$1, (time.getFullYear() + '').substr(4 - RegExp.$1.length))
       }
       for (var k in date) {
              if (new RegExp("(" + k + ")").test(format)) {
                     format = format.replace(RegExp.$1, RegExp.$1.length == 1
                            ? date[k] : ("00" + date[k]).substr(("" + date[k]).length))
              }
       }
       return format;
}

//-- 缓存
const Store = {	
	set(key,value,type = true){
		if(value === void 0){
			return this.remove(key)
		}
		this.has(key) && this.remove(key)
		var name = !!type ? 'localStorage' : 'sessionStorage'
		try{
			value = JSON.stringify(value)
		}catch(e){
			console.warn('数据不为JSON格式')
		}
		window[name].setItem(key,value)
		return value
	},
	get(key){
		var value = window.localStorage.getItem(key) || window.sessionStorage.getItem(key)
		try{
			value = JSON.parse(value)
		}catch(e){
		}
		return value || false
	},
	has(key){
		return !!this.get(key)
	},
	remove(key){
		window.localStorage.removeItem(key)
		window.sessionStorage.removeItem(key)
	},
	clear(){
		window.localStorage.clear()
		window.sessionStorage.clear()
	},
	//设置cookie
	setCookie(cname, cvalue, exdays) {
		 var d = new Date();
		 d.setTime(d.getTime() + (exdays*24*60*60*1000));
		 var expires = "expires="+d.toUTCString();
		 document.cookie = cname + "=" + cvalue + "; " + expires;
	},
	//获取cookie
	getCookie(cookie_name)
	{//获取单个cookies 
		var acookie=document.cookie.split("; ")
		for(var i=0;i<acookie.length;i++){ 
			var arr=acookie[i].split("="); 
			if(cookie_name==arr[0]){ 
			if(arr.length>1) 
			return unescape(arr[1]); 
			else 
			return ""; 
		}} 
		return ""; 
	} 
}

//-- 通过name获取DOM，返回对象
const GetName = (arr) => {
	let obj = {}
	arr.map(function(el){
		obj[el] = document.getElementsByName(el)[0]
	})
	return obj
}

//-- Focus
const Focus = (name) => {
	let input = GetName([name])
	input[name].focus()
}


export const Base= {
	Store,
    DOM,
	GetName,
	Focus,
	_,
	TranTime
};

