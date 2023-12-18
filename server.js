const express = require("express"); // loads the express package
const { engine } = require("express-handlebars"); // loads handlebars for Express
const port = 1236; // defines the port
const app = express(); // creates the Express application
const sqlite3 = require("sqlite3");
const bodyParser = require("body-parser");
const session = require("express-session");
const connectSqlite3 = require("connect-sqlite3");
const cookieParser = require("cookie-parser");
const bcrypt = require("bcrypt");

const db = new sqlite3.Database("projects.db");

db.run(
  "CREATE TABLE users (uId INTEGER PRIMARY KEY, uName TEXT NOT NULL, uUserName TEXT NOT NULL, uPassword TEXT NOT NULL, uType TEXT NOT NULL)",
  (error) => {
    if (error) {
      console.log("ERROR: ", error.message);
    } else {
      console.log("---> Table users created");

      const users = [
        {
          uId: "0",
          uName: "Klara",
          uUserName: "Klara1",
          uPassword:
            "$2b$12$qs8kkR3OzDb6x.ZOPCtD..lgaQkhi.ZvLNmQN32LfFnyS0mUXIy96",
          uType: "Admin",
        },
        {
          uId: "1",
          uName: "Lia",
          uUserName: "Lia1",
          uPassword:
            "$2b$12$kLdcObpPUxpCZYOaRbZPH.KodynKXq54rfXA5Uy7hMo0AIlseQqpC",
          uType: "User",
        },
        {
          uId: "2",
          uName: "Eli",
          uUserName: "Eli1",
          uPassword:
            "$2b$12$pHXt5SvmhAow58BDnHdup.2xuvYY4A/fpxJpCdNDBvP9DkEmb0vE6",
          uType: "User",
        },
        {
          uId: "3",
          uName: "Jerome",
          uUserName: "Jerome1",
          uPassword:
            "$2b$12$p9Er2w6Kw2XxjR38KwpXJuFpY9Ogz3Npsa6L5OuYHnJlrAwpfaPgm",
          uType: "User",
        },
        {
          uId: "4",
          uName: "Laura",
          uUserName: "Laura1",
          uPassword:
            "$2b$12$bLOuOyzCh0w5tp32sstI0OvN2uTukdDKrgCFL6HVNk2NbX1QQ7foq",
          uType: "User",
        },
      ];
      users.forEach((oneUser) => {
        db.run(
          "INSERT INTO users (uId, uName, uUserName, uPassword, uType) VALUES (?, ?, ?, ?, ?)",
          [
            oneUser.uId,
            oneUser.uName,
            oneUser.uUserName,
            oneUser.uPassword,
            oneUser.uType,
          ],
          (error) => {
            if (error) {
              console.log("Error: ", error.message);
            } else {
              console.log("Line added into the users table");
            }
          }
        );
      });
    }
  }
);

db.run(
  "CREATE TABLE images (iId INTEGER PRIMARY KEY, iURL TEXT NOT NULL, iURLAlt TEXT NOT NULL, isTop TEXT NOT NULL, isBottom TEXT NOT NULL)",
  (error) => {
    if (error) {
      console.log("ERROR: ", error.message);
    } else {
      console.log("---> Table works created");

      const images = [
        {
          iId: "0",
          iURL: "img/cat2.png",
          iURLAlt: "cat image",
          isTop: "1",
          isBottom: "0",
        },
        {
          iId: "1",
          iURL: "img/cat1.png",
          iURLAlt: "cat image",
          isTop: "1",
          isBottom: "0",
        },
        {
          iId: "2",
          iURL: "img/cat3.png",
          iURLAlt: "cat image",
          isTop: "0",
          isBottom: "1",
        },
        {
          iId: "3",
          iURL: "img/cat4.png",
          iURLAlt: "cat image",
          isTop: "0",
          isBottom: "1",
        },
      ];

      images.forEach((oneImg) => {
        db.run(
          "INSERT INTO images (iId, iURL, iURLAlt, isTop, isBottom) VALUES (?, ?, ?, ?, ?)",
          [
            oneImg.iId,
            oneImg.iURL,
            oneImg.iURLAlt,
            oneImg.isTop,
            oneImg.isBottom,
          ],
          (error) => {
            if (error) {
              console.log("Error: ", error.message);
            } else {
              console.log("Line added into the images table");
            }
          }
        );
      });
    }
  }
);

