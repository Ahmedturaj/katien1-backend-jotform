import config from "../config/index.js";
import handleCastError from "../errors/handleCastError.js";
import handleValidationError from "../errors/handleValidationError.js";

const globalErrorHandler = (error, req, res, next) => {
  let statusCode = 500;
  let message = "Something went wrong";

  let errorSource = [
    {
      path: "",
      message: error?.message,
    },
  ];

  if (error?.name === "ValidationError") {
    const simplifiedError = handleValidationError(error);
    statusCode = simplifiedError?.statusCode;
    message = simplifiedError?.message;
    errorSource = simplifiedError?.errorSource;
  } else if (error.name === "CastError") {
    const simplifiedError = handleCastError(error);
    statusCode = simplifiedError?.statusCode;
    message = simplifiedError?.message;
    errorSource = simplifiedError?.errorSource;

    // The below lines seem redundant since you overwrite message and errorSource
    // but keeping them to preserve original logic:
    message = error?.message;
    errorSource = [
      {
        path: "",
        message: error?.message,
      },
    ];
  }

  res.status(statusCode).json({
    success: false,
    message,
    errorSource,
    error,
    stack: config.NODE_ENV === "development" ? error.stack : null,
  });
};

export default globalErrorHandler;
