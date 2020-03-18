/**
 * Created by Administrator on 2018/6/11.
 */
import ajax from '../libs/ajax'

class PrizeApi {
  getPrizeList(data) {
    return new Promise(function (resolve, reject) {
      ajax({
        url: '/crm/marketing/activity/userRewardRecord',
        // data: data,
        params: data,
        json: false,
        method: 'get'
      }).then(function (data) {
        resolve(data)
      })
    })
  }

}

export default PrizeApi