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
    
    const darkColors = [
        '#1a1a1a', // Almost Black
        '#2c3e50', // Dark Blue
        '#34495e', // Midnight Blue
        '#4a4a4a', // Dark Gray
        '#2e2e2e', // Charcoal
        '#3d3d3d', // Dark Slate Gray
        '#1c2833', // Very Dark Blue
        '#273746', // Another Dark Blue
        '#212f3d'  // Dark Navy
    ];
    
    colorChangeInterval = setInterval(function() {
        const randomDarkColor = darkColors[Math.floor(Math.random()* darkColors.length)];
        document.querySelectorAll('.time-section').forEach(el => {
            el.style.backgroundColor = randomDarkColor;
        });
    }, 1000); // Change color every second
}

function changeTheme() {
    const color = document.getElementById("themeColor").value;
    document.querySelector('button').style.backgroundColor = color;
}

const backgroundImages = [
    'https://picsum.photos/1920/1080?random=1',
    'https://picsum.photos/1920/1080?random=2',
    'https://picsum.photos/1920/1080?random=3',
    'https://picsum.photos/1920/1080?random=4',
    'https://picsum.photos/1920/1080?random=5'
];

function changeBackgroundImage() {
    const now = new Date();
    const minutes = now.getMinutes();
    const imageIndex = minutes % backgroundImages.length;
    const imageUrl = backgroundImages[imageIndex];
    
    document.body.style.backgroundImage = `url('${imageUrl}')`;
    console.log('Background image set to:', imageUrl);

    // Set timeout for next minute change
    const secondsUntilNextMinute = 60 - now.getSeconds();
    setTimeout(changeBackgroundImage, secondsUntilNextMinute * 1000);
}

// Initial call to set the background and start the cycle
changeBackgroundImage();
setTimer(changeBackgroundImage, 1 * 60 * 1000);

document.querySelectorAll('.time-section').forEach(el => {
    el.style.transition = 'transform 0.3s, background-color 0.3s';
});