import { Avatar, Stack, Typography } from "@mui/material";

function Profile(props) {

    let avatar = <Avatar sx={{bgcolor: '#1d6d64', fontSize: 15, textTransform: 'uppercase'}}>{`${props.alias[0]}`}</Avatar>;
    if (props.img.length) {
        avatar = <Avatar alt="profile image" src={props.img} />;
    }
    return (
        <Stack direction="row" alignItems="center" gap={.8} className="profile">
            {avatar}
            <Typography variant="body1" textTransform={"capitalize"} fontWeight={700}>{props.alias}</Typography>
            {props.children}
        </Stack>
    );
}

export default Profile;