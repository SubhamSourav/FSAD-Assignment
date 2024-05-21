import jwt
import time
from cryptography.hazmat.primitives import serialization

private_key = open('./.ssh/id_rsa', 'r').read()
private_key = serialization.load_ssh_private_key(private_key.encode(), password=b'')
public_key = open("./.ssh/id_rsa.pub",'r').read()
public_key = serialization.load_ssh_public_key(public_key.encode())

payload = {
    "username": "Subham Sourav Brahma",
    "BitsID": 86,
    "exp": int(time.time()) + 60 * 60 
}

token = jwt.encode(payload,private_key,algorithm='RS256')

print('Token is '+token)

try:
    decoded = jwt.decode(token,public_key,algorithms=['RS256'])
    print("Decoded Payload is ", decoded)
except jwt.exceptions.PyJWTError as e:
    print("Invalid JWT:", e)