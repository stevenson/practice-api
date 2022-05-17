# practice-api
sample api in express that should return some simple movie recommendation. just to practice creating a rest api for movies.

## I. Setup
1. install the dependencies: `npm ci`
2. run the service: `npm run monitor`
### maintenance
1. I added a linter to keep the feel of the code the same
    - you can run the linter via `npm run lint`
    - there are some for loops that need cleaning

### sample calls
- you should be able to run a simple curl to retrieve information from the service
  1. retrieve multiple entries:
    - `curl --location --request GET 'http://127.0.0.1:5000'`
  2. retrieve entries using filters like `genre` and `time`
    - examples
      - `curl --location --request GET 'http://127.0.0.1:5000?time=18:00:00&genre=Drama'`
      - `curl --location --request GET 'http://127.0.0.1:5000?time=07:00:00&genre=Action%20&%20Adventure'`
      - `http://127.0.0.1:5000?genre=animation`
    - assumption: 
      - the time param in the filter is assumed to be in GMT +11:00 
      - it might be helpful if we control that in the front end but some sanitation and cleaning might help
      - the idea is just to return movies based on those that are showing after the time you entered
      - it is assume that certain special characters would be encoded
    - validation
      - time is checked if it can be converted properly into a moment object
## II. Notes: 
- the service does not have an writeable persistence layer. 
  - the repo basically just retrieves from pastebin or uses a flat json for data
  - the repositories should contain actual implementation to manage data persistence
    - ie: fetching and querying from a db of sorts.
- the service uses port 5000 but you can change the configuration in `config/index.js`
- the utility files/classes are in the helpers directory. these are helpful for just managing logging and responses in general.



## III. Todo's
1. refactor code to agree with linting
2. add tests for utility functions; maybe use mocha sinon.
  - probably add a unit test to use the long function in the db
  - add in integration test for the single retrieval call
3. add some other routes to simulate other services or perhaps use a separate branch

