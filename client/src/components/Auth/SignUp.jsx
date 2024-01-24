import {
    FormControl,
    FormLabel,
    FormErrorMessage,
    FormHelperText,
    Box,
    Input,
    Center,
    Button,
    Flex
} from '@chakra-ui/react';
import { FaRocketchat } from "react-icons/fa";
import apiAuthInstance from '../../api/authApi';
import { useState } from 'react';

export default function LoginPage() {
    const [userData , setUserData] = useState();

    function handelUserData(e){
        e.preventDefault();
        setUserData({
            ...userData, [e.target.name] : e.target.value,
        })
    }

    function handelSubmit(e){
        e.preventDefault();
        apiAuthInstance.post('/auth/user/register', {userData})
        .then((res)=>{
            console.log("Data is from login response ",res);
        }).catch((err)=>{
            console.log("Error is from login error :",err);
        });
    }

    return (
        <Box className='flex justify-center items-center w-full h-[100vh] bg-gray-800 text-white'>
            <Box className=' border rounded-lg p-12 w-[25%]'>
                <Center className='text-2xl font-semibold pb-5 uppercase flex flex-col' gap={3}>
                    <span className='text-6xl'><FaRocketchat className='text-green-600'/></span>
                    <span>SignUp</span>
                </Center>
                <Flex flexDirection='column' gap='15px'>
                    <FormControl>
                        <FormLabel>Email :</FormLabel>
                        <Input onChange={handelUserData} type='email' name='email'/>
                    </FormControl>
                    <FormControl>
                        <FormLabel>Username :</FormLabel>
                        <Input onChange={handelUserData} type='text' name='username'/>
                    </FormControl>
                    <FormControl>
                        <FormLabel>Password :</FormLabel>
                        <Input onChange={handelUserData} type='password' name='password'/>
                    </FormControl>
                    <FormControl>
                        <FormLabel>Re-Password :</FormLabel>
                        <Input onChange={handelUserData} type='password' name='re-password'/>
                    </FormControl>
                    <Button className='text-white bg-gray-800'>SignUp</Button>
                </Flex>
            </Box>
        </Box>
    )
}
