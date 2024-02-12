// BlogPage.tsx
import React, { useEffect, useState } from "react";
import { Blog } from "./Blog";
import './BlogPage.css';

interface BlogPageProps {
  blog: Blog;
  onClose: () => void;
}

const BlogPage: React.FC<BlogPageProps> = ({ blog, onClose }) => {
  console.log("my blog : ", blog);
    const [content, setContent] = useState<String>(blog.content);
    
    useEffect(() => {
      const host = "http://localhost:3000/blogs";
      console.log("inside hook ------- ", blog.id);
      fetch(`${host}/${blog.id}`)
          .then(response => {
              if (!response.ok) {
                  throw new Error('Network response was not ok');
              }
              return response.json();
          })
          .then((data) => {
              console.log("what is content ", data.content);
              setContent(data?.content);
          })
          .catch(error => {
              console.error('Error fetching data:', error);
              // Handle error, such as setting a default content value
              // setContent('Default content');
          });
  }, []);
  
    
  return (
    <div className="blog-page">
    <div className="blog-heading">
      <h2 className="title">{blog.title}</h2>
      <p className="date">{blog.date}</p>
    </div>
      <p className="content">{content}</p>
      <button className="close-button" onClick={onClose}>Close</button>
    </div>
  );
};

export default BlogPage;
