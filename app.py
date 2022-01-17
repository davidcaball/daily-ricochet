from flask import Flask, render_template, request
from flask_sqlalchemy import SQLAlchemy


app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://root:david203199@localhost/ricochet'
db = SQLAlchemy(app)


class User(db.Model):
    user_id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password  = db.Column(db.String(120), unique=False, nullable=False)

    def __repr__(self):
        return '<User %r: %r>' % (self.user_id, self.username)



class Board(db.Model):
    board_id = db.Column(db.Integer, primary_key=True)
    day = db.Column(db.DateTime)
    board_data = db.Column(db.Text)

    def __repr__(self):
        return '<Board %r>' % self.board_id



class Scores(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    board_id = db.Column(db.Integer,  db.ForeignKey('board.board_id'))
    target = db.Column(db.Integer)
    user_id = db.Column(db.Integer, db.ForeignKey('user.user_id'), nullable=False)
    score = db.Column(db.Integer)
    day = db.Column(db.DateTime)

    def __repr__(self):
        return "<Score_id: %r,  board_id: %r, target: %r, user_id: %r, score: %r>" % (self.id, self.board_id, self.target, self.user_id, self.score)



@app.route("/")
def home():
 
    scores = db.session.query(User, Scores).filter(Scores.user_id==User.user_id).order_by(Scores.score.asc()).all()
    print(scores)

    return render_template('index.html',scores=scores)



@app.route("/home_leaderboard")
def get_home_leaderboard():

    target_id = request.args.get('target_id')

    scores = db.session.query(User, Scores).filter(Scores.user_id==User.user_id).order_by(Scores.score.asc()).all()

    return render_template('table.html', scores=scores, target_id=target_id)