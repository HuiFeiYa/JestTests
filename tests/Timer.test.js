const {sum,timerGame,dateGame} = require('../main.js');

test('adds 1 + 2 to equal 3', () => {
  expect(sum(1, 2)).toBe(3);
});

// 计时器测试
describe('real timer',()=>{
  beforeEach(()=>{
    jest.clearAllTimers()
  })
  test('waits 1 second before ending the game', (done)=>{
    const fn1 = jest.fn(()=>{
      expect(fn1).toHaveBeenCalledTimes(1)
      done()
    })
    timerGame(fn1);
  },15000)
})

describe('mock timer',()=>{
  beforeEach(()=>{
    jest.useFakeTimers();
  })
  test('waits 1 second before ending the game', () => {
    const fn = jest.fn(()=> expect(fn).toHaveBeenCalledTimes(1))
    timerGame(fn)
    expect(setTimeout).toHaveBeenCalledTimes(1); // setTimeout 代码已经被执行
    expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 1000); // 回调在1s后执行
  });
  afterEach(()=>{
    jest.clearAllTimers()
  })
})

describe('run all Timers',()=>{
  beforeEach(()=>{
    jest.useFakeTimers();
  })
  test('all',()=>{
    const callback = jest.fn();
    timerGame(callback);
    // 在这个时间点，定时器的回调不应该被执行
    expect(callback).not.toBeCalled();
    // “快进”时间使得所有定时器回调被执行
    jest.runAllTimers();
  
    // 现在回调函数应该被调用了！
    expect(callback).toBeCalled();
    expect(callback).toHaveBeenCalledTimes(1);
  })
})
describe('run advance timers',()=>{
  beforeEach(()=>{
    jest.useFakeTimers();
  })
  test('advance',()=>{
    const callback = jest.fn();
    timerGame(callback);
    // 在这个时间点，定时器的回调不应该被执行
    expect(callback).not.toBeCalled();
    // “快进”时间，使得所有定时器回调都被执行
    jest.advanceTimersByTime(1000);

    // 到这里，所有的定时器回调都应该被执行了！
    expect(callback).toBeCalled();
    expect(callback).toHaveBeenCalledTimes(1);
  })
})

describe('modern pattern',()=>{
  beforeEach(()=>{
    jest.useFakeTimers('modern')
  })
  test('modern',()=>{
    const callback = jest.fn()
    let fn = dateGame(callback)
    fn()
    // 在这个时间点，定时器的回调不应该被执行
    expect(callback).not.toBeCalled();
    jest.setSystemTime(Date.now() + 2001)
    fn()
    // 到这里，所有的定时器回调都应该被执行了！
    expect(callback).toBeCalled();
    expect(callback).toHaveBeenCalledTimes(1);
  })
})