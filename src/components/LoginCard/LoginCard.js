import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import {
    Card,
    Button,
    TextField,
    CardContent
} from "@mui/material";
import "./LoginCard.scss";
import apiService from "../../api/apiService";

const RegisterCard = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [formErrors, setFormErrors] = useState({});
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!username || !password) {
            setFormErrors({
                username: !username,
                password: !password,
            });
            return;
        }

        const data = {
            username, password
        };

        apiService
            .post("login/", data)
            .then((response) => {
                console.log(response.access);
                localStorage.setItem("token", response.access);

                apiService.get("UserProfile/me/").then((response) => {
                    localStorage.setItem("user", response.user.username);
                    localStorage.setItem("role", response.role);
                });
                navigate("/");
            })
            .catch((error) => console.log(error));

        setUsername("");
        setPassword("");
    };

    return (<Card variant="outlined" sx={{width: "30vw", transition: "all 0.3s"}}>
        <CardContent className="register-card">
            <h2 className="register-card__title">Login to your account</h2>
            <TextField
                label="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                fullWidth
                margin="normal"
                error={formErrors.username}
            />
            <TextField
                label="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                fullWidth
                margin="normal"
                error={formErrors.password}
            />
            <Button onClick={handleSubmit} variant="contained" color="primary">Login</Button>
        </CardContent>
    </Card>);
};

export default RegisterCard;