db.run(
  "CREATE TABLE works (wId INTEGER PRIMARY KEY, wDate TEXT, wTitle TEXT, wPlace TEXT, wCountry TEXT)",
  (error) => {
    if (error) {
      console.log("ERROR: ", error.message);
    } else {
      console.log("---> Table works created");

      const works = [
        {
          wId: "1",
          wDate: "July-August 2020",
          wTitle: "Warehouse employee",
          wPlace: "Erum",
          wCountry: "PL",
        },
        {
          wId: "2",
          wDate: "June-July 2021",
          wTitle: "Sales assistant in the shoe store",
          wPlace: "CCC",
          wCountry: "PL",
        },
        {
          wId: "3",
          wDate: "June-July 2022",
          wTitle: "Sales assistant in the art store",
          wPlace: "Paper Concept",
          wCountry: "PL",
        },
        {
          wId: "4",
          wDate: "July 2022",
          wTitle: "Waitress in the ramen restaurant",
          wPlace: "Meso Ramen",
          wCountry: "PL",
        },
        {
          wId: "5",
          wDate: "2020-2023",
          wTitle: "Creating custom clothes and reselling",
          wPlace: "online",
          wCountry: "PL",
        },
        {
          wId: "6",
          wDate: "2022",
          wTitle: "Information service",
          wPlace: "matches and concerts",
          wCountry: "PL",
        },
        {
          wId: "7",
          wDate: "June 2023",
          wTitle: "Waitress in the kebab restaurant",
          wPlace: "Holy Kebab Visby",
          wCountry: "SE",
        },
        {
          wId: "8",
          wDate: "July-August 2023",
          wTitle: "Housekeeping in the hotel",
          wPlace: "Abisko Mountain Lodge",
          wCountry: "SE",
        },
      ];

      works.forEach((oneWork) => {
        db.run(
          "INSERT INTO works (wId, wDate, wTitle, wPlace, wCountry) VALUES (?, ?, ?, ?, ?)",
          [
            oneWork.wId,
            oneWork.wDate,
            oneWork.wTitle,
            oneWork.wPlace,
            oneWork.wCountry,
          ],
          (error) => {
            if (error) {
              console.log("Error: ", error.message);
            } else {
              console.log("Line added into the works table");
            }
          }
        );
      });
    }
  }
);

db.run(
  "CREATE TABLE contacts (cId INTEGER PRIMARY KEY, cURL TEXT, cInfo TEXT, cName TEXT, cLink TEXT)",
  (error) => {
    if (error) {
      console.log("ERROR: ", error.message);
    } else {
      console.log("---> Table projects created");

      const contacts = [
        {
          cId: "0",
          cURL: "img/mail.svg",
          cInfo: "klara.swiecicka@hotmail.com",
          cName: "mail",
          cLink: "-",
        },
        {
          cId: "1",
          cURL: "img/phone.svg",
          cInfo: "07 07 07 07 07",
          cName: "phone",
          cLink: "-",
        },
        {
          cId: "2",
          cURL: "img/pin.svg",
          cInfo: "Randomstreet 13, 123-45 Jönköping",
          cName: "address",
          cLink: "-",
        },
        {
          cId: "3",
          cURL: "img/in-white.svg",
          cInfo: "Klara Swiecicka",
          cName: "LinkedIn",
          cLink: "www.linkedin.com/in/klara-swiecicka-824262275",
        },
        {
          cId: "4",
          cURL: "img/gh-white.svg",
          cInfo: "Klara923",
          cName: "GitHub",
          cLink: "https://github.com/Klara923",
        },
      ];

      contacts.forEach((oneContact) => {
        db.run(
          "INSERT INTO contacts (cId, cURL, cInfo, cName, cLink) VALUES (?, ?, ?, ?, ?)",
          [
            oneContact.cId,
            oneContact.cURL,
            oneContact.cInfo,
            oneContact.cName,
            oneContact.cLink,
          ],
          (error) => {
            if (error) {
              console.log("Error: ", error.message);
            } else {
              console.log("Line added into the project table");
            }
          }
        );
      });
    }
  }
);

