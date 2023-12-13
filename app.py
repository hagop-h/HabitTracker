from flask import Flask, render_template, request, jsonify
from flask_sqlalchemy import SQLAlchemy

# Create a Flask application
app = Flask(__name__)

# Set the application configurations for debugging and SQLite database
app.config['DEBUG'] = True
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///habits.db'  # SQLite database file

# Initialize SQLAlchemy with the Flask application
db = SQLAlchemy(app)


# Define the Habit model with 'id' as the primary key and 'name' as a unique, non-nullable string field
class Habit(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), nullable=False, unique=True)


# Create the tables within the Flask app context
with app.app_context():
    db.create_all()


# Define a route for the homepage that retrieves all habits from the database and renders the template
@app.route('/')
def index():
    habits = Habit.query.all()
    return render_template('index.html', habits=habits)


# Define a route to add a new habit using data from the POST request
@app.route('/add_habit', methods=['POST'])
def add_habit():
    habit_name = request.form.get('habitName')

    # Check if the habit already exists
    existing_habit = Habit.query.filter_by(name=habit_name).first()
    if existing_habit:
        return jsonify(message='Habit already exists')

    # Create a new Habit instance and add it to the database
    new_habit = Habit(name=habit_name)
    db.session.add(new_habit)
    db.session.commit()
    return jsonify(message='Habit added successfully')


# Define a route to edit an existing habit using data from the POST request
@app.route('/edit_habit', methods=['POST'])
def edit_habit():
    habit_id = request.form.get('habitId')
    new_text = request.form.get('newText')

    # Retrieve the habit from the database using its ID
    habit = Habit.query.get(habit_id)
    if habit:
        # Update the habit's name and commit the changes to the database
        habit.name = new_text
        db.session.commit()
        return jsonify(message='Habit edited successfully')
    else:
        return jsonify(message='Habit not found')


# Define a route to delete an existing habit using data from the POST request
@app.route('/delete_habit', methods=['POST'])
def delete_habit():
    habit_name = request.form.get('habitName')

    # Retrieve the habit from the database using its name
    habit = Habit.query.filter_by(name=habit_name).first()

    if habit:
        # Delete the habit and commit the changes to the database
        db.session.delete(habit)
        db.session.commit()
        return jsonify(message='Habit deleted successfully')
    else:
        return jsonify(message='Habit not found')


# Run the application if executed as the main script
if __name__ == '__main__':
    app.run(debug=True)
