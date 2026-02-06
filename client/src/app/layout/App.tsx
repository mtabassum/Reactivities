import { CssBaseline, Container, Box } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import Navbar from "./Navbar";
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard";


function App() {
const [activities, setActivities] = useState<Activity[]>([]);
const [selectedActivity, setSelectedActivity] = useState<Activity | undefined>(undefined);
const [editMode, setEditMode] = useState(false);

useEffect(() => {
 axios.get<Activity[]>('http://localhost:5069/api/activities')
 .then(response => setActivities(response.data))

 return()=>{}
}, [])

const handleSelectActivity = (id: string) => {
  setSelectedActivity(activities.find(x=> x.id === id));
}

const handleCancelSelectActivity = () => {
  setSelectedActivity(undefined);
}

const handleOpenForm = (id?:string) => {
if (id) handleSelectActivity(id);
else handleCancelSelectActivity();
setEditMode(true);
}

const handleCloseForm = () => {
  setEditMode(false);
}

const handleSubmitForm = (activity: Activity) => {
    if(activity.id){
      setActivities(activities.map(x => x.id === activity.id ? activity : x))
    } else{
      const newActivity = {...activity, id:activities.length.toString()}
      setSelectedActivity(newActivity);
      setActivities([...activities, newActivity])
    }
    setEditMode(false);
}

const handleDeleteActivity =(id:string) => {
     setActivities(activities.filter(x=> x.id !== id))
}

  return (
  <Box sx={{bgcolor: '#eeeeee'}}>
    <CssBaseline />
     <Navbar openForm={handleOpenForm} />
     <Container maxWidth='xl' sx={{mt: 3}}>
      <ActivityDashboard 
      activities={activities}
      selectActivity = {handleSelectActivity}
      cancelSelectActivity = {handleCancelSelectActivity}
      selectedActivity = {selectedActivity}
      editMode = {editMode}
      openForm = {handleOpenForm}
      closeForm = {handleCloseForm}
      submitForm = {handleSubmitForm}
      deleteActivity = {handleDeleteActivity}
      />
     </Container>
  </Box>
    
  )
}

export default App
