import { useState } from "react";
import InputField from "../../../components/common/input/input";
import style from "./login.module.sass";
import { Link, useNavigate } from "react-router-dom";
import { Post } from "../../../core/services/post";

export default function Login() {
  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  const navigate = useNavigate();
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setForm((data) => ({ ...data, [id]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const result = await Post("http://localhost:8080/gymbro/auth/login", form);

    if (result.success) {
      console.log("Login bem-sucedido!", result.data);
      localStorage.setItem("userId", result.data.id);
      localStorage.setItem("token", result.data.access_token);

      navigate("/home"); 
      
    } else {
      console.error("Erro no login:", result.message);
    }
  };

  return (
    <>
      <div className={style.container_video}>
        <video
          src="https://assets.mixkit.co/videos/23450/23450-720.mp4"
          autoPlay
          muted
          loop
        ></video>
      </div>
      <div className={style.container_login}>
        <div className={style.container_form}>
          <div className={style.text_container}>
            <h1>Welcome back!</h1>
            <p>Let's train today!</p>
          </div>
          <form onSubmit={handleSubmit}>
            <InputField
              label="username"
              placeholder="Enter your username:"
              type="text"
              iconClass="fi fi-rs-envelope"
              onChange={handleChange}
            />
            <InputField
              label="password"
              placeholder="Enter your password:"
              type="password"
              iconClass="fi fi-rs-lock"
              onChange={handleChange}
            />
            <button type="submit">Continue</button>
          </form>
        </div>
        <div className={style.toggle_pages}>
          <p>Don't have an account?</p>
          <Link to="/register">Register</Link>
        </div>
      </div>
    </>
  );
}