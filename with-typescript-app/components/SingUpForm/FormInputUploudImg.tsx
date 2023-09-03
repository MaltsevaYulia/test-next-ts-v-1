import React from "react";
import { Controller } from "react-hook-form";

const FormInputUploudImg = ({ control, name, label, uploadImage }) => {
  return (
    <Controller
      name="attachments"
      control={control}
      defaultValue=""
      render={({ field }) => (
        <>
          <label>{label} </label>
          <input
            {...field}
            type="file"
            multiple
            name={name}
            accept="image/*"
            onChange={(e) => uploadImage(e)}
          />
        </>
      )}
    />
  );
};

export default FormInputUploudImg;
