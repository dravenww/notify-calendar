// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

function updateNotify(event) {
  return new Promise ((resolve, reject) => {
    const db = cloud.database()
    db.collection('notify-list').where({
      _id: event.id
    }).update({
      data: {
        title: event.title,
        desc: event.desc,
        date: event.date,
        time: event.time,
        repeat_type: event.repeat_type,
        level: event.level,
        calendar: event.calendar,
        is_delete: 0,
        update_time: new Date().getTime()
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
  const result = await updateNotify(event)
  return result;
}