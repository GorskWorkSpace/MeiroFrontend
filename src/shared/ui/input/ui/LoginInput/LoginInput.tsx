import type { InputHTMLAttributes } from "react";
import styles from "./LoginInput.module.css";
import { CloseIcon } from "../../../../assets";
import { useState } from "react";
import { Eye } from "../../../../assets/icons/Eye";
import { EyeOff } from "../../../../assets/icons/EyeOff";
import { InputBtn } from "../../../inputButton/ui/InputButtton";

interface LoginInputProps extends InputHTMLAttributes<HTMLInputElement> {
  placeholder: string;
  onClear?: () => void;
  variant?: string;
  type?: "text" | "password" | "tel" | "email";
  e?: string | number;
}

export const LoginInput = ({
  placeholder,
  variant,
  type = "text",
}: LoginInputProps) => {
  const [value, setValue] = useState("");
  const [pass, setPass] = useState("password");
  const [passwordIcon, setPasswordIcon] = useState(<EyeOff />);

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  const changeVisible = () => {
    pass == "password"
      ? (setPass("text"), setPasswordIcon(<Eye />))
      : (setPass("password"), setPasswordIcon(<EyeOff />));
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.search}>
        <input
          className={styles.input}
          type={type == "password" ? pass : type}
          placeholder={placeholder}
          value={value}
          onChange={handleChange}
        />
        {type == "password" && (
          <InputBtn onClick={changeVisible}>{passwordIcon}</InputBtn>
        )}
        {value && (
          <InputBtn onClick={() => setValue("")}>
            <CloseIcon color="#94A2B8" />
          </InputBtn>
        )}
      </div>
    </div>
  );
};
