import React from 'react';

const Post = () => {
    return (
      <>
   <form className='form-container'>
    <h2 className='create-post-heading'>Create Blog</h2>
    <label>Title:</label>
              <input type="text" placeholder="Write title" required />
              
              <label>Intro: </label>
              <input type="text" placeholder="Write Intro" required />

              <label>Content:</label>
              <textarea placeholder="Write content" required></textarea>
             
              <label>Conclusion:</label>
              <textarea placeholder="Write conclusion" required></textarea>

              <label>Author: </label>
              <input type="text" placeholder="Write Author" required />
              <div class="date-display" id="dateDisplay"></div>
            
              <button type="submit">Post</button>
            </form>
         
      </>
    );
  };
  
  export default Post;
  