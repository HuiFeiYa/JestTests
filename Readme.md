## 钩子函数
* [作用域及不同作用域下的钩子执行顺序](https://jestjs.io/zh-Hans/docs/setup-teardown)
* describe 和 test 块的执行顺序。先将 describe 层的代码执行完，然后执行 test
* 可以使用 test.only('',()=>{}) 仅执行一条测试用例

## [全局设定](https://jestjs.io/zh-Hans/docs/api)
## 匹配器
* toBe() toEqual() toStrictEqual()

```js
test.only('object equal',()=>{
  let obj1 = {
    name:'jack',
    age:12,
    friends:['rose']
  }
  let obj2 = {
    name:'jack',
    age:12,
    friends:['rose'],
    address:undefined
  }
  let obj3 = obj1
  expect(obj1).toEqual(obj2) // key-value 键值对比较
  expect(obj1).toStrictEqual(obj2) // keys 比较，以及值比较 hasOwnProperty()
  expect(obj1).toBe(obj3)  // 引用比较 Object.is(obj1,obj2)
})
```
## 计时器模拟
### jest.useFakeTimers('legacy')
* 使用 `toHaveBeenLastCalledWith` 判断最后一次调用 setTimeout() 函数的入参数
```js
test('call',()=>{
  let fn = jest.fn(()=>{})
  fn('foo')
  //fn('foo1')
  expect(fn).toHaveBeenLastCalledWith('foo') // 最后调用 fn 传入的参数是 foo
}) 
```

```js
jest.useFakeTimers(); // fake timers
// 最后一次调用 timer 传入的参数是
expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 1000);
```

* expect.any(constructor)
作为构造函数的实例，可以匹配任意该构造函数的实例。
```js
test('call',()=>{
  let a = 1
  expect(a).toEqual(expect.any(Number)) // true
}) 

test('call',()=>{
  let fn = jest.fn(()=>{})
  fn(1)
  expect(fn).toBeCalledWith(expect.any(Number))
}) 
```
* 如何判断函数是否被执行，而不使用 `expect.any(Function)`
```js
const handle = timerGame(fn);
expect(setTimeout).toHaveBeenLastCalledWith(handle, 1000);
```
* `jest.advanceTimersByTime(1000)` 时间快进

```js
// 这两者的区别，一个是判断传递个 setTimeout 的参数
expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 1000);
// 这个是判断我们传递的回调函数是否执行
expect(callback).toBeCalled();
```
### jest.useFakeTimers('modern')
`jest.useFakeTimers('modern')` 和 `jest.setSystemTime(number|Date)` 配套使用,用来模拟 date

# mock
## mock 函数
* 捕获函数的调用情况 `toHaveBeenCalled` 必须使用 mock 函数
* 设置函数返回值 
* 改变函数的内部实现
```js
describe('mock function',()=>{
  test.only('mock.fn',()=>{
    let mockFn = jest.fn((arg)=>arg + ' is passed')
    let result = curry(mockFn)('foo')
    expect(mockFn).toBeCalled()
    expect(mockFn).toHaveBeenCalled();
    expect(mockFn).toHaveBeenCalledTimes(1);
    expect(mockFn).toHaveBeenCalledWith("foo");
    expect(result).toBe('foo is passed')
  })
})
```

## mock 模块
查看 `wxb-manager/utils.test.js` 测试 commonUploadPictureOrFile 方法，依赖了很多其他配置，而我们关心它的依赖配置，只考虑函数的输入会导致不同的输出。