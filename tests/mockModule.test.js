

const createMockXHR = require('../__mocks__/XMLHttpRequest') 
const {fetchData,$http} = require('../main')
const _ = require('lodash')
let detectEnv
describe('mock window.matchMedia',()=>{
  const oldEnv = process.env
  beforeEach(()=>{
    jest.resetModules()
    process.env = {
      VUE_APP:'wxb'
    }
    detectEnv  = require('../main').detectEnv
  })
  test('matchMedia',()=>{
    expect(detectEnv()).toEqual({"cur": "wxb", "mainEnv": "wxb"})
  })
  afterEach(()=>{
    process.env = {
      ...oldEnv
    }
  })
})

describe('axios',()=>{  test('fechData',()=>{
    fetchData().then(res=>{
      expect(res.title).toBe('delectus aut autem')
    })
  })
})

describe('xmlHttpRequest',()=>{
  test('xmlHttpRequest',()=>{
    const {oldXMLHttpRequest,mockXHR} = createMockXHR()
    const reqPromise = $http.getPosts();
    mockXHR.responseText = JSON.stringify([ // 设置响应
      { title: "test post" },
      { title: "second test post" }
    ]);
    mockXHR.onreadystatechange() // 修改状态吗
    reqPromise.then(res=>{
      expect(res).toEqual([ { title: 'test post' }, { title: 'second test post' } ])
    })
  })
})
describe('lodash',()=>{
  test('chunk',()=>{ // 将数组按大小拆分
    expect(_.chunk([1,2,3],2)).toEqual([[1,2],[3]])
    expect(_.chunk([1,2,3],3)).toEqual([[1,2,3]])
    expect(_.chunk([1,2,3],4)).toEqual([[1,2,3]])
    expect(_.chunk([1,2,3,6],1)).toEqual([[1],[2],[3],[6]])
  })
})