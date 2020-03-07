var express = require("express");
var router = express.Router();
var bcrypt = require("bcrypt");
const err = require("http-errors");
const {
  Admins,
  Clubs,
  ClubsEvents,
  ClubsTags,
  ClubsUsers,
  Events,
  EventsTags,
  EventsUsers,
  Tags,
  TagsUsers,
  Users
} = require("../models");

var salt = bcrypt.genSaltSync(8);
var password = bcrypt.hashSync("000000", salt);

// tags
const tags = [{
    name: "Women"
  },
  {
    name: "Computer Science"
  },
  {
    name: "Entomology"
  },
  {
    name: "Engineering"
  },
  {
    name: "Science" //5
  },
  {
    name: "Movies"
  },
  {
    name: "Tech"
  },
  {
    name: "Photography"
  },
  {
    name: "Food"
  },
  {
    name: "Music" //10
  },
  {
    name: "Dance"
  },
  {
    name: "LGBTQI+"
  },
  {
    name: "Games"
  },
  {
    name: "Animals"
  },
  {
    name: "Books" //15
  },
  {
    name: "Career"
  },
  {
    name: "Arts"
  },
  {
    name: "Writing"
  },
  {
    name: "Politics"
  },
  {
    name: "Service" //20
  },
  {
    name: "Religious"
  },
  {
    name: "Sports"
  },
  {
    name: "Social"
  }
];

const clubs = [{
    name: "Aerial Robotics Club at NC State",
    description: "We build planes that fly themselves. If you are interested in joining either drop by our lab in EBIII right off of the main lobby and/or attend one of our meetings on Fridays at 6:00pm in RM 2003, EBIII. www.aerialroboticsclub.com",
    image: "https://images.collegiatelink.net/clink/images/a46bb1b7-e185-4702-966e-bdb96a48a3b9e5bd0157-b12d-4315-9f98-cb187afe3d52.jpg?preset=large-h",
    webpage: "",
    email: "",
    socialMedia: []
  },
  {
    name: "Accounting Society at NC State",
    description: "The Accounting Society at NC State is an organization designed for all undergraduate accounting students. Accounting Society creates a structured network of students, their professors, and professionals. This network allows students to maximize their education at NC State. Members face many opportunities to practice communication and networking skills that are vital in today's professional environment. Additionally, members are offered advice and guidance relevant to the interviewing process and business etiquette.",
    image: "https://cdn.allbusinessschools.com/wp-content/uploads/2016/08/hero-accounting-is-about-more-than-crunching-numbers-learn-what-other-duties-an-accountant-holds.jpg",
    webpage: "https://getinvolved.ncsu.edu/organization/accsocietyncsu",
    email: "accsociety.ncsu@gmail.com",
    socialMedia: []
  },
  {
    name: "Women in Computer Science",
    description: "The mission of the Women in Computer Science (WiCS) program is to support, promote, and retain women in computer science by providing opportunities for personal and professional development, social interaction, and outreach.",
    image: "https://static.wixstatic.com/media/21cf47_830198b52fa34ce1bb8de2f273fc33fd~mv2_d_1760_1249_s_2.png/v1/fill/w_1048,h_744,al_c,q_85,usm_0.66_1.00_0.01/21cf47_830198b52fa34ce1bb8de2f273fc33fd~mv2_d_1760_1249_s_2.webp",
    webpage: "https://www.wicsatncsu.org/",
    email: "wics.ncsu@gmail.com",
    socialMedia: [
      "https://www.facebook.com/groups/ncsuwics/",
      "https://twitter.com/WiCS_NCSU",
      "https://www.youtube.com/channel/UCx9upYfFxYo7ppRTIDL-Skg",
      "http://instagram.com/wics_ncsu"
    ]
  },
  {
    name: "Gay, Lesbian, Bisexual, Transgender Community Alliance (GLBTCA)",
    description: "The GLBT Community Alliance is NC State Universityï¿½s student group dedicated to promoting equality and unity for Gay, Lesbian, Bisexual, Transgender, Queer, Intersex, Questioning, and Straight Ally students, faculty, and staff on our campus and in our community. Our goal is to provide supportive and proactive educational and social events for our diverse campus body. The group is a safe and supportive space for people of all sexual orientations, gender identities, cultural backgrounds, life stages, and beliefs. Meetings occur every Tuesday from 7-9.",
    image: "https://oied.ncsu.edu/divweb/wp-content/uploads/2017/09/GLBTHM2017_digest.jpg",
    webpage: "https://getinvolved.ncsu.edu/organization/296",
    email: "glbtcommunityalliance@gmail.com",
    socialMedia: []
  },
  {
    name: "Companion Animal Club",
    description: "The Companion Animal Club is composed of people from all majors and backgrounds who are interested in enhancing their knowledge of companion animals, spending time with people with similar interests, and celebrating the contributions made by pets to the emotional and physical well-being of their owners.",
    image: "",
    webpage: "https://getinvolved.ncsu.edu/organization/197",
    email: "companionanimalclub@gmail.com",
    socialMedia: []
  },
  {
    name: "Cru",
    description: "Everyone is on a spiritual journey either towards God or away from Him. And wherever you are on that journey, you are welcomed and accepted. Cru is a safe place where you can ask questions, share doubts and investigate the God of the Bible. We do not pretend to have all the answers, but we do believe that God created us to know Him personally and life was meant to be lived in relationship with Him.",
    image: "data:image/png;base64,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",
    webpage: "",
    email: "hlspragi@ncsu.edu",
    socialMedia: []
  },
  {
    name: "Aikido Club",
    description: "Do you ever wish you could deflect basic attacks with as little effort as possible? Ever wish you could improve on your cat-like reflexes and martial awareness? Or how about a club that functions as a tight knit and dependable community? Well, that basically sums up Aikido club! We strive to perfect our fundamentals in order to build on and improvise in large setting scenarios",
    image: "https://images.collegiatelink.net/clink/images/5854ab48-f21b-4c14-9fc5-a2f130b565de0a23c0cd-5cf7-4e72-8d8e-22006914dbc8.jpg?preset=large-h",
    webpage: "http://clubs.ncsu.edu/aikido/",
    email: "aikidoclub.ncsu@gmail.com",
    socialMedia: ["https://www.facebook.com/groups/139464502772659/"]
  }
];

