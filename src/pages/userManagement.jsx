import React from 'react'
import DashboardLayout from './dashboardLayout'
import { useState } from 'react'
import { useEffect } from 'react';
import { Box, Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle, Grid, IconButton, InputAdornment, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from '@mui/material';
import EditSquareIcon from '@mui/icons-material/EditSquare';
import DeleteIcon from '@mui/icons-material/Delete';
import CloseIcon from '@mui/icons-material/Close';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { toast, ToastContainer } from 'react-toastify';
import api from '../api/axios';

function UserManagement() {

    const API_URL = import.meta.env.VITE_API_URL;

    const [users, setUsers] = useState([]);
    const [open, setOpen] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [newUser, setNewUser] = useState({
        role: 'user',
        firstname: '',
        lastname: '',
        email: '',
        password: ''
    })

    const [isEdit, setIsEdit] = useState(false);
    const [editId, setEditId] = useState(null);

    useEffect(() => {
        fetchUsers();
    }, [])

    const fetchUsers = async () => {
        try {
            setLoading(true)
            const response = await api.get(`/getUsers`);
            setUsers(response.data.users);
        }
        catch (error) {
            console.error('Error fetching users:', error);
        }
        finally {
            setLoading(false)
        }
    }

    const handleChange = (e) => {
        const { name, value } = e.target
        setNewUser({
            ...newUser,
            [name]: value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            if (isEdit) {
                const response = await api.put(`/updateUser/${editId}`, newUser);

                toast.success(response.data.message);

            } else {
                const response = await api.post(`/AddUser`, newUser);

                toast.success(response.data.message);

            }

            fetchUsers();
            handleCloseDialog();
        } catch (error) {
            console.error('Error saving user:', error);
        }
    };

    const handleEditUser = (user) => {
        setIsEdit(true);
        setEditId(user._id);
        setOpen(true);

        setNewUser({
            role: user.role,
            firstname: user.firstname,
            lastname: user.lastname,
            email: user.email,
            password: user.password
        });
    };

    const handleCloseDialog = () => {
        setOpen(false);
        setIsEdit(false);
        setEditId(null);
        setShowPassword(false);
        setNewUser({
            role: 'user',
            firstname: '',
            lastname: '',
            email: '',
            password: ''
        });
    };

    const handleDeleteUser = async (id) => {
        try {
            const response = await api.delete(`/deleteUser/${id}`);
            toast.success(response.data.message);
            fetchUsers();
        } catch (error) {
            console.error('Error deleting user:', error);
            toast.error(error.response?.data?.message || 'Failed to delete user');
        }
    };

    return (
        <DashboardLayout>
            <div className='bg-white rounded-md shadow w-full p-3 md:p-5 flex justify-between items-center'>
                <h1 className='font-bold text-[#212121] text-lg md:text-2xl'>Users</h1>
                <input type="submit" value='Add User' className='border px-5 py-2 rounded-md cursor-pointer bg-[rgb(94,53,177)] text-white hover:bg-[rgb(237,231,246)] hover:text-[rgb(94,53,177)] hover:border-[rgb(94,53,177)]' onClick={() => { setOpen(!open) }} />
            </div>

            {loading
                ? <div className='w-full h-[64vh] mt-3 flex justify-center items-center bg-white rounded-lg shadow'>
                    <div className='flex flex-col items-center gap-4'>
                        <CircularProgress
                            size={30}
                            thickness={4}
                            sx={{
                                color: 'rgb(94, 53, 177)'
                            }}
                        />
                        <p className='text-gray-600 font-medium'>Loading products...</p>
                    </div>
                </div>
                : <div>
                    <div className='mt-3 rounded-lg shadow w-full h-[69vh] md:h-[64vh] overflow-y-scroll p-5 bg-white flex flex-col gap-5'>
                        <Paper
                            sx={{
                                width: '100%',
                                overflow: 'hidden',
                                borderRadius: 1,
                            }}
                        >
                            <TableContainer
                                sx={{
                                    maxHeight: 500,
                                    overflow: 'auto',
                                }}
                            >
                                <Table
                                    stickyHeader
                                    aria-label="user data table"
                                    sx={{
                                        minWidth: 700,
                                        tableLayout: 'fixed',
                                    }}
                                >
                                    <TableHead>
                                        <TableRow>
                                            <TableCell
                                                sx={{
                                                    backgroundColor: '#f8fafc',
                                                    fontWeight: 600,
                                                    color: '#334155',
                                                    fontSize: '0.875rem',
                                                    whiteSpace: 'nowrap',
                                                    minWidth: 150,
                                                }}
                                            >
                                                First Name
                                            </TableCell>
                                            <TableCell
                                                sx={{
                                                    backgroundColor: '#f8fafc',
                                                    fontWeight: 600,
                                                    color: '#334155',
                                                    fontSize: '0.875rem',
                                                    whiteSpace: 'nowrap',
                                                    minWidth: 150,
                                                }}
                                            >
                                                Last Name
                                            </TableCell>
                                            <TableCell
                                                sx={{
                                                    backgroundColor: '#f8fafc',
                                                    fontWeight: 600,
                                                    color: '#334155',
                                                    fontSize: '0.875rem',
                                                    whiteSpace: 'nowrap',
                                                    minWidth: 200,
                                                }}
                                            >
                                                Email
                                            </TableCell>
                                            <TableCell
                                                sx={{
                                                    backgroundColor: '#f8fafc',
                                                    fontWeight: 600,
                                                    color: '#334155',
                                                    fontSize: '0.875rem',
                                                    py: 2,
                                                    whiteSpace: 'nowrap',
                                                    minWidth: 100,
                                                }}
                                            >
                                                Role
                                            </TableCell>
                                            <TableCell
                                                sx={{
                                                    backgroundColor: '#f8fafc',
                                                    fontWeight: 600,
                                                    color: '#334155',
                                                    fontSize: '0.875rem',
                                                    whiteSpace: 'nowrap',
                                                    minWidth: 180,
                                                }}
                                            >
                                                Actions
                                            </TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {users.map((user) => (
                                            <TableRow
                                                key={user._id}
                                                hover
                                                sx={{
                                                    '&:last-child td, &:last-child th': { border: 0 },
                                                    transition: 'background-color 0.2s ease'
                                                }}
                                            >
                                                <TableCell
                                                    sx={{
                                                        fontSize: '0.875rem',
                                                        color: '#475569',
                                                        whiteSpace: 'nowrap',
                                                        overflow: 'hidden',
                                                        textOverflow: 'ellipsis',
                                                    }}
                                                >
                                                    {user.firstname}
                                                </TableCell>
                                                <TableCell
                                                    sx={{
                                                        fontSize: '0.875rem',
                                                        color: '#475569',
                                                        whiteSpace: 'nowrap',
                                                        overflow: 'hidden',
                                                        textOverflow: 'ellipsis',
                                                    }}
                                                >
                                                    {user.lastname}
                                                </TableCell>
                                                <TableCell
                                                    sx={{
                                                        fontSize: '0.875rem',
                                                        color: '#475569',
                                                        whiteSpace: 'nowrap',
                                                        overflow: 'hidden',
                                                        textOverflow: 'ellipsis',
                                                    }}
                                                    title={user.email}
                                                >
                                                    {user.email}
                                                </TableCell>
                                                <TableCell
                                                    sx={{
                                                        fontSize: '0.875rem',
                                                        color: '#475569',
                                                        py: 1.5,
                                                        whiteSpace: 'nowrap',
                                                        overflow: 'hidden',
                                                        textOverflow: 'ellipsis',
                                                    }}
                                                >
                                                    {user.role == 'user' && 'User'}
                                                </TableCell>
                                                <TableCell sx={{ whiteSpace: 'nowrap' }}>
                                                    <button className='p-1 border bg-blue-50 text-blue-600 rounded hover:bg-blue-100 transition-colors duration-200 cursor-pointer' onClick={() => handleEditUser(user)}>
                                                        <EditSquareIcon className='w-3 h-3' />
                                                    </button>
                                                    <button className='p-1 border bg-red-50 text-red-600 rounded hover:bg-red-100 ml-2 transition-colors duration-200 cursor-pointer' onClick={() => handleDeleteUser(user._id)}>
                                                        <DeleteIcon className='w-3 h-3' />
                                                    </button>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Paper>
                    </div>
                </div>}

            <Dialog
                open={open}
                onClose={() => setOpen(false)}
                fullWidth
                maxWidth="sm"
                PaperProps={{
                    sx: {
                        width: '100%',
                        m: { xs: 1, sm: 2 },
                    },
                }}
            >
                <DialogTitle
                    sx={{
                        fontWeight: 600,
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        px: 3,
                        pt: 3,
                        pb: 1,
                        fontSize: '1.25rem',
                        color: '#1f2937'
                    }}
                >
                    {editId ? 'Edit User' : 'Add User'}
                    <IconButton
                        onClick={handleCloseDialog}
                        size="small"
                        sx={{
                            color: '#6b7280',
                            '&:hover': {
                                backgroundColor: '#f3f4f6',
                                color: '#374151'
                            }
                        }}
                    >
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>

                <DialogContent sx={{ px: 3, pt: 1, pb: 2 }}>
                    <form>
                        <Stack spacing={3} sx={{ mt: 1 }}>
                            <Box>
                                <Typography
                                    variant="subtitle2"
                                    sx={{
                                        mb: 1,
                                        color: '#4b5563',
                                        fontWeight: 500
                                    }}
                                >
                                    Personal Information
                                </Typography>

                                <Box className='flex flex-col md:flex-row gap-5'>
                                    <TextField
                                        required
                                        name="firstname"
                                        value={newUser.firstname}
                                        label="First Name"
                                        type="text"
                                        fullWidth
                                        size="small"
                                        variant="outlined"
                                        sx={{
                                            '& .MuiOutlinedInput-root': {
                                                borderRadius: 1,
                                                fontSize: '0.875rem',
                                            }
                                        }}
                                        onChange={handleChange}
                                    />
                                    <TextField
                                        required
                                        name="lastname"
                                        value={newUser.lastname}
                                        label="Last Name"
                                        type="text"
                                        fullWidth
                                        size="small"
                                        variant="outlined"
                                        sx={{
                                            '& .MuiOutlinedInput-root': {
                                                borderRadius: 1,
                                                fontSize: '0.875rem'
                                            }
                                        }}
                                        onChange={handleChange}
                                    />
                                </Box>
                            </Box>

                            <Box>
                                <Typography
                                    variant="subtitle2"
                                    sx={{
                                        mb: 1,
                                        color: '#4b5563',
                                        fontWeight: 500
                                    }}
                                >
                                    Account Details
                                </Typography>

                                <Stack spacing={2}>
                                    <TextField
                                        required
                                        name="email"
                                        value={newUser.email}
                                        label="Email Address"
                                        type="email"
                                        fullWidth
                                        size="small"
                                        variant="outlined"
                                        sx={{
                                            '& .MuiOutlinedInput-root': {
                                                borderRadius: 1,
                                                fontSize: '0.875rem'
                                            }
                                        }}
                                        onChange={handleChange}
                                    />

                                    <TextField
                                        required
                                        name="password"
                                        value={newUser.password}
                                        label="Password"
                                        type={showPassword ? "text" : "password"}
                                        fullWidth
                                        size="small"
                                        variant="outlined"
                                        sx={{
                                            '& .MuiOutlinedInput-root': {
                                                borderRadius: 1,
                                                fontSize: '0.875rem'
                                            }
                                        }}
                                        onChange={handleChange}
                                        InputProps={{
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    <IconButton
                                                        edge="end"
                                                        onClick={() => setShowPassword(!showPassword)}
                                                        size="small"
                                                        sx={{ color: '#6b7280' }}
                                                    >
                                                        {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                                                    </IconButton>
                                                </InputAdornment>
                                            )
                                        }}
                                    />
                                </Stack>
                            </Box>
                        </Stack>
                    </form>
                </DialogContent>

                <DialogActions
                    sx={{
                        px: 3,
                        pb: 3,
                        pt: 1,
                        gap: 2
                    }}
                >
                    <Button
                        variant="outlined"
                        onClick={handleCloseDialog}
                        sx={{
                            borderRadius: 1,
                            textTransform: 'none',
                            px: 3,
                            py: 0.75,
                            borderColor: '#d1d5db',
                            color: '#374151',
                            '&:hover': {
                                borderColor: '#9ca3af',
                                backgroundColor: '#f9fafb'
                            }
                        }}
                    >
                        Cancel
                    </Button>
                    <Button
                        variant="contained"
                        onClick={handleSubmit}
                        sx={{
                            borderRadius: 1,
                            textTransform: 'none',
                            px: 3,
                            py: 0.75,
                            backgroundColor: 'rgb(94,53,177)',
                            '&:hover': {
                                backgroundColor: 'rgb(94,53,177)'
                            }
                        }}
                    >
                        {editId ? 'Update User' : 'Add User'}
                    </Button>
                </DialogActions>
            </Dialog>
            <ToastContainer />
        </DashboardLayout>
    )
}

export default UserManagement
