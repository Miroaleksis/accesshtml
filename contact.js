const topic = document.getElementById('contact-topic');
const messageHint = document.getElementById('contact-message-hint');

topic.addEventListener('change', () => {
  messageHint.hidden = topic.value === 'other';
});

document.querySelector('.contact-form').addEventListener('submit', event => {
  event.preventDefault();
});
