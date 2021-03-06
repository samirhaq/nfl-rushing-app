import PropTypes from 'prop-types';
// material
import { styled } from '@mui/material/styles';
import {
  Toolbar,
  Tooltip,
  IconButton,
  Typography,
  OutlinedInput,
  InputAdornment
} from '@mui/material';
// component
import Iconify from '../../components/Iconify';
import PlayerFilterMenu from './PlayerFilterMenu';

// ----------------------------------------------------------------------

const RootStyle = styled(Toolbar)(({ theme }) => ({
  height: 96,
  display: 'flex',
  justifyContent: 'space-between',
  padding: theme.spacing(0, 1, 0, 3)
}));

const SearchStyle = styled(OutlinedInput)(({ theme }) => ({
  width: 240,
  transition: theme.transitions.create(['box-shadow', 'width'], {
    easing: theme.transitions.easing.easeInOut,
    duration: theme.transitions.duration.shorter
  }),
  '&.Mui-focused': { width: 320, boxShadow: theme.customShadows.z8 },
  '& fieldset': {
    borderWidth: `1px !important`,
    borderColor: `${theme.palette.grey[500_32]} !important`
  }
}));

// ----------------------------------------------------------------------

PlayerListToolbar.propTypes = {
  numSelected: PropTypes.number,
  filterName: PropTypes.string,
  onFilterName: PropTypes.func,
  filters: PropTypes.array.isRequired,
  handleAddFilter: PropTypes.func.isRequired,
  handleDeleteFilter: PropTypes.func.isRequired,
  field: PropTypes.string.isRequired,
  handleChangeField: PropTypes.func.isRequired,
  operation: PropTypes.string.isRequired,
  handleChangeOperation: PropTypes.func.isRequired,
  fieldValue: PropTypes.any.isRequired,
  handleChangeValue: PropTypes.func.isRequired
};

export default function PlayerListToolbar({
  numSelected,
  filterName,
  onFilterName,
  filters,
  handleAddFilter,
  handleDeleteFilter,
  field,
  handleChangeField,
  operation,
  handleChangeOperation,
  fieldValue,
  handleChangeValue
}) {
  return (
    <RootStyle
      sx={{
        ...(numSelected > 0 && {
          color: 'primary.main',
          bgcolor: 'primary.lighter'
        })
      }}
    >
      {numSelected > 0 ? (
        <Typography component="div" variant="subtitle1">
          {numSelected} selected
        </Typography>
      ) : (
        <SearchStyle
          value={filterName}
          onChange={onFilterName}
          placeholder="Search player..."
          startAdornment={
            <InputAdornment position="start">
              <Iconify icon="eva:search-fill" sx={{ color: 'text.disabled' }} />
            </InputAdornment>
          }
        />
      )}

      <Typography component="div" variant="caption">
        * Green longest rush converted to Touchdown
      </Typography>

      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton>
            <Iconify icon="eva:trash-2-fill" />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Filter list">
          <PlayerFilterMenu
            filters={filters}
            handleAddFilter={handleAddFilter}
            handleDeleteFilter={handleDeleteFilter}
            field={field}
            handleChangeField={handleChangeField}
            operation={operation}
            handleChangeOperation={handleChangeOperation}
            fieldValue={fieldValue}
            handleChangeValue={handleChangeValue}
          />
        </Tooltip>
      )}
    </RootStyle>
  );
}
