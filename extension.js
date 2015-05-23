(function() {
    //Link location of your fork so you don't have to modify so many things.
    var fork = "iEclipse";
    //Define our function responsible for extending the bot.
    function extend() {
            //If the bot hasn't been loaded properly, try again in 1 second(s).
            if (!window.bot) {
                return setTimeout(extend, 1 * 1000);
            }
            //Precaution to make sure it is assigned properly.
            var bot = window.bot;
            //Load custom settings set below
            bot.retrieveSettings();
            //Load the chat package again to account for any changes
            bot.loadChat();
        }
        //Change the bots default settings and make sure they are loaded on launch
    localStorage.setItem("basicBotsettings", JSON.stringify({
        botName: "RoyalsBot",
        language: "english",
        startupCap: 50, // 1-200
        startupVolume: 50, // 0-100
        startupEmoji: false, // true or false
        cmdDeletion: true,
        chatLink: "https://rawgit.com/iEclipse/basicBot-customization/master/en.json",
        maximumAfk: 120,
        afkRemoval: false,
        maximumDc: 60,
        bouncerPlus: false,
        blacklistEnabled: true,
        lockdownEnabled: false,
        lockGuard: false,
        maximumLocktime: 10,
        cycleGuard: false,
        maximumCycletime: 10,
        voteSkip: true,
        voteSkipLimit: 6,
        timeGuard: true,
        maximumSongLength: 7,
        autodisable: false,
        commandCooldown: 30,
        usercommandsEnabled: false,
        lockskipPosition: 3,
        lockskipReasons: [
            ["theme",
                "This song does not fit the room theme. "
            ],
            ["op", "This song is on the OP list. "],
            ["history", "This song is in the history. "],
            ["mix",
                "You played a mix, which is against the rules. "
            ],
            ["sound",
                "The song you played had bad sound quality or no sound. "
            ],
            ["nsfw",
                "The song you contained was NSFW (image or sound). "
            ],
            ["unavailable",
                "The song you played was not available for some users. "
            ]
        ],
        afkpositionCheck: 15,
        afkRankCheck: "ambassador",
        motdEnabled: false,
        motdInterval: 3,
        motd: "I'm afk right now! PM me on the Maple Royals forum if you need anything.",
        filterChat: true,
        etaRestriction: false,
        welcome: true,
        opLink: null,
        rulesLink: null,
        themeLink: null,
        fbLink: null,
        youtubeLink: null,
        website: null,
        intervalMessages: [],
        messageInterval: 5,
        songstats: false,
        commandLiteral: "!",
        blacklists: {
            NSFW: "https://rawgit.com/" + fork +
                "/basicBot-customization/master/blacklists/ExampleNSFWlist.json",
            OP: "https://rawgit.com/" + fork +
                "/basicBot-customization/master/blacklists/ExampleOPlist.json"
        }
    }));
    //Start the bot and extend it when it has loaded.
    $.getScript("https://rawgit.com/iEclipse/basicBot-customization/master/basicBot.js",
        extend);
}).call(this);
