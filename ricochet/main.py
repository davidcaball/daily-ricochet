from flask import Flask, Blueprint, render_template, request, url_for, redirect
from flask_sqlalchemy import SQLAlchemy
from flask_login import login_required, current_user
from .models import User, Scores, Board
from datetime import datetime
from . import db




main = Blueprint('main', __name__)



@main.route("/")
def home():
 
    scores = db.session.query(User, Scores).filter(Scores.user_id==User.user_id).order_by(Scores.score.asc()).all()
    print(scores)

    return render_template('index.html',scores=scores)


@main.route("/submit", methods=["POST"])
def submit():

    # print(f"{request.args=}")
    # print(f"{request.form=}")
    # print(f"{request.values=}")
    # print(f"{request.json=}")


    score = request.form.get("score")
    target_id = request.form.get("target_id")

    print(f'{score=}  {target_id=}')

    new_score = Scores(board_id='1', target=target_id, user_id=current_user.user_id, score=score, day=datetime.now().strftime("%Y-%m-%d %H:%M:%S"))

    # add the new user to the database
    db.session.add(new_score)
    db.session.commit()

    return redirect(url_for('main.home'))




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



