'use client'
import React, { useState } from "react";
import Box from "@mui/material/Box";
import FilledInput from "@mui/material/FilledInput";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormHelperText from "@mui/material/FormHelperText";
import Input from "@mui/material/Input";
import Select, { SelectChangeEvent } from "@mui/material/Select";

import OutlinedInput from "@mui/material/OutlinedInput";

export default function FormComponent() {
  const [age, setAge] = React.useState("");

  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value as string);
  };

  return (
    <div >
    <Box
      component="form"
      sx={{
        "& > :not(style)": { m: 1 },
      }}
      noValidate
      autoComplete="off"
    >

      <FormControl variant="standard">
        <InputLabel htmlFor="component-simple">Name</InputLabel>
        <Input id="component-simple" defaultValue="Composed TextField" />
      </FormControl>

      <FormControl variant="standard">
        <InputLabel htmlFor="component-helper">Contact Information</InputLabel>
        <Input
          id="component-helper"
          defaultValue="Composed TextField"
          aria-describedby="component-helper-text"
        />
        <FormHelperText id="component-helper-text">
          Phone number and/or email address
        </FormHelperText>
      </FormControl>

      <FormControl variant="standard">
        <InputLabel htmlFor="component-helper">
          Description of Situation
        </InputLabel>
        <Input
          id="component-helper"
          defaultValue="Composed TextField"
          aria-describedby="component-helper-text"
        />
        <FormHelperText id="component-helper-text">
          information that emergency responders should know.
        </FormHelperText>
      </FormControl>

      <FormControl sx={{ m: 1 }} variant="standard">
        <InputLabel id="demo-simple-select-label">Urgency Level</InputLabel>
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
        <Input id="component-helper-text" defaultValue="Composed TextField" />
        <FormHelperText>address</FormHelperText>
      </FormControl>
      <FormControl variant="standard">
        <InputLabel htmlFor="component-error">Additional Notes</InputLabel>
        <Input
          id="component-error"
          defaultValue="Composed TextField"
          aria-describedby="component-error-text"
        />
        <FormHelperText id="component-error-text">additional information</FormHelperText>
      </FormControl>
    </Box>
    </div>
  );
}
