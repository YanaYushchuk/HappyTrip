#! /usr/bin/env node

console.log(
  'This script populates some test books, authors, genres and bookinstances to your database. Specified database as argument - e.g.: node populatedb "mongodb+srv://cooluser:coolpassword@cluster0.lz91hw2.mongodb.net/local_library?retryWrites=true&w=majority"'
);

// Get arguments passed on command line
const userArgs = process.argv.slice(2);

const Trip = require("./src/models/trip");
const Destination = require("./src/models/destination");
const DestinationSequence = require("./src/models/destinationSequence");
const Ticket = require("./src/models/ticket");


const trips = [];
const destinations = [];
const destinationSequences = [];
const tickets = [];

const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

const mongoDB = userArgs[0];

main().catch((err) => console.log(err));

async function main() {
  console.log("Debug: About to connect");
  await mongoose.connect(mongoDB);
  console.log("Debug: Should be connected?");
  await createDestinations();
  await createDestinationSequences();
  console.log(destinationSequences);
  await createTrips();
  //await createTickets();
  console.log("Debug: Closing mongoose");
  mongoose.connection.close();
}

async function destinationCreate(index, title, description, image) {
  const destinationdetail = { title: title, description: description, image: image };
  const destination = new Destination(destinationdetail);
  await destination.save();
  destinations[index] = destination;
  console.log(`Added destination: ${title} ${description} ${image}`);
}

async function destinationSequenceCreate(index, position, destination) {
  console.log(position);
  const destinationSequencedetail = { position: position, destination: destination };
  const destinationSequence = new DestinationSequence(destinationSequencedetail);
  await destinationSequence.save();
  destinationSequences[index] = destinationSequence;
  console.log(`Added destinationSequence: ${position} ${destination}`);
}

async function tripCreate(index, title, description, price, destinations, destinationSequences, startTime, finishTime, photos) {
  const tripdetail = { title: title, description: description, price: price, destinations: destinations, destinationSequences: destinationSequences, startTime: startTime, finishTime: finishTime, photos: photos };
  const trip = new Trip(tripdetail);
  await trip.save();
  trips[index] = trip;
  console.log(`Added trip: ${title} ${description} ${price} ${destinationSequences} ${startTime} ${finishTime} ${photos}`);
}

async function ticketCreate(index, trip, dateStart, dateFinish) {
  const ticketdetail = { trip: trip, dateStart: dateStart };
  if (dateFinish != false) ticketdetail.dateFinish = dateFinish;
  const ticket = new Ticket(ticketdetail);
  await ticket.save();
  tickets[index] = ticket;
  console.log(`Added ticket: ${trip} ${dateStart} ${dateFinish}`);
}

async function createDestinations() {
  console.log("Adding destinations");
  await Promise.all([
    destinationCreate(0, "Одеса", "OdesaCity", "odesa.jpg"),
    destinationCreate(1, "Тернопіль", "TernopilCity", "ternopil.jpg"),
    destinationCreate(2, "Київ", "KyivCity", "kyiv.jpg"),
    destinationCreate(3, "Рівне", "RivneCity", "rivne.jpg"),
    destinationCreate(4, "Запоріжжя", "ZpCity", "zaporizhzhia.jpg"),
    destinationCreate(5, "Ужгород", "UzhgorodCity", "uzhgorod.jpg"),
    destinationCreate(6, "Харків", "KharkivCity", "kharkiv.jpg"),
    destinationCreate(7, "Дніпро", "DniproCity", "dnipro.jpg"),
    destinationCreate(8, "Львів", "LvivCity", "lviv.jpg"),
  ]);
}


