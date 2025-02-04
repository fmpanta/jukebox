document.addEventListener('DOMContentLoaded', function () {
    const songButtons = document.querySelectorAll('.song-button');
    const videoPlayer = document.getElementById('video-player');
    const songRequestForm = document.getElementById('song-request-form');
    const songRequestInput = document.getElementById('song-request');
    const viewCounter = document.getElementById('view-count')

    // Function to update view count display
    //function updateViewCount(songName) {
    //    let count = localStorage.getItem(songName) || 0;
    //    viewCounter.textContent = `${count} 👀`;
    //}

    function updateViewCount(songName) {
        fetch("https://script.google.com/macros/s/AKfycbyXzAXLEEYPRGp7RUCV6L5axxRjsv7pRHu4Nz3E64htp15AMC2BOCxBl4BDDi9eD2xC/exec")
            .then(response => response.json())
            .then(data => {
                document.getElementById("view-count").textContent = data[songName] || 0;
            });

        fetch("https://script.google.com/macros/s/AKfycbyXzAXLEEYPRGp7RUCV6L5axxRjsv7pRHu4Nz3E64htp15AMC2BOCxBl4BDDi9eD2xC/exec", {
            method: "POST",
            body: JSON.stringify({ song: songName }),
            headers: { "Content-Type": "application/json" }
        })
            .then(response => response.json())
            .then(data => {
                document.getElementById("view-count").textContent = data.views;
            });
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
});
