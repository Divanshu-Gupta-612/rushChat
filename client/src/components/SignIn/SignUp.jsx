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
    const [userData, setUserData] = useState({
        'email': '',
        'password': '',
        're-password': '',
        'username': ''
    });
    const [isEmailValid, setIsEmailValid] = useState(true)
    const [isPasswordValid, setIsPasswordValid] = useState(true)
    const [isPasswordMatch, setIsPasswordMatch] = useState(0)

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
        if (e.target.value !== '') {
            setIsEmailValid(isValidEmail(userData['email']))
        }
    }

    function updatePassword(e) {
        if (e.target.value !== '') {
            setIsPasswordValid(isValidPassword(userData['password']))
            if (userData['re-password'] !== '') {
                if (userData['re-password'] === userData['password']) {
                    setIsPasswordMatch(2)
                } else {
                    setIsPasswordMatch(0)
                }
            }
        }
    }

    function updateRePassword(e) {
        if (e.target.value !== '') {
            if (e.target.value === userData['password']) {
                setIsPasswordMatch(2)
            } else {
                setIsPasswordMatch(0)
            }
        }
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
            email: userData.email,
            username: userData.username,
            password: password,
        }).then((res) => {
            console.log("This is the response data from signUp Page : ", res?.data);
            toast({
                title: res?.data?.msg,
                description: "We've created your account for you. Please login",
                status: 'success',
                duration: 9000,
                isClosable: true,
            })
            navigate('/auth/login');
        }).catch((err) => {
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
            <Box className=' border rounded-lg p-12 w-fit'>
                <Center className='text-2xl font-semibold pb-5 uppercase flex flex-col' gap={3}>
                    <span className='text-6xl'><FaRocketchat className='text-green-600' /></span>
                    <span>SignUp</span>
                </Center>
                <Flex flexDirection='column' gap='15px'>

                    <Flex className="gap-3">
                        <FormControl isInvalid={!isEmailValid} isRequired={true} >
                            <FormLabel>Email :</FormLabel>
                            <Input onChange={(e) => handelUserData(e)} type='email' name='email' onFocus={() => setIsEmailValid(true)} onBlur={(e) => updateEmail(e)} />
                            {isEmailValid ? (
                                <FormHelperText>
                                    &nbsp;
                                </FormHelperText>
                            ) : (
                                <FormErrorMessage>Email is not correct.</FormErrorMessage>
                            )}
                        </FormControl>

                        <FormControl isRequired={true}>
                            <FormLabel>Username :</FormLabel>
                            <Input onChange={handelUserData} type='text' name='username'/> 
                            <FormHelperText>
                                &nbsp;
                            </FormHelperText>
                        </FormControl>
                    </Flex>

                    <FormControl isInvalid={!isPasswordValid} isRequired={true}>
                        <FormLabel>Password :</FormLabel>
                        <Input onChange={(e) => handelUserData(e)} type='password' name='password' onFocus={() => setIsPasswordValid(true)} onBlur={(e) => updatePassword(e)} />
                        {isPasswordValid ?
                            <FormHelperText>
                                &nbsp;
                            </FormHelperText>
                            :
                            <FormErrorMessage>Invalid Password </FormErrorMessage>
                        }
                    </FormControl>

                    <FormControl isInvalid={!isPasswordMatch} isRequired={true}>
                        <FormLabel>Re-Password :</FormLabel>
                        <Input onChange={(e) => handelUserData(e)} type='password' name='re-password' onFocus={() => setIsPasswordMatch(1)} onBlur={(e) => updateRePassword(e)} />
                        {!isPasswordMatch == 0 ?
                            (isPasswordMatch == 1 ?
                                <FormHelperText >
                                    &nbsp;
                                </FormHelperText>
                                :
                                <FormHelperText color='green'>
                                    Password Matched
                                </FormHelperText>)
                            :
                            <FormErrorMessage>Password not matched </FormErrorMessage>
                        }
                    </FormControl>

                    <Button onClick={handelSubmit} className='text-white bg-gray-800'>SignUp</Button>
                    <Box m={'auto'} className=''>
                        <Link to='/auth/login' className='flex items-center'>
                            Already have an account  <GoArrowRight className='ml-2' />
                        </Link>
                    </Box>
                </Flex>
            </Box>
        </Box>
    )
}