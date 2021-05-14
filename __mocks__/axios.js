const get = url => {
  return Promise.resolve({ data: { title: 'delectus aut autem' } });
};
const post = url=>{
  if(url === 'https://wxb-manger/userinfo'){
    return Promise.resolve({
      data:{
        userInfo:{
          isAdmin:true,
          expired:false
        }
      }
    })
  }
}
exports.get = get;
exports.post = post