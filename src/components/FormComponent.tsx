'use client'
import React, { useState } from "react";
import Box from "@mui/material/Box";

import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormHelperText from "@mui/material/FormHelperText";
import Input from "@mui/material/Input";
import Select, { SelectChangeEvent } from "@mui/material/Select";

import OutlinedInput from "@mui/material/OutlinedInput";
import { TextField } from "@mui/material";

export default function FormComponent() {
  const [age, setAge] = React.useState("");

  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value as string);
  };

  return (
    <>
      <div className="bg-white">
      <FormControl variant="standard" >
        <InputLabel htmlFor="component-simple" className="text-white">Name</InputLabel>
        <Input id="component-simple" />
      </FormControl>
      

      <FormControl variant="standard">
      <InputLabel htmlFor="component-helper">Contact Information</InputLabel>

        <InputLabel htmlFor="component-helper" className="text-white">Contact Information</InputLabel>
        <TextField
          id="component-helper"
          label='Phone number'
          aria-describedby="component-helper-text"
          helperText="phone"
        />
        
      </FormControl>

      <FormControl variant="standard">
        <InputLabel htmlFor="component-helper" className="text-white">
          Description of Situation
        </InputLabel>
        <Input
          id="component-helper"
         
          aria-describedby="component-helper-text"
        />
        <FormHelperText id="component-helper-text" className="text-white">
          information that emergency responders should know.
        </FormHelperText>
      </FormControl>

      <FormControl sx={{ m: 1 }} variant="standard">
        <InputLabel id="demo-simple-select-label" className="text-white">Urgency Level</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={age}
          label="Age"
          onChange={handleChange}
        >
          <MenuItem value={10}>flooding</MenuItem>
          <MenuItem value={20}>trapped</MenuItem>
          <MenuItem value={30}>medical emergency</MenuItem>
        </Select>
      </FormControl>

      <FormControl sx={{ m: 1 }} variant="standard">
        <InputLabel id="demo-simple-select-label">Type of Emergency</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={age}
          label="Age"
          onChange={handleChange}
        >
          <MenuItem value={10}>low</MenuItem>
          <MenuItem value={20}>medium</MenuItem>
          <MenuItem value={30}>high</MenuItem>
        </Select>
      </FormControl>

      <FormControl  variant="standard">
        <InputLabel htmlFor="component-helper">Location</InputLabel>
        <Input id="component-helper-text" />
        <FormHelperText>address</FormHelperText>
      </FormControl>
      <FormControl variant="standard">
        <InputLabel htmlFor="component-error">Additional Notes</InputLabel>
        <Input
          id="component-error"
         
          aria-describedby  ="component-error-text"
        />
        <FormHelperText id="component-error-text">additional information</FormHelperText>
      </FormControl>
      </div>
      </>
  );
}

