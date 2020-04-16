// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init()

function getList() {
  return new Promise ((resolve, reject) => {
    const db = cloud.database()
    const _ = db.command()
    db.collection('notify-list').where({
      complete: 0,
      repeat_type: _.in(3, 4),
      is_delete: 0,
    })
    .get().then(res => {
        console.log(res)
        resolve(res.data)
      })
  });
}


// 云函数入口函数
exports.main = async (event, context) => {
  const list = await getList();
  let result = [];
  list.forEach(async (item, index) => {
    const res = await cloud.openapi.templateMessage.send({
      touser: item._openid,
      page: 'main',
      data: {
        keyword1: {
          value: item.title
        },
        keyword2: {
          value: item.desc
        }
      },
      templateId: 'TEMPLATE_ID',
      formId: 'FORMID',
      emphasisKeyword: 'keyword1.DATA'
    });
    result.push({
      info: item,
      res: res
    })
  })
  return result
}