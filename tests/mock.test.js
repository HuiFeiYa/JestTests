const {curry,actual} = require('../main')

describe('mock function',()=>{
  test('mock.fn',()=>{
    let mockFn = jest.fn(()=>'boo foo is passed')
    let result = curry(mockFn,'boo')('foo')
    expect(mockFn).toBeCalled()
    expect(mockFn).toHaveBeenCalled();
    expect(mockFn).toHaveBeenCalledTimes(1);
    expect(mockFn).toHaveBeenCalledWith('boo','foo');
    expect(result).toBe('boo foo is passed')
  })
  test('actual function',()=>{
    const options = {
      isCurry:true
    }
    const mockCurry = jest.fn()
    // 改变函数实现
    mockCurry.mockImplementation(()=>{
        return (a)=>{
          return (b)=> a+b
        }
    })
    const add = (a,b) => a+b
    const curried = actual(add,options,mockCurry)
    expect(curried(1)(3)).toBe(4)

    const mockCurry1 = jest.fn()
    mockCurry1.mockImplementation(()=>{
      return (a,b)=>a+b
    })
    const curried1 = actual(add,options,mockCurry1)
    expect(curried1(5,6)).toBe(11)
  })
})