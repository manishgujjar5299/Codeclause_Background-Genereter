let countdownInterval;
let colorChangeInterval;

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
        
        if (distance < 0) {
            clearInterval(countdownInterval);
            document.getElementById("countdown").innerHTML = "<h2>EVENT HAS STARTED</h2>";
        }
    }, 1000);

    // Start color changing for timer sections
    startColorChange();
}

function startColorChange() {
    if (colorChangeInterval) {
        clearInterval(colorChangeInterval);
    }
    
    colorChangeInterval = setInterval(function() {
        const randomColor = Math.floor(Math.random()*16777215).toString(16);
        document.querySelectorAll('.time-section').forEach(el => {
            el.style.backgroundColor = "#" + randomColor;
        });
    }, 1000); // Change color every second
}

function changeTheme() {
    const color = document.getElementById("themeColor").value;
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

// Change background image every minute
changeBackgroundImage();
setInterval(changeBackgroundImage, 60000);

document.querySelectorAll('.time-section').forEach(el => {
    el.style.transition = 'transform 0.3s, background-color 0.3s';
});