# HomeWizard P1 Dashboard

A local dashboard to monitor your HomeWizard P1 smart meter in real time — built with plain HTML, CSS and JavaScript.

## Features

- **Real-time power monitoring** — live view of current consumption and energy fed back to the grid
- **Daily usage tracking** — total consumption for the current day, auto-resets at midnight
- **Peak moment counter** — counts how many times consumption exceeded 1600W
- **Live graph** — displays the last 20 measurements as a line chart
- **IP input** — enter your P1 meter's local IP directly from the dashboard, no code changes needed
- **Clock & date** — live clock and date displayed in the footer

## Getting Started

### Requirements

- A HomeWizard P1 meter connected to your local network
- A browser (Chrome, Firefox, Edge)
- A local web server (e.g. VS Code Live Server)

### Installation

1. Clone or download this repository
2. Open the project folder in VS Code
3. Start Live Server (`index.html` → right click → Open with Live Server)
4. Enter the local IP address of your P1 meter in the input field and click **Verbinden**

### Finding your P1 meter IP

Check your router's connected devices list and look for a device named `HomeWizard` or `p1-meter`. The IP will look something like `192.168.1.x`.

## Project Structure

```
├── index.html      # Main HTML structure
├── style.css       # Styling
├── reset.css       # CSS reset (Meyer reset)
└── script.js       # All JavaScript logic
```

## Built With

- HTML / CSS / JavaScript
- [Chart.js](https://www.chartjs.org/) — for the live graph
- HomeWizard P1 local API (`/api/v1/data`)

## Author

© 2026 - Quinten De Smet
