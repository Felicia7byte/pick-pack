from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware

from services.excel_service import ExcelService
from services.ollama_service import OllamaService

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

excel_service = ExcelService("data/barang.csv")
ollama_service = OllamaService("llama3.2:3b")

class ChatRequest(BaseModel):
    message: str

@app.post("/chat")
def chat(request: ChatRequest):
    question = request.message

    analysis = ollama_service.analyze_question(question)
    search = analysis["search"]
    keyword = analysis["keyword"]
    field = analysis["field"]

    # Search the product
    result = excel_service.search(search)

    print("SEARCH:", search)
    print("KEYWORD:", keyword)
    print("FIELD:", field)
    print("RESULT COUNT:", len(result))

    # if user ask about the product
    if field == "type":
        result = excel_service.search_similar(keyword)

        products = result.head(10)

        product_list = []

        for _, row in products.iterrows():

            name = str(row["Keterangan"]).strip()
            ukuran = str(row["Ukuran"]).strip()
            harga = str(row["Harga_Jual"]).strip()

            text = name

            if ukuran:
                text += f" ({ukuran})"

            if harga:
                text += f" - IDR {harga}"

            product_list.append(text)

        return {
            "answer": (
                f"We sell several types of {keyword}s:\n\n"
                + "\n".join(
                    f"- {product}"
                    for product in product_list
                )
            )
        }

    if field == "ketersediaan":
        # Exact product found
        if not result.empty:
            return {
                "answer": f"Yes, the {search} is available."
            }

        # Exact product not found,
        # search for similar products using keyword
        similar_result = excel_service.search_similar(keyword)

        if similar_result.empty:
            return {
                "answer": f"No, we don't have the {search} available."
            }

        products = similar_result.head(10)

        product_list = []

        for _, row in products.iterrows():

            name = str(row["Keterangan"]).strip()
            ukuran = str(row["Ukuran"]).strip()
            harga = str(row["Harga_Jual"]).strip()

            text = name

            if ukuran:
                text += f" ({ukuran})"

            if harga:
                text += f" - IDR {harga}"

            product_list.append(text)

        return {
            "answer": (
                f"No, the {search} is not available. "
                f"However, we have these similar products:\n\n"
                + "\n".join(
                    f"- {product}"
                    for product in product_list
                )
            )
        }


    # Product not found
    if result.empty:

        similar_result = excel_service.search_similar(keyword)

        if similar_result.empty:
            return {
                "answer": f"Sorry, the product you are looking for ({search}) is not available."
            }

        products = similar_result.head(5)

        product_list = []

        for _, row in products.iterrows():

            name = str(row["Keterangan"]).strip()
            ukuran = str(row["Ukuran"]).strip()
            harga = str(row["Harga_Jual"]).strip()

            text = name

            if ukuran:
                text += f" ({ukuran})"

            if harga:
                text += f" - IDR {harga}"

            product_list.append(text)

        answer = (
            f"Sorry, the product you are looking for ({search}) is not available. "
            f"However, we have some similar products:\n\n"
            + "\n".join(
                f"- {product}"
                for product in product_list
            )
        )

        return {
            "answer": answer
        }
    
    # Product has found
    data = result.to_dict(orient="records")

    answer = ollama_service.generate_answer(
        question,
        data,
        field
    )

    return {
        "answer": answer
    }