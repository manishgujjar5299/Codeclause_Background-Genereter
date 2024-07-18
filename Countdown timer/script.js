let countdownInterval;
let colorChangeInterval;
let events =[]


function addEvent() {
    const eventDateTimeInput = document.getElementById("eventDateTime").value;
    const eventName = document.getElementById("eventName").textContent;

    if (!eventDateTimeInput || eventName.trim() === "" || eventName === "Click to edit event name") {
        alert("Please enter a valid date/time and event name.");
        return;
    }

    const eventDateTime = new Date(eventDateTimeInput);
    
    events.push({ date: eventDateTime, name: eventName });
    events.sort((a, b) => a.date - b.date); // Sort events by date
    updateEventList();
    
    // Reset input fields
    document.getElementById("eventName").textContent = "Click to edit event name";
    document.getElementById("eventDateTime").value = "";
}

function updateEventList() {
    const eventListElement = document.getElementById("eventList");
    eventListElement.innerHTML = "";

    events.forEach((event, index) => {
        const eventItem = document.createElement("div");
        eventItem.className = "event-item";
        eventItem.innerHTML = `
            <span>${formatDate(event.date)} - ${event.name}</span>
        `;
        eventListElement.appendChild(eventItem);
    });
}

function formatDate(date) {
    const options = { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric', 
        hour: '2-digit', 
        minute: '2-digit',
        hour12: true

    };
    return date.toLocaleDateString('en-US', options);
}

// Existing event listeners and other functions remain unchanged

// Your existing functions (startCountdown, startColorChange, etc.) remain unchanged


function startCountdown() {
    if (events.length === 0) {
        alert("Please add an event before starting the countdown.");
        return;
    }

    const nextEvent = events[0];
    updateCountdown(nextEvent.date);
}

function updateCountdown(eventDate) {
    const now = new Date().getTime();
    const distance = eventDate.getTime() - now;
        
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
        else {
            setTimeout(() => updateCountdown(eventDate), 1000);
        }
    }

    // Initialize event listeners when the page loads
document.addEventListener("DOMContentLoaded", function() {
    const eventNameElement = document.getElementById("eventName");
    eventNameElement.addEventListener("focus", function() {
        if (this.textContent === "Click to edit event name") {
            this.textContent = "";
        }
    });

    eventNameElement.addEventListener("blur", function() {
        if (this.textContent.trim() === "") {
            this.textContent = "Click to edit event name";
        }
    });

    document.querySelector("button").addEventListener("click", addEvent);
});
    // Start color changing for timer sections
    startColorChange();


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