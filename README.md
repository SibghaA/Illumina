# Illumina - Empowering Women Through Mentorship

Illumina is a web platform that connects women navigating the intersection of career development and motherhood with experienced mentors who have successfully balanced both worlds. Whether you're planning for motherhood, currently pregnant, on maternity leave, or returning to work after a career break, Illumina provides personalized guidance and support.

## Project Overview

The platform serves as a bridge between mentees seeking guidance and mentors willing to share their experiences, particularly focusing on:
- Career transitions during pregnancy and motherhood
- Work-life balance strategies
- Professional development while managing family responsibilities
- Return-to-work planning after maternity leave
- Career advancement as a working mother

## Author

Sibgha Ahmad

## Useful Links

- Video demo: https://www.youtube.com/watch?v=e6gXassO2K0
- Slides: https://docs.google.com/presentation/d/1qOqPpmcJtzRFH6_-W_OOae8TKyTLPSprUcsNz1nzoas/edit#slide=id.g218a6db239b_0_0
- Design Document: https://docs.google.com/document/d/1OnWGNHL43OjSklnoUQiKFEnq0m7vwo3Iz1cmOtvL5hE/edit?usp=sharing
- Deployed Application: https://illumina-r8woazknx-sibgha-ahmads-projects.vercel.app


## Features

### For Mentees
- Browse and connect with experienced mentors
- Detailed mentor profiles with expertise and availability information
- Secure messaging system for mentor communication
- Personalized matching based on career goals and circumstances
- Resource library for professional development

### For Mentors
- Customizable mentor profiles
- Availability management system
- Connection request handling
- Mentorship tracking tools
- Impact measurement metrics

## Technical Stack

### Frontend
- HTML5
- CSS3
- JavaScript (ES6+)
- Responsive design for mobile and desktop viewing

### API Endpoints
- `/api/mentors` - Mentor listing and profile management
- `/api/auth/signup` - User registration
- `/api/connections` - Mentor-mentee connection management
- `/api/contact` - Contact form submission

## Project Structure

```
illumina/
├── frontend/
│   ├── index.html          # Landing page
│   ├── about.html          # About page
│   ├── mentors.html        # Mentor listing page
│   └── css/
│       ├── style.css
│       ├── about-style.css
│       └── mentors-style.css
├── js/
│   ├── contact.js          # Contact form handling
│   ├── mentor-profile.js   # Mentor profile functionality
│   ├── mentors.js          # Mentor listing functionality
│   ├── signup-mentee.js    # Mentee registration
│   ├── signup-mentor.js    # Mentor registration
│   └── signup.js           # General signup functionality
└── images/
    └── landingpage.jpg
```

## Setup and Installation

1. Clone the repository:
```bash
git clone https://github.com/your-username/illumina.git
cd illumina
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment variables:
Create a `.env` file in the root directory with the following variables:
```
DB_CONNECTION_STRING=your_database_connection_string
JWT_SECRET=your_jwt_secret
API_KEY=your_api_key
```

4. Start the development server:
```bash
npm run dev
```

## License

This project is licensed under the MIT License - see the LICENSE.md file for details.

