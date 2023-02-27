import React, { useState, useEffect } from 'react';
import './Pages.css'
import { useTheme } from '@mui/material/styles';
import axios from 'axios';
import PropTypes from 'prop-types';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Button from '@mui/material/Button';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Paper from '@mui/material/Paper';
import Switch from '@mui/material/Switch';
import IconButton from '@mui/material/IconButton';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import { visuallyHidden } from '@mui/utils';
import EditIcon from '@mui/icons-material/Edit';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import OutlinedInput from '@mui/material/OutlinedInput';


const API = "http://localhost:5000/users"
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    height: 600,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    '& > :not(style)': { m: 1, width: '25ch' }
};


const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

const names = [
    'Male',
    'Female',
    'Agender',
    'Genderfluid',
    'Genderqueer',
    'Non-binary',
    'Polygender',
];

function getStyles(name, modalGender, theme) {
    return {
        fontWeight:
            modalGender.indexOf(name) === -1
                ? theme.typography.fontWeightRegular
                : theme.typography.fontWeightMedium,
    };
}

//Table define
function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

function getComparator(order, orderBy) {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}


function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) {
            return order;
        }
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}

const headCells = [
    {
        id: 'id',
        numeric: true,
        disablePadding: false,
        label: 'Id',
    },
    {
        id: 'firstname',
        numeric: false,
        disablePadding: true,
        label: 'Firstname',
    },
    {
        id: 'lastname',
        numeric: false,
        disablePadding: false,
        label: 'Lastname',
    },
    {
        id: 'email',
        numeric: false,
        disablePadding: false,
        label: 'Email',
    },
    {
        id: 'instagram',
        numeric: false,
        disablePadding: false,
        label: 'Instagram',
    },
    {
        id: 'gender',
        numeric: false,
        disablePadding: false,
        label: 'Gender',
    },
    {
        id: 'role',
        numeric: false,
        disablePadding: false,
        label: 'Role',
    },
    {
        id: 'option',
        numeric: false,
        disablePadding: false,
        label: 'Option',
    },
];

