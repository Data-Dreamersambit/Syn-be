class ApiError extends Error {
  constructor(
    statusCode,
    messaage = "Something went wrong",
    error = [],
    stack = ""
  ) {
    super(messaage);
    (this.statusCode = statusCode),
      (this.message = messaage),
      (this.success = false),
      (this.errors = this.errors);

    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

export { ApiError };
