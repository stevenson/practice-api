# practice-api
sample api in express that should return some simple movie recommendation. just to practice creating a rest api for movies.

## I. Setup
1. install the dependencies: `npm ci`
2. run the service: `npm run monitor`
### sample calls
- you should be able to run a simple curl to retrieve information from the service
  1. retrieve multiple entries:
    - `curl --location --request GET 'http://127.0.0.1:5000'`
  2. retrieve entries using filters like `genre` and `time`
    - `curl --location --request GET 'http://127.0.0.1:5000?time=18:00:00&genre=Drama'`
    - assumption: 
      - the time param in the filter is assumed to be in GMT +11:00 
      - it might be helpful if we control that in the front end but some sanitation and cleaning might help
      - the idea is just to return movies based on those that are showing after the time you entered

## II. Notes: 
- the service does not have an writeable persistence layer. 
  - the repo basically just retrieves from pastebin or uses a flat json for data
  - the repositories should contain actual implementation to manage data persistence
    - ie: fetching and querying from a db of sorts.
- the service uses port 5000 but you can change the configuration in `config/index.js`
- the utility files/classes are in the helpers directory. these are helpful for just managing logging and responses in general.



## III. Todo's
1. add some other routes to simulate other services or perhaps use a separate branch

