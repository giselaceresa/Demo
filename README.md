# Administration Report – Demo Dashboard

This project is a demonstration of a Dashboard developed in Google Apps Script (GAS). It connects directly to a Google Sheets file and provides a visual and dynamic administration panel for analyzing sales, expenses, and products.

## Features

Interactive Panel: Displayed in a dialog within Google Sheets using HtmlService.

Fast and Dynamic: Uses google.script.run to retrieve information asynchronously through GAS server calls, without blocking the UI.

Modern Design: Interface built with Bootstrap 5, ensuring a clean and responsive visual experience.

Multiple Data Sources: Reads and integrates data from multiple sheets (Sales, Expenses, Products).

## Project Structure

```text
📁 src/
 ├── Code.gs      # Server code (onOpen, showSidebar, getData functions).
 └── index.html   # Client code (HTML structure, CSS styles, and JavaScript logic).
```

## Requirements

To test or implement this code:
1. A Google Spreadsheet that strictly contains the following tabs:
   - `Sales`
   - `Expenses`
   - `Products`
2. A Google Apps Script project linked to that spreadsheet (Extensions > Apps Script).

## Installation

1. Clone or download the repository:
   ```bash
   git clone https://github.com/giselaceresa/Demo.git
   ```
2. You can deploy this code using tools such as clasp. If you use [clasp](https://github.com/google/clasp):
   ```bash
   # Initialize the project in the root directory or copy the files into the local directory linked to the script ID.
   ```

Alternatively, manually copy and paste the contents of `src/Code.gs` and `src/index.html` into the Apps Script editor of your Google Sheet.

Reload your spreadsheet, and the new menu `📊 Dashboard > Open Panel` will appear.

## Technical Notes

The project includes error handling on both the client and server sides (in case sheets are missing or data typing fails).

Dates in the spreadsheet are converted using `Utilities.formatDate` to avoid time zone inconsistencies when serializing `Date` objects and sending them to the client.
