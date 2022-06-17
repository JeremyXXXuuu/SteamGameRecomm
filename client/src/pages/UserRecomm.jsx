import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";

import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import useSWR from "swr";

import Footer from "../components/Footer";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import Spinner from "../components/Spinner";
const fetcher = (url, token) =>
  axios
    .get(url, { headers: { Authorization: "Bearer " + token } })
    .then((res) => res.data);

const theme = createTheme();
function UserRecomm() {
  const { user } = useSelector((state) => state.auth);
  const token = user.token;

  const { data, error } = useSWR([`/api/userRecomm`, token], fetcher);

  if (error) return "An error has occurred.";
  if (!data) {
    return <Spinner />;
  }
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <main>
        <Typography
          component="h1"
          variant="h4"
          align="center"
          color="text.primary"
          gutterBottom
        >
          User's personnal Recommendation
        </Typography>
        <Container sx={{ py: 0 }} maxWidth="lg">
          {/* End hero unit */}
          <Grid container spacing={4}>
            {data.map((card) => {
              return (
                <Grid item key={card.app_id} xs={12} sm={6} md={4}>
                  <Card
                    sx={{
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <CardMedia
                      component="img"
                      // sx={{
                      //   // 16:9
                      //   pt: "56.25%",
                      // }}
                      image={`https://cdn.cloudflare.steamstatic.com/steam/apps/${card.app_id}/header.jpg`}
                    />
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Typography gutterBottom variant="h6" component="h2">
                        {card.name}
                      </Typography>
                      <Typography></Typography>
                    </CardContent>
                    <CardActions>
                      <Link
                        href={`/game/${card.app_id}`}
                        color="white"
                        className="btn"
                        underline="none"
                      >
                        Show details
                      </Link>
                    </CardActions>
                  </Card>
                </Grid>
              );
            })}
          </Grid>
        </Container>
      </main>
      {/* Footer */}
      <Footer />
      {/* End footer */}
    </ThemeProvider>
  );
}

export default UserRecomm;
