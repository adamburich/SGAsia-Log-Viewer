from flask import Flask, redirect, url_for, render_template, request, flash
from flask_cors import CORS, cross_origin

app = Flask(__name__)
CORS(app)


@app.route('/', methods=['GET', 'POST'])
def hello():
    return render_template('base.html')
