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

export default function LoginPage() {

    const[userData, setUserData] = useState();

    function handelUserData(e){
        e.preventDefault();

        setUserData({
            ...userData, [e.target.name] : e.target.value,
        })
    }

    function handelSubmit(){

    }
    return (
        <Box className='flex justify-center items-center w-full h-[100vh] bg-gray-800 text-white'>
            <Box className=' border rounded-lg p-12'>
                <Center className='text-2xl font-semibold pb-5 uppercase flex flex-col' gap={3}>
                    <span className='text-6xl'><FaRocketchat className='text-green-600'/></span>
                    <span>Login</span>
                </Center>
                <Flex flexDirection='column' gap='20px'>
                    <FormControl>
                        <FormLabel>Email :</FormLabel>
                        <Input type='email'/>
                    </FormControl>
                    <FormControl>
                        <FormLabel>Password :</FormLabel>
                        <Input type='password'/>
                    </FormControl>
                    <Button className='text-white bg-gray-800'>Login</Button>
                </Flex>
            </Box>
        </Box>
    )
}
