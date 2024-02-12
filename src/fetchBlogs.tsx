import { Blog } from "./Blog";
const host = "http://localhost:3000/blogs";

export const fetchData = async (pageNumber: number, pageSize: number): Promise<Blog[]> => {
    try {
      const url = `${host}?pageNumber=${pageNumber}&pageSize=${pageSize}`;
      console.log("url is ------- ", url);
      const response = await fetch(url, {
        method: 'GET',
        mode: 'cors'
      });
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await response.json();
      const blogs = data.blogs.map((blog: any) => ({
        id: blog.id,
        title: blog.title,
        content: blog.content,
        date: blog.createdAt,
      }));
      console.log(blogs);
      return blogs;
    } catch (error) {
      console.error("Error fetching data:", error);
      return []; // Return an empty array in case of error
    }
  };
  