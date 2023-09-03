import { Box } from "@mui/system";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Layout from "../components/Layout";
import PostItem from "../components/PostItem";
import supabase from "../supabaseConfig/supabaseClient";

const AuthorPage = ({ posts }) => {
  //   const [user, setUser] = useState(null);
  // const [posts, setPosts] = useState(null);
  const router = useRouter();
  const { authorId } = router.query;
  console.log("🚀 ~ AuthorPage ~ authorId:", authorId);
  const filtredPosts = posts.filter((post) => post.owner.id === authorId);

  useEffect(() => {
    // checkUser();
  }, []);

  async function checkUser() {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (user) {
      console.log("🚀 ~ checkUser ~ user:", user);
      //   setUser(user);
    }
  }

  // async function getUserPosts(authorId) {
  //   const { data, error } = await supabase
  //     .from('posts')
  //     .select()
  //     .eq('owner_id', authorId);
  //   console.log("🚀 ~ on Author page ~ data:", data)
  //   if (error) {
  //     console.log("🚀 ~ getServerSideProps ~ error:", error);
  //     }
  //     setPosts(data)
  // }

  return (
    <Layout title="Authors">
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <ul>
          {filtredPosts.map((post) => (
            <li
              key={post.id}
              style={{ listStyle: "none", marginBottom: "20px" }}
            >
              <PostItem post={post} />
            </li>
          ))}
        </ul>
      </Box>
    </Layout>
  );
};

export default AuthorPage;

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
