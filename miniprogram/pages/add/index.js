//index.js
import util, { formatTime } from '../../utils/index'
import {calendarType, levelType, repeatType, dayType} from '../../utils/const'
const app = getApp()

Page({
  data: {
    calendarType: calendarType,
    repeatType: repeatType,
    levelType: levelType,
    dayType: dayType,
    userInfo: {},
    info: {
      title: "",
      desc: "",
      date: util.formatDate(new Date()),
      time: '10:00',
      repeat_type: 0,
      calendar: 0,
      level: 0,
      day: 0
    }
  },
  setLocalData(data) {
    const info = Object.assign({}, this.data.info, data)
    this.setData({
      info: info
    })
  },
  handleSubmit() {
    util.showLoading();
    const info = this.data.info;
    wx.cloud.callFunction({
      name: 'insertNotify',
      data: {
        title: info.title,
        desc: info.desc,
        date: info.date,
        time: info.time,
        repeat_type: info.repeat_type,
        level: info.level,
        calendar: info.calendar,
        day: info.day
      }
    }).then(res => {
      wx.hideLoading()
      wx.showToast({
        title: '添加成功',
        duration: 1500,
        mask: true,
      })
      setTimeout(() => {
        wx.switchTab({
          url: '/pages/main/index'
        })
      }, 1500)
    }).catch(e => {
      console.log(e)
    })
  },

  onShow() {
    this.setData({
      info: {
        title: "",
        desc: "",
        date: util.formatDate(new Date()),
        time: '10:00',
        repeat_type: 0,
        calendar: 0,
        level: 0,
        day: 0
      }
    })
  },

  handleProxy(e) {
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
