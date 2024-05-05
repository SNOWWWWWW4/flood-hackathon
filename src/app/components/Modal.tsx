import { Close } from '@mui/icons-material';
import { Alert, Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, FormHelperText, IconButton, Input, InputLabel, MenuItem, Select, Step, StepButton, Stepper, Typography } from '@mui/material';
import React, { useState } from 'react'
import CheckIcon from '@mui/icons-material/Check'

const Modal = ({ isModalOpen, setIsModalOpen }: { isModalOpen: boolean, setIsModalOpen: any }) => {
    const steps = ['Details'];
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
                            Here is a gentle confirmation that requesting help was successful.
                        </Alert>
                    </Box>

                ) : (

                    <Box>

                        {activeStep === 0 &&
                            <Box className='grid grid-cols-2 gap-6 my-4'>
                                <FormControl variant="standard">
                                    <InputLabel htmlFor="component-simple">Name</InputLabel>
                                    <Input id="component-simple" defaultValue="" />
                                    <FormHelperText id="component-helper-text">
                                        Your name
                                    </FormHelperText>
                                </FormControl>

                                <FormControl variant="standard">
                                    <InputLabel htmlFor="component-helper">Contact Information</InputLabel>
                                    <Input
                                        id="component-helper"
                                        defaultValue=""
                                        aria-describedby="component-helper-text"
                                    />
                                    <FormHelperText id="component-helper-text">
                                        Your phone number and/or email address
                                    </FormHelperText>
                                </FormControl>

                                <FormControl variant="standard">
                                    <InputLabel htmlFor="component-helper">
                                        Description of Situation
                                    </InputLabel>
                                    <Input
                                        id="component-helper"
                                        defaultValue=""
                                        aria-describedby="component-helper-text"
                                    />
                                    <FormHelperText id="component-helper-text">
                                        Information that emergency responders should know
                                    </FormHelperText>
                                </FormControl>

                                <FormControl variant="standard">
                                    <InputLabel htmlFor="component-helper">Location</InputLabel>
                                    <Input id="component-helper-text" defaultValue="" />
                                    <FormHelperText>Address of your current location</FormHelperText>
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
                                        <MenuItem value={10}>Flooding</MenuItem>
                                        <MenuItem value={20}>Trapped</MenuItem>
                                        <MenuItem value={30}>Medical emergency</MenuItem>
                                    </Select>
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
                                        <MenuItem value={10}>Low</MenuItem>
                                        <MenuItem value={20}>Medium</MenuItem>
                                        <MenuItem value={30}>High</MenuItem>
                                    </Select>
                                </FormControl>

                                <FormControl variant="standard">
                                    <InputLabel htmlFor="component-error">Additional Notes</InputLabel>
                                    <Input
                                        id="component-error"
                                        defaultValue=""
                                        aria-describedby="component-error-text"
                                    />
                                    <FormHelperText id="component-error-text">Additional information</FormHelperText>
                                </FormControl>
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
