import React from 'react';
import { useRouter } from 'next/router'
import { FirebaseContext } from './Firebase'
import { useProfile } from '../utils/hooks/useProfile'
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Avatar from '@material-ui/core/Avatar';
import Link from 'next/link';
import { Box } from '@material-ui/core';

const MyLink = React.forwardRef(({ onClick, href, children }, ref) => {
    return (
        <a href={href} onClick={onClick} ref={ref}>
            {children}
        </a>
    )
})

export default function ProfileMenu({ color = 'primary' }) {

    const router = useRouter()
    const { firebase, user } = React.useContext(FirebaseContext)
    const userId = user?.id
    // console.log(userId)
    const { data: profile, status } = useProfile(userId)

    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogoutClick = () => {
        firebase.logout().then(() => router.push('/'))
        handleClose();
    }

    return (
        <Box component='nav'>
            <IconButton edge="end" color={color} aria-label="profile" onClick={handleClick}>
                {(user && user !== undefined && status === 'success')
                    ? <Avatar alt="Love cat" src={`/avatars/${profile.avatar}.jpg`} />
                    :
                    <AccountCircleIcon fontSize="large" />
                }
            </IconButton>
            {(user && user !== undefined)
                ?
                <Menu
                    id="simple-menu"
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                >
                    <MenuItem onClick={handleClose}>
                        <Link href={`/${profile && profile.username.length ? profile.username : 'profile'}/${profile ? profile.id : null}`} passHref>
                            <MyLink>
                                Profilul meu
                            </MyLink>
                        </Link>
                    </MenuItem>
                    <MenuItem onClick={handleClose}>
                        <Link href={`/${profile && profile.username.length ? profile.username : 'profile'}/fiselemele`} passHref>
                            <MyLink>
                                Fișele mele
                            </MyLink>
                        </Link>
                    </MenuItem>
                    <MenuItem onClick={handleClose}>
                        <Link href={`/${profile && profile.username.length ? profile.username : 'profile'}/temelemele`} passHref>
                            <MyLink>
                                Temele mele
                            </MyLink>
                        </Link>
                    </MenuItem>
                    <MenuItem onClick={handleLogoutClick}>Ieșire din cont</MenuItem>
                </Menu>
                :
                <Menu
                    id="simple-menu"
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                >
                    <MenuItem onClick={handleClose}>
                        <Link href='/login' passHref>
                            <MyLink >
                                Intră în cont
                            </MyLink>
                        </Link>
                    </MenuItem>
                    <MenuItem onClick={handleClose}>
                        <Link href='/register' passHref>
                            <MyLink >
                                Crează cont
                            </MyLink>
                        </Link>
                    </MenuItem>
                </Menu>
            }
        </Box>
    );
}