db.run(
  "CREATE TABLE projects (pId INTEGER PRIMARY KEY, pURL TEXT NOT NULL, pName TEXT NOT NULL, pOverlayName TEXT NOT NULL, pAuthor TEXT NOT NULL, pDate TEXT NOT NULL, pDesc TEXT NOT NULL, pProgramming INTEGER, pDesign INTEGER, pTool TEXT NOT NULL, pType TEXT NOT NULL)",
  (error) => {
    if (error) {
      console.log("ERROR: ", error.message);
    } else {
      console.log("---> Table projects created");

      const projects = [
        {
          pId: "0",
          pURL: "img/projects-img/gameLOS.png",
          pName: "Game",
          pOverlayName: "Labyrinth Of Souls",
          pAuthor: "Klara S, Olha P",
          pDate: "25.05.2023",
          pDesc:
            "Adventure game with original graphics. In the game, the player takes the role of the main character and has missions to complete. During gameplay, the player conducts dialogues with other characters, collects items, and plays mini-games. The game is final project for the Foundations of Programming (7.5 credits) course.",
          pProgramming: "1",
          pDesign: "0",
          pTool: "P5JS, HTML, CSS",
          pType: "Game",
        },
        {
          pId: "1",
          pURL: "img/projects-img/luna.png",
          pName: "Lunalander",
          pOverlayName: "Lunalander",
          pAuthor: "Klara S",
          pDate: "08.03.2023",
          pDesc:
            'A simple game based on the concept of "Luna lander". The game is project for the Foundations of Programming (7.5 credits) course.',
          pProgramming: "1",
          pDesign: "0",
          pTool: "P5JS, HTML",
          pType: "Game",
        },
        {
          pId: "2",
          pURL: "img/projects-img/london.png",
          pName: "Website",
          pOverlayName: "Travel agency online store - Website",
          pAuthor: "Klara S, Natalia F, Tess L",
          pDate: "08.12.2022",
          pDesc:
            "Travel agency website offering trips to London. The customer has the opportunity to view various offers and buy online. The website is final project for Web and User Interface Design (15 credits) course.",
          pProgramming: "1",
          pDesign: "0",
          pTool: "JS, HTML ,CSS",
          pType: "Website",
        },
        {
          pId: "3",
          pURL: "img/projects-img/frog.png",
          pName: "Frogger",
          pOverlayName: "Frogger - Game",
          pAuthor: "Klara S",
          pDate: "21.05.2023",
          pDesc:
            'A "Frogger" game created free time to improve my programming skills. Part of the code is based on the tutorial, and part is written by myself. Some graphics were also created by me.',
          pProgramming: "1",
          pDesign: "0",
          pTool: "JS, HTML, CSS",
          pType: "Game",
        },
        {
          pId: "4",
          pURL: "img/projects-img/WAM.png",
          pName: "Whack A Mole",
          pOverlayName: "Whack A Mole - Game",
          pAuthor: "Klara S",
          pDate: "17.05.2023",
          pDesc:
            'A "Whack a Mole" game created free time to improve my programming skills. Part of the code is based on the tutorial, and part is written by myself. Graphics in the game were created by me.',
          pProgramming: "1",
          pDesign: "0",
          pTool: "JS, HTML, CSS",
          pType: "Game",
        },
        {
          pId: "5",
          pURL: "img/projects-img/RPS.png",
          pName: "Game",
          pOverlayName: "Rock Paper Scrissors - Game",
          pAuthor: "Klara S",
          pDate: "16.05.2023",
          pDesc:
            'A "Rock Paper Scrissors" game created free time to improve my programming skills. Part of the code is based on the tutorial, and part is written by myself.',
          pProgramming: "1",
          pDesign: "0",
          pTool: "JS, HTML, CSS",
          pType: "Game",
        },
        {
          pId: "6",
          pURL: "img/projects-img/tokyo.png",
          pName: "Magazine",
          pOverlayName: "Tokyo magazine",
          pAuthor: "Klara S, Juliana A, Natalia F, Olha P, Réka V",
          pDate: "22.05.2023",
          pDesc:
            "Travel magazine about Tokyo. Readers can find basic information about the largest metropolis in the world and read chapters about culture, architecture, Japanese cuisine or nightlife, and places worth visiting. The group is responsible for the entire visual side of the magazine. The photos and illustrations used come from the stock. The magazine was prepared in the form of an interactive PDF and printed in a printing house as well. The magazine is the project for Visual Communication (7.5 credits) course.",
          pProgramming: "0",
          pDesign: "1",
          pTool: "InDesign, Photoshop",
          pType: "Magazine",
        },
        {
          pId: "7",
          pURL: "img/projects-img/cover.png",
          pName: "Brochure Cover",
          pOverlayName: "Brochure Cover for JTH",
          pAuthor: "Klara S",
          pDate: "24.09.2023",
          pDesc:
            "The brochure cover was created for the competition organized by the university. Graphics entirely made by me except for a few small illustrations.",
          pProgramming: "0",
          pDesign: "1",
          pTool: "Illustrator",
          pType: "Cover",
        },
        {
          pId: "8",
          pURL: "img/projects-img/axolot.png",
          pMoreURL: "-",
          pName: "Axolot",
          pOverlayName: "Skeuomorphism Illustration Of Axolot",
          pAuthor: "Klara S",
          pDate: "21.04.2023",
          pDesc:
            "Skeuomorphic illustration of the Axolot. The illustration is the exercise for Visual Communication (7.5 credits) course.",
          pProgramming: "0",
          pDesign: "1",
          pTool: "Illustrator",
          pType: "Illustration",
        },
        {
          pId: "9",
          pURL: "img/projects-img/animals.png",
          pName: "Brochure",
          pOverlayName: '"Amazing Animals" - Brochure',
          pAuthor: "Klara S",
          pDate: "14.04.2023",
          pDesc:
            "Three-page brochure about animals. The brochure is the exercise for Visual Communication (7.5 credits) course.",
          pProgramming: "0",
          pDesign: "1",
          pTool: "Indesign",
          pType: "Brochure",
        },
        {
          pId: "10",
          pURL: "img/projects-img/hello.png",
          pName: "Brochure",
          pOverlayName: '"Hello Kitty" - Brochure',
          pAuthor: "Klara S",
          pDate: "07.04.2023",
          pDesc:
            "Three-page brochure about Hello Kitty. The brochure is the exercise for Visual Communication (7.5 credits) course.",
          pProgramming: "0",
          pDesign: "1",
          pTool: "Indesign",
          pType: "Brochure",
        },
        {
          pId: "11",
          pURL: "img/projects-img/celest.png",
          pName: "Branding",
          pOverlayName: '"Celest" - Branding',
          pAuthor: "Klara S",
          pDate: "14.10.2023",
          pDesc:
            'Branding project created for the fictitious brand "Celest" which specializes in the production and sale of candles. It is the final project for Fundamentals of Graphic Design (7.5 credits) course',
          pProgramming: "0",
          pDesign: "1",
          pTool: "Indesign, Illustrator",
          pType: "Branding guide",
        },
        {
          pId: "12",
          pURL: "img/projects-img/second.png",
          pName: "Website Prototype",
          pOverlayName: '"Second Chance" - Online Store Prototype',
          pAuthor: "Klara S, Juliana A, Natalia F",
          pDate: "20.05.2023",
          pDesc:
            "Prototype of the online second-hand store. It presents a happy path in which the user can apply filters, search for the product, and finally buy it. During the creation of the project, the group put special emphasis on UX and UI. A prototype is the final project for the User Experience Design (7.5 credits) course.",
          pProgramming: "0",
          pDesign: "1",
          pTool: "Figma",
          pType: "Website prototype",
        },
      ];

      projects.forEach((oneProject) => {
        db.run(
          "INSERT INTO projects (pID, pURL, pName, pOverlayName, pAuthor, pDate, pDesc, pProgramming, pDesign, pTool, pType) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
          [
            oneProject.pId,
            oneProject.pURL,
            oneProject.pName,
            oneProject.pOverlayName,
            oneProject.pAuthor,
            oneProject.pDate,
            oneProject.pDesc,
            oneProject.pProgramming,
            oneProject.pDesign,
            oneProject.pTool,
            oneProject.pType,
          ],
          (error) => {
            if (error) {
              console.log("Error: ", error.message);
            } else {
              console.log("Line added into the project table");
            }
          }
        );
      });
    }
  }
);

