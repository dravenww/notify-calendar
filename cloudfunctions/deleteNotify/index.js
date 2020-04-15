// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

function deleteNotify(event) {
  return new Promise ((resolve, reject) => {
    const db = cloud.database()
    db.collection('notify-list').where({
      _id: event.id
    }).update({
      data: {
        is_delete: 1,
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
  const result = await deleteNotify(event)
  return result;
}