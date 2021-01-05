//实现map
Array.prototype.map = function(callbackFn, thisArg) {
    //一个是回调函数，一个是回调函数的this值(可选)
    // 处理数组类型异常
    if (this === null || this === undefined) {
      throw new TypeError("Cannot read property 'map' of null or undefined");
    }
    // 处理回调类型异常
    if (Object.prototype.toString.call(callbackfn) != "[object Function]") {
      throw new TypeError(callbackfn + ' is not a function')
    }
    // 草案中提到要先转换为对象
    let O = Object(this);
    let T = thisArg;
  
    //获取数组长度，循环把每一项的值执行callbackFn，保存在A中最后return出去
    let len = O.length >>> 0;
    let A = new Array(len);
    for(let k = 0; k < len; k++) {
      // 还记得原型链那一节提到的 in 吗？in 表示在原型链查找
      // 如果用 hasOwnProperty 是有问题的，它只能找私有属性
      if (k in O) {
        let kValue = O[k];
        // 依次传入this, 当前项，当前索引，整个数组 回调函数三个参数依次为当前元素、当前索引、整个数组
        let mappedValue = callbackfn.call(T, KValue, k, O);
        
        A[k] = mappedValue;
      }
    }
    return A;
  }
  //实现reduce   一个为回调函数，另一个为初始值。回调函数中四个默认参数，依次为积累值、当前值、当前索引和整个数组。
  Array.prototype.reduce  = function(callbackfn, initialValue) {
    // 异常处理，和 map 一样
    // 处理数组类型异常
    if (this === null || this === undefined) {
      throw new TypeError("Cannot read property 'reduce' of null or undefined");
    }
    // 处理回调类型异常
    if (Object.prototype.toString.call(callbackfn) != "[object Function]") {
      throw new TypeError(callbackfn + ' is not a function')
    }
    let O = Object(this);
    let len = O.length >>> 0;


    let k = 0;
    let accumulator = initialValue;
    // 如果初始值为空，循环数组，当能匹配到时，进行初始赋值，此时k=1,accumulator=O[0],通过break跳出循环;
    if (accumulator === undefined) {
      for(; k < len ; k++) {
        // 查找原型链
        if (k in O) {
          accumulator = O[k];
          k++;
          break;
        }
      }
    }
    // 表示数组全为空,else则循环执行回调函数，最后returnaccumulator
    if(k === len && accumulator === undefined) 
      throw new Error('Each element of the array is empty');
    for(;k < len; k++) {
      if (k in O) {
        // 注意，核心！
        accumulator = callbackfn.call(undefined, accumulator, O[k], k, O);
      }
    }
    return accumulator;
  }
  //实现push、pop
  Array.prototype.push = function(...items) {

    let O = Object(this);
    let len = this.length >>> 0;
    let argCount = items.length >>> 0;

    // 2 ** 53 - 1 为JS能表示的最大正整数
    if (len + argCount > 2 ** 53 - 1) {
      throw new TypeError("The number of array is over the max value restricted!")
    }
    for(let i = 0; i < argCount; i++) {
      O[len + i] = items[i];
    }
    let newLength = len + argCount;
    O.length = newLength;
    return newLength;
  }
  Array.prototype.pop = function() {
    let O = Object(this);
    let len = this.length >>> 0;
    if (len === 0) {
      O.length = 0;
      return undefined;
    }
    len --;
    let value = O[len];
    delete O[len];
    O.length = len;
    return value;
  }
 //实现filter 一个函数参数。这个函数接受一个默认参数，就是当前元素。
 Array.prototype.filter = function(callbackfn, thisArg) {
    // 处理数组类型异常
    if (this === null || this === undefined) {
      throw new TypeError("Cannot read property 'filter' of null or undefined");
    }
    // 处理回调类型异常
    if (Object.prototype.toString.call(callbackfn) != "[object Function]") {
      throw new TypeError(callbackfn + ' is not a function')
    }
    let O = Object(this);
    let len = O.length >>> 0;

    let resLen = 0;
    let res = [];
    for(let i = 0; i < len; i++) {
      if (i in O) {
        let element = O[i];
        if (callbackfn.call(thisArg, O[i], i, O)) {
          res[resLen++] = element;
        }
      }
    }
    return res;
  }

  //实现splice
     //拷贝删除的元素
  const sliceDeleteElements = (array, startIndex, deleteCount, deleteArr) => {
    for (let i = 0; i < deleteCount; i++) {
        // 通过循环将需要删除的元素拷贝到deleteArr
      let index = startIndex + i;
      if (index in array) {
        let current = array[index];
        deleteArr[i] = current;
      }
    }
  };

  const movePostElements = (array, startIndex, len, deleteCount, addElements) => {
    // 如果添加的元素和删除的元素个数相等，相当于元素的替换，数组长度不变，被删除元素后面的元素不需要挪动
    if (deleteCount === addElements.length) return;
    // 如果添加的元素和删除的元素个数不相等，则移动后面的元素
    else if(deleteCount > addElements.length) {
      // 删除的元素比新增的元素多，那么后面的元素整体向前挪动
      // 一共需要挪动 len - startIndex - deleteCount 个元素
    //   [1,1,1,1,3,3,3,3]
      for (let i = startIndex + deleteCount; i < len; i++) {
        let fromIndex = i;
        // 将要挪动到的目标位置 (deleteCount - addElements.length)空下的位置个数
        let toIndex = i - (deleteCount - addElements.length);
        if (fromIndex in array) {
          array[toIndex] = array[fromIndex];
        } else {
          delete array[toIndex];
        }
      }
      // 注意注意！这里我们把后面的元素向前挪，相当于数组长度减小了，需要删除冗余元素
      // 目前长度为 len + addElements - deleteCount
      for (let i = len - 1; i >= len + addElements.length - deleteCount; i --) {
        delete array[i];
      }
    } else if(deleteCount < addElements.length) {
      // 删除的元素比新增的元素少，那么后面的元素整体向后挪动
      // 思考一下: 这里为什么要从后往前遍历？从前往后会产生什么问题？
      for (let i = len - 1; i >= startIndex + deleteCount; i--) {
        let fromIndex = i;
        // 将要挪动到的目标位置
        let toIndex = i + (addElements.length - deleteCount);
        if (fromIndex in array) {
          array[toIndex] = array[fromIndex];
        } else {
          delete array[toIndex];
        }
      }
    }
  };
  
  const computeStartIndex = (startIndex, len) => {
    // 处理索引负数的情况
    if (startIndex < 0) {
      return startIndex + len > 0 ? startIndex + len: 0;
    } 
    return startIndex >= len ? len: startIndex;
  }
  
  const computeDeleteCount = (startIndex, len, deleteCount, argumentsLen) => {
    // 删除数目没有传，默认删除startIndex及后面所有的
    if (argumentsLen === 1) 
      return len - startIndex;
    // 删除数目过小
    if (deleteCount < 0) 
      return 0;
    // 删除数目过大
    if (deleteCount > len - startIndex) 
      return len - startIndex;
    return deleteCount;
  }
  Array.prototype.splice = function(startIndex, deleteCount, ...addElements)  {
    let argumentsLen = arguments.length;
    let array = Object(this);
    let len = array.length;
    let deleteArr = new Array(deleteCount);

    startIndex = computeStartIndex(startIndex, len);
    deleteCount = computeDeleteCount(startIndex, len, deleteCount, argumentsLen);

  // 判断 sealed 对象和 frozen 对象, 即 密封对象 和 冻结对象
  if (Object.isSealed(array) && deleteCount !== addElements.length) {
    throw new TypeError('the object is a sealed object!')
  } else if(Object.isFrozen(array) && (deleteCount > 0 || addElements.length > 0)) {
    throw new TypeError('the object is a frozen object!')
  }

    // 拷贝删除的元素
    sliceDeleteElements(array, startIndex, deleteCount, deleteArr);
    // 移动删除元素后面的元素
    movePostElements(array, startIndex, len, deleteCount, addElements);
    // 插入新元素
    for (let i = 0; i < addElements.length; i++) {
      array[startIndex + i] = addElements[i];
    }
    array.length = len - deleteCount + addElements.length;
    return deleteArr;
  }
  //实现new
  function newOperator(ctor, ...args) {
    if(typeof ctor !== 'function'){
      throw 'newOperator function the first param must be a function';
    }
    let obj = Object.create(ctor.prototype);
    let res = ctor.apply(obj, args);
    
    let isObject = typeof res === 'object' && res !== null;
    let isFunction = typeof res === 'function';
    return isObect || isFunction ? res : obj;
};

  
  


  