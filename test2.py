from lib2to3.pgen2 import token
import requests
token = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOm51bGwsImlzcyI6IjVNUHV4ZTR5UVYtYldHclFYU1N1ZUEiLCJleHAiOjE2NDg3NTEzOTksImlhdCI6MTY0MTI3NjgxOH0.yyppd6thcgti7NhfMYx3jUJiU1RpJr-Dipa3hTx4914"

r = requests.get("https://api.zoom.us/v2/users/jovy@mirobotic.sg/meetings",
                 headers={"Authorization": "Bearer "+token})

print(r.json())
