# Tier List Maker

## Description

This project is a highly interactive and customizable tier list maker built using [Vite](https://vitejs.dev/) and [Svelte](https://svelte.dev/). Create your own tier lists with a smooth and intuitive drag-and-drop interface.

## Table of Contents

1. [Features](#features)
2. [Requirements](#requirements)
3. [Installation](#installation)
4. [Usage](#usage)
5. [Project Structure](#project-structure)
6. [Components](#components)
7. [Styling](#styling)

## Features

- **Drag and Drop**: Easily categorize items with drag and drop.
- **Multiple Tiers**: Comes with multiple tier categories that you can customize.
- **Custom Colors**: Set custom colors for each tier.
- **Responsive Design**: The interface scales well for different screen sizes.

## Requirements

- Node.js >= 14.x
- npm >= 6.x

## Installation

Clone the repository and install dependencies.

```bash
git clone https://github.com/SebastiaanWouters/tierelier.git
cd tierelier
npm install
```

Run the project locally.

```bash
npm run dev
```

Navigate to `http://localhost:5173` in your browser.

## Usage

Simply drag and drop items into your desired tier categories. Items can be moved between tiers and removed.

## Project Structure

The project's main folders and files are organized as follows:

- `src`: Source code directory
  - `lib`: Utility and helper functions
    - `components`: Svelte components like `Row.svelte`
  - `App.svelte`: Main application component
- `package.json`: Lists project dependencies
- `vite.config.js`: Vite configuration file

## Components

- **Row**: A single row in the tier list. Accepts `tier` and `color` as props.
- **App**: Main application component, initializes the tier list and draggable items.

## Styling

This project utilizes SCSS for styling. The design is mobile-responsive and adapts well to various screen sizes.