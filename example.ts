import { balance } from './src/index'

balance('invalid', 'btc')
  .then((res) => console.log(res))
  .catch((err) => console.log(err))
