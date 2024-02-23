const { StatusCodes } = require("http-status-codes");

const { Booking } = require("../models/index");
const CrudRepository = require("./crud-repository");

class BookingRepository extends CrudRepository {
  constructor() {
    super(Booking);
  }

  // Here wer are using custom create booking method here we want to pass transaction object into our method so that we can ensure that all queries or say process happens in within one transaction, so here we brought transaction object from service to repo so we can specify thsi create mehtod that we want to initiate this query within the transaction otherwise rollback
  async createBooking(data, transaction) {
    const response = await Booking.create(data, { transaction: transaction });
    return response;
  }
}

module.exports = BookingRepository;
