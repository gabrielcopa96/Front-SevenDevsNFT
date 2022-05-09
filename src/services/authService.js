import axios from "axios";

const login = async (email, password) => {
    try {
        const authLogin = await axios.post("https://sevendevs-backend.herokuapp.com/auth", {
            email,
            password
        })
        const loginData = await authLogin.data
        const loginToken = await authLogin.data.token
        if(loginToken) {
            localStorage.setItem("token", JSON.stringify(loginToken))
        }
        return loginData
    } catch (error) {
        console.log("no se pudo autenticar", error)
    }
};

const logut = () => {
    localStorage.removeItem("token");
};

const getUser = () => {
    return JSON.parse(localStorage.getItem("token"));
};


const authService = {
    login,
    logut,
    getUser
};

export default authService;