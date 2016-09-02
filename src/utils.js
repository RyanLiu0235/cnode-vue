/**
 * 格式化时间
 * @param  {Number | String} date 待格式化的时间
 * @return {String}     返回的时间
 */
exports.timeFormat = function(date) {
  var date = new Date(date);
  var time = new Date().getTime() - date.getTime(); //现在的时间-传入的时间 = 相差的时间（单位 = 毫秒）
  if (time < 0) {
    return '';
  } else if (time / 1000 < 60) {
    return parseInt((time / 1000)) + '秒前';
  } else if ((time / 60000) < 60) {
    return parseInt((time / 60000)) + '分钟前';
  } else if ((time / 3600000) < 24) {
    return parseInt(time / 3600000) + '个小时前';
  } else if ((time / 86400000) < 31) {
    return parseInt(time / 86400000) + '天前';
  } else if ((time / 2592000000) < 12) {
    return parseInt(time / 2592000000) + '个月前';
  } else {
    return parseInt(time / 31536000000) + '年前';
  }
}

/**
 * 给 cnodejs.org 返回的markdown里用户详情页链接增加 #!/ 前缀
 * @param  {String} url 用户链接
 * @return {String}     增加了#!/前缀的链接地址
 */
exports.prefixUrl = function(url) {
  // 判断URL是否合规，即以 /user/ 开头
  var reg = /^\/user\//;
  if (!reg.test(url)) return false;

  return '#!' + url;
}