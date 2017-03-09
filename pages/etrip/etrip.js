Page({
  data: {
    array: ['上海', '北京', '昆明', '三亚'],
    array1: ['上海', '北京', '昆明', '三亚'],
    index: 0,
    index1:0,
    arrayDays: [1,2,3,4,5,6,7,8],
    indexDays:2,
    items: [
      {name: 'XX', value: '滑雪'},
      {name: 'FOOD', value: '遇见', checked: 'true'},
      {name: 'BG', value: '亲子'},
      {name: 'SC', value: '风景'},
      {name: 'ENG', value: '漂流'},
      {name: 'TUR', value: '瀑布'},
    ],
    date: '2016-06-01',
    date1: '2016-06-01',
  },
  bindPickerChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
  },
   bindPickerChange1: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index1: e.detail.value
    })
  },
  bindPickerChange2: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      indexDays: e.detail.value
    })
  },
  bindDateChange: function(e) {
    this.setData({
      date: e.detail.value
    })
  },
 bindDateChange1: function(e) {
    this.setData({
      date1: e.detail.value
    })
  },
  detailClick:function(e){
     console.log('我要看详情');
    var id = e.currentTarget.id,
        url = '../detail/d?id=' + id;
    wx.navigateTo({
      url: url
    })
  }
})