export interface ProjectHighlight {
  title: string;
  subtitle?: string;
  sections?: {
    [key: string]: string; // e.g., "User Pain Point", "The Solution", "Business Impact", "The Challenge", "The Result", etc.
  };
  image?: string;
}

export interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  image: string; // Main image path/URL (used for work page header)
  homepageImage?: string; // Optional image for homepage grid (falls back to image if not provided)
  images?: string[]; // Additional images
  links?: {
    live?: string;
    caseStudy?: string;
    repo?: string;
  };
  featured?: boolean; // For homepage grid
  tags?: string[]; // Project tags
  timeline?: string; // Project timeline
  role?: string; // Role/contribution description
  goals?: string[]; // Project goals
  research?: {
    method?: string;
    oldVersion?: string;
  };
  stats?: string[]; // Project stats/metrics for homepage cards (e.g., "50% improved conversions")
  keyResults?: string[]; // Key results for detail page (separate from homepage stats)
  keyFeatures?: string[]; // Key features broken down into individual items
  storytellingGamification?: { storytelling: string; scaffoldedLearning: string };
  highlights?: ProjectHighlight[]; // Project highlights in the numbered format
}

const projectsRaw: Project[] = [
  {
    id: "caesars-palace-online-casino",
    title: "Caesars Palace Online Casino",
    category: "Product & UX Design",
    description: "Caesars Palace Online Casino is a world-class, endlessly rewarding gaming experience delivered from Las Vegas to wherever you play.",
    image: "/images/portfolio/caesars-palace-online-casino.png",
    tags: ["Casino", "Mobile"],
    links: {
      live: "https://www.caesarspalace.com/",
    },
    timeline: "June 2024 to Sep 2025",
    role: "Worked closely with compliance and cross-functional teams to design and launch multiple high-impact features across sportsbook and casino. Led the creation of the Reward Center, Credit Shop, and loyalty milestone systems, as well as engagement features like Caesars Rewards tier gated leaderboards as well as sponsored leaderboards. All projects were user experience-driven features with thousands of players relying on seamless registration, rewards, and gameplay integrations daily.",
    stats: ["32% improved FTD", "60% reduction in CS tickets"],
    images: [
      "/images/projects/caesars-palace-online-casino/cpo-headerpng.png",
      "/images/projects/caesars-palace-online-casino/image_3png.png",
      "/images/projects/caesars-palace-online-casino/image75png.png",
      "/images/projects/caesars-palace-online-casino/image76png.png",
      "/images/projects/caesars-palace-online-casino/image77png.png",
      "/images/projects/caesars-palace-online-casino/image78png.png",
      "/images/projects/caesars-palace-online-casino/lockpng.png",
    ],
    featured: true,
  },
  {
    id: "icyveins",
    title: "Enthusiast Gaming (Icy Veins)",
    category: "Product & UX Design",
    description: "Icy Veins is an online gaming website that offers guides, resources, and tools for various Blizzard Entertainment titles. It features class guides written by a team of over 100 writers for World of Warcraft, reviewed by experienced players and theorycrafters, as well as guides for Final Fantasy XIV, Diablo IV, Heroes of the Storm, and WoW Classic.",
    image: "/images/portfolio/icyveins.png",
    tags: ["Gaming", "Mobile", "Desktop", "Web App"],
    links: {
      live: "https://www.icy-veins.com/",
    },
    timeline: "Apr 2024 to Sep 2025",
    role: "Product & User Experience Design for the entire brand from product conception to development support across a 20+ projects and a full site overhaul.",
    stats: [
      "Mobile-First Redesign",
      "Performance Refactor",
    ],
    images: [
      "/images/projects/icyveins/icy-veins-headerpng.png",
      "/images/projects/icyveins/iv-websitepng.png",
      "/images/projects/icyveins/citadelpng.png",
      "/images/projects/icyveins/stylespng.png",
      "/images/projects/icyveins/generalpng.png",
      "/images/projects/icyveins/guide-componentspng.png",
      "/images/projects/icyveins/lockpng.png",
    ],
    featured: true,
    keyResults: [
      "Global Audience Scale: Directed all UX and product design initiatives for a platform serving 7 million Monthly Active Users (MAU) across the Blizzard, Square Enix and Holoverse ecosystems.",
      "Expansion of Reach: Engineered the structural architecture for a new News and Editorial ecosystem, enabling the site to expand into new games, which significantly increased organic traffic and brand visibility.",
      "Operational Efficiency: Standardized a visual language for 50+ complex infographics and ability sequences, reducing the production time for guide writers while setting a new industry \"Gold Standard\" for gaming theorycrafting visualization.",
      "Product Innovation: Conceptualized and shipped interactive Gear Builders and Talent Tree tools, simplifying complex in-game mathematics for millions of players and increasing interaction rates on core guide pages.",
    ],
  },
  {
    id: "tabstats-dashboard",
    title: "Stats Dashboard & In-Game Companion App",
    category: "Dashboard & In-Game Companion",
    description: "As the UX & Product Designer at Enthusiast Gaming, I spearheaded the transition of Tabstats from a limited browser-based stat-tracker to a robust, lightweight desktop application and in-game overlay. Designed specifically for the competitive Rainbow Six Siege community, the application delivered real-time cheater detection and deep-dive telemetry to players. This project became a key strategic asset, eventually presented to Enthusiast Gaming executives and launched as a new revenue stream.",
    image: "/images/portfolio/tabstats-header-port.png",
    homepageImage: "/images/portfolio/tabstats-dashboard.png",
    tags: ["Gaming", "Analytics"],
    timeline: "Sept 2022 - Feb 2023",
    role: "Lead product designer focused on enhancing the \"Rainbow Six Siege\" gameplay experience on PC with a secondary focus on consoles.",
    goals: [
      "The need for more in-depth analytics to help improve game to game, including a more detailed breakdown (in and out of game) of damage taken through the rounds",
      "Easier profile searching for quickly checking teammate's ranks/statistics and past game performance",
      "Cheater detection with notifications, this included if a user is currently in a match with a cheater or has previously played with a newly detected cheater",
      "More analytical, quick view in-game scoreboard as a highly detailed and informative replacement without having to use a out of game browser",
    ],
    research: {
      method: "Step one of user research included sifting through a large amount of player feedback from our previous iteration of our overlay that was heavily limited by Overwolf.",
      oldVersion: "/images/projects/tabstats-dashboard/old-version.png",
    },
    images: [
      "/images/projects/tabstats-dashboard/tabstats-r6png.png",
      "/images/projects/tabstats-dashboard/2f7db13c-9291-4567-91b2-906b980104abjpg.jpg",
      "/images/projects/tabstats-dashboard/home-noadspng.png",
      "/images/projects/tabstats-dashboard/favoritespng.png",
      "/images/projects/tabstats-dashboard/matchview-overviewpng.png",
      "/images/projects/tabstats-dashboard/norecentsearchespng.png",
      "/images/projects/tabstats-dashboard/matchview-timelinepng.png",
      "/images/projects/tabstats-dashboard/in-game-advancedscoreboardpng.png",
      "/images/projects/tabstats-dashboard/playernotfoundpng.png",
      "/images/projects/tabstats-dashboard/in-game-playerstatspng.png",
      "/images/projects/tabstats-dashboard/in-game-cheatersdetectedpng.png",
      "/images/projects/tabstats-dashboard/mainmenu-matchmakingpng.png",
      "/images/projects/tabstats-dashboard/profileswitchpng.png",
      "/images/projects/tabstats-dashboard/profileswitch-1png.png",
      "/images/projects/tabstats-dashboard/recentsearchespng.png",
      "/images/projects/tabstats-dashboard/searchresultspng.png",
      "/images/projects/tabstats-dashboard/spectatemode-postroundpng.png",
      "/images/projects/tabstats-dashboard/companionapp-3png.png",
      "/images/projects/tabstats-dashboard/companionapppng.png",
      "/images/projects/tabstats-dashboard/companionapp-1png.png",
      "/images/projects/tabstats-dashboard/companionapp-2png.png",
      "/images/projects/tabstats-dashboard/damagereportpng.png",
      "/images/projects/tabstats-dashboard/generalpng.png",
      "/images/projects/tabstats-dashboard/matchdetailspng.png",
      "/images/projects/tabstats-dashboard/matchviewpng.png",
      "/images/projects/tabstats-dashboard/profilepng.png",
      "/images/projects/tabstats-dashboard/scoreboardpng.png",
      "/images/projects/tabstats-dashboard/searchpng.png",
      "/images/projects/tabstats-dashboard/settingspng.png",
      "/images/projects/tabstats-dashboard/tableitemspng.png",
      "/images/projects/tabstats-dashboard/applicationframepng.png",
    ],
    featured: true,
    stats: [
      "Native Product Launch",
      "Real-Time Analytics",
    ],
    keyResults: [
      "New Revenue Vertical: Successfully presented the prototype to Enthusiast Gaming executives, leading to the product's adoption as a primary revenue driver for the Tabstats brand.",
      "User Growth: Strategic feature placement and improved mobile/desktop accessibility led to a significant increase in daily active users (DAU).",
      "Enhanced Retention: By integrating user feedback directly into the 1.0 release, we created a \"sticky\" ecosystem where players relied on Tabstats for every competitive session.",
    ],
  },
  {
    id: "addicting-games-mobile",
    title: "Addicting Games Mobile App",
    category: "Mobile Application",
    description: "In the current state, the Addicting Games website served as our only limited mobile solution, albeit not providing a native experience. With over 1 million monthly active users, the current mobile solution was not satisfactory and led to a lot of unwanted experiences. The ideal state envisioned a mobile solution that enhances discoverability, ensuring user engagement and fostering a high retention rate. Addicting Games possess a massive library of 1000+ games; however, users encountered difficulty in finding games aligning with their preferences or those similar to their favorites.",
    image: "/images/projects/addicting-games-mobile/ag-project-header.png",
    homepageImage: "/images/projects/addicting-games-mobile/ag-card-cover.png",
    tags: ["Gaming", "App"],
    timeline: "Jul 2023 - Feb 2024",
    role: "Led the full product design of a native mobile application for iOS and Android. Over 35 screens designed with a design system and full documentation.",
    goals: [
      "Discoverability - Create an engaging experience with a large focus on discoverability",
      "Ecosystem & Continuity - Foster an ecosystem between desktop and mobile by including account level XP and challenges",
      "Retention - Keep retention high by creating a system that keeps users engaged and returning to the app",
      "Monetization - Incorporate monetization features such as non-disruptive ad placement and upsells of the paid subscription \"GamePass\"",
    ],
    highlights: [
      {
        title: "Research & Process",
        sections: {
          "The Challenge": "The Addicting Games website served as our only limited mobile solution, not providing a native experience. With over 1 million monthly active users, the current mobile solution was not satisfactory.",
          "The Method": "With the addictinggames.com website having over 1 million monthly active users, there was a large amount of data to access and users to gather data from.",
        },
        image: "/images/projects/addicting-games-mobile/old-version.png",
      },
    ],
    research: {
      method: "With the addictinggames.com website having over 1 million monthly active users, there was a large amount of data to access and users to gather data from. Utilizing data from the website's most used features and player feedback from Discord, Reddit and our team of support/QA employees, there was a large amount of historical data to sift through to help determine the direction of the app. Upon review a subset of selected users were selected from our social communities and 1-on-1 interviews were used to verify previously collected data to help ensure the mobile app met all of the users needs. Findings helped verify a large focus on discoverability was the correct path and social integration would help retain users in the long term.",
      oldVersion: "/images/projects/addicting-games-mobile/old-version.png",
    },
    keyFeatures: [
      "The mobile app concept centers around a functionality reminiscent of TikTok or Youtube shorts \"feeds,\" offering a dynamic and swift approach to maintain high user retention and maximize game discoverability within the extensive AG collection",
      "The key features of the home feed include presenting users with the most popular games upon app launch and subsequently displaying content akin to their previous gameplay on subsequent visits, ideally leveraging tags or similar signals",
      "Users can seamlessly swipe up or down to navigate between games",
      "Upon selecting a game of interest, tapping the play button in the navigation initiates gameplay",
      "Once engaged in a game, users can access additional options by tapping the top-left arrow, enabling actions such as liking, sharing, or exiting the game",
      "The gameplay view is designed to be free of intrusive elements, minimizing the risk of accidental touch-triggered disruptions",
    ],
    keyResults: [
      "Once the app was released revenue generated by Addicting Games increased by 12% month over month and had 16k downloads in its first month",
      "*The company was sold and the app is currently not on the app store as of Apr 20th 2024 due to it not being maintained and the app falling out of the app stores guidelines, this is supposed to be reuploaded later in 2024",
    ],
    images: [
      "/images/projects/addicting-games-mobile/style_ag_app-1png.png",
      "/images/projects/addicting-games-mobile/components_ag_app-1png.png",
      "/images/projects/addicting-games-mobile/mobile_application_map1png.png",
    ],
    featured: false,
  },
  {
    id: "steam-mobile-app-redesign",
    title: "Steam Mobile Redesign Concept",
    category: "Case Study",
    description: "Steam is a video game digital distribution service and storefront by Valve. It was launched as a standalone software client in September 2003 as a way for Valve to provide automatic updates for their games, and expanded to distributing and offering third-party game publishers' titles.",
    image: "/images/portfolio/steam-mobile-app-redesign.jpg",
    tags: ["Concept", "Mobile"],
    timeline: "October 2021 to February 2022",
    role: "Conducting interviews, paper and digital wireframing, low and high-fidelity prototyping, conducting usability studies, accounting for accessibility, and iterating on designs.",
    highlights: [
      {
        title: "Project Goals",
        sections: {
          "The Challenge": "The existing Steam mobile app didn't feel native and had a clunky overall feel, creating a suboptimal user experience for mobile gamers.",
        },
      },
      {
        title: "Research & Process",
        subtitle: "Research & Process",
        sections: {
          "The Method": "With COVID making in-person user interviews near impossible, I had the idea to test the ability to conduct the interviews on my Meta Quest 2. This research was done in a specific way so I suggest checking out my full breakdown on this method on medium. To give a brief synopsis, VRchat was utilized as well as a world called \"No Time Two Talk\" where you're matched with people based on a few checkboxes you selected to mark your interests. The world then matches you with people who chose similar categories. This made finding participants for my study much easier. People were surprisingly open to answering questions and having the ability to not only hear the inflection in their voice but also see their body movements like hand gestures made it much easier to determine how strongly a person felt about a particular question. After two quick pre-qualifier questions, I ended up conducting a total of 30 interviews.",
        },
        image: "/images/projects/steam-mobile-app-redesign/old-version.png",
      },
    ],
    goals: [
      "Doesn't feel native",
      "Clunky feel overall",
    ],
    research: {
      method: "With COVID making in-person user interviews near impossible, I had the idea to test the ability to conduct the interviews on my Meta Quest 2. This research was done in a specific way so I suggest checking out my full breakdown on this method on medium. To give a brief synopsis, VRchat was utilized as well as a world called \"No Time Two Talk\" where you're matched with people based on a few checkboxes you selected to mark your interests. The world then matches you with people who chose similar categories. This made finding participants for my study much easier. People were surprisingly open to answering questions and having the ability to not only hear the inflection in their voice but also see their body movements like hand gestures made it much easier to determine how strongly a person felt about a particular question. After two quick pre-qualifier questions, I ended up conducting a total of 30 interviews.",
      oldVersion: "/images/projects/steam-mobile-app-redesign/old-version.png",
    },
    images: [
      "/images/projects/steam-mobile-app-redesign/steam-headerjpg.jpg",
      "/images/projects/steam-mobile-app-redesign/review-1png.png",
      "/images/projects/steam-mobile-app-redesign/review-6png.png",
      "/images/projects/steam-mobile-app-redesign/review-2png.png",
      "/images/projects/steam-mobile-app-redesign/review-3png.png",
      "/images/projects/steam-mobile-app-redesign/review-4png.png",
      "/images/projects/steam-mobile-app-redesign/review-5jpg.jpg",
      "/images/projects/steam-mobile-app-redesign/quest2lowerpng.png",
      "/images/projects/steam-mobile-app-redesign/meta-chart2jpg.jpg",
      "/images/projects/steam-mobile-app-redesign/meta-chart3jpg.jpg",
      "/images/projects/steam-mobile-app-redesign/iapng.png",
      "/images/projects/steam-mobile-app-redesign/launchpng.png",
      "/images/projects/steam-mobile-app-redesign/chatpng.png",
      "/images/projects/steam-mobile-app-redesign/loginpng.png",
      "/images/projects/steam-mobile-app-redesign/paymentpng.png",
      "/images/projects/steam-mobile-app-redesign/profilepng.png",
      "/images/projects/steam-mobile-app-redesign/gamepagepng.png",
      "/images/projects/steam-mobile-app-redesign/registerpng.png",
      "/images/projects/steam-mobile-app-redesign/steamguardpng.png",
      "/images/projects/steam-mobile-app-redesign/storepng.png",
      "/images/projects/steam-mobile-app-redesign/thankyoupng.png",
      "/images/projects/steam-mobile-app-redesign/wishlistpng.png",
      "/images/projects/steam-mobile-app-redesign/cartpagepng.png",
      "/images/projects/steam-mobile-app-redesign/friendslistpng.png",
      "/images/projects/steam-mobile-app-redesign/librarypng.png",
      "/images/projects/steam-mobile-app-redesign/screens-compare1-1png.png",
      "/images/projects/steam-mobile-app-redesign/screens-compare1png.png",
      "/images/projects/steam-mobile-app-redesign/screens-compare2-2png.png",
      "/images/projects/steam-mobile-app-redesign/screens-compare2png.png",
      "/images/projects/steam-mobile-app-redesign/hi-fi-prototypepng.png",
      "/images/projects/steam-mobile-app-redesign/game-pagepng.png",
      "/images/projects/steam-mobile-app-redesign/friendspng.png",
      "/images/projects/steam-mobile-app-redesign/purchasepng.png",
      "/images/projects/steam-mobile-app-redesign/thank-youpng.png",
      "/images/projects/steam-mobile-app-redesign/thankyoupng.png",
      "/images/projects/steam-mobile-app-redesign/verifypng.png",
    ],
    featured: false,
  },
  {
    id: "overlayed",
    title: "In-Game Overlay & Dashboard",
    category: "In-Game Overlay & Dashboard",
    description: "Passion project built with previous members from the Tabstats team after it was acquired. This product was built from the ground up for the video game \"Escape From Tarkov\" for in and out-of-game use, alleviating redundant tasks and improving overall accessibility for new and veteran players. This project expands upon my work previously done for Tabstats as we were expanding into Tarkov previously. Project details are limited due to the project being potentially integrated with Battleye Anti-Cheat and Battlestate Games.",
    image: "/images/portfolio/overlayed.png",
    tags: ["Streaming", "UI"],
    timeline: "Feb 2023 - Nov 2023",
    role: "Lead product designer focused on enhancing the \"Escape From Tarkov\" gameplay experience.",
    highlights: [
      {
        title: "Project Overview",
        sections: {
          "The Challenge": "Passion project built with previous members from the Tabstats team after it was acquired. This product was built from the ground up for the video game \"Escape From Tarkov\" for in and out-of-game use, alleviating redundant tasks and improving overall accessibility for new and veteran players.",
        },
      },
    ],
    images: [
      "/images/projects/overlayed/escape_from_tarkov_wallpaper_2560jpg.png",
      "/images/projects/overlayed/overlayed_picpng.png",
      "/images/projects/overlayed/notifications-ingame-toprightpng.png",
      "/images/projects/overlayed/homepagepng.png",
      "/images/projects/overlayed/keyspng.png",
      "/images/projects/overlayed/mapspng.png",
      "/images/projects/overlayed/weapontypepng.png",
      "/images/projects/overlayed/taskspng.png",
      "/images/projects/overlayed/insureditemspng.png",
      "/images/projects/overlayed/playerstatspng.png",
      "/images/projects/overlayed/ammocomparisonclosedtabspng.png",
      "/images/projects/overlayed/ammocomparisonopentabspng.png",
      "/images/projects/overlayed/extractspng.png",
      "/images/projects/overlayed/fleamarketpng.png",
      "/images/projects/overlayed/hideoutpng.png",
      "/images/projects/overlayed/hideout-1png.png",
      "/images/projects/overlayed/fleamarket-ingamepng.png",
      "/images/projects/overlayed/companionappelementspng.png",
      "/images/projects/overlayed/generaluseelementspng.png",
      "/images/projects/overlayed/in-gameelementspng.png",
      "/images/projects/overlayed/structureelementspng.png",
      "/images/projects/overlayed/taskelementspng.png",
    ],
    featured: false,
  },
  {
    id: "mathgames",
    title: "Product: Gamified Learning",
    category: "Product: Gamified Learning",
    description: "Teachers and parents have reached out saying their students/children are logging in just to play the games they like with no real direction on the platform. This was further reinforced through research via Google Analytics page session duration, page views and other data. Shortly after data analysis was completed, one on one teacher interviews were conducted to find the correct direction. A clear need for a more guided approach for the platform was the correct approach. Students need to feel self-driven in or out of a classroom setting but have fun doing it with the games they know and love on MathGames.",
    image: "/images/portfolio/mathgames.png",
    tags: ["EdTech", "Web"],
    timeline: "Oct 2023 - Mar 2024",
    role: "Lead product designer for the gamification of student learning for grades K-12",
    goals: [
      "Utilize Current Assets - Leverage the current collection of games that are already on Mathgames in a new and creative way",
      "Guide Students - Create a way to keep students on track and feeling rewarded to keep learning",
      "Timeframe Considerations - Keep overall development and product design time low while adding the most value for a quick launch",
      "Drive Subscriptions - Create incentive for new schools / teachers and parents to sign up for the platform",
      "Storytelling & Gamification - Use storytelling and scaffolded learning strategies to deliver content effectively",
    ],
    storytellingGamification: {
      storytelling: "The brain processes stories more effectively than it does a string of facts. For this reason, storytelling is a fantastic way of delivering new information to students. Gameification greatly benefits from using this strategy, as games can often include elements such as background, characters, plot twists, and more.",
      scaffoldedLearning: "Scaffolding is breaking up the learning into chunks and providing a tool, or structure, with each chunk. By breaking the game boards down into multiple levels of subject matter and difficulty, we can adopt this model into the board to help the student and teacher better pinpoint potential trouble areas they may need further help with.",
    },
    keyFeatures: [
      "Multiple boards will be created by using premade 64px by 64px assets, all placed in a flexible grid system to ease development time and allow the creation of multiple boards to be generated quickly",
      "15 assessment checkpoints will be the default per game board, each grade or standard will have a different set amount and can be manually adjusted by the teacher as well on an individual student level",
      "Each space on the board must be completed before moving forward, this makes it so the student can't jump around to activities they find easy and are more focused on a set path, not only on the map but in the curriculum as well",
      "Board spaces require a certain percentage of correct answers to receive stars and move on to the next section of the map",
      "Student rewards and positive reinforcement will be accomplished by awarding the student with stars from each objective spot that can be spent in the game shop to buy new skins/avatars to be used on the game board",
    ],
    keyResults: [
      "The implementation of this solution showed higher retention of students and an increase of teachers being onboarded throughout multiple school districts in the USA",
    ],
    highlights: [
      {
        title: "Research & Process",
        sections: {
          "The Challenge": "Teachers and parents have reached out saying their students/children are logging in just to play the games they like with no real direction on the platform.",
          "The Method": "A clear need for a more guided approach for the platform was the correct approach. Students need to feel self-driven in or out of a classroom setting but have fun doing it with the games they know and love on MathGames.",
        },
        image: "/images/projects/mathgames/old-version.png",
      },
    ],
    research: {
      method: "A clear need for a more guided approach for the platform was the correct approach. Students need to feel self-driven in or out of a classroom setting but have fun doing it with the games they know and love on MathGames.",
      oldVersion: "/images/projects/mathgames/old-version.png",
    },
    images: [
      "/images/projects/mathgames/math-games_objectspng.png",
      "/images/projects/mathgames/mappng.png",
      "/images/projects/mathgames/gamepng.png",
      "/images/projects/mathgames/shoppng.png",
    ],
    featured: false,
  },
  {
    id: "lcs-web-app-2022",
    title: "LCS Web App",
    category: "Esports",
    description: "",
    image: "/images/portfolio/lcs-web-app-2022.jpg",
    tags: ["League of Legends", "Web"],
    timeline: "2022",
    images: [
      "/images/projects/lcs-web-app-2022/lcsredesignjpg.jpg",
    ],
    featured: false,
  },
  {
    id: "valorant-dashboard",
    title: "Valorant Dashboard Concept",
    category: "Concept",
    description: "",
    image: "/images/portfolio/valorant-dashboard.jpg",
    tags: ["Gaming", "UI"],
    timeline: "2022",
    images: [
      "/images/projects/valorant-dashboard/valorant-dashbaordjpg.jpg",
    ],
    featured: false,
  },
  {
    id: "enthusiast-gaming",
    title: "Ad Graphic Creation",
    category: "Ad Graphics",
    description: "",
    image: "/images/portfolio/enthusiast-gaming.png",
    tags: ["Marketing", "Graphic Design"],
    images: [
      "/images/projects/enthusiast-gaming/tng_playerasset_week8_9x16-arizonapng.png",
      "/images/projects/enthusiast-gaming/tng_teamannouncements__week8_16x9png.png",
      "/images/projects/enthusiast-gaming/tng_teamannouncements_week8_9x16png.png",
      "/images/projects/enthusiast-gaming/tng_week8_lineup_9x16png.png",
      "/images/projects/enthusiast-gaming/tng_week8_lineup_headshots_16x9png.png",
      "/images/projects/enthusiast-gaming/tng-week8-showmatchpng.png",
      "/images/projects/enthusiast-gaming/tng-week8-showmatch_verticalpng.png",
      "/images/projects/enthusiast-gaming/usmc_ads_1000jpg.jpg",
      "/images/projects/enthusiast-gaming/usmc_ads_1064jpg.jpg",
      "/images/projects/enthusiast-gaming/usmc_ads_1070jpg.jpg",
      "/images/projects/enthusiast-gaming/usmc_ads_1100jpg.jpg",
      "/images/projects/enthusiast-gaming/expandedstate_1225x390png.png",
      "/images/projects/enthusiast-gaming/ff_eg_1064jpg.jpg",
      "/images/projects/enthusiast-gaming/ff_eg_1070jpg.jpg",
      "/images/projects/enthusiast-gaming/ff_eg_1200jpg.jpg",
    ],
    featured: false,
  },
  {
    id: "rocket-stream-concept",
    title: "Rocket Stream Dashboard Concept",
    category: "Concept",
    description: "",
    image: "/images/portfolio/rocket-stream-concept.jpg",
    tags: ["Streaming", "UI"],
    timeline: "2022",
    images: [
      "/images/projects/rocket-stream-concept/stream-dashboardjpg.jpg",
      "/images/projects/rocket-stream-concept/stream-learningjpg.jpg",
      "/images/projects/rocket-stream-concept/stream-mobilejpg.jpg",
    ],
    featured: false,
  },
  {
    id: "ableton-learning-platform",
    title: "Ableton Learning Platform Concept",
    category: "Case Study",
    description: "Ableton AG is a German music software company that produces and distributes the production and performance program Ableton Live and a collection of related instruments and sample libraries, as well as their own hardware controller Ableton Push.",
    image: "/images/portfolio/ableton-learning-platform.jpg",
    tags: ["Audio", "Education"],
    timeline: "October 2021 to February 2022",
    highlights: [
      {
        title: "Research & Process",
        sections: {
          "The Method": "Typically among polls and surveys conducted within producer groups, Ableton ends up being the most popular DAW mentioned and voted on.",
        },
        image: "/images/projects/ableton-learning-platform/old-version.png",
      },
    ],
    research: {
      method: "Typically among polls and surveys conducted within producer groups, Ableton ends up being the most popular DAW mentioned and voted on.",
      oldVersion: "/images/projects/ableton-learning-platform/old-version.png",
    },
    images: [
      "/images/projects/ableton-learning-platform/pexels-tstudio-7173392jpg.jpg",
      "/images/projects/ableton-learning-platform/pexels-expect-best-351265jpg.jpg",
      "/images/projects/ableton-learning-platform/abletonlearningpng.png",
      "/images/projects/ableton-learning-platform/wireframepng.png",
      "/images/projects/ableton-learning-platform/pexels-everson-mayer-1481309jpg.jpg",
      "/images/projects/ableton-learning-platform/ableton-mobilespng.png",
      "/images/projects/ableton-learning-platform/producerjpg.jpg",
    ],
    featured: false,
  },
  {
    id: "amazon-luna-concept",
    title: "Amazon Luna Homepage Redesign",
    category: "Concept",
    description: "",
    image: "/images/portfolio/amazon-luna-concept.png",
    tags: ["Cloud Gaming", "UI"],
    timeline: "2022",
    images: [
      "/images/projects/amazon-luna-concept/amazonlunaconceptpcpng.png",
    ],
    featured: false,
  },
  {
    id: "hertz-car-rental",
    title: "Hertz Car Rental - Vehicle Price Comparison",
    category: "Concept",
    description: "",
    image: "/images/portfolio/hertz-car-rental.jpg",
    tags: ["Travel", "UI"],
    role: "The ultimate goal is to lower website bounce rates and increase conversions.",
    highlights: [
      {
        title: "Project Goals",
        sections: {
          "The Goal": "The ultimate goal is to lower website bounce rates and increase conversions.",
          "The Process": "Map out the current online rental process and identify potential drop-off areas. Produce lo-fi design wireframes while incorporating the optimizations found during the research phase. Utilize lo-fi wireframes as talking points for user interviews. Produce hi-fi design mockups to allow the highest level of visual prototyping and production.",
        },
      },
    ],
    goals: [
      "The ultimate goal is to lower website bounce rates and increase conversions.",
      "Map out the current online rental process and identify potential drop-off areas.",
      "Produce lo-fi design wireframes while incorporating the optimizations found during the research phase. Utilize lo-fi wireframes as talking points for user interviews.",
      "Produce hi-fi design mockups to allow the highest level of visual prototyping and production.",
    ],
    research: {
      method: "Produce hi-fi design mockups to allow the highest level of visual prototyping and production.",
    },
    images: [
      "/images/projects/hertz-car-rental/jake-blucker-tmzcrbkm99y-unsplash1jpg.jpg",
      "/images/projects/hertz-car-rental/high-fivehiclechoicepng.png",
      "/images/projects/hertz-car-rental/hertzflowchartpng.png",
      "/images/projects/hertz-car-rental/low-fivehiclechoicepng.png",
    ],
    featured: false,
  },
  {
    id: "chat-application",
    title: "Chat Application",
    category: "Concept",
    description: "",
    image: "/images/portfolio/chat-application.png",
    tags: ["Social", "UI"],
    timeline: "2022",
    images: [
      "/images/projects/chat-application/chat-conceptpng.png",
    ],
    featured: false,
  },
  {
    id: "paypal-redesign",
    title: "Paypal Redesign Concept",
    category: "Concept",
    description: "",
    image: "/images/portfolio/paypal-redesign.jpg",
    tags: ["Fintech", "Dark Mode"],
    timeline: "2022",
    images: [
      "/images/projects/paypal-redesign/paypal-darkljpg.jpg",
      "/images/projects/paypal-redesign/paypal-lightjpg.jpg",
    ],
    featured: false,
  },
  {
    id: "nft-concept-site",
    title: "NFT Concept Site",
    category: "Concept",
    description: "",
    image: "/images/portfolio/nft-concept-site.jpg",
    tags: ["Web3", "UI"],
    timeline: "2022",
    images: [
      "/images/projects/nft-concept-site/nftconceptpcpng.png",
    ],
    featured: false,
  },
  {
    id: "cloud-mining-concept",
    title: "Cloud Mining Concept",
    category: "Concept",
    description: "",
    image: "/images/portfolio/cloud-mining-concept.png",
    tags: ["Crypto", "UI"],
    timeline: "2022",
    images: [
      "/images/projects/cloud-mining-concept/cloudminingconceptpcpng.png",
    ],
    featured: false,
  },
];

