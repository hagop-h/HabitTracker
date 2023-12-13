from flask import Flask, render_template, request, jsonify
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.config['DEBUG'] = True
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///habits.db'  # SQLite database file
db = SQLAlchemy(app)


# Habit model
class Habit(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), nullable=False, unique=True)


# Wrap the creation of tables in app.app_context()
with app.app_context():
    db.create_all()


@app.route('/')
def index():
    habits = Habit.query.all()
    return render_template('index.html', habits=habits)


@app.route('/add_habit', methods=['POST'])
def add_habit():
    habit_name = request.form.get('habitName')

    # Check if the habit already exists
    existing_habit = Habit.query.filter_by(name=habit_name).first()
    if existing_habit:
        return jsonify(message='Habit already exists')

    new_habit = Habit(name=habit_name)
    db.session.add(new_habit)
    db.session.commit()
    return jsonify(message='Habit added successfully')


@app.route('/delete_habit', methods=['POST'])
def delete_habit():
    habit_name = request.form.get('habitName')
    habit = Habit.query.filter_by(name=habit_name).first()

    if habit:
        db.session.delete(habit)
        db.session.commit()
        return jsonify(message='Habit deleted successfully')
    else:
        return jsonify(message='Habit not found')


if __name__ == '__main__':
    app.run(debug=True)
