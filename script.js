document.addEventListener('DOMContentLoaded', function () {
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
    songButtons.forEach(button => {
        button.addEventListener('click', function () {
            const videoUrl = button.getAttribute('data-video');
            playSong(videoUrl);

            // Track play count
            let songName = button.textContent.trim();
            let count = localStorage.getItem(songName) || 0;
            count = parseInt(count) + 1;
            localStorage.setItem(songName, count);

            // Update the displayed counter
            updateViewCount(songName);

            console.log(`${songName} has been played ${count} times.`);
        });
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
