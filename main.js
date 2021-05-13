exports.sum =  function (a, b) {
  return a + b;
}


exports.timerGame =  function (callback) {
  console.log('Ready....go!');
  const result = () => {
    console.log("Time's up -- stop!");
    callback && callback();
  }
  setTimeout(result, 1000);
  return result
}
exports.dateGame = function (callback,delay=2000){
  let t = Date.now()
  return function(...arg){
    let cur = Date.now()
    if(cur - t > delay){
      callback.call(this,...arg)
      t = cur
    }
  }
}

// mock 测试，假设下面函数是依赖的函数，不关心其内部实现
/**
 * 
function add(a, b) {
    return a + b;
}
var addCurry = curry(add, 1, 2);
addCurry() // 3

var addCurry = curry(add, 1);
addCurry(2) // 3

var addCurry = curry(add);
addCurry(1, 2) // 3
 */
exports.curry = function(fn,...args1){
  return function curried(...args2){
    return fn(...args1,...args2)
  }
}
/**
 * 
c(1)(2)(3)
c(1)(2,3)
c(1,2,3)
c(1,2)(3)
 */
exports.curry1 = function(fn,length){
  let len = length || fn.length // 参数个数
  return function curried(...args){
    if(args.length >=len){
      return fn(...args)
    }else{
      // 重新包装成新的函数，并且将已有参数传递给函数
      return curry1((...rest)=> fn(...args,...rest),len - args.length)
    }
  }
}
// curry1 只是第三方依赖，我们关心的是我们实现的 actual 函数
exports.actual = function (fn,options,curry) {
  const { isCurry } = options
  if(isCurry){
    return curry(fn)
  }
}