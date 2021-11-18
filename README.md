# User authontication with Redis service (nodejs) example, 

Node.js application for authenticating user access using redis server running all service in docker containers as well.



### Running the project

#### Running the project with docker.

      $ docker-compose build
      $ dcoker-compose up
      
#### Running the project with node.

      $ npm install
      $ npm start

 #### Testing the project.

      $ npm test

 
#### APi Interaction (Redis testing service): 

by calling the following route `/api/v1/auth/user-login` and passing mocked body, you will get the access token to all backend resources.

       {
          "email_address": "user1@email.com", // any user email (mocked up body)
          "password": "ispassword" //will be plain password
       }

The response will be in Json format: 

      {
          "statusMessage": "SUCCESS",
          "status": 200,
          "message": "user login success",
          "data": {
              "access_token": "83505cabbccab53f470b1c36416c5a76"
          }
      }
##### * For api documentation check [APIs Documentation]( https://documenter.getpostman.com/view/3838631/UVCCf4DE#a5a70032-6b2a-471c-8c15-883be561750a )
