import { useState } from "react";
import { auth, googleProvider } from "../config/firebase";
import { createUserWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import Swal from "sweetalert2";


export const Auth = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const signIn = async () => {
        try {
            await createUserWithEmailAndPassword(auth, email, password);
            Swal.fire({
                icon: "success",
                title: "Inscription réussie!",
            });
            setEmail("");
            setPassword("");
        } catch (error) {
            console.error(error);
        }
    };
    

    const signInWithGoogle = async () => {
        try {
            await signInWithPopup(auth, googleProvider)
        } catch (error) {
            console.error(error);
        }
    }

    const logout = async () => {
        try {
            await signOut(auth);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-body">
                            <div className="mb-3">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Email"
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <input
                                    type="password"
                                    className="form-control"
                                    placeholder="Password"
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <button className="btn btn-primary" onClick={signIn}>
                                    Sign In
                                </button>
                                <button className="btn btn-success ms-3" onClick={signInWithGoogle}>
                                    Sign In With Google
                                </button>
                                <button className="btn btn-danger ms-3" onClick={logout}>
                                    Log Out
                                </button>
                            </div>
                           
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
