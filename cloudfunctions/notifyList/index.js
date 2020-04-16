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
    })
    .orderBy('complete', 'desc')
    .orderBy('level', 'asc')
    .orderBy('update_time', 'desc')
    .get().then(res => {
        console.log(res)
        resolve(res.data)
      })
  });
}


// 云函数入口函数
exports.main = async (event, context) => {
  const result = await getList()
  let list = [];
  result.forEach((item, index) => {
    list.push({
      id: item._id,
      title: item.title,
      desc: item.desc,
      date: item.date,
      calendar: item.calendar,
      level: item.level,
      repeat_type: item.repeat_type,
      time: item.time,
      complete: item.complete,
      day: item.day || 0
    })
  });
  return list
}