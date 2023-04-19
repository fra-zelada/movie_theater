# Movie Theater App

[🎬👉Click for Live Demo👈🎬](https://movie-theater-delta.vercel.app/)

Application that simulates the purchase of movie tickets.

React + Next.js techniques are used to simulate the ticket selection process. All ticket information is managed through Context API in conjunction with local storage.

# Quick Start

Clone the repository by running the following command in your terminal ``` git clone https://github.com/fra-zelada/movie_theater.git ``` Navigate to the project directory by running ``` cd movie_theater ``` Install the project dependencies using yarn ```yarn``` . Rename file ```.env.TEMPLATE``` to ```.env```

Add these values to the ```.env``` file

```
NEXT_PUBLIC_OMDB_API_KEY=bb7b170a
NEXT_PUBLIC_MOVIE_BY_ID_PATH=http://localhost:3000
```

Start the application by running ```yarn dev```

The application will now be running on ```http://localhost:3000```

# Technical summary

The following dependencies were added:

| Dependency     | Use                               |
|--|--|
| react-qr-code  | Creating QR codes for tickets     |
| swr            | Handling cache and pagination    |
| tailwindcss    | Styling the application           |

Some of the technologies used in this project:

| Name | Used for | files |
|--|--|--|
| getServerSideProps | Used to load data for the first page of the home | - src/pages/index.tsx |
| ISR : <br> getStaticPaths <br> getStaticProps  | Used in generating the page for each movie | - src/pages/movie/[...slug].tsx |
| SWR  | Requests and cache handling for browsing the pages of the home | - src/hooks/useMovieList.ts |
| next/head for SEO  | Applied in the Layout of each movie page | - src/layouts/MovieLayout.tsx |
| Context API  | Global state management | - src/context/... |

# Configurations

### Configure Environment Variables

| Variable     | Description                               | Example | Optional ? |
|--|--|--|--|
| NEXT_PUBLIC_OMDB_API_KEY  | You need to assign an [OMDB API Key](https://www.omdbapi.com/)     | bb7b170a | Required |
| NEXT_PUBLIC_MOVIE_BY_ID_PATH            | Base URL for the src/pages/movie route, used for SEO   | http://localhost:3000 | Optional |


Rename file ```.env.TEMPLATE``` to ```.env``` 

```
NEXT_PUBLIC_OMDB_API_KEY=bb7b170a
NEXT_PUBLIC_MOVIE_BY_ID_PATH=http://localhost:3000
```
### Tickets configuration

To add new ticket types and values, you need to modify the ```src/db/tickets.json``` file.

These are the default configured values:
```
[
    {
        "type": "Child",
        "value": 2500
    },
    {
        "type": "Adult",
        "value": 3500
    },
    {
        "type": "Senior",
        "value": 2000
    }
]
```

### Run the application

Run ```yarn dev``` in the root directory and open the URL it indicates, which is usually ```http://localhost:3000```



