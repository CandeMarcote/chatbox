const socket = io('http://localhost:3000');
const chatbox = document.querySelector('#chatbox')
const messageForm = document.getElementById('send-container')
const messageInput = document.getElementById('message-input')

const username = prompt("what is your name?");
appendSystemMessage('~ you joined ~')
socket.emit('new-user', username)

socket.on('chat-message', data => {
    appendReceivedMessage(`${data.username}: ${data.message}`)
})

socket.on('user-connected', username => {
    appendSystemMessage(`${username} joined the chat`)
})

socket.on('user-disconnected', username => {
    appendSystemMessage(`${username} left the chat`)
})

messageForm.addEventListener('submit', e => {
    e.preventDefault();
    const message =  messageInput.value;
    appendSentMessage(`You: ${message}`)
    socket.emit('send-chat-message', message)
    messageInput.value = ''
})

function appendSentMessage (message) {
    const sentContainer = document.createElement('div');
    sentContainer.classList.add("sent-container");

    const messageElement = document.createElement('p')
    messageElement.classList.add("sent", "message")
    messageElement.innerText = message

    sentContainer.append(messageElement)
    chatbox.append(sentContainer)
}

function appendReceivedMessage (message) {
    const receivedContainer = document.createElement('div');
    receivedContainer.classList.add("received-container");

    const messageElement = document.createElement('p')
    messageElement.classList.add("received", "message")
    messageElement.innerText = message

    receivedContainer.append(messageElement)
    chatbox.append(receivedContainer)
}

function appendSystemMessage (message) {
    const messageElement = document.createElement('p')
    messageElement.classList.add("system")
    messageElement.innerText = message
    chatbox.append(messageElement)
}