app.engine("handlebars", engine());

app.set("view engine", "handlebars");

app.set("views", "./views");

app.use(express.static("public"));

app.use((req, res, next) => {
  console.log("Req. URL: ", req.url);
  next();
});

// POST FORMS
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// SESSION

// store session in the database
const SQLiteStore = connectSqlite3(session);

app.use(
  session({
    store: new SQLiteStore({ db: "session-db.db" }),
    saveUninitialized: false,
    resave: false,
    secret: "This123Is@Another#456GreatSecret678%Sentence",
  })
);

app.post("/login", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  console.log("Username: ", username);
  console.log("Password: ", password);

  db.get("SELECT * FROM users WHERE uUserName=?", [username], (err, user) => {
    if (err) {
      console.log("Wrong username: ", err);
      res.redirect("/login");
    } else {
      console.log("User: ", user);
      bcrypt.compare(password, user.uPassword, (err, result) => {
        if (err) {
          console.log("Error in comparing encryption: ", err);
          res.redirect("/login");
        } else if (result == true) {
          console.log("User is logged in!");
          req.session.isAdmin = user.uType == "Admin";
          req.session.isLoggedIn = true;
          req.session.loggedIn = true;
          req.session.name = user.uUname;

          res.redirect("/");
        } else {
          console.log("User is NOT logged in");
          res.redirect("/login");
        }
      });
    }
  });
});