const events = [{
    name: "Coding Nights #3",
    description: "Come meet people and solve puzzles in a relaxed environment! Food and drinks will be provided.",
    location: "EBII 1212",
    startTime: new Date(2018, 11, 7, 18, 30),
    endTime: new Date(2018, 11, 7, 19, 30),
    image: "https://scontent-atl3-1.xx.fbcdn.net/v/t1.0-9/45805313_10213950036608563_3090645680083959808_n.jpg?_nc_cat=104&_nc_ht=scontent-atl3-1.xx&oh=61fabd00e99ba61b52051b37a72364d7&oe=5C9BB10F",
    attendanceCode: "000"
  },
  {
    name: "WiCS Faculty Lunch",
    description: "Come out and meet some of the CSC faculty! You can chat over lunch with some of your professors, or get to know other people in the department. There will be a short WiCS presentation followed by mingling while everyone eats lunch.",
    location: "EB2 Room 3211",
    startTime: new Date(2018, 11, 2, 12),
    endTime: new Date(2018, 11, 2, 13),
    image: "https://scontent-atl3-1.xx.fbcdn.net/v/t1.0-9/45467526_10213906538601140_7432028339759480832_o.jpg?_nc_cat=105&_nc_ht=scontent-atl3-1.xx&oh=3f2fc89187acc68db0171b776e7b245a&oe=5C9C771A",
    attendanceCode: "000"
  },
  {
    name: "WiCS Halloween Bash",
    description: "Come hang out with WiCS members and officers! Feel free to dress up or just show up. There will be pizza, candy, and soda!",
    location: "EB2 3211",
    startTime: new Date(2018, 10, 30, 18, 30),
    endTime: new Date(2018, 10, 30, 20, 30),
    image: "https://scontent-atl3-1.xx.fbcdn.net/v/t1.0-9/44664302_10213806951991537_3039981318147407872_o.jpg?_nc_cat=104&_nc_ht=scontent-atl3-1.xx&oh=5b82b8f2c84948b22c2fffc2f4bff9db&oe=5C6C4688",
    attendanceCode: "000"
  },
  {
    name: "Lean-In Circles",
    description: "Come to our second installment of Lean-In Circles. This Lean-In Circle will focus on strengths and weaknesses, and how to handle them.",
    location: "EBII 3211",
    startTime: new Date(2018, 11, 15, 17),
    endTime: new Date(2018, 11, 15, 18),
    image: "https://scontent-atl3-1.xx.fbcdn.net/v/t1.0-9/46315182_10213968302865208_4412189396028096512_o.jpg?_nc_cat=110&_nc_ht=scontent-atl3-1.xx&oh=435e17bfc30c3b9b5dc23c3cbec8393c&oe=5C997375",
    attendanceCode: "000"
  },
  {
    name: "Weekly Meeting",
    description: "Come out to large group weekly meeting every Thursday night of the semester. Due to space limitations on campus, some of our large group meetings will be off campus at local churches. This week, we will be at Providence BC at 8pm and will get to hear from Brian Frost. After the meeting, , everyone usually heads over to Bojangles on Western Blvd to hang out, then on over to Wiffleball at West Deck on campus. We will have these large group meetings every Thursday night at 8:00 during the semester. We will typically have some music/worship, some fun stuff, hear from a local pastor, and then hear about a few of the things coming up in CRU. We hope you can join us !",
    location: "",
    startTime: new Date(2018, 11, 7, 20),
    endTime: new Date(2018, 11, 7, 21, 30),
    image: "http://cruncsu.org/event/weekly-meeting-9/",
    attendanceCode: "000"
  },
  {
    name: "Companion Animal Club Chipotle Fundraiser",
    description: "PLEASE SHOW THE FLIER ABOVE WHEN YOU MAKE YOUR PURCHASE\nCome out and support the Companion Animal Club! \nChipotle is giving back 50% of your purchase to support us and local animal non-profits!",
    location: "2316 Hillsborough Street Ste 100, Raleigh, North Carolina 27607",
    startTime: new Date(2018, 11, 8, 17),
    endTime: new Date(2018, 11, 8, 21),
    image: "https://scontent-atl3-1.xx.fbcdn.net/v/t1.0-9/29790757_1583393441710432_2144046766606059531_n.jpg?_nc_cat=103&_nc_ht=scontent-atl3-1.xx&oh=29303660db232f4b8b6f4dd12d1e4402&oe=5C88028F",
    attendanceCode: "000"
  },
  {
    name: "Aerial Robotics Club: Interest Meeting",
    description: "",
    location: "Engineering Building 3",
    startTime: new Date(2018, 11, 9, 18, 30),
    endTime: new Date(2018, 11, 9, 19, 30),
    image: "https://scontent-atl3-1.xx.fbcdn.net/v/t1.0-9/35544431_933115973558524_7863232838550683648_o.jpg?_nc_cat=106&_nc_ht=scontent-atl3-1.xx&oh=9f05e9e959034c39c29cf3ef993bcc96&oe=5CA5BCF0",
    attendanceCode: "000"
  },
  {
    name: "GLBT Holiday Potluck",
    description: "Be sure to join us for the annual GLBT Holiday Potluck tonight from 6:00-8:00pm in Student Health Services, Room 2301. Food will be provided by the GLBT Faculty and Staff Network and by the GLBT Center!",
    location: "GLBT Center",
    startTime: new Date(2018, 11, 15, 18),
    endTime: new Date(2018, 11, 15, 20),
    image: "https://scontent-atl3-1.xx.fbcdn.net/v/t1.0-9/40769440_1859069084182550_3278264948383285248_n.jpg?_nc_cat=109&_nc_ht=scontent-atl3-1.xx&oh=84178efc93fcf7f29b23578edbb7d945&oe=5CAA668D",
    attendanceCode: "000"
  },
  {
    name: "NCOD - Painting the Free Expression Tunnel",
    description: "Join the GLBT Community Alliance (GLBTCA) as they celebrate the annual National Coming Out Day by painting the Free Expression Tunnel. Paint supplies will be provided.",
    location: "Free Expression Tunnel",
    startTime: new Date(2018, 11, 7, 18),
    endTime: new Date(2018, 11, 7, 21),
    image: "https://scontent-atl3-1.xx.fbcdn.net/v/t1.0-9/40678042_1858789594210499_8403542026489954304_n.jpg?_nc_cat=106&_nc_ht=scontent-atl3-1.xx&oh=727a18bfce876c37d7f5671cb774c4c2&oe=5CA48C19",
    attendanceCode: "000"
  },
  {
    name: "Aikido Class",
    description: "",
    location: "Carmichael Gym",
    startTime: new Date(2018, 11, 10, 18),
    endTime: new Date(2018, 11, 10, 20),
    image: "https://images.collegiatelink.net/clink/images/5854ab48-f21b-4c14-9fc5-a2f130b565de0a23c0cd-5cf7-4e72-8d8e-22006914dbc8.jpg?preset=large-h",
    attendanceCode: "000"
  }
];
//Normal user
const users = [{
    firstName: "Stu",
    lastName: "Student",
    year: "FR",
    studentId: "2000000000",
    major: "Computer Science",
    email: "student@ncsu.edu",
    image: "https://pre00.deviantart.net/9dd1/th/pre/i/2013/246/7/c/sad_moment_by_exceru_hensggott-d6kyix0.png",
    active: true,
    password: password
  },
  {
    firstName: "Or",
    lastName: "Organizer",
    year: "SR",
    studentId: "123999",
    major: "Psychology",
    email: "organizer@ncsu.edu",
    image: "https://orig00.deviantart.net/cfad/f/2010/149/6/b/sad_eevee_by_psunna.png",
    active: true,
    password: password
  }
];

