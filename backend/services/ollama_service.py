import ollama
import json

class OllamaService:

    def __init__(self, model):
        self.model = model

    def analyze_question(self, question):

        prompt = f"""
            You are a system that understands product-related questions.

            User question:
            {question}

            Your task:
            Determine which product the user is looking for and what information the user is requesting.

            Output ONLY valid JSON using this format:

            {{
                "search": "product name or relevant product phrase",
                "keyword": "main product keyword",
                "field": "requested field"
            }}

            Rules for "search":
            - Include the relevant product name or characteristics.
            - Include information such as product name, color, size,
            type, category, or other characteristics mentioned by the user.
            - Do not include words such as:
            "how much", "price", "is there", "find", "looking for", "I want".

            Rules for "keyword":
            - Contains the main product keyword.
            - Do not include a specific size.
            - Do not include a specific color.
            - Do not include quantity.
            - Do not include overly specific attributes.
            - The keyword is used to search for similar products
            if the requested product is not available.

            Examples:
            - "cup size 300 ml" → keyword: "cup"
            - "500 ml botol kecap" → keyword: "botol kecap"
            - "thinwall bowl" → keyword: "thinwall bowl"

            Rules for "field":
            Use one of the following fields:

            - "Harga_Jual" → user asks about price.
            - "Qty" → user asks about quantity, package contents,
            quantity per box, or quantity per pack.
            - "Ukuran" → user asks about product size.
            - "Satuan" → user asks about selling unit.
            - "Ekuivalen" → user asks about product equivalence.
            - "minimum" → user asks about minimum purchase quantity.
            - "Kd_Barang" → user asks about product code.
            - "Kd_Kel." → user asks about group code.
            - "Keterangan" → user asks about product description.
            or general product information.
            - "type" → user asks what type, kind, variant, or model of product is available.
            - "ketersediaan" → user asks whether the product is available.

            Important:
            - Do not answer the user's question.
            - Do not provide explanations.
            - Do not use Markdown.
            - Output ONLY valid JSON.

            User question:
            {question}
            """

        response = ollama.chat(
            model=self.model,
            messages=[
                {
                    "role": "user",
                    "content": prompt
                }
            ]
        )

        content = response["message"]["content"].strip()

        try:
            return json.loads(content)

        except json.JSONDecodeError:
            return {
                "search": content,
                "keyword": content,
                "field": "Keterangan"
            }

    def generate_answer(self, question, data, field):

        prompt = f"""
            You are an English-speaking product chatbot.

            Answer the user's question ONLY based on the provided
            product data.

            User question:
            {question}

            Requested information:
            {field}

            Product data:
            {json.dumps(data, ensure_ascii=False, indent=2)}

            Language rules:
            1. ALWAYS answer in English.
            2. Never answer in Indonesian.
            3. Keep product names and product descriptions
            exactly as they appear in the product data when possible.
            4. Do not translate product names unnecessarily.

            General rules:
            1. Do not invent information.
            2. Do not mention Kd_Barang unless the user asks
            for the product code.
            3. Use the "Keterangan" column as the product name.
            4. If the user asks about price, use "Harga_Jual".
            5. If the user asks about size, use "Ukuran".
            6. If the user asks about availability,
            answer based only on the provided product data.
            7. If the user asks for complete information,
            show the important available information.
            8. If a field is empty, do not invent its value.
            9. Keep the answer short, clear, and natural.
            10. Do not mention the search process, JSON, database,
                CSV, or internal code.

            Answer:
            """

        response = ollama.chat(
            model=self.model,
            messages=[
                {
                    "role": "user",
                    "content": prompt
                }
            ]
        )

        return response["message"]["content"].strip()
