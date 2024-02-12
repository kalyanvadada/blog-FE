import React, { useEffect, useState } from "react";
import "./BlogContainer.css";
import { Blog } from "./Blog";
import { fetchData } from "./fetchBlogs";
import BlogPage from "./BlogPage";

interface BlogContainerProps {
  initialBlogs: Blog[];
  onBlogClick: (blog: Blog) => void;
  onBlogClose: () => void;
  selectedBlog: Blog | null;
}

const BlogContainer: React.FC<BlogContainerProps> = ({ initialBlogs, onBlogClick, selectedBlog, onBlogClose }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const blogsPerPage = 2; // Change this value to adjust the number of blogs per page
  // Calculate the index of the last blog to display on the current page
  const [blogs, setBlogs] = useState<Blog[]>(initialBlogs);
  const indexOfLastBlog = currentPage * blogsPerPage;
  // Calculate the index of the first blog to display on the current page
  const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
  // Slice the blogs array to get the blogs for the current page


useEffect(() => {
    if (currentPage % 2 === 0) {
        fetchData(currentPage, blogsPerPage*2)
        .then((newblogs) => {
          setBlogs([...blogs, ...newblogs]);
        })
        .catch((error) => {
          console.error("Error fetching blogs:", error);
        });
    }
  }, [currentPage, blogsPerPage]);

  // Function to handle pagination button clicks
  const handleClick = (type: string) => {
    if (type === "prev") {
      setCurrentPage(currentPage - 1);
    } else {
      setCurrentPage(currentPage + 1);
    }
  };

  console.log("inside container : ", selectedBlog);

  return (
    <>
    
    {selectedBlog === null && <div className="blog-container">
      {blogs.slice(indexOfFirstBlog, indexOfLastBlog).map((blog) => (
        <div key={blog.id} className="blog-card" onClick={() => onBlogClick(blog)}>
          <div className="blog-content">
            <p className="title">{blog.title}</p>
            <p className="date">{blog.date}</p>
          </div>
          <p className="content">{blog.content}</p>
        </div>
      ))}
      <div className="pagination">
        <button className="btn" onClick={() => handleClick("prev")} disabled={currentPage === 1}>
          Prev
        </button>
        Page {currentPage}
        <button className="btn" onClick={() => handleClick("next")} disabled={indexOfLastBlog >= blogs.length}>
          Next
        </button>
      </div>
    </div>}
    {selectedBlog !== null && (
          <BlogPage
            blog={blogs.find((blog) => blog.id === selectedBlog.id)!}
            onClose={onBlogClose}
          />
      )}
    </>
  );
};

export default BlogContainer;
