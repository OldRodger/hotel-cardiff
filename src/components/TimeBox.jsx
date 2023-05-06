import { WatchLater } from "@mui/icons-material";
import { Box, Stack, Typography } from "@mui/material";

function TimeBox(props) {
    return (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: .8 }}>
            <Box sx={{ bgcolor: '#ebf6f2', padding: '0px 5px', borderRadius: 2 }}>
                {props.icon}
            </Box>
            <Stack>
                <Typography variant="body2" color="GrayText">{props.title}</Typography>
                <Typography variant="body1">{props.text}</Typography>
            </Stack>
        </Box>
    );
}

export default TimeBox;