from flask import Flask, render_template, jsonify

app = Flask(__name__)

they_can_drop = [
    {"name": "Legendary Item", "img": "ico2n.png", "price": 100},
    {"name": "Epic Item 1", "img": "icon.2png", "price": 40},
    {"name": "Epic Item 2", "img": "icon2.png", "price": 40},
    {"name": "Epic Item 3", "img": "icon.2png", "price": 40},
    {"name": "Epic Item 4", "img": "icon2.png", "price": 40},
    {"name": "Rare Item 1", "img": "icon2.png", "price": 20},
    {"name": "Rare Item 2", "img": "icon2.png", "price": 20},
    {"name": "Rare Item 3", "img": "icon2.png", "price": 20},
    {"name": "Rare Item 4", "img": "icon2.png", "price": 20},
    {"name": "Rare Item 5", "img": "icon2.png", "price": 20},
    {"name": "Rare Item 6", "img": "icon2.png", "price": 20},
    {"name": "Rare Item 7", "img": "icon.2png", "price": 20},
    {"name": "Rare Item 8", "img": "icon.2p2ng", "price": 20},
    {"name": "Rare Item 9", "img": "icon.p2ng", "price": 20},
    {"name": "Rare Item 10", "img": "icon.2png", "price": 20},
    {"name": "Common Item 1", "img": "icon2.png", "price": 10},
    {"name": "Common Item 2", "img": "icon2.png", "price": 10},
    {"name": "Common Item 3", "img": "icon2.png", "price": 10},
    {"name": "Common Item 4", "img": "icon2.png", "price": 10},
    {"name": "Common Item 5", "img": "icon2.png", "price": 10},
    {"name": "Common Item 6", "img": "icon2.png", "price": 10},
    {"name": "Common Item 7", "img": "icon2.png", "price": 10},
    {"name": "Common Item 8", "img": "icon2.png", "price": 10},
    {"name": "Common Item 9", "img": "icon2.png", "price": 10},
    {"name": "Common Item 10", "img": "ic2on.png", "price": 10},
    {"name": "Worse Item 1", "img": "icon2.png", "price": 5},
    {"name": "Worse Item 2", "img": "icon2.png", "price": 5},
    {"name": "Worse Item 3", "img": "icon2.png", "price": 5},
    {"name": "Worse Item 4", "img": "icon2.png", "price": 5},
    {"name": "Worse Item 5", "img": "icon2.png", "price": 5},
    {"name": "Worse Item 6", "img": "icon2.png", "price": 5},
    {"name": "Worse Item 7", "img": "icon2.png", "price": 5},
    {"name": "Worse Item 8", "img": "icon2.png", "price": 5},
    {"name": "Worse Item 9", "img": "icon2.png", "price": 5},
    {"name": "Worse Item 10", "img": "icon2.png", "price": 5},
]

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/api/items')
def get_items():
    return jsonify(they_can_drop)

if __name__ == '__main__':
    app.run(debug=True)
