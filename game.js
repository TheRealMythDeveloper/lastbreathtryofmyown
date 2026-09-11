console.log("Last Breath: Try of My Own");

const soul = document.getElementById("soul");

let soulX = 250;
let soulY = 150;

document.addEventListener("keydown", (event) => {
    const speed = 5;

    if (event.key === "ArrowLeft" || event.key === "a") {
        soulX -= speed;
    }

    if (event.key === "ArrowRight" || event.key === "d") {
        soulX += speed;
    }

    if (event.key === "ArrowUp" || event.key === "w") {
        soulY -= speed;
    }

    if (event.key === "ArrowDown" || event.key === "s") {
        soulY += speed;
    }

    soulX = Math.max(10, Math.min(490, soulX));
    soulY = Math.max(10, Math.min(290, soulY));

    soul.style.left = soulX + "px";
    soul.style.top = soulY + "px";
});