import {
    Box,
    Modal,
    Typography,
    TextField,
    Button,
    Stack,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";

interface Field {
    name: string;
    label: string;
    defaultValue?: string | number;
}

interface PopUpProps {
    open: boolean;
    onClose: () => void;
    title: string;
    fields: Field[];
    onSave: (data: Record<string, any>) => void;
}

export function PopUp({ open, onClose, title, fields, onSave }: PopUpProps) {
    const { control, handleSubmit } = useForm();

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
                        {fields.map((field) => (
                            <Controller
                                key={field.name}
                                name={field.name}
                                control={control}
                                defaultValue={field.defaultValue || ""}
                                render={({ field: controllerField }) => (
                                    <TextField
                                        {...controllerField}
                                        label={field.label}
                                        fullWidth
                                    />
                                )}
                            />
                        ))}
                        <Stack direction="row" spacing={2} justifyContent="flex-end">
                            <Button variant="outlined" onClick={onClose}>
                                Cancel
                            </Button>
                            <Button type="submit" variant="contained">
                                Save
                            </Button>
                        </Stack>
                    </Stack>
                </form>
            </Box>
        </Modal>
    );
}
