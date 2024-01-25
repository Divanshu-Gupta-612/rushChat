import {
  Box,
  Button,
  Flex,
  Center,
  Spacer,
  Input,
  Stack,
  Avatar,
  AvatarBadge,
  Heading,
  Text
} from "@chakra-ui/react"
import { FaRocketchat } from 'react-icons/fa6'
import { AiOutlineSend } from "react-icons/ai";
import { useAuth } from "../../common/useAuth";
import { Socket, io } from 'socket.io-client'
import { useState } from "react";
const socket = io();

function HomePage() {
  // Logout Function
  const { userLogout } = useAuth();

  const [msg, setMsg] = useState('');
  const [userMsg, setUserMsg] = useState([]);

  function forSendingMsg(){
    setUserMsg([
      ...userMsg, { type: 'sent', content: msg, id : "You"}
    ])
    socket.emit('msgSent', msg);
    setMsg("");
  };

  socket.on('receiveMsg', ({ id, msg }) => {
    setUserMsg([
      ...userMsg, { type: 'reveived', content: msg , id : id}
    ]);
  });

  function userLogOutFunction() {
    userLogout();
  }

  return (
    <Flex className=" w-[100%] h-[100vh] p-5 bg-gray-800 text-white gap-3">
      <Box className=" w-1/5 border p-5 rounded-xl">
        <Heading size='md' className="text-center uppercase mb-3">
          Room List
        </Heading>
        <Box className="flex flex-col gap-2">
          <Box className="border p-2 rounded-xl flex items-center">

            {/* Avater part below This */}
            <Box className="avater-part pr-2">
              <Avatar size='sm'>
                <AvatarBadge borderColor='papayawhip' bg='green' boxSize='1em' />
              </Avatar>
            </Box>

            <Box className="text-center">
              <Text fontSize='sm'>Room Name</Text>
              <Text fontSize='xs'>Active now</Text>
            </Box>
          </Box>

        </Box>
      </Box>
      <Flex className=" w-4/5 border rounded-xl" flexDirection='column'>
        <Flex p='10px'>
          <Center>
            {/* Logo */}
            <Box className="Logo flex gap-2 items-center border p-2 rounded-lg">
              <FaRocketchat className='text-green-600 text-3xl' />
              <Text size='md' className="rounded-lg text-green-400 font-bold underline">rushChat</Text>
            </Box>

          </Center>
          <Spacer />
          <Flex gap='20px'>
            <Button>Create Room</Button>
            <Button onClick={userLogOutFunction}>Logout</Button>
          </Flex>
        </Flex>
        <Box p='10px' width='100%' className=" grow flex flex-col">
          <Box className="grow rounded-lg" mb='10px'>
            <Box className="border-2 border-yellow-500 rounded-xl p-3">
              <Stack direction='row' spacing={4} className="flex flex-col items-center">
                <Box className="p-0.5 rounded-full border-2 border-gray-300">
                  <Avatar>
                    <AvatarBadge boxSize='1em' bg='green.500' />
                  </Avatar>
                </Box>
                <Box className="text-center">
                  <Text fontSize='sm'>Room Name</Text>
                  <Text fontSize='xs'>Active now</Text>
                </Box>
              </Stack>
            </Box>
            <Box className="msgShowArea px-5 pt-2 mt-3 flex flex-col gap-3 h-[700px] overflow-scroll">
              {
                userMsg.map((item, index) =>
                  (item.type === 'sent') ?
                    <Box key={index}>
                      <Box className="float-right flex items-center">
                        <Text className="bg-green-300 p-3 rounded-tl-xl rounded-br-lg border border-green-400 text-black flex flex-col">
                          <span> {item.content} </span><span className="text-xs font-medium">{item.id}</span>
                        </Text>
                        <Avatar className="ml-3" size='sm' name='Kent Dodds' src='https://bit.ly/kent-c-dodds' />
                      </Box>
                    </Box>
                    :
                    <Box key={index}>
                      <Box className="float-left flex items-center">
                        <Avatar className="mr-3" size='sm' name='Dan Abrahmov' src='https://bit.ly/dan-abramov' />
                          <Text className="bg-blue-300 p-3 rounded-tr-xl rounded-bl-lg border-blue-400 text-black flex flex-col">
                          <span className="text-xs font-medium">{item.id}</span><span> {item.content} </span>
                          </Text>
                      </Box>
                    </Box>
                )
              }
            </Box>
          </Box>
          <Flex gap='10px'>
            <Input onChange={(e) => setMsg(e.target.value)} value={msg} placeholder="Enter Message" />
            <Button onClick={forSendingMsg} className="border text-center px-6">
              <AiOutlineSend className="text-black text-xl" />
            </Button>
          </Flex>
        </Box>
      </Flex>
    </Flex>
  )
}

export default HomePage
