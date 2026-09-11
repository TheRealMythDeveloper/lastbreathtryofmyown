const soul = document.getElementById("soul");
const battleBox = document.getElementById("battle-box");

let soulX = 250;
let soulY = 150;
let hp = 20;

let keys = {};
let attacks = [];
let lastAttack = 0;

document.addEventListener("keydown", (event) => {
    keys[event.key.toLowerCase()] = true;
});

document.addEventListener("keyup", (event) => {
    keys[event.key.toLowerCase()] = false;
});

function moveSoul() {
    const speed = 4;

    if (keys["arrowleft"] || keys["a"]) soulX -= speed;
    if (keys["arrowright"] || keys["d"]) soulX += speed;
    if (keys["arrowup"] || keys["w"]) soulY -= speed;
    if (keys["arrowdown"] || keys["s"]) soulY += speed;

    soulX = Math.max(10, Math.min(490, soulX));
    soulY = Math.max(10, Math.min(290, soulY));

    soul.style.left = soulX + "px";
    soul.style.top = soulY + "px";
}

function createAttack() {
    const attack = document.createElement("div");

    attack.className = "attack";

    attack.style.left = Math.random() * 470 + "px";
    attack.style.top = "-20px";

    battleBox.appendChild(attack);

    attacks.push({
        element: attack,
        x: parseFloat(attack.style.left),
        y: -20
    });
}

function updateAttacks() {
    for (let i = attacks.length - 1; i >= 0; i--) {
        const attack = attacks[i];

        attack.y += 3;
        attack.element.style.top = attack.y + "px";

        const hit =
            attack.x < soulX + 20 &&
            attack.x + 20 > soulX &&
            attack.y < soulY + 20 &&
            attack.y + 20 > soulY;

        if (hit) {
            hp--;
            document.querySelector("#status span").textContent =
                `HP ${hp} / 20`;

            attack.element.remove();
            attacks.splice(i, 1);

            if (hp <= 0) {
                alert("YOU DIED");
                location.reload();
            }

            continue;
        }

        if (attack.y > 310) {
            attack.element.remove();
            attacks.splice(i, 1);
        }
    }
}

function gameLoop(timestamp) {
    moveSoul();

    if (timestamp - lastAttack > 700) {
        createAttack();
        lastAttack = timestamp;
    }

    updateAttacks();

    requestAnimationFrame(gameLoop);
}

requestAnimationFrame(gameLoop);