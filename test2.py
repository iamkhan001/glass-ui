from time import time
import requests

url = "https://api.zoom.us/v2/meetings/73549523278/batch_registrants"

payload = '{ "auto_approve":true, "registrants": [ { "first_name": "Imran", "last_name": "Khan", "email": "email1@gmail.com" }, { "first_name": "Jovy", "last_name": "Chiu", "email": "email2@gmail.com" } ] }'
headers = {
    'authorization': "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOm51bGwsImlzcyI6IjVNUHV4ZTR5UVYtYldHclFYU1N1ZUEiLCJleHAiOjE2NTQwMjE3NDAsImlhdCI6MTY0MzY4NzE3M30.Z7dTon3IlnPEKlZBPOyg-Qez4he3NzUEzHweC49urvo",
    'content-type': "application/json"
}

response = requests.request("POST", url, data=payload, headers=headers)

print(response.text)


print(int(time()))
print(time())
