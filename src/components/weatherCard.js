import React from "react";
import PropTypes from "prop-types";
import LocationWeather from "./locationWeather";
import { Button, TextField, Card, CardActions, CardContent } from "@mui/material";


const WeatherCard = ({ location, canDelete, onDelete, onUpdate }) => {

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            onUpdate(e.target.value)
        }
    };

    return (
        <Card cstyle={{display: "flex", flexDirection: "column"}} variant="outlined" >
            <CardContent style={{flex: "1", backgroundColor: "#ADD8E6"}}>
                {!location && <TextField label="Enter location" onKeyDown={handleKeyDown} />}
                {location && <LocationWeather location={location} />}
            </CardContent>
            <CardActions>
                <Button disabled={!canDelete} onClick={onDelete} size="small" color="secondary">
                    Remove
                </Button>
            </CardActions>
        </Card>
    );
}

WeatherCard.propTypes = {
    location: PropTypes.string.isRequired,
    canDelete: PropTypes.bool.isRequired,
    onDelete: PropTypes.func.isRequired,
    onUpdate: PropTypes.func.isRequired,
};

export default WeatherCard;
