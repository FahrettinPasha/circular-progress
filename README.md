# circular-progress
Circular Progress Bar Component

This is a simple and customizable circular progress bar component built with HTML, CSS, and JavaScript (Web Components). It's designed to be easy to use and integrate into any web project.
What is this?

Imagine you have a task, and you want to show how much of it is done, like a percentage. This component helps you do that, but instead of a straight line, it's a nice round circle! You can change its color, size, and how much it's filled.
Features

    Customizable: You can change its min (minimum), max (maximum), and value (current progress) easily.

    Styling Options: Adjust size (how big it is), stroke-width (how thick the line is), color (progress color), and background-color (the color of the empty part).

    Web Component: It's built as a <circular-progress> HTML tag, so you can use it just like any other HTML element.

    Interactive Example: The index.html file includes an interactive example where you can change its properties in real-time.

How to Use It

It's super easy!
1. Get the Files

First, you need these two files:

    index.html (This is your main web page)

    circular-progress.js (This is the magic code for the circular bar)

Make sure both files are in the same folder.
2. Include the Component

In your index.html file, add this line right before the closing </body> tag:

<script src="circular-progress.js"></script>

This tells your web page to load our special circular bar code.
3. Use the Tag

Now, wherever you want to show a circular progress bar, just use the <circular-progress> tag like this:

<circular-progress min="0" max="100" value="50"></circular-progress>

That's it! You'll see a circular bar showing 50% progress.
Customization (Changing How It Looks)

You can add special "attributes" (like extra words) to the <circular-progress> tag to change its look and behavior:

    min: The lowest number your progress can be. (Default: 0)

    max: The highest number your progress can be. (Default: 100)

    value: The current number for your progress. This is what fills the circle. (Default: 0)

    size: How wide and tall the circle is, in pixels. (Default: 100)

    stroke-width: How thick the progress line is, in pixels. (Default: 5)

    color: The color of the filled part of the circle. You can use #hexcode, red, rgb(...), etc. (Default: #3498db - a blue color)

    background-color: The color of the empty part of the circle. (Default: #ecf0f1 - a light grey)

Example with all options:

<circular-progress 
  min="0" 
  max="200" 
  value="150" 
  size="180" 
  stroke-width="12" 
  color="#f39c12" 
  background-color="#fff5e0">
</circular-progress>

This will show a large orange circle, filled up to 150 out of 200.
Interactive Demo

The index.html file in this project is already set up as an interactive demo. Just open index.html in your web browser, and you can play with the sliders and color pickers to see the progress bar change instantly!
Project Structure

.
├── index.html              # The main page with the interactive demo.
└── circular-progress.js    # The JavaScript code for the custom component.
