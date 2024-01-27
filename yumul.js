$(function() {
    rendering();
    $(".reset1-btn").on("click", function() {reset1();});
    $(".enchant-btn").on("click", function() {GH();});
    $(".suhobu-btn").on("click", function() {SHB();});
    $(".buy-btn").on("click", function() {flex();});
    $(".jumping1-btn").on("click", function() {jumping1();});
    $(".jumping2-btn").on("click", function() {jumping2();});
    $(".dajung-btn").on("click", function() {Dajung();});
});
 
let YMList = [
    { name: 3, chance: 50 },
    { name: 4, chance: 50 },
    { name: 5, chance: 50 },
    { name: 6, chance: 45 },
    { name: 7, chance: 45 },
    { name: 8, chance: 30 },
    { name: 9, chance: 30 },
    { name: 10, chance: 20 },
    { name: 11, chance: 10 },
    { name: 12, chance: "-" },
];

let user = {
    YM: 0,
    Try: 0,
    SHBTry: 0,
    SG: 0,
    break: 0,
    buy: 0,
}

function updateStats() {
    const stats = {
        Try: user.Try,
        SHBTry: user.SHBTry,
        SG: user.SG,
        break: user.break,
        buy: user.buy
    };

    for (const stat in stats) {
        $(`.${stat}`).text(stats[stat]);
    }
}

function rendering() {
    $(".chance .value").text(YMList[user.YM].chance);
    $(".weapon .name").text(YMList[user.YM].name);
    updateStats();
}

 
function GH() {
    if ( YMList[user.YM]) {
         user.Try++;
         YMList[user.YM]
        if (chance(YMList[user.YM].chance)) {
            user.YM++;
            user.SG++;
        } else {
            user.YM = 0;
            user.break++;
        }
        rendering();
    }
}

function SHB() {
    if (YMList[user.YM]) {
        user.Try++;
        user.SHBTry++;

        if (chance(YMList[user.YM].chance)) {
            if (user.YM >= 6) {
                suhobuPopup("수호부 강화는 9강까지만 할 수 있습니다.");
                user.Try--;
                user.SHBTry--;
            } else {
                user.YM++;
                user.SG++;
            }
        }
        rendering();
    }
}

function suhobuPopup(message) {
    var suhobuPopup = document.getElementById('suhobu-popup');
    suhobuPopup.innerHTML = '<span id="close-suhobu-popup" style="cursor: pointer; float: right; font-size: 20px;">&times;</span>' + message;
    suhobuPopup.style.display = 'block';

    var closeBtn = document.getElementById('close-suhobu-popup');
    closeBtn.addEventListener('click', function () {
        suhobuPopup.style.display = 'none';
    });
}


function flex() {
    user.YM = 4;
    user.buy++;
    rendering();
}

function reset1() {
    user.YM = 0;
    user.Try = 0;
    user.SG = 0;
    user.break = 0;
    user.buy = 0;
    user.SHBTry = 0;
    rendering();
}

function Dajung() {
    if (YMList[user.YM]) {
        var results = [];

        for (var i = 0; i < 8; i++) {
            var isSuccess = chance(YMList[user.YM].chance);
            results.push(isSuccess ? '성공' : '실패');
        }

        var firstSet = results.slice(0, 4);
        var secondSet = results.slice(4);

        var formattedResults = firstSet.join(' ') + '<br>' + secondSet.join(' ');

        var dajungPopup = document.getElementById('dajung-popup');
        dajungPopup.innerHTML = '<span id="close-dajung-popup" style="cursor: pointer; float: right; font-size: 20px;">&times;</span>' + formattedResults;

        dajungPopup.style.display = 'block';

        var closeBtn = document.getElementById('close-dajung-popup');
        closeBtn.addEventListener('click', function() {
            dajungPopup.style.display = 'none';
        });
    }
    rendering();
}

function jumping1() {
    if (user.Try > 0) {reset();}
    for (user.YM = 0; user.YM < 9; )
        {
            GH();
        }
}

function jumping2() {
    if (user.Try > 0) {reset();}
    for (user.YM = 6; user.YM < 9; )
        {
            if ( YMList[user.YM]) {
                user.Try++;
                YMList[user.YM]
               if (chance(YMList[user.YM].chance)) {
                   user.YM++;
                   user.SG++;
               } else {
                   user.YM = 6;
                   user.break++;
               }
               rendering();
           }
        }
}

function chance(percent) {
    if (Math.floor(Math.random() * 100) + 1 <= percent)
        return true;
    else
        return false;
}
