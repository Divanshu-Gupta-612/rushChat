import { Button, Box } from "@chakra-ui/react";
import { useAuth } from "../../common/useAuth.jsx";
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";

export default function LandingPage() {
    // const navigate = useNavigate();
    // const { token } = useAuth()
    // if (token == null) {
    //     navigate('/')
    // }
    return (
        <Box className=" w-full h-[100vh] flex justify-center items-center bg-gray-800">
            <Box className=" flex flex-col gap-10">
                <h1 className=" text-center text-4xl text-green-500 font-semibold">Welcome To <br /> Rush Chat</h1>
                <Link to='/auth/login'><Button width='200px'>Login</Button></Link>
                <Link to='/auth/SignUp'><Button width='200px'>Sign In</Button></Link>
            </Box>
        </Box>
    )
}
