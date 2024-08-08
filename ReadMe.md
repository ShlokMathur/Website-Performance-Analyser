1. User Input:
   - User opens the web application.
   - User enters a website URL and clicks "Analyze".

2. Frontend (React):
   - The frontend captures the URL input.
   - It sends a POST request to the backend server at `http://localhost:5002/analyze` with the URL as the payload.

3. Backend (Node.js & Puppeteer):
   - The backend receives the URL from the frontend.
   - Puppeteer launches a headless browser and navigates to the provided URL.
   - Puppeteer gathers performance metrics (page load time, total request size, number of requests).
   - The backend sends these metrics back to the frontend.

4. Frontend (React):
   - The frontend receives the metrics from the backend.
   - It displays the metrics to the user in a readable format.

5. Output:
   - The user sees the performance metrics of the analyzed website.
