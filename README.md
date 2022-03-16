# theScore "the Rush" Interview Challenge
At theScore, we are always looking for intelligent, resourceful, full-stack developers to join our growing team. To help us evaluate new talent, we have created this take-home interview question. This question should take you no more than a few hours.

**All candidates must complete this before the possibility of an in-person interview. During the in-person interview, your submitted project will be used as the base for further extensions.**

### Why a take-home challenge?
In-person coding interviews can be stressful and can hide some people's full potential. A take-home gives you a chance work in a less stressful environment and showcase your talent.

We want you to be at your best and most comfortable.

### A bit about our tech stack
As outlined in our job description, you will come across technologies which include a server-side web framework (like Elixir/Phoenix, Ruby on Rails or a modern Javascript framework) and a front-end Javascript framework (like ReactJS)

### Challenge Background
We have sets of records representing football players' rushing statistics. All records have the following attributes:
* `Player` (Player's name)
* `Team` (Player's team abbreviation)
* `Pos` (Player's postion)
* `Att/G` (Rushing Attempts Per Game Average)
* `Att` (Rushing Attempts)
* `Yds` (Total Rushing Yards)
* `Avg` (Rushing Average Yards Per Attempt)
* `Yds/G` (Rushing Yards Per Game)
* `TD` (Total Rushing Touchdowns)
* `Lng` (Longest Rush -- a `T` represents a touchdown occurred)
* `1st` (Rushing First Downs)
* `1st%` (Rushing First Down Percentage)
* `20+` (Rushing 20+ Yards Each)
* `40+` (Rushing 40+ Yards Each)
* `FUM` (Rushing Fumbles)

In this repo is a sample data file [`rushing.json`](/rushing.json).

##### Challenge Requirements
1. Create a web app. This must be able to do the following steps
    1. Create a webpage which displays a table with the contents of [`rushing.json`](/rushing.json)
    2. The user should be able to sort the players by _Total Rushing Yards_, _Longest Rush_ and _Total Rushing Touchdowns_
    3. The user should be able to filter by the player's name
    4. The user should be able to download the sorted data as a CSV, as well as a filtered subset
    
2. The system should be able to potentially support larger sets of data on the order of 10k records.

3. Update the section `Installation and running this solution` in the README file explaining how to run your code

### Submitting a solution
1. Download this repo
2. Complete the problem outlined in the `Requirements` section
3. In your personal public GitHub repo, create a new public repo with this implementation
4. Provide this link to your contact at theScore

We will evaluate you on your ability to solve the problem defined in the requirements section as well as your choice of frameworks, and general coding style.

### Help
If you have any questions regarding requirements, do not hesitate to email your contact at theScore for clarification.

### Installation and running this solution
The db is hosted on pgAdmin as a cloud DB. Before running app, our table must be created

To initialize db and import data
1. `yarn migrate`
2. Will be prompted for password, it is included in `/backend/.env` in `PGPASSWORD` variable

If you want to import new set of data, upload to `src/db/data` and run steps to initialize again. Make sure it is in the correct format or it will not import

To run app make sure docker is installed:
1. Run `docker-compose up --build`
2. Visit localhost:3050

To run without docker:
1. cd to the root directory `nfl-rushing-app`
2. `yarn install`
3. `yarn start`
4. Visit localhost:3000

To run tests run `yarn test --coverage`

## App Limitations
- Cannot delete data, aside from DB, out of scope for this project as user should not be able to delete data
- Cannot update or add data from the app as app should only be for viewing purposes
- Filters will be "AND" filters not "OR" (Ex. cannot do `Team = 'ATL' OR Team = 'BAL'`). looking around at other stats visualizers, went for simplicity/cleaner design rather than fully customizeable queries, however this can easily be added in.

## Extra features
- Can filter for if the longest rush was converted to a touchdown or not
- Can add and delete filters
- Can import new data

App supports displaying data, filtering data by fields, searching a player's name, sorting data by fields and exporting data subsets to a CSV. Used https://github.com/minimal-ui-kit/material-kit-react as a template for the Front-end.