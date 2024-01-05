const express = require("express");
const { engine } = require("express-handlebars");
const port = process.env.PORT || 1236;
const app = express();
const sqlite3 = require("sqlite3");
const bodyParser = require("body-parser");
const session = require("express-session");
const connectSqlite3 = require("connect-sqlite3");
const cookieParser = require("cookie-parser");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const { google } = require("googleapis");

// This is test

let CLIENT_ID =
  "53439647932-rb40447mt49vci7jno1nk3e12cl112tc.apps.googleusercontent.com";
let CLIENT_SECRET = "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";
let REDIRECT_URI = "https://developers.google.com/oauthplayground";
let REFRESH_TOKEN =
  "1//04hTEMVwvQ0VnCgYIARAAGAQSNwF-L9IrG-jmCGlDyP-LSHyIym8HSiiMCF4_HFq6JmODrDGLkzdLEu23x-OzTp-ZVPJuroD0f30";

const oAuth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URI
);
oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

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
  "CREATE TABLE works (wId INTEGER PRIMARY KEY, wDate TEXT, wTitle TEXT, wPlace TEXT, wCountry TEXT)",
  (error) => {
    if (error) {
      console.log("ERROR: ", error.message);
    } else {
      console.log("---> Table works created");

      const works = [
        {
          wId: "8",
          wDate: "July-August 2020",
          wTitle: "Warehouse employee",
          wPlace: "Erum",
          wCountry: "PL",
        },
        {
          wId: "7",
          wDate: "June-July 2021",
          wTitle: "Sales assistant in the shoe store",
          wPlace: "CCC",
          wCountry: "PL",
        },
        {
          wId: "6",
          wDate: "June-July 2022",
          wTitle: "Sales assistant in the art store",
          wPlace: "Paper Concept",
          wCountry: "PL",
        },
        {
          wId: "5",
          wDate: "July 2022",
          wTitle: "Waitress in the ramen restaurant",
          wPlace: "Meso Ramen",
          wCountry: "PL",
        },
        {
          wId: "4",
          wDate: "2020-2023",
          wTitle: "Creating custom clothes and reselling",
          wPlace: "online",
          wCountry: "PL",
        },
        {
          wId: "3",
          wDate: "2022",
          wTitle: "Information service",
          wPlace: "matches and concerts",
          wCountry: "PL",
        },
        {
          wId: "2",
          wDate: "June 2023",
          wTitle: "Waitress in the kebab restaurant",
          wPlace: "Holy Kebab Visby",
          wCountry: "SE",
        },
        {
          wId: "1",
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
  "CREATE TABLE projects (pId INTEGER PRIMARY KEY, pURL TEXT NOT NULL, pURL1 TEXT NOT NULL, pURL2 TEXT NOT NULL, pName TEXT NOT NULL, pOverlayName TEXT NOT NULL, pAuthor TEXT NOT NULL, pDate TEXT NOT NULL, pDesc TEXT NOT NULL, pProgramming INTEGER, pDesign INTEGER, pTool TEXT NOT NULL, pType TEXT NOT NULL, pProgress TEXT NOT NULL, pLearned TEXT NOT NULL, pLink1Text TEXT NOT NULL, pLink1 TEXT NOT NULL, pLink2Text TEXT NOT NULL, pLink2 TEXT NOT NULL, pPreviousPageBoolean INTEGER, pPreviousPageURL TEXT NOT NULL, pNextPageBoolean INTEGER, pNextPageURL TEXT NOT NULL, pPreviousProjectName TEXT NOT NULL, pNextProjectName TEXT NOT NULL, pDownload INTEGER, pDownload2 INTEGER, pVideo INTERGER)",
  (error) => {
    if (error) {
      console.log("ERROR: ", error.message);
    } else {
      console.log("---> Table projects created");

      const projects = [
        {
          pId: "0",
          pURL: "img/projects-img/gameLOS.png",
          pURL1: "img/projects-img/gameLOS1.png",
          pURL2: "img/labyrinth-of-souls.mp4",
          pName: "Game",
          pOverlayName: "Labyrinth Of Souls",
          pAuthor: "Pair",
          pDate: "25.05.2023",
          pDesc:
            "Labyrinth of Souls is an immersive role-playing adventure game coded in JavaScript, specifically the p5.js library. Wanting to interest the player and create good UX, I focused on visual aesthetics and the implementation of efficient and effective code. This is one of my more developed programming projects, created together with a groupmate for the Foundations of Programming course.",

          pProgramming: "1",
          pDesign: "0",
          pTool: "P5.JS, HTML, CSS",
          pType: "Game",
          pProgress:
            "Our first step was creating a compelling game concept centered around a captivating plot and intriguing characters for an engaging gaming experience. After that, we started to code the game and create pixel graphics. Pixel design was chosen not accidentally because the game was supposed to resemble nostalgic retro games. Some graphics have been pre-done to diversify the game and attract the eye. Ensuring sustained interest, our game mechanics embraced diversity, incorporating elements like dialogues, collecting and using items, and challenging mini-games such as fish collection, maze, and shooting to enemies.",
          pLearned:
            "Embarking on the development of a developed project presented an invaluable learning opportunity. The game boasts a diverse array of elements, each leveraging distinct capabilities of p5.js. One of the challenges that we encountered was the creation of a maze, involving the intricate design of walls that the character must avoid. To accomplish this, we implemented a mechanism where the character, upon touching specific values, resets to the game's starting point. Reflecting on the process, adopting a class-based approach for the walls would be a more optimal and dynamic solution, which will reduce code and time.",
          pLink1Text: "Play Now!",
          pLink1: "https://ju-nmd2022.github.io/fop-final-project-project26/",
          pLink2Text: "Repository",
          pLink2: "https://github.com/ju-nmd2022/fop-final-project-project26",
          pPreviousPageBoolean: "0",
          pPreviousPageURL: "projects/1",
          pNextPageBoolean: "1",
          pNextPageURL: "1",
          pPreviousProjectName: "-",
          pNextProjectName: "Lunalander",
          pDownload: "0",
          pDownload2: "0",
          pVideo: "1",
        },
        {
          pId: "1",
          pURL: "img/projects-img/luna.png",
          pURL1: "img/projects-img/luna2.png",
          pURL2: "img/lunalander-recording.mp4",
          pName: "Lunalander",
          pOverlayName: "Lunalander",
          pAuthor: "Klara S",
          pDate: "08.03.2023",
          pDesc:
            "This project is a simple game based on the mechanics of the game Lunalander. The player controls the cat that should land in the right place to win. The game was written in JavaScipt, specifically the open-source library p5.js and it is one of the tasks for the Foundations of Programming course.",

          pProgramming: "1",
          pDesign: "0",
          pTool: "P5.JS, HTML",
          pType: "Game",
          pProgress:
            "I aimed for a fresh and clean look for the game, keeping it simple and visually pleasing. P5.js was handy for coding all the visuals. Then, I focused on game mechanics - letting players control the cat's speed with the keyboard and putting together all the screenshots.",
          pLearned:
            "The game isn't too complex, and the code is fairly straightforward. However, it marked one of my first experiences with p5.js. Creating the graphics was easy, but adding the possibility to play again was pretty challenging for me. I solved this problem by changing the screen while pressing the button and changing the parameters related to the position of the cat. Once I got that worked out, it smoothly applied to different parts of the game.",
          pLink1Text: "Play Now!",
          pLink1: "https://ju-nmd2022.github.io/fop-lunar-lander-Klara923/",
          pLink2Text: "Repository",
          pLink2: "https://github.com/ju-nmd2022/fop-lunar-lander-Klara923",
          pPreviousPageBoolean: "1",
          pPreviousPageURL: "0",
          pNextPageBoolean: "1",
          pNextPageURL: "./2",
          pPreviousProjectName: "Labirynth Of Souls",
          pNextProjectName: "Travel Agency Website",
          pDownload: "0",
          pDownload2: "0",
          pVideo: "1",
        },
        {
          pId: "2",
          pURL: "img/london-website.png",
          pURL1: "img/london1.png",
          pURL2: "img/london-recording.mp4",
          pName: "Website",
          pOverlayName: "Travel agency website",
          pAuthor: "Group",
          pDate: "08.12.2022",
          pDesc:
            "The London travel agency is the final group project for the Web and User Interface Design course. At the same time, it's my first responsive website, coded in HTML, CSS, and JavaScript, with a keen focus on elevating UI and UX. The platform consists of several sites, offering (fictitious) purchase of one of several trips to London.",

          pProgramming: "1",
          pDesign: "0",
          pTool: "JS, HTML ,CSS",
          pType: "Website",
          pProgress:
            "Initiating with a Figma prototype, we meticulously designed the pages and functionalities. Transitioning to HTML and CSS, we created a responsive site adaptable to desktops, tablets, and smartphones. The final touch involved JS implementation, introducing a dynamic carousel on the home page and a simple animation on the purchase confirmation page.",
          pLearned:
            "Creating a website was a valuable experience, demanding attention to various aspects. In addition, the Web and User Interface Design course was my first contact with programming, so mapping the prototype from Figma in the code was not an easy task. The biggest challenge was to create a responsive website because desktop design and mobile design differ quite strongly. However, by adding separate classes for desktop and mobile and using media queries in CSS design, we were able to achieve the intended effect.",
          pLink1Text: "Website",
          pLink1: "https://ju-nmd2022.github.io/wuid-project-group-20/",
          pLink2Text: "Repository",
          pLink2: "https://github.com/ju-nmd2022/wuid-project-group-20",
          pPreviousPageBoolean: "1",
          pPreviousPageURL: "1",
          pNextPageBoolean: "1",
          pNextPageURL: "./3",
          pPreviousProjectName: "Lunalander",
          pNextProjectName: "Portfolio Website",
          pDownload: "0",
          pDownload2: "0",
          pVideo: "1",
        },
        {
          pId: "3",
          pURL: "img/website-mockup.png",
          pURL1: "img/portfolio-website1.png",
          pURL2: "img/portfolio-website-recording-compressed.mp4",
          pName: "Portfolio website",
          pOverlayName: "Portfolio website",
          pAuthor: "Klara S",
          pDate: "12.2023",
          pDesc:
            "My portfolio website is my most advanced programming project. The first version was created as the final project for the Web Development Fundamentals course. Currently, you are using the updated version with improved design and added features, including the ability to send an e-mail or download a PDF. This comprehensive project comprises a dynamic front-end side, based on HTML, Handlebars templates, CSS, Spectre.css, and JavaScript. It is connected to the extensive back-end, built using Node.js, the npm package manager, and a database powered by SQLite.",

          pProgramming: "1",
          pDesign: "0",
          pTool: "HTML, CSS, JS, Node.js, Express.js, Handlebars",
          pType: "Website",
          pProgress:
            "I initiated the site's development by coding the front-end side with HTML, CSS, and framework spectre.css. Simultaneously, I launched the back-end using Node.js, enabling the creation of a server-side web application. The incorporation of packages, such as Express.js and Handlebars, facilitated dynamic element display and reduced the amount of code written. Further development process included the establishment of an extensive database housing multiple pieces of data about projects and users. By combining SQlite and Node.js, manipulating and using the information like paths to images or texts from the database was not complicated. Additionally, I implemented a user management system, creating a user database with administrative capabilities. Admin-designated users can seamlessly edit, add, and modify data related to users and projects. Prioritizing security, I implemented measures such as session management and password hashing using bcrypt during the login process. Further improvements involved redesigning the front-end side, integrating oAuth2client, and expanding the database.",
          pLearned:
            "The development of this project helped me understand client-server communication through the HTTP protocol, the concept of request-response patterns, and middleware. This was made possible through the utilization of the JavaScript runtime environment, Node.js, alongside Express.js and relevant npm packages. I gained theoretical and practical knowledge about databases, and how to create and use them. I understood fundamental security principles, especially concerning login procedures and the safeguarding of user data. By implementing these elements in my code, I created an extensive web application while at the same time deepening my knowledge in the field of back-end development. Moreover, through the development process, I polished my skills in utilizing HTML, CSS, the Spectre.css framework, and the creation of responsive design.",
          pLink1Text: "Repository",
          pLink1: "https://github.com/Klara923/myappgit-2023",
          pLink2Text: "",
          pLink2: "",
          pPreviousPageBoolean: "1",
          pPreviousPageURL: "2",
          pNextPageBoolean: "1",
          pNextPageURL: "./4",
          pPreviousProjectName: "Travel Agency Website",
          pNextProjectName: "Personal branding - Pixelcat",
          pDownload: "0",
          pDownload2: "0",
          pVideo: "1",
        },

        {
          pId: "4",
          pURL: "img/projects-img/pixelcat_1.png",
          pURL1: "img/pixel-cat1.png",
          pURL2: "img/pixel-cat-animated-logo-recording.mp4",
          pName: "Personal branding - Pixelcat",
          pOverlayName: "Personal branding - Pixelcat",
          pAuthor: "Klara S",
          pDate: "12.2023",
          pDesc:
            'Personal branding, an assignment created for the Content Design for New Media course, encompasses elements such as the name "Pixel Cat," logo, typography, and color palette - forming a cohesive and distinctive brand identity. Although Pixel Cat was created for the needs of the course, it is used in my digital activity for example in this portfolio.',

          pProgramming: "0",
          pDesign: "1",
          pTool: "Illustrator, Photoshop, After Effects, Figma",
          pType: "Branding",
          pProgress:
            "Starting creation branding, I chose a color palette and typography, serving as the basis for creating a logo. I used the logo created as an SVG file in After Effects and then I created a few-second animated clip. The next step was to create a total of 2 patterns in 4 variations each and a selection of iconography Then, mock-ups were prepared showing the logo on various items, such as beverage cans and pins. The final touch was to compile all the visual elements into a comprehensive presentation in Figma, doubling up as an informative set of brand guidelines for „Pixel Cat”.",
          pLearned:
            'The assignment was not my first experience with branding. However, I put a lot of effort into this process because I want to use the brand in the future. Central to this process was the design of the logo, a component that is one of the most important things in branding. With time, I recognized the simplification of the logo and contemplated using my real name instead of the pseudonym "Pixel Cat" which could look better than the current design. Another challenge was delving into animation using After Effects, a debut experience requiring time and effort. It took me a while to create the animation, but in the end, I am satisfied with the outcome and glad I could develop my After Effects skills.',
          pLink1Text: "Presentation",
          pLink1:
            "https://www.figma.com/proto/1LvrAc7b8yDqyKbWRh9dsN/Personal-branding?node-id=45-305&scaling=scale-down&mode=design&t=rBLnRPFRtKraBvsz-1",
          pLink2Text: "",
          pLink2: "",
          pPreviousPageBoolean: "1",
          pPreviousPageURL: "3",
          pNextPageBoolean: "1",
          pNextPageURL: "./5",
          pPreviousProjectName: "Portfolio Website",
          pNextProjectName: "App high-fidelity prototype - Empowherment",
          pDownload: "0",
          pDownload2: "0",
          pVideo: "1",
        },
        {
          pId: "5",
          pURL: "img/projects-img/empowherment_1.png",
          pURL1: "img/empowherment1.png",
          pURL2: "img/empowherment-recording.mp4",
          pName: "App high-fidelity prototype - Empowherment",
          pOverlayName: "App high-fidelity prototype - Empowherment",
          pAuthor: "Groupwork",
          pDate: "10.11.2023",
          pDesc:
            'The "Empowherment" is a comprehensive group project developed for BIP (Blended Intensive Programme) Design IT for a Better Program. The group aimed to contribute to Sustainable Development Goal 10: Reduced Inequalities, so we created a high-fidelity prototype of a digital platform for women in the work environment. The project was developed by students from various European universities partially online, most of the work was done during the final boot camp week at the Amsterdam University of Applied Science. ',

          pProgramming: "0",
          pDesign: "1",
          pTool: "Figma, Illustrator, Canva",
          pType: "Hi-fi prototype",
          pProgress:
            "The 'Empowherment' was inspired by the problem of unequal treatment of women in Nike's work environment. To counteract this issue globally, we came up with the idea of creating a forum resembling the functioning of a bit LinkedIn, where women could discuss and help each other with work-related issues. To organize our work and maintain productivity the group split into several subgroups with different tasks. Subgroup dealing with branding prepared between multiple variants of the logo selected typography, and color palette for the brand. These elements seamlessly integrated into the high-fidelity Figma prototype, a central focus during the development phase. Concurrently, a few team members initiated the production of brand merchandise, including stickers, key rings, and bags. The culmination of our efforts resulted in a pitch presentation, briefly outlining the problem, product solution, and brand identity.",
          pLearned:
            "Working online was pretty effective but due to the personal schedules of group members, not everybody could attend online meetings. We significantly boosted efficiency in real life when we were working on campus and we got more instructions and help from the teachers. In just a few days, we successfully tackled the prototype, merchandising, branding, and presentation. During merchandise production, a notable challenge was 3D printing key chains, requiring multiple iterations and adjustments in a 3D object design program to achieve the desired keychain, a process that consumed considerable time. Fortunately, each team member engaged in effort and time to ensure the delivery of a brand and well-prepared project on time.",
          pLink1Text: "Prototype",
          pLink1:
            "https://www.figma.com/proto/yabmvsHCWjDl5K7yRue2Kk/empowHERment?node-id=27-1654&starting-point-node-id=20%3A119",
          pLink2Text: "Presentation",
          pLink2:
            "https://www.canva.com/design/DAFz9YvO6JY/28qE1YJnBR_r8erQkGRQNw/view?utm_content=DAFz9YvO6JY&utm_campaign=designshare&utm_medium=link&utm_source=editor",
          pPreviousPageBoolean: "1",
          pPreviousPageURL: "4",
          pNextPageBoolean: "1",
          pNextPageURL: "./6",
          pPreviousProjectName: "Personal branding - Pixelcat",
          pNextProjectName: "Tokyo Magazine",
          pDownload: "0",
          pDownload2: "0",
          pVideo: "1",
        },
        {
          pId: "6",
          pURL: "img/projects-img/magazine_1.png",
          pURL1: "img/tokyo1.png",
          pURL2: "img/tokyo2.png",
          pName: "Magazine",
          pOverlayName: "Tokyo magazine",
          pAuthor: "Groupwork",
          pDate: "22.05.2023",
          pDesc:
            "Tokyo is a travel magazine developed as the final group project for a Visual Communication course. Comprising 43 pages, it stands as my most complex project created in InDesign. Throughout its creation, our group emphasized an aesthetic and engaging layout, readable text, and captivating photos.",

          pProgramming: "0",
          pDesign: "1",
          pTool: "InDesign, Photoshop",
          pType: "Magazine",
          pProgress:
            "We decided to write about Tokyo because it is an interesting and vibrant metropolis that captivates in terms of nature, culture, food, and entertainment. Additionally, it's easy to find information and royalty-free photos about Tokyo online. Assigning each group member a specific topic, every group member prepared 4-6 spreads, one chapter. Each groupmate had a slightly different design approach, but we aimed for overall cohesion. We had to adjust the spreads, remove and add some to achieve it. We incorporated a table of contents, and numbered pages, created an interactive PDF, and prepared a digital magazine for print to present the physical version to our teacher.",
          pLearned:
            "Creating the layout design without a clear vision initially proved quite challenging, making the process of aligning spreads somewhat cumbersome. Discussions on design often led to group disputes, resolved through compromises. While I may not like some pages, I accepted them to maintain group harmony. Another challenge involved preparing the magazine for printing. Despite efforts to select high-quality photos and use CMYK colors, some PNG images were not properly prepared in Photoshop. As a result, they had a faint background that was visible in the print version. Additionally, a few photos with slightly reduced opacity on a dark background were poorly visible after printing which made them less appealing in my opinion.",
          pLink1Text: "Presentation",
          pLink1:
            "https://www.canva.com/design/DAFf4gTrvqw/0oLFUDhpnXscKhBylkG12g/view?utm_content=DAFf4gTrvqw&utm_campaign=designshare&utm_medium=link&utm_source=editor",
          pLink2Text: "",
          pLink2: "",
          pPreviousPageBoolean: "1",
          pPreviousPageURL: "5",
          pNextPageBoolean: "1",
          pNextPageURL: "./7",
          pPreviousProjectName: "App high-fidelity prototype - Empowherment",
          pNextProjectName: "Brochure Cover for JTH",
          pDownload: "1",
          pDownload2: "0",
          pVideo: "0",
        },
        {
          pId: "7",
          pURL: "img/projects-img/cover_1.png",
          pURL1: "img/projects-img/cover.png",
          pURL2: "",
          pName: "Brochure Cover",
          pOverlayName: "Brochure cover for JTH",
          pAuthor: "Klara S",
          pDate: "24.09.2023",
          pDesc:
            "The brochure cover was created for the competition organized by the university. Graphics entirely made by me except for a few small illustrations.",

          pProgramming: "0",
          pDesign: "1",
          pTool: "Illustrator",
          pType: "Cover",
          pProgress:
            "The cover design process began with a photo of the iconic JTH building, later recreated by me as a sketch in Illustrator. Simultaneously, I crafted illustrations of three students from diverse backgrounds donning the recognizable student boilersuits worn by JTH students at various events. Merging these two graphics and aligning the colors with JU's palette ensued. The final touches involved subtle adjustments to graphics, gradients, and text, resulting in a detailed yet legible design that embodies the distinctive spirit of JTH. The graphics maintain a softened aesthetic for visual appeal.",
          pLearned:
            "This illustration showcases my most advanced work in Illustrator, making the creation process time-consuming as I prioritized attention to details and aesthetics. I also invested additional time experimenting with various concepts, including adding outlines to elements, though not all ideas made it to the final version. In my view, this extra effort was well worth it, as I aimed to create the best possible cover. Mapping the JTH building for perspective and a natural appearance presented a challenge, especially considering it was my first attempt at architectural drawing in Illustrator. Despite the complexity of recreating the building, I dedicated time to refining the details to ensure the final version achieved visual excellence.",
          pLink1Text: "",
          pLink1: "",
          pLink2Text: "",
          pLink2: "",
          pPreviousPageBoolean: "1",
          pPreviousPageURL: "6",
          pNextPageBoolean: "1",
          pNextPageURL: "./8",
          pPreviousProjectName: "Tokyo Magazine",
          pNextProjectName: "Online store prototype - Second Chance",
          pDownload: "0",
          pDownload2: "1",
          pVideo: "0",
        },

        {
          pId: "8",
          pURL: "img/second-chance-website.png",
          pURL1: "img/secondchance1.png",
          pURL2: "img/secondchance-recording-1.mp4",
          pName: "Website Prototype",
          pOverlayName: "Online store prototype - Second Chance",
          pAuthor: "Groupwork",
          pDate: "20.05.2023",
          pDesc:
            "Second Chance is a high-fidelity Figma prototype for a second-hand online store, developed as a group project for a User Experience Design course. Beyond the prototype, the project involved product testing and user interviews, enabling iterative improvements based on valuable user insights.",

          pProgramming: "0",
          pDesign: "1",
          pTool: "Figma",
          pType: "Website prototype",
          pProgress:
            'In the initial project phase, we created a persona, designed a user journey, and identified key features to set our product apart in the market. Based on our UX knowledge, we developed a low-fidelity prototype inspired by successful e-commerce platforms. The subsequent stage focused on incorporating a minimalist, aesthetic design and adding various interactions to the prototype. When the user interface was ready, the platform was tested by several users who had to make a purchase on the website and after that talk about their insights and experiences when using "SecondChance". Feedback from them inspired us to make several iterations to refine the platform, ensuring a more intuitive and improved user experience.',
          pLearned:
            "This project allowed us to apply our UX design knowledge in practical scenarios, emphasizing product development and testing. The first challenge was creating a dropdown menu for page filters in Figma. We learned how to do it from an online tutorial so the feature could be recreated and used multiple times on the website. Another crucial aspect was designing a user-friendly layout to facilitate seamless and efficient purchases. To find a solution for this issue we took inspiration from the popular platforms we enjoy and use.",
          pLink1Text: "Prototype",
          pLink1:
            "https://www.figma.com/proto/4xZOaYSi0egeogcTJaoLZZ/ux?node-id=258-132&starting-point-node-id=258%3A132&mode=design&t=QqnTKIEzbx6idRU4-1",
          pLink2Text: "Presentation",
          pLink2:
            "https://www.canva.com/design/DAFkTImSYHg/1EQ_I2uZj-gqIQTUFoHofA/view?utm_content=DAFkTImSYHg&utm_campaign=designshare&utm_medium=link&utm_source=editor",
          pPreviousPageBoolean: "1",
          pPreviousPageURL: "7",
          pNextPageBoolean: "1",
          pNextPageURL: "/contact",
          pPreviousProjectName: "Brochure cover for JTH",
          pNextProjectName: "Contact",
          pDownload: "0",
          pDownload2: "0",
          pVideo: "1",
        },
      ];

      projects.forEach((oneProject) => {
        db.run(
          "INSERT INTO projects (pID, pURL, pURL1, pURL2, pName, pOverlayName, pAuthor, pDate, pDesc, pProgramming, pDesign, pTool, pType, pProgress, pLearned, pLink1Text, pLink1, pLink2Text, pLink2, pPreviousPageBoolean, pPreviousPageURL, pNextPageBoolean, pNextPageURL, pPreviousProjectName, pNextProjectName, pDownload, pDownload2, pVideo) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",

          [
            oneProject.pId,
            oneProject.pURL,
            oneProject.pURL1,
            oneProject.pURL2,
            oneProject.pName,
            oneProject.pOverlayName,
            oneProject.pAuthor,
            oneProject.pDate,
            oneProject.pDesc,
            oneProject.pProgramming,
            oneProject.pDesign,
            oneProject.pTool,
            oneProject.pType,
            oneProject.pProgress,
            oneProject.pLearned,
            oneProject.pLink1Text,
            oneProject.pLink1,
            oneProject.pLink2Text,
            oneProject.pLink2,
            oneProject.pPreviousPageBoolean,
            oneProject.pPreviousPageURL,
            oneProject.pNextPageBoolean,
            oneProject.pNextPageURL,
            oneProject.pPreviousProjectName,
            oneProject.pNextProjectName,
            oneProject.pDownload,
            oneProject.pDownload2,
            oneProject.pVideo,
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
app.set("view engine", "ejs");

app.use(express.static("public"));
app.use(express.json());

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
      console.log("Database error: ", err);
      res.redirect("/login");
    } else if (!user) {
      // Username not found
      console.log("Username not found");
      res.render("login.handlebars", { notUser: true });
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
          console.log("Incorrect password");
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

app.get("/download-file", (req, res) => {
  res.download("./public/img/Tokyo Magazine.pdf");
});

app.get("/download2-file", (req, res) => {
  res.download("./public/img/COVER2.pdf");
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
  try {
    const model = {
      hasDatabaseError: false,
      theError: "",
      title: "Contact page",
      loggedIn: req.session.loggedIn,
      name: req.session.name,
      isAdmin: req.session.isAdmin,
    };

    res.render("contact.handlebars", model);
  } catch (error) {
    const model = {
      hasDatabaseError: true,
      theError: error,
      title: "Contact page",
      loggedIn: req.session.loggedIn,
      name: req.session.name,
      isAdmin: req.session.isAdmin,
    };

    res.render("contact.handlebars", model);
  }
});

app.post("/contact", (req, res) => {
  console.log(req.body);

  const accessToken = oAuth2Client.getAccessToken();
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      type: "OAuth2",
      user: "babcia.grazynkamsp@gmail.com",

      clientId: CLIENT_ID,
      clientSecret: CLIENT_SECRET,
      refreshToken: REFRESH_TOKEN,
      accessToken: accessToken,
    },
  });

  const mailOptions = {
    from: req.body.formEmail,
    to: "babcia.grazynkamsp@gmail.com",
    subject: `Message from ${req.body.formEmail}: ${req.body.formSubject}`,
    text: req.body.formMessage,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(`Error: ${error}`);
      res.send("Error");
    } else {
      console.log(`Email sent: ${info.response}`);
      res.send("Success");
    }
  });
});

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
