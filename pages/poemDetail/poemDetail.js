// pages/poemDetail/poemDetail.js
import { poemList } from "../../utils/poemData";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    optionid: 0,
    poemData: {},
    content: [],
    annotation: [],
    translation: [],
    appreciation: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let _this = this,
      poemid = options.poemid,
      poemData = poemList.filter((item, index)=>{
        return poemid == item.poemid;
      });
    _this.setData({
      poemData: poemData[0]
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    let _this = this,
      content = _this.handleContent(_this.data.poemData.content),
      annotation = _this.handleContent(_this.data.poemData.annotation),
      translation = _this.handleContent(_this.data.poemData.translation),
      appreciation = _this.handleContent(_this.data.poemData.appreciation);
    _this.setData({
      content,
      annotation: _this.handleAnnotation(annotation),
      translation,
      appreciation
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },
  handleContent(content) {
    let _this = this;
    return content.split("\r\n");
  },
  handleAnnotation(content){
    let _this = this,
      newArr = [];
    content.forEach((item, index)=>{
      let key = item.indexOf("："),
        obj = {
          sp: item.slice(0, key),
          def: item.slice(key)
        };
      newArr.push(obj);
    })
    return newArr;
  },
  /**
   * tab选择
   */
  selectOption(e){
    let _this = this,
      optionid = e.currentTarget.dataset.optionid,
      left = "calc(33.3% * "+optionid+" + 16.6% - 60rpx)",
      animation = wx.createAnimation({
        duration: 200,
        timingFunction: "linear",
        delay: 0,
        transformOrigin: "50% 50%"
      });
    animation.left(left).step();
    _this.setData({
      optionid,
      animationData: animation.export()
    });
  },
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    let _this = this;
    return {
      title: _this.data.poemData.title,
      path: "pages/poemDetail/poemDetail?poemid=" + _this.data.poemData.poemid
    }
  }
})