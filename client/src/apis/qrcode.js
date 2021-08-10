import axios from 'axios'

const instance = axios.create({
  baseURL: 'https://api.happi.dev/v1/qrcode',
  headers: {
    'x-happi-key': 'f584887AolJcLfVNKaz7Z3FezsElnMgswxmMiNgFA6sYHEfd9G73dyPo'
  }
})

export default instance


