import Layout from "../components/Layout";
import { Box, Button, Paper } from "@mui/material";
import { useRouter } from "next/router";

const IndexPage = () => {
  const router = useRouter();

  const handleClick = (type) => {
    if (type === "register") router.push("/register");
    if (type === "sing-in") router.push("/sing-in");
  };

  return (
    <Layout title="Home">
      {/* <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          alignItems: "center",
          justifyContent: "center",
        }}
      > */}
      <Paper style={{
        display: "grid",
        gridRowGap: "20px",
        padding: "20px",
        margin: "10px 300px",
        justifyItems: "center"
      }}>
          <h1>Welcome</h1>
          <Button
            variant="contained"
            onClick={() => handleClick("register")}
          >
            Register
          </Button>
          <p>or</p>
          <Button variant="contained" onClick={() => handleClick("sing-in")}>
            Log In
          </Button>
        </Paper>
      {/* </Box> */}
    </Layout>
  );
};

export default IndexPage;
