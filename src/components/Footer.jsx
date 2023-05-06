import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import Card from "../ui/Card";
import classes from "./Footer.module.css";
import mailBoxImg from '../assets/images/mailbox.svg';
import { useFetcher } from "react-router-dom";

function Footer() {
    const fetcher = useFetcher();

    return (
        <footer className={classes.footer}>
            <Card className={classes.newsLetter}>
                <Stack direction="row" gap={5} p={3}>
                    <Box>
                        <Typography variant="h3" color="ActiveCaption" fontWeight={600} gutterBottom>
                            Subscribe <br /> Newsletter
                        </Typography>
                        <Typography variant="h6" color="dark" fontWeight={700}>The Travel</Typography>
                        <Typography variant="body1" color="GrayText" fontWeight={600} marginBottom={2}>Get inspired! Receive travel discounts, tips and behind the scenes stories.</Typography>
                        <fetcher.Form>
                            <Stack direction="row" gap={2}>
                                <input type="email" placeholder="Your email address" className={classes.input} />
                                <Button variant="contained" color="black" data-type="stagnant" size="large">subscribe</Button>
                            </Stack>
                        </fetcher.Form>
                    </Box>
                    <Box className={classes.mailBox}>
                        <img src={mailBoxImg} alt="malBox" />
                    </Box>
                </Stack>
            </Card>
        </footer>
    );
}

export default Footer;