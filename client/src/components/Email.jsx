import React from "react";
import {
  Checkbox,
  Box,
  Typography,
  styled,
  ListItem,
} from "@mui/material";
import { Star, StarBorder } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { routes } from "../routes/routes";
import { API_URLS } from "../services/api.urls";
import useApi from "../hooks/useApi";

const Wrapper = styled(ListItem)({
  padding: " 0 0 0 10px",
  background: "#f2f6fc",
  cursor: "pointer",
  // display: 'flex',
  // alignItems: 'center',
  " & > div ": {
    display: "flex",
    width: "100%",
    "& > p ": {
      fontSize: "14px",
    },
  },
});

const Indicator = styled(Box)({
  fontSize: "12px !important",
  background: "#ddd",
  color: "#222",
  borderRadius: "4px",
  marginRight: "6px",
  padding: "0 4px",
});

const Date = styled(Typography)`
  margin-left: auto;
  margin-right: 20px;
  font-size: 12px;
  color: #5f6368;
`;

const Email = ({ email, selectedEmails, setRefreshEmail, setSelectedEmails }) => {
  const navigate = useNavigate();

  const toggleStarredService = useApi(API_URLS.toggleStarredMails);

  const toggleStarredEmail = () => {
    toggleStarredService.call({ id: email._id, value: !email.starred });
    setRefreshEmail(prevState => !prevState);
  };

  const onValueChange = () => {
    if (selectedEmails.includes(email._id)) {
      setSelectedEmails(prevState => prevState.filter(id => id !== email._id));
    } else {
      setSelectedEmails(prevState => [...prevState, email._id]);
    }
  };

  return (
    <Wrapper>
      <Checkbox
        size="small"
        checked={selectedEmails.includes(email._id)}
        onChange={() => onValueChange()}
      />
      { 
        email.starred ? <Star fontSize="small" style={{ marginRight: 10, color: '#FFF200' }} onClick={() => toggleStarredEmail()} /> : <StarBorder fontSize="small" style={{ marginRight: 10 }} onClick={() => toggleStarredEmail()} /> 
      }
      <Box
        onClick={() => navigate(routes.view.path, { state: { email: email } })}
      >
        <Typography style={{ width: 200, overflow: "hidden" }}>
          To:{email.to.split('@')[0]}
        </Typography>
        <Indicator>Inbox</Indicator>
        <Typography>
          {email.subject} {email.body && "-"} {email.body}
        </Typography>
        <Date>
          {new window.Date(email.date).getDate()}&nbsp;
          {new window.Date(email.date).toLocaleDateString("default", {
            month: "long",
          })}
        </Date>
      </Box>
    </Wrapper>
  );
};

export default Email;
