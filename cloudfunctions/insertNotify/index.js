// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

function insertNotify(event) {
  return new Promise ((resolve, reject) => {
    const {OPENID} = cloud.getWXContext()
    const db = cloud.database()
    db.collection('notify-list').add({
      data: {
        _openid: OPENID,
        title: event.title,
        desc: event.desc,
        date: event.date,
        time: event.time,
        repeat_type: event.repeat_type,
        level: event.level,
        calendar: event.calendar,
        day: event.day,
        complete: 0,
        is_delete: 0,
        create_time: new Date().getTime(),
        update_time: new Date().getTime(),
      },
      success: function(res) {
        resolve(res)
      },
      fail: console.error,
      complete: console.log
    })
  });
}

// 云函数入口函数
exports.main = async (event, context) => {
  const result = await insertNotify(event)
  return result;
}