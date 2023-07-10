import { Box, Typography, styled, Divider} from '@mui/material';

const Component = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  alignItems: 'center',
  marginTop: 50,
  opacity: .8
})

const StyleDivider = styled(Divider)`
  width: 100%;
  margin-top: 10px;
`

const NoMails = ({ message }) => {
  return (
    <Component>
      <Typography>{message.heading}</Typography>
      <Typography>{message.subHeading}</Typography>
      <StyleDivider />
    </Component>
  )
}

export default NoMails;