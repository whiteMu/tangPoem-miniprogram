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
    let originList = JSON.parse(JSON.stringify(poemList));
    for (var i = 0; i < originList.length; i++){
      let poem = originList[i];
      if(_this.poemMatchKey(poem,key)){
        //处理高亮数据
        let data = _this.handleHighlightKeyword(poem, key);
        resultList.push(data);
      }
    }
    return resultList;
  },
  //处理高亮数据
  handleHighlightKeyword(data, key){
    let _this = this;
    let titleArr = data.title.split(key);
    let title = data.title.indexOf(key) != -1?_this.handleHighlightArr(titleArr, key): titleArr;
    let authorArr = data.author.split(key);
    let author = data.author.indexOf(key) != -1 ?_this.handleHighlightArr(authorArr, key): authorArr;
    let summaryArr = data.summary.split(key);
    let summary = data.summary.indexOf(key) != -1 ?_this.handleHighlightArr(summaryArr, key): summaryArr;
    data.title = title;
    data.author = author;
    data.summary = summary;
    return data;
  },
  handleHighlightArr(list, key){
    let arr = [];
    list.forEach((item, index) => {
      arr.push(item);
      if(index != list.length-1)
        arr.push(key)
      })
    return arr;
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
    let _this = this, poemData,
      keyword = e.detail.value.trim();
    _this.setData({
      keyword
    },()=>{
      if (keyword) {
        poemData = _this.searchPoem(keyword);
      } else {
        poemData = poemList
      }
      _this.setData({
        listData: poemData
      }, () => {
        if (_this.data.listData.length == 0) {
          _this.setData({
            noData: true
          })
        } else {
          _this.setData({
            noData: false
          })
        }
      })
    })
    
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
