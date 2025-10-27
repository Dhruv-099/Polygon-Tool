# Polygon-Tool
# Polygon Area Selector

A web application that allows users to draw polygons on a Google Map, view computed metrics (area, perimeter, address), and save this data to a Django backend. Saved polygons can also be viewed.

## Table of Contents
- [Project Overview](#project-overview)
- [Technology Stack](#technology-stack)
- [Setup Instructions](#setup-instructions)
    - [Prerequisites](#prerequisites)
    - [Backend Setup](#backend-setup)
    - [Frontend Setup](#frontend-setup)
- [API Documentation](#api-documentation) (To be added)
- [Assumptions and Decisions](#assumptions-and-decisions) (To be added)
- [Deployment](#deployment) (To be added)

## Project Overview
- Frontend: Single-page application for drawing polygons and displaying metrics.
- Backend: REST API built with Django to manage polygon data.

## Technology Stack
- **Frontend:** React (with Vite)
- **Backend:** Django, Django REST Framework, PostGIS, Python 3.11.12
- **Database:** PostgreSQL with PostGIS extension

## Setup Instructions

### Prerequisites
- Git
- Node.js (v18+) & npm (or yarn)
- Python 3.11.12 (managed with `pyenv` recommended)
- PostgreSQL (v12+) with PostGIS extension installed and enabled
- A Google Maps API Key (for both client-side map and server-side geocoding)

### Backend Setup

1.  **Navigate to the backend directory:**
    ```bash
    cd backend
    ```
2.  **Set Python version and activate virtual environment:**
    ```bash
    pyenv local 3.11.12
    python -m venv .venv
    source .venv/bin/activate
    ```
3.  **Install dependencies:**
    ```bash
    pip install -r requirements.txt
    ```


4.  **Database Configuration (coming soon)**
    - Create a `.env` file for database credentials.
    - Run migrations.

### Frontend Setup

1.  **Navigate to the frontend directory:**
    ```bash
    cd frontend
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    ```
3.  **Environment Variables (coming soon)**
    - Create a `.env.local` file for Google Maps API key.

4.  **Start the development server:**
    ```bash
    npm run dev
    ```