// import FormControl from "@mui/material/FormControl";
// import InputLabel from "@mui/material/InputLabel";
// import Input from "@mui/material/Input";
// import Button from "@mui/material/Button";
// import Box from "@mui/material/Box";
// import React, { useState,  useContext } from 'react';
// import axios from 'axios';
// import {UserContext} from "../UserContext.jsx";


// const LoginBox = () => {
//   const { isSignedIn, signIn, signOut } = useContext(UserContext);

//   return (
//     <Box
//       sx={{
//         border: "1px solid #ccc",
//         borderRadius: "4px",
//         padding: "20px",
//         maxWidth: "300px",
//         maxHeight: "400px",
//         margin: "auto",
//         textAlign: "center",
//       }}
//       className="mt-4 grow flex items-center justify-around"
//     >
//       <div>
//         <h1 className="text-4xl text-center mb-4">Login</h1>
//         <form> {isSignedIn
//           ? <Button onClick={signOut} variant="contained" sx={{ borderRadius: "25px", width: "100%" }}>Log out</Button>
//           : <Button onClick={signIn} variant="contained" sx={{ borderRadius: "25px", width: "100%" }}>Log in</Button>
//         }
//           <div className="text-center py-2 text-gray-500"></div>
//         </form>
//       </div>
//     </Box>
//   );

// }

// export default LoginBox;
