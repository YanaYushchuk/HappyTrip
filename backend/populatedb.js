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

async function destinationCreate(index, title, description, address, image) {
  const destinationdetail = { title: title, description: description, address: address, image: image };
  const destination = new Destination(destinationdetail);
  await destination.save();
  destinations[index] = destination;
  console.log(`Added destination: ${title} ${description} ${address} ${image}`);
}

async function destinationSequenceCreate(index, position, destination) {
  console.log(position);
  const destinationSequencedetail = { position: position, destination: destination };
  const destinationSequence = new DestinationSequence(destinationSequencedetail);
  await destinationSequence.save();
  destinationSequences[index] = destinationSequence;
  console.log(`Added destinationSequence: ${position} ${destination}`);
}

async function tripCreate(index, title, description, price, destinations, destinationSequences,startPlace, startTime, finishTime, photos) {
  const tripdetail = { title: title, description: description, price: price, destinations: destinations, destinationSequences: destinationSequences, startPlace:startPlace, startTime: startTime, finishTime: finishTime, photos: photos };
  const trip = new Trip(tripdetail);
  await trip.save();
  trips[index] = trip;
  console.log(`Added trip: ${title} ${description} ${price} ${destinationSequences} ${startPlace} ${startTime} ${finishTime} ${photos}`);
}

async function ticketCreate(index, trip, dateStart, dateFinish) {
  const ticketdetail = { trip: trip, dateStart: dateStart };
  if (dateFinish != false) ticketdetail.dateFinish = dateFinish;
  const ticket = new Ticket(ticketdetail);
  await ticket.save();
  tickets[index] = ticket;
  console.log(`Added ticket: ${trip} ${dateStart} ${dateFinish}`);
}

async function createComment(index, description, users, trips) {
  const commentdetail = { description: description, users: users, trips: trips };
  const comment = new Comment(commentdetail);
  await comment.save();
  comments[index] = comment;
  console.log(`Added comment: ${description} ${users} ${trips}`);
}


