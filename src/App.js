import { AppBar, Toolbar, Typography, Button, Grid } from "@mui/material";
import { useState, useMemo } from "react";
import WeatherCard from './components/weatherCard';

const LOCAL_STORAGE_KEY = "locations";
const saveToLocalStorage = (locations) => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(locations));
}

const readFromLocalStorage = () => {
  const storedLocations = localStorage.getItem(LOCAL_STORAGE_KEY);
  return storedLocations ? JSON.parse(storedLocations) : [];
}

const App = () => {

  const [location, setLocation] = useState(readFromLocalStorage());

  const handleClick = () => setLocation([...location, ""]);

  const updateLocations = locations => {
    setLocation(locations);
    saveToLocalStorage(locations);
  };

  const removeAtIndex = index => () =>
        updateLocations(location.filter((_, locationIndex) => locationIndex !== index));

    const updateAtIndex = index => updatedLocation =>
        updateLocations(
           location.map((location, locationIndex) => (locationIndex === index ? updatedLocation : location)),
        );

    const canAddOrRemove = useMemo(() => location.every(location => location !== ""), [location]);


  return (
    <>
      <AppBar position="static">
            <Toolbar>
                <Typography variant="h4" sx={{ flexGrow: 1 }}>
                    Weather 
                </Typography>
            </Toolbar>
        </AppBar> 
        <Grid container spacing={3} style={{flex: "1", overflow: "auto", padding: "20px"}}>
                {location.map((loc, index) => (
                    <Grid key={loc} xs={12} sm={6} md={4} lg={3} item>
                        <WeatherCard
                            location={loc}
                            canDelete={!location || canAddOrRemove}
                            onDelete={removeAtIndex(index)}
                            onUpdate={updateAtIndex(index)}
                        />
                    </Grid>
                ))}
            </Grid>
        <Button 
          onClick={handleClick} 
          style={{position: "absolute", right: "0", bottom: "0", margin: "30px"}} 
          color="primary" 
          variant="contained" 
        >
          ADD NEW
        </Button>
    </>
  );
}

export default App;
