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
    
    const colors = [
        { bg: '#1a1a1a', text: '#ffffff' }, // Almost Black, White text
        { bg: '#2c3e50', text: '#ffffff' }, // Dark Blue, White text
        { bg: '#34495e', text: '#ffffff' }, // Midnight Blue, White text
        { bg: '#4a4a4a', text: '#ffffff' }, // Dark Gray, White text
        { bg: '#2e2e2e', text: '#ffffff' }, // Charcoal, White text
        { bg: '#3d3d3d', text: '#ffffff' }, // Dark Slate Gray, White text
        { bg: '#f0f0f0', text: '#000000' }, // Light Gray, Black text
        { bg: '#e0e0e0', text: '#000000' }, // Another Light Gray, Black text
        { bg: '#d3d3d3', text: '#000000' }  // Light Gray, Black text
    ];

    colorChangeInterval = setInterval(function() {
        const randomColor = colors[Math.floor(Math.random()* colors.length)];
        document.querySelectorAll('.time-section').forEach(el => {
            el.style.backgroundColor = randomColor.bg;
            el.style.color = randomColor.text;
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