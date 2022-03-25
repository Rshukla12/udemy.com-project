import React from 'react'
import {Button, Container,Typography,Grid,Box,Divider,Input,Paper} from '@mui/material'
import InfoSharp from '@mui/icons-material/InfoSharp'
import Search from '@mui/icons-material/Search'
import {useHistory} from 'react-router-dom'
const InstructorDashboard = () => {
    const history = useHistory();
    const handleClick = () => {
        history.push('/instructor/course/1');
    }
    return(
       <Container maxWidth="xl">
           <Grid container spacing={1} sx={{mt:2,mb:2}}>
            <Grid item xs={2}>
           <Typography variant="h4" sx={{fontWeight: 'bold'}} gutterBottom align="left">Courses</Typography>
           </Grid>
           <Grid item xs={8}></Grid>
           <Grid item xs={2}>
           <Button onClick={handleClick} sx={{fontWeight: 'bold',color:'white',borderRadius:0,height:"50px",textTransform:"none",width:"130px",  backgroundColor: "rgb(164,53,240)",fontSize:"16px",
                "&:hover": {
                  background: "rgb(164,80,240)",
                },}} variant="contained">New course</Button>
           </Grid>
           </Grid>
           <Divider/>
           <Box sx={{border:'1px solid rgb(220,220,220)',m:10,p:2}}>
               <Grid container spacing={2}>
               <Grid item xs = {1}>
               <Typography><InfoSharp /></Typography>
               </Grid>
               <Grid item xs = {10}>
               <Typography variant="body1" sx={{fontWeight: 'bold'}} >  We’re updating the free course experience for students and instructors.</Typography>
               <ul>
                   <li>
                   New free courses <strong>(published after March 17, 2020)</strong> must have less than 2 hours of video content.
                   </li>
                   <li>
                   Existing free courses <strong>(published before March 17, 2020)</strong> that contain more than 2 hours of video content will remain published.
                   </li>
                   <li>
                   All free courses will only consist of video content and resources. Certificate of completion, Q&A, and direct messaging will <strong>only</strong> be available for paid enrollments.
                   </li>
               </ul>
               <Typography variant="body2">To learn more about the new free course experience and policy read our <span style={{color:'blue',textDecoration: 'underline'}}>FAQ on the teaching center.</span></Typography>
               </Grid>
               </Grid>
               <Button sx={{fontWeight: 'bold',color:'white',borderRadius:0,height:"40px",textTransform:"none",width:"110px",  backgroundColor: "black",fontSize:"15px",ml:4.5,mt:1,
                "&:hover": {
                  background: "black",
                },}} variant="contained">Dismiss</Button>
           </Box>

           <Grid container spacing={1} sx={{mt:2,mb:2}}>
            <Grid item xs={6}>
            <Input sx={{border:'1px solid black',p:1.2,width:"230px"}} placeholder="Search your courses" />
            <Button sx={{fontWeight: 'bold',color:'white',borderRadius:0,height:"40px",textTransform:"none",width:"40px",  backgroundColor: "black",fontSize:"16px",height:"54px",
                "&:hover": {
                  background: "black",
                },}} variant="contained"><Search/></Button>

           </Grid>
           <Grid item xs={4}></Grid>
           <Grid item xs={2}>
           <select name="Newest" style={{height:"50px",width:"100px",fontWeight: 700,borderRadius:0,paddingLeft:2,fontSize:15}}>
                <option value="newest">Newest</option>
                <option value="oldest">Oldest</option>
                <option value="a-z">A-Z</option>
                <option value="z-a">Z-A</option>
                <option value="published_list">Published first</option>
                <option value="unpublished_list">Unpublished first</option>
          </select>
           </Grid>
           </Grid>
           <Typography variant="body1" align="center">Based on your experience, we think these resources will be helpful.</Typography>
           <Paper spacing={2} elevation={6} sx ={{m:4}}>
           <Grid container sx={{m:2,p:2}}>
           <Grid sm ={2}></Grid>
               <Grid item sm={4} xs={12}  align="center">
                   <img src="https://s.udemycdn.com/instructor/dashboard/engaging-course-2x.jpg" height="200" width="200" />
               </Grid>
               <Grid item sm={4} xs={12}>
                   <Typography gutterBottom variant="h5" sx ={{mb:3}}>Create an Engaging Course</Typography>
                   <Typography variant="body1" sx ={{mb:3}}>Whether you've been teaching for years or are teaching for the first time, you can make an engaging course. We've compiled resources and best practices to help you get to the next level, no matter where you're starting.</Typography>
                   <Button sx={{color:'blue',textDecoration:'underline',textTransform:'none'}}>Get Started</Button>
               </Grid>
               <Grid sm ={2}></Grid>
           </Grid>
           </Paper>
               </Container>
    )
}

export default InstructorDashboard;