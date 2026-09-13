# pick-pack
Pick-Pack is a web-based Q&A application powered by Llama 3.2 3B. It allows users to ask questions and receive AI-generated answers through a simple web interface.
# Frontend
React, Vite, Node.js, JavaScript / TypeScript

## Features
- Interactive 3D Hero Section
  - Displays a 3D model using Three.js.
  - Users can rotate the model using mouse or touch controls.
  - Includes an interactive movement hint.
* 3D Product Carousel
  * Products are displayed in a scroll-driven 3D carousel.
  * Product cards move along the Z-axis based on the user's scroll position.
  * Cards dynamically change opacity depending on their distance from the viewer.
  * Supports alternating left and right positioning. 
- Product Showcase
  - Product information is managed through a centralized product data file.
  - Each product contains an ID, name, and image.
- Contact Section
  - Displays the current Jakarta time in real time.
  - Provides social/contact links for Instagram and TikTok.
  - Uses an interactive tooltip for contact information.
  - Styled to resemble a tablet/iPad interface.
- AI Chatbot Interface
  - Floating chatbot button accessible throughout the website.
  - Displays user and assistant messages.
  - Automatically scrolls to the latest message.
  - Sends user messages to the backend chat API.
  - Provides a loading state while waiting for the assistant response.
- Responsive Layout
  - Includes responsive behavior for the product carousel.
  - Designed for desktop and tablet-sized screens.

## Tech Stack
- Core
  - React 19 — UI library
  - TypeScript 6 — Type-safe JavaScript
  - Vite 8 — Development server and build tool
- 3D
  - Three.js — 3D rendering
  - React Three Fiber — React renderer for Three.js
  - React Three Drei — Helpers and abstractions for React Three Fiber
- UI & Icons
  - React Icons — Icon library
  - CSS3 — Custom styling and animations
  - Google Fonts — Onest — Primary website font

## Product Data
Product information is stored in:
```bash
src/data/ProductLinks.ts
```

Each product follows the Product interface:
```bash
export interface Product {
  id: number;
  name: string;
  image: string;
}
```

## Chatbot
The chatbot consists of three main components: Chatbot.tsx, ChatForm.tsx, and ChatMessage.tsx

The message structure is defined in:
```bash
src/types/Chat.ts
```

When a user sends a message, the frontend sends a POST request to the chat API.
```bash
POST /chat
```
## Styling
The project uses custom CSS rather than a CSS framework.

The styling includes:
  - Responsive layouts
  - CSS gradients
  - 3D transforms
  - Scroll-based animations
  - Hover effects
  - Tooltip animations
  - Chatbot transitions
  - Custom shadows and borders
  - Google Fonts

## Website Sections
The application is structured into four primary sections: Home, Products, Contact, Chatbot

The main application is composed in App.tsx:
```bash
function App() {
  return (
    <div>
      <Hero />
      <Products />
      <Contact />
      <Chatbot />
    </div>
  );
}
```

# Backend
Python, FastAPI, Uvicorn

## Features
- Product Search
  - Searches products from the CSV dataset.
  - Supports multiple keywords.
  - Searches across product code, description, size, unit, equivalence, and quantity.
- Similar Product Search
  - Finds products based on the main product keyword.
  - Used when the requested product cannot be found.
  - Helps provide alternative products to the user.
- AI Question Analysis
  - Uses Ollama to identify:
  - The product the user is looking for.
  - The main product keyword.
  - The information requested by the user.
- AI-Powered Answer Generation
  - Uses product data as context for generating responses.
  - Answers are generated based only on the available product information.
  - Responses are configured to be in English.
  - Product names are preserved from the original dataset.
- Product Availability Checking
  - Determines whether a requested product exists in the dataset.
  - Provides similar products when the requested product is unavailable.
- REST API
  - Provides a /chat endpoint for frontend chatbot communication.
  - Accepts JSON requests and returns JSON responses.
