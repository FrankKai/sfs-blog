import axios from 'axios'

export default {
  getData (callback) {
    
    axios.get('http://localhost:3001/main').then(res => {
      callback(res.data)
    })
    // return new Promise((resolve,reject)=>{})
  },

  getComments (){
    axios.get('http://localhost:3001/comments').then(res=>{
      callback(res.data)
    })
  }
}