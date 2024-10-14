const express = require('express');
const puppeteer = require('puppeteer');

// Initialize the express app
const app = express();
const PORT = 3000;

// Define the API route
app.get('/open-google', async (req, res) => {
  try {
    // Launch a new browser instance
    const browser = await puppeteer.launch({ headless: false }); // Open the browser window (not headless)
    
    // Open a new page
    const page = await browser.newPage();
    
    // Navigate to Google's website
    await page.goto('https://www.google.com');

    // Wait for the search input element to load
    await page.waitForSelector('textarea[name="q"]');
    
    // Type 'hello' into the search box
    await page.type('textarea[name="q"]', 'hello');

    // Optionally: you can submit the search (uncomment to perform the search)
    await page.keyboard.press('Enter');
    
    // Close the browser after 10 seconds (optional)
    setTimeout(async () => {
      await browser.close();
    }, 10000);

    // Send response back to the client
    res.status(200).send('Typed "hello" in Google search box.');
  } catch (error) {
    console.error('Error launching browser:', error);
    res.status(500).send('Failed to perform the task.');
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
