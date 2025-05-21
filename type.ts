const postButton = document.getElementById('post') as HTMLButtonElement;
const postContent = document.getElementById('postContent') as HTMLTextAreaElement;
const postArea = document.getElementById('postArea') as HTMLDivElement;

window.addEventListener('DOMContentLoaded', loadPosts);

postButton.addEventListener('click', async () => {
  const text: string = postContent.value.trim();
  if (!text) return;

  const posts: string[] = await getSavedPosts();
  posts.unshift(text);
  await savePosts(posts);
  renderPost(text, 0);
  await reloadPosts();
  postContent.value = '';
});

function renderPost(text: string, index: number): void {
  const post = document.createElement('div');
  post.className = 'post-item';

  const paragraph = document.createElement('p');
  paragraph.textContent = text;
  post.appendChild(paragraph);

  const actions = document.createElement('div');
  actions.style.marginTop = '8px';

  const deleteBtn = document.createElement('button');
  deleteBtn.textContent = 'Delete';
  deleteBtn.style.marginRight = '10px';

  const editBtn = document.createElement('button');
  editBtn.textContent = 'Edit';

  deleteBtn.addEventListener('click', async () => {
    if (confirm('Are you sure you want to delete this post?')) {
      const posts: string[] =  await getSavedPosts();
      posts.splice(index, 1);
     await savePosts(posts);
     await reloadPosts();
    }
  });

  editBtn.addEventListener('click', async () => {
    const newText = prompt('Edit your post:', text);
    if (newText !== null) {
      const posts: string[] =await  getSavedPosts();
      posts[index] = newText.trim();
     await savePosts(posts);
     await reloadPosts();
    }
  });

  actions.appendChild(deleteBtn);
  actions.appendChild(editBtn);
  post.appendChild(actions);
  postArea.appendChild(post);
}
async function getSavedPosts(): Promise <string[]> {
  const posts= JSON.parse(localStorage.getItem('posts') || '[]');
  return posts;
}
  function savePosts(posts: string[]):void {
  localStorage.setItem('posts', JSON.stringify(posts));
}
async function loadPosts(): Promise<void> {
  const posts: string[] = await getSavedPosts();
 for (let i = 0; i < posts.length; i++) {
    renderPost(posts[i], i);}
 }
async function reloadPosts():Promise< void >{
  postArea.innerHTML = '';
 await loadPosts();
}
