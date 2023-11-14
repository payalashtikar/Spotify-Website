# Spotify-Website# Spotify-Website

### FLOW OF THE PROJECT ###
1. You directly lan to the landing page component , from there you can able to select whether you want to login or register
2. if login , then jump on to the login component directly
3. else , on to the register component then login page
4. after login page you will able to redirect to the homepage
5. from homepage you can able to see all songs , all artist , top songs , top artist
6. you can also able to give rating to the song and song list will update as per the rating count
7. can able to add songs
8. can able to add artist (if artist is not available inside dropdown, first add then select)
9. songs and artist list will update based on their ratings
10. In artist you can able to see 1 artist can have multiple songs and one song can be sung by multiple artist as well


### Done things in Server side ###
1. DB Connection
2. defined models and managed with their relationship(artist,song,user)
3. defined routes seperately
4. used environment variable to keep private data confidential
5. able to rate songs
6. can't able to create same song again (if name same of the created song and the song already present , then song will not create)
7. 

### API's Done ###
1. login
2. register
3. able to create songs
4. able to fetch songs
5. able to get top 10 songs
6. able to create artist
7. able to fetch artist
8. able to get top 10 artist
9. able to add songs
10. able to add artists
11. able to rate the song


### Done things in Client side #
1. register component
2. login component
3. Landingpage component
4. Home component
5. Navbar component
6. GetAllSongs component
7. GetAllArtist component
8. AddSongs component
9. AddArtist component
10. TopSongs component
11. TopArtist component


### if you want to run the project ###
1. clone repository
2. go to client -> npm install -> npm start
3. go to server -> npm install -> add .env file with some data ( port no. , database link ,secretkey)
