const socket = io('http://localhost:3000');
const messageContainer = document.getElementById('message-container')
const messageForm = document.getElementById('send-container')
const messageInput = document.getElementById('message-input')

const username = prompt("what is your name?");
appendMessage('you joined')
socket.emit('new-user', username)

socket.on('chat-message', data => {
    appendMessage(`${data.username}: ${data.message}`)
})

socket.on('user-connected', username => {
    appendMessage(`${username} joined the chat`)
})

socket.on('user-disconnected', username => {
    appendMessage(`${username} left the chat`)
})

messageForm.addEventListener('submit', e => {
    e.preventDefault();
    const message =  messageInput.value;
    appendMessage(`You: ${message}`)
    socket.emit('send-chat-message', message)
    messageInput.value = ''
})

function appendMessage (message) {
    const messageElement = document.createElement('div')
    messageElement.innerText = message
    messageContainer.append(messageElement)
}