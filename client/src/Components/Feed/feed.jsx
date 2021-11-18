import React, { useEffect, useState, useContext } from "react";
import "./feed.css";
import Post from "./post.jsx";
import httpClient from "../../Utils/httpClient";
import { DataContext } from "../../Context/DataProvider";

function Feed() {
  const { dataid, tag, tagvalue } = useContext(DataContext);
  const [posts, setPosts] = useState([{}]);
  useEffect(() => {
    tagvalue
      ? httpClient
          .POST("question/tag/" + dataid, { tag: tag.tag }, {})
          .then((response) => {
            setPosts(response.data);
          })
          .catch((err) => {
            console.log(err);
          })
      : httpClient
          .GET("question/work/" + dataid, {})
          .then((response) => {
            setPosts(response.data);
          })
          .catch((err) => {
            console.log(err);
          });
  }, [dataid, tagvalue, tag]);
  return (
    <div className="feed">
      {posts.map((item) => (
        <Post
          id={item._id}
          Id={item.employee_id}
          question={item.description}
          timestamp={item.createdAt}
          state={item.ques_state}
        />
      ))}
    </div>
  );
}

export default Feed;
