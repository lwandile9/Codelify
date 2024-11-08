import React, { useState, useEffect } from 'react';

import Footer from '../components/footer'

const Blog = () => {
  // State to store blog posts
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch blog posts on component mount
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('http://localhost:3000/blog'); // Use the correct backend URL
        console.log('Response status:', response.status); // Log the status
        console.log('Response headers:', response.headers); // Log the headers

        if (!response.ok) {
          throw new Error(`Failed to fetch posts: ${response.statusText}`);
        }

        const contentType = response.headers.get('content-type');
        if (!contentType || !contentType.includes('application/json')) {
          throw new Error('Expected JSON, but received something else.');
        }

        const data = await response.json();
        console.log('Fetched posts:', data); // Log the fetched data
        setPosts(data); // Update the state with fetched posts
      } catch (err) {
        setError(err.message); // Set error message
        console.error('Fetch error:', err); // Log the error for debugging
      } finally {
        setLoading(false); // Set loading to false after fetching is done
      }
    };

    fetchPosts();
  }, []); // Empty dependency array to run once when component mounts

  // Render loading, error, or the list of posts
  if (loading) {
    return  <div class="loader"></div>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <>
    <div>
      <h1>Blog Posts</h1>
      <ul>
        {posts.length === 0 ? (
          <p>No blog posts available.</p>
        ) : (
          posts.map(post => (
            <li key={post.id}>
              <h2>{post.title}</h2>
              <p>{post.content}</p>
              <p><em>by {post.author} | {post.createdAt}</em></p>
            </li>
          ))
        )}
      </ul>
    </div>

    <Footer/>
    </>

    
  );
}

export default Blog;
