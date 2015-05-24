(function() {
    API.getWaitListPosition = function(c) {
        if (typeof c === 'undefined' || c === null) {
            c = API.getUser().id
        }
        var d = API.getWaitList();
        for (var b = 0; b < d.length; b++) {
            if (d[b].id === c) {
                return b
            }
        }
        return -1
    };
    var g = function() {
        clearInterval(b.room.afkInterval);
        b.status = false
    };
    var d = function() {
        localStorage.setItem("basicBotsettings", JSON.stringify(b.settings));
        localStorage.setItem("basicBotRoom", JSON.stringify(b.room));
        var c = {
            time: Date.now(),
            stored: true,
        };
        localStorage.setItem("basicBotStorageInfo", JSON.stringify(c))
    };
    var c = function(b, e) {
        if (typeof b === "undefined") {
            API.chatLog("There is a chat text missing.");
            console.log("There is a chat text missing.");
            return "[Error] No text message found."
        }
        var c = '%%';
        for (var d in e) {
            b = b.replace(c + d.toUpperCase() + c, e[d])
        }
        return b
    };
    var i = function() {
        var c = JSON.parse(localStorage.getItem("basicBotsettings"));
        if (c !== null) {
            for (var d in c) {
                b.settings[d] = c[d]
            }
        }
    };
    var h = function() {
        var e = localStorage.getItem("basicBotStorageInfo");
        if (e === null) API.chatLog(b.chat.nodatafound);
        else {
            var i = JSON.parse(localStorage.getItem("basicBotsettings"));
            var c = JSON.parse(localStorage.getItem("basicBotRoom"));
            var l = Date.now() - JSON.parse(e).time;
            if ((l < 1 * 60 * 60 * 1000)) {
                API.chatLog(b.chat.retrievingdata);
                for (var j in i) {
                    b.settings[j] = i[j]
                }
                b.room.users = c.users;
                b.room.afkList = c.afkList;
                b.room.historyList = c.historyList;
                b.room.mutedUsers = c.mutedUsers;
                b.room.autoskip = c.autoskip;
                b.room.roomstats = c.roomstats;
                b.room.messages = c.messages;
                b.room.queue = c.queue;
                b.room.newBlacklisted = c.newBlacklisted;
                API.chatLog(b.chat.datarestored)
            }
        }
        var g = null;
        var m = document.getElementById("room-settings");
        e = m.textContent;
        var h = "@basicBot=";
        var k = e.indexOf(h);
        if (k > 0) {
            var d = e.substring(k + h.length, e.length);
            var f = null;
            if (d.indexOf(" ") < d.indexOf("\n")) f = d.indexOf(" ");
            else f = d.indexOf("\n");
            d = d.substring(0, f);
            $.get(d, function(c) {
                if (c !== null && typeof c !== "undefined") {
                    g = JSON.parse(c);
                    for (var d in g) {
                        b.settings[d] = g[d]
                    }
                }
            })
        }
    };
    String.prototype.splitBetween = function(g, f) {
        var c = this;
        c = this.split(g);
        for (var b = 0; b < c.length; b++) {
            c[b] = c[b].split(f)
        }
        var e = [];
        for (var i = 0; b < c.length; b++) {
            if (Array.isArray(c[b])) {
                for (var d = 0; d < c[b].length; d++) {
                    e.push(c[b][d])
                }
            } else e.push(c[b])
        }
        return e
    };
    var j = function(e) {
        var c = e.splitBetween('<a href="', '<\/a>');
        for (var b = 1; b < c.length; b = b + 2) {
            var f = c[b].split('"')[0];
            c[b] = f
        }
        var d = '';
        for (var i = 0; b < c.length; b++) {
            d += c[b]
        }
        return d
    };
    var k = "Matthew (Yemasthui)";
    var l = "Benzi (Quoona)";
    var f = ["3851534", "4105209"];
    var b = {
        status: false,
        name: "RoyalsBot",
        loggedInID: null,
        scriptLink: "https://rawgit.com/iEclipse/basicBot-customization/master/basicBot.js",
        cmdLink: "https://github.com/iEclipse/basicBot-customization/blob/master/README.md#royalsbot-commands",
        chatLink: "https://rawgit.com/iEclipse/basicBot-customization/master/en.json",
        chat: null,
        loadChat: e,
        retrieveSettings: i,
        retrieveFromStorage: h,
        settings: {
            botName: "RoyalsBot",
            language: "english",
            startupCap: 30,
            startupVolume: 50,
            startupEmoji: false,
            cmdDeletion: true,
            chatLink: "https://rawgit.com/iEclipse/basicBot-customization/master/en.json",
            hp: 20,
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
            commandCooldown: 30,
            usercommandsEnabled: true,
            lockskipPosition: 1,
            afkpositionCheck: 1,
            motdEnabled: true,
            motdInterval: 3,
            motd: "Notice: Use !help for a list of commands.",
            filterChat: true,
            etaRestriction: false,
            welcome: true,
            rulesLink: null,
            themeLink: null,
            intervalMessages: [],
            messageInterval: 5,
            songstats: false,
            commandLiteral: "!",
            blacklists: {}
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
            autoskip: true,
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
            blacklists: {},
            newBlacklisted: [],
            newBlacklistedSongFunction: null,
            roulette: {
                rouletteStatus: false,
                participants: [],
                countdown: null,
                startRoulette: function() {
                    b.room.roulette.rouletteStatus = true;
                    API.sendChat(b.chat.isopen);
                    setTimeout(function() {
                        API.sendChat(c(b.chat.ishalfway))
                    }, 30 * 1000);
                    setTimeout(function() {
                        API.sendChat(c(b.chat.isnearend))
                    }, 20 * 1000);
                    b.room.roulette.countdown = setTimeout(function() {
                        b.room.roulette.endRoulette()
                    }, 10 * 1000)
                },
                endRoulette: function() {
                    b.room.roulette.rouletteStatus = false;
                    var g = Math.floor(Math.random() * b.room.roulette.participants.length);
                    var d = b.room.roulette.participants[g];
                    b.room.roulette.participants = [];
                    var e = Math.floor((Math.random() * API.getWaitList().length) + 1);
                    var f = b.userUtilities.lookupUser(d);
                    var h = f.username;
                    API.sendChat(c(b.chat.winnerpicked, {
                        name: h,
                        position: e
                    }));
                    setTimeout(function(d, c) {
                        b.userUtilities.moveUser(d, c, false)
                    }, 1 * 1000, d, e)
                }
            }
        },
        User: function(b, c) {
            this.id = b;
            this.username = c;
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
            this.lastKnownPosition = null
        },
        userUtilities: {
            getJointime: function(b) {
                return b.jointime
            },
            getUser: function(b) {
                return API.getUser(b.id)
            },
            updatePosition: function(c, b) {
                c.lastKnownPosition = b
            },
            updateDC: function(c) {
                c.lastDC.time = Date.now();
                c.lastDC.position = c.lastKnownPosition;
                c.lastDC.songCount = b.room.roomstats.songCount
            },
            setLastActivity: function(b) {
                b.lastActivity = Date.now();
                b.afkWarningCount = 0;
                clearTimeout(b.afkCountdown)
            },
            getLastActivity: function(b) {
                return b.lastActivity
            },
            getWarningCount: function(b) {
                return b.afkWarningCount
            },
            setWarningCount: function(b, c) {
                b.afkWarningCount = c
            },
            lookupUser: function(d) {
                for (var c = 0; c < b.room.users.length; c++) {
                    if (b.room.users[c].id === d) {
                        return b.room.users[c]
                    }
                }
                return false
            },
            lookupUserName: function(e) {
                for (var c = 0; c < b.room.users.length; c++) {
                    var d = b.room.users[c].username.trim() == e.trim();
                    if (d) {
                        return b.room.users[c]
                    }
                }
                return false
            },
            getPermission: function(d) {
                var b;
                if (typeof d === "object") b = d;
                else b = API.getUser(d);
                for (var c = 0; c < f.length; c++) {
                    if (f[c].indexOf(b.id) > -1) return 10
                }
                if (b.gRole < 2) return b.role;
                else {
                    switch (b.gRole) {
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
                return 0
            },
            moveUser: function(d, e, j) {
                var k = b.userUtilities.lookupUser(d);
                var h = API.getWaitList();
                if (API.getWaitListPosition(d) === -1) {
                    if (h.length < 50) {
                        API.moderateAddDJ(d);
                        if (e !== 0) setTimeout(function(b, c) {
                            API.moderateMoveDJ(b, c)
                        }, 1250, d, e)
                    } else {
                        var g = -1;
                        for (var f = 0; f < b.room.queue.id.length; f++) {
                            if (b.room.queue.id[f] === d) g = f
                        }
                        if (g !== -1) {
                            b.room.queue.position[g] = e;
                            return API.sendChat(c(b.chat.alreadyadding, {
                                position: b.room.queue.position[g]
                            }))
                        }
                        b.roomUtilities.booth.lockBooth();
                        if (j) {
                            b.room.queue.id.unshift(d);
                            b.room.queue.position.unshift(e)
                        } else {
                            b.room.queue.id.push(d);
                            b.room.queue.position.push(e)
                        }
                        var i = k.username;
                        return API.sendChat(c(b.chat.adding, {
                            name: i,
                            position: b.room.queue.position.length
                        }))
                    }
                } else API.moderateMoveDJ(d, e)
            },
            dclookup: function(o) {
                var d = b.userUtilities.lookupUser(o);
                if (typeof d === 'boolean') return b.chat.usernotfound;
                var q = d.username;
                if (d.lastDC.time === null) return c(b.chat.notdisconnected, {
                    name: q
                });
                var j = d.lastDC.time;
                var m = d.lastDC.position;
                if (m === null) return b.chat.noposition;
                var l = Date.now() - j;
                var h = false;
                if (b.settings.maximumDc * 60 * 1000 > l) {
                    h = true
                }
                var i = b.roomUtilities.msToStr(l);
                if (!h) return (c(b.chat.toolongago, {
                    name: b.userUtilities.getUser(d).username,
                    time: i
                }));
                var p = b.room.roomstats.songCount - d.lastDC.songCount;
                var k = 0;
                var g = b.room.afkList;
                for (var e = 0; e < g.length; e++) {
                    var s = g[e][1];
                    var n = g[e][2];
                    if (j < s && n < m) {
                        k++
                    }
                }
                var f = d.lastDC.position - p - k;
                if (f <= 0) f = 1;
                var r = c(b.chat.valid, {
                    name: b.userUtilities.getUser(d).username,
                    time: i,
                    position: f
                });
                b.userUtilities.moveUser(d.id, f, true);
                return r
            }
        },
        roomUtilities: {
            rankToNumber: function(c) {
                var b = null;
                switch (c) {
                    case "admin":
                        b = 10;
                        break;
                    case "host":
                        b = 5;
                        break;
                    case "cohost":
                        b = 4;
                        break;
                    case "manager":
                        b = 3;
                        break;
                    case "bouncer":
                        b = 2;
                        break;
                    case "residentdj":
                        b = 1;
                        break;
                    case "ambassador":
                        b = 0;
                        break;
                    case "user":
                        b = 0;
                        break;
                }
                return b
            },
            msToStr: function(c) {
                var d, e, b;
                e = '';
                b = {
                    'days': 0,
                    'hours': 0,
                    'minutes': 0,
                    'seconds': 0
                };
                d = {
                    'day': 24 * 60 * 60 * 1000,
                    'hour': 60 * 60 * 1000,
                    'minute': 60 * 1000,
                    'second': 1000
                };
                if (c > d.day) {
                    b.days = Math.floor(c / d.day);
                    c = c % d.day
                }
                if (c > d.hour) {
                    b.hours = Math.floor(c / d.hour);
                    c = c % d.hour
                }
                if (c > d.minute) {
                    b.minutes = Math.floor(c / d.minute);
                    c = c % d.minute
                }
                if (c > d.second) {
                    b.seconds = Math.floor(c / d.second)
                }
                if (b.days !== 0) {
                    e += b.days.toString() + 'd'
                }
                if (b.hours !== 0) {
                    e += b.hours.toString() + 'h'
                }
                if (b.minutes !== 0) {
                    e += b.minutes.toString() + 'm'
                }
                if (b.minutes < 1 && b.hours < 1 && b.days < 1) {
                    e += b.seconds.toString() + 's'
                }
                if (e !== '') {
                    return e
                } else {
                    return false
                }
            },
            booth: {
                lockTimer: setTimeout(function() {}, 1000),
                locked: false,
                lockBooth: function() {
                    API.moderateLockWaitList(!b.roomUtilities.booth.locked);
                    b.roomUtilities.booth.locked = false;
                    if (b.settings.lockGuard) {
                        b.roomUtilities.booth.lockTimer = setTimeout(function() {
                            API.moderateLockWaitList(b.roomUtilities.booth.locked)
                        }, b.settings.maximumLocktime * 60 * 1000)
                    }
                },
                unlockBooth: function() {
                    API.moderateLockWaitList(b.roomUtilities.booth.locked);
                    clearTimeout(b.roomUtilities.booth.lockTimer)
                }
            },
            afkCheck: function() {
                if (!b.status || !b.settings.afkRemoval) return void(0);
                var n = b.roomUtilities.rankToNumber(b.settings.afkRankCheck);
                var e = API.getWaitList();
                var m = Math.min(e.length, b.settings.afkpositionCheck);
                if (m - 1 > e.length) return void(0);
                for (var f = 0; f < m; f++) {
                    if (typeof e[f] !== 'undefined') {
                        var h = e[f].id;
                        var d = b.userUtilities.lookupUser(h);
                        if (typeof d !== 'boolean') {
                            var k = b.userUtilities.getUser(d);
                            if (n !== null && b.userUtilities.getPermission(k) <= n) {
                                var j = k.username;
                                var p = b.userUtilities.getLastActivity(d);
                                var o = Date.now() - p;
                                var l = b.roomUtilities.msToStr(o);
                                var i = d.afkWarningCount;
                                if (o > b.settings.maximumAfk * 60 * 1000) {
                                    if (i === 0) {
                                        API.sendChat(c(b.chat.warning1, {
                                            name: j,
                                            time: l
                                        }));
                                        d.afkWarningCount = 3;
                                        d.afkCountdown = setTimeout(function(b) {
                                            b.afkWarningCount = 1
                                        }, 90 * 1000, d)
                                    } else if (i === 1) {
                                        API.sendChat(c(b.chat.warning2, {
                                            name: j
                                        }));
                                        d.afkWarningCount = 3;
                                        d.afkCountdown = setTimeout(function(b) {
                                            b.afkWarningCount = 2
                                        }, 30 * 1000, d)
                                    } else if (i === 2) {
                                        var g = API.getWaitListPosition(h);
                                        if (g !== -1) {
                                            g++;
                                            b.room.afkList.push([h, Date.now(), g]);
                                            d.lastDC = {
                                                time: null,
                                                position: null,
                                                songCount: 0
                                            };
                                            API.moderateRemoveDJ(h);
                                            API.sendChat(c(b.chat.afkremove, {
                                                name: j,
                                                time: l,
                                                position: g,
                                                maximumafk: b.settings.maximumAfk
                                            }))
                                        }
                                        d.afkWarningCount = 0
                                    }
                                }
                            }
                        }
                    }
                }
            },
            changeDJCycle: function() {
                var c = $(".cycle-toggle");
                if (c.hasClass("disabled")) {
                    c.click();
                    if (b.settings.cycleGuard) {
                        b.room.cycleTimer = setTimeout(function() {
                            if (c.hasClass("enabled")) c.click()
                        }, b.settings.cycleMaxTime * 60 * 1000)
                    }
                } else {
                    c.click();
                    clearTimeout(b.room.cycleTimer)
                }
            },
            intervalMessage: function() {
                var d;
                if (b.settings.motdEnabled) d = b.settings.motdInterval;
                else d = b.settings.messageInterval;
                if ((b.room.roomstats.songCount % d) === 0 && b.status) {
                    var c;
                    if (b.settings.motdEnabled) {
                        c = b.settings.motd
                    } else {
                        if (b.settings.intervalMessages.length === 0) return void(0);
                        var e = b.room.roomstats.songCount % b.settings.intervalMessages.length;
                        c = b.settings.intervalMessages[e]
                    }
                    API.sendChat('/me ' + c)
                }
            },
            updateBlacklists: function() {
                for (var c in b.settings.blacklists) {
                    b.room.blacklists[c] = [];
                    if (typeof b.settings.blacklists[c] === 'function') {
                        b.room.blacklists[c] = b.settings.blacklists()
                    } else if (typeof b.settings.blacklists[c] === 'string') {
                        if (b.settings.blacklists[c] === '') {
                            continue
                        }
                        try {
                            (function(c) {
                                $.get(b.settings.blacklists[c], function(d) {
                                    if (typeof d === 'string') {
                                        d = JSON.parse(d)
                                    }
                                    var f = [];
                                    for (var e in d) {
                                        if (typeof d[e].mid !== 'undefined') {
                                            f.push(d[e].mid)
                                        }
                                    }
                                    b.room.blacklists[c] = f
                                })
                            })(c)
                        } catch (b) {
                            API.chatLog('Error setting' + c + 'blacklist.');
                            console.log('Error setting' + c + 'blacklist.');
                            console.log(b)
                        }
                    }
                }
            },
            logNewBlacklistedSongs: function() {
                if (typeof console.table !== 'undefined') {
                    console.table(b.room.newBlacklisted)
                } else {
                    console.log(b.room.newBlacklisted)
                }
            },
            exportNewBlacklistedSongs: function() {
                var d = {};
                for (var e = 0; e < b.room.newBlacklisted.length; e++) {
                    var c = b.room.newBlacklisted[e];
                    d[c.list] = [];
                    d[c.list].push({
                        title: c.title,
                        author: c.author,
                        mid: c.mid
                    })
                }
                return d
            }
        },
        eventChat: function(c) {
            c.message = j(c.message);
            c.message = c.message.trim();
            for (var d = 0; d < b.room.users.length; d++) {
                if (b.room.users[d].id === c.uid) {
                    b.userUtilities.setLastActivity(b.room.users[d]);
                    if (b.room.users[d].username !== c.un) {
                        b.room.users[d].username = c.un
                    }
                }
            }
            if (b.chatUtilities.chatFilter(c)) return void(0);
            if (!b.chatUtilities.commandCheck(c)) b.chatUtilities.action(c)
        },
        eventUserjoin: function(d) {
            var i = false;
            var h = null;
            for (var f = 0; f < b.room.users.length; f++) {
                if (b.room.users[f].id === d.id) {
                    i = true;
                    h = f
                }
            }
            var j = true;
            var g = null;
            if (i) {
                b.room.users[h].inRoom = true;
                var m = b.userUtilities.lookupUser(d.id);
                var k = m.jointime;
                var l = Date.now() - k;
                if (l < 10 * 1000) j = false;
                else g = true
            } else {
                b.room.users.push(new b.User(d.id, d.username));
                g = false
            }
            for (var e = 0; e < b.room.users.length; e++) {
                if (b.userUtilities.getUser(b.room.users[e]).id === d.id) {
                    b.userUtilities.setLastActivity(b.room.users[e]);
                    b.room.users[e].jointime = Date.now()
                }
            }
            if (b.settings.welcome && j) {
                g ? setTimeout(function(d) {
                    API.sendChat(c(b.chat.welcomeback, {
                        name: d.username
                    }))
                }, 1 * 1000, d) : setTimeout(function(d) {
                    API.sendChat(c(b.chat.welcome, {
                        name: d.username
                    }))
                }, 1 * 1000, d)
            }
        },
        eventUserleave: function(d) {
            for (var c = 0; c < b.room.users.length; c++) {
                if (b.room.users[c].id === d.id) {
                    b.userUtilities.updateDC(b.room.users[c]);
                    b.room.users[c].inRoom = false
                }
            }
        },
        eventVoteupdate: function(e) {
            for (var d = 0; d < b.room.users.length; d++) {
                if (b.room.users[d].id === e.user.id) {
                    if (e.vote === 1) {
                        b.room.users[d].votes.woot++
                    } else {
                        b.room.users[d].votes.meh++
                    }
                }
            }
            var h = API.getScore().negative;
            var f = API.getScore().positive;
            var g = API.getDJ();
            if (b.settings.voteSkip) {
                if ((h - f) >= (b.settings.voteSkipLimit)) {
                    API.sendChat(c(b.chat.voteskipexceededlimit, {
                        name: g.username,
                        limit: b.settings.voteSkipLimit
                    }));
                    API.moderateForceSkip()
                }
            }
        },
        eventCurateupdate: function(d) {
            for (var c = 0; c < b.room.users.length; c++) {
                if (b.room.users[c].id === d.user.id) {
                    b.room.users[c].votes.curate++
                }
            }
        },
        eventDjadvance: function(f) {
            $("#woot").click();
            var g = b.userUtilities.lookupUser(f.dj.id);
            for (var h = 0; h < b.room.users.length; h++) {
                if (b.room.users[h].id === g.id) {
                    b.room.users[h].lastDC = {
                        time: null,
                        position: null,
                        songCount: 0
                    }
                }
            }
            var e = f.lastPlay;
            if (typeof e === 'undefined') return;
            if (b.settings.songstats) {
                if (typeof b.chat.songstatistics === "undefined") {
                    API.sendChat("/me " + e.media.author + " - " + e.media.title + ": " + e.score.positive + "W/" + e.score.grabs + "G/" + e.score.negative + "M.")
                } else {
                    API.sendChat(c(b.chat.songstatistics, {
                        artist: e.media.author,
                        title: e.media.title,
                        woots: e.score.positive,
                        grabs: e.score.grabs,
                        mehs: e.score.negative
                    }))
                }
            }
            b.room.roomstats.totalWoots += e.score.positive;
            b.room.roomstats.totalMehs += e.score.negative;
            b.room.roomstats.totalCurates += e.score.grabs;
            b.room.roomstats.songCount++;
            b.roomUtilities.intervalMessage();
            b.room.currentDJID = f.dj.id;
            var p = f.media.format + ':' + f.media.cid;
            for (var k in b.room.blacklists) {
                if (b.settings.blacklistEnabled) {
                    if (b.room.blacklists[k].indexOf(p) > -1) {
                        API.sendChat(c(b.chat.isblacklisted, {
                            blacklist: k
                        }));
                        return API.moderateForceSkip()
                    }
                }
            }
            clearTimeout(o);
            if (b.settings.historySkip) {
                var j = false;
                var l = API.getHistory();
                var i = f.dj.username;
                var o = setTimeout(function() {
                    for (var d = 0; d < l.length; d++) {
                        if (l[d].media.cid === f.media.cid) {
                            API.sendChat(c(b.chat.songknown, {
                                name: i
                            }));
                            API.moderateForceSkip();
                            b.room.historyList[d].push(+new Date());
                            j = true
                        }
                    }
                    if (!j) {
                        b.room.historyList.push([f.media.cid, +new Date()])
                    }
                }, 2000)
            }
            var m = f.media;
            if (b.settings.timeGuard && m.duration > b.settings.maximumSongLength * 60 && !b.room.roomevent) {
                var name = f.dj.username;
                API.sendChat(c(b.chat.timelimit, {
                    name: i,
                    maxlength: b.settings.maximumSongLength
                }));
                API.moderateForceSkip()
            }
            if (g.ownSong) {
                API.sendChat(c(b.chat.permissionownsong, {
                    name: g.username
                }));
                g.ownSong = false
            }
            clearTimeout(b.room.autoskipTimer);
            if (b.room.autoskip) {
                var n = f.media.duration * 1000;
                b.room.autoskipTimer = setTimeout(function() {
                    console.log("Skipping track.");
                    API.moderateForceSkip()
                }, n + 3000)
            }
            d()
        },
        eventWaitlistupdate: function(d) {
            if (d.length < 50) {
                if (b.room.queue.id.length > 0 && b.room.queueable) {
                    b.room.queueable = false;
                    setTimeout(function() {
                        b.room.queueable = true
                    }, 500);
                    b.room.queueing++;
                    var f, e;
                    setTimeout(function() {
                        f = b.room.queue.id.splice(0, 1)[0];
                        e = b.room.queue.position.splice(0, 1)[0];
                        API.moderateAddDJ(f, e);
                        setTimeout(function(c, d) {
                            API.moderateMoveDJ(c, d);
                            b.room.queueing--;
                            if (b.room.queue.id.length === 0) setTimeout(function() {
                                b.roomUtilities.booth.unlockBooth()
                            }, 1000)
                        }, 1000, f, e)
                    }, 1000 + b.room.queueing * 2500)
                }
            }
            for (var c = 0; c < d.length; c++) {
                var g = b.userUtilities.lookupUser(d[c].id);
                b.userUtilities.updatePosition(g, API.getWaitListPosition(d[c].id) + 1)
            }
        },
        chatcleaner: function(g) {
            if (!b.settings.filterChat) return false;
            if (b.userUtilities.getPermission(g.uid) > 1) return false;
            var d = g.message;
            var j = false;
            for (var f = 0; f < d.length; f++) {
                e = d.charAt(f);
                if ((e >= 'a' && e <= 'z') || (e >= 'A' && e <= 'Z') || (e >= '0' && e <= '9') || e === ':' || e === '^') j = true
            }
            if (d === '') {
                return true
            }
            if (!j && (d.length === 1 || d.length > 3)) return true;
            d = d.replace(/[ ,;.:\/=~+%^*\-\\"'&@#]/g, '');
            var i = 0;
            var e;
            for (var i = 0; f < d.length; f++) {
                e = d.charAt(f);
                if (e >= 'A' && e <= 'Z') i++
            }
            if (i >= 40) {
                API.sendChat(c(b.chat.caps, {
                    name: g.un
                }));
                return true
            }
            d = d.toLowerCase();
            if (d === 'skip') {
                API.sendChat(c(b.chat.askskip, {
                    name: g.un
                }));
                return true
            }
            for (var h = 0; h < b.chatUtilities.spam.length; h++) {
                if (d === b.chatUtilities.spam[h]) {
                    API.sendChat(c(b.chat.spam, {
                        name: g.un
                    }));
                    return true
                }
            }
            return false
        },
        chatUtilities: {
            chatFilter: function(d) {
                var g = d.message;
                var l = b.userUtilities.getPermission(d.uid);
                var m = b.userUtilities.lookupUser(d.uid);
                var i = false;
                for (var h = 0; h < b.room.mutedUsers.length; h++) {
                    if (b.room.mutedUsers[h] === d.uid) i = true
                }
                if (i) {
                    API.moderateDeleteChat(d.cid);
                    return true
                }
                if (b.settings.lockdownEnabled) {
                    if (l === 0) {
                        API.moderateDeleteChat(d.cid);
                        return true
                    }
                }
                if (b.chatcleaner(d)) {
                    API.moderateDeleteChat(d.cid);
                    return true
                }
                if (g.indexOf('http://adf.ly/') > -1) {
                    API.moderateDeleteChat(d.cid);
                    API.sendChat(c(b.chat.adfly, {
                        name: d.un
                    }));
                    return true
                }
                if (g.indexOf('autojoin was not enabled') > 0 || g.indexOf('AFK message was not enabled') > 0 || g.indexOf('!afkdisable') > 0 || g.indexOf('AFK message disabled') > 0) {
                    API.moderateDeleteChat(d.cid);
                    return true
                }
                var j = b.chat.roulettejoin;
                var k = b.chat.rouletteleave;
                var e = j.split('%%NAME%%');
                if (e[1].length > e[0].length) e = e[1];
                else e = e[0];
                var f = k.split('%%NAME%%');
                if (f[1].length > f[0].length) f = f[1];
                else f = f[0];
                if ((g.indexOf(e) > -1 || g.indexOf(f) > -1) && d.uid === b.loggedInID) {
                    setTimeout(function(b) {
                        API.moderateDeleteChat(b)
                    }, 2 * 1000, d.cid);
                    return true
                }
                return false
            },
            commandCheck: function(c) {
                var g;
                if (c.message.charAt(0) === '!') {
                    var k = c.message.indexOf(' ');
                    if (k === -1) {
                        g = c.message
                    } else g = c.message.substring(0, k)
                } else return false;
                var h = b.userUtilities.getPermission(c.uid);
                if (c.message !== "!join" && c.message !== "!leave") {
                    if (h === 0 && !b.room.usercommand) return void(0);
                    if (!b.room.allcommand) return void(0)
                }
                if (c.message === '!eta' && b.settings.etaRestriction) {
                    if (h < 2) {
                        var i = b.userUtilities.lookupUser(c.uid);
                        if (i.lastEta !== null && (Date.now() - i.lastEta) < 1 * 60 * 60 * 1000) {
                            API.moderateDeleteChat(c.cid);
                            return void(0)
                        } else i.lastEta = Date.now()
                    }
                }
                var f = false;
                for (var j in b.commands) {
                    var d = b.commands[j].command;
                    if (!Array.isArray(d)) {
                        d = [d]
                    }
                    for (var e = 0; e < d.length; e++) {
                        if (b.settings.commandLiteral + d[e] === g) {
                            b.commands[j].functionality(c, b.settings.commandLiteral + d[e]);
                            f = true;
                            break
                        }
                    }
                }
                if (f && h === 0) {
                    b.room.usercommand = false;
                    setTimeout(function() {
                        b.room.usercommand = true
                    }, b.settings.commandCooldown * 1000)
                }
                if (f) {
                    if (b.settings.cmdDeletion) {
                        API.moderateDeleteChat(c.cid)
                    }
                    b.room.allcommand = false;
                    setTimeout(function() {
                        b.room.allcommand = true
                    }, 5 * 1000)
                }
                return f
            },
            action: function(d) {
                var e = b.userUtilities.lookupUser(d.uid);
                if (d.type === 'message') {
                    for (var c = 0; c < b.room.users.length; c++) {
                        if (b.userUtilities.getUser(b.room.users[c]).id === d.uid) {
                            b.userUtilities.setLastActivity(b.room.users[c])
                        }
                    }
                }
                b.room.roomstats.chatmessages++
            },
            spam: ['hueh', 'hu3', 'brbr', 'heu', 'brbr', 'kkkk', 'spoder', 'mafia', 'zuera', 'zueira', 'zueria', 'aehoo', 'aheu', 'alguem', 'algum', 'brazil', 'zoeira', 'fuckadmins', 'affff', 'vaisefoder', 'huenaarea', 'hitler', 'ashua', 'ahsu', 'ashau', 'lulz', 'huehue', 'hue', 'huehuehue', 'merda', 'pqp', 'puta', 'mulher', 'pula', 'retarda', 'caralho', 'filha', 'ppk', 'gringo', 'fuder', 'foder', 'hua', 'ahue', 'modafuka', 'modafoka', 'mudafuka', 'mudafoka', 'ooooooooooooooo', 'foda'],
            curses: ['nigger', 'fag', 'f@g', 'cunt', 'bitch', 'b1tch', 'bltch', 'nigga', 'n1gga', 'n1gg@', 'niqqa', 'n1qqa', 'nigg@', 'fuck3r', 'f@gs', 'motherfucker', 'm0therfucker', 'm0therfuck3r', 'bastard', 'b@st@rd', 'ba5tard', 'b@stard', 'basterd', 'fuck', 'fucker', 'asshole', '@asshole', 'shit', 'sh1t', 'pussy', 'pu55y', 'pu5sy', 'pus5y', 'pussi']
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
                eventHistoryupdate: $.proxy(this.eventHistoryupdate, this)
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
            API.on(API.HISTORY_UPDATE, this.proxy.eventHistoryupdate)
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
            API.off(API.HISTORY_UPDATE, this.proxy.eventHistoryupdate)
        },
        startup: function() {
            Function.prototype.toString = function() {
                return 'Function.'
            };
            var o = API.getUser();
            if (b.userUtilities.getPermission(o) < 2) return API.chatLog(b.chat.greyuser);
            if (b.userUtilities.getPermission(o) === 2) API.chatLog(b.chat.bouncer);
            b.connectAPI();
            API.moderateDeleteChat = function(b) {
                $.ajax({
                    url: "https://plug.dj/_/chat/" + b,
                    type: "DELETE"
                })
            };
            var t = window.location.pathname;
            var n;
            var s = function() {
                if (t != window.location.pathname) {
                    clearInterval(n);
                    console.log("Killing bot after room change.");
                    d();
                    b.disconnectAPI();
                    setTimeout(function() {
                        g()
                    }, 1000)
                }
            };
            n = setInterval(function() {
                s()
            }, 100);
            i();
            h();
            window.bot = b;
            b.roomUtilities.updateBlacklists();
            setInterval(b.roomUtilities.updateBlacklists, 60 * 60 * 1000);
            b.getNewBlacklistedSongs = b.roomUtilities.exportNewBlacklistedSongs;
            b.logNewBlacklistedSongs = b.roomUtilities.logNewBlacklistedSongs;
            if (b.room.roomstats.launchTime === null) {
                b.room.roomstats.launchTime = Date.now()
            }
            for (var f = 0; f < b.room.users.length; f++) {
                b.room.users[f].inRoom = false
            }
            var l = API.getUsers();
            for (var k = 0; k < l.length; k++) {
                var p = false;
                var j = null;
                for (var j = 0; f < b.room.users.length; f++) {
                    if (b.room.users[f].id === l[k].id) {
                        p = true;
                        j = f
                    }
                }
                if (p) {
                    b.room.users[j].inRoom = true
                } else {
                    b.room.users.push(new b.User(l[k].id, l[k].username));
                    j = b.room.users.length - 1
                }
                var r = API.getWaitListPosition(b.room.users[j].id) + 1;
                b.userUtilities.updatePosition(b.room.users[j], r)
            }
            b.room.afkInterval = setInterval(function() {
                b.roomUtilities.afkCheck()
            }, 10 * 1000);
            b.loggedInID = API.getUser().id;
            b.status = true;
            API.sendChat('/cap ' + b.settings.startupCap);
            API.setVolume(b.settings.startupVolume);
            $("#woot").click();
            if (b.settings.startupEmoji) {
                var m = $(".icon-emoji-off");
                if (m.length > 0) {
                    m[0].click()
                }
            } else {
                var q = $(".icon-emoji-on");
                if (q.length > 0) {
                    q[0].click()
                }
            }
            API.chatLog('Avatars capped at ' + b.settings.startupCap);
            API.chatLog('Volume set to ' + b.settings.startupVolume);
            e(API.sendChat(c(b.chat.online, {
                botname: b.settings.botName,
            })))
        },
        commands: {
            executable: function(f, d) {
                var e = d.uid;
                var g = b.userUtilities.getPermission(e);
                var c;
                switch (f) {
                    case 'admin':
                        c = 10;
                        break;
                    case 'host':
                        c = 5;
                        break;
                    case 'cohost':
                        c = 4;
                        break;
                    case 'manager':
                        c = 3;
                        break;
                    case 'mod':
                        if (b.settings.bouncerPlus) {
                            c = 2
                        } else {
                            c = 3
                        }
                        break;
                    case 'bouncer':
                        c = 2;
                        break;
                    case 'residentdj':
                        c = 1;
                        break;
                    case 'ambassador':
                        c = 0;
                        break;
                    case 'user':
                        c = 0;
                        break;
                    default:
                        API.chatLog('error assigning minimum permission');
                }
                return g >= c
            },
            activeCommand: {
                command: 'active',
                rank: 'user',
                type: 'startsWith',
                functionality: function(d, f) {
                    if (this.type === 'exact' && d.message.length !== f.length) return void(0);
                    if (!b.commands.executable(this.rank, d)) return void(0);
                    else {
                        var h = d.message;
                        var j = Date.now();
                        var i = 0;
                        var e;
                        if (h.length === f.length) e = 60;
                        else {
                            e = h.substring(f.length + 1);
                            if (isNaN(e)) return API.sendChat(c(b.chat.invalidtime, {
                                name: d.un
                            }))
                        }
                        for (var g = 0; g < b.room.users.length; g++) {
                            userTime = b.userUtilities.getLastActivity(b.room.users[g]);
                            if ((j - userTime) <= (e * 60 * 1000)) {
                                i++
                            }
                        }
                        API.sendChat(c(b.chat.activeusersintime, {
                            name: d.un,
                            amount: i,
                            time: e
                        }))
                    }
                }
            },
            addCommand: {
                command: 'add',
                rank: 'bouncer',
                type: 'startsWith',
                functionality: function(d, e) {
                    if (this.type === 'exact' && d.message.length !== e.length) return void(0);
                    if (!b.commands.executable(this.rank, d)) return void(0);
                    else {
                        var f = d.message;
                        if (f.length === e.length) return API.sendChat(c(b.chat.nouserspecified, {
                            name: d.un
                        }));
                        var h = f.substr(e.length + 2);
                        var g = b.userUtilities.lookupUserName(h);
                        if (f.length > e.length + 2) {
                            if (typeof g !== 'undefined') {
                                if (b.room.roomevent) {
                                    b.room.eventArtists.push(g.id)
                                }
                                API.moderateAddDJ(g.id)
                            } else API.sendChat(c(b.chat.invaliduserspecified, {
                                name: d.un
                            }))
                        }
                    }
                }
            },
            afklimitCommand: {
                command: 'afklimit',
                rank: 'manager',
                type: 'startsWith',
                functionality: function(d, e) {
                    if (this.type === 'exact' && d.message.length !== e.length) return void(0);
                    if (!b.commands.executable(this.rank, d)) return void(0);
                    else {
                        var f = d.message;
                        if (f.length === e.length) return API.sendChat(c(b.chat.nolimitspecified, {
                            name: d.un
                        }));
                        var g = f.substring(e.length + 1);
                        if (!isNaN(g)) {
                            b.settings.maximumAfk = parseInt(g, 10);
                            API.sendChat(c(b.chat.maximumafktimeset, {
                                name: d.un,
                                time: b.settings.maximumAfk
                            }))
                        } else API.sendChat(c(b.chat.invalidlimitspecified, {
                            name: d.un
                        }))
                    }
                }
            },
            afkremovalCommand: {
                command: 'afktoggle',
                rank: 'manager',
                type: 'exact',
                functionality: function(d, e) {
                    if (this.type === 'exact' && d.message.length !== e.length) return void(0);
                    if (!b.commands.executable(this.rank, d)) return void(0);
                    else {
                        if (b.settings.afkRemoval) {
                            b.settings.afkRemoval = !b.settings.afkRemoval;
                            clearInterval(b.room.afkInterval);
                            API.sendChat(c(b.chat.toggleoff, {
                                name: d.un,
                                'function': b.chat.afkremoval
                            }))
                        } else {
                            b.settings.afkRemoval = !b.settings.afkRemoval;
                            b.room.afkInterval = setInterval(function() {
                                b.roomUtilities.afkCheck()
                            }, 2 * 1000);
                            API.sendChat(c(b.chat.toggleon, {
                                name: d.un,
                                'function': b.chat.afkremoval
                            }))
                        }
                    }
                }
            },
            afkresetCommand: {
                command: 'afkreset',
                rank: 'bouncer',
                type: 'startsWith',
                functionality: function(d, e) {
                    if (this.type === 'exact' && d.message.length !== e.length) return void(0);
                    if (!b.commands.executable(this.rank, d)) return void(0);
                    else {
                        var h = d.message;
                        if (h.length === e.length) return API.sendChat(c(b.chat.nouserspecified, {
                            name: d.un
                        }));
                        var f = h.substring(e.length + 2);
                        var g = b.userUtilities.lookupUserName(f);
                        if (typeof g === 'boolean') return API.sendChat(c(b.chat.invaliduserspecified, {
                            name: d.un
                        }));
                        b.userUtilities.setLastActivity(g);
                        API.sendChat(c(b.chat.afkstatusreset, {
                            name: d.un,
                            username: f
                        }))
                    }
                }
            },
            afktimeCommand: {
                command: 'afktime',
                rank: 'bouncer',
                type: 'startsWith',
                functionality: function(d, e) {
                    if (this.type === 'exact' && d.message.length !== e.length) return void(0);
                    if (!b.commands.executable(this.rank, d)) return void(0);
                    else {
                        var g = d.message;
                        if (g.length === e.length) return API.sendChat(c(b.chat.nouserspecified, {
                            name: d.un
                        }));
                        var f = g.substring(e.length + 2);
                        var h = b.userUtilities.lookupUserName(f);
                        if (typeof h === 'boolean') return API.sendChat(c(b.chat.invaliduserspecified, {
                            name: d.un
                        }));
                        var k = b.userUtilities.getLastActivity(h);
                        var i = Date.now() - k;
                        var l = b.roomUtilities.msToStr(i);
                        var m = b.room.roomstats.launchTime;
                        var j = Date.now() - m;
                        if (i == j) {
                            API.sendChat(c(b.chat.inactivelonger, {
                                botname: b.settings.botName,
                                name: d.un,
                                username: f
                            }))
                        } else {
                            API.sendChat(c(b.chat.inactivefor, {
                                name: d.un,
                                username: f,
                                time: l
                            }))
                        }
                    }
                }
            },
            autoskipCommand: {
                command: 'autoskip',
                rank: 'bouncer',
                type: 'exact',
                functionality: function(d, e) {
                    if (this.type === 'exact' && d.message.length !== e.length) return void(0);
                    if (!b.commands.executable(this.rank, d)) return void(0);
                    else {
                        if (b.room.autoskip) {
                            b.room.autoskip = !b.room.autoskip;
                            clearTimeout(b.room.autoskipTimer);
                            return API.sendChat(c(b.chat.toggleoff, {
                                name: d.un,
                                'function': b.chat.autoskip
                            }))
                        } else {
                            b.room.autoskip = !b.room.autoskip;
                            return API.sendChat(c(b.chat.toggleon, {
                                name: d.un,
                                'function': b.chat.autoskip
                            }))
                        }
                    }
                }
            },
            ballCommand: {
                command: ['ask'],
                rank: 'user',
                type: 'startsWith',
                functionality: function(d, e) {
                    if (this.type === 'exact' && d.message.length !== e.length) return void(0);
                    if (!b.commands.executable(this.rank, d)) return void(0);
                    else {
                        var h = API.getUsers();
                        var g = d.message;
                        var f = g.substring(e.length + 1);
                        var k = Math.floor(Math.random() * h.length);
                        var i = Math.floor(Math.random() * b.chat.balls.length);
                        var j = Math.floor(Math.random() * 1);
                        API.sendChat(c(b.chat.ball, {
                            name: d.un,
                            botname: b.settings.botName,
                            question: f,
                            response: b.chat.balls[i]
                        }))
                    }
                }
            },
            banCommand: {
                command: 'ban',
                rank: 'bouncer',
                type: 'startsWith',
                functionality: function(d, e) {
                    if (this.type === 'exact' && d.message.length !== e.length) return void(0);
                    if (!b.commands.executable(this.rank, d)) return void(0);
                    else {
                        var g = d.message;
                        if (g.length === e.length) return API.sendChat(c(b.chat.nouserspecified, {
                            name: d.un
                        }));
                        var h = g.substr(e.length + 2);
                        var f = b.userUtilities.lookupUserName(h);
                        if (typeof f === 'boolean') return API.sendChat(c(b.chat.invaliduserspecified, {
                            name: d.un
                        }));
                        API.moderateBanUser(f.id, 1, API.BAN.DAY)
                    }
                }
            },
            botnameCommand: {
                command: 'botname',
                rank: 'manager',
                type: 'startsWith',
                functionality: function(e, d) {
                    if (this.type === 'exact' && e.message.length !== d.length) return void(0);
                    if (!b.commands.executable(this.rank, e)) return void(0);
                    else {
                        var f = e.message;
                        if (f.length <= d.length + 1) return API.sendChat(c(b.chat.currentbotname, {
                            botname: b.settings.botName
                        }));
                        var g = f.substring(d.length + 1);
                        if (g) {
                            b.settings.botName = g;
                            API.sendChat(c(b.chat.botnameset, {
                                botName: b.settings.botName
                            }))
                        }
                    }
                }
            },
            clearchatCommand: {
                command: 'clear',
                rank: 'manager',
                type: 'exact',
                functionality: function(e, g) {
                    if (this.type === 'exact' && e.message.length !== g.length) return void(0);
                    if (!b.commands.executable(this.rank, e)) return void(0);
                    else {
                        var f = $('#chat-messages').children();
                        for (var d = 0; d < f.length; d++) {
                            API.moderateDeleteChat(f[d].getAttribute("data-cid"))
                        }
                        return API.sendChat(c(b.chat.chatcleared, {
                            name: e.un
                        }))
                    }
                }
            },
            commandsCommand: {
                command: 'help',
                rank: 'user',
                type: 'exact',
                functionality: function(d, e) {
                    if (this.type === 'exact' && d.message.length !== e.length) return void(0);
                    if (!b.commands.executable(this.rank, d)) return void(0);
                    else {
                        API.sendChat(c(b.chat.commandslink, {
                            botname: b.settings.botName,
                            link: b.cmdLink
                        }))
                    }
                }
            },
            cookieCommand: {
                command: 'give',
                rank: 'user',
                type: 'startsWith',
                getCookie: function(d) {
                    var c = Math.floor(Math.random() * b.chat.cookies.length);
                    return b.chat.cookies[c]
                },
                functionality: function(d, i) {
                    if (this.type === 'exact' && d.message.length !== i.length) return void(0);
                    if (!b.commands.executable(this.rank, d)) return void(0);
                    else {
                        var h = d.message;
                        var g = h.indexOf(' ');
                        if (g === -1) {
                            API.sendChat(b.chat.eatcookie);
                            return false
                        } else {
                            var f = h.substring(g + 2);
                            var e = b.userUtilities.lookupUserName(f);
                            if (e === false || !e.inRoom) {
                                return API.sendChat(c(b.chat.nousercookie, {
                                    name: f
                                }))
                            } else if (e.username === d.un) {
                                return API.sendChat(c(b.chat.selfcookie, {
                                    name: f
                                }))
                            } else {
                                return API.sendChat(c(b.chat.cookie, {
                                    nameto: e.username,
                                    namefrom: d.un,
                                    cookie: this.getCookie()
                                }))
                            }
                        }
                    }
                }
            },
            etaCommand: {
                command: 'eta',
                rank: 'user',
                type: 'startsWith',
                functionality: function(d, f) {
                    if (this.type === 'exact' && d.message.length !== f.length) return void(0);
                    if (!b.commands.executable(this.rank, d)) return void(0);
                    else {
                        var k = b.userUtilities.getPermission(d.uid);
                        var i = d.message;
                        var e;
                        if (i.length > f.length) {
                            if (k < 2) return void(0);
                            e = i.substring(f.length + 2)
                        } else e = d.un;
                        var g = b.userUtilities.lookupUserName(e);
                        if (typeof g === 'boolean') return API.sendChat(c(b.chat.invaliduserspecified, {
                            name: d.un
                        }));
                        var h = API.getWaitListPosition(g.id);
                        if (h < 0) return API.sendChat(c(b.chat.notinwaitlist, {
                            name: e
                        }));
                        var l = API.getTimeRemaining();
                        var j = ((h + 1) * 4 * 60 + l) * 1000;
                        var m = b.roomUtilities.msToStr(j);
                        API.sendChat(c(b.chat.eta, {
                            name: e,
                            time: m
                        }))
                    }
                }
            },
            fbCommand: {
                command: 'fb',
                rank: 'user',
                type: 'exact',
                functionality: function(d, e) {
                    if (this.type === 'exact' && d.message.length !== e.length) return void(0);
                    if (!b.commands.executable(this.rank, d)) return void(0);
                    else {
                        API.sendChat(c(b.chat.facebook))
                    }
                }
            },
            filterCommand: {
                command: 'filter',
                rank: 'bouncer',
                type: 'exact',
                functionality: function(d, e) {
                    if (this.type === 'exact' && d.message.length !== e.length) return void(0);
                    if (!b.commands.executable(this.rank, d)) return void(0);
                    else {
                        if (b.settings.filterChat) {
                            b.settings.filterChat = !b.settings.filterChat;
                            return API.sendChat(c(b.chat.toggleoff, {
                                name: d.un,
                                'function': b.chat.chatfilter
                            }))
                        } else {
                            b.settings.filterChat = !b.settings.filterChat;
                            return API.sendChat(c(b.chat.toggleon, {
                                name: d.un,
                                'function': b.chat.chatfilter
                            }))
                        }
                    }
                }
            },
            joinCommand: {
                command: 'join',
                rank: 'user',
                type: 'exact',
                functionality: function(d, e) {
                    if (this.type === 'exact' && d.message.length !== e.length) return void(0);
                    if (!b.commands.executable(this.rank, d)) return void(0);
                    else {
                        if (b.room.roulette.rouletteStatus && b.room.roulette.participants.indexOf(d.uid) < 0) {
                            b.room.roulette.participants.push(d.uid);
                            setTimeout(function() {
                                API.sendChat(c(b.chat.roulettejoin, {
                                    name: d.un
                                }))
                            }, 1000)
                        }
                    }
                }
            },
            jointimeCommand: {
                command: 'status',
                rank: 'user',
                type: 'startsWith',
                functionality: function(d, e) {
                    if (this.type === 'exact' && d.message.length !== e.length) return void(0);
                    if (!b.commands.executable(this.rank, d)) return void(0);
                    else {
                        var g = d.message;
                        if (g.length === e.length) return API.sendChat(c(b.chat.nouserspecified, {
                            name: d.un
                        }));
                        var h = g.substring(e.length + 2);
                        var f = b.userUtilities.lookupUserName(h);
                        if (typeof f === 'boolean') return API.sendChat(c(b.chat.invaliduserspecified, {
                            name: d.un
                        }));
                        var i = b.userUtilities.getJointime(f);
                        var j = Date.now() - i;
                        var k = b.roomUtilities.msToStr(j);
                        API.sendChat(c(b.chat.jointime, {
                            namefrom: d.un,
                            username: h,
                            time: k
                        }))
                    }
                }
            },
            kickCommand: {
                command: 'kick',
                rank: 'bouncer',
                type: 'startsWith',
                functionality: function(d, i) {
                    if (this.type === 'exact' && d.message.length !== i.length) return void(0);
                    if (!b.commands.executable(this.rank, d)) return void(0);
                    else {
                        var h = d.message;
                        var j = h.lastIndexOf(' ');
                        var e;
                        var f;
                        if (j === h.indexOf(' ')) {
                            e = 0.25;
                            f = h.substring(i.length + 2)
                        } else {
                            e = h.substring(j + 1);
                            f = h.substring(i.length + 2, j)
                        }
                        var g = b.userUtilities.lookupUserName(f);
                        var m = d.un;
                        if (typeof g === 'boolean') return API.sendChat(c(b.chat.nouserspecified, {
                            name: d.un
                        }));
                        var l = b.userUtilities.getPermission(d.uid);
                        var k = b.userUtilities.getPermission(g.id);
                        if (l <= k) return API.sendChat(c(b.chat.kickrank, {
                            name: d.un
                        }));
                        if (!isNaN(e)) {
                            API.sendChat(c(b.chat.kick, {
                                name: d.un,
                                username: f,
                                time: e
                            }));
                            if (e > 24 * 60 * 60) API.moderateBanUser(g.id, 1, API.BAN.PERMA);
                            else API.moderateBanUser(g.id, 1, API.BAN.DAY);
                            setTimeout(function(b, c) {
                                API.moderateUnbanUser(b);
                                console.log('Unbanned @' + c + '. (' + b + ')')
                            }, e * 60 * 1000, g.id, f)
                        } else API.sendChat(c(b.chat.invalidtime, {
                            name: d.un
                        }))
                    }
                }
            },
            killCommand: {
                command: 'quit',
                rank: 'manager',
                type: 'exact',
                functionality: function(c, e) {
                    if (this.type === 'exact' && c.message.length !== e.length) return void(0);
                    if (!b.commands.executable(this.rank, c)) return void(0);
                    else {
                        d();
                        API.sendChat(b.chat.kill);
                        b.disconnectAPI();
                        setTimeout(function() {
                            g()
                        }, 1000)
                    }
                }
            },
            leaveCommand: {
                command: 'leave',
                rank: 'user',
                type: 'exact',
                functionality: function(d, f) {
                    if (this.type === 'exact' && d.message.length !== f.length) return void(0);
                    if (!b.commands.executable(this.rank, d)) return void(0);
                    else {
                        var e = b.room.roulette.participants.indexOf(d.uid);
                        if (e > -1) {
                            b.room.roulette.participants.splice(e, 1);
                            API.sendChat(c(b.chat.rouletteleave, {
                                name: d.un
                            }))
                        }
                    }
                }
            },
            linkCommand: {
                command: 'geturl',
                rank: 'user',
                type: 'exact',
                functionality: function(d, j) {
                    if (this.type === 'exact' && d.message.length !== j.length) return void(0);
                    if (!b.commands.executable(this.rank, d)) return void(0);
                    else {
                        var e = API.getMedia();
                        var f = d.un;
                        var l = b.userUtilities.lookupUser(d.uid);
                        var h = b.userUtilities.getPermission(d.uid);
                        var i = API.getDJ().id;
                        var g = false;
                        if (i === d.uid) g = true;
                        if (h >= 1 || g) {
                            if (e.format === 1) {
                                var k = "http://youtu.be/" + e.cid;
                                API.sendChat(c(b.chat.songlink, {
                                    name: f,
                                    link: k
                                }))
                            }
                            if (e.format === 2) {
                                SC.get('/tracks/' + e.cid, function(d) {
                                    API.sendChat(c(b.chat.songlink, {
                                        name: f,
                                        link: d.permalink_url
                                    }))
                                })
                            }
                        }
                    }
                }
            },
            lockCommand: {
                command: 'lock',
                rank: 'manager',
                type: 'exact',
                functionality: function(c, d) {
                    if (this.type === 'exact' && c.message.length !== d.length) return void(0);
                    if (!b.commands.executable(this.rank, c)) return void(0);
                    else {
                        b.roomUtilities.booth.lockBooth()
                    }
                }
            },
            lockdownCommand: {
                command: 'togglechat',
                rank: 'manager',
                type: 'exact',
                functionality: function(d, f) {
                    if (this.type === 'exact' && d.message.length !== f.length) return void(0);
                    if (!b.commands.executable(this.rank, d)) return void(0);
                    else {
                        var e = b.settings.lockdownEnabled;
                        b.settings.lockdownEnabled = !e;
                        if (b.settings.lockdownEnabled) {
                            return API.sendChat(c(b.chat.toggleon, {
                                name: d.un,
                                'function': b.chat.lockdown
                            }))
                        } else return API.sendChat(c(b.chat.toggleoff, {
                            name: d.un,
                            'function': b.chat.lockdown
                        }))
                    }
                }
            },
            maxlengthCommand: {
                command: 'maxlength',
                rank: 'manager',
                type: 'startsWith',
                functionality: function(d, e) {
                    if (this.type === 'exact' && d.message.length !== e.length) return void(0);
                    if (!b.commands.executable(this.rank, d)) return void(0);
                    else {
                        var g = d.message;
                        var f = g.substring(e.length + 1);
                        if (!isNaN(f)) {
                            b.settings.maximumSongLength = f;
                            return API.sendChat(c(b.chat.maxlengthtime, {
                                name: d.un,
                                time: b.settings.maximumSongLength
                            }))
                        } else return API.sendChat(c(b.chat.invalidtime, {
                            name: d.un
                        }))
                    }
                }
            },
            motdCommand: {
                command: 'msg',
                rank: 'manager',
                type: 'startsWith',
                functionality: function(d, e) {
                    if (this.type === 'exact' && d.message.length !== e.length) return void(0);
                    if (!b.commands.executable(this.rank, d)) return void(0);
                    else {
                        var g = d.message;
                        if (g.length <= e.length + 1) return API.sendChat('/me MotD: ' + b.settings.motd);
                        var f = g.substring(e.length + 1);
                        if (!b.settings.motdEnabled) b.settings.motdEnabled = !b.settings.motdEnabled;
                        if (isNaN(f)) {
                            b.settings.motd = f;
                            API.sendChat(c(b.chat.motdset, {
                                msg: b.settings.motd
                            }))
                        } else {
                            b.settings.motdInterval = f;
                            API.sendChat(c(b.chat.motdintervalset, {
                                interval: b.settings.motdInterval
                            }))
                        }
                    }
                }
            },
            moveCommand: {
                command: 'move',
                rank: 'manager',
                type: 'startsWith',
                functionality: function(d, f) {
                    if (this.type === 'exact' && d.message.length !== f.length) return void(0);
                    if (!b.commands.executable(this.rank, d)) return void(0);
                    else {
                        var e = d.message;
                        if (e.length === f.length) return API.sendChat(c(b.chat.nouserspecified, {
                            name: d.un
                        }));
                        var k = e.indexOf(' ');
                        var i = e.lastIndexOf(' ');
                        var g;
                        var j;
                        if (isNaN(parseInt(e.substring(i + 1)))) {
                            g = 1;
                            j = e.substring(f.length + 2)
                        } else {
                            g = parseInt(e.substring(i + 1));
                            j = e.substring(f.length + 2, i)
                        }
                        var h = b.userUtilities.lookupUserName(j);
                        if (typeof h === 'boolean') return API.sendChat(c(b.chat.invaliduserspecified, {
                            name: d.un
                        }));
                        if (h.id === b.loggedInID) return API.sendChat(c(b.chat.addbotwaitlist, {
                            name: d.un
                        }));
                        if (!isNaN(g)) {
                            API.sendChat(c(b.chat.move, {
                                name: d.un
                            }));
                            b.userUtilities.moveUser(h.id, g, false)
                        } else return API.sendChat(c(b.chat.invalidpositionspecified, {
                            name: d.un
                        }))
                    }
                }
            },
            muteCommand: {
                command: 'mute',
                rank: 'bouncer',
                type: 'startsWith',
                functionality: function(e, i) {
                    if (this.type === 'exact' && e.message.length !== i.length) return void(0);
                    if (!b.commands.executable(this.rank, e)) return void(0);
                    else {
                        var h = e.message;
                        if (h.length === i.length) return API.sendChat(c(b.chat.nouserspecified, {
                            name: e.un
                        }));
                        var j = h.lastIndexOf(' ');
                        var d = null;
                        var g;
                        if (j === h.indexOf(' ')) {
                            g = h.substring(i.length + 2);
                            d = 45
                        } else {
                            d = h.substring(j + 1);
                            if (isNaN(d) || d == "" || d == null || typeof d == "undefined") {
                                return API.sendChat(c(b.chat.invalidtime, {
                                    name: e.un
                                }))
                            }
                            g = h.substring(i.length + 2, j)
                        }
                        var m = e.un;
                        var f = b.userUtilities.lookupUserName(g);
                        if (typeof f === 'boolean') return API.sendChat(c(b.chat.invaliduserspecified, {
                            name: e.un
                        }));
                        var l = b.userUtilities.getPermission(e.uid);
                        var k = b.userUtilities.getPermission(f.id);
                        if (l > k) {
                            if (d > 45) {
                                API.sendChat(c(b.chat.mutedmaxtime, {
                                    name: e.un,
                                    time: "45"
                                }));
                                API.moderateMuteUser(f.id, 1, API.MUTE.LONG)
                            } else if (d === 45) {
                                API.moderateMuteUser(f.id, 1, API.MUTE.LONG);
                                API.sendChat(c(b.chat.mutedtime, {
                                    name: e.un,
                                    username: g,
                                    time: d
                                }))
                            } else if (d > 30) {
                                API.moderateMuteUser(f.id, 1, API.MUTE.LONG);
                                API.sendChat(c(b.chat.mutedtime, {
                                    name: e.un,
                                    username: g,
                                    time: d
                                }));
                                setTimeout(function(b) {
                                    API.moderateUnmuteUser(b)
                                }, d * 60 * 1000, f.id)
                            } else if (d > 15) {
                                API.moderateMuteUser(f.id, 1, API.MUTE.MEDIUM);
                                API.sendChat(c(b.chat.mutedtime, {
                                    name: e.un,
                                    username: g,
                                    time: d
                                }));
                                setTimeout(function(b) {
                                    API.moderateUnmuteUser(b)
                                }, d * 60 * 1000, f.id)
                            } else {
                                API.moderateMuteUser(f.id, 1, API.MUTE.SHORT);
                                API.sendChat(c(b.chat.mutedtime, {
                                    name: e.un,
                                    username: g,
                                    time: d
                                }));
                                setTimeout(function(b) {
                                    API.moderateUnmuteUser(b)
                                }, d * 60 * 1000, f.id)
                            }
                        } else API.sendChat(c(b.chat.muterank, {
                            name: e.un
                        }))
                    }
                }
            },
            removeCommand: {
                command: 'remove',
                rank: 'mod',
                type: 'startsWith',
                functionality: function(e, f) {
                    if (this.type === 'exact' && e.message.length !== f.length) return void(0);
                    if (!b.commands.executable(this.rank, e)) return void(0);
                    else {
                        var h = e.message;
                        if (h.length > f.length + 2) {
                            var g = h.substr(f.length + 2);
                            var d = b.userUtilities.lookupUserName(g);
                            if (typeof d !== 'boolean') {
                                d.lastDC = {
                                    time: null,
                                    position: null,
                                    songCount: 0
                                };
                                if (API.getDJ().id === d.id) {
                                    API.moderateForceSkip();
                                    setTimeout(function() {
                                        API.moderateRemoveDJ(d.id)
                                    }, 1 * 1000, d)
                                } else API.moderateRemoveDJ(d.id)
                            } else API.sendChat(c(b.chat.removenotinwl, {
                                name: e.un,
                                username: g
                            }))
                        } else API.sendChat(c(b.chat.nouserspecified, {
                            name: e.un
                        }))
                    }
                }
            },
            rouletteCommand: {
                command: 'roulette',
                rank: 'bouncer',
                type: 'exact',
                functionality: function(c, d) {
                    if (this.type === 'exact' && c.message.length !== d.length) return void(0);
                    if (!b.commands.executable(this.rank, c)) return void(0);
                    else {
                        if (!b.room.roulette.rouletteStatus) {
                            b.room.roulette.startRoulette()
                        }
                    }
                }
            },
            rulesCommand: {
                command: 'rules',
                rank: 'user',
                type: 'exact',
                functionality: function(d, e) {
                    if (this.type === 'exact' && d.message.length !== e.length) return void(0);
                    if (!b.commands.executable(this.rank, d)) return void(0);
                    else {
                        if (typeof b.settings.rulesLink === "string") return API.sendChat(c(b.chat.roomrules, {
                            link: b.settings.rulesLink
                        }))
                    }
                }
            },
            skipCommand: {
                command: 'skip',
                rank: 'bouncer',
                type: 'exact',
                functionality: function(d, e) {
                    if (this.type === 'exact' && d.message.length !== e.length) return void(0);
                    if (!b.commands.executable(this.rank, d)) return void(0);
                    else {
                        API.sendChat(c(b.chat.skip, {
                            name: d.un
                        }));
                        API.moderateForceSkip();
                        b.room.skippable = false;
                        setTimeout(function() {
                            b.room.skippable = true
                        }, 5 * 1000)
                    }
                }
            },
            lockskipCommand: {
                command: 'reset',
                rank: 'bouncer',
                type: 'exact',
                functionality: function(d, e) {
                    if (this.type === 'exact' && d.message.length !== e.length) return void(0);
                    if (!b.commands.executable(this.rank, d)) return void(0);
                    else {
                        var f = API.getDJ().id;
                        if (d.message.length === e.length) {
                            API.sendChat(c(b.chat.usedlockskip, {
                                name: d.un
                            }));
                            API.moderateForceSkip();
                            b.userUtilities.moveUser(f, b.settings.lockskipPosition, false);
                            return void(0)
                        }
                    }
                }
            },
            statusCommand: {
                command: 'botstatus',
                rank: 'manager',
                type: 'exact',
                functionality: function(e, h) {
                    if (this.type === 'exact' && e.message.length !== h.length) return void(0);
                    if (!b.commands.executable(this.rank, e)) return void(0);
                    else {
                        var j = e.un;
                        var d = '/me [@' + j + '] ';
                        d += b.chat.afkremoval + ': ';
                        if (b.settings.afkRemoval) d += 'ON';
                        else d += 'OFF';
                        d += '. ';
                        d += b.chat.afksremoved + ": " + b.room.afkList.length + '. ';
                        d += b.chat.afklimit + ': ' + b.settings.maximumAfk + '. ';
                        d += b.chat.blacklist + ': ';
                        if (b.settings.blacklistEnabled) d += 'ON';
                        else d += 'OFF';
                        d += '. ';
                        d += b.chat.lockguard + ': ';
                        if (b.settings.lockGuard) d += 'ON';
                        else d += 'OFF';
                        d += '. ';
                        d += b.chat.cycleguard + ': ';
                        if (b.settings.cycleGuard) d += 'ON';
                        else d += 'OFF';
                        d += '. ';
                        d += b.chat.timeguard + ': ';
                        if (b.settings.timeGuard) d += 'ON';
                        else d += 'OFF';
                        d += '. ';
                        d += b.chat.chatfilter + ': ';
                        if (b.settings.filterChat) d += 'ON';
                        else d += 'OFF';
                        d += '. ';
                        d += b.chat.historyskip + ': ';
                        if (b.settings.historySkip) d += 'ON';
                        else d += 'OFF';
                        d += '. ';
                        d += b.chat.voteskip + ': ';
                        if (b.settings.voteSkip) d += 'ON';
                        else d += 'OFF';
                        d += '. ';
                        d += b.chat.cmddeletion + ': ';
                        if (b.settings.cmdDeletion) d += 'ON';
                        else d += 'OFF';
                        d += '. ';
                        d += b.chat.autoskip + ': ';
                        if (b.room.autoskip) d += 'ON';
                        else d += 'OFF';
                        d += '. ';
                        var g = b.room.roomstats.launchTime;
                        var i = Date.now() - g;
                        var f = b.roomUtilities.msToStr(i);
                        d += c(b.chat.activefor, {
                            time: f
                        });
                        return API.sendChat(d)
                    }
                }
            },
            togglemotdCommand: {
                command: 'togglemsg',
                rank: 'manager',
                type: 'exact',
                functionality: function(d, e) {
                    if (this.type === 'exact' && d.message.length !== e.length) return void(0);
                    if (!b.commands.executable(this.rank, d)) return void(0);
                    else {
                        if (b.settings.motdEnabled) {
                            b.settings.motdEnabled = !b.settings.motdEnabled;
                            API.sendChat(c(b.chat.toggleoff, {
                                name: d.un,
                                'function': b.chat.motd
                            }))
                        } else {
                            b.settings.motdEnabled = !b.settings.motdEnabled;
                            API.sendChat(c(b.chat.toggleon, {
                                name: d.un,
                                'function': b.chat.motd
                            }))
                        }
                    }
                }
            },
            unbanCommand: {
                command: 'unban',
                rank: 'bouncer',
                type: 'startsWith',
                functionality: function(d, f) {
                    if (this.type === 'exact' && d.message.length !== f.length) return void(0);
                    if (!b.commands.executable(this.rank, d)) return void(0);
                    else {
                        var g = d.message;
                        if (g.length === f.length) return API.sendChat();
                        var j = g.substring(f.length + 2);
                        var k = API.getBannedUsers();
                        var l = false;
                        var i = null;
                        for (var e = 0; e < k.length; e++) {
                            var h = k[e];
                            if (h.username === j) {
                                i = h;
                                API.moderateUnbanUser(i.id);
                                console.log("Unbanned " + j)
                            }
                        }
                        if (!l) {
                            $(".icon-chat").click();
                            return API.sendChat(c(b.chat.notbanned, {
                                name: d.un
                            }))
                        }
                    }
                }
            },
            reloadCommand: {
                command: 'reload',
                rank: 'bouncer',
                type: 'exact',
                functionality: function(c, e) {
                    if (this.type === 'exact' && c.message.length !== e.length) return void(0);
                    if (!b.commands.executable(this.rank, c)) return void(0);
                    else {
                        API.sendChat(b.chat.reload);
                        d();
                        b.disconnectAPI();
                        localStorage.clear();
                        setTimeout(function() {
                            $.getScript(b.scriptLink)
                        }, 2000)
                    }
                }
            },
            unlockCommand: {
                command: 'unlock',
                rank: 'manager',
                type: 'exact',
                functionality: function(c, d) {
                    if (this.type === 'exact' && c.message.length !== d.length) return void(0);
                    if (!b.commands.executable(this.rank, c)) return void(0);
                    else {
                        b.roomUtilities.booth.unlockBooth()
                    }
                }
            },
            unmuteCommand: {
                command: 'unmute',
                rank: 'bouncer',
                type: 'startsWith',
                functionality: function(d, g) {
                    if (this.type === 'exact' && d.message.length !== g.length) return void(0);
                    if (!b.commands.executable(this.rank, d)) return void(0);
                    else {
                        var j = d.message;
                        var h = b.userUtilities.getPermission(d.uid);
                        var k = d.un;
                        var f = j.substr(g.length + 2);
                        var e = b.userUtilities.lookupUserName(f);
                        if (typeof e === 'boolean') return API.sendChat(c(b.chat.invaliduserspecified, {
                            name: d.un
                        }));
                        var i = b.userUtilities.getPermission(e.id);
                        if (h > i) {
                            try {
                                API.moderateUnmuteUser(e.id);
                                API.sendChat(c(b.chat.unmuted, {
                                    name: d.un,
                                    username: f
                                }))
                            } catch (e) {
                                API.sendChat(c(b.chat.notmuted, {
                                    name: d.un
                                }))
                            }
                        } else API.sendChat(c(b.chat.unmuterank, {
                            name: d.un
                        }))
                    }
                }
            },
            usercommandsCommand: {
                command: 'usercommands',
                rank: 'manager',
                type: 'exact',
                functionality: function(d, e) {
                    if (this.type === 'exact' && d.message.length !== e.length) return void(0);
                    if (!b.commands.executable(this.rank, d)) return void(0);
                    else {
                        if (b.settings.usercommandsEnabled) {
                            API.sendChat(c(b.chat.toggleoff, {
                                name: d.un,
                                'function': b.chat.usercommands
                            }));
                            b.settings.usercommandsEnabled = !b.settings.usercommandsEnabled
                        } else {
                            API.sendChat(c(b.chat.toggleon, {
                                name: d.un,
                                'function': b.chat.usercommands
                            }));
                            b.settings.usercommandsEnabled = !b.settings.usercommandsEnabled
                        }
                    }
                }
            },
            voteskipCommand: {
                command: 'voteskip',
                rank: 'manager',
                type: 'startsWith',
                functionality: function(d, e) {
                    if (this.type === 'exact' && d.message.length !== e.length) return void(0);
                    if (!b.commands.executable(this.rank, d)) return void(0);
                    else {
                        var f = d.message;
                        if (f.length <= e.length + 1) return API.sendChat(c(b.chat.voteskiplimit, {
                            name: d.un,
                            limit: b.settings.voteSkipLimit
                        }));
                        var g = f.substring(e.length + 1);
                        if (!b.settings.voteSkip) b.settings.voteSkip = !b.settings.voteSkip;
                        if (isNaN(g)) {
                            API.sendChat(c(b.chat.voteskipinvalidlimit, {
                                name: d.un
                            }))
                        } else {
                            b.settings.voteSkipLimit = g;
                            API.sendChat(c(b.chat.voteskipsetlimit, {
                                name: d.un,
                                limit: b.settings.voteSkipLimit
                            }))
                        }
                    }
                }
            },
            welcomeCommand: {
                command: 'welcome',
                rank: 'manager',
                type: 'exact',
                functionality: function(d, e) {
                    if (this.type === 'exact' && d.message.length !== e.length) return void(0);
                    if (!b.commands.executable(this.rank, d)) return void(0);
                    else {
                        if (b.settings.welcome) {
                            b.settings.welcome = !b.settings.welcome;
                            return API.sendChat(c(b.chat.toggleoff, {
                                name: d.un,
                                'function': b.chat.welcomemsg
                            }))
                        } else {
                            b.settings.welcome = !b.settings.welcome;
                            return API.sendChat(c(b.chat.toggleon, {
                                name: d.un,
                                'function': b.chat.welcomemsg
                            }))
                        }
                    }
                }
            },
            websiteCommand: {
                command: 'website',
                rank: 'user',
                type: 'exact',
                functionality: function(d, e) {
                    if (this.type === 'exact' && d.message.length !== e.length) return void(0);
                    if (!b.commands.executable(this.rank, d)) return void(0);
                    else {
                        API.sendChat(c(b.chat.website))
                    }
                }
            },
            attackCommand: {
                command: 'attack',
                rank: 'user',
                type: 'exact',
                functionality: function(d, f) {
                    if (this.type === 'exact' && d.message.length !== f.length) return void(0);
                    if (!b.commands.executable(this.rank, d)) return void(0);
                    else {
                        if (b.settings.hp > 1) {
                            b.settings.hp--;
                            var e = Math.floor(Math.random() * b.chat.hits.length);
                            API.sendChat(c(b.chat.attack, {
                                hp: b.settings.hp,
                                hits: b.chat.hits[e]
                            }))
                        } else {
                            API.sendChat(c(b.chat.kill));
                            setTimeout(function() {
                                b.settings.hp = 20;
                                API.sendChat(c(b.chat.reborn))
                            }, 60000)
                        }
                    }
                }
            }
        }
    };
    e(b.startup)
}).call(this);
