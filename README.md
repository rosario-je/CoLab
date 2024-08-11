# Colab App
<center>

**Colab** is a collaborative platform that allows developers to create, join, and manage programming projects. Users can discover projects, collaborate with team members, and effectively manage project details. The app features user authentication, real-time chat, and a project dependant links for GitHub, Trello, and Figma to streamline the project management process.

</center>

![Home Page](https://github.com/rosario-je/CoLab/blob/main/development/client/public/landing_images/CoLab_Feed_page.jpg)

## Features

- **Project Creation**: Users can create project posts with a title, description, and set a user limit (up to 5 members). Provide links to the project's GitHub repo, Trello board, and Figma designs.
- **Project Discovery**: Browse and search through a feed of projects.
- **Project Search by technology**: Search for projects with a specific technology!
- **Join Projects**: Request to join projects, with the project owner having the ability to accept or reject applications.
- **Live Chat**: Real-time chat for members of the same project to collaborate effectively.
- **Link Integration**: Add project-related links for GitHub, Trello, and Figma during project creation.

## Tech Stack

- **Frontend**: React (Vite), TailwindCSS, DaisyUI
- **Backend**: Express, PostgreSQL
- **Authentication**: Session-based authentication through backend API
- **Real-time Communication**: Socket.IO
- **Hosting**: TBD

## Installation

### Prerequisites

- Node.js
- PostgreSQL

### Backend Setup
1. Clone the repository:

```bash
git clone https://github.com/rosario-je/colab-app.git
cd colab-app
```

Install server dependencies:

```bash
cd server
npm install
```

Set up environment variables in a .env file:

```env
PORT=5000
DATABASE_URL=your_postgresql_database_url
SESSION_SECRET=your_secret_key
```

Set up the database:

```bash
npm run migrate
npm run seed
```

Start the backend server:

```bash
npm start
```

Frontend Setup

Install client dependencies:

```bash
cd client
npm install
```

Set up environment variables in a .env file:

```env
VITE_API_URL=http://localhost:5000
```

Start the frontend development server:

```bash
npm run dev
```

### Usage

- Register or log in to your account.
- Create a new project, providing links to the GitHub repo, Trello board, and Figma designs.
- Browse and search through the project feed.
- Request to join projects and communicate with team members through live chat.
- Manage your projects and collaborate with others effectively.

## Screenshots
![Home Page](https://github.com/rosario-je/CoLab/blob/main/development/client/public/landing_images/CoLab_Feed_page.jpg)
![Project Page](https://github.com/rosario-je/CoLab/blob/main/development/client/public/landing_images/CoLab_Project_page.jpg)
![My Projects](https://github.com/rosario-je/CoLab/blob/main/development/client/public/landing_images/myprojects.jpg)
![My Requests](https://github.com/rosario-je/CoLab/blob/main/development/client/public/landing_images/requests.jpg)

## Authors:
This project could not have been possible without the hard work and dedication of the following individuals:
- [Jose Eduardo Payamps](https://github.com/rosario-je)
- [Rebecca Smith](https://github.com/beccasbizarreadventure)
- [Thomas Azran](https://github.com/Xanadude2112)

#### General Attributions:
- Naruto © Masashi Kishimoto / VIZ Media / Pierrot 
- One Piece © Eiichiro Oda / Funimation / Toei Animation
- Dragon Ball © Akira Toriyama / Funimation / Toei Animation
- Full Metal Alchemist © Hiromu Arakawa / Funimation / Bones
- Jojo's Bizarre Adventure © Hirohiko Araki / VIZ Media / David Production
- Death Note © Tsugumi Ohba/ Takeshi Obata / VIZ Media / Madhouse
- Inuyasha © Rumiko Takahashi / Sunrise / VIZ Media
- Attack on Titan © Hajime Isayama / Funimation / Wit Studio / MAPPA
- Demon Slayer © Koyoharu Gotouge / Aniplex / ufotable
- Jujutsu Kaisen © Gege Akutami / VIZ Media / MAPPA
- Mob Psycho 100 © ONE / Funimation / Bones