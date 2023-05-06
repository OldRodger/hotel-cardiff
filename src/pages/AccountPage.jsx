import { Typography } from "@mui/material";
import AccountForm from "../components/AccountForm";
import { fireBaseInstance } from "../utils/axios-config";

function AccountPage() {
    return (
        <>
            <Typography variant="h4" mb={3}>Account</Typography>
            <AccountForm />
        </>
    );
}

export default AccountPage;

export async function action({ request: req }) {
    const formData = await req.formData();
    const payLoad = {};
    for (const [key, val] of formData.entries()) {
        if (key === 'name') {
            const [first_name, ...rest] = val.trim().split(' ');
            payLoad.first_name = first_name;
            payLoad.last_name = rest.join(" ").trim();;
            continue;
        }

        if(key === 'password'){
            payLoad[key] = btoa(val);
            continue; 
        }

        payLoad[key] = val.trim();;
    }



    try {
        await fireBaseInstance.patch(`users/${payLoad.username}.json`, payLoad);

    } catch (err) {
        console.log(err);
    }
    return null;
}