import { Card, Stack, Typography } from "@mui/material";
import PaymentMethodList from "../components/PaymentMethodList";
import { useFetcher, useRouteLoaderData } from "react-router-dom";
import Modal from "../layouts/Modal";
import SmartCardForm from "../components/SmartCardForm";
import { useState } from "react";

function PaymentMethod() {
    const { cards } = useRouteLoaderData("account")
    const [showModal, setShowModal] = useState(false)
    const fetcher = useFetcher()

    const displayModal = () => { setShowModal(true) }
    const hideModal = () => { setShowModal(false) }

    const deleteCard = (cardNumber) => {
        fetcher.submit({cardNumber},{method: 'post', action: "/remove-card"})
    }

    return (
        <>
            <Typography variant="h3" gutterBottom>Payment method</Typography>
            <PaymentMethodList displayModal={displayModal} list={cards} deleteCard={deleteCard}/>
            {showModal && <Modal onClose={hideModal}>
                <SmartCardForm closeForm={hideModal} />
            </Modal>}
        </>
    );
}

export default PaymentMethod;