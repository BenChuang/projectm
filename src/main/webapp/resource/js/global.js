/**
 * 打字效果的文字段落
 * @param elem 放置动态文字的元素
 * @param textDynamic string在textFixed后动态打字效果增加的文字
 */
const createTypingText = (elem, textDynamic) => {
    if (elem) {
        textDynamic = "" + textDynamic;
        const textDynamicLength = textDynamic.length;
        //总帧数
        const frameNum = (textDynamicLength * 2) + 100;
        let textIndex = 0;//字指针
        let frameIndex = 0;//帧指针
        //暂停增加文字的间隔帧数
        const inter = (frameNum - textDynamicLength) / 4;
        //将文字分成四部分增加，每部分帧数随机，一帧一个字
        let plusPart = [];
        plusPart.push(parseInt(Math.random() * (textDynamicLength / 2) + 1));
        plusPart.push(parseInt(Math.random() * (textDynamicLength / 2) + 1));
        plusPart.push((textDynamicLength / 2) - plusPart[0]);
        plusPart.push((textDynamicLength / 2) - plusPart[1]);
        let interval = setInterval(function () {
            try {
                //运行到最后一帧则关闭interval
                if (textIndex === textDynamicLength) {
                    clearInterval(interval);
                }
                elem.textContent = textDynamic.substring(0, textIndex);
                if ((frameIndex >= inter && frameIndex < inter + plusPart[0])
                    || (frameIndex >= inter + plusPart[0] + inter && frameIndex < inter + plusPart[0] + inter + plusPart[1])
                    || (frameIndex >= inter + plusPart[0] + inter + plusPart[1] + inter && frameIndex < inter + plusPart[0] + inter + plusPart[1] + inter + plusPart[2])
                    || (frameIndex >= inter + plusPart[0] + inter + plusPart[1] + inter + plusPart[2] + inter && frameIndex < inter + plusPart[0] + inter + plusPart[1] + inter + plusPart[2] + inter + plusPart[3])) {
                    textIndex++;
                }
                frameIndex = (frameIndex + 1) % frameNum;
            } catch (e) {
                clearInterval(interval);
            }
        }, 30);
    }
};


/**
 * 返回字符串所有字符所有排列方式
 * @param str
 * @returns {*}
 */
const anagrams = str => {
    //递归终点，返回两个字符位置相反的字符串的数组
    if (str.length <= 2) {
        return str.length === 2 ? [str, str[1] + str[0]] : [str]
    }
    return str.split("").reduce((total, val, index) => {return total.concat(anagrams(str.slice(0, index) + str.slice(index + 1)/*掏出reduce的当前字符*/).map(letter => val + letter)/*通过anagrams方法翻转其余字符组合成数组后用map加回当前字符*/)/*接起来返回给reduce*/;}, [])
};


/**
 * 运行函数并记录函数运行时间
 * @param func
 * @param params
 */
const timeToken = (func, ...params) => {
    console.time("timeToken");
    let thisFunc = func(...params);
    console.timeEnd("timeToken");
    return thisFunc;
};

/**
 * 少于两个参数下将上一个函数返回值作为上一个函数参数运行函数链
 * @param funcs
 */
const pipe = (...funcs) => param => funcs.reduce((ret, func) => func(ret), param);


/**
 * 随机打乱数组排列顺序
 * @param arr
 */
const shuffleSortArr = arr => arr.sort(() => Math.random() - 0.5);


/**
 * 随机生成有顺序的整数数组
 * @param length 数组长度
 * @param min 数组元素最小值
 * @param max 数组元素最大值
 */
const shuffleArr = (length, min, max) => Array.apply(null, new Array(length)).map(() => Math.floor((Math.random() * (max - min) + min))).sort((a, b) => a - b);


/**
 * 计算中英文混合字符串所占字节数
 * 除了ASCII编码内字符，其余按照双字节算
 * @param str
 * @returns {number}
 */
const getByteLength = str => {
    let byteLen=0, len=str.length;
    if(str !== undefined && typeof str === "string"){
        for(let i=0; i<len; i++){
            if(str.charCodeAt(i)>255){
                byteLen += 2;
            }
            else{
                byteLen++;
            }
        }
        return byteLen;
    }
    else{
        return 0;
    }
};

/**
 * 测试脚本Testing script
 */
const test = () => {
    console.log(anagrams("abc"));// -> ["abc", "acb", "bac", "bca", "cab", "cba"]
    console.log(pipe(btoa, x => x.toUpperCase())("test"));// -> DGVZDA==
    console.log([..."abc"]);// -> ["a", "b", "c"]
    console.log(shuffleSortArr(shuffleArr(10, 1, 999)));
};