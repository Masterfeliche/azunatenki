# Testing Instructions for Chatbot Integration

## Functional Testing

To test the chatbot functionality:

1. Ensure that the Langflow backend is running at the specified host URL (http://localhost:7860)
2. Open the website in a browser
3. Verify that the chatbot widget appears at the bottom right corner of the screen
4. Click on the chatbot widget to open the chat interface
5. Type a message and send it
6. Verify that the chatbot responds appropriately
7. Test multiple interactions to ensure consistent behavior

## Responsive Testing

To test the responsive behavior:

1. Open the website on a desktop browser
2. Verify that the chatbot appears at the bottom right corner with the correct size
3. Use browser developer tools to simulate different screen sizes
4. Test on mobile devices (or using mobile emulation in developer tools)
5. Verify that the chatbot adjusts its size and position on smaller screens
6. Ensure that the chatbot doesn't take up more than 60% of the screen height on mobile devices

## Error Handling Testing

To test error handling:

1. Stop the Langflow backend server
2. Refresh the website
3. Verify that the website continues to function normally
4. Attempt to interact with the chatbot
5. Verify that an appropriate error message is displayed
6. Restart the Langflow backend server
7. Verify that the chatbot reconnects and functions properly

## Cross-Browser Testing

Test the chatbot in different browsers:

1. Google Chrome
2. Mozilla Firefox
3. Microsoft Edge
4. Safari (if available)

Verify that the chatbot functions correctly and maintains consistent styling across all browsers.

## Performance Testing

To test performance impact:

1. Use browser developer tools to measure page load time with and without the chatbot
2. Verify that the chatbot doesn't significantly impact the website's performance
3. Check for any console errors or warnings related to the chatbot integration