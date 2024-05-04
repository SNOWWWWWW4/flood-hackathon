'use client'
import React, { useEffect, useState } from 'react'

//Navbar
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MoreIcon from '@mui/icons-material/MoreVert';

//Drawer
import Drawer from '@mui/material/Drawer';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox'; // need to change

import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import mapboxgl from 'mapbox-gl';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';

const BetaMap = () => {

    //Navbar Styling
  const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  }));

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState<null | HTMLElement>(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
    </Menu>
  );



  //Drawer
  const [isOpen, setIsOpen] = useState(false);

  const toggleDrawer = (open: boolean) => () => {
    setIsOpen(open);
  };

  const list = (
    <div
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {['All mail', 'Trash', 'Spam'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </div>
  );

  //Mapbox GL JS
  const [map, setMap] = React.useState<mapboxgl.Map | null>(null);
  const mapContainerRef = React.useRef<HTMLDivElement>(null); // Ref for the map container
  const geocoderContainerRef = React.useRef<HTMLDivElement>(null); // Ref for the geocoder container

  useEffect(() => {
    mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN ?? '';

    const newMap = new mapboxgl.Map({
      container: mapContainerRef.current!,
      center: [-74.5, 40],
      zoom: 9,
    });

    newMap.on('style.load', () => {
      newMap.setConfigProperty('basemap', 'lightPreset', 'dusk');
    });

    // Geolocator, grabs the device's location
    newMap.addControl(
      new mapboxgl.GeolocateControl({
        positionOptions: {
          enableHighAccuracy: true
        },
        trackUserLocation: true,
        showUserHeading: true
      }),
      'bottom-right'
    );

    
    newMap.addControl(new mapboxgl.NavigationControl());

    setMap(newMap);

    // return () => {
    //   newMap.remove();
    // };
  }, []);


  useEffect(() => {
    if (map && geocoderContainerRef.current) {
      const geocoder = new MapboxGeocoder({
        accessToken: mapboxgl.accessToken,
        mapboxgl: mapboxgl,
        placeholder: 'Search for a location',
      });
      geocoderContainerRef.current.appendChild(geocoder.onAdd(map));
    }
  }, [map, isOpen, isMobileMenuOpen, isMenuOpen]);


  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" className=''>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
            onClick={toggleDrawer(true)}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { xs: 'none', sm: 'block' } }}
          >
            FloodHero
          </Typography>
          <Search >
          </Search>

        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}

      <Drawer anchor="left" open={isOpen} onClose={toggleDrawer(false)}>
        {list}
      </Drawer>

      <Box>
        <section className="bg-sky-500 py-12 px-12">
          <div className='heroBG py-4 px-4'>
            <h1>Reponsiveness Matters</h1>
            <h2>Every second counts</h2>
          </div>
        </section>

        <section className='bg-white'>
          <h1 className='text-center text-slate-700 mt-20 text-3xl font-bold mx-20'>Welcome to HeroFlood, your ultimate guide to understanding, preparing for, and responding to flooding incidents.</h1>
          <h1 className='text-center text-slate-500 mt-4 text-2xl mx-40'> 
             Our platform empowers individuals and communities with vital information, resources, and tools to mitigate the risks associated with flooding and ensure safety during emergencies.
          </h1>

          <div className='bg-sky-900 mx-40 rounded-md py-4 px-4 my-4 grid grid-cols-2 mt-20'>
            <div className='py-4'>
              <h1 className='text-white text-3xl font-bold px-8'>Our Mission</h1>
              <p className='text-white  mx-8 mt-10'>
              At HeroFlood, we're committed to equipping you with the knowledge and resources needed to navigate through flooding challenges. Our team of experts brings together years of experience in disaster management, environmental science, and community resilience to provide comprehensive support and guidance.
              </p>
            </div>

            <div className='missionBG'></div>
          </div>

          
        </section>

        <section className='bg-sky-600 mt-20'>
            <h1>our mission</h1>
        </section>

        <section className='bg-sky-700'>
            <h1>hi</h1>
        </section>

        <section className='bg-sky-950 w-full grid grid-cols-2 p-4'>
          <div className="justify-center">


            <div ref={geocoderContainerRef}></div>
          </div>

          <div ref={mapContainerRef} className='mapHeight'></div>

        </section>
      </Box>
    </Box>
  )
}

export default BetaMap
