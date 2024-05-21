import jwt

# Received token
token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IlN1YmhhbSIsInVzZXJJRCI6MTIzLCJleHAiOjE3MTYyNjgwNzh9.pU-hGQ0M2"

# Secret key
secret = "your_secret_key"

try:
    decoded = jwt.decode(token, secret, algorithms=['HS256'])
    print(decoded)
except jwt.exceptions.JWTError as e:
    print("Invalid JWT:", e)
