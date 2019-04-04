//index.js
//获取应用实例
const app = getApp()
import { poemList } from "../../utils/poemData";
Page({
  data: {
    listData: [],
    keyword: "",
    noData: false
  },
  onLoad: function () {
    let _this = this;
    _this.setData({
      listData: poemList
    })
  },
  searchPoem(key){
    let _this = this;
    let resultList = [];
    let originList = poemList;
    for (var i = 0; i < originList.length; i++){
      let poem = originList[i];
      if(_this.poemMatchKey(poem,key)){
        resultList.push(poem);
      }
    }
    return resultList;
  },
  // 判断一首诗是否命中关键词
  poemMatchKey(poem,key){
    if(poem.title.indexOf(key) != -1) {
      return true;
    } else if (poem.author.indexOf(key) != -1) {
      return true;
    } else if (poem.summary.indexOf(key) != -1) {
      return true;
    } else if (poem.content.indexOf(key) != -1) {
      return true;
    } else {
      return false;
    }
  },
  goDetail(e){
    let _this = this,
      data = e.currentTarget.dataset.data,
      url = "../poemDetail/poemDetail?poemid="+data.poemid;
    _this.goPage(url);
  },
  getKeyword(e){
    let _this = this, poemData;
    if (e.detail.value){
      poemData = _this.searchPoem(e.detail.value);
      _this.setData({
        keyword: e.detail.value
      })
    }else{
      poemData = poemList
    }
    _this.setData({
      listData: poemData
    })
    if(_this.data.listData.length == 0){
      _this.setData({
        noData: true
      })
    }else{
      _this.setData({
        noData: false
      })
    }
  },
  goPage(url){
    wx.navigateTo({
      url: url,
    })
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    return {
      title: "唐诗三百首"
    }
  }
})
