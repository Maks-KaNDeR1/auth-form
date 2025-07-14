/* eslint-disable @next/next/no-img-element */
"use client";

import React from 'react';
import {
  Box,
  Button,
  Grid,
  Link as MLink,
  Stack,
  Typography,
  useMediaQuery,
} from '@mui/material';
import {AuthForm} from './auth-form';
import Link from 'next/link';
import {LogoMinIcon, LogoIcon, BannerIcon} from '../../../shared/icons';

export const Auth = () => {
  const xs = useMediaQuery("(max-width: 600px)");

  return (

    <Grid container height="100vh">
      <Grid xs={12} lg={5.8}>
        <Stack justifyContent={{xs: "flex-start", sm: "space-between"}}
          pb={{lg: 8, md: 4}}
          sx={{
            px: "30px",
            bgcolor: {lg: "#F4F4F4", xs: "#fff"},
            height: "100%",
            pt: 3, pl: {xl: "157px", lg: "106px", md: 3},
            pb: 4,
          }} >

          {
            xs ?
              <LogoMinIcon sx={{width: 146, height: 32}} />
              :
              <LogoIcon sx={{width: 238, height: 44}} />
          }

          <Box mt={{xs: 4, sm: 8}}>
            <Box
              sx={{
                width: {xs: "100%", sm: '516px'},
                margin: '0 auto',
                padding: {xs: 0, sm: '48px 40px', md: '48px 40px'},
                border: {md: "none", lg: "1px solid #DCDEE0"},
                borderRadius: '16px',
                backgroundColor: '#fff',
              }}
            >
              <Stack direction="row" p={.5} sx={{bgcolor: "#F4F4F4", borderRadius: "16px"}} spacing={1} >
                <Button fullWidth variant='contained' color='inherit' sx={{borderRadius: "12px", textTransform: "none", fontWeight: 500, boxShadow: "none", bgcolor: "#fff", color: "#101112"}}>
                  Sign In
                </Button>

                <Button fullWidth variant='contained' color='inherit' sx={{borderRadius: "12px", textTransform: "none", boxShadow: "none", bgcolor: "#F4F4F4", color: "#A6ABB0"}}>
                  Login
                </Button>
              </Stack>

              <AuthForm />
            </Box>
          </Box>

          <Stack direction="row" sx={{display: {xs: "none", sm: "inherit"}}} mt={{xl: 10, md: 0}} justifyContent="space-between" >
            <Typography fontSize={14} fontWeight={400} color="#A6ABB0" >
              © 2024 MIND MONEY LIMITED
            </Typography>
            <Typography fontSize={14} fontWeight={400} color="#A6ABB0" >
              Have some issue? Wrote us&nbsp;
              <MLink component={Link} href="/">
                info@mind-money.eu
              </MLink>
            </Typography>
          </Stack>

        </Stack>
      </Grid>

      <Grid md={0} lg={6.2} display={{xs: "none", lg: "flex"}}>
        <Box height="100%" width="100%" position="relative" overflow="hidden" sx={{bgcolor: "#526ed3"}} pt={20} px={8}>
          <Typography fontSize={40} lineHeight="52px" fontWeight={700}>Start Investing in global stock markets</Typography>
          <Typography mt={3} >Mind.money.eu is the easiest place to invest your money and become a rich guy.
            <br />
            Sign up and get started today free trial fo 14 days!</Typography>
          <BannerIcon sx={{position: "absolute", top: 0, left: 0, width: "100%", height: "auto", objectFit: "cover"}} />

          <img
            style={{
              position: "absolute",
              bottom: 0,
              right: 0,
              height: "55%",
              maxWidth: "90%",
              objectFit: "cover",
              objectPosition: "left",
            }}
            src="/images/banner.png"
            alt=""
          />
        </Box>
      </Grid>
    </Grid>
  );
};

