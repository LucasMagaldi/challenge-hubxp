import {
    Box,
    Modal,
    Typography,
    TextField,
    Button,
    Stack,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { ZodSchema } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

interface PopUpProps {
    open: boolean;
    onClose: () => void;
    title: string;
    validationSchema: ZodSchema;
    defaultValues: Record<string, any>;
    onSave: (data: Record<string, any>) => void;
}

export function PopUp({
    open,
    onClose,
    title,
    validationSchema,
    defaultValues,
    onSave,
}: PopUpProps) {
    const {
        control,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm({
        resolver: zodResolver(validationSchema),
        defaultValues,
    });

    const handleFormSubmit = (data: Record<string, any>) => {
        onSave(data);
        onClose();
    };

    return (
        <Modal open={open} onClose={onClose}>
            <Box
                sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    width: 400,
                    bgcolor: "background.paper",
                    boxShadow: 24,
                    p: 4,
                    borderRadius: 2,
                }}
            >
                <Typography variant="h6" mb={2}>
                    {title}
                </Typography>
                <form onSubmit={handleSubmit(handleFormSubmit)}>
                    <Stack spacing={2}>
                        {Object.keys(defaultValues).map((key) => (
                            <Controller
                                key={key}
                                name={key}
                                control={control}
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        label={key.charAt(0).toUpperCase() + key.slice(1)}
                                        fullWidth
                                        error={!!errors[key]}
                                        helperText={errors[key]?.message?.toString()}
                                    />
                                )}
                            />
                        ))}
                        <Stack direction="row" spacing={2} justifyContent="flex-end">
                            <Button
                                variant="outlined"
                                onClick={onClose}
                                disabled={isSubmitting}
                            >
                                Cancel
                            </Button>
                            <Button
                                type="submit"
                                variant="contained"
                                disabled={isSubmitting}
                            >
                                Save
                            </Button>
                        </Stack>
                    </Stack>
                </form>
            </Box>
        </Modal>
    );
}
