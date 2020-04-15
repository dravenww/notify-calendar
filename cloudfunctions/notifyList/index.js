// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init()

function getList() {
  return new Promise ((resolve, reject) => {
    const {OPENID} = cloud.getWXContext()
    console.log(OPENID)
    const db = cloud.database()
    db.collection('notify-list').where({
      _openid: OPENID,
      is_delete: 0
    }).get().then(res => {
        console.log(res)
        resolve(res.data)
      })
  });
}


// 云函数入口函数
exports.main = async (event, context) => {
  const result = await getList()
  return result
}