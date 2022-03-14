import { useState, useEffect } from 'react';
import { MenuItem, InputLabel, Select, FormControl, TextField } from '@mui/material';
import PropTypes from 'prop-types';

// ----------------------------------------------------------------------
PlayerFilterMenuList.propTypes = {
  field: PropTypes.string.isRequired,
  handleChangeField: PropTypes.func.isRequired,
  operation: PropTypes.string.isRequired,
  handleChangeOperation: PropTypes.func.isRequired,
  fieldValue: PropTypes.any.isRequired,
  handleChangeValue: PropTypes.func.isRequired
};

export default function PlayerFilterMenuList({
  field,
  handleChangeField,
  operation,
  handleChangeOperation,
  fieldValue,
  handleChangeValue
}) {
  const [positions, setPositions] = useState([]);
  const [teams, setTeams] = useState([]);
  const nonStats = ['pos', 'team'];

  useEffect(() => {
    getAPI();
  }, []);

  const getAPI = () => {
    const teamsCall = 'http://localhost:8080/teams';

    fetch(teamsCall)
      .then((response) => response.json())
      .then((data) => {
        setTeams(data);
      });

    const positionsCall = 'http://localhost:8080/positions';

    fetch(positionsCall)
      .then((response) => response.json())
      .then((data) => {
        setPositions(data);
      });
  };

  return (
    <MenuItem>
      <FormControl sx={{ m: 1, minWidth: 80 }}>
        <InputLabel id="field-select-label">Field</InputLabel>
        <Select
          labelId="field-select-label"
          id="field-select"
          value={field}
          label="Field"
          onChange={handleChangeField}
        >
          <MenuItem value="team">Team</MenuItem>
          <MenuItem value="pos">Position</MenuItem>
          <MenuItem value="att">Attempts</MenuItem>
          <MenuItem value="attG">Att/G</MenuItem>
          <MenuItem value="yds">Yards</MenuItem>
          <MenuItem value="avg">Average Yards/Attempt</MenuItem>
          <MenuItem value="ydsG">Yards/Game</MenuItem>
          <MenuItem value="td">Touchdowns</MenuItem>
          <MenuItem value="lng">Longest Rush</MenuItem>
          <MenuItem value="first">First Downs</MenuItem>
          <MenuItem value="firstPerc">First Down %</MenuItem>
          <MenuItem value="twentyPlus">Twenty+ Yards Each</MenuItem>
          <MenuItem value="fortyPlus">Forty+ Yards Each</MenuItem>
          <MenuItem value="fum">Fumbles</MenuItem>
        </Select>
      </FormControl>

      <FormControl sx={{ m: 1, minWidth: 100 }}>
        <InputLabel id="operation-select-label">Operation</InputLabel>
        <Select
          labelId="operation-select-label"
          id="operation-select"
          value={operation}
          label="Operation"
          onChange={handleChangeOperation}
        >
          <MenuItem value="=">Equal to</MenuItem>
          <MenuItem value="!=">Not Equal to</MenuItem>
          {!nonStats.includes(field) && [
            <MenuItem value=">">Greater Than</MenuItem>,
            <MenuItem value="<">Less Than</MenuItem>,
            <MenuItem value=">=">Greater Than or Equal</MenuItem>,
            <MenuItem value="<=">Less Than or Equal</MenuItem>,
            <MenuItem value="=">Equal to</MenuItem>,
            <MenuItem value="!=">Not Equal to</MenuItem>
          ]}
        </Select>
      </FormControl>
      <FormControl sx={{ m: 1, minWidth: 80 }}>
        {nonStats.includes(field) && field === 'team' && (
          <>
            <InputLabel id="field-select-label">Value</InputLabel>
            <Select
              labelId="value-select-label"
              id="value-select"
              value={fieldValue}
              label="Value"
              onChange={handleChangeValue}
              defaultValue={teams[0]}
            >
              {teams.map((team) => (
                <MenuItem value={team}>{team}</MenuItem>
              ))}
            </Select>
          </>
        )}
        {nonStats.includes(field) && field === 'pos' && (
          <>
            <InputLabel id="field-select-label">Value</InputLabel>
            <Select
              labelId="value-select-label"
              id="value-select"
              value={fieldValue}
              label="Value"
              onChange={handleChangeValue}
              defaultValue={positions[0]}
            >
              {positions.map((position) => (
                <MenuItem value={position}>{position}</MenuItem>
              ))}
            </Select>
          </>
        )}
        {(!field || !nonStats.includes(field)) && (
          <TextField
            id="outlined-number"
            type="number"
            label="Value"
            onChange={handleChangeValue}
            defaultValue={0}
            InputLabelProps={{
              shrink: true
            }}
          />
        )}
      </FormControl>
    </MenuItem>
  );
}
