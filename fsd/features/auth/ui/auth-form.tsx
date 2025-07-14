import React, {useEffect, useState} from 'react';
import {
  Box,
  Button,
  Typography,
  IconButton,
  InputAdornment,
  Link as MLink,
  FormControlLabel,
} from '@mui/material';
import {useForm, Controller} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import CloseIcon from '@mui/icons-material/Close';
import Link from 'next/link';
import {FormData, schema} from '../model';
import {TextFieldCustom} from '../../../shared/text-field-custom';
import {BpCheckbox} from '../../../shared/checked-custom';
import {CheckIcon} from '../../../shared/icons';

const validPromoCodes = ["PROMO123", "promo_may2024", "NEWUSER"];

export const AuthForm = () => {
  const {
    control,
    handleSubmit,
    watch,
    setValue,
    formState: {errors, isValid},
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: "onChange",
  });

  const [passwordVisible, setPasswordVisible] = useState(false);
  const [passwordEntered, setPasswordEntered] = useState(false);

  const password = watch("password");
  const email = watch("email");
  const referralCode = watch("referralCode");

  useEffect(() => {
    if (!passwordEntered && password) {
      setPasswordEntered(true);
    }
  }, [password, passwordEntered]);

  const generatePassword = () => {
    const newPassword = Math.random().toString(36).slice(-8) + "A1";
    setValue("password", newPassword, {shouldValidate: true});
  };

  const onSubmit = (data: FormData) => {
    console.log("Form Data:", data);
  };

  const getPasswordIcon = (condition: boolean) =>
    condition ? (
      <CheckIcon sx={{fill: "#fff", fontSize: "16px"}} />
    ) : (
      <CloseIcon sx={{fill: !passwordEntered ? "#A6ABB0" : "#EF4E57", fontSize: "16px"}} />
    );

  return (
    <Box component="form" mt={{xs: 1, sm: 3}} onSubmit={handleSubmit(onSubmit)}>

      {/* Email Field */}
      <Controller
        name="email"
        control={control}
        defaultValue=""
        render={({field}) => (
          <TextFieldCustom
            {...field}
            label="E-mail"
            error={!!errors.email}
            helperText={errors.email?.message}
          />
        )}
      />

      {/* Phone Field */}
      <Controller
        name="phone"
        control={control}
        defaultValue=""
        render={({field}) => (
          <TextFieldCustom
            {...field}
            label="Phone number"
            error={!!errors.phone}
            helperText={errors.phone?.message}
          />
        )}
      />

      {/* Password Field */}
      <Controller
        name="password"
        control={control}
        defaultValue=""
        render={({field}) => (
          <TextFieldCustom
            {...field}
            type={passwordVisible ? 'text' : 'password'}
            label="Password"
            error={!!errors.password}
            helperText={errors.password?.message}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  {!password && (
                    <Button variant="outlined" onClick={generatePassword} color='inherit' sx={{mt: -2, textTransform: "none", borderColor: "#A6ABB0", fontSize: 12, fontWeight: 600, color: "#101112", borderRadius: "8px"}} >
                      Generate
                    </Button>
                  )}
                  {password && (
                    <IconButton sx={{mt: -2}}
                      onClick={() => setPasswordVisible((prev) => !prev)}
                    >
                      {passwordVisible ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  )}
                </InputAdornment>
              ),
            }}
          />
        )}
      />

      {/* Password Strength */}
      <Box mt={2}>
        <Typography variant="body2" color="#A6ABB0" fontSize={12}>
          Password strength:{" "}
          <span style={{color: password ? (errors.password ? "#EF4E57" : "#51D85E") : "#A6ABB0"}}>
            {passwordEntered ? (errors.password ? "Weak password :(" : "Description") : " "}
          </span>
        </Typography>

        <Box mt={1}>
          {[
            {
              condition: !!email && !password?.includes(email),
              label: "Can’t contain e-mail address",
            },
            {
              condition: password?.length >= 8,
              label: "At least 8 characters",
            },
            {
              condition: /[0-9!@#$%^&*(),.?":{}|<>]/.test(password),
              label: "Contains a number or(and) symbol",
            },
            {
              condition: /[A-Z]/.test(password),
              label: "One or more capitalized letter",
            },
          ].map(({condition, label}, index) => (
            <Typography
              key={index}
              variant="body2"
              sx={{
                mt: .3,
                display: "flex",
                alignItems: "center",
                fontSize: 12,
                color: passwordEntered ? (condition ? "#51D85E" : "#EF4E57") : "#A6ABB0",
              }}
            >
              {getPasswordIcon(condition)} &nbsp;{label}
            </Typography>
          ))}
        </Box>
      </Box>

      {/* Referral Code Field */}
      <Controller
        name="referralCode"
        control={control}
        defaultValue=""
        render={({field}) => (
          <TextFieldCustom
            {...field}
            label="Referral code"
            InputProps={{
              endAdornment: referralCode && validPromoCodes.includes(referralCode) ? (
                <InputAdornment position="end">
                  <CheckIcon sx={{mt: -2, fill: "#fff", fontSize: "16px"}} />
                </InputAdornment>
              ) : null,
            }}
            error={!!errors.referralCode}
            helperText={errors.referralCode?.message}
          />
        )}
      />

      {/* Terms Checkbox */}
      <Controller
        name="terms"
        control={control}
        defaultValue={false}
        render={({field}) => (
          <FormControlLabel
            sx={{mt: 2}}
            control={<BpCheckbox {...field} checked={field.value} />}
            label={
              <Typography variant="body2" fontSize={{xs: 12, sm: 14}} color="#A6ABB0">
                I accept the{' '}
                <MLink component={Link} href="/">
                  Terms of Use
                </MLink>
                {' '}
                and have read the{' '}
                <MLink component={Link} href="/">
                  Privacy Policy
                </MLink>
              </Typography>
            }
          />
        )}
      />

      {/* Submit Button */}
      <Button
        type="submit"
        variant="contained"
        color="primary"
        fullWidth
        sx={{mt: 4, textTransform: "none", borderRadius: "8px", boxShadow: "none", bgcolor: "#526ED3", "&:hover": {bgcolor: "#526ED3"}}}
        disabled={!isValid}
      >
        Sign In
      </Button>
    </Box>
  );
};
