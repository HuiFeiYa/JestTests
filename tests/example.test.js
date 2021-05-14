const {user} = require('../main')

describe('User',()=>{
  // 不推荐直接修改内部的属性
  test('userinfo modify inner data',async ()=>{
    user.userInfo = {
      isAdmin:true,
      expired:false
    }
    expect(user.message).toBe('vip')
  })
  // 通过修改外部数据
  test('userinfo',async ()=>{
    await user.getInfo()
    expect(user.message).toBe('vip')
  })
})