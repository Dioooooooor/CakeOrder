const SendRequest = function (path, sdata, stype, ins_suss, handler_suss, ins_failed, handler_failed) {
  wx.request({
    url: path,
    data: sdata,
    method: stype,
    header: { 'content-type': 'application/x-www-form-urlencoded' },
    success: function (res) {
      if (handler_suss !== null) {
        handler_suss(ins_suss, res.data);
      }
    },
    fail: function () {
      if (handler_failed != null) {
        handler_failed(ins_failed);
      }
    }
  });
}

module.exports = {
  sendRequest: SendRequest,
}