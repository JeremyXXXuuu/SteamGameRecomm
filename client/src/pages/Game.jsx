import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Spinner from "../components/Spinner";
import * as api from "../api/index.js";

import useSWR from "swr";

import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Rating from "@mui/material/Rating";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import {
  createGame,
  getGame,
  updateGame,
  reset,
} from "../features/game/gameSlice.js";
import Footer from "../components/Footer";

const fetcher = (url) => fetch(url).then((res) => res.json());
const theme = createTheme();

export default function Game() {
  const { id } = useParams();
  const url = `/api/recom/recomm/${id}`;
  const { data, error } = useSWR(url, fetcher);
  const initialGameState = {
    id: null,
    app_id: [],
    url: "",
    name: "",
    recomm_id: "",
  };

  const [currentGame, setCurrentGame] = useState(initialGameState);
  const [value, setValue] = useState(0);
  const [gameDetails, setGameDetails] = useState("");
  const [text, setText] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const { score, isLoading, isError, message } = useSelector(
    (state) => state.game
  );

  //if there is no user login navigate to /login
  //get current game score
  useEffect(() => {
    if (isError) {
      console.log(message);
    }
    if (!user) {
      navigate("/login");
    }
    dispatch(getGame(id));
  }, [user, navigate, isError, message, dispatch]);

  // Set game score
  const onSubmit = (e) => {
    e.preventDefault();
    if (score > 0) {
      dispatch(updateGame({ id, text }));
    } else {
      dispatch(createGame({ id, text }));
    }
  };

  const rate = (e) => {
    e.preventDefault();
    let text = e.target.value;
    if (score > 0) {
      dispatch(updateGame({ id, text }));
    } else {
      dispatch(createGame({ id, text }));
    }
  };
  //get current game info : name, url, recomm_id
  const getGames = (id) => {
    api
      .get(id)
      .then((res) => {
        console.log(res.data);
        const data = res.data;
        setCurrentGame(...data);
        console.log(currentGame);
      })
      .catch((e) => {
        console.log(e);
        console.log("can't get game");
      });
  };

  //get current game details
  const getDetails = (gid) => {
    api
      .getGameDetails(gid)
      .then((res) => {
        setGameDetails(res.data[gid].data.short_description);
        console.log(res.data[gid].data.short_description);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  //when page change id refresh current game
  useEffect(() => {
    getGames(id);
    getDetails(id);
  }, [id]);
  if (isLoading) {
    return <Spinner />;
  }

  if (error) return "An error has occurred.";
  if (!data) return "Loading...";
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <main>
        {/* Hero unit */}
        {/* <Box
          sx={{
            bgcolor: "background.paper",
            pt: 8,
            pb: 6,
          }}
        > */}
        <Container maxWidth="sm">
          <Typography
            component="h1"
            variant="h2"
            align="center"
            color="text.primary"
            gutterBottom
          >
            {currentGame.name}
          </Typography>
          <Card>
            <CardMedia
              component="img"
              // sx={{
              //   // 16:9
              //   pt: "56.25%",
              // }}
              image={`https://cdn.cloudflare.steamstatic.com/steam/apps/${currentGame.app_id}/header.jpg`}
            />
          </Card>
          <Typography
            variant="h6"
            // align="center"
            color="text.secondary"
            paragraph
          >
            {gameDetails}
          </Typography>

          <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justifyContent="center"
          >
            <Typography
              variant="h6"
              // align="center"
              color="text.secondary"
              paragraph
            >
              {/* {score} */}
            </Typography>
            <Rating
              name="simple-controlled"
              value={score}
              size="large"
              sx={{
                fontSize: "3rem",
                marginBottom: "3rem",
              }}
              onChange={(event) => {
                // setText(event.target.value)
                rate(event);
              }}
            />
          </Grid>
        </Container>
        {/* </Box> */}

        {/* <section>
  {score>0?(
      <section className='form'>
      <form onSubmit={onSubmit}>
        <div className='form-group'>
          <label htmlFor='text'>update rating</label>
          <input
            type='text'
            name='text'
            id='text'
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </div>
        <div className='form-group'>
          <button className='btn btn-block' type='submit'>
            update
          </button>
        </div>
      </form>
    </section>
  ):(
    <section className='form'>
    <form onSubmit={onSubmit}>
      <div className='form-group'>
        <label htmlFor='text'>set rating</label>
        <input
          type='text'
          name='text'
          id='text'
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </div>
      <div className='form-group'>
        <button className='btn btn-block' type='submit'>
          Add 
        </button>
      </div>
    </form>
  </section>
  )

  }
</section> */}

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
