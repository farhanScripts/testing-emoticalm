const socket = io();

const topicsContainer = document.getElementById('topics');
const postTopicButton = document.getElementById('postTopic');

postTopicButton.addEventListener('click', async () => {
  const title = document.getElementById('title').value;
  const content = document.getElementById('content').value;

  const response = await fetch('/api/forum', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ title, content }),
  });
  const topic = await response.json();
  socket.emit('new forum', topic);
  addTopicToDOM(topic);
});

socket.on('new forum', (topic) => {
  addTopicToDOM(topic);
});

async function fetchTopics() {
  const response = await fetch('/api/forum');
  const topics = await response.json();
  topics.forEach(addTopicToDOM);
}

async function fetchTopics() {
  const response = await fetch('/api/forum');
  const topics = await response.json();
  topics.forEach(addTopicToDOM);
}

function addTopicToDOM(topic) {
  const div = document.createElement('div');
  div.classList.add('topic');
  div.innerHTML = `
    <div class="container-fluid p-4 container-post">
      <div class="author-post rounded rounded-4 p-4 mb-4">
        <h3>${topic.title}</h3>
        <p><strong>Created By: ${topic.author}</strong></p>
        <p>${topic.content}</p>
        <button class="btn btn-primary show-reply-form-btn">Reply</button>
        <button class="btn show-reply btn-success">Show Replies</button>
      </div>
      <div class="reply-form" style="display: none;">
        <textarea placeholder="Reply..." class="p-4 rounded-top"></textarea>
        <button onclick="postReply('${
          topic._id
        }', this)" class="btn btn-primary reply-btn">Reply</button>
      </div>
      <div class="replies mt-4 p-4 rounded rounded-4" style="display: none;">
        <h4 class="text-center fw-bold">Replies</h4>
       ${topic.replies
         .map(
           (reply) =>
             `<div class="reply-message rounded rounded-4 p-4 mt-2">
                <h4>${reply.author}</h4>
                <p>${reply.content}</p>
              </div>`
         )
         .join('')}
      </div>
    </div>
  `;
  topicsContainer.appendChild(div);

  const showReplyFormBtn = div.querySelector('.show-reply-form-btn');
  const replyForm = div.querySelector('.reply-form');
  const showReply = div.querySelector('.show-reply');
  const replyContainer = div.querySelector('.replies');

  showReplyFormBtn.addEventListener('click', () => {
    replyForm.style.display =
      replyForm.style.display === 'none' ? 'flex' : 'none';
  });

  showReply.addEventListener('click', () => {
    replyContainer.style.display =
      replyContainer.style.display === 'none' ? 'block' : 'none';
  });
}

async function postReply(topicId, button) {
  const textarea = button.previousElementSibling;
  const content = textarea.value;

  const response = await fetch(`/api/forum/${topicId}/replies`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ content }),
  });
  const topic = await response.json();

  socket.emit('new reply', topic);
  textarea.value = '';
}

socket.on('new reply', (topic) => {
  // Update the topic's replies in the DOM
  const topicDiv = Array.from(document.getElementsByClassName('topic')).find(
    (div) => div.querySelector('h3').innerText === topic.title
  );

  const repliesDiv = topicDiv.querySelector('.replies');
  repliesDiv.innerHTML = topic.replies
    .map((reply) => `<p><strong>${reply.author}:</strong> ${reply.content}</p>`)
    .join('');
});

// Initial fetch of topics
fetchTopics();
