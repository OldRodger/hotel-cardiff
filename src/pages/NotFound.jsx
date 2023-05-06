import { Box, Stack, Typography } from "@mui/material";

function NotFound() {
    return (
        <Box sx={{
            height: '70vh',
            display: 'grid',
            placeItems: 'center',
            textAlign: 'center'
        }}>
            <Stack gap={2}>
                <Typography variant="h1" sx={{fontSize:50, fontWeight: 700}}>🚩</Typography>
                <Typography variant="h1" sx={{fontSize:150, fontWeight: 700}}>404</Typography>
                <Typography variant="h6">The page you are trying to reach doesn't exist</Typography>
                <Typography variant="h5" fontWeight={700}>You seem lost 😓</Typography>
            </Stack>
        </Box>
    );
}

export default NotFound;