function EnhancedTableHead(props) {
    const { order, orderBy, onRequestSort } =
        props;
    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };

    return (
        <TableHead>
            <TableRow>
                {headCells.map((headCell) => (
                    <TableCell
                        key={headCell.id}
                        align={'center'}
                        padding={headCell.disablePadding ? 'none' : 'normal'}
                        sortDirection={orderBy === headCell.id ? order : false}
                    >
                        <TableSortLabel
                            active={orderBy === headCell.id}
                            direction={orderBy === headCell.id ? order : 'asc'}
                            onClick={createSortHandler(headCell.id)}
                        >
                            {headCell.label}
                            {orderBy === headCell.id ? (
                                <Box component="span" sx={visuallyHidden}>
                                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                </Box>
                            ) : null}
                        </TableSortLabel>
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}

EnhancedTableHead.propTypes = {
    onRequestSort: PropTypes.func.isRequired,
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
};



const Admin = () => {
    const [users, setUsers] = useState([]);
    const theme = useTheme();

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        const result = await axios.get(API);
        setUsers(result.data);
    };



    const handleCreate = async () => {
        const newUser = {
            firstname: modalFirstname,
            lastname: modalLastname,
            email: modalEmail,
            instagram: modalInstagram,
            gender: modalGender,
            role: modalRole,
        }
        await axios.post(API, newUser);
        setIsModalOpen(false);
        fetchData();
    };

    const handleUpdate = async (id) => {
        const updatedData = {
            firstname: modalFirstname,
            lastname: modalLastname,
            email: modalEmail,
            instagram: modalInstagram,
            gender: modalGender,
            role: modalRole,
        }
        await axios.patch(API + '/' + id, updatedData);
        setIsModalOpen(false);
        fetchData();
    };

    const handleDelete = async (id) => {
        await axios.delete(API + '/' + id);
        fetchData();
    };

    //UserModal
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleOpenModal = (item) => {
        setModalFirstname(item.firstname)
        setModalLastname(item.lastname)
        setModalEmail(item.email)
        setModalInstagram(item.instagram)
        setModalGender(item.gender)
        setModalRole(item.role)
        setModalIsCreate(false)
        setIsModalOpen(true);
        setModalId(item.id);
    }

    const handleCloseModal = () => setIsModalOpen(false);

    //Gender
    const [modalGender, setModalGender] = useState('Female');

    const handleGenderChange = (event) => {
        const {
            target: { value },
        } = event;
        setModalGender(value);
        // setModalGender(event.target.value);
    };

    //isAdmin
    const [modalRole, setModalRole] = useState('No');

    const handleIsAdminChange = (event) => {
        setModalRole(event.target.value);
    };

    //Modal values
    const [modalFirstname, setModalFirstname] = useState();
    const [modalLastname, setModalLastname] = useState();
    const [modalEmail, setModalEmail] = useState();
    const [modalInstagram, setModalInstagram] = useState();
    const [modalId, setModalId] = useState();


    //Modal controll
    const [modalIsCreate, setModalIsCreate] = useState(true);

    const handlAdd = () => {
        setModalIsCreate(true)
        setIsModalOpen(true)
    }


    //Table format
    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('id');
    const [page, setPage] = useState(0);
    const [dense, setDense] = useState(false);
    const [rowsPerPage, setRowsPerPage] = useState(5);
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

    const handleChangeDense = (event) => {
        setDense(event.target.checked);
    };

    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - users.length) : 0;


    return (
        <>
            <div>
                <Box sx={{ width: '80%' }} className='main-box'>
                    <h1>Admin Panel</h1>
                    <Button variant="contained" onClick={() => handlAdd()}>Add</Button>

                    <Paper sx={{ width: '100%', mb: 2 }}>
                        <TableContainer>
                            <Table
                                sx={{ minWidth: 750 }}
                                aria-labelledby="tableTitle"
                                size={dense ? 'small' : 'medium'}
                            >
                                <EnhancedTableHead
                                    order={order}
                                    orderBy={orderBy}
                                    onRequestSort={handleRequestSort}
                                    rowCount={users.length}
                                />
                                <TableBody>
                                    {stableSort(users, getComparator(order, orderBy))
                                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                        .map((item, index) => {
                                            return (
                                                <TableRow
                                                    role="checkbox"
                                                    tabIndex={-1}
                                                    key={item.id}
                                                >
                                                    <TableCell align="center">{Number(item.id)}</TableCell>
                                                    <TableCell align="center">{item.firstname}</TableCell>
                                                    <TableCell align="center">{item.lastname}</TableCell>
                                                    <TableCell align="center">{item.email}</TableCell>
                                                    <TableCell align="center">{item.instagram}</TableCell>
                                                    <TableCell align="center">{item.gender}</TableCell>
                                                    <TableCell align="center">{item.role}</TableCell>
                                                    <TableCell align="center">
                                                        <Modal
                                                            open={isModalOpen}
                                                            onClose={handleCloseModal}
                                                            aria-labelledby="modal-modal-title"
                                                            aria-describedby="modal-modal-description"
                                                        >
                                                            <Box sx={style}>
                                                                <TextField
                                                                    id="standard-basic"
                                                                    label="Fisrname"
                                                                    variant="standard"
                                                                    defaultValue={modalFirstname}
                                                                    onChange={(e) => setModalFirstname(e.target.value)} />
                                                                <TextField
                                                                    id="standard-basic"
                                                                    label="Lastname"
                                                                    variant="standard"
                                                                    defaultValue={modalLastname}
                                                                    onChange={(e) => setModalLastname(e.target.value)}
                                                                />
                                                                <TextField
                                                                    id="standard-basic"
                                                                    label="Email"
                                                                    variant="standard"
                                                                    defaultValue={modalEmail}
                                                                    onChange={(e) => setModalEmail(e.target.value)}
                                                                />
                                                                <TextField
                                                                    id="standard-basic"
                                                                    label="Instagram"
                                                                    variant="standard"
                                                                    defaultValue={modalInstagram}
                                                                    onChange={(e) => setModalInstagram(e.target.value)}
                                                                />
                                                                <FormControl sx={{ m: 1, width: 300 }}>
                                                                    <InputLabel id="demo-multiple-name-label">Gender</InputLabel>
                                                                    <Select
                                                                        labelId="demo-multiple-name-label"
                                                                        id="demo-multiple-name"
                                                                        // multiple
                                                                        value={modalGender}
                                                                        onChange={handleGenderChange}
                                                                        input={<OutlinedInput label="Gender" />}
                                                                        MenuProps={MenuProps}
                                                                        defaultValue={modalGender}
                                                                    >
                                                                        {names.map((name) => (
                                                                            <MenuItem
                                                                                key={name}
                                                                                value={name}
                                                                                style={getStyles(name, modalGender, theme)}
                                                                            >
                                                                                {name}
                                                                            </MenuItem>
                                                                        ))}
                                                                    </Select>
                                                                </FormControl>
                                                                <FormControl>
                                                                    <FormLabel id="demo-controlled-radio-buttons-group">Is Admin?</FormLabel>
                                                                    <RadioGroup
                                                                        aria-labelledby="demo-controlled-radio-buttons-group"
                                                                        name="controlled-radio-buttons-group"
                                                                        defaultValue={modalRole}
                                                                        onChange={handleIsAdminChange}
                                                                    >
                                                                        <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                                                                        <FormControlLabel value="No" control={<Radio />} label="No" />
                                                                    </RadioGroup>
                                                                </FormControl>
                                                                {!modalIsCreate ? (
                                                                    <Button variant="contained" onClick={(e) => handleUpdate(modalId)}>Update</Button>
                                                                ) : (
                                                                    <Button variant="contained" onClick={(e) => handleCreate()}>Create</Button>
                                                                )}

                                                            </Box>
                                                        </Modal>
                                                        <EditIcon onClick={(e) =>
                                                            handleOpenModal(item)
                                                        } /> /
                                                        <IconButton aria-label="delete">
                                                            <DeleteTwoToneIcon onClick={(e) =>
                                                                handleDelete(item.id)
                                                            } />
                                                        </IconButton>

                                                    </TableCell>
                                                </TableRow>
                                            );
                                        })}
                                    {emptyRows > 0 && (
                                        <TableRow
                                            style={{
                                                height: (dense ? 33 : 53) * emptyRows,
                                            }}
                                        >
                                            <TableCell colSpan={6} />
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        </TableContainer>
                        <TablePagination
                            rowsPerPageOptions={[5, 10, 25]}
                            component="div"
                            count={users.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                        />
                    </Paper>
                    <FormControlLabel
                        control={<Switch checked={dense} onChange={handleChangeDense} />}
                        label="Dense padding"
                    />
                </Box>

            </div>
        </ >
    );
}

export default Admin
