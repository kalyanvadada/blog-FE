import React, { useEffect, useState } from "react";
import Header from "./Header";
import BlogContainer from "./BlogContainer";
import './App.css';
import { Blog } from "./Blog";
import Modal from "./Modal";
import BlogPage from "./BlogPage";
import { fetchData } from "./fetchBlogs";


const App: React.FC = () => {

  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [selectedBlog, setSelectedBlog] = useState<Blog | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [refetch, setRefetch] = useState(false);

  const handleAddBlog = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleBlogClick = (blog: Blog) => {
    console.log("selecting : ", blog);
    setSelectedBlog(blog);
  };

  const handleSubmit = async (title: string, content: string) => {
    const data = { title, content };

    try {
      const response = await fetch("http://localhost:3000/blogs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setRefetch(!refetch);
        console.log("Blog submitted successfully"); // Close the modal after successful submission

      } else {
        console.error("Failed to submit blog");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };


  //TODO
  useEffect(() => {
    const pageNumber = 1; // Example page number
    const pageSize = 4;
    fetchData(pageNumber, pageSize )
      .then((blogs) => {
        console.log("------- ", blogs);
        setBlogs(blogs);
      })
      .catch((error) => {
        console.error("Error fetching blogs:", error);
      });
    console.log("state check ", blogs);
  }, [refetch]);
  

  return (
    <div className="App">
      <Header onAddNewBlog={handleAddBlog}/>
      <main className="App-body">
        {blogs.length > 0 && <BlogContainer selectedBlog={selectedBlog} onBlogClose={()=> setSelectedBlog(null)} initialBlogs={blogs} onBlogClick={handleBlogClick} />}

        {isModalOpen && <Modal closeModal={handleModalClose} handleSubmit={handleSubmit} />}
      </main>
      <footer className="App-footer"/>
    </div>
  );
};

export default App;

