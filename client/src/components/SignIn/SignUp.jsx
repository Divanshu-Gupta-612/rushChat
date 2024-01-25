import {
    FormControl,
    FormLabel,
    FormErrorMessage,
    FormHelperText,
    Box,
    Input,
    Center,
    Button,
    Flex,
    useToast,
    Text,
    Link as Linker
} from '@chakra-ui/react';
import { FaRocketchat } from "react-icons/fa";
import { GoArrowRight } from "react-icons/go";
import apiAuthInstance from '../../api/authApi';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function LoginPage() {
    
    // Toast is for the notification on screen 
    const toast = useToast();
    //Form data is inside the userData state
    const [userData, setUserData] = useState();

    //This is for useNavigate hook to regirect user to other routes
    const navigate = useNavigate();

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [rePassword, setRePassword] = useState('')
    const [isEmailValid, setIsEmailValid] = useState(true)
    const [isPasswordValid, setIsPasswordValid] = useState(true)
    const [isPasswordMatch, setIsPasswordMatch] = useState(true)

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
        setIsEmailValid(isValidEmail(email))
        console.log(email, isEmailValid);
    }

    function updateRePassword(e) {
        setRePassword(e.target.value)
        setIsPasswordMatch(
            password===rePassword
        )
        console.log(rePassword, password, isPasswordMatch, !(password!==rePassword));
    }

    function updatePassword(e) {
        setPassword(e.target.value)
        setIsPasswordValid(isValidPassword(password))
        console.log(password, isPasswordValid);
    }

    function handelUserData(e) {
        e.preventDefault();
        setUserData({
            ...userData, [e.target.name]: e.target.value,
        })
    }

    function handelSubmit(e) {
        e.preventDefault();
        apiAuthInstance.post('/auth/user/register', {
            email : userData.email,
            username : userData.username,
            password : password,
        }).then((res)=>{
            console.log("This is the response data from signUp Page : ",res?.data);
            toast({
                title: res?.data?.msg,
                description: "We've created your account for you. Please login",
                status: 'success',
                duration: 9000,
                isClosable: true,
            })
            navigate('/auth/login');
        }).catch((err)=>{
            console.log("This is the error from the signup page", err);
            toast({
                title: err?.response?.data?.msg,
                description: "Tip : Use other detail if you have tried many times",
                status: 'error',
                duration: 9000,
                isClosable: true,
            })
        })
    }

    return (
        <Box className='flex justify-center items-center w-full h-[100vh] bg-gray-800 text-white'>
            <Box className=' border rounded-lg p-12 w-[25%]'>
                <Center className='text-2xl font-semibold pb-5 uppercase flex flex-col' gap={3}>
                    <span className='text-6xl'><FaRocketchat className='text-green-600' /></span>
                    <span>SignUp</span>
                </Center>
                <Flex flexDirection='column' gap='15px'>

                    <FormControl isInvalid={!isEmailValid}>
                        <FormLabel>Email :</FormLabel>
                        <Input onChange={(e) => { handelUserData(e); updateEmail(e) }} type='email' name='email' />
                        {isEmailValid ? (
                            <FormHelperText>
                                Enter the email.
                            </FormHelperText>
                        ) : (
                            <FormErrorMessage>Email is required.</FormErrorMessage>
                        )}
                    </FormControl>

                    <FormControl>
                        <FormLabel>Username :</FormLabel>
                        <Input 
                            onChange={handelUserData} 
                            type='text' 
                            name='username' />
                    </FormControl>

                    <FormControl isInvalid={!isPasswordValid}>
                        <FormLabel>Password :</FormLabel>
                        <Input 
                            onChange={(e) => { handelUserData(e); updatePassword(e) }} 
                            type='password' 
                            name='password'/>
                        {isPasswordValid ?
                            <FormHelperText>
                                Enter the password. {password}
                            </FormHelperText>
                            :
                            <FormErrorMessage>Invalid Password {password}</FormErrorMessage>
                        }
                    </FormControl>

                    <FormControl isInvalid={!isPasswordMatch}>
                        <FormLabel>Re-Password :</FormLabel>
                        <Input onChange={(e)=>{handelUserData(e); updateRePassword(e)}} type='password' name='re-password' />
                        {isPasswordMatch ?
                            <FormHelperText color='green'>
                                Password Matched. {rePassword}
                            </FormHelperText>
                            :
                            <FormErrorMessage>Invalid Password {rePassword}</FormErrorMessage>
                        }
                    </FormControl>

                    <Button onClick={handelSubmit} className='text-white bg-gray-800'>SignUp</Button>
                    <Box m={'auto'} className=''>
                        <Link to='/auth/login' className='flex items-center'>
                            Already have an account  <GoArrowRight className='ml-2'/>
                        </Link>
                    </Box>
                </Flex>
            </Box>
        </Box>
    )
}