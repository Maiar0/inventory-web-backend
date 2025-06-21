class ApiResponse {
  constructor(status, data = null, error = null) {
    this.status = status; // HTTP status code
    this.data = data; // Data to be returned in the response (if any)   
    this.error = error; // Error message (if any)
  }

  static success(data) {// create basic success response
    return new ApiResponse('ok', data, null);
  }

  static error(message, status = 500) {// Create basic error response
    return new ApiResponse('error', null, {code : status, message});
  }

  static messageResponse(message) {// Create a message response
    return ApiResponse.success({
        message
    });
  }
}
module.exports = ApiResponse; // Export the ApiResponse class for use in other modules