from flask import Flask, render_template

app = Flask(__name__)

# Example data for the case
case_data = {
    'title': 'Снова на завод',
    'items': [
        {"name": "Legendary Item", "img": "icon.png", "price": 100},
        {"name": "Epic Item 1", "img": "icon.png", "price": 40},
        {"name": "Rare Item 1", "img": "icon.png", "price": 20},
        {"name": "Common Item 1", "img": "icon.png", "price": 10},
        {"name": "Worse Item 1", "img": "icon.png", "price": 5},
    ]
}

@app.route('/')
def home():
    return render_template('case_simulator.html', case=case_data)

if __name__ == '__main__':
    app.run(debug=True)
