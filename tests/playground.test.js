test('called',()=>{
  let fn = jest.fn(()=>{})
  fn(1)
  expect(fn).toBeCalledWith(expect.any(Number))
}) 
test('object equal',()=>{
  let obj1 = {
    name:'jack',
    age:12,
    friends:['rose']
  }
  let obj2 = {
    name:'jack',
    age:12,
    friends:['rose'],
    //address:undefined
  }
  let obj3 = obj1
  expect(1).toEqual(1)
  expect(obj1).toEqual(obj2)
  expect(obj1).toStrictEqual(obj2)
  expect(obj1).toBe(obj3)
})