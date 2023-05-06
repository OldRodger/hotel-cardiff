import { useFetcher } from "react-router-dom";
import classes from './SmartCardForm.module.css';
import { Button, Stack, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { orange } from "@mui/material/colors";


function SmartCardForm(props) {
    const fetcher = useFetcher();
    const [cardNumber, setCardNumber] = useState('')
    const [expDate, setExpDate] = useState('')
    const [cvv, setCvv] = useState('')
    const [ownerName, setOwnerName] = useState('')
    const state = fetcher.state;

    if (fetcher.data?.message === 'success' && fetcher.state === 'idle') {
        setTimeout(props.closeForm, 100);
    }



    const handleDelete = (e) => {
        const key = e.keyCode || e.charCode;
        if (key === 8) {
            switch (e.target.name) {
                case 'card_number':
                    const index = cardNumber.lastIndexOf("-");
                    if (index === -1) {
                        setCardNumber(cardNumber.slice(0, 0))
                    } else {
                        setCardNumber(cardNumber.slice(0, index + 1))
                    }
                    break;
            }
        }
    }

    const handleCardNumberChange = (e) => {
        const value = e.target.value.trim();

        const numbers = [...value].filter(n => !isNaN(n));
        let card_string = '';
        for (const [idx, num] of numbers.entries()) {
            const index = idx + 1;

            if (card_string.length > 1 && card_string.length < 19 && index % 4 === 1) {
                card_string += '-'
            }
            card_string += num;

        }

        if (numbers.length > 16) return;
        setCardNumber(card_string);
    }

    const handleExpDateChange = (e) => {
        const value = e.target.value.trim();

        const numbers = [...value].filter(n => !isNaN(n));
        let card_string = '';
        for (const [idx, num] of numbers.entries()) {
            const index = idx + 1;

            if (card_string.length > 1 && card_string.length < 5 && index % 2 === 1) {
                card_string += '/'
            }
            card_string += num;

        }

        if (numbers.length > 4) return;
        setExpDate(card_string);

    }

    const handleCvvChange = (e) => {
        const value = e.target.value;
        if (isNaN(value) || value.length > 3) return;
        setCvv(value);
    }

    const handleNameOnCardChange = (e) => {
        const value = e.target.value;
        setOwnerName(value);
    }



    return (
        <>
            <Typography variant="h4" fontWeight={700} marginBottom={4}>Add a new card</Typography>
            <fetcher.Form method="post" action='/add-card'>
                <Stack gap={3}>
                {fetcher.data?.error && <Typography color={orange[500]}>{fetcher.data.error}</Typography>}
                    <TextField label="Card Number" name="card_number" value={cardNumber} onChange={handleCardNumberChange} onKeyDown={handleDelete} required />
                    <Stack direction={"row"} gap={3}>
                        <TextField sx={{ flex: 1 }} label="Exp. Date" name="expiry_date" value={expDate} onChange={handleExpDateChange} required />
                        <TextField sx={{ flex: 1 }} label="CVC" name="cvc" value={cvv} onChange={handleCvvChange} required />
                    </Stack>
                    <TextField label="Name on Card" name="name_on_card" value={ownerName} onChange={handleNameOnCardChange} required />

                    <Button type="submit" variant="contained" data-type="stagnant" sx={{ height: 50, width: 150, alignSelf: 'end' }}>
                        {state === 'submitting' ? 'adding card...' : 'add card'}
                    </Button>
                </Stack>
            </fetcher.Form >
        </>
    );
}

export default SmartCardForm;