## NASA API Application
 
## Run Directly on Your Browser
- You can access live DEMO via below link
 
  ```bash
  https://nasa-api-six-lyart.vercel.app
  ```
 
## Run Locally
- Clone the project
  ```bash
  git clone https://github.com/sliitcsse/se3040-assignment02-vidura-chathuranga.git
  ```
 
- Install dependencies in root directory
  ```bash
  npm install
  ```
 
- create a file called .env.local in the root directory, and paste below codes in to it. ( NOTE : to get the key you need to navigate to https://dashboard.clerk.com/sign-up and signup. Then create application and copy the VITE_CLERK_PUBLISHABLE_KEY)
    ```bash
    VITE_CLERK_PUBLISHABLE_KEY = YOUR_CLERK_KEY
    ```
 
- create a file called constants.js inside the src/utils folder, and paste below codes in to it. ( NOTE : to get NASA_API_KEY navigate to https://api.nasa.gov/ and signup )
    ```bash
    const API_KEY = "YOUR_NASA_API_KEY";
    const DEFAULT_ROVER_URL = `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&page=1&api_key=${API_KEY}`;

  export { API_KEY, DEFAULT_ROVER_URL };
    ```
- Run the project using below command: 
  ```bash
  npm run dev
  ```
- Run Tests
  ```bash
  npm test
  ```
