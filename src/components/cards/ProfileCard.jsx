import { Avatar, Box, Button, Divider, Stack, Typography } from "@mui/material";
import Card from "../../ui/Card";
import { Apartment, Logout, Person, Settings, Wallet } from "@mui/icons-material";
import { Form, Link } from "react-router-dom";

function ProfileCard(props) {

    let avatar = <Avatar sx={{ bgcolor: '#1d6d64', width: 56, height: 56, textTransform: 'uppercase' }} >{`${props.alias[0]}`}</Avatar>;
    if (props.img.length) {
        avatar = <Avatar alt="profile image" src={props.img} sx={{ width: 56, height: 56 }} />;
    }
    return (
        <Card className="dropdown">
            <Stack direction="row" gap={1.5} alignItems="center">
                {avatar}
                <Stack >
                    <Typography variant="body1" fontWeight={700} textTransform={"capitalize"}>{props.alias}</Typography>
                    <Typography variant="body2">Online</Typography>
                </Stack>
            </Stack>
            <Divider sx={{ marginY: 3 }} />
            <Stack gap={1.5}>
                <Stack direction="row" alignItems="center" gap={1}>
                    <Person />
                    <Link to="/account">
                        <Typography variant="body2" fontWeight={600}>My account</Typography>
                    </Link>
                </Stack>
                <Stack direction="row" alignItems="center" gap={1} >
                    <Apartment />
                    <Link to="/account/bookings">
                        <Typography variant="body2" fontWeight={600}>Bookings</Typography>
                    </Link>
                </Stack>
                <Stack direction="row" alignItems="center" gap={1} marginBottom={5}>
                    <Wallet />
                    <Link to="/account/cards">
                        <Typography variant="body2" fontWeight={600}>Payment</Typography>
                    </Link>
                </Stack>

                <Stack direction="row" alignItems="center" gap={1} >
                    <Logout />
                    <Form method="post" action="/logout">
                        <Button color="dark" type="submit">
                            <Typography variant="body2" fontWeight={600}>Logout</Typography>
                        </Button>
                    </Form>
                </Stack>
            </Stack>
        </Card>
    );
}

export default ProfileCard;