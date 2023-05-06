import { Button, Divider, Stack, Typography } from "@mui/material";
import Review from "./Review";
import { useState } from "react";
import ReviewForm from "./ReviewForm";
import { useParams, useRouteLoaderData } from "react-router-dom";
import { REVIEW_REMARKS } from "../utils/helper";

function Reviews() {
    const { hotelReviews } = useRouteLoaderData('hotel-detail');
    const { authToken } = useRouteLoaderData('root');
    const [showForm, setShowForm] = useState(false);


    const totalReviewValue = hotelReviews ? Object.values(hotelReviews) : [];
    let totalReviewAccumulation = 0;
    let totalReviewRate = 0;



    let reviews = totalReviewValue.map(review => {
        totalReviewAccumulation += review.rating;
        return <Review
            key={review.user}
            {...review}
        />
    });

    if (totalReviewValue.length) {
        totalReviewRate = (totalReviewAccumulation * 5) / (totalReviewValue.length * 5)
    }


    const { hotelID } = useParams();
    if (!reviews.length)
        reviews = <>
            <Typography variant="h6">No review yet!</Typography>
            <Typography variant="body1">Be the first to review {hotelID}</Typography>
        </>

    const reviewRemark = REVIEW_REMARKS[Math.floor(totalReviewRate)];


    const toggleForm = () => {
        setShowForm(!showForm);
    }



    return (
        <>
            <Stack direction="row" alignItems={"center"} justifyContent={"space-between"} >
                <Typography variant="h5" fontWeight={700}>Reviews</Typography>
                {authToken && <Button data-type="stagnant" variant='contained' size="large" onClick={toggleForm}>
                    {showForm ? "Close review" : "Give your review"}
                </Button>}
            </Stack>

            {showForm && <ReviewForm hideForm={() => setShowForm(false)} />}


            <Stack direction={"row"} gap={2}>
                <Typography variant="h3" fontWeight={700}>{totalReviewRate.toFixed(1)}</Typography>
                <Stack>
                    <Typography variant="h6" fontWeight={700} color={reviewRemark.color}>{reviewRemark.text}</Typography>
                    <Typography variant="body2">{totalReviewValue.length} verified review(s)</Typography>
                </Stack>
            </Stack>

            <Divider />

            <ul style={{ listStyle: 'none' }}>
                {reviews}
            </ul>

        </>
    );
}

export default Reviews;

