// Function to process voice commands
function processCommand(command) {
    // Here you can implement your logic to understand the user's request
    // For demonstration, let's assume the command is directly related to menu items
    var response;
    switch(command.toLowerCase()) {
        case "i want gulab jamun":
            response = "Sure! I'll notify the caretaker about your request for Gulab Jamun.";
            sendMessageToCaretaker("Request: Gulab Jamun");
            break;
        default:
            response = "Sorry, I couldn't understand your request.";
            break;
    }
    // Speak the response
    speakResponse(response);
}

// Function to send message to caretaker
function sendMessageToCaretaker(message) {
    // Here you would implement code to send a message to the caretaker
    // For demonstration, let's just log the message to console
    console.log("Message sent to caretaker: " + message);
}

// Function to speak response
function speakResponse(response) {
    var utterance = new SpeechSynthesisUtterance(response);
    // Use default voice
    window.speechSynthesis.speak(utterance);
}

// Check if browser supports Web Speech API
if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
    // Create a SpeechRecognition object
    var recognition = new webkitSpeechRecognition || SpeechRecognition();

    // Define settings for recognition
    recognition.continuous = false;
    recognition.lang = 'en-US';

    // Start recognition
    recognition.onstart = function() {
        console.log('Speech recognition started');
    };

    // Process recognized speech
    recognition.onresult = function(event) {
        var transcript = event.results[0][0].transcript;
        console.log('You said: ' + transcript);
        // Process the command
        processCommand(transcript);
    };

    // Start listening
    recognition.start();
} else {
    console.log('Speech recognition not supported');
}