const admin = {
  firstName: "Ad",
  lastName: "Admin",
  employeeId: "0000123",
  email: "admin@ncsu.edu",
  active: true,
  password: password
};

const tagsUsers = [{
    tagId: "2",
    userId: "1"
  },
  {
    tagId: "6",
    userId: "1"
  },
  {
    tagId: "7",
    userId: "1"
  },
  {
    tagId: "13",
    userId: "1"
  },
  {
    tagId: "21",
    userId: "1"
  },
  {
    tagId: "1",
    userId: "2"
  },
  {
    tagId: "11",
    userId: "2"
  },
  {
    tagId: "12",
    userId: "2"
  },
  {
    tagId: "15",
    userId: "2"
  }
];

const clubsEvents = [{
    clubId: "1",
    eventId: "7"
  },
  {
    clubId: "3",
    eventId: "1"
  },
  {
    clubId: "3",
    eventId: "2"
  },
  {
    clubId: "3",
    eventId: "3"
  },
  {
    clubId: "3",
    eventId: "4"
  },
  {
    clubId: "4",
    eventId: "8"
  },
  {
    clubId: "4",
    eventId: "9"
  },
  {
    clubId: "5",
    eventId: "6"
  },
  {
    clubId: "6",
    eventId: "5"
  },
  {
    clubId: "7",
    eventId: "10"
  }
];

