import React, { useState } from "react";
import {
  Dialog,
  Box,
  styled,
  Typography,
  InputBase,
  TextField,
  Button,
} from "@mui/material";
import { Close, DeleteOutline } from "@mui/icons-material";
import useApi from "../hooks/useApi";
import { API_URLS } from "../services/api.urls";

const dialogStyle = {
  height: "90%",
  width: "80%",
  maxWidth: "100%",
  maxHeight: "100%",
  boxShadow: "none",
  borderRadius: "10px 10px 0 0",
  "&::-webkit-scrollbar": {
    display: "none",
  },
};

const Header = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  padding: "10px 15px",
  background: "#f2f6fc",
  "& > p ": {
    fontSize: 14,
    fontWeight: 500,
  },
});

const RecipientWrapper = styled(Box)({
  display: "flex",
  flexDirection: "column",
  padding: "0 15px",
  "& > div ": {
    fontSize: 14,
    borderBottom: "1px solid #F5F5F5",
    marginTop: 10,
  },
});

const Footer = styled(Box)`
  display: flex;
  justify-content: space-between;
  padding: 10px 15px;
  align-items: center;
`;

const SendButton = styled(Button)`
  background-color: #4285f4;
  color: white;
  font-weight: 500;
  width: 100px;
  border-radius: 18px;
  text-transform: none;
  cursor: pointer;
  &:hover {
    background-color: #2e6bb3;
  }
`;

const ComposeMail = ({ openDrawer, setOpenDrawer }) => {

  const [data, setData] = useState({});
  const sentEmailService = useApi(API_URLS.saveSentEmail);
  const saveDraftService = useApi(API_URLS.saveDraftEmail);

  const config = {
    Username: 'startup@yopmail.com',
    Password: '07B6C46FB9DE807CE8CB5455961C0E9C7EDA',
    Host: "smtp.elasticemail.com",
    Port: 2525,
  };

  const closeComposeMail = (e) => {
    e.preventDefault();

    const payload = {
      to: data.to,
      from: "createrc2@gmail.com",
      subject: data.subject,
      body: data.body,
      date: new Date(),
      image: '',
      name: 'Creator',
      starred: false,
      type: 'drafts'
    }

    saveDraftService.call(payload);

    if(!saveDraftService.error){
      setOpenDrawer(false);
      setData({});
    } else {
      
    }
    
    setOpenDrawer(false);
    
  };

  const sendMail = async (e) => {
    e.preventDefault();

    if (window.Email) {
      window.Email.send({
        ...config,
        To: data.to,
        From: "createrc2@gmail.com",
        Subject: data.subject,
        Body: data.body,
      }).then((message) => alert(message));
    }

    const payload = {
      to: data.to,
      from: "createrc2@gmail.com",
      subject: data.subject,
      body: data.body,
      date: new Date(),
      image: '',
      name: 'Creator',
      starred: false,
      type: 'sent'
    }

    sentEmailService.call(payload);

    if(!sentEmailService.error){
      setOpenDrawer(false);
      setData({});
    } else {
      
    }

    setOpenDrawer(false);
  };

  const onValueChange = (e) => {
    setData({ ...data, [e.target.name] : e.target.value });
    console.log(data);
  }

  return (
    <Dialog open={openDrawer} PaperProps={{ sx: dialogStyle }}>
      <Header>
        <Typography>New Message</Typography>
        <Close fontSize="small" onClick={(e) => closeComposeMail(e)} />
      </Header>
      <RecipientWrapper>
        <InputBase placeholder="Recipients" name="to" onChange={(e) => onValueChange(e)} value={data.to}/>
        <InputBase placeholder="Subject" name="subject" onChange={(e) => onValueChange(e)} value={data.subject}/>
      </RecipientWrapper>
      <TextField
        multiline
        rows={18}
        sx={{ "& .MuiOutlinedInput-notchedOutline": { border: "none" } }}
        name="body"
        onChange={(e) => onValueChange(e)}
      />
      <Footer>
        <SendButton onClick={(e) => sendMail(e)}>Send</SendButton>
        <DeleteOutline onClick={() => setOpenDrawer(false)} />
      </Footer>
    </Dialog>
  );
};

export default ComposeMail;
