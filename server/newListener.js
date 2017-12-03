const EventEmitter = require('events');
const myEmitter = new EventEmitter();
//仅仅做一次，因此不需要循环
//第二次订阅和触发
myEmitter.once('newListener',(event,listener)=>{
  if(event === 'event'){
  //插入一个新的监听器
    myEmitter.on('event',()=>{
        console.log('B')
    })
  }
})
myEmitter.on('event',()=>{
    console.log('A')
  })
myEmitter.emit('event');
//第二次订阅和触发
myEmitter.once('newListener',(event,listener)=>{
    if(event === 'event1'){
    //插入一个新的监听器
      myEmitter.on('event1',()=>{
          console.log('C')
      })
    }
  })
myEmitter.on('event1',()=>{
    console.log('D')
  })
myEmitter.emit('event1');//失效事件
//输出：CDA