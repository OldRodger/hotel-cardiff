import { StarHalf, StarOutline, StarRate } from '@mui/icons-material';
import { Button, Typography } from '@mui/material';
import { Box, Stack } from '@mui/system';
import { useState } from 'react';
import Card from '../../ui/Card';
import Rating from '../Rating';

function ReviewCard(props) {
    const [isWrapped, setIsWrapped] = useState(false);
    const toggleWrap = () => {
        setIsWrapped(prev => !prev)
    }


  
    return (
        <Card>
            <Stack gap={2} p={3}>
                <Typography variant='h5' color="ActiveCaption" fontWeight={600}>
                    <q>{props.title}</q>
                </Typography>
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    gap: 1
                }}>
                    <Typography noWrap={!isWrapped} sx={{
                        width: '100%'
                    }} variant="body1" color="GrayText" fontWeight={600}>
                        {props.text}
                    </Typography>
                    <Button
                        onClick={toggleWrap}
                        data-type="stagnant"
                        variant={isWrapped ? 'contained' : 'text'}
                        color='dark'
                        sx={{ alignSelf: 'flex-end' }}
                    >
                        See {isWrapped ? "Less" : "More"}
                    </Button>
                </Box>
                <Typography>
                    <Rating rating={props.rating}/>
                </Typography>
                <Typography fontWeight={700} color="ActiveCaption">
                    {props.name}
                </Typography>

            </Stack>
        </Card>
    );
}

export default ReviewCard;