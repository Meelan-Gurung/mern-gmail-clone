import React, { useState } from "react";
import { Box, Button, styled, List, ListItem } from "@mui/material";
import { EditOutlined } from "@mui/icons-material";
import { SIDEBAR_DATA } from "../config/sidebar.config";
import ComposeMail from "./ComposeMail";
import { useParams, NavLink } from "react-router-dom";
import { routes } from "../routes/routes";

const Container = styled(Box)`
  padding: 8px;
  & > ul {
    padding: 10px 0 0 5px;
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;
    & > a {
      text-decoration: none;
      color: inherit;
    }
    & > li > svg {
      margin-right: 20px;
    }
  }
`;

const ComposeButton = styled(Button)`
  background: #c2e7ff;
  color: #001d35;
  border-radius: 16px;
  padding: 15px;
  min-width: 140px;
  text-transform: none;
`;

const SideBarContent = () => {
  const [openDrawer, setOpenDrawer] = useState(false);

  const { type } = useParams();

  const onComposeClick = () => {
    setOpenDrawer(true);
  };

  return (
    <Container>
      <ComposeButton onClick={() => onComposeClick()}>
        <EditOutlined style={{ marginRight: 10 }} />
        Compose
      </ComposeButton>
      <List>
        {SIDEBAR_DATA.map((data) => {
          return (
            <NavLink key={data.name} to={`${routes.emails.path}/${data.name}`}>
              <ListItem
                style={
                  type === data.name.toLowerCase()
                    ? {
                        backgroundColor: "#d3e3fd",
                        borderRadius: "0 16px 16px 0",
                      }
                    : {}
                }
              >
                <data.icon />
                {data.title}
              </ListItem>
            </NavLink>
          );
        })}
      </List>
      <ComposeMail openDrawer={openDrawer} setOpenDrawer={setOpenDrawer} />
    </Container>
  );
};

export default SideBarContent;