app.get("/login", (req, res) => {
  const model = {
    loggedIn: req.session.loggedIn,
    name: req.session.name,
    isAdmin: req.session.isAdmin,
    title: "Login page",
  };
  res.render("login.handlebars", model);
});

app.get("/logout", (req, res) => {
  req.session.destroy((error) => {
    console.log("Error while detroying the session: ", error);
  });
  console.log("Logged out...");
  res.redirect("/");
});

app.get("/", (req, res) => {
  console.log("SESSION: ", req.session);
  db.all("SELECT * FROM images", (error, theImages) => {
    if (error) {
      const model = {
        hasDatabaseError: true,
        theError: error,
        images: [],
        homePage: true,
        title: "Home page",
        loggedIn: req.session.loggedIn,
        name: req.session.name,
        isAdmin: req.session.isAdmin,
      };
      res.render("home.handlebars", model);
    } else {
      const model = {
        hasDatabaseError: false,
        theError: "",
        images: theImages,
        homePage: true,
        title: "Home page",
        loggedIn: req.session.loggedIn,
        name: req.session.name,
        isAdmin: req.session.isAdmin,
      };
      res.render("home.handlebars", model);
    }
  });
});

app.get("/about", (req, res) => {
  db.all("SELECT * FROM works ", (error, theWorks) => {
    if (error) {
      const model = {
        hasDatabaseError: true,
        theError: error,
        works: [],

        title: "About me page",
        loggedIn: req.session.loggedIn,
        name: req.session.name,
        isAdmin: req.session.isAdmin,
      };

      res.render("about.handlebars", model);
    } else {
      const model = {
        hasDatabaseError: false,
        theError: "",
        works: theWorks,

        title: "About me page",
        loggedIn: req.session.loggedIn,
        name: req.session.name,
        isAdmin: req.session.isAdmin,
      };

      res.render("about.handlebars", model);
    }
  });
});

// users

app.get("/users", (req, res) => {
  db.all("SELECT * FROM users", (error, theUsers) => {
    if (error) {
      const model = {
        hasDatabaseError: true,
        theError: error,
        users: [],
        title: "Users page",
        loggedIn: req.session.loggedIn,
        name: req.session.name,
        isAdmin: req.session.isAdmin,
      };

      res.render("users.handlebars", model);
    } else {
      const model = {
        hasDatabaseError: false,
        theError: "",
        users: theUsers,
        title: "Users page",
        loggedIn: req.session.loggedIn,
        name: req.session.name,
        isAdmin: req.session.isAdmin,
      };

      res.render("users.handlebars", model);
    }
  });
});

// create new user

app.get("/users/new", (req, res) => {
  if (req.session.loggedIn == true && req.session.isAdmin == true) {
    const model = {
      loggedIn: req.session.loggedIn,
      name: req.session.name,
      isAdmin: req.session.isAdmin,
    };
    res.render("newUser.handlebars", model);
  } else {
    res.redirect("/login");
  }
});

