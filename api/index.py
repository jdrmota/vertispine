from flask import Flask
from flask import request
app = Flask(__name__)

@app.route("/api/python", methods=['GET'])
def hello_world():
    username = request.args.get('username')
    return {"message": username}