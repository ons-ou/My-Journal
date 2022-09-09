from flask import Flask, render_template, request

app = Flask(__name__)


@app.route("/", methods=["GET", "POST"])
def index():
    return render_template("index.html")

@app.route("/entries", methods=["GET", "POST"])
def form():
    return render_template("form.html")

if __name__ == '__main__':
    app.run()
