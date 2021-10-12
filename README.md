# CP3407Project

Quick Guide for Version Control:

The following only needs to be done once:
1. Create an empty file somewhere you will remember (I did Desktop) that way it is easy to navigate to 
2. Open git bash and navigate to the empty file (cd ~/Desktop/[FILE NAME])
3. Git clone https://github.com/davidrenderos/CP3407Project.git
4. Type git remote add origin https://github.com/davidrenderos/CP3407Project.git
You now have the website ready to work on, pulled directly from the main branch.

login to your PC

/////////////////////////////////////////////////////////////////////////////////

git pull origin main
git checkout -b <branchname> MEANINGFUL TITLE
git branch, will list all branches and have a * next to the one you are in

/////////////////////////////////////////////////////////////////////////////////

work on feature
check if it works on local site
npm run build, on VS Code CMD, this is needed for GitHub action to work!!!

/////////////////////////////////////////////////////////////////////////////////

Choose one:
git add <filename>

git add *

git add . (I was using this, and it works for adding all files?)

/////////////////////////////////////////////////////////////////////////////////

git commit -m "Commit message"
  
git push origin <branchname> same as the one you created earlier

/////////////////////////////////////////////////////////////////////////////////

go to GitHub and create a pull request for your changes
someone will confirm the changes, and allow it to move to main

/////////////////////////////////////////////////////////////////////////////////

HOPEFULLY the GitHub action works, you can check by clicking actions on the repo
Check live site to make sure your changes work and are there, and presto!

Helpful Resources:
- Git Commands: https://confluence.atlassian.com/bitbucketserver/basic-git-commands-776639767.html
- React: https://create-react-app.dev/docs/production-build/
- Live Site: https://test-70a1d.web.app/

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `yarn build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
