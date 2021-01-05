// call实现
Function.prototype.myCall = function(context) {

    if (typeof context === "undefined" || context === null) {
        context = window
    }

   //context=context||window  和上面的代码一样
    context.fn = this //指向调用的函数
    const args = [...arguments].slice(1) //获取参数
    const result = context.fn(...args)   //执行函数，获取结果
    delete context.fn //删除属性
    return result //返回结果
}

//apply实现

Function.prototype.myApply = function(context) {
    if (typeof this !== 'function') {
        throw new TypeError('Error')
    }
    context = context || window
    context.fn = this
    let result
    if (arguments[1]) {
        result = context.fn(...arguments[1])
    } else {
        result = context.fn()
    }
    delete context.fn
    return result
}

//bind实现
Function.prototype.myBind = function(context) {
    if (typeof this !== 'function') {
        throw new TypeError('Error')
    }
    //返回一个绑定this的函数，这里我们需要保存this
    const _this = this
    const args = [...arguments].slice(1)
        //返回一个函数
    return function F() {
        //因为返回一个函数，我们可以new F()需要判断能当做构造函数吗
        if (this instanceof F) {
            return new _this(...args, ...arguments)
        }
        return _this.apply(context, args.concat(...arguments))
    }
}
//deepClone
function deepClone1(source) {
    if (!source && typeof source !== 'object') {
      throw new Error('error arguments', 'deepClone')
    }
    const targetObj = source.constructor === Array ? [] : {}
    //获取目标的key集合循环如果source[keys]存在且值类型是object那么继续调用本函数，else 将key对应的值直接给targetObj
    Object.keys(source).forEach(keys => {
      if (source[keys] && typeof source[keys] === 'object') {
        targetObj[keys] = deepClone(source[keys])
      } else {
        targetObj[keys] = source[keys]
      }
    })
    return targetObj
  }

  function deepClone2(obj){
    let cloneObj;
    // 判断当输入的数据是简单数据类型时，直接复制
    if(obj && typeof obj !== 'object'){
        cloneObj = obj;
    }
    // 当输入的数据是对象或者数组时
    else if(obj && typeof obj === 'object'){
        // 检测输入的数据是数组还是对象
        cloneObj = Array.isArray(obj) ? [] : {};

        // 变量数据对象
        for(let key in obj){
            // 判断对象是否存在key属性
            if(obj.hasOwnProperty(key)){
                if(obj[key] && typeof obj[key] === 'object'){
                    // 若当前元素类型为对象时，递归调用
                    cloneObj[key] = deepClone(obj[key]);
                }
                // 若当前元素类型为基本数据类型
                else{
                    cloneObj[key] = obj[key];
                }
            }
        }
    }
    return cloneObj;
}

export function debounce(func, wait, immediate) {
    let timeout, args, context, timestamp, result
  
    const later = function() {
      // 据上一次触发时间间隔
      const last = +new Date() - timestamp
  
      // 上次被包装函数被调用时间间隔 last 小于设定时间间隔 wait
      if (last < wait && last > 0) {
        timeout = setTimeout(later, wait - last)
      } else {
        timeout = null
        // 如果设定为immediate===true，因为开始边界已经调用过了此处无需调用
        if (!immediate) {
          result = func.apply(context, args)
          if (!timeout) context = args = null
        }
      }
    }
  
    return function(...args) {
      context = this
      timestamp = +new Date()
      const callNow = immediate && !timeout
      // 如果延时不存在，重新设定延时
      if (!timeout) timeout = setTimeout(later, wait)
      if (callNow) {
        result = func.apply(context, args)
        context = args = null
      }
  
      return result
    }
  }