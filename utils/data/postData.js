const getPosts = (uid) => new Promise((resolve, reject) => {
  fetch('http://localhost:8000/posts', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `${uid}`,
    },
  })
    .then((response) => response.json())
    .then((data) => {
      if (data) {
        resolve(Object.values(data));
      } else {
        resolve([]);
      }
    })
    .catch(reject);
});

const getUsersPosts = (uid) => new Promise((resolve, reject) => {
  fetch('http://localhost:8000/posts/get_user_posts', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `${uid}`,
    },
  })
    .then((response) => response.json())
    .then((data) => {
      if (data) {
        resolve(Object.values(data));
      } else {
        resolve([]);
      }
    })
    .catch(reject);
});

const searchPosts = (search, uid) => new Promise((resolve, reject) => {
  fetch(`http://localhost:8000/posts/search_posts?search=${search}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `${uid}`,
    },
  })
    .then((response) => response.json())
    .then((data) => {
      if (data) {
        resolve(Object.values(data));
      } else {
        resolve([]);
      }
    })
    .catch(reject);
});

const getSinglePost = (post, uid) => new Promise((resolve, reject) => {
  fetch(`http://localhost:8000/posts/${post}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `${uid}`,
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const updatePost = (payload) => new Promise((resolve, reject) => {
  fetch(`http://localhost:8000/posts/${payload.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then((data) => {
      if (data) {
        resolve(data);
      } else {
        resolve([]);
      }
    })
    .catch(reject);
});

const deletePost = (Post) => new Promise((resolve, reject) => {
  fetch(`http://localhost:8000/posts/${Post}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((data) => {
      if (data) {
        resolve(data);
      } else {
        resolve([]);
      }
    })
    .catch(reject);
});

const createPost = (payload) => new Promise((resolve, reject) => {
  fetch('http://localhost:8000/posts', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

export {
  getPosts,
  getUsersPosts,
  createPost,
  getSinglePost,
  deletePost,
  updatePost,
  searchPosts,
};
