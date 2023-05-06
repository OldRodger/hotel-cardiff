import { useFetcher, useRouteLoaderData } from "react-router-dom";
import Card from "../ui/Card";
import classes from "./PaymentMethodList.module.css"
import { Box, IconButton, Typography } from "@mui/material";
import { AddCircleOutline, DeleteForever } from "@mui/icons-material";

function PaymentMethodList(props) {
    let cards = <Typography variant="h5">No cards added</Typography>


    if (props.list.length) {
        cards = props.list.map((card, idx) => {
            const cardNumberArray = card.card_number.split("-")
            const cardLastNumber = cardNumberArray[cardNumberArray.length - 1]
            return <PaymentCard
                key={idx}
                lastNumber={cardLastNumber}
                exp={card.expiry_date}
                clicked={() => props.deleteCard(card.card_number)}/>
        })
    }

    return (
        <Card className={classes.container}>
            {cards}
            <figure className={classes["add-card-btn"]}>
                <div>
                    <IconButton onClick={props.displayModal}>
                        <AddCircleOutline color="primary" sx={{ width: 40, height: 40 }} />
                    </IconButton>
                    <Typography variant="subtitle2">Add a new card</Typography>
                </div>
            </figure>
        </Card>
    );
}

export default PaymentMethodList;

function PaymentCard(props) {
    return (
        <Card className={classes.card}>
            <Box className={classes["card__text-box"]}>
                <Box>
                    <p className={classes["card__asteric"]}>**** **** ****</p>
                    <p className={classes["card__number"]}>{props.lastNumber}</p>
                </Box>
                <Box>
                    <Typography variant="body2">Valid Thur</Typography>
                    <Typography variant="h6">{props.exp}</Typography>
                </Box>
            </Box>
            <IconButton color="dark" onClick={props.clicked} className={classes["delete-btn"]}>
                <DeleteForever sx={{ width: 30, height: 30 }} />
            </IconButton>
        </Card>
    )
}