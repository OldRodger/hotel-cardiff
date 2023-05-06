import { StarHalf, StarOutline, StarRate } from "@mui/icons-material";

function Rating(props) {
    let totalRating = [];
    const ratingWhole = Math.trunc(props.rating / 1);
    const ratingRemainder = props.rating - ratingWhole;
    for (let i = 0; i < ratingWhole; i++) {
        totalRating.push(<StarRate fontSize={props?.fontSize ?? 'medium'} key={i} color="warning" />)
    }

    if (ratingRemainder <= .5 && ratingRemainder > 0) {
        totalRating.push(<StarHalf fontSize={props?.fontSize ?? 'medium'} key={.5} color="warning" />)
    }

    const starDifference = 5 - totalRating.length;
    for (let i = 1; i <= starDifference; i++) {
        totalRating.push(<StarOutline fontSize={props?.fontSize ?? 'medium'} key={0 - i} color="disabled" />)
    }

    return totalRating;
}

export default Rating;