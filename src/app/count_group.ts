

// 四星组选函数，返回有顺序的4个号码的数组，
export const count_group4 = function (arr) {
    let result = [];
    let newresult = [];
    let narr = arr.slice(0, 3);
    for (let n = 0; n < arr[3].length; n++) {
        let d = count_group3(narr);
        result.push(d.map(data => data.toString() + arr[3][n]));
    }
    for (let q = 0; q < result.length; q++) {
        for (let w = 0; w < result[q].length; w++) {
            newresult.push(result[q][w]);
        }
    }
    return newresult;
}
// 前/中/后/三组选函数，返回顺序一致的三个号码的数组，
export const count_group3 = function (arr) {
    if (arr.length > 1) {
        var len1 = arr[0].length, len2 = arr[1].length, newArr = arr.slice(0), temp = [];
        for (var i = 0; i < len1; i++) {
            for (var j = 0; j < len2; j++) {
                temp.push(arr[0][i].toString() + arr[1][j])
            }
        }
        newArr.splice(0, 2, temp);

        // let count_group = count_group3;  
        // count_group3 = null;  
        return arguments.callee(newArr)
    }
    return arr[0]
}

