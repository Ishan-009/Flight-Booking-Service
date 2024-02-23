const { BookingService } = require("../services");
const { SuccessResponse, ErrorResponse } = require("../utils/common/index");
async function createBooking(req, res) {
  try {
    const response = await BookingService.createBooking({
      flightId: req.params.id,
      seats: req.body.seats,
      dec: req.body.dec,
    });
    SuccessResponse.message = "Successfully Fetched an Flight";
    SuccessResponse.data = response;
    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error;
    return res.status(error.statusCode).json(ErrorResponse);
  }
}

module.exports = { createBooking };
