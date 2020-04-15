//index.js
import util from '../../utils/index'
import {calendarType, levelType, repeatType} from '../../utils/const'
const app = getApp()

Page({
  data: {
    calendarType: calendarType,
    repeatType: repeatType,
    levelType: levelType,
    userInfo: {},
    info: {
      title: "",
      desc: "",
      date: util.formatDate(new Date()),
      time: '10:00',
      repeat_type: 0,
      calendar: 0,
      level: 0,
      computed: 0,
    }
  },
  setLocalData(data) {
    const info = Object.assign({}, this.data.info, data)
    this.setData({
      info: info
    })
  },
  handleSubmit() {
    console.log(this.data.info)
  },

  handleProxy(e) {
    console.log(arguments)
    const key = e.currentTarget.dataset.key;
    const type = e.currentTarget.dataset.type;
    let value = e.detail.value;
    if (type === 'int') {
      value = parseInt(value)
    }
    const data = {};
    data[key] = value
    this.setLocalData(data);
  },

  onLoad: function() {
    wx.setNavigationBarTitle({
      title: '小小提醒-新增',
    })
  }
})
