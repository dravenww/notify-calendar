// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init()

function getInfo(event) {
  return new Promise ((resolve, reject) => {
    const {OPENID} = cloud.getWXContext()
    const db = cloud.database()
    db.collection('notify-list').where({
      _id: event.id,
      _openid: OPENID,
      is_delete: 0
    }).get().then(res => {
        resolve(res.data)
      })
  });
}


// 云函数入口函数
exports.main = async (event, context) => {
  const result = await getInfo(event)
  const info = result[0];
  return {
    title: info.title,
    desc: info.desc,
    date: info.date,
    calendar: info.calendar,
    level: info.level,
    repeat_type: info.repeat_type,
    day: info.day,
    time: info.time
  }
}