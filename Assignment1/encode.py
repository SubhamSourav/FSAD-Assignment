import jwt
import time

# Secret key
secret = "your_secret_key"

# Payload
payload = {
    "username": "Subham",
    "userID": 123,
    "exp": int(time.time()) + 60 * 60 
}

# Generate JWT
token = jwt.encode(payload, secret, algorithm='HS256')
print(token)
