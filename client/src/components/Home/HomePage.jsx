import React from "react";
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
  Text,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Select
} from "@chakra-ui/react"
import { FaRocketchat } from 'react-icons/fa6'
import { AiOutlineSend } from "react-icons/ai";
import { useAuth } from "../../common/useAuth";
import { Socket, io } from 'socket.io-client'
import { useState } from "react";

const socket = io()

function HomePage() {
  // Logout Function

  const { userLogout } = useAuth();
  let count = 0;

  const [msg, setMsg] = useState('');
  const [userMsg, setUserMsg] = useState([]);
  const [roomsList, setRoomsList] = useState([['AI']]);
  const [currentRoom, setCurrentRoom] = useState('');
  const [room, setRoom] = useState('');
  const { isOpen, onOpen, onClose } = useDisclosure()
  const cancelRef = React.useRef()

  function forSendingMsg() {
    console.log(currentRoom, "msg sent", msg);
    console.log("messages: ", userMsg);
    setUserMsg([
      ...userMsg, { type: 'sent', content: msg, id: "You" }
    ])
    socket.emit('msgSent', currentRoom, msg);
    setMsg("");
  };

  socket.on('id', (msg) => {
    console.log("user : ", msg);
  })

  socket.on('customRooms', (msg) => {
    setRoomsList(Object.entries(msg))
    console.log(count, "rooms list : ", Object.entries(msg));
  })

  socket.on('receiveMsg', ({ id, msg }) => {
    console.log(msg);
    setUserMsg([
      ...userMsg, { type: 'reveived', content: msg, id: id }
    ]);
  });

  function userLogOutFunction() {
    userLogout();
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter') {
      forSendingMsg();
    }
  }

  function handelUserData(e) {
    e.preventDefault();
    setRoom(e.target.value)
  }

  function createRoom() {
    socket.emit('createRoom', room)
    onClose()
  }

  function joinRoom(room, newRoom) {
    if (currentRoom !== newRoom) {
      setUserMsg([])
    }
    console.log(currentRoom, newRoom);
    socket.emit('joinRoom', currentRoom, newRoom)
    setCurrentRoom(newRoom)
    console.log('new room', currentRoom);
    onClose()
  }

  return (
    <Flex className=" w-[100%] h-[100vh] p-5 bg-black text-white gap-3">
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Room Details</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Flex flexDirection='column' gap='20px'>
              <FormControl isRequired={true}>
                <FormLabel>Name :</FormLabel>
                <Input type='email' name='email' onChange={handelUserData} />
              </FormControl>
              <FormControl>
                <FormLabel>Access :</FormLabel>
                <Select placeholder='Public'>
                  <option value='Private'>Private</option>
                </Select>
              </FormControl>
            </Flex>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={()=>createRoom()}>
              Create
            </Button>
            <Button variant='ghost' onClick={onClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <Box className=" w-1/5 border rounded-xl h-full flex flex-col scrollbar">
        <Heading size='md' className="text-center uppercase mb-3 p-5">
          Room List
        </Heading>
        <Box className="flex flex-col gap-2 grow-1 overflow-auto px-1 m-1 " >
          <Button className="border p-2 rounded-xl flex items-center" onClick={() => joinRoom(room, "AI")}>
            <Box className="text-center">
              <Text fontSize='sm'>AI</Text>
              {/* <Text fontSize='xs'>Active now</Text> */}
            </Box>
          </Button>
          {
            roomsList.map((item, index) =>
              <Button className="border p-2 rounded-xl flex items-center" key={index} onClick={() => joinRoom(room, item[0])}>
                <Box className="text-center" key={index}>
                  <Text fontSize='sm'>{item[0]}</Text>
                  {/* <Text fontSize='xs'>Active now</Text> */}
                </Box>
              </Button>
            )
          }
        </Box>
      </Box>
      <Flex className=" w-4/5 border rounded-xl" flexDirection='column'>
        <Flex className=" m-2 border rounded-lg p-2">
          <Center>
            {/* Logo */}
            <Box className="Logo flex gap-2 items-center border p-2 rounded-lg">
              <FaRocketchat className='text-green-600 text-3xl' />
              <Text size='md' className="rounded-lg text-green-400 font-bold underline">rushChat</Text>
            </Box>

          </Center>
          <Spacer />
          <Flex gap='20px'>
            <Button onClick={onOpen}>Create Room</Button>
            <Button onClick={userLogOutFunction}>Logout</Button>
          </Flex>
        </Flex>
        {
          currentRoom !== '' ?
            <Box p='10px' width='100%' className=" grow flex flex-col">
              <Box className="grow rounded-lg  scrollbar" mb='10px'>
                <Box className="border-2 border-yellow-500 rounded-xl p-3">
                  <Stack direction='row' spacing={4} className="flex flex-col items-center">
                    <Box className="p-0.5 rounded-full border-2 border-gray-300">
                      <Avatar>
                        <AvatarBadge boxSize='1em' bg='green.500' />
                      </Avatar>
                    </Box>
                    <Box className="text-center">
                      <Text fontSize='sm'>{currentRoom}</Text>
                      <Text fontSize='xs'>Active now</Text>
                    </Box>
                  </Stack>
                </Box>
                <Box className="msgShowArea px-5 pt-2 mt-3 flex flex-col gap-3 h-80 overflow-auto">
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
                <Input
                  onChange={(e) => setMsg(e.target.value)}
                  value={msg} placeholder="Enter Message"
                  onKeyDown={handleKeyDown}
                />
                <Button onClick={forSendingMsg} onEnter={forSendingMsg} className="border text-center px-6">
                  <AiOutlineSend className="text-black text-xl" />
                </Button>
              </Flex>
            </Box>
            : <></>
        }
      </Flex>
    </Flex>
  )
}

export default HomePage
