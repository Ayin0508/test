document.addEventListener("DOMContentLoaded", function() {
    displayStats();
    document.querySelector(".reset2-btn").addEventListener("click", reset);
    document.querySelector(".royal-btn").addEventListener("click", function() { royal(10); });
    document.querySelector(".royal30-btn").addEventListener("click", function() { royal(30); });
    document.querySelector(".royal60-btn").addEventListener("click", function() { royal(60); });
    document.querySelector(".royal100-btn").addEventListener("click", function() { royal(100); });
    document.querySelector(".daily-btn").addEventListener("click", function() { daily(); });
    document.querySelector(".daily2-btn").addEventListener("click", function() { daily2(); });
});

var totalAttempts = 0;
var successes = 0;
var failures = 0;

function displayStats() {
    const stats = {
        totalAttempts,
        successes,
        failures,
    };

    for (const stat in stats) {
        $(`.${stat}`).text(stats[stat]);
    }
}

function royal(numAttempts) {
    for (var i = 1; i <= numAttempts; i++) {
        var randomValue = Math.random();
        var isSuccess = randomValue <= 0.02;

        if (isSuccess) {
            successes++;
        } else {
            failures++;
        }

        totalAttempts++;
    }

    displayStats();
}

var characters = [
    "엘리시스", "리르", "아르메", "라스", "라이언", "로난", "에이미", "진", "지크하트",
    "마리", "디오", "제로", "레이", "루퍼스", "린", "아신", "라임", "에델", "베이가스",
    "세르딘", "카나반", "베르너", "그랑디엘", "넬리아", "이오", "명화린", "에우로파",
    "라피스", "하르페", "칼리스토", "신디", "라그나", "미스트", "데카네", "가니메데"
];

var dailyProbability = 0.005; // 0.5%
var daily2Probability = 0.02; // 2%

function getRandomCharacter() {
    var index = Math.floor(Math.random() * characters.length);
    return characters[index];
}

function daily() {
    var dailyCharacters = [];
    var ssObtained = false;

    for (var i = 0; i < 10; i++) {
        var randomValue = Math.random();
        if (randomValue <= dailyProbability) {
            var character = getRandomCharacter();
            dailyCharacters.push(character);

            if (dailyProbability >= 0.005) {
                ssObtained = true;
            }
        }
    }

    var resultText = '데일리(0.5%) 소환 완료.' + '<br>' + (ssObtained ? 'SS 영웅: ' + dailyCharacters.join(', ') : 'SS 소환 실패');

    var dailyPopup = document.getElementById('daily-popup');
    dailyPopup.innerHTML = '<span id="close-daily-popup" style="cursor: pointer; float: right; font-size: 20px;">&times;</span>' + resultText;
    dailyPopup.style.display = 'block';

    var closeBtn = document.getElementById('close-daily-popup');
    closeBtn.addEventListener('click', function() {
        dailyPopup.style.display = 'none';
    });
}

function daily2() {
    var dailyCharacters = [];
    var ssObtained = false;

    for (var i = 0; i < 10; i++) {
        var randomValue = Math.random();
        if (randomValue <= daily2Probability) {
            var character = getRandomCharacter();
            dailyCharacters.push(character);

            if (daily2Probability >= 0.02) {
                ssObtained = true;
            }
        }
    }

    var resultText = '데일리(2%) 소환 완료.' + '<br>' + (ssObtained ? 'SS 영웅: ' + dailyCharacters.join(', ') : 'SS 소환 실패');

    var dailyPopup = document.getElementById('daily-popup');
    dailyPopup.innerHTML = '<span id="close-daily-popup" style="cursor: pointer; float: right; font-size: 20px;">&times;</span>' + resultText;
    dailyPopup.style.display = 'block';

    var closeBtn = document.getElementById('close-daily-popup');
    closeBtn.addEventListener('click', function() {
        dailyPopup.style.display = 'none';
    });
}

function reset() {
    totalAttempts = 0;
    successes = 0;
    failures = 0;
    displayStats();
}