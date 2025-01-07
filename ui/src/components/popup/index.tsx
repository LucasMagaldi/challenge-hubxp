import {
    Box,
    Modal,
    Typography,
    TextField,
    Button,
    Stack,
} from "@mui/material";

interface Field {
    name: string;
    label: string;
    value: string | number;
    onChange: (value: string | number) => void;
}

interface PopUpProps {
    open: boolean;
    onClose: () => void;
    title: string;
    fields: Field[];
    onSave: () => void;
}

export function PopUp({ open, onClose, title, fields, onSave }: PopUpProps) {
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
                <Stack spacing={2}>
                    {fields.map((field) => (
                        <TextField
                            key={field.name}
                            label={field.label}
                            value={field.value}
                            onChange={(e) => field.onChange(e.target.value)}
                            fullWidth
                        />
                    ))}
                    <Stack direction="row" spacing={2} justifyContent="flex-end">
                        <Button variant="outlined" onClick={onClose}>
                            Cancel
                        </Button>
                        <Button variant="contained" onClick={onSave}>
                            Save
                        </Button>
                    </Stack>
                </Stack>
            </Box>
        </Modal>
    );
}
