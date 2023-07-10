# Country Visualization App

This README file provides documentation for a React.js application that uses the free API from restcountries.com to visualize country data. The application displays country names, regions, and area sizes. The data is fetched from the API endpoint https://restcountries.com/v2/all?fields=name,region,area to retrieve only the necessary data fields.

## Requirements
The application aims to fulfill the following requirements:

* Use the restcountries.com free API to fetch country data.
* Display a visualized representation of countries, including the country name, region, and area size.
* Implement a list to display the country data.
* Allow sorting the list alphabetically by country name in ascending and descending order.
* Implement filters to display countries that are smaller than Lithuania.
* Include pagination to display the data in smaller chunks.

## Installation
1. Clone the repository: git clone <repository-url>
2. Navigate to the project directory: cd <project-directory>
3. Install dependencies: npm install

## Usage
1. Start the development server: npm start
2. Open your browser and visit: http://localhost:3000

Make sure to have an active internet connection, as the application fetches data from the API.

## Features
<b> Displaying a List of Countries </b> </br>
Upon launching the application, a list of countries will be displayed. Each country entry will show the country name, region, and area size.

<b> Sorting Countries Alphabetically </b></br>
  The list of countries can be sorted alphabetically by country name. Users can choose between ascending and descending order.

<b>  Filtering Countries </b></br>
  The application provides a filter that displays countries smaller than Lithuania. Users can apply this filter to view only the relevant countries.

<b> Pagination </b></br>
  To handle large amounts of data, the application implements pagination. The country data is divided into smaller chunks, allowing users to navigate through the pages to view more countries.
