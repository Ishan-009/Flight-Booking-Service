const axios = require("axios");

const { BookingRepository } = require("../repositories/booking-repository");

const db = require("../models");

async function createBooking(data) {
  try {
    const result = db.sequelize.transaction(async function bookingImp(t) {
      const flight = axios.get(
        `http://locahost:3000/api/v1/flights/${data.flightId}`
      );
      console.log(flight);
      return flight;
    });
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  createBooking,
};
