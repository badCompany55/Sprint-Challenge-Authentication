1. What is the purpose of using sessions?
		The main purpose is it allows the server to store information about a client. This  information can be use a number of different ways including authentication.
2. What does bcrypt do to help us store passwords in a secure manner.
		Bcrypt hashes the users password. The main point of this is that it the hashing process is one way, unlike encryption. This makes the process more secure and much less likely to be hacked. 
3. What does bcrypt do to slow down attackers?
		Hashes the password x number of times. Also due to the process being a one way street, this slows down the attacker as well. 
4. What are the three parts of the JSON Web Token?
		Header
		Payload
		signature
