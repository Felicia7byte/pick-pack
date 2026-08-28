import pandas as pd
import json

class ExcelService:
    def __init__(self, file_path):
        self.df = pd.read_csv(file_path)
        self.df = self.df.fillna("")

        # Remove rows without a product code
        self.df = self.df[
            self.df["Kd_Barang"].astype(str).str.strip() != ""
        ]

        self.df = self.df.reset_index(drop=True)

    def get_context(self):
        data = self.df.to_dict(orient="records")

        return json.dumps(
            data,
            indent=2,
            ensure_ascii=False
        )

    def search(self, keyword):
        keywords = str(keyword).lower().strip().split()

        columns = [
            "Kd_Barang",
            "Keterangan",
            "Ukuran",
            "Satuan",
            "Ekuivalen",
            "Qty"
        ]

        result = self.df.copy()

        for word in keywords:

            mask = False

            for column in columns:
                mask = mask | (
                    result[column]
                    .astype(str)
                    .str.lower()
                    .str.contains(word, na=False)
                )

            result = result[mask]

        return result

    def search_similar(self, keyword):
            """
            Search for products based on the main keyword.

            Example:
            'cup' -> returns all products containing the word 'cup'
            """

            keyword = str(keyword).lower().strip()

            if not keyword:
                return self.df.iloc[0:0]

            columns = [
                "Keterangan",
                "Ukuran",
                "Satuan",
                "Ekuivalen",
                "Qty"
            ]

            mask = False

            for column in columns:
                mask = mask | (
                    self.df[column]
                    .astype(str)
                    .str.lower()
                    .str.contains(keyword, na=False)
                )

            return self.df[mask]