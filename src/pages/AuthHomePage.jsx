import { Button, Stack, Typography } from '@mui/material';
import heroImage from '../assets/images/hero-1.jpg'
import Banner from '../components/Banner';
import PageContent from '../components/PageContent';
import { GridLayout } from '../layouts/layout';
import LittleCard from '../components/cards/LittleCard';
import Footer from '../components/Footer';
import BackgroundCard from '../components/cards/BackgroundCard';
import { Link } from 'react-router-dom';

const perfectTrips = [
    {
        image: 'https://media.istockphoto.com/id/164122964/photo/cardiff-bay-wales.jpg?s=612x612&w=0&k=20&c=cdO2CKfkz4oKMuuLzQ_sHOpXvJRzrq3H1fE0pCZGbgY=',
        city: 'Cardiff',
        country: 'Wales'
    },
    {
        image: "https://upload.wikimedia.org/wikipedia/commons/8/88/The_Old_Bridge%2C_Pontypridd.jpg",
        city: 'Pontypridd',
        country: 'Wales'
    },
    {
        image: 'https://planetofhotels.com/guide/sites/default/files/styles/node__blog_post__bp_banner/public/live_banner/London-1.jpg',
        city: 'London',
        country: 'England'
    },
    {
        image: "https://upload.wikimedia.org/wikipedia/commons/8/88/The_Old_Bridge%2C_Pontypridd.jpg",
        city: 'Trefforest',
        country: 'Wales'
    },
]

function AuthHomePage() {
    const today = new Date();
    const tomorrow = new Date();
    tomorrow.setDate(today.getDate() + 1);

    function yearFormat(year) {
        return year.toLocaleDateString('en-CA');
    }
    return (
        <>
            <Banner bgImage={heroImage}>
                <Stack gap={1} width='50%'>
                    <Typography variant="h2">Make your travel wishlist, we'll do the rest</Typography>
                    <Typography variant="h6" fontWeight={400}>Special offers to suit your plan</Typography>
                </Stack>
            </Banner>

            <Stack gap={10} sx={{ paddingY: 10, maxWidth: '80%', mx: 'auto' }}>
                <PageContent
                    title="Your recent searches">
                    <GridLayout columns={4}>
                        {perfectTrips.map(props => <LittleCard noWrap key={props.city} {...props}>
                            <Typography variant="subtitle2">Hotels . Resorts</Typography>
                        </LittleCard>)}
                    </GridLayout>
                </PageContent>

                <PageContent
                    title="Fall into travel"
                    subtitle="Are you looking for a home or somewhere to roam? we've got you covered.">
                    <GridLayout columns={3} rows={27}>
                        <BackgroundCard bgImage={perfectTrips[0].image}>
                            <Typography variant='h4'>Cardiff</Typography>
                            <Stack direction="row" justifyContent="space-between" alignItems="center">
                                <Typography variant='body2'>An amazing journey</Typography>
                                <Typography variant='h5'>&pound;600</Typography>
                            </Stack>
                            <Link to={`/hotels?destination=cardiff&checkIn=${yearFormat(today)}&checkOut=${yearFormat(tomorrow)}&roomType=single&`}>
                                <Button data-type="stagnant" variant='contained' sx={{ mt: 2 }}>book this hotel</Button>
                            </Link>
                        </BackgroundCard>
                        <BackgroundCard bgImage={perfectTrips[2].image}>
                            <Typography variant='h4'>London</Typography>
                            <Stack direction="row" justifyContent="space-between" alignItems="center">
                                <Typography variant='body2'>London eye adventure</Typography>
                                <Typography variant='h5'>&pound; 750</Typography>
                            </Stack>
                            <Link to={`/hotels?destination=london&checkIn=${yearFormat(today)}&checkOut=${yearFormat(tomorrow)}&roomType=single&`}>
                                <Button data-type="stagnant" variant='contained' sx={{ mt: 2 }}>book this hotel</Button>
                            </Link>
                        </BackgroundCard>
                        <BackgroundCard bgImage={perfectTrips[1].image}>
                            <Typography variant='h4'>Pontypridd</Typography>
                            <Stack direction="row" justifyContent="space-between" alignItems="center">
                                <Typography variant='body2'>An amazing journey</Typography>
                                <Typography variant='h5'>&pound; 600</Typography>
                            </Stack>
                            <Link to={`/hotels?destination=pontypridd&checkIn=${yearFormat(today)}&checkOut=${yearFormat(tomorrow)}&roomType=single&`}>
                                <Button data-type="stagnant" variant='contained' sx={{ mt: 2 }}>book this hotel</Button>
                            </Link>
                        </BackgroundCard>
                    </GridLayout>
                </PageContent>
            </Stack>
        </>
    );
}

export default AuthHomePage;