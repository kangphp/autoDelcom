# autoDelcom

A Node.js automation script that helps Del Institute of Technology students automatically fill their daily time table activities on Delcom platform.

## Features

- Automatic login to Delcom platform
- Automated time table entry for multiple daily activities
- Configurable activity schedule
- Headless browser automation using Puppeteer

## Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/autoDelcom.git

# Navigate to project directory
cd autoDelcom

# Install dependencies
npm install
```

## Usage

1. Edit the `index.js` file to add your Delcom credentials
2. Customize the `timeItem` array with your preferred schedule
3. Run the script:

```bash
node index.js
```

## Requirements

- Node.js
- Chrome Browser
- Puppeteer
- Tesseract.js

## How It Works

The script uses Puppeteer to control a Chrome browser instance, automatically logging into Delcom and filling out time table entries based on the predefined schedule in the code.