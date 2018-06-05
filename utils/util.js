const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}
const setTitle = (title) => {
  wx.setNavigationBarTitle({
    title: title
  })
}
const showLoading = (title) => {
  wx.showLoading({
    title: title,
    mask: false
  })
}
const hideLoading = () => {
  wx.hideLoading()
}
module.exports = {
  formatTime: formatTime,
  setTitle: setTitle,
  showLoading: showLoading,
  hideLoading: hideLoading
}
