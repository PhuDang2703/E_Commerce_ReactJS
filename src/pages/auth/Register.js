import styles from "./auth.module.scss"
import registerImg from "../../assets/register.png"
import Card from "../../components/card/Card"
import { Link, useNavigate } from "react-router-dom"
import { FaGoogle } from "react-icons/fa"
import { useState } from "react"
import { ToastContainer, toast } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
import { createUserWithEmailAndPassword } from "firebase/auth"
import { auth } from "../../firebase/config"
import Loader from "../../components/loader/Loader"

const Register = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [cPassword, setCPassword] = useState("");
    const [isLoading, setIsLoading] = useState("");

    const navigate = useNavigate();

    const registerUser = (e) => {
        e.preventDefault();
        if (password !== cPassword) {
            toast.error("Password do not match.")
        }
        setIsLoading(true);

        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;

                setIsLoading(false);
                toast.success("Registration Successfull...");
                navigate("/login");
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                
                toast.error(error.message);
                setIsLoading(false);
            });
    };

    return (
        <>
            <ToastContainer />
            {/* Loader này đc thực hiện khi lệnh bên trái isLoading là true */}
            {isLoading && <Loader />}
            <section className={`container ${styles.auth}`}>
                <Card>
                    <div className={styles.form}>
                        <h2>Register</h2>

                        <form onSubmit={registerUser}>
                            <input type='text' placeholder='Email' required value={email} onChange={(e) => setEmail(e.target.value)} />
                            <input type='password' placeholder='Password' required value={password} onChange={(e) => setPassword(e.target.value)} />
                            <input type='password' placeholder='Confirm Password' required value={cPassword} onChange={(e) => setCPassword(e.target.value)} />
                            <button type="sumbit" className='--btn --btn-primary --btn-block'>Register</button>
                        </form>

                        {/* <button className='--btn --btn-danger --btn-block'><FaGoogle color='#fff' /> Login With Google</button> */}
                        <span className={styles.register}>
                            <p>Already an account?</p>
                            <Link to="/login">Login</Link>
                        </span>
                    </div>
                </Card>

                <div className={styles.img}>
                    <img src={registerImg} alt='Register' width="400" />
                </div>
            </section>
        </>
    )
}

export default Register