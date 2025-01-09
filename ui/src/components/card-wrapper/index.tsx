import { Card, CardContent, Grid, Typography } from "@mui/material";

interface IProps {
    title: string
    value: number | string
    type?: "currency" 
}

export function CardWrapper({ title, value, type }: IProps) {
    const formattedValue =
        type === "currency" ? `$${value}` : value
    return (
        <Grid item xs={12} sm={4} >
            <Card sx={{ backgroundColor: "#1e293b" }}>
                <CardContent>
                    <Typography color="white" variant="h6" gutterBottom>
                        {title}
                    </Typography>
                    <Typography color="white" variant="h4">{formattedValue}</Typography>
                </CardContent>
            </Card>            
        </Grid>

    )
}