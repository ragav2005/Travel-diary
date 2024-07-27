import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PageNav from "../components/PageNav";
import { useAuth } from "../Contexts/AuthContext";
import styles from "./Login.module.css";

export default function Login() {
  // PRE-FILL FOR DEV PURPOSES
  const [email, setEmail] = useState("ragav@example.com");
  const [password, setPassword] = useState("qwerty");
  const { logIn, isAuthenticated } = useAuth();
  const [type, setType] = useState("password");
  const [isShow, setIsShow] = useState(false);
  const navigate = useNavigate();

  const handleLogIn = (e) => {
    e.preventDefault();
    logIn(email, password);
  };

  const handleClick = () => {
    setIsShow((show) => !show);
    if (isShow) {
      setType("password");
    } else {
      setType("text");
    }
  };

  useEffect(() => {
    if (isAuthenticated) navigate("/app", { replace: true });
  }, [isAuthenticated, navigate]);

  return (
    <main className={styles.login}>
      <PageNav />
      <form className={styles.form} onSubmit={handleLogIn}>
        <div className={styles.row}>
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>

        <div className={styles.row}>
          <label htmlFor="password">Password</label>
          <div className={styles.password}>
            <input
              type={type}
              id="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
            <img
              src={isShow ? `../show.png` : `../hide.png`}
              className={styles.img}
              alt="Password toogle "
              height="24px"
              width="24px"
              onClick={handleClick}
            />
          </div>
        </div>

        <div>
          <button className={styles.button}>Login</button>
        </div>
      </form>
    </main>
  );
}
