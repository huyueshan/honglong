
let add_arr_fn = function(){
    let value = [];
    for (let i = 0; i < 1000; i++) {
        let z = i.toString().split("");
        if (z.length < 2) {
            let n = ["0","0",z[0]];
            value.push(n);
        }else if(z.length < 3){
            let m = ["0",z[0],z[1]];
            value.push(m);
        }else{
            let w = [z[0],z[1],z[2]];
            value.push(w);
        }
    }
    return value;
}

// 组合数组
const add_arr = add_arr_fn();

// 3个0-9的数字组合求和运算 参数为和值，返回匹配组合的数组

let count_add_group = function(value){
    return add_arr.filter(function(arr){
        return parseInt(arr[0])+parseInt(arr[1])+parseInt(arr[2])===value;
    })
}


let arr1 =[
    [0,1,2,3,4,5,6,7,8,9],
    [0,1,2,3,4,5,6,7,8,9],
    [0,1,2,3,4,5,6,7,8,9],
    [0,1,2,3,4,5,6,7,8,9],
    [0,1,2,3,4,5,6,7,8,9],
]
// 组合运算，（参数 array）：为需要组合的数组 （参数z）：z个数的组合,需跟arr.length相等；
// 返回有顺序的数组集合；
// 传入的运算数组的子数组length不能为0；
let count_group = function( array, z){
	let arr = array.concat();
	if (arr.length !== z){
		return;
	}
	for (let t=0; t< arr.length ; t++ )
	{
		if(arr[t].length<1) return;
	}
    if(z === 1) return arr[0];
    let value = [];
    for (let i = 0; i < arr[0].length; i++) {
        for (let q = 0; q < arr[1].length; q++) {
            let n = [arr[0][i],arr[1][q]];
            value.push(n.join(""));
        }
    }
    arr.splice(0,2,value);
    value1 = null;
    return count_group(arr , z-1);
}
 console.log(count_group(arr1,5).length); 



// let arr2 = [0,1,2,3,4,5,6]

// 组选运算， arr：需要运算的数组，length必须大于size；
//  size : 组合成多少个数的组合；
// 在组选60，如果重号的值包含在单号中，arr数组中需添加一个重号的值
 let choose_group = function(arr, size) {
            var allResult = [];
            (function fn(arr, size, result) {
                var arrLen = arr.length;
                if (size > arrLen) {
                    return;
                }
                if (size == arrLen) {
                    allResult.push([].concat(result, arr))
                } else {
                    for (var i = 0 ; i < arrLen; i++) {
                        var newResult = [].concat(result);
                        newResult.push(arr[i]);
                        if (size == 1) {
                            allResult.push(newResult);
                        } else {
                            var newArr = [].concat(arr);
                            newArr.splice(0, i + 1);
                            fn(newArr, size - 1, newResult);
                        }
                    }
                }
            })(arr, size, []);
            return allResult;
        }

//		console.log(choose_group(arr2, 3).length);