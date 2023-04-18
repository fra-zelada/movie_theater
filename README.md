# Movie Theater App

Aplicación que simula la compra de entradas para un cine. 

Se utilizan técnicas de React + Next.js para lograr simular el proceso de selección de tickets. Toda la información de tickets es manejada a través de Context API en conjunto con el local storage.

## Para iniciar la aplicación:

### Configurar Variables de Entorno

Renombrar archivo ```.env.TEMPLATE``` a ```.env```

Se debe asignar una [Api Key de OMDB](https://www.omdbapi.com/) , puede usarse esta para el ejemplo ```bb7b170a```
```
NEXT_PUBLIC_OMDB_API_KEY=bb7b170a
```
### Configuraciones

Para agregar nuevos tipos de ticket y valores se debe modificar el archivo ```src/db/tickets.json```

Estos son los valores que vienen configurados por defecto:
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

### Ejecutar la aplicación

Ejecutar en el directorio raiz ```yarn dev``` y abrir en la URl que indique, por lo general es ```http://localhost:3000```



## Resumen técnico

Se agregaron las siguientes dependencias: 

| Dependency     | Use                               |
|--|--|
| react-qr-code  | Creating QR codes for tickets     |
| swr            | Handling cache and pagination    |
| tailwindcss    | Styling the application           |

Algunas de las tecnologías utilizadas en este proyecto:

| Name | Used for | files |
|--|--|--|
| getServerSideProps | Used to load data for the first page of the home | - src/pages/index.tsx |
| ISR : <br> getStaticPaths <br> getStaticProps  | Used in generating the page for each movie | - src/pages/movie/[...slug].tsx |
| SWR  | Requests and cache handling for browsing the pages of the home | - src/hooks/useMovieList.ts |
| next/head for SEO  | Applied in the Layout of each movie page | - src/layouts/MovieLayout.tsx |
| Context API  | Global state management | - src/context/... |