- CORS Support
  - Configured to allow requests from the frontend application.

## Tech Stack
- Backend
  - Python
  - FastAPI — REST API framework
  - Pydantic — Request data validation
  - Pandas — CSV data processing and searching

- AI Model
The chatbot currently uses:
```bash
llama3.2:3b
```
The model is accessed through the Ollama Python library.

- Data Storage
The product dataset is stored as:
```bash
data/barang.csv
```

## Chatbot Architecture
The chatbot follows this general flow:
```bash
User
 │
 ▼
Frontend Chatbot
 │
 │ POST /chat
 ▼
FastAPI
 │
 ▼
OllamaService
 │
 ├── Analyze user question
 │      │
 │      ├── search
 │      ├── keyword
 │      └── field
 │
 ▼
ExcelService
 │
 ├── Search requested product
 │
 └── Search similar products
 │
 ▼
Product Data
 │
 ▼
OllamaService
 │
 └── Generate answer
 │
 ▼
FastAPI
 │
 ▼
Frontend

```

## Question Analysis
Before searching the product data, the backend sends the user's question to Ollama for analysis.

The three values are then used by the backend:
  - search — Used to search for the requested product.
  - keyword — Used to find similar products when the requested product is unavailable.
  - field — Determines what information the user is requesting.

## Product Search
Product searching is handled by ExcelService.

The main search function supports multiple keywords and searches across:
```bash
Kd_Barang
Keterangan
Ukuran
Satuan
Ekuivalen
Qty
```

## Similar Product Search
When an exact product search does not return any results, the backend performs a broader search using the main product keyword.

## Ollama Integration
The OllamaService handles two main tasks.

1. Question Analysis
```bash
analyze_question(question)
```
This determines:
  - Product search phrase
  - Main product keyword
  - Requested information field

2. Answer Generation
```bash
generate_answer(question, data, field)
```
The product data is passed to Ollama as context.

The model is instructed to:
  - Answer only from the provided product data.
  - Avoid inventing information.
  - Answer in English.
  - Keep product names as they appear in the dataset.
  - Avoid exposing internal implementation details.
  - Keep responses short and natural.

## API
POST /chat
Main endpoint used by the frontend chatbot.

Request
```bash
POST /chat
Content-Type: application/json
```

Request body:
```bash
{
  "message": "Do you have a paper cup?"
}
```

Response
```bash
{
  "answer": "Yes, we have Hot Paper Cup 8 & 9 oz Generic."
}
```
# Installation
## Frontend
Navigate to the frontend folder:
```bash
cd frontend
```
## Install the dependencies:
```bash
npm install
```
## Run the development server:
```bash
npm run dev
```
## Open a new terminal and navigate to the backend folder:
```bash
cd backend
```
## Create and activate a virtual environment:
Windows:
```bash
python -m venv venv
venv\Scripts\activate
```
Linux / macOS:
```bash
python3 -m venv venv
source venv/bin/activate
```
## Install the Python dependencies:
```bash
pip install -r requirements.txt
```
## Make sure Ollama is installed and running, then pull the Llama 3.2 3B model:
```bash
ollama pull llama3.2:3b
```
## Run the FastAPI server:
```bash
uvicorn main:app --reload
```
# AI Model
The chatbot is powered by Llama 3.2 3B.

Please note that the chatbot is still under development and may have limitations in terms of accuracy, response quality, and overall performance. There are still several areas that can be improved, and future development will focus on making the chatbot more reliable, accurate, and capable.
# Demo
## Video Demo
[![Live Demo](https://img.youtube.com/vi/TuTdM6Dctvw/hqdefault.jpg)](https://youtu.be/TuTdM6Dctvw)
## Live Website
https://pick-pack-sage.vercel.app/
⚠️The live website currently showcases the frontend only. The backend and AI features are not available in the deployed version. To test the full application, including the backend and AI functionality, please run the project locally.