app.post("/users/new", (req, res) => {
  const { uName, uUserName, uPassword, uType } = req.body;

  if (req.session.loggedIn && req.session.isAdmin) {
    // Hash the password
    bcrypt.hash(uPassword, 10, (hashError, hashedPassword) => {
      if (hashError) {
        console.log("Password hashing error:", hashError);
        res.redirect("/error-page"); // Handle the error appropriately
      } else {
        const newUser = [uName, uUserName, hashedPassword, uType];

        // Insert the new user with the hashed password
        db.run(
          "INSERT INTO users (uName, uUserName, uPassword, uType) VALUES (?, ?, ?, ?)",
          newUser,
          (insertError) => {
            if (insertError) {
              console.log("ERROR: ", insertError);
            } else {
              console.log("Line added into the users table");
            }
            res.redirect("/users");
          }
        );
      }
    });
  } else {
    res.redirect("/login");
  }
});

// edit user

app.get("/users/edit/:id", (req, res) => {
  const id = req.params.id;

  db.get("SELECT * FROM users WHERE uId=?", [id], (error, theUser) => {
    if (error) {
      console.log("ERROR: ", error);
      const model = {
        hasDatabaseError: true,
        theError: error,
        user: {},
        loggedIn: req.session.loggedIn,
        name: req.session.name,
        isAdmin: req.session.isAdmin,
      };
      res.render("editUser.handlebars", model);
    } else {
      const model = {
        hasDatabaseError: false,
        theError: "",
        user: theUser,
        loggedIn: req.session.loggedIn,
        name: req.session.name,
        isAdmin: req.session.isAdmin,
        helpers: {
          uTypeU(value) {
            return value == "User";
          },
          uTypeA(value) {
            return value == "Admin";
          },
        },
      };
      res.render("editUser.handlebars", model);
    }
  });
});

app.post("/users/edit/:id", (req, res) => {
  const id = req.params.id;
  const editedU = [
    req.body.uName,
    req.body.uUserName,
    req.body.uPassword,
    req.body.uType,
    id,
  ];
  if (req.session.loggedIn == true && req.session.isAdmin == true) {
    db.run(
      "UPDATE users SET uName=?, uUserName=?, uPassword=?, uType=? WHERE uId=?",
      editedU,
      (error) => {
        if (error) {
          console.log("ERROR: ", error);
        } else {
          console.log("User edited!");
        }
        res.redirect("/users");
      }
    );
  } else {
    res.redirect("/login");
  }
});

// delete user

app.get("/users/delete/:id", (req, res) => {
  const id = req.params.id;

  if (req.session.loggedIn == true && req.session.isAdmin == true) {
    db.run("DELETE FROM users WHERE uId=?", [id], (error, theUsers) => {
      if (error) {
        const model = {
          hasDatabaseError: true,
          theError: error,
          loggedIn: req.session.loggedIn,
          name: req.session.name,
          isAdmin: req.session.isAdmin,
        };
        res.redirect("/");
      } else {
        const model = {
          hasDatabaseError: false,
          theError: "",
          loggedIn: req.session.loggedIn,
          name: req.session.name,
          isAdmin: req.session.isAdmin,
        };
        res.redirect("/");
      }
    });
  } else {
    res.redirect("/login");
  }
});

app.get("/projects", (req, res) => {
  db.all("SELECT * FROM projects", (error, theProjects) => {
    if (error) {
      const model = {
        hasDatabaseError: true,
        theError: error,
        projects: [],
        title: "Projects page",
        loggedIn: req.session.loggedIn,
        name: req.session.name,
        isAdmin: req.session.isAdmin,
      };

      res.render("projects.handlebars", model);
    } else {
      const model = {
        hasDatabaseError: false,
        theError: "",
        projects: theProjects,
        title: "Projects page",
        loggedIn: req.session.loggedIn,
        name: req.session.name,
        isAdmin: req.session.isAdmin,
      };

      res.render("projects.handlebars", model);
    }
  });
});

// sends the form for a new project

app.get("/projects/new", (req, res) => {
  if (req.session.loggedIn == true && req.session.isAdmin == true) {
    const model = {
      loggedIn: req.session.loggedIn,
      name: req.session.name,
      isAdmin: req.session.isAdmin,
    };
    res.render("newProject.handlebars", model);
  } else {
    res.redirect("/login");
  }
});