const clubsTags = [{
    clubId: "1",
    tagId: "4"
  },
  {
    clubId: "1",
    tagId: "5"
  },
  {
    clubId: "2",
    tagId: "16"
  },
  {
    clubId: "3",
    tagId: "1"
  },
  {
    clubId: "3",
    tagId: "2"
  },
  {
    clubId: "3",
    tagId: "7"
  },
  {
    clubId: "4",
    tagId: "12"
  },
  {
    clubId: "4",
    tagId: "23"
  },
  {
    clubId: "5",
    tagId: "5"
  },
  {
    clubId: "5",
    tagId: "14"
  },
  {
    clubId: "6",
    tagId: "21"
  },
  {
    clubId: "6",
    tagId: "23"
  },
  {
    clubId: "7",
    tagId: "22"
  }
];

const clubsUsers = [{
    clubId: "6",
    userId: "1"
  },
  {
    clubId: "7",
    userId: "1"
  },
  {
    clubId: "1",
    userId: "2"
  },
  {
    clubId: "2",
    userId: "2"
  },
  {
    clubId: "3",
    userId: "2",
    isOrganizer: true
  },
  {
    clubId: "4",
    userId: "2"
  }
];

const eventsUsers = [{
    eventId: "5",
    userId: "1",
    attended: true,
    rsvp: true
  },
  {
    eventId: "10",
    userId: "1",
    attended: false,
    rsvp: true
  },
  {
    eventId: "1",
    userId: "2",
    attended: true,
    rsvp: true
  },
  {
    eventId: "2",
    userId: "2",
    attended: true,
    rsvp: true
  },
  {
    eventId: "3",
    userId: "2",
    attended: true,
    rsvp: true
  },
  {
    eventId: "4",
    userId: "2",
    attended: true,
    rsvp: true
  }
];

