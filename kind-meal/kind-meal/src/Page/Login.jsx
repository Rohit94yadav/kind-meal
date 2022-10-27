import {
    Modal,
    ModalContent,
    ModalHeader,

    ModalCloseButton,
    useDisclosure,
    Button,Box,Image, Heading,Input,FormControl,Center,Divider,Text

  } from '@chakra-ui/react'
  import React,{useState} from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";
    const Login=()=> {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const finalRef = React.useRef(null)
    const { isAuth, toggleAuth } = React.useContext(AuthContext);
  const [message, setMessage] = useState("");
  const [pass, setpass] = useState("");
  const handleChange = (event) => {
    setMessage(event.target.value);
  };
  const handleChange1 = (event) => {
    setpass(event.target.value);
  };
  if (isAuth) {
    return <Navigate to="/meal" />;
  }
  
  
  

  // let obj = {
  //   email: "eve.holt@reqres.in",
  //   password: "cityslicka"
  // };

  
  let obj = {
    email:message ,
    password: pass
  };

  const fetchnUpdate = async () => {
    let res = await fetch(`https://reqres.in/api/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(obj)
    });

    let data = await res.json();
    toggleAuth(data.token);
    console.log(data.token);
  };
  const alert=()=>{
    alert("User login")
  }
  
    return (
        <>
 
        <Button mt={4} onClick={onOpen} marginTop={"-1"} bg="transparent" color="black">
          Login
        </Button>
        <Modal finalFocusRef={finalRef} isOpen={isOpen} onClose={onClose} size="2xl">
          <ModalContent  margin="auto" textAlign="center" justifyConten="center" paddingBlock={5}>
            <ModalHeader>
                <Image src="https://www.kindmeal.my/images/logo-kindmeal.png"alt="logot"paddingLeft={120}/>
                <Heading size="xl">Member Login</Heading>
                <Box width={400} margin="auto" padding={10}>
                    <FormControl onSubmit={fetchnUpdate} >
                    <Input type="email" placeholder="email address"  max={20} margin={2} onChange={handleChange}
                    value={message}/>
                    <Input type="Password" placeholder="Password" margin={2} onChange={handleChange1}
                    value={pass} />
                    <Input type="Submit" name="Login" margin={2} bg="green" color="white" onClick={onClose}  />
                    </FormControl>

                </Box>
                    <Center height='1px' bg="gray">
                        <Divider orientation='vertical' />
                      </Center>
                    <Button colorScheme='blue' paddingLeft={20} paddingRight={20} marginTop={5}>Login with facebook</Button>
                    <Box display="flex" paddingTop={10} justifyContent="space-between">
                        <Text>Forgot password?</Text>
                        <Text>Not a member? Sign up FREE!</Text>
                    </Box>
            </ModalHeader>
            <ModalCloseButton />
          </ModalContent>
        </Modal>
      </>
    )
  }
  export default Login