// creates a new project

app.post("/projects/new", (req, res) => {
  const newP = [
    req.body.pURL,
    req.body.pName,
    req.body.pOverlayName,
    req.body.pAuthor,
    req.body.pDate,
    req.body.pDesc,
    req.body.pProgramming,
    req.body.pDesign,
    req.body.pTool,
    req.body.pType,
  ];
  if (req.session.loggedIn == true && req.session.isAdmin == true) {
    db.run(
      "INSERT INTO projects (pURL, pName, pOverlayName, pAuthor, pDate, pDesc, pProgramming, pDesign, pTool, pType) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
      newP,
      (error) => {
        if (error) {
          console.log("ERROR: ", error);
        } else {
          console.log("Line added into the projects table");
        }
        res.redirect("/projects");
      }
    );
  } else {
    res.redirect("/login");
  }
});

app.get("/projects/:id", (req, res) => {
  console.log("We are in projects");
  console.log("SESSION: ", req.session);
  const id = req.params.id;

  db.all("SELECT * FROM projects WHERE pId=?", [id], (error, theProject) => {
    if (error) {
      const model = {
        hasDatabaseError: true,
        theError: error,
        project: {},
        title: "Projects page",
        loggedIn: req.session.loggedIn,
        name: req.session.name,
        isAdmin: req.session.isAdmin,
      };
      res.render("project.handlebars", model);
    } else {
      const model = {
        hasDatabaseError: false,
        theError: "",
        project: theProject,
        title: "Projects page",
        loggedIn: req.session.loggedIn,
        name: req.session.name,
        isAdmin: req.session.isAdmin,
      };
      res.render("project.handlebars", model);
    }
  });
});

// sends the form to modify a project

app.get("/projects/edit/:id", (req, res) => {
  const id = req.params.id;

  db.get("SELECT * FROM projects WHERE pId=?", [id], (error, theProject) => {
    if (error) {
      console.log("ERROR: ", error);
      const model = {
        hasDatabaseError: true,
        theError: error,
        project: {},
        loggedIn: req.session.loggedIn,
        name: req.session.name,
        isAdmin: req.session.isAdmin,
      };
      res.render("editProject.handlebars", model);
    } else {
      const model = {
        hasDatabaseError: false,
        theError: "",
        project: theProject,
        loggedIn: req.session.loggedIn,
        name: req.session.name,
        isAdmin: req.session.isAdmin,
        helpers: {
          pTrue(value) {
            return value == "1";
          },
          pFalse(value) {
            return value == "0";
          },
          dTrue(value) {
            return value == "1";
          },
          dFalse(value) {
            return value == "0";
          },
        },
      };
      res.render("editProject.handlebars", model);
    }
  });
});

app.post("/projects/edit/:id", (req, res) => {
  const id = req.params.id;
  const editedP = [
    req.body.pURL,
    req.body.pName,
    req.body.pOverlayName,
    req.body.pAuthor,
    req.body.pDate,
    req.body.pDesc,
    req.body.pProgramming,
    req.body.pDesign,
    req.body.pTool,
    req.body.pType,
    id,
  ];
  if (req.session.loggedIn == true && req.session.isAdmin == true) {
    db.run(
      "UPDATE projects SET pURL=?, pName=?, pOverlayName=?, pAuthor=?, pDate=?, pDesc=?, pProgramming=?, pDesign=?, pTool=?, pType=? WHERE pId=?",
      editedP,
      (error) => {
        if (error) {
          console.log("ERROR: ", error);
        } else {
          console.log("Project edited!");
        }
        res.redirect("/projects");
      }
    );
  } else {
    res.redirect("/login");
  }
});

// delete a project

app.get("/projects/delete/:id", (req, res) => {
  const id = req.params.id;

  if (req.session.loggedIn == true && req.session.isAdmin == true) {
    db.run("DELETE FROM projects WHERE pId=?", [id], (error, theProjects) => {
      if (error) {
        const model = {
          hasDatabaseError: true,
          theError: error,
          loggedIn: req.session.loggedIn,
          name: req.session.name,
          isAdmin: req.session.isAdmin,
        };
        res.redirect("/");
      } else {
        const model = {
          hasDatabaseError: false,
          theError: "",
          loggedIn: req.session.loggedIn,
          name: req.session.name,
          isAdmin: req.session.isAdmin,
        };
        res.redirect("/");
      }
    });
  } else {
    res.redirect("/login");
  }
});

