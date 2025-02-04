document.addEventListener('DOMContentLoaded', function () {
    const songButtons = document.querySelectorAll('.song-button');
    const videoPlayer = document.getElementById('video-player');
    const songRequestForm = document.getElementById('song-request-form');
    const songRequestInput = document.getElementById('song-request');
    const viewCounter = document.getElementById('view-count')

    // Function to update view count display
    /* function updateViewCount(songName) {
         let count = localStorage.getItem(songName) || 0;
         viewCounter.textContent = `${count} 👀`;
     }
 */

    // Function to update the Google Sheet with the view count
    function updateGoogleSheet(songName, count) {
        gapi.client.sheets.spreadsheets.values.update({
            spreadsheetId: '1Pz17ZaoSVnWcsvGogUSG7QC3Hzi079CL04mcPv71Xd8',  // Replace with your Google Sheets ID
            range: `Sheet2!B${getRowForSong(songName)}`,  // Specify the row for the song
            valueInputOption: 'RAW',
            resource: {
                values: [[count]]  // Update the view count in the corresponding cell
            }
        }).then((response) => {
            console.log(`Updated ${songName} view count to ${count}`);
        }, (error) => {
            console.error("Error updating Google Sheet:", error);
        });
    }

    // Helper function to get the row number based on song name (assuming song names are in column A)
    function getRowForSong(songName) {
        // Map song name to row number (for simplicity, assuming song names are in sequential order)
        const songList = [
            "Nem às paredes confesso", "Vida de rico", "Você é Linda", "Quem me vê", "O meu nome é saudade", "Leãozinho", "Gotinha de água (+ bonus)", "Girassol", "Foi Deus", "Dezembro"
        ];  // Adjust this list to match your actual song names
        return songList.indexOf(songName) + 1;  // Row number is 1-based
    }

    // Initialize the Google API client
    function initGoogleApi() {
        gapi.load('client', () => {
            gapi.client.init({
                apiKey: 'AIzaSyAXtn4FXxuJz9aOOGInRJgcOnO3TU4h8EM',  // Replace with your API key
                discoveryDocs: ['https://sheets.googleapis.com/$discovery/rest?version=v4']
            }).then(() => {
                console.log('Google API client initialized');
            });
        });
    }

    // When the page loads, initialize the Google Sheets API
    window.onload = initGoogleApi;

    // Function to update the view count
    function updateViewCount(songName) {
        let count = localStorage.getItem(songName) || 0;
        count = parseInt(count) + 1;
        localStorage.setItem(songName, count);

        // Display the view count on the page
        viewCounter.textContent = `${count} 👀`;

        // Now, update the Google Sheets with the new count
        updateGoogleSheet(songName, count);
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