async function createDestinations() {
  console.log("Adding destinations");
  await Promise.all([
    destinationCreate(0, "Одеса", "Одеська область - це чарівний куточок на півдні України, який приваблює туристів своєю унікальною атмосферою, багатою історією та прекрасними курортами.Одеса відома своєю неповторною архітектурою, мальовничими морськими видами та багатим культурним життям. Відвідувачі можуть прогулятися по приморському бульвару, відвідати Одеський оперний театр, музеї, ресторани та кафе.Білгород-Дністровська фортеця, збудована в XIII столітті, розташована біля міста Білгород-Дністровськ. Вона вражає своїми масштабами та давніми стінами, які збереглися до наших днів.Аккерманська фортеця вражаючий об'єкт оборонної архітектури, розташований на берегах річки Дністер. Фортеця має давню історію та захоплює своєю красою та містичними легендами.", "Oдеса", "odesa1.jpg"),
    destinationCreate(1, "Тернопіль", "Ця область славиться своєю неповторною архітектурою та мальовничими природними куточками. Найвідоміше місце - Чорногірський національний парк, що розташований на вершинах Карпат. Область також славиться своїми замками та палацами, зокрема Золота Палиця та Замок Шпілів.", "Тернопіль", "ternopil1.jpg"),
    destinationCreate(2, "Київ", "Київська область - це унікальний регіон зі своїм неповторним характером та різноманітними туристичними можливостями.Києво-Печерська Лавра: Визначний монастирський комплекс, що заснований ще у XI столітті. Лавра вражає своєю красою і багатством історії, тут можна побачити давні печери, церкви та інші архітектурні шедеври. Межигір'я: Це прекрасне місце розташоване на березі Дніпра і славиться своєю зеленою територією та прекрасними пейзажами. Ідеальне місце для прогулянок та відпочинку від міської суєти. Пирогово: Скансен під відкритим небом, де зібрані архітектурні споруди з різних регіонів України. Тут можна побачити традиційні українські хати, церкви та інші історичні об'єкти.", "Київ", "kyiv1.jpg"),
    destinationCreate(3, "Рівне", "Рівненська область славиться своїми унікальними туристичними атракціями та неповторною природою.Однією з найвідоміших атракцій є Тунель Кохання у селі Клевань. Це романтичне місце приваблює тисячі відвідувачів, які шукають закоханих та позитивних емоцій. Крім того, Рівненщина славиться своїми історичними пам'ятками, такими як Дубнівський замок, де кожен куток сповнений атмосферою старовини та загадковості. ", "Рівне", "rivne1.jpg"),
    destinationCreate(4, "Запоріжжя", "Запорізька область - це унікальний регіон, який славиться своєю багатою історією, природними багатствами та цікавими туристичними об'єктами. Хортицький національний історико-культурний заповідник: Розташований на Хортиці - найбільшому острові на Дніпрі. Тут можна відвідати стародавні козацькі оборонні споруди, музеї, археологічні знахідки та насолодитися красою природи.ДніпроГЕС - одна з найбільших гідроелектростанцій в Європі, яка працює на ріці Дніпро. Відвідувачі можуть взяти екскурсію до станції, дізнатися про її історію та технічні характеристики.Запорізький острів Хортиця: Це прекрасне місце для активного відпочинку та туризму. Тут можна відвідати пляжі, зайнятися водними видами спорту, підкорити каньйони на каяках або велосипедних маршрутах.", "Запоріжжя", "zaporizhzhia.jpg"),
    destinationCreate(5, "Ужгород", "Закарпаття - це унікальний куточок України, що розташований на заході країни, прикрашений гірськими вершинами, зеленими долинами та живописними річками.Одним із визначних місць Закарпаття є місто Ужгород, що зберегло атмосферу старовинного середньовічного міста та вражає своєю архітектурою та культурними пам'ятками. Тут можна відвідати Ужгородський замок, розташований на вершині гори, а також насолодитися прогулянкою вздовж вузьких вуличок старого міста.", "Ужгород", "uzhgorod1.jpg"),
    destinationCreate(6, "Харків", "Харків - це динамічне місто на сході України, яке приваблює туристів своєю атмосферою, історією та культурою. Місто багате на архітектурні пам'ятки, парки, музеї та інші визначні місця, які роблять Харків привабливим для відвідувачів. Однією з найвідоміших пам'яток Харкова є Свято-Благовіщенський кафедральний собор, який славиться своєю архітектурою та історією. Він є символом міста і вражає своєю величчю та красою. Харківський історичний музей, який демонструє багату історію міста та його розвиток протягом століть.", "Харків", "kharkiv1.jpg"),
    destinationCreate(7, "Дніпро", "Дніпропетровщина - це область, що розташована в центральній частині України, з промислово розвиненим містом Дніпро на її території. Є чимало культурних та історичних пам'яток, які варто відвідати. Наприклад, музей ім. Дзержинського, який є одним із найбільших музеїв України та містить унікальні експонати з історії регіону. Також велика популярність у туристів користується Дніпровський парк, який є великим зеленим оазисом у місті Дніпро і пропонує можливості для прогулянок, відпочинку та спорту.", "Дніпро", "dnipro1.jpg"),
    destinationCreate(8, "Львів", "Львівщина - це область, що відома своєю багатою історією, архітектурою та культурним надбанням. Популярними туристичними визначними місцями Львівщини є:  Палац Потоцьких - це велична резиденція родини Потоцьких, побудована в стилі бароко. Він славиться своєю розкішшю та вражаючими садами. Львівська Опера Львівська Опера - одна з найстаріших та найпрестижніших оперних театрів в Україні, де можна насолодитися виставами світового рівня.Замок Олеська - це середньовічна фортеця, розташована біля села Олесько. Це вражаюча споруда з часів Речі Посполитої, яка вражає своєю масштабністю та красою.", "Львів", "lviv1.jpg"),
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
    tripCreate(0, "Великий тур Україною", "Великий тур Україною - це захоплююча подорож, яка пропонує вам відкрити всю різноманітність та красу цієї країни. Під час цього туру ви відвідаєте найцікавіші і найпрекрасніші місця України, ознайомитеся з її багатою історією, культурою та традиціями.Починаючи з  найбільшого міста України - Києва, з його величними пам'ятниками історії та культури, такими як Києво-Печерська Лавра, Софійський собор, Майдан Незалежності та багато інших. Подорожуючи на Схід, ви відвідаєте дивовижне місто Харків з його видатними архітектурними спорудами та культурними закладами. Ви відвідаєте мальовничі місця на Півдні, такі як Одеса з її приморськими пляжами та унікальним архітектурним стилем, а також Запоріжжя з його історичними пам'ятками та чудовими природними краєвидами на берегах Дніпра. Завершуючи подорож мальовничим Заходом, ви зможете насолодитися неперевершеною природою Карпат, відвідати старовинні міста Львівщини та Рівненщини, і відчути справжню атмосферу та гостинність. Великий тур Україною - це можливість пізнати і полюбити найкраще, що пропонує ця країна, та збагатити ваші враження незабутніми спогадами та емоціями.",
      0.0008, [destinations[2], destinations[6], destinations[7], destinations[4], destinations[0], destinations[1], destinations[3], destinations[2]], [destinationSequences[0], destinationSequences[1], destinationSequences[2], destinationSequences[3], destinationSequences[4], destinationSequences[5], destinationSequences[6], destinationSequences[7]], "Автостанція Київ вул. С. Петлюри 32",
      new Date('2024-08-01T08:00:00'), new Date('2024-08-14T18:00:00'), ["img3.jpg", "img14.jpg", "img8.jpg", "img16.jpg", "img1.jpg", "img7.jpg", "img17.jpg", "img16.jpg", "img1.jpg", "img19.jpg", "img5.jpg"]),
    tripCreate(1, "Тур Заходом України", "Тур за Заходом України - це захоплююча подорож, яка дозволить вам відкрити красу та неповторність західних областей України. Під час цього туру ви відвідаєте такі чудові міста як Рівне, Тернопіль, Львів і Ужгород, кожне з яких має свої унікальність та неповторність. Почати вашу подорож ви розпочнете з Рівного - динамічного міста, яке славиться своєю культурною спадщиною та прекрасними архітектурними пам'ятками. Ви відвідаєте Тунель Кохання у селі Клевань, що став відомим романтичним місцем для пар і мандрівників. Наступна зупинка - Тернопіль, місто з багатою історією та культурою. Ви поглибитеся в атмосферу старовинної України, відвідавши Дерев'яний Замок у Теребовлі та Тернопільський замок. Львів, одне з найкрасивіших міст України, стане наступною зупинкою вашої подорожі. Тут ви зможете насолодитися архітектурою старого міста, відвідати Львівську Оперу, побачити Ратушу на Ринку та насолодитися атмосферою кав'ярень на площі Ринок. Останній пункт вашого маршруту - Ужгород, мальовниче місто на заході України. Ви відвідаєте Ужгородський замок, який розташований на березі річки Уж, та дізнаєтеся більше про багату історію та культуру Закарпаття.",
      0.00023, [destinations[3], destinations[1], destinations[8], destinations[5], destinations[3]], [destinationSequences[8], destinationSequences[9], destinationSequences[10], destinationSequences[11], destinationSequences[12]],  "Рівне Автовокзал Чайка",
      new Date('2024-07-01T07:00:00'), new Date('2024-07-06T22:00:00'), ["img6.jpg", "img3.jpg", "img3.jpg13", "img9.jpg"]), 
    tripCreate(2, "Краса Київщини", "Захоплива подорож у серце України, де ви зможете насолодитися багатством історії, культури та природи. Починаючи зі столиці, Києва, ви здійсните мандрівку через час у Давній Київ, де зустрінете величні храми і місця, пов'язані зі старовинними легендами та історіями. Далі ваш шлях пролягатиме через мальовничі куточки Київської області, де ви зможете відвідати Успенську Церкву в Києво-Печерській Лаврі, дивовижний Києво-Печерський заповідник та інші історичні пам'ятки.",
      0.00033, [destinations[2]], [destinationSequences[13]], "Київ вулиця Хрещатик 19А",
      new Date('2024-07-21T09:00:00'), new Date('2024-07-21T18:00:00'), ["img8.jpg", "img16.jpg", "img1.jpg", "img14.jpg"]),
    tripCreate(3, "Старовинними містами", "Зачаровування старовинними містами України - це справжня подорож у часі. Розпочніть свою пригоду в Києві, місті легенд і величних історичних споруд. Прогуляйтесь вузькими вуличками Старого міста Львова, де кожна будівля оповідає власну історію. Завершіть ваше подорож у мальовничому Ужгороді, що розташований на заході України, де ви зможете насолодитися атмосферою західних культурних традицій і архітектурою з різноманітних епох.",
      0.0001, [destinations[2], destinations[8], destinations[5]], [destinationSequences[14], destinationSequences[15], destinationSequences[16]], "Автостанція Київ вул. С. Петлюри, 32",
      new Date('2024-07-18T08:00:00'), new Date('2024-07-22T23:00:00'), ["img14.jpg", "img.jpg", "img6.jpg", "img14.jpg"]), 
    tripCreate(4, "Морська Перлина", "Ласкаво просимо на екскурсію в Одесу - місто, що завжди радісно зустрічає своїх гостей! Вирушайте у захопливу подорож до цього культурного і туристичного центру України та відкрийте для себе всю його велич і красу. Під час екскурсії ви зможете насолодитися переглядом архітектурних шедеврів Одеси, таких як Одеський Оперний театр, Дерибасівська вулиця, а також інші історичні пам'ятки міста. Ви дізнаєтеся про багату історію та культурну спадщину Одеси від кваліфікованих гідів, які розповідатимуть цікаві факти та легенди.",
      0.000054, [destinations[0]], [destinationSequences[17]], "Одеса провулок Чайковського 1",
      new Date('2024-07-15T13:00:00'), new Date('2024-07-15T18:00:00'), ["img15.jpg", "img17.jpg", "img7.jpg"]),
    tripCreate(5, "Загадковий Львів", "Ласкаво просимо до Львова - міста, що сповнене таємниць та неповторної атмосфери старовини! Вирушайте з нами в захоплюючу подорож і дізнайтеся більше про найвизначніші туристичні місця Львова.Почнемо нашу екскурсію зі старовинної площі Ринок, яка є серцем Львова. Тут ви зможете насолодитися архітектурою Ренесансу та Бароко, побачити Ратушу та унікальну Корону Міста. Прогулянка до Львівського замку дозволить вам насолодитися красою старовинних оборонних споруд та засвоїти багату історію цього місця.: Відвідайте величезну культурну спадщину Львова - оперний театр імені Соломії Крушельницької, де ви зможете насолодитися шедеврами класичної музики.Завершіть свій день в одному з найстаріших кафе Львова, де вас зустрінуть затишна атмосфера та смачна кава.",
      0.00001, [destinations[8]], [destinationSequences[18]], "Львів площа Ринок 1",
      new Date('2024-08-15T16:00:00'), new Date('2024-08-15T21:00:00'), ["img.jpg", "img6.jpg",  "img10.jpg", "img9.jpg"]),
    tripCreate(6, "Місто Студентів", "Харків - динамічне місто з багатою історією та культурними надбаннями. Відвідайте Слобожанський проспект, Полтавський шлях, Харківський зоопарк та парк Горького. Проведіть час, насолоджуючись атмосферою та видами міста.",
      0.0016, [destinations[6]], [destinationSequences[19]], "Харків вулиця Університетська 16",
      new Date('2024-08-05T15:30:00'), new Date('2024-08-05T20:00:00'), ["img19.jpg", "img20.jpg", "img18.jpg"]),
    tripCreate(7, "Тур Сходом України", "Тур відкриває неповторний шарм  великих міст. У Харкові відвідайте історичну площу Свободи, Харківський планетарій та парк Шевченка. Потім вирушайте до Дніпра, де можна насолодитися красою набережної, відвідати Дніпровський парк та покататися на катамаранах. У Запоріжжі зануртеся у історію на Запорізькій Січі, відвідайте острів Хортицю та насолодіться краєвидами на Дніпро з Токтом.",
      0.0004, [destinations[6], destinations[7], destinations[4]], [destinationSequences[20], destinationSequences[21], destinationSequences[22]], "Харків Автостанція №2",
      new Date('2024-06-29T08:30:00'), new Date('2024-07-02T23:00:00'), ["img4.jpg", "img11.jpg", "img12.jpg", "img5.jpg"]),
    
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
