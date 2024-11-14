// BlogPost.jsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { db } from './firebase';  // Import Firestore instance

function BlogPost() {
  const { id } = useParams();  // Get the blog post ID from the URL
  const [blog, setBlog] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlogPost = async () => {
      try {
        // Fetch blog post from Firestore using the ID
        const doc = await db.collection('posts').doc(id).get();

        if (!doc.exists) {
          throw new Error('Blog post not found');
        }

        setBlog({ id: doc.id, ...doc.data() });  // Save blog data in state
      } catch (error) {
        setError(error.message);  // Set error message if fetching fails
        console.error('Error loading blog post:', error);
      }
    };

    fetchBlogPost();
  }, [id]);  // Run the effect when the ID changes

  return (
    <section className="blog-post">
      {error && <p>{error}</p>}  {/* Display error message if fetching fails */}
      {blog ? (
        <>
          <h1>{blog.title}</h1>  {/* Display blog title */}
          <p>{blog.content}</p>  {/* Display blog content */}
        </>
      ) : (
        <p>Loading...</p>  
      )}
    </section>
  );
}

export default BlogPost;
