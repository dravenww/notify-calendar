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
    loading: true,
    userInfo: {},
    list: []
  },

  handleClick(e) {
    const id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/info/index?id=' + id,
    })
  },
  onShow() {
    util.showLoading();
    wx.cloud.callFunction({
      name: 'notifyList'
    }).then(res => {
      this.setData({
        loading: false,
        list: res.result
      }, () => {
        wx.hideLoading()
      });
    }).catch(e => {
      wx.hideLoading()
      console.log(e)
    })
  },
  onLoad: function() {
    wx.setNavigationBarTitle({
      title: '日历',
    })
    wx.startPullDownRefresh()
  }
})
