'use client';
import { useState } from "react";
import { useRouter } from "next/navigation"; // 1. Router import karein
import style from "./page.module.css";

export default function Home() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [toasts, setToasts] = useState([]);
  
  const router = useRouter(); // 2. Router initialize karein

  const showToast = (message, type = 'success') => {
    const id = Date.now();
    const newToast = { id, message, type };
    setToasts((prev) => [...prev, newToast]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3500);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const BASE_API = "http://localhost:5000/api";
      const response = await fetch(`${BASE_API}/logincustomer`, {
        method: "POST",
        credentials: "include",
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const result = await response.json();

      if (response.ok && result.msg === "Login Sucessfully") {
        showToast("Login Successful!", "success");
        
        // 3. 2 second baad redirect karein
        setTimeout(() => {
          router.push("/Dashboard"); // Aapka destination path yahan aayega
        }, 2000);

      } else {
        showToast(result.msg || "Invalid credentials", "error");
      }
    } catch (error) {
      showToast("Server error. Please try again.", "error");
    }
  };

  return (
    <div className={style.container}>
      <div className={style.toastContainer}>
        {toasts.map((toast) => (
          <div key={toast.id} className={`${style.toast} ${style[toast.type]}`}>
            {toast.message}
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit} className={style.form}>
        <h2 className={style.h2}>Customer Login</h2>
        <input
          type="email"
          value={email}
          className={style.input}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter Email"
          required
        />
        <input
          type="password"
          value={password}
          className={style.input}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter Password"
          required
        />
        <button type="submit" className={style.btn}>Login Now</button>
      </form>
    </div>
  );
}