function playSong(song) {
    // Define video sources based on the song button clicked
    let videoSource = '';
    switch (song) {
        case 'song1':
            videoSource = 'videos/song1.mp4';  // Change to your actual file path
            break;
        case 'song2':
            videoSource = 'videos/song2.mp4';  // Change to your actual file path
            break;
        case 'song3':
            videoSource = 'videos/song3.mp4';  // Change to your actual file path
            break;
        case 'song4':
            videoSource = 'videos/song4.mp4';  // Change to your actual file path
            break;
        default:
            videoSource = '';
    }

    // Set the video source and display the video player
    const videoElement = document.getElementById('song-video');
    const videoSourceElement = document.getElementById('video-source');

    if (videoSource) {
        videoSourceElement.src = videoSource;
        videoElement.style.display = 'block';
        videoElement.load();
        videoElement.play();
    }
}

// Song request functionality
function submitRequest() {
    const songRequestInput = document.getElementById('song-request-input');
    const feedback = document.getElementById('request-feedback');

    const requestedSong = songRequestInput.value.trim();
    if (requestedSong) {
        feedback.textContent = `Great choice! Your request for "${requestedSong}" has been received.`;
        songRequestInput.value = '';  // Clear input field
    } else {
        feedback.textContent = 'Please enter a song name.';
    }
}
