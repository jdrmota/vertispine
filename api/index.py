from flask import Flask

@app.route("/api/python") #, methods=['GET']
def hello_world():
    
    return "Hello World"