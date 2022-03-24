import { Typography, Button, Paper, SvgIcon, Grid, Avatar } from "@material-ui/core";

import { useScrollTo } from 'react-use-window-scroll';

import classes from './home.module.css';

import React, { useState, useEffect } from 'react';
import { useRouter } from "next/router";

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

function SiteLogo(props) {
  const { color, className } = props;
  return (
    <SvgIcon viewBox="0 0 147.7 17.5" className={className}>
      <g fill="#ffc800" opacity="1" stroke="none">
      <path clipPath="url(#TextBounds)" d="M34.0449 236.256L84.5849 236.256C107.965 236.256 121.685 226.036 121.685 209.236L121.685 208.956C121.685 195.656 114.125 188.936 102.225 185.016C110.905 181.236 117.345 174.516 117.345 163.176L117.345 162.896C117.345 156.176 114.965 150.996 111.045 147.076C105.305 141.336 96.6249 138.256 84.3049 138.256L34.0449 138.256L34.0449 236.256ZM60.5049 177.316L60.5049 160.096L78.1449 160.096C86.2649 160.096 90.4649 163.176 90.4649 168.496L90.4649 168.776C90.4649 174.516 85.8449 177.316 77.5849 177.316L60.5049 177.316ZM60.5049 214.416L60.5049 196.356L81.2249 196.356C90.3249 196.356 94.5249 199.856 94.5249 205.176L94.5249 205.456C94.5249 211.196 89.7649 214.416 81.5049 214.416L60.5049 214.416Z" fillRule="evenodd"/>
      <path clipPath="url(#TextBounds)" d="M166.105 236.256L193.405 236.256L193.405 138.256L166.105 138.256L166.105 236.256Z" fillRule="evenodd"/>
      </g>
      <g fill="#ffffff" opacity="1" stroke="none">
      <path clipPath="url(#TextBounds_2)" d="M243.145 236.256L317.765 236.256L317.765 212.456L270.305 212.456L270.305 138.256L243.145 138.256L243.145 236.256Z" fillRule="evenodd"/>
      <path clipPath="url(#TextBounds_2)" d="M361.345 236.256L388.645 236.256L388.645 138.256L361.345 138.256L361.345 236.256Z" fillRule="evenodd"/>
      <path clipPath="url(#TextBounds_2)" d="M437.965 236.256L475.205 236.256C510.485 236.256 531.065 215.256 531.065 186.976L531.065 186.696C531.065 158.416 510.765 138.256 475.765 138.256L437.965 138.256L437.965 236.256ZM465.125 212.176L465.125 162.336L476.185 162.336C492.425 162.336 503.205 171.436 503.205 187.116L503.205 187.396C503.205 203.216 492.425 212.176 476.185 212.176L465.125 212.176Z" fillRule="evenodd"/>
      <path clipPath="url(#TextBounds_2)" d="M576.465 236.256L651.085 236.256L651.085 212.456L603.625 212.456L603.625 138.256L576.465 138.256L576.465 236.256Z" fillRule="evenodd"/>
      <path clipPath="url(#TextBounds_2)" d="M704.185 236.256L731.485 236.256L731.485 199.156L768.725 138.256L738.345 138.256L718.045 173.956L697.885 138.256L666.945 138.256L704.185 199.576L704.185 236.256Z" fillRule="evenodd"/>
      </g>
    </SvgIcon>
  );
}

function Home({ changeTheme }) {

  function handleNavigate(route) {
    router.push(route);
  }

  const router = useRouter();

  const scrollTo = useScrollTo();

  return (
    <div className={classes.ffContainer}>

      <div className={classes.contentContainerFull}>

      <SiteLogo className={classes.appLogo} />

        <Grid container spacing={2} className={classes.homeContentMain}>
          <Grid item lg={12} md={12} sm={12} xs={12}>
            <Typography variant="h1" className={classes.preTitle}>0.01% swap fee</Typography>
          </Grid>
          <Grid item lg={12} md={12} sm={12} xs={12}>
            <Typography variant="h1" className={classes.mainTitle}>Essentially Free</Typography>
          </Grid>
          <Grid item lg={12} md={12} sm={12} xs={12}>
            <Grid container spacing={2}>
              <Grid item lg={6} md={6} sm={12} xs={12}>
                <Button className={classes.buttonInfo} onClick={() => scrollTo({ top: 1000, left: 0, behavior: 'smooth' })}>Learn More</Button>
              </Grid>
              <Grid item lg={6} md={6} sm={12} xs={12}>
                <Button className={classes.buttonEnter} onClick={() => router.push('/swap')}>Swap</Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </div>

      <div id="info" className={classes.contentContainerFullTwo}>

        <div className={classes.floatingSphere}></div>

        <Grid container spacing={3} className={classes.homeContentMain}>
          <Grid item lg={12} md={12} sm={12} xs={12}>
            <Typography variant="h1" className={classes.secTitle}>Welcome to Bilidly</Typography>
          </Grid>
          <Grid item lg={12} md={12} sm={12} xs={12}>
            <Typography variant="body1" className={classes.mainDescription}>
              Bilidly is a decentralized exchange for all types of pairs on BNB chain.
            </Typography>
            <Typography variant="body2" className={classes.secDescription}>
              Based on Andre Cronje's Solidly protocol, Bilidly aims at providing essentially free atomic swap on stable and volatile token pairs, while maintaining deep liquidity through ve(3,3) ponzitivization of liquidity providers.
            </Typography>
          </Grid>
          <Grid item lg={12} md={12} sm={12} xs={12}>
            <Button className={classes.buttonEnterSingle} onClick={() => router.push('/swap')}>Enter App</Button>
          </Grid>
        </Grid>
      </div>

    </div>
  );
}

export default Home;
