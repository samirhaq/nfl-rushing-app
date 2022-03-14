import PropTypes from 'prop-types';
// material
import { alpha, styled } from '@mui/material/styles';
import { Box, AppBar, Toolbar, IconButton } from '@mui/material';
// components
import Logo from '../../components/Logo';
import Iconify from '../../components/Iconify';

// ----------------------------------------------------------------------

const DRAWER_WIDTH = 0;
const APPBAR_MOBILE = 64;
const APPBAR_DESKTOP = 92;

const RootStyle = styled(AppBar)(({ theme }) => ({
  boxShadow: 'none',
  backdropFilter: 'blur(6px)',
  WebkitBackdropFilter: 'blur(6px)', // Fix on Mobile
  backgroundColor: alpha(theme.palette.background.paper, 0.72),
  [theme.breakpoints.up('lg')]: {
    width: `calc(100% - ${DRAWER_WIDTH + 1}px)`
  }
}));

const ToolbarStyle = styled(Toolbar)(({ theme }) => ({
  minHeight: APPBAR_MOBILE,
  [theme.breakpoints.up('lg')]: {
    minHeight: APPBAR_DESKTOP,
    padding: theme.spacing(0, 5)
  }
}));

// ----------------------------------------------------------------------

DashboardNavbar.propTypes = {
  onOpenSidebar: PropTypes.func
};

export default function DashboardNavbar({ onOpenSidebar }) {
  return (
    <RootStyle>
      <ToolbarStyle>
        <Box sx={{ px: 2.5, py: 3, display: 'inline-flex' }}>
          <Logo />
        </Box>
        <IconButton
          onClick={onOpenSidebar}
          sx={{ mr: 1, color: 'text.primary', display: { lg: 'none' } }}
        >
          <Iconify icon="eva:menu-2-fill" />
        </IconButton>
        <Box sx={{ flexGrow: 1 }} />
      </ToolbarStyle>
    </RootStyle>
  );
}
