# Polygon-Tool

A full-stack web application that allows users to draw a polygon on a Google Map, view its computed metrics (area, address, etc.), and save the data to a Django backend. Saved polygons can be listed and displayed back on the map for review.

---

## Features

- **Interactive Drawing:** Draw any polygon shape directly onto a Google Map.
- **Real-time Metrics:** Instantly view the calculated area (in square meters) and perimeter (in meters) of the drawn shape.
- **Data Persistence:** Save the polygon's geographic data and its calculated metrics to a PostgreSQL/PostGIS database via a REST API.
- **Geocoding:** Automatically fetches the address and pin code for the drawn polygon's location upon saving.
- **List & View:** See a list of all previously saved polygons and click a button to display any one of them on the map.
- **Dynamic UI:** The list of saved polygons automatically refreshes after a new polygon is saved.

---

## Technology Stack

- **Frontend:**
  - **Framework:** React (with Vite)
  - **Mapping:** `@react-google-maps/api`
  - **API Client:** `axios`
  - **GIS Calculations:** `turf.js`

- **Backend:**
  - **Framework:** Django & Django REST Framework
  - **GIS:** GeoDjango / PostGIS
  - **Database Adapter:** `psycopg2`
  - **Environment:** Python 3.11

- **Database:**
  - PostgreSQL with the PostGIS extension

- **Development Environment:**
  - **Database:** Docker & Docker Compose
  - **Python:** `pyenv` & `venv`

---
