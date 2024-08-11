# Colab App
<center>

**Colab** is a collaborative platform that allows developers to create, join, and manage programming projects. Users can discover projects, collaborate with team members, and effectively manage project details. The app features user authentication, real-time chat, and a project dependant links for GitHub, Trello, and Figma to streamline the project management process.

</center>

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


## Credits 
#### Icons: 
- <a href="https://fontawesome.com/icons">Font Awesome</a>
- <a href="https://www.freepik.com/icon/idea_7610845">Site Icon</a>
#### Profile Pictures:
- <a href="https://i.pinimg.com/originals/ab/08/9f/ab089f4568627b25427c6896292d8d11.png">Naruto Profile Picture</a> 
- <a href="https://i.pinimg.com/originals/4d/96/c4/4d96c4eb4f2c2bfa6c6ce1f07b7851b0.jpg">Sakura Profile Picture</a>
- <a href="https://i.pinimg.com/originals/5a/71/37/5a71371a2024061c6cf8f7c9d1ef043b.jpg">Luffy Profile Picture</a>
- <a href="https://i.pinimg.com/originals/07/7b/70/077b707ee484fe1b24ca295fbe8542bf.jpg">Goku Profile Picture</a>
- <a href="https://i.pinimg.com/originals/dd/ee/f5/ddeef5dd4173a48e8f8d69272aa064ca.jpg">Edward Elric Profile Picture</a>
- <a href="https://i.pinimg.com/originals/8f/bc/36/8fbc36e9d29bd8e59dc5fa621842668d.jpg">Jotaro Profile Picture</a>
- <a href="https://i.pinimg.com/564x/76/c4/c6/76c4c6c7d5d87a41ed9843583f8a01d1.jpg">Light Yagami Profile Picture</a>
- <a href="https://i.pinimg.com/originals/c4/18/37/c41837027134824823e3195a193d8913.jpg">InuYasha Profile Picture</a>
- <a href="https://i.pinimg.com/736x/2a/26/fa/2a26fa25a5488da0c045bee2c75802b7.jpg">Mikasa Profile Picture</a>
- <a href="https://i.pinimg.com/originals/4f/67/f1/4f67f1731b4c4a414b63728cf9851da5.jpg">Zenistu Profile Picture</a>
- <a href="https://i.pinimg.com/originals/92/f9/49/92f949510afd67fbc38bfcd91fca389e.png">Gojo Profile Picture</a>
- <a href="https://i.pinimg.com/originals/a7/22/f0/a722f0b3026b8c30422ccbced5122652.jpg">Tanjiro Profile Picture</a>
- <a href="https://i.pinimg.com/originals/de/78/f5/de78f5a47f498aa5b52bcdeb79fcad28.jpg">Megumi Profile Picture</a>
- <a href="https://i.pinimg.com/originals/77/3f/93/773f932ac8541d54d1da11de2211214c.jpg">Reigen Profile Picture</a>

#### Cover Pictures: 
- <a href="https://staticg.sportskeeda.com/editor/2023/05/90701-16836967841966-1920.jpg">Default Cover Photo </a>
- <a href="https://i.pinimg.com/originals/b1/71/ec/b171ec6c19523d1ee836cd2900af5893.jpg">Konoha Village Chat</a>
- <a href="https://i.pinimg.com/originals/ad/3d/ab/ad3dab47a175bf036e22a6e9545fa5e8.jpg">Naruto Missions Tracker</a>
- <a href="https://i.pinimg.com/originals/af/cc/de/afccdefeae5fee31e5dc4f56fe6b2bfe.jpg">Straw Hat Crew Task Manager</a>
- <a href="https://qph.cf2.quoracdn.net/main-qimg-b54f828a154b86e5c4cbd8bffbf8fe93">Dragon Ball Training Tracker</a>
- <a href="https://imgix.ranker.com/user_node_img/50135/1002685433/original/1002685433-photo-u-207946133">One Piece Treasure Market</a>
- <a href="https://i.pinimg.com/originals/5b/3f/46/5b3f46519bd873bc20e765ae122ed329.jpg">Fullmetal Alchemist Research Hub</a>
- <a href="https://i.kym-cdn.com/entries/icons/original/000/028/952/cover4.jpg">Stand User Network</a>
- <a href="https://www.reddit.com/media?url=https%3A%2F%2Fi.redd.it%2F7n2k6cqfeu381.jpg">Death Note Analysis Tool</a>
- <a href="https://m.media-amazon.com/images/M/MV5BMGI2MDI1N2MtMjkzNC00NjkwLWIyNjAtYWM0OTAyMjAwMjY2XkEyXkFqcGdeQXVyOTc5MDI5NjE@._V1_.jpg">Inuyasha Time Travel Diary</a>
- <a href="https://i.pinimg.com/originals/74/b2/c2/74b2c27db97a1c64a6b2fc77d34cc73f.jpg">Attack on Titan Defense Simulator</a>
- <a href="https://i.pinimg.com/originals/80/3d/bf/803dbf1f6f9c8e18fd297c29995d13dc.jpg">Dragon Ball Tournament Organizer</a>
- <a href="https://i.pinimg.com/originals/04/77/90/04779067a514363b57857c1fbf898029.jpg">Saiyan Training Log</a>
- <a href="https://i.pinimg.com/originals/42/97/2e/42972e03f3ee6080e4d40e1d108e0dfc.jpg">Thunder Breathing Training Hub</a>
- <a href="https://i.pinimg.com/originals/4d/f1/a0/4df1a066cbb26470ef104572a0c68e8d.jpg">Saiyan Battle Simulator</a>

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