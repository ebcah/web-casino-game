from flask import Flask, jsonify, render_template

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/open_case', methods=['POST'])
def open_case():
    # Логика открытия кейса и получение награды
    case_items = [
        {"image": "static/item1.png", "name": "Item 1"},
        {"image": "static/item2.png", "name": "Item 2"},
        # Добавьте другие предметы
    ]
    
    reward = {"image": "static/reward.png", "name": "Epic Sword", "price": 500}

    user_items = [
        {"image": "static/item1.png", "name": "Item 1", "price": 100},
        {"image": "static/item2.png", "name": "Item 2", "price": 50},
        # Другие предметы пользователя
    ]

    return jsonify({"items": case_items, "reward": reward, "userItems": user_items})

if __name__ == '__main__':
    app.run(debug=True)
