import * as React from 'react';
import {styled} from '@mui/material/styles';
import Checkbox, {CheckboxProps} from '@mui/material/Checkbox';
import {CheckIcon} from '../icons';

const BpIcon = styled('span')(({theme}) => ({
  borderRadius: 8,
  width: 24,
  height: 24,
  boxShadow: 'inset 0 0 0 1px #DCDEE0',
  backgroundColor: '#f5f8fa',
  backgroundImage: 'linear-gradient(180deg,hsla(0,0%,100%,.8),hsla(0,0%,100%,0))',
  '.Mui-focusVisible &': {
    outline: '2px auto rgba(19,124,189,.6)',
    outlineOffset: 2,
  },
  ...theme.applyStyles('dark', {
    boxShadow: '0 0 0 1px rgb(16 22 26 / 40%)',
    backgroundColor: '#394b59',
    backgroundImage: 'linear-gradient(180deg,hsla(0,0%,100%,.05),hsla(0,0%,100%,0))',
  }),
}));

const BpCheckedIcon = styled(BpIcon)({
  backgroundColor: '#526ED3',
  backgroundImage: 'linear-gradient(180deg,hsla(0,0%,100%,.1),hsla(0,0%,100%,0))',
  boxShadow: 'none',
  display: 'flex',

  alignItems: 'center',
  justifyContent: 'center',
  "& path": {fill: "#526ED3", stroke: "#fff"},
  '&::before': {
    content: 'none',
  },
  'input:hover ~ &': {
    backgroundColor: '#5973ce',
  },
});

export const BpCheckbox = (props: CheckboxProps) => {
  return (
    <Checkbox
      sx={{'&:hover': {bgcolor: 'transparent'}}}
      disableRipple
      color="default"
      checkedIcon={
        <BpCheckedIcon>
          <CheckIcon />
        </BpCheckedIcon>
      }
      icon={<BpIcon />}
      inputProps={{'aria-label': 'Checkbox demo'}}
      {...props}
    />
  );
};
