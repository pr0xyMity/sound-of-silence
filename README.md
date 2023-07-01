# 📖 Sound of Silence
Introducing "Sound of Silence" a revolutionary app designed to **enhance your reading experience** by immersing you in a world of **soundscapes that perfectly complement each chapter** of your favorite **book**. Sound of Silence brings literature to life by adding **an auditory dimension**, creating a captivating and immersive storytelling experience like never before.

![SoundOfSilence](https://github.com/pr0xyMity/sound-of-silence/assets/18540580/ad4654b4-f66b-4c78-b03b-f541e45df499)

# Introduction:
Imagine an apple, done easy. 
Let's read a paragraph and imagine it. 

```
"The forest seemed darker and further torn apart from the rest of the village.
The wind blew in the tree crowns, making them dance in a noisy wave of thousands of green leaves."
```

You can see that, can't you?
But imagine reading that with the **added sound** of exactly this: a **living forest**. To not only image but feel that **with more senses**. That is what the sound of silence is all about.

# Instructions
Each book is split into chapters, but not the conventional, we split by sound theme that will be plaing throught the, as we call it, **sound chapters**.
The book is divided into those sound chapters by pages range. In example a book called "Name of the Wind" by "Patrick Rothfuss" may have 92 sound chapters.

**Example**:
Book: Name of the Wind
Now playing sound chapter: **[34-55]** -> from page 34-55 will be played the same soundscape on repeat.

But not all books have the same pages across the whole book!
Yes, that's why we use ISBNs. A quote Wikipedia:
```
International Standard Book Number (ISBN) is a numeric commercial book identifier that is intended to be unique.
```
That's why we will know exactly all the book details of that unique book copy. 

## How to run
### ![NestJS](https://img.shields.io/badge/nestjs-%23E0234E.svg?style=for-the-badge&logo=nestjs&logoColor=white) - Server
Navigate to the backend folder, and in there:

```bash
# Run local database instance of PostgreSQL on port 5433 (I know that this isn't the default one)
docker compose up -d 
```
This should spin up your Docker Postgres container and create a network.
After database creation, let's specify the credentials.
```bash
# Create a new file in the backend folder called .env in the same folder, you may find a file called .env.example.
# Copy all the example code to your .env file and
# .env should look like this:
NODE_ENV="development"
APP_ENV="local"
PORT=8081
SERVER_URL="http://localhost:${PORT}"

DATABASE_USER=postgress
DATABASE_PASSWORD=postgress
DATABASE_NAME=postgress
DATABASE_PORT=5433
DATABASE_HOST=localhost
```
With all that set, we are now ready to start the server.

Let's go
```bash
# First run the package install script (I'm using pnpm and I encourage you to do so too). 
pnpm install

# After install completes run for running the development build
pnpm run start:dev 
```
After success, you may like to see the swagger with all the endpoints that are currently available.

### ![Flutter](https://img.shields.io/badge/Flutter-%2302569B.svg?style=for-the-badge&logo=Flutter&logoColor=white) - App
The flutter app is being in design phase. Will be available soon

# How it works in details:
1. Book Library: Access curated soundscapes that match different book genres.
2. ISBN Code Integration: Scan or enter the ISBN code to seamlessly integrate the app with your book.
3. Synchronized Soundscapes: Enjoy soundscapes that complement the atmosphere and events of each chapter.
4. Seamless Transitions: Experience uninterrupted reading with smooth transitions between soundscapes with just one click.
5. User-Generated Content (Not MVP): Share and explore unique audio compositions from fellow readers.
