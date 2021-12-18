# Introduction

This app is based on [Daml 101: Takes Two to Tango: Initiate & Accept Explained](https://youtu.be/Q-siwF_qULE?list=PLjLGVUzUMRxUqUXUGltc85HkB7CxsIYR4)

## Commands

1. `daml new ChoresApp --template empty-skeleton`
2. `cd .\ChoresApp\`
3. `daml studio`
4. App Intro:

   - This app follows the Initiate & Accept Pattern
   - In this pattern one party will initiate a transaction and another party will either accepts or rejects it
   - The app contains contract between parent and a child
   - child will propose a chore to his/her parent and parent will either accept or reject the proposal
   - vBuck is the token which is used as reward for completion of chore

5. Create a file Main.daml inside daml folder and add template code
6. To run Daml scripts add `init-script: Main:setup` in daml.yaml file
7. Updated parties as reqiuirements
8. Either execute script from IDE or start navigator by hitting the command `daml start`
