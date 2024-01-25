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
import { GoArrowRight } from "react-icons/go";
import { FaRocketchat } from "react-icons/fa";
import apiAuthInstance from '../../api/authApi';
import { useAuth } from '../../common/useAuth';
import {useNavigate} from 'react-router-dom';
import { useToast } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

export default function LoginPage() {
    const {userLogin} = useAuth();
    const navi = useNavigate();
    const toast = useToast();

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

    // function isValidEmail(email) {
    //     // Basic email validation using a regular expression
    //     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    //     return emailRegex.test(email);
    // }

    function updateEmail(e) {
         if(e.target.value!==''){
            setIsEmailValid(isValidEmail(userData['email']))
        }
    }

    function handelSubmit() {
        apiAuthInstance.post('/auth/user/login', {
            email : userData.email, 
            password : userData.password
        })
        .then((res)=>{
            setUserData({
                email : '',
                password : ''
            })

            console.log("This is response data from Login",res)
            userLogin({userdata: res?.data?.userDetail});
            toast({
                title: 'Login Sucessfull.',
                description: "We've logged into your account for you.",
                status: 'success',
                duration: 9000,
                isClosable: true,
            })
            navi('/');
        }).catch((err)=>{
            console.log("The Error from login page : ",err,'\n',err.message);

            console.log("/n  this from err handling : ",err?.response?.data)
            toast({
                title: err?.response?.data?.msg,
                description: "Tip : create an account",
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
                    <Button 
                        onClick={handelSubmit}  
                        className='text-white bg-gray-800'
                    >Login</Button>
                    <Box m={'auto'} className=''>
                        <Link to='/auth/signup' className='flex items-center'>
                            Create you Account  <GoArrowRight className='ml-2'/>
                        </Link>
                    </Box>
                </Flex>
            </Box>
        </Box>
    )
}
