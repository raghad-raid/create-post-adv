"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const postButton = document.getElementById('post');
const postContent = document.getElementById('postContent');
const postArea = document.getElementById('postArea');
window.addEventListener('DOMContentLoaded', loadPosts);
postButton.addEventListener('click', () => __awaiter(void 0, void 0, void 0, function* () {
    const text = postContent.value.trim();
    if (!text)
        return;
    const posts = yield getSavedPosts();
    posts.unshift(text);
    yield savePosts(posts);
    renderPost(text, 0);
    yield reloadPosts();
    postContent.value = '';
}));
function renderPost(text, index) {
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
    deleteBtn.addEventListener('click', () => __awaiter(this, void 0, void 0, function* () {
        if (confirm('Are you sure you want to delete this post?')) {
            const posts = yield getSavedPosts();
            posts.splice(index, 1);
            yield savePosts(posts);
            yield reloadPosts();
        }
    }));
    editBtn.addEventListener('click', () => __awaiter(this, void 0, void 0, function* () {
        const newText = prompt('Edit your post:', text);
        if (newText !== null) {
            const posts = yield getSavedPosts();
            posts[index] = newText.trim();
            yield savePosts(posts);
            yield reloadPosts();
        }
    }));
    actions.appendChild(deleteBtn);
    actions.appendChild(editBtn);
    post.appendChild(actions);
    postArea.appendChild(post);
}
function getSavedPosts() {
    return __awaiter(this, void 0, void 0, function* () {
        const posts = JSON.parse(localStorage.getItem('posts') || '[]');
        return posts;
    });
}
function savePosts(posts) {
    localStorage.setItem('posts', JSON.stringify(posts));
}
function loadPosts() {
    return __awaiter(this, void 0, void 0, function* () {
        const posts = yield getSavedPosts();
        for (let i = 0; i < posts.length; i++) {
            renderPost(posts[i], i);
        }
    });
}
function reloadPosts() {
    return __awaiter(this, void 0, void 0, function* () {
        postArea.innerHTML = '';
        yield loadPosts();
    });
}
