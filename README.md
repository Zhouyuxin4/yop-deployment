# YOPWebProject (YOP)

Your Own Planet is an interactive travel journal platform that allows users to document and share their travel experiences through map interactions. Users can create personal accounts, record their journeys with specific locations, and add detailed entries including photos and descriptions for each place they've visited.

## Team Members

Xiyu Fan: Database management and backend development

Yuxin Zhou: Frontend development, API integration

Wenwen Han: Frontend development

## Features

- User Authentication
  - Create personal account
  - Secure login/logout functionality
  - Profile management

- Interactive Journey Recording
  - Create new journeys
  - Select locations directly on the map
  - Add detailed entries for each location:
    - Photos
    - Text descriptions
    - Timestamps
    - Geographic coordinates

- Map Integration
  - Interactive Google Maps interface
  - Visual representation of journey locations
  - Click-to-add location functionality

- Journey Management
  - View all personal journeys
  - Add/Edit journey details
  - Delete journeys
  - Search through journey records

## User Interaction Flow
1. User creates an account/logs in
2. Views personal dashboard with all recorded journeys
3. Can create a new journey:
   - Select location on map
   - Add photos and descriptions
   - Save journey details
4. Can view, edit, or delete existing journeys
5. Search through personal travel records
   
## API Endpoints
### User Routes

GET /users - Get All Users

GET /users/:userName - Get User by Username

POST /users - Create New User

DELETE /users/:userName - Delete User

PUT /users/:username - Update user profile

GET /users/:userName/search - Search User's Journeys


### Journey Routes

GET /journeys/:username - Get all journeys

GET /journeys/:userName/:journeyId- Get all journeys of one person

POST /journeys/:username - Create new journey

DELETE /journeys/:username/:journeyId - Delete journey

PUT /journeys/:journeyId - update journey

### Journey Details Routes

GET /details/:username/:journeyId/allDetails - Get all detail information of one journey  

GET /details/:username/:journeyId/:detailId -  Get one detail information of one journey 

POST /details/:userName/:journeyId/createDetails - Add journey detail

PUT /details/:userName/:journeyId/:detailId/update - Update detail

DELETE /details/:userName/:journeyId/:detailId - Delete detail


## Tech Stack

### Frontend
* React.js (https://reactjs.org/)
  - Frontend JavaScript library
  - Component-based UI development
* Google Maps API (https://developers.google.com/maps)
  - Interactive map integration
  - Geographical data visualization
* Axios for HTTP requests (https://axios-http.com/)
  - Handles API requests to backend
  - Data fetching and state updates

### Backend
* Node.js (https://nodejs.org/)
  - Cross-platform runtime environment
  - Built on Chrome's V8 JavaScript engine
* Express.js (https://www.expresjs.org/)
  - Web application framework for Node.js
  - Handles routing and middleware integration
* MongoDB (https://www.mongodb.com/)
  - Stores data in flexible, JSON-like documents
  - Provides high scalability and flexibility
* JWT for authentication (https://jwt.io/)
  - Secure user authentication
  - Token-based session management
 
## Acknowledgments

Google Maps API for location services

MongoDB Atlas for database hosting

## 1. Setup

1. Clone the repository
```bash
git clone https://github.com/Zhouyuxin4/YOP-Milestone2.git
```

2. Install backend dependencies
```bash
cd server
npm install
```

3. Start the backend server
```bash
npm start
```

4. Install frontend dependencies
```bash
cd client
npm install
```

5. Start the frontend application
```bash
npm start
```


## 2. Required Dependencies and Installation Commands
### Please check package.json to get all dependencies:
    "@auth0/auth0-react": "^2.2.4"
    "@react-google-maps/api": "^2.20.3"
    "@testing-library/jest-dom": "^5.17.0"
    "@testing-library/react": "^13.4.0"
    "@testing-library/user-event": "^13.5.0"
    "axios": "^1.7.7"
    "react": "^18.3.1"
    "react-dom": "^18.3.1"
    "react-router-dom": "^6.28.0"
    "react-scripts": "5.0.1"
    "web-vitals": "^2.1.4"
    "cors": "^2.8.5"
    "dotenv": "^16.4.5"
    "express": "^4.21.1"
    "jsonwebtoken": "^8.5.1"
    "mongoose": "^8.8.1"
  You can use npm install to install all the required dependencies in package.json


## 3. Database Setup Instructions
The application uses a MongoDB database with three main collections: Users, Journeys, and JourneyDetails. Below are the schemas and sample data for each collection.
### (1) User Schema
The `UserSchema` defines each user's structure, including their username, password, profile picture, and associated journeys.

```javascript
const UserSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    profilePicture: {
        type: String,
        default: ''
    },
    journeys: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Journeys'
    }]
}, { collection: 'Users' });
```
#### Sample User Data
```json
{
    "_id":{"$oid":"672ea2402753b7432afe6308"},
    "userName":"Alice",
    "password":"password123",
    "profilePicture":"https://example.com/profiles/alice.jpg",
    "journeys":[{"$oid":"672ea18af3572752638a95f2"},{"$oid":"672ea18af3572752638a95f3"}]
}
```


### (2) Journey Schema
The JourneySchema defines the title of a journey, the user who created it, and references to associated details.
```javascript
const JourneySchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    details: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'JourneyDetails'
    }],
    userName: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users'
    }
}, { collection: 'Journeys' });
```
#### Sample Journey Data
```json
{
    "_id":{"$oid":"672ea18af3572752638a95f2"},
    "title":"Wonderful Summer Vacation",
    "details":[{"$oid":"672e9e8c95993cdc1506605c"},{"$oid":"672e9e8c95993cdc1506605d"}],
    "userName":{"$oid":"672ea2402753b7432afe6308"}
}
```


### (3) Journey Details Schema
The JourneyDetailsSchema defines specific journey entries with time, location, journal text, and photos.
```javascript
const JourneyDetailsSchema = new mongoose.Schema({
    time: {
        type: Date,
        required: true
    },
    location: {
        type: {
            type: String,
            default: 'Point'
        },
        coordinates: {
            type: [Number],
            required: true
        }
    },
    journalText: {
        type: String,
        required: true
    },
    journalPhoto: {
        type: String,
        required: true
    },
    journeyId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Journeys',
        required: true
    }
}, { collection: 'JourneyDetails' });
```

#### Sample Journey Details Data
```json
{
    "_id":{"$oid":"672e9e8c95993cdc1506605d"},
    "time":{"$date":{"$numberLong":"1710756000000"}},
    "location":{
        "type":"Point",
        "coordinates":[{"$numberDouble":"121.4737"},{"$numberDouble":"31.2304"}]
    },
    "journalText":"an update record in San Jose",
    "journalPhoto":"http://example.com/updated-photo.jpg",
    "journeyId":{"$oid":"672ea18af3572752638a95f2"}
}
```


## 4. Environmental Variables
### (1) Database Configuration
MONGODB_URI=mongodb+srv://fancy:xx437724154@cluster0.grz3m.mongodb.net/YOP?retryWrites=true&w=majority&appName=Cluster0
PORT=3000
### (2) JWT Configuration
JWT_SECRET=!yU7B2s9#KlM6@8tW5#Z$1pQ4&0cEr
JWT_EXPIRATION=1h


## Completed CRUD Operations 
- Users: Create, Read, Update, Delete
- Journeys: Create, Read, Update, Delete
- Journey Details: In progress
