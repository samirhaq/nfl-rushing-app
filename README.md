theScore "the Rush" Interview Challenge
At theScore, we are always looking for intelligent, resourceful, full-stack developers to join our growing team. To help us evaluate new talent, we have created this take-home interview question. This question should take you no more than a few hours.

All candidates must complete this before the possibility of an in-person interview. During the in-person interview, your submitted project will be used as the base for further extensions.

Why a take-home challenge?
In-person coding interviews can be stressful and can hide some people's full potential. A take-home gives you a chance work in a less stressful environment and showcase your talent.

We want you to be at your best and most comfortable.

A bit about our tech stack
As outlined in our job description, you will come across technologies which include a server-side web framework (like Elixir/Phoenix, Ruby on Rails or a modern Javascript framework) and a front-end Javascript framework (like ReactJS)

Challenge Background
We have sets of records representing football players' rushing statistics. All records have the following attributes:

Player (Player's name)
Team (Player's team abbreviation)
Pos (Player's postion)
Att/G (Rushing Attempts Per Game Average)
Att (Rushing Attempts)
Yds (Total Rushing Yards)
Avg (Rushing Average Yards Per Attempt)
Yds/G (Rushing Yards Per Game)
TD (Total Rushing Touchdowns)
Lng (Longest Rush -- a T represents a touchdown occurred)
1st (Rushing First Downs)
1st% (Rushing First Down Percentage)
20+ (Rushing 20+ Yards Each)
40+ (Rushing 40+ Yards Each)
FUM (Rushing Fumbles)
In this repo is a sample data file rushing.json.

Challenge Requirements
Create a web app. This must be able to do the following steps

Create a webpage which displays a table with the contents of rushing.json
The user should be able to sort the players by Total Rushing Yards, Longest Rush and Total Rushing Touchdowns
The user should be able to filter by the player's name
The user should be able to download the sorted data as a CSV, as well as a filtered subset
The system should be able to potentially support larger sets of data on the order of 10k records.

Update the section Installation and running this solution in the README file explaining how to run your code

Submitting a solution
Download this repo
Complete the problem outlined in the Requirements section
In your personal public GitHub repo, create a new public repo with this implementation
Provide this link to your contact at theScore
We will evaluate you on your ability to solve the problem defined in the requirements section as well as your choice of frameworks, and general coding style.

Help
If you have any questions regarding requirements, do not hesitate to email your contact at theScore for clarification.

Installation and running this solution
To run follow these steps from the root directory:
1. `yarn install`
2. `yarn create-db`
3. `yarn seed`
4. `yarn start`

To run tests run `yarn test`

App supports displaying data, filtering data by fields, searching a player's name, sorting data by fields and exporting data subsets to a CSV.