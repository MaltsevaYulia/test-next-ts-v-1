import { Button, Paper } from "@mui/material";
import { useForm } from "react-hook-form";
import { FormInputText } from "./FormInputText";
import { FormInputDropdown } from "./FormInputDropdown";
import supabase from "../../supabaseConfig/supabaseClient";
import { useState } from "react";


interface IFormInput {
  name:string;
  email: string;
  password: string;
  profileType: string;
}
const defaultValues = {
  email: "",
  password: "",
  profileType: "",

};


export const SingUpForm = () => {
  const [isRegister, setIsRegister] = useState(false)
  
  const { handleSubmit, reset, control } = useForm({
    defaultValues: defaultValues,
  });

  const onSubmit = async (formData: IFormInput) => {

    const {email,password,profileType,name}=formData
    
    try {
      const respons = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
          name,
          profileType
          },
          emailRedirectTo:window.location.origin
      }
      })
      setIsRegister(true);
   
 } catch (error) {
   console.log("🚀 ~ onSubmit ~ error:", error)  
    } 
    reset();
}
 
  return (
    <Paper
      style={{
        display: "grid",
        gridRowGap: "20px",
        padding: "20px",
        margin: "10px 300px",
      }}
    >
      <FormInputText name="name" control={control} label="Name" />
      <FormInputText name="email" control={control} label="Email" />
      <FormInputText name="password" control={control} label="Password" />
      <FormInputDropdown
        name="profileType"
        control={control}
        label="Profile type"
      />
      <Button onClick={handleSubmit(onSubmit)} variant={"outlined"}>
        Submit
      </Button>
      {isRegister && (
        <div style={{ color: "#1976d2" }}>Please check your email</div>
      )}
    </Paper>
  );
};


  