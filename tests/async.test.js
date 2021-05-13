const {asyncHandle} = require('../main')
describe('asyncHanlde',()=>{
  test("callback was't called",()=>{
    const callback = data=>{
      expect(data).toBe('suc')
    }
    asyncHandle(callback)
  })
  test('callback called',(done)=>{
    const callback = data=>{
      try {
        expect(data).toBe('suc')
        done()
      }catch(err){
        done(err)
      }
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

