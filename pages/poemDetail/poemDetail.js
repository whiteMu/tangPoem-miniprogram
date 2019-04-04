// pages/poemDetail/poemDetail.js
import { poemList } from "../../utils/poemData";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    poemData: {}
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
    let _this = this;
    _this.handleContent();
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },
  handleContent() {
    let _this = this;
    _this.setData({
      content: _this.data.poemData.content.split("\r\n")
    })
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