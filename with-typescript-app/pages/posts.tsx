import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import PostForm from "../components/PostForm";
import PostItem from "../components/PostItem";

import supabase from "../supabaseConfig/supabaseClient";

const PostsPage = ({ posts }) => {
  // const [error, setError] = useState(null);
  // const [posts, setPosts] = useState(null);
  const [user, setUser] = useState(null);


  useEffect(() => {
    checkUser();
  }, []);

  async function checkUser() {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (user) {
      console.log("🚀 ~ checkUser ~ user:", user);
      setUser(user);
    }
  }

  return (
    <Layout title="Posts">
      {user && user.user_metadata.profileType === "Author" && (
        <PostForm
          user={{
            name: user.user_metadata.name,
            profileType: user.user_metadata.profileType,
            id: user.id,
            email: user.email,
          }}
        />
      )}
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <ul>
          {posts.map((post) => (
            <li
              key={post.id}
              style={{ listStyle: "none", marginBottom: "20px" }}
            >
              <PostItem post={post} user={user} />
            </li>
          ))}
        </ul>
      </Box>
    </Layout>
  );
};

export const getServerSideProps = async (context) => {
  const { data, error } = await supabase.from("posts").select();

  if (error) {
    console.log("🚀 ~ getServerSideProps ~ error:", error);
  }

  return {
    props: {
      posts: data,
    },
  };
};

export default PostsPage;
