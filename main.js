const axios = require('axios');
let mainEnv = process.env.VUE_APP
exports.sum =  function (a, b) {
  return a + b;
}


exports.timerGame =  function (callback) {
  //console.log('Ready....go!');
  const result = () => {
    //console.log("Time's up -- stop!");
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

exports.detectEnv = ()=>{
  return {
    cur:process.env.VUE_APP,
    mainEnv
  }
}

exports.fetchData = () => {
  console.log('Fetching data...');
  return axios
    .get('https://jsonplaceholder.typicode.com/todos/1')
    .then(response => {
      return response.data;
    });
};

const API_ROOT = "http://jsonplaceholder.typicode.com";
class API {
  getPosts() {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open("GET", `${API_ROOT}/posts`);
      xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
          const resp = JSON.parse(xhr.responseText);
          if (resp.error) {
            reject(resp.error);
          } else {
            resolve(resp);
          }
        }
      };
      xhr.send();
    });
  }
}
exports.$http = new API()

exports.asyncHandle = (callback)=>{
  return new Promise((res,rej)=>{
    setTimeout(() => { // 模拟异步
      callback && callback('suc')
      res('suc')
    }, 1000);
  })
}
class User {

  constructor() {
    this.userInfo = {
      isAdmin:false,
      expired:false
    }
  }
  async getInfo() {
    return axios.post('https://wxb-manger/userinfo').then(response =>{
      this.userInfo = response.data.userInfo
    })
  }
  get isAdmin() {
    return this.userInfo.isAdmin 
  }
  get expired() {
    return this.userInfo.expired
  }
  get message() {
    if(this.isAdmin){
      if(this.expired){
        return '请再续费'
      }else{
        return 'vip'
      }
    }else{
      return '欢迎氪金'
    }
  }
}
exports.user = new User()