module.exports = {
  successResponse(message, data, status = true, status_code = 200) {
    return {
      status: status,
      status_code: status_code,
      message: message,
      data: data,
    };
  },
};
