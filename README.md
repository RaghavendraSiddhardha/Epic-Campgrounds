Great! Here's the updated `README.md` with the deployment link:

```markdown
# Epic Campgrounds

Epic Campgrounds is a web-based application that allows users to explore, review, and book campgrounds. The platform provides a comprehensive campground listing, user reviews, and ratings, making it easy for outdoor enthusiasts to plan their next adventure.

## Features

- Campground Listings: View details and images of various campgrounds.
- User Authentication: Sign up and login to access additional features.
- Review & Rating System: Leave reviews and rate campgrounds based on your experiences.
- Search Functionality: Filter and search campgrounds by location, amenities, or user ratings.
- Responsive Design: Fully functional across devices (mobile, tablet, and desktop).

## Technologies Used

- Frontend: HTML, CSS, JavaScript, Bootstrap
- Backend: Node.js, Express
- Database: MongoDB
- Authentication: Passport.js for user authentication
- Deployment: Deployed on [Render](https://epiccampgrounds.onrender.com/)

## Getting Started

### Prerequisites

Make sure you have the following installed on your local machine:

- Node.js
- MongoDB

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/epic-campgrounds.git
   ```

2. Navigate into the project directory:
   ```bash
   cd epic-campgrounds
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Set up environment variables:
   Create a `.env` file in the root directory and add the following variables:
   ```bash
   DATABASE_URL=<your-mongo-db-url>
   SECRET=<your-session-secret>
   ```

5. Run the application:
   ```bash
   npm start
   ```

6. Visit the application locally at `http://localhost:3000`.

### Accessing the Live Application

You can view the live version of the project at:  
[https://epiccampgrounds.onrender.com/](https://epiccampgrounds.onrender.com/)

## API Documentation

- GET `/campgrounds`: Get a list of all campgrounds
- POST `/campgrounds`: Create a new campground (requires authentication)
- GET `/campgrounds/:id`: Get a single campground by ID
- PUT `/campgrounds/:id`: Update a campground (requires authentication)
- DELETE `/campgrounds/:id`: Delete a campground (requires authentication)

## Contributing

If you'd like to contribute to the project, follow these steps:

1. Fork the repository
2. Create a new branch (`git checkout -b feature-branch`)
3. Commit your changes (`git commit -m 'Add new feature'`)
4. Push to the branch (`git push origin feature-branch`)
5. Open a pull request

## Acknowledgements

- **YelpCamp** by Colt Steele for inspiration.
- Various libraries and open-source projects used in this project.
```

This updated version includes your deployed link on Render.
