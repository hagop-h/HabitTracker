from flask import Flask, render_template, request, jsonify

app = Flask(__name__)
app.config['DEBUG'] = True

# Dummy habit data (replace with a database later)
habits = []

@app.route('/')
def index():
    return render_template('index.html', habits=habits)

@app.route('/add_habit', methods=['POST'])
def add_habit():
    habit_name = request.form.get('habitName')
    habits.append(habit_name)
    return jsonify(message='Habit added successfully')

@app.route('/delete_habit', methods=['POST'])
def delete_habit():
    habit_name = request.form.get('habitName')
    if habit_name in habits:
        habits.remove(habit_name)
        return jsonify(message='Habit deleted successfully')
    else:
        return jsonify(message='Habit not found')

if __name__ == '__main__':
    app.run(debug=True)
