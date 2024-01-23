import { Box, Button, Flex, Center, Spacer, Input } from "@chakra-ui/react"
import LoginPage from "./components/Login/Login"

function App() {

  return (
    <>
      <LoginPage/>
      {/* <Flex className=" w-[100%] h-[100vh] p-5">
        <Box className=" w-1/5 border p-5">
          Room List
        </Box>
        <Flex className=" w-4/5 border" flexDirection='column'>
          <Flex p='10px'>
            <Center>
              UserName
            </Center>
            <Spacer />
            <Flex gap='20px'>
              <Button>Create Room</Button>
              <Button>Logout</Button>
            </Flex>
          </Flex>
          <Box p='10px' width='100%' className=" grow flex flex-col">
            <Box className=" border grow rounded-lg p-5" mb='10px' >
              message Display Area
            </Box>
            <Flex gap='10px'>
              <Input placeholder="Enter Message" />
              <Button colorScheme='blue'>Send</Button>
            </Flex>
          </Box>
        </Flex>
      </Flex> */}
    </>
  )
}

export default App
