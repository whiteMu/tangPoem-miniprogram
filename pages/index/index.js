//index.js
//获取应用实例
const app = getApp()
import { poemList } from "../../utils/poemData";
Page({
  /**
   * 页面的初始数据
   * 
   * @param {array} listData 诗词列表
   * @param {string} keyword 关键字
   * @param {boolean} true 有诗词列表数据 false 无诗词列表数据
   */
  data: {
    listData: [],
    keyword: "",
    noData: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    let _this = this;
    _this.setData({
      listData: poemList
    })
  },

  /**
   * 获取关键字
   * 
   * @event
   * @param {object} e input框节点对象
   */
  getKeyword(e) {
    let _this = this, poemData,
      keyword = e.detail.value.trim();
    _this.setData({
      keyword
    }, () => {
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

  /**
   * 匹配关键字诗句列表
   * 
   * @param {string} key 搜索关键字
   * @return {array} resultList 诗词数据列表
   */
  searchPoem(key){
    let _this = this;
    let resultList = [];
    let originList = JSON.parse(JSON.stringify(poemList));
    for (var i = 0; i < originList.length; i++){
      let poem = originList[i];
      if(_this.poemMatchKey(poem,key)){
        let data = _this.handleHighlightKeyword(poem, key);
        resultList.push(data);
      }
    }
    return resultList;
  },

  /**
   * 判断一首诗是否命中关键词
   * 
   * @param {object} poem 诗词数据
   * @param {string} key 搜索关键字
   * @return {boolean} true为含有关键字 false为不含有关键字
   */
  poemMatchKey(poem, key) {
    if (poem.title.indexOf(key) != -1) {
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

  /**
   * 判断诗词中是否含有关键字
   * 
   * @param {object} data 诗词对象
   * @param {string} key 搜索关键字 
   * @return {object} data 处理后的诗词对象
   */
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

  /**
   * 处理高亮数据
   * 
   * @param {array} list 数据数组
   * @param {string} key 搜索关键字
   * @return {array} arr 返回诗词列表item
   */
  handleHighlightArr(list, key){
    let arr = [];
    list.forEach((item, index) => {
      arr.push(item);
      if(index != list.length-1)
        arr.push(key)
      })
    return arr;
  },

  /**
   * 前往诗词详情页面
   * 
   * @event
   * @param {object} e 节点对象
   */
  goDetail(e){
    let _this = this,
      data = e.currentTarget.dataset.data,
      url = "../poemDetail/poemDetail?poemid="+data.poemid;
    _this.goPage(url);
  },

  /**
   * 跳转页面
   * 
   * @param {string} url 页面路径
   */
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
