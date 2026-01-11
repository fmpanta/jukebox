
// -----------------------------
// Treasure Hunt Popup (on load)
// -----------------------------

function closeTreasureHunt() {
    const overlay = document.getElementById('treasure-overlay');
    const jukebox = document.querySelector('.container');

    overlay.remove(); // remove overlay
    jukebox.style.display = 'block'; // make sure it's visible

    // Attach song button listeners AFTER the overlay is gone
    const songButtons = document.querySelectorAll('.song-button');
    const videoPlayer = document.getElementById('video-player');
    const viewCounter = document.getElementById('view-count');

    songButtons.forEach(button => {
        button.addEventListener('click', function () {
            const videoUrl = button.getAttribute('data-video');
            videoPlayer.style.display = 'block';
            videoPlayer.src = videoUrl;

            const songName = button.textContent.trim();
            let count = parseInt(localStorage.getItem(songName) || 0) + 1;
            localStorage.setItem(songName, count);

            viewCounter.textContent = `${count} 👀`;
            viewCounter.style.display = 'inline';

            console.log(`${songName} has been played ${count} times.`);
        });
    });

    jukebox.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
    });

    // Shuffle Button Logic
    const shuffleButton = document.getElementById('shuffle-button');
    if (shuffleButton) {
        shuffleButton.addEventListener('click', function () {
            const songButtons = document.querySelectorAll('.song-button');
            if (songButtons.length === 0) return;

            const randomIndex = Math.floor(Math.random() * songButtons.length);
            const randomSong = songButtons[randomIndex];

            // Trigger click on the random song button
            randomSong.click();
        });
    }

}


document.addEventListener("DOMContentLoaded", () => {

    const startHuntBtn = document.getElementById("start-hunt-btn");
    const treasureContent = document.getElementById("treasure-content");

    const tarefa1Btn = document.getElementById("tarefan1-btn");
    const tarefa1 = document.getElementById("tarefa-n1");

    startHuntBtn.addEventListener("click", () => {
        startHuntBtn.style.display = "none";
        treasureContent.style.display = "block";
    });

    tarefa1Btn.addEventListener("click", () => {
        unlockTask(event.currentTarget);
        startHuntBtn.style.display = "none";
        tarefa1.style.display = "block";
        tarefa1.scrollIntoView({ behavior: "smooth", block: "center" });
    });

    const skyContainer = document.getElementById("sky-container");
    const skyFeedback = document.getElementById("sky-feedback");

    const hints = [
        "Estrela Sirius",
        "Estrela do Norte",
        "Estrela Polaris",
        "Estrela Betelgeuse",
        "Estrela Rigel",
        "Estrela Alpha Centauri",
        "Estrela Antares",
        "Estrela Canopus",
        "Estrela Vega",
        "Estrela Inês Basílio" // ← correct one
    ];

    const STAR_COUNT = 10;
    const CORRECT_STAR_INDEX = Math.floor(Math.random() * STAR_COUNT);

    // Generate stars
    for (let i = 0; i < STAR_COUNT; i++) {
        const star = document.createElement("div");

        star.classList.add("star");

        // Random position
        star.style.left = Math.random() * 100 + "%";
        star.style.top = Math.random() * 100 + "%";

        // Mark one as correct
        if (i === CORRECT_STAR_INDEX) {
            star.dataset.correct = "true";
            star.classList.add("correct");
            star.dataset.hint = hints[9];
        } else {
            star.dataset.hint = hints[i % (hints.length - 1)];
        }

        star.addEventListener("click", () => {
            if (star.dataset.correct) {
                skyFeedback.textContent = "✨ Encontraste a estrela mais brilhante";
                star.style.boxShadow = "0 0 15px gold";
                star.style.transform = "scale(2)";
                unlockTask3();
            } else {
                skyFeedback.textContent = "Nope.";
            }
        });

        skyContainer.appendChild(star);
    }

    const tarefa3Div = document.getElementById('tarefan3-div');

    const tarefa3Btn = document.getElementById("tarefan3-btn");


    function unlockTask3() {
        tarefa3Btn.style.display = "block";
    }

    // Start button handler (you can extend this later)
    document.getElementById("start-treasure").addEventListener("click", () => {
        overlay.remove(); // close popup
        // future treasure hunt logic goes here
    });

    const songButtons = document.querySelectorAll('.song-button');
    const videoPlayer = document.getElementById('video-player');
    const songRequestForm = document.getElementById('song-request-form');
    const songRequestInput = document.getElementById('song-request');
    const viewCounter = document.getElementById('view-count')

    // Function to update view count display
    function updateViewCount(songName) {
        let count = localStorage.getItem(songName) || 0;
        viewCounter.textContent = `${count} 👀`;
    }

    // Event listener for song selection buttons
    document.querySelector('.container').addEventListener('click', function (e) {
        if (e.target.classList.contains('song-button')) {
            const button = e.target;
            const videoUrl = button.getAttribute('data-video');
            playSong(videoUrl);

            let songName = button.textContent.trim();
            let count = localStorage.getItem(songName) || 0;
            count = parseInt(count) + 1;
            localStorage.setItem(songName, count);

            updateViewCount(songName);

            console.log(`${songName} has been played ${count} times.`);
        }
    });


    // Initialize view counts when page loads
    songButtons.forEach((button) => {
        let songName = button.textContent.trim();
        updateViewCount(songName); // Update view count for each song on page load
    });

    // Function to play the selected song in the iframe
    function playSong(videoUrl) {
        if (videoUrl.includes('google.com')) {
            // If it's a Google Drive video, use an iframe
            videoPlayer.style.display = 'block';
            videoPlayer.src = videoUrl;
        } else {
            // For other video types (like MP4), create a video player
            videoPlayer.style.display = 'block';
            videoPlayer.src = videoUrl;
        }

        // Show the view count when a song is played
        const viewCountElement = document.getElementById('view-count');
        viewCountElement.style.display = 'inline';
    }

    // Handle song request form submission
    songRequestForm.addEventListener('submit', function (event) {
        event.preventDefault();

        const requestedSong = songRequestInput.value.trim();
        if (requestedSong) {
            alert(`A nova música solicitada foi: ${requestedSong}`);
            songRequestInput.value = ''; // Reset input field
        }
    });

    // Shuffle Button Logic
    const shuffleButton = document.getElementById('shuffle-button');

    shuffleButton.addEventListener('click', function () {
        if (songButtons.length === 0) return; // Prevent errors if no songs exist

        // Pick a random song
        const randomIndex = Math.floor(Math.random() * songButtons.length);
        const randomSong = songButtons[randomIndex];

        // Simulate a button click on the chosen song
        randomSong.click();
    });

});

