import { useState } from "react";

import {
    BrowserRouter,
    Routes,
    Route,
    Link,
    useNavigate
} from "react-router-dom";

import Profile from "./Profile";
import Leave from "./Leave";
import LeaveList from "./LeaveList";


function Login() {

    const navigate = useNavigate();

    const [empid, setEmpid] = useState("");
    const [password, setPassword] = useState("");

    const login = async (e) => {

        e.preventDefault();

        try {

            const response = await fetch(
                "http://localhost:5000/api/employee/login",
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify({
                        empid: empid,
                        password: password
                    })
                }
            );

            const data = await response.json();

            if (response.ok) {

                localStorage.setItem("token", data.token);

                navigate("/home");

            } else {

                alert(data.message);
            }

        } catch (error) {

            alert("Unable to connect to server");

        }
    };

    return (
        <div>

            <h2>Employee Login</h2>

            <form onSubmit={login}>

                <div>
                    <label>Employee ID:</label>

                    <input
                        type="text"
                        value={empid}
                        onChange={(e) => setEmpid(e.target.value)}
                        required
                    />
                </div>

                <br />

                <div>
                    <label>Password:</label>

                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>

                <br />

                <button type="submit">
                    Login
                </button>

            </form>

        </div>
    );
}


function Home() {

    const navigate = useNavigate();

    const logout = () => {

        localStorage.removeItem("token");

        navigate("/");
    };

    return (
        <div>

            <h2>Employee Home</h2>

            <p>
                <Link to="/profile">
                    Page 1 - Employee Profile
                </Link>
            </p>

            <p>
                <Link to="/leave">
                    Page 2 - Application for Leave
                </Link>
            </p>

            <p>
                <Link to="/leave-list">
                    Leave List
                </Link>
            </p>

            <button onClick={logout}>
                Logout
            </button>

        </div>
    );
}


function App() {

    return (
        <BrowserRouter>

            <Routes>

                <Route
                    path="/"
                    element={<Login />}
                />

                <Route
                    path="/home"
                    element={<Home />}
                />

                <Route
                    path="/profile"
                    element={<Profile />}
                />

                <Route
                    path="/leave"
                    element={<Leave />}
                />

                <Route
                    path="/leave-list"
                    element={<LeaveList />}
                />

            </Routes>

        </BrowserRouter>
    );
}


export default App;