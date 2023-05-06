import { Button, FormControl, Stack, TextField } from "@mui/material";
import { useActionData, useFetcher, useParams, useRouteLoaderData } from "react-router-dom";
import { fireBaseInstance as axios } from "../utils/axios-config";
import { getUserData } from "../utils/auth";

function ReviewForm(props) {
    const { user } = useRouteLoaderData('root');
    const fetcher = useFetcher();
    const { data, state } = fetcher;


    if (data?.message === 'Comment successful') {
        setTimeout(() => props.hideForm(), 500)
    }


    return (
        <fetcher.Form method="post">
            <Stack gap={2} marginBottom={4}>
                <TextField required label="Title" name="title" />
                <TextField required label="Rating" name="rating" type="number" inputProps={{
                    step: .5,
                    min: 1,
                    max: 5
                }} />
                <TextField required multiline label="Review" name="review" minRows={3} />

                <Button type="submit" sx={{ height: 60 }} data-type="stagnant" variant="contained" >
                    {state === 'submitting' ? 'Submiting...' : 'Submit'}
                </Button>
            </Stack>
        </fetcher.Form>
    );
}

export default ReviewForm;

export async function action({ request, params }) {
    const formData = await request.formData();
    const {username, first_name, last_name, profile_photo} = await getUserData();

    const data = {
        user: `${first_name} ${last_name}`,
        img: profile_photo,
        title: formData.get('title'),
        rating: Number(formData.get('rating')),
        review: formData.get('review'),
        id: btoa(username)
    };



    try {
        const req = await axios.put(`reviews/${params.hotelID}/${username}.json`, data);
    } catch (error) {
        console.log(error);
    }

    return { message: "Comment successful" };
}