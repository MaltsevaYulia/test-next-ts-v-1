import { Button, Paper, Typography } from "@mui/material";
import { userInfo } from "os";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import supabase from "../supabaseConfig/supabaseClient";
import { FormInputText } from "./SingUpForm/FormInputText";
import FormInputUploudImg from "./SingUpForm/FormInputUploudImg";
import { v4 as uuidv4 } from "uuid";

interface IFormInput {
  title: string;
  description: string;
  img: string;
}
const defaultValues = {
  title: "",
  description: "",
  img: "",
};

const PostForm = ({ user }) => {
  const { handleSubmit, reset, control } = useForm({
    defaultValues: defaultValues,
  });
    const [img, setImg] = useState(null);

  const uploadImage = async (event) => {
    const id = uuidv4();
    const postPhoto = event.target.files[0];
    const { data, error } = await supabase.storage
      .from("postsPhoto")
      .upload(`${user.id}/${id}`, postPhoto, {
        cacheControl: "3600",
        upsert: false,
      });
      if (data) {
          const photo = `https://msumwvspypdokyplddxn.supabase.co/storage/v1/object/public/postsPhoto/${user.id}/${id}`;
        setImg(photo);
    } else {
      console.log(error);
    }
  };


  const onSubmit = async (formData: IFormInput) => {
    console.log("🚀 ~ onSubmit ~ formData:", formData);
    const { title, description } = formData;

    try {
      const { error } = await supabase
        .from("posts")
        .insert({ title, description, owner: user , img});
    } catch (error) {
      console.log("🚀 ~ onSubmit ~ error:", error);
    }
  };

  return (
    <Paper
      style={{
        display: "grid",
        gridRowGap: "20px",
        padding: "20px",
        margin: "10px 200px",
      }}
    >
      <Typography variant="h4"> Create post</Typography>
      <FormInputText name="title" control={control} label="Title" />
      <FormInputText name="description" control={control} label="Description" />
      <FormInputUploudImg
        name="img"
        control={control}
        label="Add post photo"
        uploadImage={uploadImage}
      />
      <Button onClick={handleSubmit(onSubmit)} variant={"outlined"}>
        Submit
      </Button>
    </Paper>
  );
};

export default PostForm;
