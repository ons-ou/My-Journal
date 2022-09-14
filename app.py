from datetime import datetime

from flask import render_template, request

from auth.server import *
from models.models import Entry


@app.route("/")
def index():
    return render_template("index.html", session=session.get("user"))


@app.route("/entries/new", methods=["GET", "POST"])
def form():
    user = session.get("user")
    if not user:
        return redirect(url_for("login"))
    return render_template("new_entry.html")


@app.route("/entries/", methods=["GET", "POST"])
def entries():
    user = session.get("user")
    if not user:
        return redirect(url_for("login"))
    if request.method == "POST":
        response = request.json
        entry = Entry(date=datetime.today(), mood=response["mood"],
                      goals=response["goals"],
                      thanks=response["thanks"],
                      tries=response["tries"],
                      thoughts=response["thoughts"],
                      user_id=user)
        entry.insert()
        return response
    else:
        entries = User.query.get(user).short()["entries"]
        for ent in entries:
            for key in ent.keys():
                if key != "mood" and key != "date":
                    if ent[key].find(" \n ") != -1:
                        ent[key] = ent[key].split(" \n ")
                    else:
                        ent[key] = [ent[key]]
        entries = [{key: val for key, val in ent.items() if val != [""]} for ent in entries]
        return render_template("entry.html", entries=entries)


if __name__ == "__main__":
    app.run(host="127.0.0.1", port=env.get("PORT", 3000), debug=True)
