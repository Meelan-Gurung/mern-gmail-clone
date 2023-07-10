import React, { useEffect, useState } from "react";
import { useOutletContext, useParams } from "react-router-dom";
import { API_URLS } from "../services/api.urls";
import useApi from "../hooks/useApi";
import { Checkbox, Box, List} from "@mui/material";
import { DeleteOutline } from "@mui/icons-material";
import Email from "./Email";
import NoMails from './common/NoMails';
import { EMPTY_TABS } from "../constants/constants";

const Emails = () => {
  const [selectedEmails, setSelectedEmails] = useState([]);
  const [refreshEmail, setRefreshEmail] = useState(false);

  const { openDrawer } = useOutletContext();

  const { type } = useParams();

  const getEmailsService = useApi(API_URLS.getEmailFromType);
  const moveEmailsToBinService = useApi(API_URLS.moveEmailsToBin);
  const deleteEmailService = useApi(API_URLS.deleteMails);

  useEffect(() => {
    getEmailsService.call({}, type);
  }, [type, refreshEmail]);

  const selectAllMails = (e) => {
    if (e.target.checked) {
      const emails = getEmailsService?.response?.map((email) => email._id);
      setSelectedEmails(emails);
    } else {
      setSelectedEmails([]);
    }
  };

  const deleteSelectedEmails = () => {
    if (type === "bin") {
      deleteEmailService.call(selectedEmails);
    } else {
      moveEmailsToBinService.call(selectedEmails);
    }
    setRefreshEmail((prevState) => !prevState);
  };

  return (
    <Box
      style={
        openDrawer ? { marginLeft: 250, width: "100%" } : { width: "100%" }
      }
    >
      <Box
        style={{
          padding: "20px 10px 0 10px",
          display: "flex",
          alignItems: "center",
        }}
      >
        <Checkbox size="small" onChange={(e) => selectAllMails(e)} />
        <DeleteOutline onClick={(e) => deleteSelectedEmails(e)} />
      </Box>
      <List>
        { getEmailsService?.response?.map((email) => {
          return (
            <Email
              key={email._id}
              email={email}
              selectedEmails={selectedEmails}
              setSelectedEmails={setSelectedEmails}
              setRefreshEmail={setRefreshEmail}
            />
          );
        })}
      </List>
      {
        getEmailsService?.response?.length === 0 && <NoMails message={EMPTY_TABS[type]} />
      }
    </Box>
  );
};

export default Emails;
