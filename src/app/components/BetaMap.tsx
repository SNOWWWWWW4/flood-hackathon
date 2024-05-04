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
import { getMapDots } from '@/utils/DataServices';
import { Button } from '@mui/material';

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

    //creating the initial viewport
    const newMap = new mapboxgl.Map({
      container: mapContainerRef.current!,
      center: [-121.28, 37.9176], //lng, lat
      zoom: 9, //higher the number, the more zoomed in
    });

    //giving newMap a style, this is what is creating the globe
    newMap.on('style.load', () => {
      newMap.setConfigProperty('basemap', 'lightPreset', 'day'); // the last value can be changed to dawn, day, dusk, or night
    });

    const getData = async () => {
      const mapDots: any = await getMapDots();
      console.log(mapDots);
      return mapDots;
    }

    getData().then(mapDots => {
      newMap.on('load', () => {
        newMap.addSource('places', {
          type: 'geojson',
          // Use a URL for the value for the data property.
          data: {
            "type": "FeatureCollection",
            "features": [
                {
                    "type": "Feature",
                    "properties": {
                        "Description": '<strong>Arnold Rue Community Center</strong><p>Warming Zone</p><p>5758 Loraine Ave.</p><p>Stockton, CA 95210</p><p>Open 8:00pm - 7:00am</p>',
                        "Name": "Arnold Rue Community Center",
                        "Type": "Warming Zone",
                        "Address": "5758 Lorraine Ave.",
                        "City": "Stockton",
                        "State": "CA",
                        "ZipCode": "95210",
                        "HoursOfOperation": "8:00pm - 7:00am"
                    },
                    "geometry": {
                        "type": "Point",
                        "coordinates": [
                            -121.282838,
                            38.010881
                        ]
                    }
                },
                {
                    "type": "Feature",
                    "properties": {
                      "Description": '<strong>Stribley Community Center</strong><p>Warming Zone</p><p>1760 E. Sonora St.</p><p>Stockton, CA 95205</p><p>Open 8:00pm - 7:00am</p>',
                        "Name": "Stribley Community Center",
                        "Type": "Warming Zone",
                        "Address": "1760 E. Sonora St.",
                        "City": "Stockton",
                        "State": "CA",
                        "ZipCode": "95205",
                        "HoursOfOperation": "8:00pm - 7:00am"
                    },
                    "geometry": {
                        "type": "Point",
                        "coordinates": [
                            -121.266172,
                            37.951862
                        ]
                    }
                },
                {
                    "type": "Feature",
                    "properties": {
                      "Description": '<strong>Manteca Transit Center</strong><p>Warming Zone</p><p>220 Moffat Blvd.</p><p>Manteca, CA 95337</p><p>Open 9:00pm - 7:00am</p>',
                        "Name": "Manteca Transit Center",
                        "Type": "Warming Zone",
                        "Address": "220 Moffat Blvd.",
                        "City": "Manteca",
                        "State": "CA",
                        "ZipCode": "95337",
                        "HoursOfOperation": "9:00pm - 7:00am"
                    },
                    "geometry": {
                        "type": "Point",
                        "coordinates": [
                            -121.214544,
                            37.794473
                        ]
                    }
                },
                {
                    "type": "Feature",
                    "properties": {
                      "Description": '<strong>Tracy Community Connections Center</strong><p>Warming Zone</p><p>95 W 11th St. #206</p><p>Tracy, CA 95376</p><p>Open 7:00pm - 7:00am</p>',
                        "Name": "Tracy Community Connections Center",
                        "Type": "Warming Zone",
                        "Address": "95 W 11th St. #206",
                        "City": "Tracy",
                        "State": "CA",
                        "ZipCode": "95376",
                        "HoursOfOperation": "7:00pm - 7:00am"
                    },
                    "geometry": {
                        "type": "Point",
                        "coordinates": [
                            -121.42638493527943,
                            37.73986141972307
                        ]
                    }
                },
                {
                    "type": "Feature",
                    "properties": {
                      "Description": '<strong>Tracy Transit Center</strong><p>Warming Zone</p><p>50 E. Sixth St.</p><p>Tracy, CA 95376</p><p>Open Monday - Friday 8:00am - 7:00pm, Saturday 10:00am - 6:00pm</p>',
                        "Name": "Tracy Transit Center",
                        "Type": "Warming Zone",
                        "Address": "50 E. Sixth St.",
                        "City": "Tracy",
                        "State": "CA",
                        "ZipCode": "95376",
                        "HoursOfOperation": "Monday - Friday 8:00am - 7:00pm, Saturday 10:00am - 6:00pm"
                    },
                    "geometry": {
                        "type": "Point",
                        "coordinates": [
                            -121.425314,
                            37.734345
                        ]
                    }
                },
                {
                    "type": "Feature",
                    "properties": {
                      "Description": '<strong>Hope Harbor (Salvation Army)</strong><p>Warming Zone</p><p>662 N. Sacramento St.</p><p>Lodi, CA 95240</p><p>Open 10:00pm - 6:00am</p>',
                        "Name": "Hope Harbor (Salvation Army)",
                        "Type": "Warming Zone",
                        "Address": "662 N. Sacramento St.",
                        "City": "Lodi",
                        "State": "CA",
                        "ZipCode": "95240",
                        "HoursOfOperation": "10:00pm - 6:00am"
                    },
                    "geometry": {
                        "type": "Point",
                        "coordinates": [
                            -121.2714263333634,
                            38.141419834938915
                        ]
                    }
                }
            ]
        },
        });

        newMap.addLayer({
          'id': 'places',
          'type': 'circle',
          'source': 'places',
          'paint': {
            'circle-radius': 6,
            'circle-stroke-width': 2,
            'circle-color': 'red',
            'circle-stroke-color': 'white'
          }
        });
      });

    })

    const popup = new mapboxgl.Popup({
      closeButton: false,
      closeOnClick: false
    });

    newMap.on('mouseenter', 'places', (e: any) => {
      // Change the cursor style as a UI indicator.
      newMap.getCanvas().style.cursor = 'pointer';

      
      // Copy coordinates array.
      const coordinates: any = e?.features?.[0]?.geometry?.coordinates?.slice();
      const Description = e?.features?.[0]?.properties?.Description;

      // Ensure that if the map is zoomed out such that multiple
      // copies of the feature are visible, the popup appears
      // over the copy being pointed to.
      while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
        coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
      }

      // Populate the popup and set its coordinates
      // based on the feature found.
      popup.setLngLat(coordinates).setHTML(Description).addTo(newMap);
    });

    newMap.on('mouseleave', 'places', () => {
      newMap.getCanvas().style.cursor = '';
      popup.remove();
    });

    // Geolocator, grabs the device's location
    newMap.addControl(
      new mapboxgl.GeolocateControl({
        positionOptions: {
          enableHighAccuracy: true,
        },
        trackUserLocation: true,
        showUserHeading: true,
      }),
      'bottom-right'
    );

    // you're already able to zoom in and out using your mouse but this adds a hard button for that as an alternative option
    // also adds the north orientator, full screen mode, and scale reference
    newMap.addControl(new mapboxgl.FullscreenControl(),'top-left');
    newMap.addControl(new mapboxgl.NavigationControl());
    newMap.addControl(new mapboxgl.ScaleControl());

    setMap(newMap);

  }, []);


  // useEffect(() => {
  //   if (map && geocoderContainerRef.current) {
  //     const geocoder = new MapboxGeocoder({
  //       accessToken: mapboxgl.accessToken,
  //       mapboxgl: mapboxgl,
  //       placeholder: 'Search for a location',
  //     });
  //     geocoderContainerRef.current.appendChild(geocoder.onAdd(map));
  //   }
  // }, [map, isOpen, isMobileMenuOpen, isMenuOpen]);


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
        <section className="bg-sky-500">
          <div className='heroBG py-7 px-7'>
            <h1 className='text-4xl md:text-7xl mb-4'>In an emergency</h1>
            <h2 className='text-xl md:text-5xl'>Every second counts</h2>
          </div>
        </section>

        <section className='bg-white'>
          <h1 className='text-center text-slate-700 mt-20 text-3xl font-bold mx-8 lg:mx-20'>Welcome to FloodHero, your ultimate guide to understanding, preparing for, and responding to flood emergencies.</h1>
          <h1 className=' text-slate-500 mt-4 text-2xl mx-10 lg:mx-40'>Our platform empowers individuals and communities in the San Joaquin County with vital information, resources, and tools to mitigate the risks associated with flooding and ensure safety during emergencies.</h1>

          <div className='bg-sky-900 mx-10 lg:mx-40 rounded-md py-4 px-4 my-4 grid lg:grid-cols-2 mt-20'>
            <div className='py-4'>
              <h1 className='text-white text-3xl font-bold px-4 lg:px-8'>Our Mission</h1>
              <p className='text-white mx-4 lg:mx-8 mt-10'>
              At FloodHero, we're committed to equipping you with the knowledge and resources needed to navigate through flooding challenges. Our team of experts brings together years of experience in disaster management, environmental science, and community resilience to provide comprehensive support and guidance.
              </p>
            </div>

            <div className='missionBG'></div>
          </div>

          
        </section>

        {/* <section className='bg-sky-600 mt-20'>
            <h1>our mission</h1>
        </section>

        <section className='bg-sky-700'>
            <h1>hi</h1>
        </section> */}

        <section className='bg-sky-950 w-full grid lg:grid-cols-2 p-4'>
          <div className="justify-center">


            <div className='pl-4'>
              <h1 className='text-4xl text-white my-4'>Find help when you need it most</h1>
              <p className='text-lg text-white'>In an emergency situation, warming zones are available across San Joaquin County in Lodi, Stockton, Manteca, and Tracy</p>
            </div>
          </div>

          <div ref={mapContainerRef} className='mt-4 mb-6 mx-auto mapHeightMobile'></div>

        </section>
      </Box>
    </Box>
  )
}

export default BetaMap
