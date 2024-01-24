import { Button, Box } from "@chakra-ui/react";
import { useAuth } from "../../../common/useAuth.jsx";
import { Navigate } from 'react-router-dom';
import { useNavigate } from "react-router-dom";

export default function LandingPage() {
    const navigate = useNavigate();
    const { token } = useAuth()
    if (token == null) {
        navigate('/home')
    }
    return (
        <div>
            <Box className=" w-full h-[100vh] flex justify-center items-center">
                <Box className=" flex flex-col gap-10">
                    <h1 className=" text-center text-4xl text-blue-600 font-semibold">Welcome To <br /> Rush Chat</h1>
                    <Button colorScheme='blue' width='200px'>Login</Button>
                    <Button width='200px' colorScheme='blue'>Sign In</Button>
                </Box>
            </Box>
        </div>
    )
}
