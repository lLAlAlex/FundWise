# FundWise

Welcome to FundWise, an innovative platform at the forefront of the Web3 sector, leveraging the power of the Internet Computer Protocol (ICP) environment. FundWise revolutionizes crowdfunding by empowering users to both create and support projects seamlessly. 

With FundWise, users can easily establish their profiles, initiate new projects, and harness the collective support of fellow users to bring their visions to life. Join us as we redefine the future of decentralized funding and collaboration in the digital age

## 📦 Getting Started

Make sure that [Node.js](https://nodejs.org/en/) `>= 18` and [`dfx`](https://internetcomputer.org/docs/current/developer-docs/build/install-upgrade-remove) `>= 0.14` are installed on your system.

Run the following commands in a new, empty project directory:

1. Setup the Repository:
```sh
git clone https://github.com/lLAlAlex/FundWise.git

cd FundWise
```

2. Install all dependencies needed in the project :
```sh
npm install
```

3. Start the dfx environment (using WSL) : 
```sh
dfx start
```

4. Deploy and run all the canister : 
```sh
dfx deploy
```

## 🛠️ Technology Stack

- [Vite](https://vitejs.dev/): high-performance tooling for front-end web development
- [React](https://reactjs.org/): a component-based UI library
- [TypeScript](https://www.typescriptlang.org/): JavaScript extended with syntax for types
- [Tailwind](https://tailwindcss.com/): a utility-first CSS framework for building custom designs
- [Prettier](https://prettier.io/): code formatting for a wide range of supported languages
- [Motoko](https://github.com/dfinity/motoko#readme): a safe and simple programming language for the Internet Computer
- [Mops](https://mops.one): an on-chain community package manager for Motoko
- [mo-dev](https://github.com/dfinity/motoko-dev-server#readme): a live reload development server for Motoko
- [@ic-reactor](https://github.com/B3Pay/ic-reactor): A suite of JavaScript libraries for seamless frontend development on the Internet Computer

## Features

### 1. Home Page
  This page shows an overview of our website, Here, you'll discover detailed statistics for **Projects**, **Fund**, and **Partner**, showcasing the effectiveness and impact of our platform. And also you can find some things about us.
### 2. Explore Project Page
  This page shows all project. You'll find an extensive array of projects awaiting your support, each brimming with potential and purpose. There is also a project search feature and filtering project feature to make it easier. Dive deep into the details of each project with just a click, unraveling their stories and aspirations. All Users can also create new projects that can be funded by other users by filling in all the form data provided on the website.
### 3. Project Detail Page
  This page shows project details like project name, description, etc. You can also view project statistics such as backers i.e. the total of all users who have funded the project, project deadlines, and total funding. You can also see the rewards and comments tab. the rewards tab shows all reward tiers for users who have funded and met the criteria to earn those rewards, and the comments tab for all user comments on this project. You can also see the other user's profile from this page. 
### 4. About Us Page
  This page shows the community provided on this website, it also shows the team's mission. Apart from that, you will see the project categories on this website that are ready to be funded.
### 5. Profile Page
  This page shows a brief description of yourself such as **Name**, **Email**, **Profile Image**, etc. There are also several projects from these users to raise funds. And also some projects whose funds are provided by users. You can also update your personal profile page.
### 6. My Wallet Page
  This feature shows all funds sent and allows the creation of QR codes for those who will provide funds to the project. This feature can also function for users who want to create a new project, because there is a column that asks for input of a QR code and wallet address obtained from the NNS website.
### 7. Login And Registration
  This feature allows users to log in so that there are many features that users can do when logged in, such as creating projects. Login can be done by creating a new internet identity for those who don't have one by following several instructions on the website. 
  
  And users can register to create a new account and start logging into the website. Registration can be done by filling in some of the required data on the website registration form.

## 📚 Documentation

- [Vite developer docs](https://vitejs.dev/guide/)
- [React quick start guide](https://react.dev/learn)
- [Internet Computer docs](https://internetcomputer.org/docs/current/developer-docs/ic-overview)
- [`dfx.json` reference schema](https://internetcomputer.org/docs/current/references/dfx-json-reference/)
- [Motoko developer docs](https://internetcomputer.org/docs/current/developer-docs/build/cdks/motoko-dfinity/motoko/)
- [Mops usage instructions](https://j4mwm-bqaaa-aaaam-qajbq-cai.ic0.app/#/docs/install)
- [@ic-reactor/react](https://b3pay.github.io/ic-reactor/modules/react.html)

## 💡 Tips and Tricks

- Customize your project's code style by editing the `.prettierrc` file and then running `npm run format`.
- Reduce the latency of update calls by passing the `--emulator` flag to `dfx start`.
- Install a Motoko package by running `npx ic-mops add <package-name>`. Here is a [list of available packages](https://mops.one/).
- Split your frontend and backend console output by running `npm run frontend` and `npm run backend` in separate terminals.
