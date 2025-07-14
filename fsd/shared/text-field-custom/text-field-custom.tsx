import {TextField} from "@mui/material";
import {TextFieldProps} from "@mui/material/TextField/TextField";

type TextFieldCustomProps = Omit<TextFieldProps, "variant">

export const TextFieldCustom = (props: TextFieldCustomProps) => {
  return (
    <TextField
      {...props}
      sx={{
        mt: 3,
        ...props.sx,
        "& .MuiInput-root": {
          borderRadius: "8px",
          border: "1px solid #E1E1E1",
          mt: 0,
          fontSize: 14,
          height: {xs: "48px", sm: "56px"},
          padding: "30px 16px 10px",
          ...(props.sx && (props.sx as any)["& .MuiInput-root"]),
        },
        "& .MuiInput-input:-webkit-autofill": {
          WebkitBoxShadow: `0 0 0 100px #fff inset`,
          WebkitTextFillColor: "#000",
        },
        "& .MuiInputLabel-root": {
          pointerEvents: "none",
          color: "#A6ABB0",
          left: "16px",
          fontSize: {xs: 12, sm: 14},
          zIndex: 1,
          top: "50%",
          transform: props.error ? "translateY(-100%)" : "translateY(-50%)",
          "&.Mui-focused": {
            transform: "translateY(-100%)",
          },
          "&.MuiFormLabel-filled": {
            transform: props.error ? "translateY(-150%)" : "translateY(-100%)",
          },
        },
      }}
      fullWidth
      InputProps={{
        ...props.InputProps,
        disableUnderline: true,
      }}
      variant="standard"
    />
  );
};

export default TextFieldCustom;