async function createDestinationSequences() {
  console.log("Adding destination sequences");
  await Promise.all([
    destinationSequenceCreate(0, 0, destinations[2]),
    destinationSequenceCreate(1, 1, destinations[6]),
    destinationSequenceCreate(2, 2, destinations[7]),
    destinationSequenceCreate(3, 3, destinations[4]),
    destinationSequenceCreate(4, 4, destinations[0]),
    destinationSequenceCreate(5, 5, destinations[1]),
    destinationSequenceCreate(6, 6, destinations[3]),
    destinationSequenceCreate(7, 7, destinations[2]),
    destinationSequenceCreate(8, 0, destinations[3]),
    destinationSequenceCreate(9, 1, destinations[1]),
    destinationSequenceCreate(10, 2, destinations[8]),
    destinationSequenceCreate(11, 3, destinations[5]),
    destinationSequenceCreate(12, 4, destinations[3]),
    destinationSequenceCreate(13, 0, destinations[2]),
    destinationSequenceCreate(14, 0, destinations[2]),
    destinationSequenceCreate(15, 1, destinations[8]),
    destinationSequenceCreate(16, 2, destinations[5]),
    destinationSequenceCreate(17, 0, destinations[0]),
    destinationSequenceCreate(18, 0, destinations[8]),
    destinationSequenceCreate(19, 0, destinations[6]),
    destinationSequenceCreate(20, 0, destinations[6]),
    destinationSequenceCreate(21, 1, destinations[7]),
    destinationSequenceCreate(22, 2, destinations[4]),
  ]);
}

async function createTrips() {
  console.log("Adding trips");
  await Promise.all([
    tripCreate(0, "Великий тур Україною", "TestTripDesc1", 899.99, [destinations[2], destinations[6], destinations[7], destinations[4], destinations[0], destinations[1], destinations[3], destinations[2]], [destinationSequences[0], destinationSequences[1], destinationSequences[2], destinationSequences[3], destinationSequences[4], destinationSequences[5], destinationSequences[6], destinationSequences[7]],
      new Date('2024-08-01T08:00:00'), new Date('2024-08-14T18:00:00'), ["img.jpg", "img1.jpg"]),
    tripCreate(1, "Тур Заходом України", "TestTripDesc2", 1, [destinations[3], destinations[1], destinations[8], destinations[5], destinations[3]], [destinationSequences[8], destinationSequences[9], destinationSequences[10], destinationSequences[11], destinationSequences[12]],
      new Date('2024-07-01T07:00:00'), new Date('2024-07-06T22:00:00'), ["img.jpg", "img1.jpg"]),
    tripCreate(2, "Краса Київщини", "TestTripDesc3", 9999.99, [destinations[2]], [destinationSequences[13]],
      new Date('2024-07-21T09:00:00'), new Date('2024-07-21T18:00:00'), ["img.jpg", "img1.jpg"]),
    tripCreate(3, "Подорож старовинними містами", "TestTripDesc4", 10.99, [destinations[2], destinations[8], destinations[5]], [destinationSequences[14], destinationSequences[15], destinationSequences[16]],
      new Date('2024-07-18T08:00:00'), new Date('2024-07-22T23:00:00'), ["img.jpg", "img1.jpg"]),
    tripCreate(4, "Морська Перлина", "TestTripDesc3", 999, [destinations[0]], [destinationSequences[17]],
      new Date('2024-07-15T13:00:00'), new Date('2024-07-15T18:00:00'), ["img.jpg", "img1.jpg"]),
    tripCreate(5, "Загадковий Львів", "TestTripDesc5", 12, [destinations[8]], [destinationSequences[18]],
    new Date('2024-08-15T16:00:00'), new Date('2024-08-15T21:00:00'), ["img.jpg", "img1.jpg"]),
    tripCreate(6, "Місто Студентів", "TestTripDesc5", 6, [destinations[6]], [destinationSequences[19]],
    new Date('2024-08-05T15:30:00'), new Date('2024-08-05T20:00:00'), ["img.jpg", "img1.jpg"]),
    tripCreate(3, "Тур Сходом України", "TestTripDesc4", 109, [destinations[6], destinations[7], destinations[4]], [destinationSequences[20], destinationSequences[21], destinationSequences[22]],
    new Date('2024-06-29T08:30:00'), new Date('2024-07-02T23:00:00'), ["img.jpg", "img1.jpg"]),
  ]);
}

async function createTickets() {
  console.log("Adding tickets");
  await Promise.all([
    ticketCreate(0, trips[0], new Date(), false),
    ticketCreate(1, trips[0], new Date(), false),
    ticketCreate(2, trips[0], new Date(), false),
    ticketCreate(3, trips[1], new Date(), false),
    ticketCreate(4, trips[3], new Date(), false),
  ]);
}