function unlockTask(button) {
    button.textContent = button.textContent.replace("🔒", "🔓");
    button.classList.add("unlocking");

    if (button.id === "tesouro-btn") {
        if (button.id === "tesouro-btn") {
            console.log("You unlocked the tesouro button!");

            const container = document.getElementById("treasure-container");
            container.innerHTML = ""; // Clear previous content if any

            const treasureMsg = document.getElementById("treasure-msg");
            treasureMsg.style.display = 'block';

            // Array of media objects
            const mediaList = [
                { type: "video", src: "tesouro/Tesouro1.mp4" },
                { type: "image", src: "tesouro/Tesouro2.jpeg" },
                { type: "image", src: "tesouro/Tesouro4.gif" },
                { type: "image", src: "tesouro/WhatsApp Image 2025-04-01 at 06.01.01.jpeg" },
                { type: "image", src: "tesouro/WhatsApp Image 2025-04-02 at 21.12.21.jpeg" },
                { type: "image", src: "tesouro/WhatsApp Image 2025-04-23 at 00.31.37.jpeg" },
                { type: "image", src: "tesouro/WhatsApp Image 2025-05-11 at 11.40.35.jpeg" },
                { type: "image", src: "tesouro/WhatsApp Image 2025-06-20 at 21.36.08.jpeg" },
                { type: "image", src: "tesouro/WhatsApp Image 2025-07-21 at 13.55.11.jpeg" },
                { type: "image", src: "tesouro/WhatsApp Image 2025-08-05 at 22.37.13.jpeg" },
                { type: "image", src: "tesouro/WhatsApp Image 2025-09-19 at 10.10.26.jpeg" },
                { type: "video", src: "tesouro/WhatsApp Video 2025-01-06 at 15.19.30.mp4" },
                { type: "video", src: "tesouro/WhatsApp Video 2025-01-12 at 23.32.14.mp4" },
                { type: "video", src: "tesouro/WhatsApp Video 2025-05-11 at 17.54.17.mp4" },
                { type: "video", src: "tesouro/WhatsApp Video 2025-08-30 at 23.18.33.mp4" },
                { type: "video", src: "tesouro/WhatsApp Video 2025-09-07 at 19.44.47.mp4" },
                { type: "video", src: "tesouro/WhatsApp Video 2025-11-03 at 17.48.13.mp4" },
                { type: "video", src: "tesouro/WhatsApp Video 2025-11-10 at 21.44.50.mp4" },
            ];

            //https://raw.githubusercontent.com/fmpanta/jukebox/refs/heads/main/photos/portugal.jpeg"

            // Loop through media and create elements
            mediaList.forEach(media => {
                let element;
                if (media.type === "image") {
                    element = document.createElement("img");
                    element.src = media.src;
                    element.style.width = "200px"; // optional styling
                    element.style.margin = "10px";
                } else if (media.type === "video") {
                    element = document.createElement("video");
                    element.src = media.src;
                    element.controls = true;
                    element.style.width = "300px";
                    element.style.margin = "10px";
                } else if (media.type === "audio") {
                    element = document.createElement("audio");
                    element.src = media.src;
                    element.controls = true;
                    element.style.display = "block";
                    element.style.margin = "10px 0";
                }

                container.appendChild(element);
            });

        }
    }
}
