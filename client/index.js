import io from 'socket.io-client';

let socket = io('http://localhost:3000');
const formMessage = document.getElementById('form-message');

formMessage.onsubmit = e => {
  e.preventDefault();

  if (formMessage.message.value) {
    socket.emit('message', `${socket.id.substring(0, 4)} says: ${formMessage.message.value}`);
    formMessage.message.focus();
    formMessage.message.value = '';
  }
}

socket.on('connect', () => {
  console.log(`${socket.id.substring(0, 4)} connected to server`);
});

socket.on('message', (message) => {
  console.log(`Message: ` + message);

  let el = document.createElement('li');
  el.innerHTML = message;
  document.getElementById('chat-list').prepend(el);
});