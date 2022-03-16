import { useRef, useState } from 'react';
// material
import { Menu, IconButton, Button, ListItemText, MenuItem, ListItemIcon } from '@mui/material';
import PropTypes from 'prop-types';
// component
import Iconify from '../../components/Iconify';
import PlayerFilterMenuList from './PlayerFilterMenuList';

// ----------------------------------------------------------------------

PlayerFilterMenu.propTypes = {
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

// ----------------------------------------------------------------------

export default function PlayerFilterMenu({
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
  const ref = useRef(null);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <IconButton ref={ref} onClick={() => setIsOpen(true)}>
        <Iconify icon="ic:round-filter-list" />
      </IconButton>
      <Menu
        open={isOpen}
        anchorEl={ref.current}
        onClose={() => setIsOpen(false)}
        PaperProps={{
          sx: { width: 600, maxWidth: '100%', paddingLeft: '10px' }
        }}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        {filters.length > 0 &&
          filters.map((filter, index) => (
            <MenuItem>
              <ListItemText primary={`${filter.field} ${filter.operation} ${filter.value}`} />
              <ListItemIcon>
                <IconButton value={index} onClick={handleDeleteFilter}>
                  <Iconify icon="eva:trash-2-outline" width={24} height={24} />
                </IconButton>
              </ListItemIcon>
            </MenuItem>
          ))}
        <PlayerFilterMenuList
          field={field}
          handleChangeField={handleChangeField}
          operation={operation}
          handleChangeOperation={handleChangeOperation}
          fieldValue={fieldValue}
          handleChangeValue={handleChangeValue}
        />
        <MenuItem>
          <Button
            variant="contained"
            startIcon={<Iconify icon="eva:plus-fill" />}
            onClick={handleAddFilter}
          >
            Add Filter
          </Button>
        </MenuItem>
      </Menu>
    </>
  );
}
