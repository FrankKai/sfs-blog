import axios from 'axios'

export default {
  getData (callback) {
    
    axios.get('http://localhost:3001').then(res => {
      callback(res.data)
    })
  }
}