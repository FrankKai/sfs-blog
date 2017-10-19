import axios from 'axios'

export default {
  getData (callback) {
    
    axios.get('http://localhost:3001/main').then(res => {
      callback(res.data)
    })
  }
}