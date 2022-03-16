import { filter } from 'lodash';
import { useState, useEffect } from 'react';
import { CSVLink } from 'react-csv';

// material
import {
  Card,
  Table,
  Stack,
  Button,
  TableRow,
  TableBody,
  TableCell,
  Container,
  Typography,
  TableContainer,
  TablePagination
} from '@mui/material';
// components
import Label from '../components/Label';
import Page from '../components/Page';
import Scrollbar from '../components/Scrollbar';
import Iconify from '../components/Iconify';
import SearchNotFound from '../components/SearchNotFound';
import { PlayerListHead, PlayerListToolbar } from '../sections/rushingYards';
//

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'player', label: 'Player', alignRight: false },
  { id: 'team', label: 'Team', alignRight: false },
  { id: 'pos', label: 'Position', alignRight: false },
  { id: 'att', label: 'Attempts', alignRight: false },
  { id: 'attG', label: 'Attempts/G', alignRight: false },
  { id: 'yds', label: 'Yards', alignRight: false },
  { id: 'avg', label: 'Avg Yards/Attempt', alignRight: false },
  { id: 'ydsG', label: 'Yards/Game', alignRight: false },
  { id: 'td', label: 'Touchdowns', alignRight: false },
  { id: 'lng', label: 'Longest Rush', alignRight: false },
  { id: 'first', label: 'First Downs', alignRight: false },
  { id: 'firstPerc', label: 'First Down %', alignRight: false },
  { id: 'twentyPlus', label: '20+ Yards Each', alignRight: false },
  { id: 'fortyPlus', label: '40+ Yards Each', alignRight: false },
  { id: 'fum', label: 'Fumbles', alignRight: false },
  { id: '' }
];

const nonStats = ['player', 'team', 'pos'];

// ----------------------------------------------------------------------

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function descendingNumericComparator(a, b, orderBy) {
  if (Number(b[orderBy]) > Number(a[orderBy])) {
    return -1;
  }
  if (Number(b[orderBy]) < Number(a[orderBy])) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  if (!nonStats.includes(orderBy)) {
    return order === 'desc'
      ? (a, b) => descendingNumericComparator(a, b, orderBy)
      : (a, b) => -descendingNumericComparator(a, b, orderBy);
  }
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(array, comparator, query) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  if (query) {
    return filter(
      array,
      (_player) => _player.player.toLowerCase().indexOf(query.toLowerCase()) !== -1
    );
  }
  return stabilizedThis.map((el) => el[0]);
}

export default function RushingYards() {
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('name');
  const [filterName, setFilterName] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(25);
  const [filters, setFilters] = useState([]);
  const [field, setField] = useState('team');
  const [operation, setOperation] = useState('=');
  const [fieldValue, setValue] = useState('ATL');
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    getAPI();
  }, []);

  const handleAddFilter = () => {
    let value = fieldValue;
    if (field === 'pos' || field === 'team') {
      value = `'${fieldValue}'`;
    }
    const filter = { field, operation, value };
    filters.push(filter);
    setFilters(filters);
    getAPI();
  };

  const handleDeleteFilter = (event) => {
    filters.splice(event.currentTarget.value, 1);
    setFilters(filters);
    getAPI();
  };

  const handleChangeField = (event) => {
    setField(event.target.value);
    if (event.target.value === 'team') {
      setValue('ATL');
    } else if (event.target.value === 'pos') {
      setValue('RB');
    } else {
      setValue(0);
    }
  };

  const handleChangeOperation = (event) => {
    setOperation(event.target.value);
  };

  const handleChangeValue = (event) => {
    setValue(event.target.value);
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleFilterByName = (event) => {
    setFilterName(event.target.value);
    setPage(0);
  };

  const getAPI = () => {
    let url = '';
    if (filters.length > 0) {
      url = `http://localhost:8000/stats?`;
      filters.map((filter) => {
        const dbField = filter.field.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`);
        url += `${dbField}=${filter.operation}${filter.value}&`;
        return url;
      });
      url = url.substring(0, url.length - 1);
    } else {
      url = 'http://localhost:8000/stats';
    }

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setLoading(true);
        setData(data);
      });
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - data.length) : 0;

  const filteredPlayers = applySortFilter(data, getComparator(order, orderBy), filterName);

  const isPlayerNotFound = filteredPlayers.length === 0;

  return (
    <Page title="Rushing Yards">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Rushing Leaders
          </Typography>
          <Button variant="contained" startIcon={<Iconify icon="bxs:download" />}>
            <CSVLink
              data={filteredPlayers}
              filename="rushingYards"
              style={{ textDecoration: 'none', color: '#fff' }}
            >
              Export Data
            </CSVLink>
          </Button>
        </Stack>

        <Card>
          <PlayerListToolbar
            filterName={filterName}
            onFilterName={handleFilterByName}
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

          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <PlayerListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  onRequestSort={handleRequestSort}
                />
                <TableBody>
                  {filteredPlayers
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => {
                      const {
                        id,
                        player,
                        team,
                        pos,
                        att,
                        attG,
                        yds,
                        avg,
                        ydsG,
                        td,
                        lng,
                        isTd,
                        first,
                        firstPerc,
                        twentyPlus,
                        fortyPlus,
                        fum
                      } = row;

                      return (
                        <TableRow hover key={id} tabIndex={-1}>
                          <TableCell align="left" component="th" scope="row">
                            <Stack direction="row">
                              <Typography variant="subtitle2" noWrap>
                                {player}
                              </Typography>
                            </Stack>
                          </TableCell>
                          <TableCell align="left">{team}</TableCell>
                          <TableCell align="left">{pos}</TableCell>
                          <TableCell align="left">{att}</TableCell>
                          <TableCell align="left">{attG}</TableCell>
                          <TableCell align="right">{yds}</TableCell>
                          <TableCell align="right">{avg}</TableCell>
                          <TableCell align="right">{ydsG}</TableCell>
                          <TableCell align="right">{td}</TableCell>
                          <TableCell align="right">
                            {isTd ? (
                              <Label align="right" variant="ghost" color="success">
                                {lng}
                              </Label>
                            ) : (
                              lng
                            )}
                          </TableCell>
                          <TableCell align="right">{first}</TableCell>
                          <TableCell align="right">{firstPerc}</TableCell>
                          <TableCell align="right">{twentyPlus}</TableCell>
                          <TableCell align="right">{fortyPlus}</TableCell>
                          <TableCell align="right">{fum}</TableCell>
                        </TableRow>
                      );
                    })}
                  {emptyRows > 0 && (
                    <TableRow style={{ height: 53 * emptyRows }}>
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>
                {loading === false ? (
                  <TableBody>
                    <TableRow>
                      <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                        Loading...
                      </TableCell>
                    </TableRow>
                  </TableBody>
                ) : (
                  isPlayerNotFound && (
                    <TableBody>
                      <TableRow>
                        <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                          <SearchNotFound searchQuery={filterName} />
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  )
                )}
              </Table>
            </TableContainer>
          </Scrollbar>

          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={data.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>
      </Container>
    </Page>
  );
}
