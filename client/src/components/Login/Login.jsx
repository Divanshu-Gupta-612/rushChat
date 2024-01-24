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
import { useState } from 'react';

export default function LoginPage() {

    const [userData, setUserData] = useState()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isEmailValid, setIsEmailValid] = useState(false)
    const [isPasswordValid, setIsPasswordValid] = useState(false)

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

    function isValidPassword(password) {
        // Minimum length of 8 characters
        const minLength = 8;

        // At least one uppercase letter
        const hasUppercase = /[A-Z]/.test(password);

        // At least one lowercase letter
        const hasLowercase = /[a-z]/.test(password);

        // At least one digit
        const hasDigit = /\d/.test(password);

        // At least one special character
        const hasSpecialChar = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/.test(password);

        // Check if all conditions are met
        return (
            password.length >= minLength &&
            hasUppercase &&
            hasLowercase &&
            hasDigit &&
            hasSpecialChar
        );
    }

    function updateEmail(e) {
        setEmail(e.target.value)
        console.log("email: ", isValidEmail(email))
        setIsEmailValid(isValidEmail(email))
    }

    function updatePassword(e) {
        setPassword(e.target.value)
        console.log("password: ", isValidPassword(password))
        setIsPasswordValid(isValidPassword(password))
    }

    function handelSubmit() {

    }

    return (
        <Box className='flex justify-center items-center w-full h-[100vh] bg-gray-800 text-white'>
            <Box className=' border rounded-lg p-12'>
                <Center className='text-2xl font-semibold pb-5 uppercase flex flex-col' gap={3}>
                    <span className='text-6xl'><FaRocketchat className='text-green-600' /></span>
                    <span>Login</span>
                </Center>
                <Flex flexDirection='column' gap='20px'>
                    <FormControl>
                        <FormLabel>Email :</FormLabel>
                        <Input onChange={updateEmail} type='email' />
                    </FormControl>
                    <FormControl id='password'>
                        <FormLabel>Password :</FormLabel>
                        <Input onChange={updatePassword} type='password' />
                    </FormControl>
                    <Button className='text-white bg-gray-800'>Login</Button>
                </Flex>
            </Box>
        </Box>
    )
}
