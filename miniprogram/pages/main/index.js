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
    list: [
      {
        id: 12,
        title: '提醒1',
        desc: '描述描述描述描述描述描述描述描述描述描述',
        date: '2020-04-05',
        time: '10:00',
        repeat_type: 1,
        calendar: 0,
        create_time: util.formatTime(new Date()),
        level: 0,
        computed: 0,
      },
      {
        id: 19,
        title: '提醒2',
        desc: '描述描述描述描述描述描述描述描述描述描述',
        date: '2020-04-05',
        time: '10:00',
        repeat_type: 2,
        calendar: 1,
        create_time: util.formatTime(new Date()),
        level: 1,
        computed: 1,
      },
      {
        id: 14,
        title: '提醒3',
        desc: '描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述',
        date: '2020-04-05',
        time: '10:00',
        repeat_type: 3,
        calendar: 1,
        create_time: util.formatTime(new Date()),
        level: 2,
        computed: 0,
      },
      {
        id: 18,
        title: '提醒4',
        desc: '描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述',
        date: '2020-04-05',
        time: '10:00',
        repeat_type: 1,
        calendar: 0,
        create_time: util.formatTime(new Date()),
        level: 1,
        computed: 0,
      }
    ]
  },

  handleClick(e) {
    const id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/info/index',
    })
  },

  onLoad: function() {
    wx.setNavigationBarTitle({
      title: '日历',
    })
    wx.cloud.callFunction({
      name: 'notifyList'
    }).then(res => {
      console.log('success')
      console.log(res)
    }).catch(e => {
      console.log(e)
    })
  }
})
