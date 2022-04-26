import { Typography, Container, Button, SvgIcon, Grid } from "@material-ui/core";

import { useScrollTo } from 'react-use-window-scroll';

import classes from './home.module.css';

import React, { useState, useEffect } from 'react';
import { useRouter } from "next/router";


import Faucet from '../../components/faucet';

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

function Socials() {
  const telegram = "M9.78,18.65L10.06,14.42L17.74,7.5C18.08,7.19 17.67,7.04 17.22,7.31L7.74,13.3L3.64,12C2.76,11.75 2.75,11.14 3.84,10.7L19.81,4.54C20.54,4.21 21.24,4.72 20.96,5.84L18.24,18.65C18.05,19.56 17.5,19.78 16.74,19.36L12.6,16.3L10.61,18.23C10.38,18.46 10.19,18.65 9.78,18.65Z"
  const twitter = "M22.46,6C21.69,6.35 20.86,6.58 20,6.69C20.88,6.16 21.56,5.32 21.88,4.31C21.05,4.81 20.13,5.16 19.16,5.36C18.37,4.5 17.26,4 16,4C13.65,4 11.73,5.92 11.73,8.29C11.73,8.63 11.77,8.96 11.84,9.27C8.28,9.09 5.11,7.38 3,4.79C2.63,5.42 2.42,6.16 2.42,6.94C2.42,8.43 3.17,9.75 4.33,10.5C3.62,10.5 2.96,10.3 2.38,10C2.38,10 2.38,10 2.38,10.03C2.38,12.11 3.86,13.85 5.82,14.24C5.46,14.34 5.08,14.39 4.69,14.39C4.42,14.39 4.15,14.36 3.89,14.31C4.43,16 6,17.26 7.89,17.29C6.43,18.45 4.58,19.13 2.56,19.13C2.22,19.13 1.88,19.11 1.54,19.07C3.44,20.29 5.7,21 8.12,21C16,21 20.33,14.46 20.33,8.79C20.33,8.6 20.33,8.42 20.32,8.23C21.16,7.63 21.88,6.87 22.46,6Z"
  const github = "M12,2A10,10 0 0,0 2,12C2,16.42 4.87,20.17 8.84,21.5C9.34,21.58 9.5,21.27 9.5,21C9.5,20.77 9.5,20.14 9.5,19.31C6.73,19.91 6.14,17.97 6.14,17.97C5.68,16.81 5.03,16.5 5.03,16.5C4.12,15.88 5.1,15.9 5.1,15.9C6.1,15.97 6.63,16.93 6.63,16.93C7.5,18.45 8.97,18 9.54,17.76C9.63,17.11 9.89,16.67 10.17,16.42C7.95,16.17 5.62,15.31 5.62,11.5C5.62,10.39 6,9.5 6.65,8.79C6.55,8.54 6.2,7.5 6.75,6.15C6.75,6.15 7.59,5.88 9.5,7.17C10.29,6.95 11.15,6.84 12,6.84C12.85,6.84 13.71,6.95 14.5,7.17C16.41,5.88 17.25,6.15 17.25,6.15C17.8,7.5 17.45,8.54 17.35,8.79C18,9.5 18.38,10.39 18.38,11.5C18.38,15.32 16.04,16.16 13.81,16.41C14.17,16.72 14.5,17.33 14.5,18.26C14.5,19.6 14.5,20.68 14.5,21C14.5,21.27 14.66,21.59 15.17,21.5C19.14,20.16 22,16.42 22,12A10,10 0 0,0 12,2Z"
  const medium = "M8.5 7A8.5 8.5 0 108.5 24 8.5 8.5 0 108.5 7zM22 8A4 7.5 0 1022 23 4 7.5 0 1022 8zM28.5 9A1.5 6.5 0 1028.5 22 1.5 6.5 0 1028.5 9z"
  return (
    <Container className={ classes.socials }>
      <Grid className={ classes.socialgrid }>
        <Button className={ classes.socialButton } onClick={event =>  window.open("https://twitter.com/bilidlyexchange")}>
        <SvgIcon viewBox="0 0 24 24" strokeWidth="1">
          <path d={twitter} />
        </SvgIcon>
        </Button>
        <Button className={ classes.socialButton } onClick={event =>  window.open("https://t.me/bilidly")}>
        <SvgIcon viewBox="0 0 24 24" strokeWidth="1">
          <path d={telegram} />
        </SvgIcon>
        </Button>
        <Button className={ classes.socialButton } onClick={event =>  window.open("https://github.com/Bilidly")}>
        <SvgIcon viewBox="0 0 24 24" strokeWidth="1">
          <path d={github} />
        </SvgIcon>
        </Button>
        <Button className={ classes.socialButton } onClick={event =>  window.open("https://medium.com/@Bilidly")}>
        <SvgIcon viewBox="0 0 34 34" strokeWidth="1">
          <path d={medium} />
        </SvgIcon>
        </Button>
      </Grid>
      </Container>
  )
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
              <Grid item lg={3} md={3} sm={12} xs={12}>
                <Button className={classes.buttonInfo} onClick={() => scrollTo({ top: 1000, left: 0, behavior: 'smooth' })}>Learn More</Button>
              </Grid>
              <Faucet />
              <Grid item lg={3} md={3} sm={12} xs={12}>
                <Button className={classes.buttonEnter} onClick={() => router.push('/swap')}>Swap</Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </div>
      <Socials  className={classes.buttonEnter}/>

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
