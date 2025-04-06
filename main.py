from flask import Flask, request, jsonify
from datetime import datetime
from flask_cors import CORS
from flask_cors import cross_origin
app = Flask(__name__)
CORS(app, origins="*")
user_1_info = {
    "name": "Abdul Mannan",
    "email": "abdulmannan34695@gmail.com",
    "account": {
        "id": "11817452",
        "balance": 500
    }
}

user_1_transactions = [
    {"From": "183883", "amt": "+500", "date": "2024-03-15"},
    {"To": "118374", "amt": "-200", "date": "2024-03-16"}
]

user_1_loan_history = [
        {"amount": 100, "type": "Tuition loan", "date": "2023-01-01"},
        {"amount": 200, "type": "Tuition loan", "date": "2023-01-02"}
]

user_2_info = {
    "name": "Fayez Ahmed",
    "email": "fayez.ahmed@example.com",
    "account": {
        "id": "25436789",
        "balance": 1000
    }
}

user_2_loan_history =[
        {"amount": 100, "type": "Car loan", "date": "2023-01-01"},
        {"amount": 200, "type": "Home loan", "date": "2023-01-02"}
]

user_2_transactions = [
    {"From": "183883", "amt": "+1000", "date": "2024-03-15"},
    {"To": "118374", "amt": "-300", "date": "2024-03-16"}
]






@app.route("/get_balance", methods=["POST"])
@cross_origin(supports_credentials=True)
def get_balance():
    data = request.json
    account_id = data.get("args", {}).get("id", "").strip()
    # account_id=data.get("id","").strip()
    print(account_id)
    if user_1_info["account"]["id"] == account_id:
        return jsonify({"balance": user_1_info["account"]["balance"]})
    return jsonify({"error": "Account ID not found"}), 404

@app.route("/make_transaction", methods=["POST"])
def make_transaction():
    data = request.json
    to_account = data.get("args", {}).get("to_account", "").strip()
    amount = float(data.get("args", {}).get("amount", 0))
    
    if to_account != user_2_info["account"]["id"]:
        return jsonify({"error": "Invalid recipient account number"}), 404
        
 
    if user_1_info["account"]["balance"] < amount:
        return jsonify({"error": "Insufficient balance"}), 400
        
    user_1_info["account"]["balance"] -= amount
    user_2_info["account"]["balance"] += amount
    
    transaction_user1 = {
        "To": to_account,
        "amt": f"-{amount}",
        "date": "2024-03-17"
    }
    transaction_user2 = {
        "From": user_1_info["account"]["id"],
        "amt": f"+{amount}",
        "date": "2024-03-17"
    }
    
    user_1_transactions.append(transaction_user1)
    user_2_transactions.append(transaction_user2)
    
    return jsonify({
        "new_balance": user_1_info["account"]["balance"]
    })

@app.route("/get_loan", methods=["POST"])
def get_loan():
    data = request.json
    loan_type = data.get("args", {}).get("loan_type", "").strip()
    amount = float(data.get("args", {}).get("amount", 0))
    
    if not loan_type or amount <= 0:
        return jsonify({"error": "Invalid loan type or amount"}), 400
        
    new_loan = {
        "amount": amount,
        "type": loan_type,
        "date": datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    }
    user_1_loan_history.append(new_loan)
    
    user_1_info["account"]["balance"] += amount
    
    transaction = {
        "From": "LOAN",
        "amt": f"+{amount}",
        "date": datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    }
    user_1_transactions.append(transaction)
    
    return jsonify({
        "message": "Loan added successfully",
        "loan_history": user_1_loan_history,
        "new_balance": user_1_info["account"]["balance"]
    })



@app.route("/login", methods=["POST"])
def login():
    data = request.json
    email = data.get("email", "").strip().lower()

    for user in [user_1_info, user_2_info]:
        if user["email"].lower() == email:
            return jsonify({
                "name": user["name"],
                "email": user["email"],
                "accountId": user["account"]["id"],
                "balance": user["account"]["balance"]
            })

    return jsonify({"error": "Email not found"}), 404


@app.route("/get_transactions", methods=["POST"])
def get_transactions():
    data = request.json
    email = data.get("email", "").strip().lower()

    if email == user_1_info["email"].lower():
        return jsonify(user_1_transactions)

    elif email == user_2_info["email"].lower():
        return jsonify(user_2_transactions)

    return jsonify({"error": "User not found"}), 404

@app.route("/get_hist", methods=["POST"])
def get_loans():
    data = request.json
    email = data.get("email", "").strip().lower()

    if email == user_1_info["email"].lower():
        return jsonify(user_1_loan_history)

    elif email == user_2_info["email"].lower():
        return jsonify(user_2_loan_history)

    return jsonify({"error": "User not found"}), 404

if __name__ == "__main__":
    app.run(port=5000)