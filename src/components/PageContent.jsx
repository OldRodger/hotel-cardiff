import { Stack, Typography } from "@mui/material";
import { Box } from "@mui/system";

function PageContent(props) {
    return (
        <Stack gap={1} component="section">
            <Typography variant="h4" fontWeight={700} color="CaptionText">{props.title}</Typography>
            {props.subtitle && <Typography variant="h6" fontWeight={400} color="GrayText" sx={{ width: '70%' }}>{props.subtitle}</Typography>}
            <Box marginTop={4}>
                {props.children}
            </Box>
        </Stack>
    );
}

export default PageContent;