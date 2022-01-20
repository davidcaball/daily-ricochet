from flask import Flask, Blueprint, render_template, request
from flask_sqlalchemy import SQLAlchemy
from . import db
from .models import User, Scores, Board




main = Blueprint('main', __name__)



@main.route("/")
def home():
 
    scores = db.session.query(User, Scores).filter(Scores.user_id==User.user_id).order_by(Scores.score.asc()).all()
    print(scores)

    return render_template('index.html',scores=scores)



@main.route("/home_leaderboard")
def get_home_leaderboard():

    print(request.args)

    return_all = False
    try:
        target_id = int(request.args.get("target_id"))
    except ValueError:
        return_all = True

    scores = db.session.query(User, Scores).filter(Scores.user_id==User.user_id)

    if not return_all:
        scores = scores.filter(Scores.target==target_id).order_by(Scores.score.asc()).all()

    for score in scores:
        print(score[1])
        print(score[1].target)
        print(score[1].target == target_id)

    return render_template('table.html', scores=scores, target_id=target_id)



