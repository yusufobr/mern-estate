<div align="center">
<a name="readme-top">
    <img width="250" src="./client/src/assets/mern-estate-logo.svg" />
</a>    
</div>
<br />

<!-- TABLE OF CONTENTS -->

# 📗 Table of Contents

- [📖 About the Project](#about-project)
  - [🛠 Built With](#built-with)
    - [Tech Stack](#tech-stack)
    - [Key Features](#key-features)
  - [⚙️ Project Structure](#structure)
  - [🔗 API Routes](#api)
  - [🔗 Client Routes](#client)
- [💻 Getting Started](#getting-started)
  - [Setup](#setup)
  - [Prerequisites](#prerequisites)
  - [Install](#install)
  - [Usage](#usage)
  - [Run tests](#run-tests)
  - [Deployment](#triangular_flag_on_post-deployment)
- [👥 Authors](#authors)
- [🔭 Future Features](#future-features)
- [🤝 Contributing](#contributing)
- [⭐️ Show your support](#support)
- [🙏 Acknowledgements](#acknowledgements)
- [📝 License](#license)
<br/>

<!-- PROJECT DESCRIPTION -->

# 📖 REAL ESTATE <a name="about-project"></a>

**MERN Estate** is a sophisticated full-stack web application developed using the MERN (MongoDB, Express.js, React.js, Node.js) stack. <br/>It serves as a comprehensive platform tailored for real estate enthusiasts, providing them with intuitive tools to seamlessly `browse, list, and engage` with various real estate listings.

## Screenshot :

(Loading...)

## 🛠 Built With <a name="built-with"></a>

### Tech Stack <a name="tech-stack"></a>



<details>
  <summary>Api</summary>
  <ul>
    <li><a href="https://nodejs.org/en">Node.js</a></li>
    <li><a href="https://expressjs.com/">Express.js</a></li>
    <li><a href="https://www.mongodb.com/">MongooDB</a></li>
  </ul>
</details>

<details>
  <summary>Client</summary>
  <ul>
    <li><a href="https://react.dev/">React.js</a></li>
    <li><a href="https://www.typescriptlang.org/">Typescript</a></li>
    <li><a href="https://redux-toolkit.js.org/">Redux Toolkit</a></li>
    <li><a href="https://tailwindcss.com/">TailwindCss</a></li>
  </ul>
</details>

<!-- Features -->

### Key Features <a name="key-features"></a>

- **User Authentication :** Secure authentication mechanisms like `JSON Web Tokens` (JWTs) ensure user data remains protected while providing seamless access to personalized features and functionalities. JWTs act as secure digital keys that verify a user's identity without exposing sensitive information. This allows authorized users to access specific features without needing to constantly re-enter credentials.

- **Real-time Updates :** Utilizing modern technologies such as WebSockets, users can `receive real-time updates` on listing status changes, new listings, and more, providing an immersive and dynamic browsing experience.

- **Advanced Search :** Robust search functionalities empower users to `filter` listings based on various criteria such as location, price range, amenities, and more, facilitating efficient discovery of properties that match their preferences.

- **Listing Management :** Sellers can easily `create, update, and manage` their listings through a user-friendly dashboard, complete with features for adding detailed descriptions, high-quality images, and interactive media.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## ⚙️ Project Structure <a name="structure"></a>

```sh
.
├── api/
│   ├── controllers/
│   │   ├── auth.controller.js
│   │   ├── comment.controller.js
│   │   ├── likes.controller.js
│   │   ├── listing.controller.js
│   │   └── user.controller.js
│   ├── models/
│   │   ├── comment.model.js
│   │   ├── likes.model.js
│   │   ├── listing.model.js
│   │   └── user.model.js
│   ├── routes/
│   │   ├── auth.route.js
│   │   ├── comment.route.js
│   │   ├── like.route.js
│   │   ├── listing.route.js
│   │   └── user.route.js
│   └── utils/
│       ├── error.js
│       ├── hashPassword.js
│       ├── migration.js
│       └── verifyToken.js
├── client/
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── firestore/
│   │   ├── pages/
│   │   ├── redux/
│   │   └── utils/
├── list_structure.sh
├── netlify.toml
├── package-lock.json
└── package.json
```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

##  🔗 API Routes <a name="api"></a>

### Authentication Routes

- **`POST /api/auth/signup`** : Register a new user.
- **`POST /api/auth/signin`** : Authenticate and login a user.
- **`POST /api/auth/signout`** : Logout a user.
- **`POST /api/auth/google`** : Authenticate with Google OAuth.

### User Routes

- **`POST /api/user/signup`** : Register a new user.
- **`POST /api/user/signin`** : Authenticate and login a user.
- **`POST /api/user/signout`** : Logout a user.
- **`POST /api/user/google`** : Authenticate with Google OAuth.

### Listing Routes

- **`POST /api/listing/create`** : Create a new listing (requires authentication).
- **`POST /api/listing/mylistings/:id`** : Get listings created by a specific user (requires authentication).
- **`DELETE /api/listing/delete/:id`** : Delete a listing by ID (requires authentication).
- **`POST /api/listing/update/:id`** : Update a listing by ID (requires authentication).
- **`GET /api/listing/all`** : Get all listings.
- **`GET /api/listing/post/:id`** : Get a single listing by ID.
- **`POST /api/listing/getSpecificListings`** : Get listings based on specific criteria.
- **`GET /api/listing/search`** : Search listings.

### Like Routes

- **`POST /api/like/add`** : Add a like to a listing (requires authentication).
- **`POST /api/like/remove`** : Remove a like from a listing (requires authentication).
- **`POST /api/like/check`** : Check if a user has liked a listing (requires authentication).
- **`POST /api/like/favorites`** : Get user's favorite listings (requires authentication).

### Comment Routes

- **`POST /api/comment/add`** : Add a comment to a listing (requires authentication).
- **`POST /api/comment/remove`** : Remove a comment from a listing (requires authentication).
- **`GET /api/comment/get`** : Get comments for a listing.
- **`GET /api/comment/userCommentsCount`** : Get count of comments posted by a user.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Client Routes

The client-side routes are defined using React Router's `<BrowserRouter>` component. Below is a summary of the routes and their corresponding components:

| Path          | Component           | Description                           |
|---------------|---------------------|---------------------------------------|
| `/`           | `Home`              | Renders the Home component.           |
| `/search`     | `Search`            | Renders the Search component.         |
| `/about`      | `About`             | Renders the About component.          |
| `/post/:id`   | `Post`              | Renders the Post component with dynamic post ID. |
| `/home2`      | `HomeTwo`           | Renders the HomeTwo component.        |
| **Private Routes** |                    |                                       |
| `/profile`    | `Profile`           | Renders the Profile component (requires authentication). |
| `/create`     | `CreateListing`     | Renders the CreateListing component (requires authentication). |
| `/update/:id` | `UpdateListing`     | Renders the UpdateListing component with dynamic listing ID (requires authentication). |
| `/favorites`  | `Favorites`         | Renders the Favorites component (requires authentication). |
| **Authentication Routes** |            |                                       |
| `/signin`     | `SignIn`            | Renders the SignIn component.         |
| `/signup`     | `SignUp`            | Renders the SignUp component.         |
| **Fallback Route** |                  |                                       |
| `*`           | `Not Found`         | Renders a "Not Found" message for undefined routes. |

These routes provide navigation and functionality for various pages and features within the MERN Estate client-side application.

Feel free to adjust the route paths and components as needed to fit your project's requirements.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## 🚀 Live Demo <a name="live-demo"></a>

- [Live Demo Link](https://mern-estate-1sq7.onrender.com/)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- GETTING STARTED -->

## 💻 Getting Started <a name="getting-started"></a>

This project is useful and important as it gives developers an experience of how to use React and Redux and APIs to create home and details page.

To get a local copy up and running, follow these simple steps:

### Prerequisites

- In order to run this project you need a compatible browser to load the html file.
- Node.js and npm installed on your local machine.

### Setup

Clone this repository to your desired folder:

```sh
  git clone https://github.com/yusufobr/mern-estate.git
```

### Install

Install this project with:

```sh
  cd mern-estate
  npm install
  cd client && npm install
```

### Usage

You need to use two terminals :

1) **First TERMINAL : (SERVER)**

    ```sh
    cd mern-estate
    npm run dev
    ```

2) **Second TERMINAL :**

    ```sh
    cd client
    npm run dev
    ```
    Open your browser and navigate to `http://localhost:5173/` to view the client application.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- AUTHORS -->

## 👥 Authors <a name="authors"></a>

👤 Youssef OUBARI

- GitHub: [@yusufobr](https://github.com/yusufobr)
- Twitter: [@OubariY](https://twitter.com/OubariY)
- LinkedIn: [Youssef OUBARI](https://www.linkedin.com/in/youssef-oubari)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- FUTURE FEATURES -->

## 🔭 Future Features <a name="future-features"></a>

- **Chat between users**
- **Like /Update comment**

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- CONTRIBUTING -->

## 🤝 Contributing <a name="contributing"></a>

Contributions, issues, and feature requests are welcome!

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- SUPPORT -->

## ⭐️ Show your support <a name="support"></a>

If you like this project please like and share. You can also reach out to my portfolio so we can have further discussions.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- ACKNOWLEDGEMENTS -->

## 🙏 Acknowledgments <a name="acknowledgements"></a>

I would also like to thank my partners and reviewers of the code for helping make the site better.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- LICENSE -->

## 📝 License <a name="license"></a>

This project is [MIT](./LICENSE) licensed.

<p align="right">(<a href="#readme-top">back to top</a>)</p>
