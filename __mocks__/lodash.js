module.exports = {
  chunk(arr,len) {
    let length = arr.length 
    let i = 0
    let store = []
    while(i<length){
      store.push(arr.slice(i,i+len))
      i+=len
    }
    return store
  }
}