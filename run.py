import random
from flask import Flask, render_template, request

app = Flask(__name__)

arr_row = [random.randint(0, 20) for _ in range(7)]
arr_column = [random.randint(0, 100) for _ in range(24)]

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/api/get", methods=["POST", "GET"])
def api():
    if request.method == "POST":
        params = request.get_json(True)
        data = {
            "i" : f"row content: {arr_row[params['i']]}",
            "j" : f"column content is {arr_column[params['j']]}"
        }
        return {"status": "OK", "method": "POST", "data": render_template('card.html', data=data)}
    return {"status": "OK", "method": "GET"}


if __name__ == "__main__":
    app.run(port=5001)