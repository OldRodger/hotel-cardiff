import { Box, Typography } from '@mui/material';
import classes from './Amenities.module.css';
import { AcUnit, Accessible, Check, CoffeeMaker, CreditCard, FavoriteBorder, FitnessCenter, FreeBreakfast, HeatPump, Iron, LocalParking, Pool, Restaurant, Restore, RoomService, Spa, Wifi, WineBar } from '@mui/icons-material';
function Amenities(props) {
    const data = props.amenities.map(amenity => {
        switch (amenity) {
            case "outdoor-pool":
                return (
                    <Box className={classes.amenity} key={amenity}>
                        <Pool />
                        <Typography variant='subtitle1'>Outdoor pool</Typography>
                    </Box>
                );

            case "indoor-pool":
                return (
                    <Box className={classes.amenity} key={amenity}>
                        <Pool />
                        <Typography variant='subtitle1'>Indoor pool</Typography>
                    </Box>
                );

            case "spa":
                return (
                    <Box className={classes.amenity} key={amenity}>
                        <Spa />
                        <Typography variant='subtitle1'>Spa and wellness centre</Typography>
                    </Box>
                );
            case "restaurant":
                return (
                    <Box className={classes.amenity} key={amenity}>
                        <Restaurant />
                        <Typography variant='subtitle1'>Restaurant</Typography>
                    </Box>
                );

            case "room-service":
                return (
                    <Box className={classes.amenity} key={amenity}>
                        <RoomService />
                        <Typography variant='subtitle1'>Room service</Typography>
                    </Box>
                );

            case "fitness":
                return (
                    <Box className={classes.amenity} key={amenity}>
                        <FitnessCenter />
                        <Typography variant='subtitle1'>Fitness centre</Typography>
                    </Box>
                );

            case "wifi":
                return (
                    <Box className={classes.amenity} key={amenity}>
                        <Wifi />
                        <Typography variant='subtitle1'>Free Wi-Fi</Typography>
                    </Box>
                );

            case "parking":
                return (
                    <Box className={classes.amenity} key={amenity}>
                        <LocalParking />
                        <Typography variant='subtitle1'>Free parking</Typography>
                    </Box>
                );

            case "breakfast":
                return (
                    <Box className={classes.amenity} key={amenity}>
                        <FreeBreakfast />
                        <Typography variant='subtitle1'>Fabulous breakfast</Typography>
                    </Box>
                );
                
            case "key-card-access":
                return (
                    <Box className={classes.amenity} key={amenity}>
                        <Check />
                        <Typography variant='subtitle1'>Key card access</Typography>
                    </Box>
                );
            case "house-keeping":
                return (
                    <Box className={classes.amenity} key={amenity}>
                        <Iron />
                        <Typography variant='subtitle1'>House keeping</Typography>
                    </Box>
                );
            case "air-condition":
                return (
                    <Box className={classes.amenity} key={amenity}>
                        <AcUnit />
                        <Typography variant='subtitle1'>Air Conditioning</Typography>
                    </Box>
                );
                
            case "heating":
                return (
                    <Box className={classes.amenity} key={amenity}>
                        <HeatPump />
                        <Typography variant='subtitle1'>Heating</Typography>
                    </Box>
                );
            case "disabled":
                return (
                    <Box className={classes.amenity} key={amenity}>
                        <Accessible />
                        <Typography variant='subtitle1'>Facilities for disabled guests</Typography>
                    </Box>
                );
            case "24-hr-font-desk":
                return (
                    <Box className={classes.amenity} key={amenity}>
                        <Restore />
                        <Typography variant='subtitle1'>24-hour front desk</Typography>
                    </Box>
                );

            case "bar":
            case "lounge":
                return (
                    <Box className={classes.amenity} key={amenity}>
                        <WineBar />
                        <Typography variant='subtitle1'>Bar/Lounge</Typography>
                    </Box>
                );

            case "tea-machine":
            case "coffee-machine":
                return (
                    <Box className={classes.amenity} key={amenity}>
                        <CoffeeMaker />
                        <Typography variant='subtitle1'>Tea/coffee machine</Typography>
                    </Box>
                );

            default:
                return (
                    <Box className={classes.amenity} key={amenity}>
                        <FavoriteBorder />
                        <Typography variant='subtitle1'>{amenity}</Typography>
                    </Box>
                );

        }
    })
    return (
        <div className={classes.amenities}>
            {data}
        </div>
    );
}

export default Amenities;