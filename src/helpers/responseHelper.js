const ResponseHelper = {
  /**
   * Handle http response
   * @param {*} res
   * @param {Boolean} success
   * @param {String} status
   * @param {Number} code
   * @param {String} message
   * @param {Object} data
   */
  response: (res, success = true, status, code, message = "", data) => {
    res.status(code).json({
      success,
      status,
      code,
      message,
      body: { ...data },
    });
  },

  /**
   * Handle http error
   * @param {*} res
   * @param {Object} error
   */
  error: (res, error) => {
    const status = error.status || 500;
    const code = error.code || "ERROR";
    console.log(status);
    res.status(status).json({
      success: false,
      status,
      code,
      message: error.message ? error.message : "Something went wrong!",
      body: error,
    });
  },
};

module.exports = ResponseHelper;
