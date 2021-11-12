import React, { useEffect, useState, useContext } from "react";
import "./feed.css";
import Post from "./post.jsx";
import httpClient from "../../Utils/httpClient";
import { DataContext } from "../../Context/DataProvider";

function Feed() {
  const { dataid } = useContext(DataContext);
  const [posts, setPosts] = useState([{}]);
  useEffect(() => {
    httpClient
      .GET("question/work/" + dataid, {})
      .then((response) => {
        setPosts(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [dataid]);
  console.log('post',posts);
  return (
    <div className="feed">
      {posts.map((item) => (
        <Post
          id={item._id}
          key={item._id}
          Id={item.employee_id}
          question={item.description}
          timestamp={item.createdAt}
          replies={item.replies}
        />
      ))}
    </div>
  );
}

export default Feed;
