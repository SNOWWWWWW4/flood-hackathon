import { Close } from '@mui/icons-material';
import { Alert, Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, FormHelperText, IconButton, Input, InputLabel, MenuItem, Select, Step, StepButton, Stepper, Typography } from '@mui/material';
import React, { useState } from 'react'
import CheckIcon from '@mui/icons-material/Check'

const Modal = ({ isModalOpen, setIsModalOpen }: { isModalOpen: boolean, setIsModalOpen: any }) => {
    const steps = ['Location', 'Details', 'Details Cont'];
    const [activeStep, setActiveStep] = useState(0);
    const [completed, setCompleted] = React.useState<{
        [k: number]: boolean;
    }>({});

    const totalSteps = () => {
        return steps.length;
    };

    const completedSteps = () => {
        return Object.keys(completed).length;
    };

    const isLastStep = () => {
        return activeStep === totalSteps() - 1;
    };

    const allStepsCompleted = () => {
        return completedSteps() === totalSteps();
    };

    const handleNext = () => {
        const newActiveStep =
            isLastStep() && !allStepsCompleted()
                ? // It's the last step, but not all steps have been completed,
                // find the first step that has been completed
                steps.findIndex((step, i) => !(i in completed))
                : activeStep + 1;
        setActiveStep(newActiveStep);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleStep = (step: number) => () => {
        setActiveStep(step);
    };

    const handleComplete = () => {
        const newCompleted = completed;
        newCompleted[activeStep] = true;
        setCompleted(newCompleted);
        handleNext();
    };

    const handleReset = () => {
        setActiveStep(0);
        setCompleted({});
    };

    const [form, setForm] = useState({
        address: "",
        city: "",
        state: "",
        zipCode: "",
        gender: "",
        type: "",
        numberOfStalls: "",
        wheelChair: "",
        hours: "",
        openTo: "",
        needKey: "",
        babyStation: "",
        cleanliness: "",
        safety: "",
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        })
    }
    return (
        <Dialog
            open={isModalOpen}
            fullWidth={true}
            maxWidth='md'
            style={{ zIndex: 101 }}
        >
            <DialogTitle sx={{ m: 0, p: 2 }}>
                Report Flooding
            </DialogTitle>
            <IconButton
                sx={{
                    position: 'absolute',
                    top: 8,
                    right: 8,
                    color: (theme) => theme.palette.grey[500]
                }}
                onClick={() => setIsModalOpen(false)}
            >
                <Close />
            </IconButton>

            {/* The middle Section */}
            <DialogContent dividers className='h-[615px]'>
                <Box>
                    <Stepper
                        alternativeLabel
                        nonLinear
                        activeStep={activeStep}
                        sx={{
                            my: 3,
                        }}
                    >
                        {steps.map((label, index) => (
                            <Step key={label} completed={completed[index]}>
                                <StepButton color="inherit" onClick={handleStep(index)}>
                                    {label}
                                </StepButton>
                            </Step>
                        ))}
                    </Stepper>
                </Box>

                {allStepsCompleted() ? (
                    <Box className="flex justify-center itmes-center">
                        <Alert icon={<CheckIcon fontSize="inherit" />} severity="success">
                            Here is a gentle confirmation that adding a bathroom was successful.
                        </Alert>
                    </Box>

                ) : (

                    <Box>

                        {activeStep === 0 &&
                            <Box className='grid grid-cols-2 gap-6 my-4'>
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
        //   value={age}
          label="Age"
        //   onChange={handleChange}
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
        //   value={age}
          label="Age"
        //   onChange={handleChange}
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
                        }

                        {activeStep === 1 &&
                            <Box>

                            </Box>
                        }

                        {activeStep === 2 &&
                            <Box>

                            </Box>
                        }
                    </Box>
                )}

            </DialogContent>

            {/* The footer */}

            {allStepsCompleted() ? (
                <DialogActions>
                    <Button onClick={handleReset}>Reset</Button>
                </DialogActions>
            ) : (
                <DialogActions>
                    <Button
                        color="inherit"
                        disabled={activeStep === 0}
                        onClick={handleBack}
                        sx={{ mr: 1 }}
                    >
                        Back
                    </Button>
                    <Box sx={{ flex: '1 1 auto' }} />
                    <Button onClick={handleNext} sx={{ mr: 1 }}>
                        Next
                    </Button>
                    {activeStep !== steps.length && (completed[activeStep] ? (
                        <Typography variant="caption" sx={{ display: 'inline-block' }}>
                            Step {activeStep + 1} is already completed
                        </Typography>
                    ) : (
                        <Button onClick={handleComplete}>
                            {completedSteps() === totalSteps() - 1
                                ? 'Finish'
                                : 'Complete Step'}
                        </Button>
                    ))}
                </DialogActions>
            )}
        </Dialog>
    )
}

export default Modal
