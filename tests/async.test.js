const {asyncHandle} = require('../main')
describe('asyncHanlde',()=>{
  test("callback was't called",()=>{
    const callback = data=>{
      expect(data).toBe('suc') // 断言不会被执行
    }
    asyncHandle(callback)
  })
  test('callback called',(done)=>{
    const callback = data=>{
        expect(data).toBe('suc')
        done()
    }
    asyncHandle(callback)
  })
  test('called in promise.then',()=>{
    asyncHandle().then(res=>{
      expect(res).toBe('suc')
    })
  })

  test('async',async ()=>{
    let res = await asyncHandle()
    expect(res).toBe('suc')
  })
})

