let countdownInterval;

function startCountdown() {
    if (countdownInterval) {
        clearInterval(countdownInterval);
    }

    const eventDateTime = new Date(document.getElementById("eventDateTime").value).getTime();

    countdownInterval = setInterval(function() {
        const now = new Date().getTime();
        const distance = eventDateTime - now;

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        document.getElementById("days").innerHTML = days;
        document.getElementById("hours").innerHTML = hours;
        document.getElementById("minutes").innerHTML = minutes;
        document.getElementById("seconds").innerHTML = seconds;

        changeTimerBackgroundColor();


        if (distance < 0) {
            clearInterval(countdownInterval);
            document.getElementById("countdown").innerHTML = "<h2>EVENT HAS STARTED</h2>";
        }
    }, 1000);
}

function changeTimerBackgroundColor() {
    const color = document.getElementById("themeColor").value;
    document.querySelectorAll('.time-section').forEach(el => {
        el.style.backgroundColor = color;
    });
}


// function animateValue(id, end) {
//     const obj = document.getElementById(id);
//     const start = parseInt(obj.innerHTML);
//     const range = end - start;
//     let current = start;
//     const increment = end > start ? 1 : -1;
//     const stepTime = Math.abs(Math.floor(1000 / range));
//     const timer = setInterval(function() {
//         current += increment;
//         obj.innerHTML = current;
//         if (current == end) {
//             clearInterval(timer);
//         }
//     }, stepTime);
// }

function changeTheme() {
    const color = document.getElementById("themeColor").value;
    document.querySelectorAll('.time-section').forEach(el => {
        el.style.backgroundColor = color;
    });
    document.querySelector('button').style.backgroundColor = color;
}

function changeBackgroundImage() {
    const imageUrl = `https://source.unsplash.com/1600x900/?nature,water&${new Date().getTime()}`;
    const img = new Image();
    img.onload = function() {
        document.body.style.backgroundImage = `url('${imageUrl}')`;
    }
    img.src = imageUrl;
}

changeBackgroundImage();
setInterval(changeBackgroundImage, 60000); // Change every minute

document.querySelectorAll('.time-section').forEach(el => {
    el.style.transition = 'transform 0.3s, background-color 0.3s';
});
