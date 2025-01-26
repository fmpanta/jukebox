document.addEventListener('DOMContentLoaded', function () {
    const songButtons = document.querySelectorAll('.song-button');
    const videoPlayer = document.getElementById('video-player');
    const songRequestForm = document.getElementById('song-request-form');
    const songRequestInput = document.getElementById('song-request');

    // Event listener for song selection buttons
    songButtons.forEach(button => {
        button.addEventListener('click', function () {
            const videoUrl = button.getAttribute('data-video');
            playSong(videoUrl);
        });
    });

    // Function to play the selected song in the iframe
    function playSong(videoUrl) {
        if (videoUrl.includes('google.com')) {
            // If it's a Google Drive video, we can use an iframe directly
            videoPlayer.style.display = 'block';
            videoPlayer.src = videoUrl;
        } else {
            // For other video types (like MP4), create a video player
            videoPlayer.style.display = 'block';
            videoPlayer.src = videoUrl;
        }
    }

    // Handle song request form submission
    songRequestForm.addEventListener('submit', function (event) {
        event.preventDefault();

        const requestedSong = songRequestInput.value.trim();
        if (requestedSong) {
            alert(`A nova música solicitada foi: ${requestedSong}`);
            // Reset the input field
            songRequestInput.value = '';
        }
    });
});


