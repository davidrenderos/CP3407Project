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
