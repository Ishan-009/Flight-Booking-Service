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

  //overriding get function so we can pass transaction object in to the method thatswhy

  async get(id, transaction) {
    const response = await this.model.findByPk(id, {
      transaction: transaction,
    });

    if (!response) {
      throw new AppError("Resource not found", StatusCodes.NOT_FOUND);
    }

    return response;
  }

  async update(id, data, transaction) {
    const response = await this.model.update(
      data,
      {
        where: {
          id: id,
        },
      },
      { transaction: transaction }
    );

    if (!response) {
      throw new AppError("Booking not found", StatusCodes.NOT_FOUND);
    }
    return response;
  }
}

module.exports = BookingRepository;
