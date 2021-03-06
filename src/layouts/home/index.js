import * as React from 'react';
import { useHistory, Redirect } from 'react-router-dom'

import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import appLogo from "assets/images/logo.png";
import bgVr from "assets/images/bg2.png";
import webDashboard from "assets/screens/dashboard.png";
import webMeetings from "assets/screens/meeting-list.png";


// @mui icons
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

// Soft UI Dashboard React components
import SuiBox from "components/SuiBox";

const cards = [
  {
    'name': 'Dashboard',
    'info': 'Overview of the number of Zoom meetings and users. You can login ZCONNECT app via scan QR code',
    'image': webDashboard,
  },
  {
    'name': 'Meeting',
    'info': 'You can add members in the meeting and create Zoom meeting through ZCONNECT',
    'image': webMeetings,
  },
  // {
  //   'name': 'Members',
  //   'info': 'Manage your staff or colleagues on ZCONNECT. Invite them on ZCONNECT to join your team',
  //   'image': webUsers,
  // },
  // {
  //   'name': 'ZCONNECT App',
  //   'info': 'Access your Zoom meetings on your Google Glass EE2 using ZCONNECT app. You can Join meetings by navigating through meetings or by scaning QR code with Zoom link.',
  //   'image': appHome,
  // },
  // {
  //   'name': 'Your Meetings',
  //   'info': 'Access all meetings created for you using ZCONNECT portal. You can also use voice commands to access your meetings.',
  //   'image': appMeetingList,
  // },
  // {
  //   'name': 'Join Meetings',
  //   'info': 'Join your Zoom meetings on ZCONNECT with easy to use Interface specially designed for your Google Glass EE2.',
  //   'image': appMeetingStart,
  // }
];

const theme = createTheme();


function content() {

  const history = useHistory();

  const openInNewTab = (url) => {
    const newWindow = window.open(url, '_blank', 'noopener,noreferrer')
    if (newWindow) newWindow.opener = null
  }

  const login = () => {
    history.push('/authentication/sign-in');
  }

  const contact = () => {
    history.push('/contact');
  }


  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar position="relative"  sx={{ bgcolor: "black" }}>
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }} >
          <img
            width={50}
            src={appLogo}
            alt="Create meeting"
          />
          <Typography variant="h6" color="inherit" noWrap>
            ZCONNECT
          </Typography>

          <div>
            <Button variant="contained" buttonColor="info" fullWidth onClick={() => login()}>
              sign in
            </Button>
          </div>
         

        </Toolbar>
      </AppBar>
      <main>
        {/* Hero unit */}
        <Box
          sx={{
            backgroundImage: 'url('+ bgVr+')',
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center center",
            backgroundSize: "cover",
            backgroundAttachment: "fixed",
            p: 20
          }}
        >
          <Container maxWidth="sm">
            <Typography
              component="h1"
              variant="h2"
              align="center"
              color="text.primary"
              gutterBottom
            >
              ZCONNECT
            </Typography>
            <Typography variant="h5" align="center" color="text.secondary" paragraph>
              Access your Zoom meeting on Google Glass EE2
            </Typography>
            <Stack
              sx={{ pt: 4 }}S
              direction="row"
              spacing={2}
              justifyContent="center"
            >
              <Button color='info' variant="outlined" onClick={() => contact()}>Contact Us</Button>
            </Stack>
          </Container>
        </Box>
       
        <Container disableGutters maxWidth="sm" component="main" sx={{ pt: 8, pb: 6 }}>
          <Typography
            component="h1"
            variant="h2"
            align="center"
            color="text.primary"
            gutterBottom
          >
            Features
          </Typography>
          <Typography variant="h5" align="center" color="text.secondary" component="p">
            Using ZCONNECT, you can access all your meetings on Google Glass EE2. You can create meetings by login on ZCONNECT.tech, here you can create and manage meetings for users. We provide a user-friendly interface to connect. Also you can join any Zoom meeting by just scanning QR code via Google Glass EE2
          </Typography>
      </Container>
      <Container sx={{ py: 8 }} maxWidth="md">
          {/* End hero unit */}
          <Grid container spacing={4}>
            {cards.map((card) => (
              <Grid item key={card} xs={12} sm={6} md={6}>
                <Card
                  sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                >
                  <CardMedia
                    component="img"
                    sx={{
                      pt: 0,
                    }}
                    image={card.image}
                    alt="random"
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography align="center" gutterBottom variant="h5" component="h2">
                      {card.name}
                    </Typography>
                    <Typography align="center">
                      {card.info}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </main>
      {/* Footer */}
      <Box sx={{ bgcolor: 'background.paper', p: 6 }} component="footer">
      <SuiBox component="footer" py={6}>
      <Grid container justifyContent="center">
        <Grid item xs={10} lg={8}>
          <SuiBox display="flex" justifyContent="center" flexWrap="wrap" mb={3}>
          <SuiBox mr={{ xs: 2, lg: 3, xl: 6 }}>
                <Typography component="a" href="home" variant="body2" textColor="secondary">
                  HOME
                </Typography>
              </SuiBox>
              <SuiBox mr={{ xs: 2, lg: 3, xl: 6 }}>
                <Typography component="a" href="privacy" variant="body2" textColor="secondary">
                  PRIVACY POLICY
                </Typography>
              </SuiBox>
              <SuiBox mr={{ xs: 2, lg: 3, xl: 6 }}>
                <Typography component="a" href="terms-of-use" variant="body2" textColor="secondary">
                  TERMS OF USE
                </Typography>
              </SuiBox>
              <SuiBox mr={{ xs: 2, lg: 3, xl: 6 }}>
                <Typography component="a" href="about" variant="body2" textColor="secondary">
                  ABOUT
                </Typography>
              </SuiBox >
              <SuiBox mr={{ xs: 2, lg: 3, xl: 6 }}>
                <Typography component="a" href="contact" variant="body2" textColor="secondary">
                  CONTACT
                </Typography>
              </SuiBox >
            </SuiBox>
          </Grid>
          <Grid item xs={12} lg={8}>
            <SuiBox display="flex" justifyContent="center" mt={1} mb={3}>
              <SuiBox component="a" href="https://www.facebook.com/mirobotic.sg" mr={3} color="secondary">
                <FacebookIcon fontSize="small" />
              </SuiBox>
              <SuiBox component="a" href="https://twitter.com/mi_robotic" mr={3} color="secondary">
                <TwitterIcon fontSize="small" />
              </SuiBox>
              <SuiBox component="a" href="https://www.instagram.com/mirobotic/" mr={3} color="secondary">
                <InstagramIcon fontSize="small" />
              </SuiBox>
              <SuiBox component="a" href="https://www.linkedin.com/company/mirobotic" color="secondary">
                <LinkedInIcon fontSize="small" />
              </SuiBox>
            </SuiBox>
          </Grid>
          <Grid item xs={12} lg={8} className="text-center">
            <Typography variant="body2" textColor="secondary">
              Copyright &copy; 2022 by MI ROBOTIC Pte Ltd.
            </Typography>
          </Grid>
        </Grid>
      </SuiBox>
      </Box>
      {/* End footer */}
    </ThemeProvider>
  );
}

function Home() {

  React.useEffect(() => {
    let sideNav = document.getElementById("sideNav");
    if (sideNav) {
        sideNav.style.display = "none";
        console.log('sideNav',sideNav);
    }
    console.log('sideNav', sideNav )
  }, [])

  return content()
}

export default Home;
