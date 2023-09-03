import { Button, Paper } from "@mui/material";
import { useForm } from "react-hook-form";
import { FormInputText } from "./FormInputText";
import supabase from "../../supabaseConfig/supabaseClient";


interface IFormInput {
  email: string;
  password: string;
  profileType: string;
}
const defaultValues = {
  email: "",
  password: "",
  profileType: "",
};

export const SingInForm = () => {
  const { handleSubmit, reset, control } = useForm({
    defaultValues: defaultValues,
  });

  const onSubmit = async (formData: IFormInput) => {
    console.log(formData);
    const { email, password } = formData;
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
  
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
      <FormInputText name="email" control={control} label="Email" />
      <FormInputText name="password" control={control} label="Password" />
      <Button onClick={handleSubmit(onSubmit)} variant={"outlined"}>
        Submit
      </Button>
    </Paper>
  );
};
