import { Close } from '@mui/icons-material';
import { Alert, Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, IconButton, Step, StepButton, Stepper, Typography } from '@mui/material';
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
                                <FormControl>
                                    <label className="text-sm font-bold text-gray-700 mb-3">Address</label>
                                    <input
                                        className="w-full h-10 px-3 py-2 rounded mb-3 border-2"
                                        placeholder="Start typing your address, e.g. 123 Main..."
                                        autoComplete="address-line1"
                                        id="mapbox-autofill"
                                    />
                                </FormControl>
                                <FormControl>
                                    <label className="text-sm font-bold text-gray-700 mb-3">City</label>
                                    <input className="w-full h-10 px-3 py-2 rounded mb-3 border-2" placeholder="City" autoComplete="address-level2" />
                                </FormControl>

                                <FormControl>
                                    <label className="text-sm font-bold text-gray-700 mb-3">State / Region</label>
                                    <input className="w-full h-10 px-3 py-2 rounded mb-3 border-2" placeholder="State / Region" autoComplete="address-level1" />
                                </FormControl>

                                <FormControl>
                                    <label className="text-sm font-bold text-gray-700 mb-3">ZIP / Postcode</label>
                                    <input className="w-full h-10 px-3 py-2 rounded mb-3 border-2" placeholder="ZIP / Postcode" autoComplete="postal-code" />
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
