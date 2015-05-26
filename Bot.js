(function() {
    API.getWaitListPosition = function(id) {
        if (typeof id === 'undefined' || id === null) {
            id = API.getUser().id;
        }
        var wl = API.getWaitList();
        for (var i = 0; i < wl.length; i++) {
            if (wl[i].id === id) {
                return i;
            }
        }
        return -1;
    };
    var kill = function() {
        clearInterval(bot.room.afkInterval);
        bot.status = false;
    };
    var storeToStorage = function() {
        localStorage.setItem("botsettings", JSON.stringify(bot.settings));
        localStorage.setItem("botRoom", JSON.stringify(bot.room));
        var botStorageInfo = {
            time: Date.now(),
            stored: true,
            version: bot.version
        };
        localStorage.setItem("botStorageInfo", JSON.stringify(botStorageInfo));
    };
    var subChat = function(chat, obj) {
        if (typeof chat === "undefined") {
            API.chatLog("There is a chat text missing.");
            console.log("There is a chat text missing.");
            return "[Error] No text message found.";
        }
        var lit = '%%';
        for (var prop in obj) {
            chat = chat.replace(lit + prop.toUpperCase() + lit, obj[prop]);
        }
        return chat;
    };
    var loadChat = function(cb) {
        if (!cb) cb = function() {};
        $.get("https://rawgit.com/iEclipse/Settings/master/langIndex.json", function(json) {
            var link = bot.chatLink;
            if (json !== null && typeof json !== "undefined") {
                langIndex = json;
                link = langIndex[bot.settings.language.toLowerCase()];
                if (bot.settings.chatLink !== bot.chatLink) {
                    link = bot.settings.chatLink;
                } else {
                    if (typeof link === "undefined") {
                        link = bot.chatLink;
                    }
                }
                $.get(link, function(json) {
                    if (json !== null && typeof json !== "undefined") {
                        if (typeof json === "string") json = JSON.parse(json);
                        bot.chat = json;
                        cb();
                    }
                });
            } else {
                $.get(bot.chatLink, function(json) {
                    if (json !== null && typeof json !== "undefined") {
                        if (typeof json === "string") json = JSON.parse(json);
                        bot.chat = json;
                        cb();
                    }
                });
            }
        });
    };
    var retrieveSettings = function() {
        var settings = JSON.parse(localStorage.getItem("botsettings"));
        if (settings !== null) {
            for (var prop in settings) {
                bot.settings[prop] = settings[prop];
            }
        }
    };
    var retrieveFromStorage = function() {
        var info = localStorage.getItem("botStorageInfo");
        if (info === null) API.chatLog(bot.chat.nodatafound);
        else {
            var settings = JSON.parse(localStorage.getItem("botsettings"));
            var room = JSON.parse(localStorage.getItem("botRoom"));
            var elapsed = Date.now() - JSON.parse(info).time;
            if ((elapsed < 1 * 60 * 60 * 1000)) {
                API.chatLog(bot.chat.retrievingdata);
                for (var prop in settings) {
                    bot.settings[prop] = settings[prop];
                }
                bot.room.users = room.users;
                bot.room.afkList = room.afkList;
                bot.room.historyList = room.historyList;
                bot.room.mutedUsers = room.mutedUsers;
                bot.room.autoskip = room.autoskip;
                bot.room.roomstats = room.roomstats;
                bot.room.messages = room.messages;
                bot.room.queue = room.queue;
                API.chatLog(bot.chat.datarestored);
            }
        }
        var json_sett = null;
        var roominfo = document.getElementById("room-settings");
        info = roominfo.textContent;
        var ref_bot = "@bot=";
        var ind_ref = info.indexOf(ref_bot);
        if (ind_ref > 0) {
            var link = info.substring(ind_ref + ref_bot.length, info.length);
            var ind_space = null;
            if (link.indexOf(" ") < link.indexOf("\n")) ind_space = link.indexOf(" ");
            else ind_space = link.indexOf("\n");
            link = link.substring(0, ind_space);
            $.get(link, function(json) {
                if (json !== null && typeof json !== "undefined") {
                    json_sett = JSON.parse(json);
                    for (var prop in json_sett) {
                        bot.settings[prop] = json_sett[prop];
                    }
                }
            });
        }
    };
    String.prototype.splitBetween = function(a, b) {
        var self = this;
        self = this.split(a);
        for (var i = 0; i < self.length; i++) {
            self[i] = self[i].split(b);
        }
        var arr = [];
        for (var k = 0; k < self.length; k++) {
            if (Array.isArray(self[k])) {
                for (var j = 0; j < self[k].length; j++) {
                    arr.push(self[k][j]);
                }
            } else arr.push(self[k]);
        }
        return arr;
    };
    var linkFixer = function(msg) {
        var parts = msg.splitBetween('<a href="', '<\/a>');
        for (var i = 1; i < parts.length; i = i + 2) {
            var link = parts[i].split('"')[0];
            parts[i] = link;
        }
        var m = '';
        for (var j = 0; j < parts.length; j++) {
            m += parts[j];
        }
        return m;
    };
    var bot = {
        version: "2.4.5",
        status: false,
        name: "NikkiBot",
        loggedInID: null,
        scriptLink: "https://rawgit.com/iEclipse/Settings/master/Bot.js",
        cmdLink: "https://github.com/iEclipse/Settings/blob/master/README.md#nikkibot-commands",
        chatLink: "https://rawgit.com/iEclipse/Settings/master/en.json",
        chat: null,
        loadChat: loadChat,
        retrieveSettings: retrieveSettings,
        retrieveFromStorage: retrieveFromStorage,
        settings: {
            botName: "NikkiBot",
            language: "english",
            startupCap: 30, // 1-200
            startupVolume: 50, // 0-100
            startupEmoji: false,
            cmdDeletion: true,
            chatLink: "https://rawgit.com/iEclipse/Settings/master/en.json",
            website: "http://mapleroyals.com/?page=index",
            facebook: "https://www.facebook.com/MapleRoyals?fref=ts",
            hp: 50,
            maximumAfk: 120,
            afkRemoval: false,
            maximumDc: 60,
            spam: false,
            heal: null,
            fighter1: null,
            fighter2: null,
            timeout: null,
            challenge: false,
            shell: true,
            target: null,
            lockdownEnabled: false,
            lockGuard: false,
            cycleGuard: false,
            voteSkip: true,
            voteSkipLimit: 6,
            timeGuard: true,
            maximumSongLength: 7,
            commandCooldown: 1,
            usercommandsEnabled: true,
            lockskipPosition: 1,
            afkpositionCheck: 1,
            msgEnabled: true,
            msgInterval: 3,
            messageInterval: 3,
            msg: "Type !help for a list of commands.",
            intervalMessages: [],
            filterChat: true,
            etaRestriction: false,
            welcome: true,
            songstats: false,
            commandLiteral: "!",
        },
        room: {
            users: [],
            afkList: [],
            mutedUsers: [],
            bannedUsers: [],
            skippable: true,
            usercommand: true,
            allcommand: true,
            afkInterval: null,
            autoskip: false,
            autoskipTimer: null,
            queueing: 0,
            queueable: true,
            currentDJID: null,
            historyList: [],
            cycleTimer: setTimeout(function() {}, 1),
            roomstats: {
                accountName: null,
                totalWoots: 0,
                totalCurates: 0,
                totalMehs: 0,
                launchTime: null,
                songCount: 0,
                chatmessages: 0
            },
            messages: {
                from: [],
                to: [],
                message: []
            },
            queue: {
                id: [],
                position: []
            },
            roulette: {
                rouletteStatus: false,
                participants: [],
                countdown: null,
                startRoulette: function() {
                    bot.room.roulette.rouletteStatus = true;
                    API.sendChat(bot.chat.isopen);
                    setTimeout(function() {
                        API.sendChat(subChat(bot.chat.ishalfway))
                    }, 5 * 1000);
                    setTimeout(function() {
                        API.sendChat(subChat(bot.chat.isnearend))
                    }, 10 * 1000);
                    bot.room.roulette.countdown = setTimeout(function() {
                        bot.room.roulette.endRoulette();
                    }, 20 * 1000);
                },
                endRoulette: function() {
                    bot.room.roulette.rouletteStatus = false;
                    var ind = Math.floor(Math.random() * bot.room.roulette.participants.length);
                    var winner = bot.room.roulette.participants[ind];
                    bot.room.roulette.participants = [];
                    var pos = Math.floor((Math.random() * API.getWaitList()
                        .length) + 1);
                    var user = bot.userUtilities.lookupUser(winner);
                    var name = user.username;
                    API.sendChat(subChat(bot.chat.winnerpicked, {
                        name: name,
                        position: pos
                    }));
                    if (API.getDJ() !== undefined && winner === API.getDJ().id) API.sendChat(subChat(bot.chat.winnerdj));
                    else{
                        setTimeout(function() {
                        if (API.getWaitListPosition(winner) === -1) API.moderateAddDJ(winner.toString())
                        bot.userUtilities.moveUser(winner, pos, false);
                        }, 2000);
                    }
                }
            }
        },
        User: function(id, name) {
            this.id = id;
            this.username = name;
            this.jointime = Date.now();
            this.lastActivity = Date.now();
            this.votes = {
                woot: 0,
                meh: 0,
                curate: 0
            };
            this.lastEta = null;
            this.afkWarningCount = 0;
            this.afkCountdown = null;
            this.inRoom = true;
            this.isMuted = false;
            this.lastDC = {
                time: null,
                position: null,
                songCount: 0
            };
            this.lastKnownPosition = null;
        },
        userUtilities: {
            getJointime: function(user) {
                return user.jointime;
            },
            getUser: function(user) {
                return API.getUser(user.id);
            },
            updatePosition: function(user, newPos) {
                user.lastKnownPosition = newPos;
            },
            updateDC: function(user) {
                user.lastDC.time = Date.now();
                user.lastDC.position = user.lastKnownPosition;
                user.lastDC.songCount = bot.room.roomstats.songCount;
            },
            setLastActivity: function(user) {
                user.lastActivity = Date.now();
                user.afkWarningCount = 0;
                clearTimeout(user.afkCountdown);
            },
            getLastActivity: function(user) {
                return user.lastActivity;
            },
            getWarningCount: function(user) {
                return user.afkWarningCount;
            },
            setWarningCount: function(user, value) {
                user.afkWarningCount = value;
            },
            lookupUser: function(id) {
                for (var i = 0; i < bot.room.users.length; i++) {
                    if (bot.room.users[i].id === id) {
                        return bot.room.users[i];
                    }
                }
                return false;
            },
            lookupUserName: function(name) {
                for (var i = 0; i < bot.room.users.length; i++) {
                    var match = bot.room.users[i].username.trim() === name.trim();
                    if (match) {
                        return bot.room.users[i];
                    }
                }
                return false;
            },
            voteRatio: function(id) {
                var user = bot.userUtilities.lookupUser(id);
                var votes = user.votes;
                if (votes.meh === 0) votes.ratio = 1;
                else votes.ratio = (votes.woot / votes.meh).toFixed(2);
                return votes;
            },
            getPermission: function(obj) { //1 requests
                var u;
                if (typeof obj === "object") u = obj;
                else u = API.getUser(obj);
                if (u.gRole < 2) return u.role;
                else {
                    switch (u.gRole) {
                        case 2:
                            return 7;
                        case 3:
                            return 8;
                        case 4:
                            return 9;
                        case 5:
                            return 10;
                    }
                }
                return 0;
            },
            moveUser: function(id, pos, priority) {
                var user = bot.userUtilities.lookupUser(id);
                var wlist = API.getWaitList();
                if (API.getWaitListPosition(id) === -1) {
                    if (wlist.length < 50) {
                        API.moderateAddDJ(id);
                        if (pos !== 0) API.moderateMoveDJ(id, pos);
                    } else {
                        var alreadyQueued = -1;
                        for (var i = 0; i < bot.room.queue.id.length; i++) {
                            if (bot.room.queue.id[i] === id) alreadyQueued = i;
                        }
                        if (alreadyQueued !== -1) {
                            bot.room.queue.position[alreadyQueued] = pos;
                            return API.sendChat(subChat(bot.chat.alreadyadding, {
                                position: bot.room.queue.position[alreadyQueued]
                            }));
                        }
                        bot.roomUtilities.booth.lockBooth();
                        if (priority) {
                            bot.room.queue.id.unshift(id);
                            bot.room.queue.position.unshift(pos);
                        } else {
                            bot.room.queue.id.push(id);
                            bot.room.queue.position.push(pos);
                        }
                        var name = user.username;
                        return API.sendChat(subChat(bot.chat.adding, {
                            name: name,
                            position: bot.room.queue.position.length
                        }));
                    }
                } else API.moderateMoveDJ(id, pos);
            },
            dclookup: function(id) {
                var user = bot.userUtilities.lookupUser(id);
                if (typeof user === 'boolean') return bot.chat.usernotfound;
                var name = user.username;
                if (user.lastDC.time === null) return subChat(bot.chat.notdisconnected, {
                    name: name
                });
                var dc = user.lastDC.time;
                var pos = user.lastDC.position;
                if (pos === null) return bot.chat.noposition;
                var timeDc = Date.now() - dc;
                var validDC = false;
                if (bot.settings.maximumDc * 60 * 1000 > timeDc) {
                    validDC = true;
                }
                var time = bot.roomUtilities.msToStr(timeDc);
                if (!validDC) return (subChat(bot.chat.toolongago, {
                    name: bot.userUtilities.getUser(user).username,
                    time: time
                }));
                var songsPassed = bot.room.roomstats.songCount - user.lastDC.songCount;
                var afksRemoved = 0;
                var afkList = bot.room.afkList;
                for (var i = 0; i < afkList.length; i++) {
                    var timeAfk = afkList[i][1];
                    var posAfk = afkList[i][2];
                    if (dc < timeAfk && posAfk < pos) {
                        afksRemoved++;
                    }
                }
                var newPosition = user.lastDC.position - songsPassed - afksRemoved;
                if (newPosition <= 0) newPosition = 1;
                var msg = subChat(bot.chat.valid, {
                    name: bot.userUtilities.getUser(user).username,
                    time: time,
                    position: newPosition
                });
                bot.userUtilities.moveUser(user.id, newPosition, true);
                return msg;
            }
        },
        roomUtilities: {
            rankToNumber: function(rankString) {
                var rankInt = null;
                switch (rankString) {
                    case "admin":
                        rankInt = 10;
                        break;
                    case "ambassador":
                        rankInt = 7;
                        break;
                    case "host":
                        rankInt = 5;
                        break;
                    case "cohost":
                        rankInt = 4;
                        break;
                    case "manager":
                        rankInt = 3;
                        break;
                    case "bouncer":
                        rankInt = 2;
                        break;
                    case "residentdj":
                        rankInt = 1;
                        break;
                    case "user":
                        rankInt = 0;
                        break;
                }
                return rankInt;
            },
            msToStr: function(msTime) {
                var ms, msg, timeAway;
                msg = '';
                timeAway = {
                    'days': 0,
                    'hours': 0,
                    'minutes': 0,
                    'seconds': 0
                };
                ms = {
                    'day': 24 * 60 * 60 * 1000,
                    'hour': 60 * 60 * 1000,
                    'minute': 60 * 1000,
                    'second': 1000
                };
                if (msTime > ms.day) {
                    timeAway.days = Math.floor(msTime / ms.day);
                    msTime = msTime % ms.day;
                }
                if (msTime > ms.hour) {
                    timeAway.hours = Math.floor(msTime / ms.hour);
                    msTime = msTime % ms.hour;
                }
                if (msTime > ms.minute) {
                    timeAway.minutes = Math.floor(msTime / ms.minute);
                    msTime = msTime % ms.minute;
                }
                if (msTime > ms.second) {
                    timeAway.seconds = Math.floor(msTime / ms.second);
                }
                if (timeAway.days !== 0) {
                    msg += timeAway.days.toString() + 'd';
                }
                if (timeAway.hours !== 0) {
                    msg += timeAway.hours.toString() + 'h';
                }
                if (timeAway.minutes !== 0) {
                    msg += timeAway.minutes.toString() + 'm';
                }
                if (timeAway.minutes < 1 && timeAway.hours < 1 && timeAway.days < 1) {
                    msg += timeAway.seconds.toString() + 's';
                }
                if (msg !== '') {
                    return msg;
                } else {
                    return false;
                }
            },
            booth: {
                locked: false,
                lockBooth: function() {
                    API.moderateLockWaitList(!bot.roomUtilities.booth.locked);
                    bot.roomUtilities.booth.locked = false;
                    if (bot.settings.lockGuard) {
                        bot.roomUtilities.booth.lockTimer = API.moderateLockWaitList(bot.roomUtilities.booth.locked);
                    }
                },
                unlockBooth: function() {
                    API.moderateLockWaitList(bot.roomUtilities.booth.locked);
                    clearTimeout(bot.roomUtilities.booth.lockTimer);
                }
            },
            afkCheck: function() {
                if (!bot.status || !bot.settings.afkRemoval) return void(0);
                var rank = bot.roomUtilities.rankToNumber(bot.settings.afkRankCheck);
                var djlist = API.getWaitList();
                var lastPos = Math.min(djlist.length, bot.settings.afkpositionCheck);
                if (lastPos - 1 > djlist.length) return void(0);
                for (var i = 0; i < lastPos; i++) {
                    if (typeof djlist[i] !== 'undefined') {
                        var id = djlist[i].id;
                        var user = bot.userUtilities.lookupUser(id);
                        if (typeof user !== 'boolean') {
                            var plugUser = bot.userUtilities.getUser(user);
                            if (rank !== null && bot.userUtilities.getPermission(plugUser) <= rank) {
                                var name = plugUser.username;
                                var lastActive = bot.userUtilities.getLastActivity(user);
                                var inactivity = Date.now() - lastActive;
                                var time = bot.roomUtilities.msToStr(inactivity);
                                var warncount = user.afkWarningCount;
                                if (inactivity > bot.settings.maximumAfk * 60 * 1000) {
                                    if (warncount === 0) {
                                        API.sendChat(subChat(bot.chat.warning1, {
                                            name: name,
                                            time: time
                                        }));
                                        user.afkWarningCount = 3;
                                        user.afkCountdown = setTimeout(function(userToChange) {
                                            userToChange.afkWarningCount = 1;
                                        }, 90 * 1000, user);
                                    } else if (warncount === 1) {
                                        API.sendChat(subChat(bot.chat.warning2, {
                                            name: name
                                        }));
                                        user.afkWarningCount = 3;
                                        user.afkCountdown = setTimeout(function(userToChange) {
                                            userToChange.afkWarningCount = 2;
                                        }, 30 * 1000, user);
                                    } else if (warncount === 2) {
                                        var pos = API.getWaitListPosition(id);
                                        if (pos !== -1) {
                                            pos++;
                                            bot.room.afkList.push([id, Date.now(), pos]);
                                            user.lastDC = {
                                                time: null,
                                                position: null,
                                                songCount: 0
                                            };
                                            API.moderateRemoveDJ(id);
                                            API.sendChat(subChat(bot.chat.afkremove, {
                                                name: name,
                                                time: time,
                                                position: pos,
                                                maximumafk: bot.settings.maximumAfk
                                            }));
                                        }
                                        user.afkWarningCount = 0;
                                    }
                                }
                            }
                        }
                    }
                }
            },
            changeDJCycle: function() {
                var toggle = $(".cycle-toggle");
                if (toggle.hasClass("disabled")) {
                    toggle.click();
                    if (bot.settings.cycleGuard) {
                        bot.room.cycleTimer = setTimeout(function() {
                            if (toggle.hasClass("enabled")) toggle.click();
                        }, bot.settings.cycleMaxTime * 60 * 1000);
                    }
                } else {
                    toggle.click();
                    clearTimeout(bot.room.cycleTimer);
                }
            },
            intervalMessage: function() {
                var interval;
                if (bot.settings.msgEnabled) interval = bot.settings.msgInterval;
                else interval = bot.settings.messageInterval;
                if ((bot.room.roomstats.songCount % interval) === 0 && bot.status) {
                    var msg;
                    if (bot.settings.msgEnabled) {
                        msg = bot.settings.msg;
                    } else {
                        if (bot.settings.intervalMessages.length === 0) return void(0);
                        var messageNumber = bot.room.roomstats.songCount % bot.settings.intervalMessages.length;
                        msg = bot.settings.intervalMessages[messageNumber];
                    }
                    API.sendChat('/me NikkiBot: ' + msg);
                }
            }
        },
        eventChat: function(chat) {
            chat.message = linkFixer(chat.message);
            chat.message = chat.message.trim();
            for (var i = 0; i < bot.room.users.length; i++) {
                if (bot.room.users[i].id === chat.uid) {
                    bot.userUtilities.setLastActivity(bot.room.users[i]);
                    if (bot.room.users[i].username !== chat.un) {
                        bot.room.users[i].username = chat.un;
                    }
                }
            }
            if (bot.chatUtilities.chatFilter(chat)) return void(0);
            if (!bot.chatUtilities.commandCheck(chat)) bot.chatUtilities.action(chat);
        },
        eventUserjoin: function(user) {
            var known = false;
            var index = null;
            for (var i = 0; i < bot.room.users.length; i++) {
                if (bot.room.users[i].id === user.id) {
                    known = true;
                    index = i;
                }
            }
            var greet = true;
            var welcomeback = null;
            if (known) {
                bot.room.users[index].inRoom = true;
                var u = bot.userUtilities.lookupUser(user.id);
                var jt = u.jointime;
                var t = Date.now() - jt;
                if (t < 10 * 1000) greet = false;
                else welcomeback = true;
            } else {
                bot.room.users.push(new bot.User(user.id, user.username));
                welcomeback = false;
            }
            for (var j = 0; j < bot.room.users.length; j++) {
                if (bot.userUtilities.getUser(bot.room.users[j]).id === user.id) {
                    bot.userUtilities.setLastActivity(bot.room.users[j]);
                    bot.room.users[j].jointime = Date.now();
                }
            }
            if (bot.settings.welcome && greet) {
                welcomeback ? setTimeout(function(user) {
                    API.sendChat(subChat(bot.chat.welcomeback, {
                        name: user.username
                    }));
                }, 1 * 1000, user) : setTimeout(function(user) {
                    API.sendChat(subChat(bot.chat.welcome, {
                        name: user.username
                    }));
                }, 1 * 1000, user);
            }
        },
        eventUserleave: function(user) {
            for (var i = 0; i < bot.room.users.length; i++) {
                if (bot.room.users[i].id === user.id) {
                    bot.userUtilities.updateDC(bot.room.users[i]);
                    bot.room.users[i].inRoom = false;
                }
            }
        },
        eventVoteupdate: function(obj) {
            for (var i = 0; i < bot.room.users.length; i++) {
                if (bot.room.users[i].id === obj.user.id) {
                    if (obj.vote === 1) {
                        bot.room.users[i].votes.woot++;
                    } else {
                        bot.room.users[i].votes.meh++;
                    }
                }
            }
            var mehs = API.getScore().negative;
            var woots = API.getScore().positive;
            var dj = API.getDJ();
            if (bot.settings.voteSkip) {
                if ((mehs - woots) >= (bot.settings.voteSkipLimit)) {
                    API.sendChat(subChat(bot.chat.voteskipexceededlimit, {
                        name: dj.username,
                        limit: bot.settings.voteSkipLimit
                    }));
                    API.moderateForceSkip();
                }
            }
        },
        eventCurateupdate: function(obj) {
            for (var i = 0; i < bot.room.users.length; i++) {
                if (bot.room.users[i].id === obj.user.id) {
                    bot.room.users[i].votes.curate++;
                }
            }
        },
        eventDjadvance: function(obj) {
            $("#woot").click(); // autowoot
            var user = bot.userUtilities.lookupUser(obj.dj.id)
            for (var i = 0; i < bot.room.users.length; i++) {
                if (bot.room.users[i].id === user.id) {
                    bot.room.users[i].lastDC = {
                        time: null,
                        position: null,
                        songCount: 0
                    };
                }
            }
            var lastplay = obj.lastPlay;
            if (typeof lastplay === 'undefined') return;
            if (bot.settings.songstats) {
                if (typeof bot.chat.songstatistics === "undefined") {
                    API.sendChat("/me " + lastplay.media.author + " - " + lastplay.media.title + ": " + lastplay.score.positive + "W/" + lastplay.score.grabs + "G/" + lastplay.score.negative +
                        "M.")
                } else {
                    API.sendChat(subChat(bot.chat.songstatistics, {
                        artist: lastplay.media.author,
                        title: lastplay.media.title,
                        woots: lastplay.score.positive,
                        grabs: lastplay.score.grabs,
                        mehs: lastplay.score.negative
                    }))
                }
            }
            bot.room.roomstats.totalWoots += lastplay.score.positive;
            bot.room.roomstats.totalMehs += lastplay.score.negative;
            bot.room.roomstats.totalCurates += lastplay.score.grabs;
            bot.room.roomstats.songCount++;
            bot.roomUtilities.intervalMessage();
            bot.room.currentDJID = obj.dj.id;
            var mid = obj.media.format + ':' + obj.media.cid;
            for (var bl in bot.room.blacklists) {
                if (bot.settings.blacklistEnabled) {
                    if (bot.room.blacklists[bl].indexOf(mid) > -1) {
                        API.sendChat(subChat(bot.chat.isblacklisted, {
                            blacklist: bl
                        }));
                        return API.moderateForceSkip();
                    }
                }
            }
            clearTimeout(historySkip);
            if (bot.settings.historySkip) {
                var alreadyPlayed = false;
                var apihistory = API.getHistory();
                var name = obj.dj.username;
                var historySkip = setTimeout(function() {
                    for (var i = 0; i < apihistory.length; i++) {
                        if (apihistory[i].media.cid === obj.media.cid) {
                            API.sendChat(subChat(bot.chat.songknown, {
                                name: name
                            }));
                            API.moderateForceSkip();
                            bot.room.historyList[i].push(+new Date());
                            alreadyPlayed = true;
                        }
                    }
                    if (!alreadyPlayed) {
                        bot.room.historyList.push([obj.media.cid, +new Date()]);
                    }
                }, 2000);
            }
            var newMedia = obj.media;
            if (bot.settings.timeGuard && newMedia.duration > bot.settings.maximumSongLength * 60 && !bot.room.roomevent) {
                var name = obj.dj.username;
                API.sendChat(subChat(bot.chat.timelimit, {
                    name: name,
                    maxlength: bot.settings.maximumSongLength
                }));
                API.moderateForceSkip();
            }
            if (user.ownSong) {
                API.sendChat(subChat(bot.chat.permissionownsong, {
                    name: user.username
                }));
                user.ownSong = false;
            }
            clearTimeout(bot.room.autoskipTimer);
            if (bot.room.autoskip) {
                var remaining = obj.media.duration * 1000;
                bot.room.autoskipTimer = setTimeout(function() {
                    console.log("Skipping track..");
                    API.moderateForceSkip();
                }, remaining + 3000);
            }
            storeToStorage();
        },
        eventWaitlistupdate: function(users) {
            if (users.length < 50) {
                if (bot.room.queue.id.length > 0 && bot.room.queueable) {
                    bot.room.queueable = false;
                    setTimeout(function() {
                        bot.room.queueable = true;
                    }, 500);
                    bot.room.queueing++;
                    var id, pos;
                    setTimeout(function() {
                        id = bot.room.queue.id.splice(0, 1)[0];
                        pos = bot.room.queue.position.splice(0, 1)[0];
                        API.moderateAddDJ(id, pos);
                        setTimeout(function(id, pos) {
                            API.moderateMoveDJ(id, pos);
                            bot.room.queueing--;
                            if (bot.room.queue.id.length === 0) setTimeout(function() {
                                bot.roomUtilities.booth.unlockBooth();
                            }, 1000);
                        }, 1000, id, pos);
                    }, 1000 + bot.room.queueing * 2500);
                }
            }
            for (var i = 0; i < users.length; i++) {
                var user = bot.userUtilities.lookupUser(users[i].id);
                bot.userUtilities.updatePosition(user, API.getWaitListPosition(users[i].id) + 1);
            }
        },
        chatcleaner: function(chat) {
            if (!bot.settings.filterChat) return false;
            if (bot.userUtilities.getPermission(chat.uid) > 1) return false;
            var msg = chat.message;
            var containsLetters = false;
            for (var i = 0; i < msg.length; i++) {
                ch = msg.charAt(i);
                if ((ch >= 'a' && ch <= 'z') || (ch >= 'A' && ch <= 'Z') || (ch >= '0' && ch <= '9') || ch === ':' || ch === '^') containsLetters = true;
            }
            if (msg === '') {
                return true;
            }
            if (!containsLetters && (msg.length === 1 || msg.length > 3)) return true;
            msg = msg.replace(/[ ,;.:\/=~+%^*\-\\"'&@#]/g, '');
            var capitals = 0;
            var ch;
            for (var i = 0; i < msg.length; i++) {
                ch = msg.charAt(i);
                if (ch >= 'A' && ch <= 'Z') capitals++;
            }
            if (capitals >= 40) {
                API.sendChat(subChat(bot.chat.caps, {
                    name: chat.un
                }));
                return true;
            }
            msg = msg.toLowerCase();
            if (msg === 'skip') {
                API.sendChat(subChat(bot.chat.askskip, {
                    name: chat.un
                }));
                return true;
            }
            for (var j = 0; j < bot.chatUtilities.spam.length; j++) {
                if (msg === bot.chatUtilities.spam[j]) {
                    API.sendChat(subChat(bot.chat.spam, {
                        name: chat.un
                    }));
                    return true;
                }
            }
            return false;
        },
        chatUtilities: {
            chatFilter: function(chat) {
                var msg = chat.message;
                var perm = bot.userUtilities.getPermission(chat.uid);
                var user = bot.userUtilities.lookupUser(chat.uid);
                var isMuted = false;
                for (var i = 0; i < bot.room.mutedUsers.length; i++) {
                    if (bot.room.mutedUsers[i] === chat.uid) isMuted = true;
                }
                if (isMuted) {
                    API.moderateDeleteChat(chat.cid);
                    return true;
                }
                if (bot.settings.lockdownEnabled) {
                    if (perm === 0) {
                        API.moderateDeleteChat(chat.cid);
                        return true;
                    }
                }
                if (bot.chatcleaner(chat)) {
                    API.moderateDeleteChat(chat.cid);
                    return true;
                }
                if (msg.indexOf('http://adf.ly/') > -1) {
                    API.moderateDeleteChat(chat.cid);
                    API.sendChat(subChat(bot.chat.adfly, {
                        name: chat.un
                    }));
                    return true;
                }
                if (msg.indexOf('autojoin was not enabled') > 0 || msg.indexOf('AFK message was not enabled') > 0 || msg.indexOf('!afkdisable') > 0 || msg.indexOf('!joindisable') > 0 ||
                    msg.indexOf('autojoin disabled') > 0 || msg.indexOf('AFK message disabled') > 0) {
                    API.moderateDeleteChat(chat.cid);
                    return true;
                }
                var rlJoinChat = bot.chat.roulettejoin;
                var rlLeaveChat = bot.chat.rouletteleave;
                var joinedroulette = rlJoinChat.split('%%NAME%%');
                if (joinedroulette[1].length > joinedroulette[0].length) joinedroulette = joinedroulette[1];
                else joinedroulette = joinedroulette[0];
                var leftroulette = rlLeaveChat.split('%%NAME%%');
                if (leftroulette[1].length > leftroulette[0].length) leftroulette = leftroulette[1];
                else leftroulette = leftroulette[0];
                if ((msg.indexOf(joinedroulette) > -1 || msg.indexOf(leftroulette) > -1) && chat.uid === bot.loggedInID) {
                    return true;
                }
                return false;
            },
            commandCheck: function(chat) {
                var cmd;
                if (chat.message.charAt(0) === '!') {
                    var space = chat.message.indexOf(' ');
                    if (space === -1) {
                        cmd = chat.message;
                    } else cmd = chat.message.substring(0, space);
                } else return false;
                var userPerm = bot.userUtilities.getPermission(chat.uid);
                if (chat.message !== "!join" && chat.message !== "!leave") {
                    if (userPerm === 0 && !bot.room.usercommand) return void(0);
                    if (!bot.room.allcommand) return void(0);
                }
                if (chat.message === '!eta' && bot.settings.etaRestriction) {
                    if (userPerm < 2) {
                        var u = bot.userUtilities.lookupUser(chat.uid);
                        if (u.lastEta !== null && (Date.now() - u.lastEta) < 1 * 60 * 60 * 1000) {
                            API.moderateDeleteChat(chat.cid);
                            return void(0);
                        } else u.lastEta = Date.now();
                    }
                }
                var executed = false;
                for (var comm in bot.commands) {
                    var cmdCall = bot.commands[comm].command;
                    if (!Array.isArray(cmdCall)) {
                        cmdCall = [cmdCall]
                    }
                    for (var i = 0; i < cmdCall.length; i++) {
                        if (bot.settings.commandLiteral + cmdCall[i] === cmd) {
                            bot.commands[comm].functionality(chat, bot.settings.commandLiteral + cmdCall[i]);
                            executed = true;
                            break;
                        }
                    }
                }
                if (executed && userPerm === 0) {
                    bot.room.usercommand = false;
                    setTimeout(function() {
                        bot.room.usercommand = true;
                    }, bot.settings.commandCooldown * 1000);
                }
                if (executed) {
                    if (bot.settings.cmdDeletion) {
                        API.moderateDeleteChat(chat.cid);
                    }
                    bot.room.allcommand = false;
                    bot.room.allcommand = true;
                }
                return executed;
            },
            action: function(chat) {
                var user = bot.userUtilities.lookupUser(chat.uid);
                if (chat.type === 'message') {
                    for (var j = 0; j < bot.room.users.length; j++) {
                        if (bot.userUtilities.getUser(bot.room.users[j]).id === chat.uid) {
                            bot.userUtilities.setLastActivity(bot.room.users[j]);
                        }
                    }
                }
                bot.room.roomstats.chatmessages++;
            },
            spam: ['hueh', 'hu3', 'brbr', 'heu', 'brbr', 'kkkk', 'spoder', 'mafia', 'zuera', 'zueira', 'zueria', 'aehoo', 'aheu', 'alguem', 'algum', 'brazil', 'zoeira', 'fuckadmins', 'affff',
                'vaisefoder', 'huenaarea', 'hitler', 'ashua', 'ahsu', 'ashau', 'lulz', 'huehue', 'hue', 'huehuehue', 'merda', 'pqp', 'puta', 'mulher', 'pula', 'retarda', 'caralho',
                'filha', 'ppk', 'gringo', 'fuder', 'foder', 'hua', 'ahue', 'modafuka', 'modafoka', 'mudafuka', 'mudafoka', 'ooooooooooooooo', 'foda'
            ],
            curses: ['nigger', 'fag', 'f@g', 'cunt', 'bitch', 'b1tch', 'bltch', 'nigga', 'n1gga', 'n1gg@', 'niqqa', 'n1qqa', 'nigg@', 'fuck3r', 'f@gs', 'motherfucker', 'm0therfucker',
                'm0therfuck3r', 'bastard', 'b@st@rd', 'ba5tard', 'b@stard', 'basterd', 'fuck', 'fucker', 'asshole', '@asshole', 'shit', 'sh1t', 'pussy', 'pu55y', 'pu5sy', 'pus5y', 'pussi'
            ]
        },
        connectAPI: function() {
            this.proxy = {
                eventChat: $.proxy(this.eventChat, this),
                eventUserskip: $.proxy(this.eventUserskip, this),
                eventUserjoin: $.proxy(this.eventUserjoin, this),
                eventUserleave: $.proxy(this.eventUserleave, this),
                eventVoteupdate: $.proxy(this.eventVoteupdate, this),
                eventCurateupdate: $.proxy(this.eventCurateupdate, this),
                eventRoomscoreupdate: $.proxy(this.eventRoomscoreupdate, this),
                eventDjadvance: $.proxy(this.eventDjadvance, this),
                eventWaitlistupdate: $.proxy(this.eventWaitlistupdate, this),
                eventVoteskip: $.proxy(this.eventVoteskip, this),
                eventModskip: $.proxy(this.eventModskip, this),
                eventChatcommand: $.proxy(this.eventChatcommand, this),
                eventHistoryupdate: $.proxy(this.eventHistoryupdate, this),
            };
            API.on(API.CHAT, this.proxy.eventChat);
            API.on(API.USER_SKIP, this.proxy.eventUserskip);
            API.on(API.USER_JOIN, this.proxy.eventUserjoin);
            API.on(API.USER_LEAVE, this.proxy.eventUserleave);
            API.on(API.VOTE_UPDATE, this.proxy.eventVoteupdate);
            API.on(API.GRAB_UPDATE, this.proxy.eventCurateupdate);
            API.on(API.ROOM_SCORE_UPDATE, this.proxy.eventRoomscoreupdate);
            API.on(API.ADVANCE, this.proxy.eventDjadvance);
            API.on(API.WAIT_LIST_UPDATE, this.proxy.eventWaitlistupdate);
            API.on(API.MOD_SKIP, this.proxy.eventModskip);
            API.on(API.CHAT_COMMAND, this.proxy.eventChatcommand);
            API.on(API.HISTORY_UPDATE, this.proxy.eventHistoryupdate);
        },
        disconnectAPI: function() {
            API.off(API.CHAT, this.proxy.eventChat);
            API.off(API.USER_SKIP, this.proxy.eventUserskip);
            API.off(API.USER_JOIN, this.proxy.eventUserjoin);
            API.off(API.USER_LEAVE, this.proxy.eventUserleave);
            API.off(API.VOTE_UPDATE, this.proxy.eventVoteupdate);
            API.off(API.CURATE_UPDATE, this.proxy.eventCurateupdate);
            API.off(API.ROOM_SCORE_UPDATE, this.proxy.eventRoomscoreupdate);
            API.off(API.ADVANCE, this.proxy.eventDjadvance);
            API.off(API.WAIT_LIST_UPDATE, this.proxy.eventWaitlistupdate);
            API.off(API.MOD_SKIP, this.proxy.eventModskip);
            API.off(API.CHAT_COMMAND, this.proxy.eventChatcommand);
            API.off(API.HISTORY_UPDATE, this.proxy.eventHistoryupdate);
        },
        startup: function() {
            Function.prototype.toString = function() {
                return 'Function.'
            };
            var u = API.getUser();
            if (bot.userUtilities.getPermission(u) < 2) return API.chatLog(bot.chat.greyuser);
            if (bot.userUtilities.getPermission(u) === 2) API.chatLog(bot.chat.bouncer);
            bot.connectAPI();
            API.moderateDeleteChat = function(cid) {
                $.ajax({
                    url: "https://plug.dj/_/chat/" + cid,
                    type: "DELETE"
                })
            };
            var roomURL = window.location.pathname;
            var Check;
            var detect = function() {
                if (roomURL != window.location.pathname) {
                    clearInterval(Check)
                    console.log("Killing bot after room change.");
                    storeToStorage();
                    bot.disconnectAPI();
                    kill();
                }
            };
            Check = setInterval(function() {
                detect()
            }, 100);
            retrieveSettings();
            retrieveFromStorage();
            window.bot = bot;
            if (bot.room.roomstats.launchTime === null) {
                bot.room.roomstats.launchTime = Date.now();
            }
            for (var j = 0; j < bot.room.users.length; j++) {
                bot.room.users[j].inRoom = false;
            }
            var userlist = API.getUsers();
            for (var i = 0; i < userlist.length; i++) {
                var known = false;
                var ind = null;
                for (var k = 0; k < bot.room.users.length; k++) {
                    if (bot.room.users[k].id === userlist[i].id) {
                        known = true;
                        ind = k;
                    }
                }
                if (known) {
                    bot.room.users[ind].inRoom = true;
                } else {
                    bot.room.users.push(new bot.User(userlist[i].id, userlist[i].username));
                    ind = bot.room.users.length - 1;
                }
                var wlIndex = API.getWaitListPosition(bot.room.users[ind].id) + 1;
                bot.userUtilities.updatePosition(bot.room.users[ind], wlIndex);
            }
            bot.room.afkInterval = setInterval(function() {
                bot.roomUtilities.afkCheck()
            }, 10 * 1000);
            bot.loggedInID = API.getUser().id;
            bot.status = true;
            API.sendChat('/cap ' + bot.settings.startupCap);
            API.setVolume(bot.settings.startupVolume);
            $("#woot").click();
            if (bot.settings.startupEmoji) {
                var emojibuttonoff = $(".icon-emoji-off");
                if (emojibuttonoff.length > 0) {
                    emojibuttonoff[0].click();
                }
            } else {
                var emojibuttonon = $(".icon-emoji-on");
                if (emojibuttonon.length > 0) {
                    emojibuttonon[0].click();
                }
            }
            API.chatLog('Max Visible Avatars: ' + bot.settings.startupCap);
            API.chatLog('Volume: ' + bot.settings.startupVolume);
            loadChat(API.sendChat(subChat(bot.chat.online, {
                botname: bot.settings.botName,
                version: bot.version
            })));
        },
        commands: {
            executable: function(minRank, chat) {
                var id = chat.uid;
                var perm = bot.userUtilities.getPermission(id);
                var minPerm;
                switch (minRank) {
                    case 'admin':
                        minPerm = 10;
                        break;
                    case 'host':
                        minPerm = 5;
                        break;
                    case 'cohost':
                        minPerm = 4;
                        break;
                    case 'manager':
                        minPerm = 3;
                        break;
                    case 'mod':
                        if (bot.settings.bouncerPlus) {
                            minPerm = 2;
                        } else {
                            minPerm = 3;
                        }
                        break;
                    case 'bouncer':
                        minPerm = 2;
                        break;
                    case 'residentdj':
                        minPerm = 1;
                        break;
                    case 'ambassador':
                        minPerm = 0;
                        break;
                    case 'user':
                        minPerm = 0;
                        break;
                    default:
                        API.chatLog('error assigning minimum permission');
                }
                return perm >= minPerm;
            },
            activeCommand: {
                command: 'active',
                rank: 'user',
                type: 'startsWith',
                functionality: function(chat, cmd) {
                    if (this.type === 'exact' && chat.message.length !== cmd.length) return
                    void(0);
                    if (!bot.commands.executable(this.rank, chat)) return void(0);
                    else {
                        var msg = chat.message;
                        var now = Date.now();
                        var chatters = 0;
                        var time;
                        if (msg.length === cmd.length) time = 60;
                        else {
                            time = msg.substring(cmd.length + 1);
                            if (isNaN(time)) return API.sendChat(subChat(bot.chat.invalidtime, {
                                name: chat.un
                            }));
                        }
                        for (var i = 0; i < bot.room.users.length; i++) {
                            userTime = bot.userUtilities.getLastActivity(bot.room.users[i]);
                            if ((now - userTime) <= (time * 60 * 1000)) {
                                chatters++;
                            }
                        }
                        API.sendChat(subChat(bot.chat.activeusersintime, {
                            name: chat.un,
                            amount: chatters,
                            time: time
                        }));
                    }
                }
            },
            addCommand: {
                command: 'add',
                rank: 'bouncer',
                type: 'startsWith',
                functionality: function(chat, cmd) {
                    if (this.type === 'exact' && chat.message.length !== cmd.length) return
                    void(0);
                    if (!bot.commands.executable(this.rank, chat)) return void(0);
                    else {
                        var msg = chat.message;
                        if (msg.length === cmd.length) return API.sendChat(subChat(bot.chat.nouserspecified, {
                            name: chat.un
                        }));
                        var name = msg.substr(cmd.length + 2);
                        var user = bot.userUtilities.lookupUserName(name);
                        if (msg.length > cmd.length + 2) {
                            if (typeof user !== 'undefined') {
                                if (bot.room.roomevent) {
                                    bot.room.eventArtists.push(user.id);
                                }
                                API.moderateAddDJ(user.id);
                            } else API.sendChat(subChat(bot.chat.invaliduserspecified, {
                                name: chat.un
                            }));
                        }
                    }
                }
            },
            afklimitCommand: {
                command: 'afklimit',
                rank: 'manager',
                type: 'startsWith',
                functionality: function(chat, cmd) {
                    if (this.type === 'exact' && chat.message.length !== cmd.length) return
                    void(0);
                    if (!bot.commands.executable(this.rank, chat)) return void(0);
                    else {
                        var msg = chat.message;
                        if (msg.length === cmd.length) return API.sendChat(subChat(bot.chat.nolimitspecified, {
                            name: chat.un
                        }));
                        var limit = msg.substring(cmd.length + 1);
                        if (!isNaN(limit)) {
                            bot.settings.maximumAfk = parseInt(limit, 10);
                            API.sendChat(subChat(bot.chat.maximumafktimeset, {
                                name: chat.un,
                                time: bot.settings.maximumAfk
                            }));
                        } else API.sendChat(subChat(bot.chat.invalidlimitspecified, {
                            name: chat.un
                        }));
                    }
                }
            },
            afkremovalCommand: {
                command: 'afktoggle',
                rank: 'manager',
                type: 'exact',
                functionality: function(chat, cmd) {
                    if (this.type === 'exact' && chat.message.length !== cmd.length) return
                    void(0);
                    if (!bot.commands.executable(this.rank, chat)) return void(0);
                    else {
                        if (bot.settings.afkRemoval) {
                            bot.settings.afkRemoval = !bot.settings.afkRemoval;
                            clearInterval(bot.room.afkInterval);
                            API.sendChat(subChat(bot.chat.toggleoff, {
                                name: chat.un,
                                'function': bot.chat.afkremoval
                            }));
                        } else {
                            bot.settings.afkRemoval = !bot.settings.afkRemoval;
                            bot.room.afkInterval = setInterval(function() {
                                bot.roomUtilities.afkCheck()
                            }, 2 * 1000);
                            API.sendChat(subChat(bot.chat.toggleon, {
                                name: chat.un,
                                'function': bot.chat.afkremoval
                            }));
                        }
                    }
                }
            },
            afkresetCommand: {
                command: 'afkreset',
                rank: 'bouncer',
                type: 'startsWith',
                functionality: function(chat, cmd) {
                    if (this.type === 'exact' && chat.message.length !== cmd.length) return
                    void(0);
                    if (!bot.commands.executable(this.rank, chat)) return void(0);
                    else {
                        var msg = chat.message;
                        if (msg.length === cmd.length) return API.sendChat(subChat(bot.chat.nouserspecified, {
                            name: chat.un
                        }));
                        var name = msg.substring(cmd.length + 2);
                        var user = bot.userUtilities.lookupUserName(name);
                        if (typeof user === 'boolean') return API.sendChat(subChat(bot.chat.invaliduserspecified, {
                            name: chat.un
                        }));
                        bot.userUtilities.setLastActivity(user);
                        API.sendChat(subChat(bot.chat.afkstatusreset, {
                            name: chat.un,
                            username: name
                        }));
                    }
                }
            },
            afktimeCommand: {
                command: 'afktime',
                rank: 'bouncer',
                type: 'startsWith',
                functionality: function(chat, cmd) {
                    if (this.type === 'exact' && chat.message.length !== cmd.length) return
                    void(0);
                    if (!bot.commands.executable(this.rank, chat)) return void(0);
                    else {
                        var msg = chat.message;
                        if (msg.length === cmd.length) return API.sendChat(subChat(bot.chat.nouserspecified, {
                            name: chat.un
                        }));
                        var name = msg.substring(cmd.length + 2);
                        var user = bot.userUtilities.lookupUserName(name);
                        if (typeof user === 'boolean') return API.sendChat(subChat(bot.chat.invaliduserspecified, {
                            name: chat.un
                        }));
                        var lastActive = bot.userUtilities.getLastActivity(user);
                        var inactivity = Date.now() - lastActive;
                        var time = bot.roomUtilities.msToStr(inactivity);
                        var launchT = bot.room.roomstats.launchTime;
                        var durationOnline = Date.now() - launchT;
                        if (inactivity === durationOnline) {
                            API.sendChat(subChat(bot.chat.inactivelonger, {
                                botname: bot.settings.botName,
                                name: chat.un,
                                username: name
                            }));
                        } else {
                            API.sendChat(subChat(bot.chat.inactivefor, {
                                name: chat.un,
                                username: name,
                                time: time
                            }));
                        }
                    }
                }
            },
            autoskipCommand: {
                command: 'autoskip',
                rank: 'bouncer',
                type: 'exact',
                functionality: function(chat, cmd) {
                    if (this.type === 'exact' && chat.message.length !== cmd.length) return
                    void(0);
                    if (!bot.commands.executable(this.rank, chat)) return void(0);
                    else {
                        if (bot.room.autoskip) {
                            bot.room.autoskip = !bot.room.autoskip;
                            clearTimeout(bot.room.autoskipTimer);
                            return API.sendChat(subChat(bot.chat.toggleoff, {
                                name: chat.un,
                                'function': bot.chat.autoskip
                            }));
                        } else {
                            bot.room.autoskip = !bot.room.autoskip;
                            return API.sendChat(subChat(bot.chat.toggleon, {
                                name: chat.un,
                                'function': bot.chat.autoskip
                            }));
                        }
                    }
                }
            },
            ballCommand: {
                command: ['ask'],
                rank: 'user',
                type: 'startsWith',
                functionality: function(chat, cmd) {
                    if (this.type === 'exact' && chat.message.length !== cmd.length) return
                    void(0);
                    if (!bot.commands.executable(this.rank, chat)) return void(0);
                    else {
                        var crowd = API.getUsers();
                        var msg = chat.message;
                        var argument = msg.substring(cmd.length + 1);
                        var randomUser = Math.floor(Math.random() * crowd.length);
                        var randomBall = Math.floor(Math.random() * bot.chat.balls.length);
                        var randomSentence = Math.floor(Math.random() * 1);
                        API.sendChat(subChat(bot.chat.ball, {
                            name: chat.un,
                            botname: bot.settings.botName,
                            question: argument,
                            response: bot.chat.balls[randomBall]
                        }));
                    }
                }
            },
            banCommand: {
                command: 'ban',
                rank: 'bouncer',
                type: 'startsWith',
                functionality: function(chat, cmd) {
                    if (this.type === 'exact' && chat.message.length !== cmd.length) return
                    void(0);
                    if (!bot.commands.executable(this.rank, chat)) return void(0);
                    else {
                        var msg = chat.message;
                        if (msg.length === cmd.length) return API.sendChat(subChat(bot.chat.nouserspecified, {
                            name: chat.un
                        }));
                        var name = msg.substr(cmd.length + 2);
                        var user = bot.userUtilities.lookupUserName(name);
                        if (typeof user === 'boolean') return API.sendChat(subChat(bot.chat.invaliduserspecified, {
                            name: chat.un
                        }));
                        API.moderateBanUser(user.id, 1, API.BAN.DAY);
                    }
                }
            },
            botnameCommand: {
                command: 'botname',
                rank: 'manager',
                type: 'startsWith',
                functionality: function(chat, cmd) {
                    if (this.type === 'exact' && chat.message.length !== cmd.length) return
                    void(0);
                    if (!bot.commands.executable(this.rank, chat)) return void(0);
                    else {
                        var msg = chat.message;
                        if (msg.length <= cmd.length + 1) return API.sendChat(subChat(bot.chat.currentbotname, {
                            botname: bot.settings.botName
                        }));
                        var argument = msg.substring(cmd.length + 1);
                        if (argument) {
                            bot.settings.botName = argument;
                            API.sendChat(subChat(bot.chat.botnameset, {
                                botName: bot.settings.botName
                            }));
                        }
                    }
                }
            },
            botstatusCommand: {
                command: 'botstatus',
                rank: 'manager',
                type: 'exact',
                functionality: function(chat, cmd) {
                    if (this.type === 'exact' && chat.message.length !== cmd.length) return
                    void(0);
                    if (!bot.commands.executable(this.rank, chat)) return void(0);
                    else {
                        var msg = '/me [Settings] - ';
                        msg += bot.chat.afkremoval + ': ';
                        if (bot.settings.afkRemoval) msg += 'On';
                        else msg += 'Off';
                        msg += '. ';
                        msg += bot.chat.afksremoved + ": " + bot.room.afkList.length + '. ';
                        msg += bot.chat.afklimit + ': ' + bot.settings.maximumAfk;
                        msg += 'mins. ';
                        msg += bot.chat.timeguard + ': ';
                        if (bot.settings.timeGuard) msg += bot.settings.maximumSongLength + 'mins';
                        else msg += 'Off';
                        msg += '. ';
                        msg += bot.chat.chatfilter + ': ';
                        if (bot.settings.filterChat) msg += 'On';
                        else msg += 'Off';
                        msg += '. ';
                        msg += bot.chat.historyskip + ': ';
                        if (bot.settings.historySkip) msg += 'On';
                        else msg += 'Off';
                        msg += '. ';
                        msg += bot.chat.voteskip + ': ';
                        if (bot.settings.voteSkip) msg += 'On';
                        else msg += 'Off';
                        msg += '. ';
                        msg += bot.chat.cmddeletion + ': ';
                        if (bot.settings.cmdDeletion) msg += 'On';
                        else msg += 'Off';
                        msg += '. ';
                        msg += bot.chat.autoskip + ': ';
                        if (bot.room.autoskip) msg += 'On';
                        else msg += 'Off';
                        msg += '. ';
                        var launchT = bot.room.roomstats.launchTime;
                        var durationOnline = Date.now() - launchT;
                        var since = bot.roomUtilities.msToStr(durationOnline);
                        msg += subChat(bot.chat.activefor, {
                            time: since
                        });
                        return API.sendChat(msg);
                    }
                }
            },
            clearchatCommand: {
                command: 'clear',
                rank: 'manager',
                type: 'exact',
                functionality: function(chat, cmd) {
                    if (this.type === 'exact' && chat.message.length !== cmd.length) return
                    void(0);
                    if (!bot.commands.executable(this.rank, chat)) return void(0);
                    else {
                        var currentchat = $('#chat-messages').children();
                        for (var i = 0; i < currentchat.length; i++) {
                            API.moderateDeleteChat(currentchat[i].getAttribute("data-cid"));
                        }
                        return API.sendChat(subChat(bot.chat.chatcleared, {
                            name: chat.un
                        }));
                    }
                }
            },
            cookieCommand: {
                command: 'give',
                rank: 'user',
                type: 'startsWith',
                getCookie: function(chat) {
                    var c = Math.floor(Math.random() * bot.chat.cookies.length);
                    return bot.chat.cookies[c];
                },
                functionality: function(chat, cmd) {
                    if (this.type === 'exact' && chat.message.length !== cmd.length) return
                    void(0);
                    if (!bot.commands.executable(this.rank, chat)) return void(0);
                    else {
                        var msg = chat.message;
                        var space = msg.indexOf(' ');
                        if (space === -1) {
                            API.sendChat(bot.chat.eatcookie);
                            return false;
                        } else {
                            var name = msg.substring(space + 2);
                            var user = bot.userUtilities.lookupUserName(name);
                            if (user === false || !user.inRoom) {
                                return API.sendChat(subChat(bot.chat.nousercookie, {
                                    name: name
                                }));
                            } else if (user.username === chat.un) {
                                return API.sendChat(subChat(bot.chat.selfcookie, {
                                    name: name
                                }));
                            } else {
                                return API.sendChat(subChat(bot.chat.cookie, {
                                    nameto: user.username,
                                    namefrom: chat.un,
                                    cookie: this.getCookie()
                                }));
                            }
                        }
                    }
                }
            },
            etaCommand: {
                command: 'eta',
                rank: 'user',
                type: 'startsWith',
                functionality: function(chat, cmd) {
                    if (this.type === 'exact' && chat.message.length !== cmd.length) return
                    void(0);
                    if (!bot.commands.executable(this.rank, chat)) return void(0);
                    else {
                        var perm = bot.userUtilities.getPermission(chat.uid);
                        var msg = chat.message;
                        var name;
                        if (msg.length > cmd.length) {
                            if (perm < 2) return void(0);
                            name = msg.substring(cmd.length + 2);
                        } else name = chat.un;
                        var user = bot.userUtilities.lookupUserName(name);
                        if (typeof user === 'boolean') return API.sendChat(subChat(bot.chat.invaliduserspecified, {
                            name: chat.un
                        }));
                        var pos = API.getWaitListPosition(user.id);
                        if (pos < 0) return API.sendChat(subChat(bot.chat.notinwaitlist, {
                            name: name
                        }));
                        var timeRemaining = API.getTimeRemaining();
                        var estimateMS = ((pos + 1) * 4 * 60 + timeRemaining) * 1000;
                        var estimateString = bot.roomUtilities.msToStr(estimateMS);
                        API.sendChat(subChat(bot.chat.eta, {
                            name: name,
                            time: estimateString
                        }));
                    }
                }
            },
            fbCommand: {
                command: 'fb',
                rank: 'user',
                type: 'exact',
                functionality: function(chat, cmd) {
                    if (this.type === 'exact' && chat.message.length !== cmd.length) return
                    void(0);
                    if (!bot.commands.executable(this.rank, chat)) return void(0);
                    else {
                        API.sendChat(subChat(bot.chat.facebook, {
                            url: bot.settings.facebook
                        }));
                    }
                }
            },
            filterCommand: {
                command: 'filter',
                rank: 'bouncer',
                type: 'exact',
                functionality: function(chat, cmd) {
                    if (this.type === 'exact' && chat.message.length !== cmd.length) return
                    void(0);
                    if (!bot.commands.executable(this.rank, chat)) return void(0);
                    else {
                        if (bot.settings.filterChat) {
                            bot.settings.filterChat = !bot.settings.filterChat;
                            return API.sendChat(subChat(bot.chat.toggleoff, {
                                name: chat.un,
                                'function': bot.chat.chatfilter
                            }));
                        } else {
                            bot.settings.filterChat = !bot.settings.filterChat;
                            return API.sendChat(subChat(bot.chat.toggleon, {
                                name: chat.un,
                                'function': bot.chat.chatfilter
                            }));
                        }
                    }
                }
            },
            helpCommand: {
                command: 'help',
                rank: 'user',
                type: 'exact',
                functionality: function(chat, cmd) {
                    if (this.type === 'exact' && chat.message.length !== cmd.length) return
                    void(0);
                    if (!bot.commands.executable(this.rank, chat)) return void(0);
                    else {
                        API.sendChat(subChat(bot.chat.commandslink, {
                            botname: bot.settings.botName,
                            link: bot.cmdLink
                        }));
                    }
                }
            },
            joinCommand: {
                command: 'join',
                rank: 'user',
                type: 'exact',
                functionality: function(chat, cmd) {
                    if (this.type === 'exact' && chat.message.length !== cmd.length) return
                    void(0);
                    if (!bot.commands.executable(this.rank, chat)) return void(0);
                    else {
                        if (bot.room.roulette.rouletteStatus && bot.room.roulette.participants.indexOf(chat.uid) < 0) {
                            bot.room.roulette.participants.push(chat.uid);
                            API.sendChat(subChat(bot.chat.roulettejoin, {
                                name: chat.un
                            }));
                        }
                    }
                }
            },
            kickCommand: {
                command: 'kick',
                rank: 'bouncer',
                type: 'startsWith',
                functionality: function(chat, cmd) {
                    if (this.type === 'exact' && chat.message.length !== cmd.length) return
                    void(0);
                    if (!bot.commands.executable(this.rank, chat)) return void(0);
                    else {
                        var msg = chat.message;
                        var lastSpace = msg.lastIndexOf(' ');
                        var time;
                        var name;
                        if (lastSpace === msg.indexOf(' ')) {
                            time = 0.25;
                            name = msg.substring(cmd.length + 2);
                        } else {
                            time = msg.substring(lastSpace + 1);
                            name = msg.substring(cmd.length + 2, lastSpace);
                        }
                        var user = bot.userUtilities.lookupUserName(name);
                        var from = chat.un;
                        if (typeof user === 'boolean') return API.sendChat(subChat(bot.chat.nouserspecified, {
                            name: chat.un
                        }));
                        var permFrom = bot.userUtilities.getPermission(chat.uid);
                        var permTokick = bot.userUtilities.getPermission(user.id);
                        if (permFrom <= permTokick) return API.sendChat(subChat(bot.chat.kickrank, {
                            name: chat.un
                        }));
                        if (!isNaN(time)) {
                            API.sendChat(subChat(bot.chat.kick, {
                                name: chat.un,
                                username: name,
                                time: time
                            }));
                            if (time > 24 * 60 * 60) API.moderateBanUser(user.id, 1, API.BAN.PERMA);
                            else API.moderateBanUser(user.id, 1, API.BAN.DAY);
                            setTimeout(function(id, name) {
                                API.moderateUnbanUser(id);
                                console.log('Unbanned @' + name + '. (' + id + ')');
                            }, time * 60 * 1000, user.id, name);
                        } else API.sendChat(subChat(bot.chat.invalidtime, {
                            name: chat.un
                        }));
                    }
                }
            },
            killCommand: {
                command: 'quit',
                rank: 'manager',
                type: 'exact',
                functionality: function(chat, cmd) {
                    if (this.type === 'exact' && chat.message.length !== cmd.length) return
                    void(0);
                    if (!bot.commands.executable(this.rank, chat)) return void(0);
                    else {
                        storeToStorage();
                        API.sendChat(bot.chat.kill);
                        bot.disconnectAPI();
                        kill();
                    }
                }
            },
            leaveCommand: {
                command: 'leave',
                rank: 'user',
                type: 'exact',
                functionality: function(chat, cmd) {
                    if (this.type === 'exact' && chat.message.length !== cmd.length) return
                    void(0);
                    if (!bot.commands.executable(this.rank, chat)) return void(0);
                    else {
                        var ind = bot.room.roulette.participants.indexOf(chat.uid);
                        if (ind > -1) {
                            bot.room.roulette.participants.splice(ind, 1);
                            API.sendChat(subChat(bot.chat.rouletteleave, {
                                name: chat.un
                            }));
                        }
                    }
                }
            },
            linkCommand: {
                command: 'geturl',
                rank: 'user',
                type: 'exact',
                functionality: function(chat, cmd) {
                    if (this.type === 'exact' && chat.message.length !== cmd.length) return
                    void(0);
                    if (!bot.commands.executable(this.rank, chat)) return void(0);
                    else {
                        var media = API.getMedia();
                        var from = chat.un;
                        var user = bot.userUtilities.lookupUser(chat.uid);
                        var perm = bot.userUtilities.getPermission(chat.uid);
                        var dj = API.getDJ().id;
                        var isDj = false;
                        if (dj === chat.uid) isDj = true;
                        if (perm >= 1 || isDj) {
                            if (media.format === 1) {
                                var linkToSong = "http://youtu.be/" + media.cid;
                                API.sendChat(subChat(bot.chat.songlink, {
                                    name: from,
                                    link: linkToSong
                                }));
                            }
                            if (media.format === 2) {
                                SC.get('/tracks/' + media.cid, function(sound) {
                                    API.sendChat(subChat(bot.chat.songlink, {
                                        name: from,
                                        link: sound.permalink_url
                                    }));
                                });
                            }
                        }
                    }
                }
            },
            lockCommand: {
                command: 'lock',
                rank: 'manager',
                type: 'exact',
                functionality: function(chat, cmd) {
                    if (this.type === 'exact' && chat.message.length !== cmd.length) return
                    void(0);
                    if (!bot.commands.executable(this.rank, chat)) return void(0);
                    else {
                        bot.roomUtilities.booth.lockBooth();
                    }
                }
            },
            lockdownCommand: {
                command: 'togglechat',
                rank: 'manager',
                type: 'exact',
                functionality: function(chat, cmd) {
                    if (this.type === 'exact' && chat.message.length !== cmd.length) return
                    void(0);
                    if (!bot.commands.executable(this.rank, chat)) return void(0);
                    else {
                        var temp = bot.settings.lockdownEnabled;
                        bot.settings.lockdownEnabled = !temp;
                        if (bot.settings.lockdownEnabled) {
                            return API.sendChat(subChat(bot.chat.toggleon, {
                                name: chat.un,
                                'function': bot.chat.lockdown
                            }));
                        } else return API.sendChat(subChat(bot.chat.toggleoff, {
                            name: chat.un,
                            'function': bot.chat.lockdown
                        }));
                    }
                }
            },
            maxlengthCommand: {
                command: 'maxlength',
                rank: 'manager',
                type: 'startsWith',
                functionality: function(chat, cmd) {
                    if (this.type === 'exact' && chat.message.length !== cmd.length) return
                    void(0);
                    if (!bot.commands.executable(this.rank, chat)) return void(0);
                    else {
                        var msg = chat.message;
                        var maxTime = msg.substring(cmd.length + 1);
                        if (!isNaN(maxTime)) {
                            bot.settings.maximumSongLength = maxTime;
                            return API.sendChat(subChat(bot.chat.maxlengthtime, {
                                name: chat.un,
                                time: bot.settings.maximumSongLength
                            }));
                        } else return API.sendChat(subChat(bot.chat.invalidtime, {
                            name: chat.un
                        }));
                    }
                }
            },
            msgCommand: {
                command: 'msg',
                rank: 'manager',
                type: 'startsWith',
                functionality: function(chat, cmd) {
                    if (this.type === 'exact' && chat.message.length !== cmd.length) return
                    void(0);
                    if (!bot.commands.executable(this.rank, chat)) return void(0);
                    else {
                        var msg = chat.message;
                        if (msg.length <= cmd.length + 1) return API.sendChat('\/me NikkiBot: Current Notice - ' + bot.settings.msg);
                        var argument = msg.substring(cmd.length + 1);
                        if (!bot.settings.msgEnabled) bot.settings.msgEnabled = !bot.settings.msgEnabled;
                        if (isNaN(argument)) {
                            bot.settings.msg = argument;
                            API.sendChat(subChat(bot.chat.msgset));
                        } else {
                            bot.settings.msgInterval = argument;
                            API.sendChat(subChat(bot.chat.msgintervalset, {
                                interval: bot.settings.msgInterval
                            }));
                        }
                    }
                }
            },
            moveCommand: {
                command: 'move',
                rank: 'manager',
                type: 'startsWith',
                functionality: function(chat, cmd) {
                    if (this.type === 'exact' && chat.message.length !== cmd.length) return
                    void(0);
                    if (!bot.commands.executable(this.rank, chat)) return void(0);
                    else {
                        var msg = chat.message;
                        if (msg.length === cmd.length) return API.sendChat(subChat(bot.chat.nouserspecified, {
                            name: chat.un
                        }));
                        var firstSpace = msg.indexOf(' ');
                        var lastSpace = msg.lastIndexOf(' ');
                        var pos;
                        var name;
                        if (isNaN(parseInt(msg.substring(lastSpace + 1)))) {
                            pos = 1;
                            name = msg.substring(cmd.length + 2);
                        } else {
                            pos = parseInt(msg.substring(lastSpace + 1));
                            name = msg.substring(cmd.length + 2, lastSpace);
                        }
                        var user = bot.userUtilities.lookupUserName(name);
                        if (typeof user === 'boolean') return API.sendChat(subChat(bot.chat.invaliduserspecified, {
                            name: chat.un
                        }));
                        if (user.id === bot.loggedInID) return API.sendChat(subChat(bot.chat.addbotwaitlist, {
                            name: chat.un
                        }));
                        if (!isNaN(pos)) {
                            API.sendChat(subChat(bot.chat.move, {
                                name: chat.un
                            }));
                            bot.userUtilities.moveUser(user.id, pos, false);
                        } else return API.sendChat(subChat(bot.chat.invalidpositionspecified, {
                            name: chat.un
                        }));
                    }
                }
            },
            muteCommand: {
                command: 'mute',
                rank: 'bouncer',
                type: 'startsWith',
                functionality: function(chat, cmd) {
                    if (this.type === 'exact' && chat.message.length !== cmd.length) return
                    void(0);
                    if (!bot.commands.executable(this.rank, chat)) return void(0);
                    else {
                        var msg = chat.message;
                        if (msg.length === cmd.length) return API.sendChat(subChat(bot.chat.nouserspecified, {
                            name: chat.un
                        }));
                        var lastSpace = msg.lastIndexOf(' ');
                        var time = null;
                        var name;
                        if (lastSpace === msg.indexOf(' ')) {
                            name = msg.substring(cmd.length + 2);
                            time = 45;
                        } else {
                            time = msg.substring(lastSpace + 1);
                            if (isNaN(time) || time === "" || time === null || typeof time === "undefined") {
                                return API.sendChat(subChat(bot.chat.invalidtime, {
                                    name: chat.un
                                }));
                            }
                            name = msg.substring(cmd.length + 2, lastSpace);
                        }
                        var from = chat.un;
                        var user = bot.userUtilities.lookupUserName(name);
                        if (typeof user === 'boolean') return API.sendChat(subChat(bot.chat.invaliduserspecified, {
                            name: chat.un
                        }));
                        var permFrom = bot.userUtilities.getPermission(chat.uid);
                        var permUser = bot.userUtilities.getPermission(user.id);
                        if (permFrom > permUser) {
                            if (time > 45) {
                                API.sendChat(subChat(bot.chat.mutedmaxtime, {
                                    name: chat.un,
                                    time: "45"
                                }));
                                API.moderateMuteUser(user.id, 1, API.MUTE.LONG);
                            } else if (time === 45) {
                                API.moderateMuteUser(user.id, 1, API.MUTE.LONG);
                                API.sendChat(subChat(bot.chat.mutedtime, {
                                    name: chat.un,
                                    username: name,
                                    time: time
                                }));
                            } else if (time > 30) {
                                API.moderateMuteUser(user.id, 1, API.MUTE.LONG);
                                API.sendChat(subChat(bot.chat.mutedtime, {
                                    name: chat.un,
                                    username: name,
                                    time: time
                                }));
                                setTimeout(function(id) {
                                    API.moderateUnmuteUser(id);
                                }, time * 60 * 1000, user.id);
                            } else if (time > 15) {
                                API.moderateMuteUser(user.id, 1, API.MUTE.MEDIUM);
                                API.sendChat(subChat(bot.chat.mutedtime, {
                                    name: chat.un,
                                    username: name,
                                    time: time
                                }));
                                setTimeout(function(id) {
                                    API.moderateUnmuteUser(id);
                                }, time * 60 * 1000, user.id);
                            } else {
                                API.moderateMuteUser(user.id, 1, API.MUTE.SHORT);
                                API.sendChat(subChat(bot.chat.mutedtime, {
                                    name: chat.un,
                                    username: name,
                                    time: time
                                }));
                                setTimeout(function(id) {
                                    API.moderateUnmuteUser(id);
                                }, time * 60 * 1000, user.id);
                            }
                        } else API.sendChat(subChat(bot.chat.muterank, {
                            name: chat.un
                        }));
                    }
                }
            },
            reloadCommand: {
                command: 'reload',
                rank: 'bouncer',
                type: 'exact',
                functionality: function(chat, cmd) {
                    if (this.type === 'exact' && chat.message.length !== cmd.length) return
                    void(0);
                    if (!bot.commands.executable(this.rank, chat)) return void(0);
                    else {
                        API.sendChat(bot.chat.reload);
                        storeToStorage();
                        bot.disconnectAPI();
                        localStorage.clear();
                        $.getScript(bot.scriptLink);
                    }
                }
            },
            removeCommand: {
                command: 'remove',
                rank: 'mod',
                type: 'startsWith',
                functionality: function(chat, cmd) {
                    if (this.type === 'exact' && chat.message.length !== cmd.length) return
                    void(0);
                    if (!bot.commands.executable(this.rank, chat)) return void(0);
                    else {
                        var msg = chat.message;
                        if (msg.length > cmd.length + 2) {
                            var name = msg.substr(cmd.length + 2);
                            var user = bot.userUtilities.lookupUserName(name);
                            if (typeof user !== 'boolean') {
                                user.lastDC = {
                                    time: null,
                                    position: null,
                                    songCount: 0
                                };
                                if (API.getDJ().id === user.id) {
                                    API.moderateForceSkip();
                                    API.moderateRemoveDJ(user.id);
                                } else API.moderateRemoveDJ(user.id);
                            } else API.sendChat(subChat(bot.chat.removenotinwl, {
                                name: chat.un,
                                username: name
                            }));
                        } else API.sendChat(subChat(bot.chat.nouserspecified, {
                            name: chat.un
                        }));
                    }
                }
            },
            resetCommand: {
                command: 'reset',
                rank: 'bouncer',
                type: 'exact',
                functionality: function(chat, cmd) {
                    if (this.type === 'exact' && chat.message.length !== cmd.length) return
                    void(0);
                    if (!bot.commands.executable(this.rank, chat)) return void(0);
                    else {
                        var id = API.getDJ().id;
                        if (chat.message.length === cmd.length) {
                            API.sendChat(subChat(bot.chat.usedlockskip, {
                                name: chat.un,
                            }));
                            API.moderateForceSkip();
                            bot.userUtilities.moveUser(id, bot.settings.lockskipPosition, false);
                            return void(0);
                        }
                    }
                }
            },
            rouletteCommand: {
                command: 'roulette',
                rank: 'bouncer',
                type: 'exact',
                functionality: function(chat, cmd) {
                    if (this.type === 'exact' && chat.message.length !== cmd.length) return
                    void(0);
                    if (!bot.commands.executable(this.rank, chat)) return void(0);
                    else {
                        if (!bot.room.roulette.rouletteStatus) {
                            bot.room.roulette.startRoulette();
                        }
                    }
                }
            },
            rulesCommand: {
                command: 'rules',
                rank: 'user',
                type: 'exact',
                functionality: function(chat, cmd) {
                    if (this.type === 'exact' && chat.message.length !== cmd.length) return
                    void(0);
                    if (!bot.commands.executable(this.rank, chat)) return void(0);
                    else {
                        if (typeof bot.settings.rulesLink === "string") return API.sendChat(subChat(bot.chat.roomrules, {
                            link: bot.settings.rulesLink
                        }));
                    }
                }
            },
            skipCommand: {
                command: 'skip',
                rank: 'bouncer',
                type: 'exact',
                functionality: function(chat, cmd) {
                    if (this.type === 'exact' && chat.message.length !== cmd.length) return
                    void(0);
                    if (!bot.commands.executable(this.rank, chat)) return void(0);
                    else {
                        API.sendChat(subChat(bot.chat.skip, {
                            name: chat.un
                        }));
                        API.moderateForceSkip();
                        bot.room.skippable = false;
                        bot.room.skippable = true
                    }
                }
            },
            togglemsgCommand: {
                command: 'togglemsg',
                rank: 'manager',
                type: 'exact',
                functionality: function(chat, cmd) {
                    if (this.type === 'exact' && chat.message.length !== cmd.length) return
                    void(0);
                    if (!bot.commands.executable(this.rank, chat)) return void(0);
                    else {
                        if (bot.settings.msgEnabled) {
                            bot.settings.msgEnabled = !bot.settings.msgEnabled;
                            API.sendChat(subChat(bot.chat.toggleoff, {
                                name: chat.un,
                                'function': bot.chat.msg
                            }));
                        } else {
                            bot.settings.msgEnabled = !bot.settings.msgEnabled;
                            API.sendChat(subChat(bot.chat.toggleon, {
                                name: chat.un,
                                'function': bot.chat.msg
                            }));
                        }
                    }
                }
            },
            statusCommand: {
                command: 'status',
                rank: 'user',
                type: 'startsWith',
                functionality: function(chat, cmd) {
                    if (this.type === 'exact' && chat.message.length !== cmd.length) return
                    void(0);
                    if (!bot.commands.executable(this.rank, chat)) return void(0);
                    else {
                        var msg = chat.message;
                        if (msg.length === cmd.length) return API.sendChat(subChat(bot.chat.nouserspecified, {
                            name: chat.un
                        }));
                        var name = msg.substring(cmd.length + 2);
                        var user = bot.userUtilities.lookupUserName(name);
                        if (typeof user === 'boolean') return API.sendChat(subChat(bot.chat.invaliduserspecified, {
                            name: chat.un
                        }));
                        var join = bot.userUtilities.getJointime(user);
                        var time = Date.now() - join;
                        var timeString = bot.roomUtilities.msToStr(time);
                        API.sendChat(subChat(bot.chat.jointime, {
                            namefrom: chat.un,
                            username: name,
                            time: timeString
                        }));
                    }
                }
            },
            unbanCommand: {
                command: 'unban',
                rank: 'bouncer',
                type: 'startsWith',
                functionality: function(chat, cmd) {
                    if (this.type === 'exact' && chat.message.length !== cmd.length) return
                    void(0);
                    if (!bot.commands.executable(this.rank, chat)) return void(0);
                    else {
                        var msg = chat.message;
                        if (msg.length === cmd.length) return API.sendChat();
                        var name = msg.substring(cmd.length + 2);
                        var bannedUsers = API.getBannedUsers();
                        var found = false;
                        var bannedUser = null;
                        for (var i = 0; i < bannedUsers.length; i++) {
                            var user = bannedUsers[i];
                            if (user.username === name) {
                                bannedUser = user;
                                API.moderateUnbanUser(bannedUser.id);
                                console.log("Unbanned " + name);
                            }
                        }
                        if (!found) {
                            $(".icon-chat").click();
                            return API.sendChat(subChat(bot.chat.notbanned, {
                                name: chat.un
                            }));
                        }
                    }
                }
            },
            unlockCommand: {
                command: 'unlock',
                rank: 'manager',
                type: 'exact',
                functionality: function(chat, cmd) {
                    if (this.type === 'exact' && chat.message.length !== cmd.length) return
                    void(0);
                    if (!bot.commands.executable(this.rank, chat)) return void(0);
                    else {
                        bot.roomUtilities.booth.unlockBooth();
                    }
                }
            },
            unmuteCommand: {
                command: 'unmute',
                rank: 'bouncer',
                type: 'startsWith',
                functionality: function(chat, cmd) {
                    if (this.type === 'exact' && chat.message.length !== cmd.length) return
                    void(0);
                    if (!bot.commands.executable(this.rank, chat)) return void(0);
                    else {
                        var msg = chat.message;
                        var permFrom = bot.userUtilities.getPermission(chat.uid);
                        var from = chat.un;
                        var name = msg.substr(cmd.length + 2);
                        var user = bot.userUtilities.lookupUserName(name);
                        if (typeof user === 'boolean') return API.sendChat(subChat(bot.chat.invaliduserspecified, {
                            name: chat.un
                        }));
                        var permUser = bot.userUtilities.getPermission(user.id);
                        if (permFrom > permUser) {
                            try {
                                API.moderateUnmuteUser(user.id);
                                API.sendChat(subChat(bot.chat.unmuted, {
                                    name: chat.un,
                                    username: name
                                }));
                            } catch (e) {
                                API.sendChat(subChat(bot.chat.notmuted, {
                                    name: chat.un
                                }));
                            }
                        } else API.sendChat(subChat(bot.chat.unmuterank, {
                            name: chat.un
                        }));
                    }
                }
            },
            usercommandsCommand: {
                command: 'usercommands',
                rank: 'manager',
                type: 'exact',
                functionality: function(chat, cmd) {
                    if (this.type === 'exact' && chat.message.length !== cmd.length) return
                    void(0);
                    if (!bot.commands.executable(this.rank, chat)) return void(0);
                    else {
                        if (bot.settings.usercommandsEnabled) {
                            API.sendChat(subChat(bot.chat.toggleoff, {
                                name: chat.un,
                                'function': bot.chat.usercommands
                            }));
                            bot.settings.usercommandsEnabled = !bot.settings.usercommandsEnabled;
                        } else {
                            API.sendChat(subChat(bot.chat.toggleon, {
                                name: chat.un,
                                'function': bot.chat.usercommands
                            }));
                            bot.settings.usercommandsEnabled = !bot.settings.usercommandsEnabled;
                        }
                    }
                }
            },
            voteskipCommand: {
                command: 'voteskip',
                rank: 'manager',
                type: 'startsWith',
                functionality: function(chat, cmd) {
                    if (this.type === 'exact' && chat.message.length !== cmd.length) return
                    void(0);
                    if (!bot.commands.executable(this.rank, chat)) return void(0);
                    else {
                        var msg = chat.message;
                        if (msg.length <= cmd.length + 1) return API.sendChat(subChat(bot.chat.voteskiplimit, {
                            name: chat.un,
                            limit: bot.settings.voteSkipLimit
                        }));
                        var argument = msg.substring(cmd.length + 1);
                        if (!bot.settings.voteSkip) bot.settings.voteSkip = !bot.settings.voteSkip;
                        if (isNaN(argument)) {
                            API.sendChat(subChat(bot.chat.voteskipinvalidlimit, {
                                name: chat.un
                            }));
                        } else {
                            bot.settings.voteSkipLimit = argument;
                            API.sendChat(subChat(bot.chat.voteskipsetlimit, {
                                name: chat.un,
                                limit: bot.settings.voteSkipLimit
                            }));
                        }
                    }
                }
            },
            welcomeCommand: {
                command: 'welcome',
                rank: 'manager',
                type: 'exact',
                functionality: function(chat, cmd) {
                    if (this.type === 'exact' && chat.message.length !== cmd.length) return
                    void(0);
                    if (!bot.commands.executable(this.rank, chat)) return void(0);
                    else {
                        if (bot.settings.welcome) {
                            bot.settings.welcome = !bot.settings.welcome;
                            return API.sendChat(subChat(bot.chat.toggleoff, {
                                name: chat.un,
                                'function': bot.chat.welcomemsg
                            }));
                        } else {
                            bot.settings.welcome = !bot.settings.welcome;
                            return API.sendChat(subChat(bot.chat.toggleon, {
                                name: chat.un,
                                'function': bot.chat.welcomemsg
                            }));
                        }
                    }
                }
            },
            websiteCommand: {
                command: 'website',
                rank: 'user',
                type: 'exact',
                functionality: function(chat, cmd) {
                    if (this.type === 'exact' && chat.message.length !== cmd.length) return
                    void(0);
                    if (!bot.commands.executable(this.rank, chat)) return void(0);
                    else {
                        API.sendChat(subChat(bot.chat.website, {
                            url: bot.settings.website
                        }));
                    }
                }
            },
            fireCommand: {
                command: 'fire',
                rank: 'user',
                type: 'exact',
                functionality: function(chat, cmd) {
                    if (this.type === 'exact' && chat.message.length !== cmd.length) return
                    void(0);
                    if (!bot.commands.executable(this.rank, chat)) return void(0);
                    else {
                        if (bot.settings.shell) {
                            bot.settings.shell = false;
                            API.sendChat(subChat(bot.chat.fire, {
                                name: chat.un
                            }));
                            setTimeout(function() {
                                var random = Math.random() * 10;
                                var pushback = Math.floor(Math.random() * 5) + 1;
                                if (random > 4) {
                                    var index = Math.floor(Math.random() * (API.getUsers().length - 1));
                                    bot.settings.target = API.getUser(API.getUsers()[index]).id;
                                } else bot.settings.target = chat.uid;
                                API.sendChat(subChat(bot.chat.target));
                            }, 7000);
                            setTimeout(function() {
                                if (API.getWaitList().length === 0 || API.getWaitListPosition(bot.settings.target === -1)) API.sendChat(subChat(bot.chat.shellmiss));
                                else if (API.getWaitList().length <= pushback + bot.settings.target) pushback = API.getWaitList().length;
                                else {
                                    pushback += bot.settings.target;
                                    API.sendChat(subChat(bot.chat.land, {
                                        name: API.getUser(bot.settings.target).username,
                                        position: pushback
                                    }))
                                    API.moderateMoveDJ(bot.settings.target, pushback, false);
                                }
                            }, 10000);
                            setTimeout(function() {
                                API.sendChat(subChat(bot.chat.foundshell));
                                bot.settings.shell = false;
                                bot.settings.target = null;
                            }, 60000);
                        } else API.sendChat(subChat(bot.chat.noshell));
                    }
                }
            },
            attackCommand: {
                command: 'attack',
                rank: 'user',
                type: 'exact',
                functionality: function(chat, cmd) {
                    if (this.type === 'exact' && chat.message.length !== cmd.length) return
                    void(0);
                    if (!bot.commands.executable(this.rank, chat)) return void(0);
                    else {
                        if (bot.settings.spam && bot.settings.hp <= 5) API.sendChat(subChat(bot.chat.shield));
                        else if (bot.settings.hp > 1) {
                            if (!bot.settings.spam) {
                                bot.settings.heal = bot.settings.hp;
                                setTimeout(function() {
                                    if ((bot.settings.heal - bot.settings.hp) >= 3) {
                                        var heal = bot.settings.heal - bot.settings.hp;
                                        bot.settings.hp += heal;
                                        API.sendChat(subChat(bot.chat.heal, {
                                            hp: heal
                                        }))
                                        bot.settings.spam = false;
                                    }
                                }, 6000);
                            }
                            bot.settings.hp--;
                            var ow = Math.floor(Math.random() * bot.chat.hits.length);
                            API.sendChat(subChat(bot.chat.attack, {
                                hits: bot.chat.hits[ow]
                            }));
                        } else if (bot.settings.hp === 1 && !bot.settings.spam) {
                            API.sendChat(subChat(bot.chat.kill));
                            API.sendChat(subChat(bot.chat.dead));
                            bot.settings.hp = 50;
                            storeToStorage();
                            bot.disconnectAPI();
                            setTimeout(function() {
                                $.getScript(bot.scriptLink);
                                API.sendChat(subChat(bot.chat.reborn));
                            }, 3 * 60000);
                        }
                        bot.settings.spam = true;
                    }
                }
            },
            hpCommand: {
                command: 'hp',
                rank: 'user',
                type: 'exact',
                functionality: function(chat, cmd) {
                    if (this.type === 'exact' && chat.message.length !== cmd.length) return
                    void(0);
                    if (!bot.commands.executable(this.rank, chat)) return void(0);
                    else {
                        if (bot.settings.hp > 0) API.sendChat(subChat(bot.chat.hp, {
                            hp: bot.settings.hp
                        }));
                    }
                }
            },
            acceptCommand: {
                command: 'accept',
                rank: 'user',
                type: 'exact',
                functionality: function(chat, cmd) {
                    if (this.type === 'exact' && chat.message.length !== cmd.length) return
                    void(0);
                    if (!bot.commands.executable(this.rank, chat)) return void(0);
                    else {
                        if (bot.settings.fighter1 === null) API.sendChat(subChat(bot.chat.nochallenge, {
                            name: chat.un
                        }));
                        else if (chat.un === bot.settings.fighter2) {
                            clearTimeout(bot.settings.timeout);
                            bot.settings.challenge = true;
                            API.sendChat(subChat(bot.chat.acceptedchallenge, {
                                name1: bot.settings.fighter2,
                                name2: bot.settings.fighter1
                            }));
                            var random = Math.random() * 2;
                            if (random > 1) {
                                setTimeout(function() {
                                    API.sendChat(subChat(bot.chat.winningchallenger, {
                                        name1: bot.settings.fighter1,
                                        name2: bot.settings.fighter2
                                    }));
                                }, 3000);
                                setTimeout(function() {
                                    var id1 = API.getWaitListPosition(bot.userUtilities.lookupUserName(bot.settings.fighter1).id);
                                    var id2 = API.getWaitListPosition(bot.userUtilities.lookupUserName(bot.settings.fighter2).id);
                                    if (id1 === -1 || id2 === -1) API.sendChat(bot.chat.notonwaitlist);
                                    else if (id2 < id1) {
                                        API.sendChat(bot.chat.swap);
                                        API.moderateMoveDJ(bot.userUtilities.lookupUserName(bot.settings.fighter1).id, id2 + 1, false);
                                        API.moderateMoveDJ(bot.userUtilities.lookupUserName(bot.settings.fighter2).id, id1 + 1, false);
                                    } else API.sendChat(subChat(bot.chat.unnecessaryswap, {
                                        name: bot.settings.fighter1
                                    }));
                                    bot.settings.fighter1 = null;
                                    bot.settings.fighter2 = null;
                                    bot.settings.challenge = false;
                                }, 5000);
                            } else {
                                setTimeout(function() {
                                    API.sendChat(subChat(bot.chat.winningchallenger, {
                                        name1: bot.settings.fighter2,
                                        name2: bot.settings.fighter1
                                    }));
                                }, 3000);
                                setTimeout(function() {
                                    var id1 = API.getWaitListPosition(bot.userUtilities.lookupUserName(bot.settings.fighter1).id);
                                    var id2 = API.getWaitListPosition(bot.userUtilities.lookupUserName(bot.settings.fighter2).id);
                                    if (id1 === -1 || id2 === -1) API.sendChat(bot.chat.notonwaitlist);
                                    else if (id1 < id2) {
                                        API.sendChat(bot.chat.swap);
                                        API.moderateMoveDJ(bot.userUtilities.lookupUserName(bot.settings.fighter2).id, id1 + 1, false);
                                        API.moderateMoveDJ(bot.userUtilities.lookupUserName(bot.settings.fighter1).id, id2 + 1, false);
                                    } else API.sendChat(subChat(bot.chat.unnecessaryswap, {
                                        name: bot.settings.fighter2
                                    }));
                                    bot.settings.fighter1 = null;
                                    bot.settings.fighter2 = null;
                                    bot.settings.challenge = false;
                                }, 5000);
                            }
                        } else {
                            API.sendChat(subChat(bot.chat.notchallenged, {
                                name: chat.un
                            }));
                        }
                    }
                }
            },
            declineCommand: {
                command: ['decline', 'cancel'],
                rank: 'user',
                type: 'exact',
                functionality: function(chat, cmd) {
                    if (this.type === 'exact' && chat.message.length !== cmd.length) return
                    void(0);
                    if (!bot.commands.executable(this.rank, chat)) return void(0);
                    else {
                        if (bot.settings.fighter1 === null) API.sendChat(subChat(bot.chat.nochallenge, {
                            name: chat.un
                        }));
                        else if ((chat.un === bot.settings.fighter2 || chat.un === bot.settings.fighter1) && bot.settings.challenge) {
                            API.sendChat(subChat(bot.chat.rejectcancel));
                        } else if ((chat.un === bot.settings.fighter2 || chat.un === bot.settings.fighter1) && !bot.settings.challenge) {
                            clearTimeout(bot.settings.timeout);
                            API.sendChat(subChat(bot.chat.acceptcancel));
                            bot.settings.fighter1 = null;
                            bot.settings.fighter2 = null;
                        } else {
                            API.sendChat(subChat(bot.chat.notchallenged, {
                                name: chat.un
                            }));
                        }
                    }
                }
            },
            challengeCommand: {
                command: 'challenge',
                rank: 'user',
                type: 'startsWith',
                functionality: function(chat, cmd) {
                    if (this.type === 'exact' && chat.message.length !== cmd.length) return
                    void(0);
                    var msg = chat.message;
                    var space = msg.indexOf(' ');
                    if (bot.settings.fighter1 !== null || bot.settings.challenge) {
                        API.sendChat(bot.chat.challengeexists);
                        return false;
                    } else if (space === -1) {
                        API.sendChat(bot.chat.nochallenger);
                        return false;
                    } else {
                        var name = msg.substring(space + 2);
                        var user = bot.userUtilities.lookupUserName(name);
                        if (user === false || !user.inRoom) {
                            return API.sendChat(subChat(bot.chat.nothere, {
                                name: name
                            }));
                        } else if (user.username === chat.un) {
                            return API.sendChat(subChat(bot.chat.selfchallenge));
                        } else {
                            bot.settings.fighter1 = chat.un;
                            bot.settings.fighter2 = user.username;
                            bot.settings.timeout = setTimeout(function() {
                                if (!bot.settings.challenge) {
                                    bot.settings.fighter1 = null;
                                    bot.settings.fighter2 = null;
                                    API.sendChat(subChat(bot.chat.withdraw, {
                                        name1: chat.un,
                                        name2: user.username
                                    }));
                                }
                            }, 30000);
                            return API.sendChat(subChat(bot.chat.battle, {
                                name1: bot.settings.fighter1,
                                name2: bot.settings.fighter2,
                                name3: bot.settings.fighter2
                            }));
                        }
                    }
                }
            }
        }
    }
    loadChat(bot.startup);
}).call(this);
