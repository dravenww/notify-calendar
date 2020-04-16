//index.js
import util from '../../utils/index'
import {calendarType, levelType, repeatType, dayType} from '../../utils/const'
const app = getApp()

Page({
  data: {
    calendarType,
    repeatType,
    levelType,
    dayType,
    id: '',
    info: {}
  },
  setLocalData(data) {
    const info = Object.assign({}, this.data.info, data)
    this.setData({
      info: info
    })
  },
  handleDelete() {
    const thiz = this;
    wx.showModal({
      title: '确认',
      content: '确认删除当前提醒吗？',
      success (res) {
        if (res.confirm) {
          util.showLoading();
          wx.cloud.callFunction({
            name: 'deleteNotify',
            data: {
              id: thiz.data.id
            }
          }).then(res => {
            console.log('delete')
            console.log(res)
            wx.navigateBack()
          }).catch(e => {
            wx.hideLoading()
            console.log(e)
          })
        }
      }
    })
  },
  handleSubmit() {
    util.showLoading();
    const info = this.data.info;
    wx.cloud.callFunction({
      name: 'updateNotify',
      data: {
        id: this.data.id,
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
      wx.navigateBack()
    }).catch(e => {
      wx.hideLoading()
      console.log(e)
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
  onShow() {
    util.showLoading();
    const id = this.options.id;
    this.setData({
      id: id
    })
    wx.cloud.callFunction({
      name: 'getInfo',
      data: {
        id: id
      }
    }).then(res => {
      this.setData({
        info: {
          title: res.result.title,
          desc: res.result.desc,
          date: res.result.date,
          time: res.result.time,
          repeat_type: res.result.repeat_type,
          level: res.result.level,
          calendar: res.result.calendar,
          day: res.result.day || 0
        }
      }, () => {
        wx.hideLoading()
      })
    }).catch(e => {
      console.log(e)
    })
  },
  onLoad: function() {
    wx.setNavigationBarTitle({
      title: '小小提醒-新增',
    });
  }
})