// Helper function to extract the latest year from a timeline string
function getLatestYear(timeline?: string): number {
  if (!timeline) return 0;
  const years = timeline.match(/\b(20\d{2})\b/g);
  if (!years || years.length === 0) return 0;
  return Math.max(...years.map((y) => parseInt(y)));
}

// Sort projects by date (most recent first)
const projects = [...projectsRaw].sort((a, b) => {
  // Fixed order: caesars-palace-online-casino first, icyveins second, tabstats-dashboard third
  if (a.id === "caesars-palace-online-casino") return -1;
  if (b.id === "caesars-palace-online-casino") return 1;
  if (a.id === "icyveins") return -1;
  if (b.id === "icyveins") return 1;
  if (a.id === "tabstats-dashboard") {
    // Check if b is caesars or icyveins (should be handled above, but double check)
    if (b.id === "caesars-palace-online-casino" || b.id === "icyveins") return 1;
    return -1; // tabstats-dashboard should be third, so it comes before all others
  }
  if (b.id === "tabstats-dashboard") {
    // Check if a is caesars or icyveins (should be handled above, but double check)
    if (a.id === "caesars-palace-online-casino" || a.id === "icyveins") return -1;
    return 1; // tabstats-dashboard should be third, so others come after it
  }
  
  // For all other projects, sort by date
  const yearA = getLatestYear(a.timeline);
  const yearB = getLatestYear(b.timeline);
  if (yearB !== yearA) return yearB - yearA; // Descending by year
  
  // If same year, projects without timeline go to the end
  if (yearA === 0) return 1;
  if (yearB === 0) return -1;
  
  // For same year, maintain relative order (can be improved with month parsing)
  return 0;
});

export const categories = Array.from(
  new Set(projects.map((project) => project.category))
);

// Export sorted projects
export { projects };
