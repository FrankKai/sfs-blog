// 引入 events 模块
const events = require('events')

// 创建 EventEmitter 实例对象
const 小树苗 = new events.EventEmitter()

/**
 * 我们的思路是这样的
 * 我们现在有一颗小树苗的种子
 * 我们把它种到土里
 * 然后给它浇水
 * 然后给它施肥
 * 然后再给它晒晒太阳
 * 然后...
 * 我们就假装它长大了^_^
 */

/**
 * 我们先写一些事件捕获器
 *（好吧，叫监听器也好）
 * 就好像抓小精灵
 * 抓到了，它总该叫一声吧
 */ 

const 种树捕获器 = () => {
  // 在小种子被种到土里一秒钟后， 土地里发出了一声惨绝人寰的尖叫
  setTimeout(() => {
    console.log('啊，好黑。宝宝被种到土里了')
  }, 1000)
}

const 浇水捕获器 = () => {
  setTimeout(() => {
    console.log('咦， 有好心人给宝宝浇水了')
  }, 2500)
  setTimeout(() => {
    console.log('宝宝发芽了^_^')
  }, 4000)
}

const 施肥捕获器 = () => {
  setTimeout(() => {
    console.log('啊啊啊，好臭啊')
  }, 5500)
  setTimeout(() => {
    console.log('不过宝宝还是长高高了^_^')
  }, 7000)
}

const 晒太阳捕获器 = () => {
  setTimeout(() => {
    console.log('今天阳光好好， 宝宝好开心^_^')
  }, 8500)
}

const 长大了捕获器 = () => {
  setTimeout(() => {
    console.log('嗯。现在， 宝宝已经长大了。')
  }, 10000)
  setTimeout(() => {
    console.log('全剧终')
  }, 12000)
}

// 现在，我们把这些事件和小树苗的成长过程关联起来

小树苗.once('播种', 种树捕获器)
小树苗.on('浇水', 浇水捕获器)
小树苗.on('施肥', 施肥捕获器)
小树苗.on('晒太阳', 晒太阳捕获器)
小树苗.on('长大了', 长大了捕获器)

// 好了，让我们开始种树吧^_^

// 小树苗.emit('播种')
小树苗.emit('浇水')
小树苗.emit('施肥')
小树苗.emit('晒太阳')
小树苗.emit('长大了')