const eventsTags = [{
    eventId: "7",
    tagId: "4"
  },
  {
    eventId: "7",
    tagId: "5"
  },
  {
    eventId: "1",
    tagId: "1"
  },
  {
    eventId: "1",
    tagId: "2"
  },
  {
    eventId: "1",
    tagId: "7"
  },
  {
    eventId: "2",
    tagId: "1"
  },
  {
    eventId: "2",
    tagId: "2"
  },
  {
    eventId: "2",
    tagId: "7"
  },
  {
    eventId: "3",
    tagId: "1"
  },
  {
    eventId: "3",
    tagId: "2"
  },
  {
    eventId: "3",
    tagId: "7"
  },
  {
    eventId: "4",
    tagId: "1"
  },
  {
    eventId: "4",
    tagId: "2"
  },
  {
    eventId: "4",
    tagId: "7"
  },
  {
    eventId: "5",
    tagId: "21"
  },
  {
    eventId: "5",
    tagId: "23"
  },
  {
    eventId: "6",
    tagId: "14"
  },
  {
    eventId: "8",
    tagId: "12"
  },
  {
    eventId: "9",
    tagId: "12"
  },
  {
    eventId: "10",
    tagId: "22"
  }
];
/* GET a certain event */
router.get("/", async function (req, res, next) {
  try {
    Tags.bulkCreate(tags).then(() => {
      console.log("Tags Populated");
    });
    Users.bulkCreate(users).then(() => {
      console.log("Users Populated");
    });
    Clubs.bulkCreate(clubs).then(() => {
      console.log("Clubs Populated");
    });
    Events.bulkCreate(events).then(() => {
      console.log("Events Populated");
    });
    Admins.create(admin).then(() => {
      console.log("Admins Populated");
    });
    ClubsEvents.bulkCreate(clubsEvents).then(() => {
      console.log("ClubsEvents Populated");
    });
    ClubsTags.bulkCreate(clubsTags).then(() => {
      console.log("ClubsTags Populated");
    });
    ClubsUsers.bulkCreate(clubsUsers).then(() => {
      console.log("ClubsUsers Populated");
    });
    EventsTags.bulkCreate(eventsTags).then(() => {
      console.log("EventsTags Populated");
    });
    EventsUsers.bulkCreate(eventsUsers).then(() => {
      console.log("EventsUsers Populated");
    });
    TagsUsers.bulkCreate(tagsUsers).then(() => {
      console.log("TagsUsers Populated");
    });
  } catch (e) {
    return next(new err.InternalServerError(e.message));
  }
  res.send("All populated");
});

module.exports = router;