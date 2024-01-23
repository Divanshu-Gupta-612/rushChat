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
} from '@chakra-ui/react'

export default function LoginPage() {
    return (
        <Box className=' flex justify-center items-center w-full h-[100vh] bg-gray-200 '>
            <Box className=' border rounded-lg p-10'>
                <Center className=' text-2xl font-semibold pb-5'>
                    Login
                </Center>
                <Flex flexDirection='column' gap='20px'>
                    <FormControl>
                        <FormLabel>Email :</FormLabel>
                        <Input type='email' />
                    </FormControl>
                    <FormControl>
                        <FormLabel>Password :</FormLabel>
                        <Input type='password' />
                    </FormControl>
                    <Button colorScheme='blue'>Login</Button>
                </Flex>
            </Box>
        </Box>
    )
}
