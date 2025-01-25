// Handling the song button click to play the corresponding video
const songButtons = document.querySelectorAll('.song-button');
const videoPlayer = document.getElementById('video-player');

// Add event listener for each song button
songButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        const videoFile = e.target.getAttribute('data-video');
        videoPlayer.src = videoFile; // Update the video source
        videoPlayer.play(); // Play the video
    });
});

// Handling song requests
const songRequestForm = document.getElementById('song-request-form');
const songRequestInput = document.getElementById('song-request');

songRequestForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const requestedSong = songRequestInput.value.trim();

    if (requestedSong) {
        alert(`Song request received for: "${requestedSong}"! I'll try to sing it soon.`);
        songRequestInput.value = ''; // Clear the input
    } else {
        alert('Please enter a song name before submitting.');
    }
});

