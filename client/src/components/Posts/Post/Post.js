import React from "react";
import { useHistory } from "react-router-dom";
const Post = ({ post, setCurrentId }) => {
  const user = JSON.parse(localStorage.getItem("profile"));
  const history = useHistory();

  // const userId = user?.result.googleId || user?.result?._id;

  const openPost = (e) => {
    history.push(`/course/${post._id}`);
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          borderBottom: "1px solid rgb(220,220,220)",
          margin: -10,
        }}
      >
        <div style={{ width: "30%", marginTop: 22 }}>
          <img
            src={
              post.img ||
              "https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png"
            }
            style={{
              width: "250px",
              height: "150px",
              borderLeft: "1px solid black",
              borderRadius: "5px",
            }}
          />
        </div>
        <div style={{ width: "100%", padding: "20px", marginLeft: "40px" }}>
          <button
            onClick={openPost}
            style={{
              backgroundColor: "white",
              border: 0,
              margin: -10,
              padding: -10,
            }}
          >
            <p
              style={{
                marginLeft: -10,
                lineHeight: "1px",
                fontSize: "16px",
                fontWeight: "bold",
              }}
            >
              <span style={{ width: "90%", float: "left", marginLeft: -30 }}>
                {post.course_name}
              </span>
              <span
                style={{
                  height: "20px",
                  marginLeft: "100px",
                  width: "10%",
                  float: "right",
                }}
              >
                ₹{post.price}
              </span>
            </p>
          </button>
          <p
            style={{
              marginLeft: -10,
              marginTop: 5,
              lineHeight: 1.5,
              fontSize: 14,
            }}
          >
            {post.description.map((des) => des)}...
          </p>
          <p
            style={{
              marginLeft: -10,
              marginTop: -10,
              lineHeight: 1.5,
              fontSize: 12,
              fontWeight: "700",
            }}
          >
            {post.instructors.map((ins) => ins.creator)}
          </p>
          <p style={{ marginLeft: -10, marginTop: -10, fontSize: 12 }}>
            <span>Rating:{post.ratings}</span>
          </p>
          <div style={{ marginLeft: -10, marginTop: -10, fontSize: 15 }}>
            <span style={{ color: "grey", fontSize: "12px" }}>
              {post.course_time} total hours
            </span>
            <span
              style={{ color: "grey", marginLeft: "5px", fontSize: "12px" }}
            >
              <span style={{ fontWeight: "900" }}>.</span>
              {post.course_total_lectures} total lectures
            </span>
            <span
              style={{ color: "grey", marginLeft: "5px", fontSize: "12px" }}
            >
              <span style={{ fontWeight: "900" }}>.</span>
              {post.level}
            </span>
          </div>
          <div style={{ marginLeft: -10, marginTop: 5, fontSize: 15 }}>
            <p>
              {post.tags.map((tag) => (
                <span
                  style={{
                    backgroundColor: "rgb(243,202,140)",
                    borderRadius: "2px",
                    padding: "3px",
                    margin: "2px",
                  }}
                >{`#${tag} `}</span>
              ))}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;