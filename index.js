const express= require('express');
const axios = require('axios');

const cors = require('cors');

const app=express();

const router = express.Router();

const apiPath = ""

const PORT = process.env.PORT || 3002;

app.use(cors({
    origin: 'http://localhost:3000'
}));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// const accessToken = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJhYmNlZWFmNy0yYzZhLTQ0YTgtOWJhYS03ZDQ4MmYwMWI5M2MiLCJjbGllbnRJZCI6ImFpaWF0ZXN0LTdlY2IzZGMwLTMxMWYtNDY0NS05Y2FhLWNlYmVmMGZiMzQ4MCIsInJvbGUiOiJDbGllbnRVc2VyIiwic2Vzc2lvbklkIjoiMjkxZTU2ODMtZTA0Yy00YjIzLTlhOWUtM2I1NWYxZWM3ZTI2Iiwic2NvcGVzIjoiYWNjb3VudHMgb2ZmbGluZV9hY2Nlc3MgcGF5bWVudHM6aW5ib3VuZCBwYXltZW50czpvdXRib3VuZCIsIm5iZiI6MTY5Mzk3MjkzNCwiZXhwIjoxNjkzOTc2NTM0LCJpYXQiOjE2OTM5NzI5MzR9.UZvyYyLY8_mbPldTyyshnvCCJFCTFloKjhh-7RCRdNw";
const accessToken = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJhYmNlZWFmNy0yYzZhLTQ0YTgtOWJhYS03ZDQ4MmYwMWI5M2MiLCJjbGllbnRJZCI6ImFpaWF0ZXN0LTdlY2IzZGMwLTMxMWYtNDY0NS05Y2FhLWNlYmVmMGZiMzQ4MCIsInJvbGUiOiJDbGllbnRVc2VyIiwic2Vzc2lvbklkIjoiNWIwYzdiNTUtM2Y1Yi00Y2U0LWFmMzktZDUwOTc3MWI4YjI0Iiwic2NvcGVzIjoiYWNjb3VudHMgb2ZmbGluZV9hY2Nlc3MgcGF5bWVudHM6aW5ib3VuZCBwYXltZW50czpvdXRib3VuZCIsIm5iZiI6MTY5NDA3MjE3MiwiZXhwIjoxNjk0MDc1NzcyLCJpYXQiOjE2OTQwNzIxNzJ9.efwgZC4W5a7YOcfiAwMCerKenmpTEETV9lzJPoYJHUU";

app.post('/login', async (req, res) => {
    
    console.log(req);
    const accountID = req.query.accountID;
    let response;
    try {
     response = await axios.post(`https://api-sandbox.aiia.eu/v1/oauth/token`, req.body, {auth: {
        username: "aiiatest-7ecb3dc0-311f-4645-9caa-cebef0fb3480",
        password: "4cb8241390a610f101e8f5e345add2580977565b176116fa5249a1ddc05277d4"
      }});
    }catch(ex) {
        console.log(ex);
    }
   
    res.send(JSON.parse(JSON.stringify(response.data)));
})

app.post('/refreshtoken', async (req, res) => {
    
    console.log(req);
    let response;
    try {
     response = await axios.post(`https://api-sandbox.aiia.eu/v1/oauth/token`, req.body, {auth: {
        username: "aiiatest-7ecb3dc0-311f-4645-9caa-cebef0fb3480",
        password: "4cb8241390a610f101e8f5e345add2580977565b176116fa5249a1ddc05277d4"
      }});
      res.send(JSON.parse(JSON.stringify(response.data)));
    }catch(ex) {
        console.log(ex);
    }
   
    
})

app.get('/accounts', async (req, res) => {
    
    let response;
    try {
     response = await axios.get("https://api-sandbox.aiia.eu/v1/accounts", { headers: {Authorization : req.headers.authorization}});
     res.send(JSON.parse(JSON.stringify(response.data)));
    }catch(ex) {
        console.log(ex);
        res.sendStatus(401).send(JSON.parse(JSON.stringify(response.data)));
    }
   
    
})

app.get('/accountdetails', async (req, res) => {
    
    console.log(req);
    const accountID = req.query.accountID;
    let response;
    try {
     response = await axios.get(`https://api-sandbox.aiia.eu/v1/accounts/${accountID}`, { headers: {Authorization : req.headers.authorization}});
     res.send(JSON.parse(JSON.stringify(response.data)));
    }catch(ex) {
        console.log(ex);
        res.sendStatus(401).send(JSON.parse(JSON.stringify(response.data)));
    }
   
    
})

app.get('/transactions', async (req, res) => {
    
    console.log(req);
    const accountID = req.query.accountID;
    let response;
    try {
     response = await axios.get(`https://api-sandbox.aiia.eu/v1/accounts/${accountID}/transactions?pageSize=5`, { headers: {Authorization : req.headers.authorization}});
     res.send(JSON.parse(JSON.stringify(response.data)));
    }catch(ex) {
        console.log(ex);
        res.sendStatus(401).send(JSON.parse(JSON.stringify(response.data)));
    }
   
    
})

app.post('/makepayment', async (req, res) => {
    
    console.log(req);
    const accountID = req.query.accountID;
    let response;
    try {
     response = await axios.post(`https://api-sandbox.aiia.eu/v2/accounts/${accountID}/payments`, req.body, { headers: {Authorization : req.headers.authorization}});
     res.send(JSON.parse(JSON.stringify(response.data)));
    }catch(ex) {
        console.log(ex);
        res.sendStatus(401).send(JSON.parse(JSON.stringify(response.data)));
    }
   
    
})


app.post('/authorizepayment', async (req, res) => {
    
    console.log(req);
    const accountID = req.query.accountID;
    let response;
    try {
     response = await axios.post(`https://api-sandbox.aiia.eu/v2/accounts/${accountID}/payment-authorizations`, req.body, { headers: {Authorization : req.headers.authorization}});
     res.send(JSON.parse(JSON.stringify(response.data)));
    }catch(ex) {
        console.log(ex);
        res.sendStatus(401).send(JSON.parse(JSON.stringify(response.data)));
    }
   
   
})



app.listen(PORT, () => console.log(`server stared on ${PORT}`));