// contacts

app.get("/contact", (req, res) => {
  db.all("SELECT * FROM contacts", (error, theContacts) => {
    if (error) {
      const model = {
        hasDatabaseError: true,
        theError: error,
        contacts: [],
        title: "Contact page",
        loggedIn: req.session.loggedIn,
        name: req.session.name,
        isAdmin: req.session.isAdmin,
      };

      res.render("contact.handlebars", model);
    } else {
      const model = {
        hasDatabaseError: false,
        theError: "",
        contacts: theContacts,
        title: "Contact page",
        loggedIn: req.session.loggedIn,
        name: req.session.name,
        isAdmin: req.session.isAdmin,
      };
      console.log(theContacts);
      res.render("contact.handlebars", model);
    }
  });
});

// sends the form for a new contact

app.get("/contact/new", (req, res) => {
  if (req.session.loggedIn == true && req.session.isAdmin == true) {
    const model = {
      loggedIn: req.session.loggedIn,
      name: req.session.name,
      isAdmin: req.session.isAdmin,
    };
    res.render("newContact.handlebars", model);
  } else {
    res.redirect("/login");
  }
});

// creates a new contact

app.post("/contact/new", (req, res) => {
  const newC = [req.body.cURL, req.body.cInfo, req.body.cName, req.body.cLink];
  if (req.session.loggedIn == true && req.session.isAdmin == true) {
    db.run(
      "INSERT INTO contacts (cURL, cInfo, cName, cLink) VALUES (?, ?, ?, ?)",
      newC,
      (error) => {
        if (error) {
          console.log("ERROR: ", error);
        } else {
          console.log("Line added into the contacts table");
        }
        res.redirect("/contact");
      }
    );
  } else {
    res.redirect("/login");
  }
});

// DELETE CONTACT

app.get("/contact/delete/:id", (req, res) => {
  const id = req.params.id;

  if (req.session.loggedIn == true && req.session.isAdmin == true) {
    db.run("DELETE FROM contacts WHERE cId=?", [id], (error, theContacts) => {
      if (error) {
        const model = {
          hasDatabaseError: true,
          theError: error,
          loggedIn: req.session.loggedIn,
          name: req.session.name,
          isAdmin: req.session.isAdmin,
        };
        res.redirect("/");
      } else {
        const model = {
          hasDatabaseError: false,
          theError: "",
          loggedIn: req.session.loggedIn,
          name: req.session.name,
          isAdmin: req.session.isAdmin,
        };
        res.redirect("/");
      }
    });
  } else {
    res.redirect("/login");
  }
});

// send the form to modify a contact

app.get("/contact/edit/:id", (req, res) => {
  const id = req.params.id;

  db.get("SELECT * FROM contacts WHERE cId=?", [id], (error, theContact) => {
    if (error) {
      console.log("ERROR: ", error);
      const model = {
        hasDatabaseError: true,
        theError: error,
        contact: {},
        loggedIn: req.session.loggedIn,
        name: req.session.name,
        isAdmin: req.session.isAdmin,
      };
      res.render("editContact.handlebars", model);
    } else {
      const model = {
        hasDatabaseError: false,
        theError: "",
        contact: theContact,
        loggedIn: req.session.loggedIn,
        name: req.session.name,
        isAdmin: req.session.isAdmin,
      };
      res.render("editContact.handlebars", model);
    }
  });
});

app.post("/contact/edit/:id", (req, res) => {
  const id = req.params.id;
  const editedC = [
    req.body.cURL,
    req.body.cInfo,
    req.body.cName,
    req.body.cLink,
    id,
  ];
  if (req.session.loggedIn == true && req.session.isAdmin == true) {
    db.run(
      "UPDATE contacts SET cURL=?, cInfo=?, cName=?, cLink=? WHERE cId=?",
      editedC,
      (error) => {
        if (error) {
          console.log("ERROR: ", error);
        } else {
          console.log("Contact edited!");
        }
        res.redirect("/contact");
      }
    );
  } else {
    res.redirect("/login");
  }
});

app.listen(port, () => {
  console.log(`Server running and listening on port ${port}...`);
});
