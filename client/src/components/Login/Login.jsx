import { useState } from 'react';
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

export default function LoginPage() {

    const [userData, setUserData] = useState({
        'email' : '',
        'password' : ''
    })
    const [isEmailValid, setIsEmailValid] = useState(true)

    function handelUserData(e) {
        e.preventDefault();

        setUserData({
            ...userData, [e.target.name]: e.target.value,
        })
    }

    function isValidEmail(email) {
        // Basic email validation using a regular expression
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    function updateEmail(e) {
         if(e.target.value!==''){
            setIsEmailValid(isValidEmail(userData['email']))
        }
    }

    function handelSubmit() {

    }

    return (
        <Box className='flex justify-center items-center w-full h-[100vh] bg-gray-800 text-white'>
            <Box className=' border rounded-lg p-12 w-[25%]'>
                <Center className='text-2xl font-semibold pb-5 uppercase flex flex-col' gap={3}>
                    <span className='text-6xl'><FaRocketchat className='text-green-600' /></span>
                    <span>Login</span>
                </Center>
                <Flex flexDirection='column' gap='20px'>
                    <FormControl isRequired={true} isInvalid={!isEmailValid}>
                        <FormLabel>Email :</FormLabel>
                        <Input onChange={handelUserData} type='email' name='email' onFocus={()=>setIsEmailValid(true)} onBlur={(e)=>updateEmail(e)} />
                        {isEmailValid ? (
                            <FormHelperText>
                                &nbsp;
                            </FormHelperText>
                        ) : (
                            <FormErrorMessage>Email is not correct.</FormErrorMessage>
                        )}
                    </FormControl>
                    <FormControl id='password' isRequired={true}>
                        <FormLabel>Password :</FormLabel>
                        <Input onChange={handelUserData} type='password' />
                    </FormControl>
                    <Button onSubmit={handelSubmit} className='text-white bg-gray-800'>Login</Button>
                </Flex>
            </Box>
        </Box>
    )
}
