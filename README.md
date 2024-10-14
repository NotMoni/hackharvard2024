## Inspiration
The inspiration behind Teaching Assassin came from our collective experiences as students and teaching assistants. Krish is a TA at Northeastern University, Monishwar taught classes online, Ganeshkumar taught Java, and Ayman conducted research on how students learn effectively. As a team, we all shared a passion for education and recognized the common challenges students face.

We wanted to address issues such as unclear lectures, high teacher-to-student ratios, lack of personalized feedback, and not knowing the most effective way to study for a subject. Many students struggle with how to structure their learning for tests, midterms, or assignments, not knowing what questions to ask themselves. With Teaching Assassin, we set out to create an edtech platform that provides personalized learning techniques tailored to each student's unique needs, helping them discover the best way to study.

## What it does
Teaching Assassin is designed to help students identify their optimal learning strategies. Here's how it works:

The app asks four preliminary questions based on research in learning methodologies.
The first two questions help determine the type of resource a student might need. Students rate the subject on a scale from 1 to 4, with 1 being declarative knowledge (factual) and 4 being procedural knowledge (how-to).
Then, students choose a level from Bloom's Taxonomy, which helps the app suggest a learning activity—whether it's a quiz, flashcards, long-answer questions, or project-based learning.
The platform presents these suggestions in an intuitive, interactive UI. Students can engage with flashcards, take quizzes, answer questions, and verify their learning.
Additionally, users can save their study materials as a PDF or download them in a reusable format, making it convenient for future use.

## How we built it
To build Teaching Assassin, we conducted research on various learning methodologies and their effectiveness, particularly focusing on how technology can help students by delivering these benefits at scale. We chose a web app format to ensure easy access for all users.

The tech stack includes:

Frontend: React with Bootstrap for building a clean and easy-to-navigate interface.
Backend: Node.js and Express, with integration of the OpenAI API for generating relevant questions and study materials based on user inputs.

Deployment: The app is hosted on Cloudflare and Heroku to ensure stability and scalability.

Throughout development, we focused on creating a smooth user experience with a clean design and calming color tones to make studying a pleasant and focused experience.

## Challenges we ran into
Choosing the Right Tech Stack: Balancing ease of development with the performance requirements of the platform was initially tricky.

Structuring User Input: It was challenging to turn unstructured user input into valuable, structured output in a meaningful way.

Optimizing GPT Responses: We had to spend time figuring out how to prompt the OpenAI API effectively to generate relevant learning materials for different use cases.

Frontend-Backend Integration: Dealing with CORS errors while integrating the backend with the front end was a significant hurdle.

Deployment: We faced a few complications with deployment, ensuring that the platform remained stable and accessible to users.

## Accomplishments that we're proud of

Successfully deploying the app and overcoming the challenges we faced.

Building an intuitive, user-friendly interface that helps students learn in a more structured, effective way.

Integrating academic research into our platform and utilizing modern technologies like GPT to provide personalized learning resources.

## What we learned

We deepened our understanding of frontend and backend development, learned how to deploy web apps more efficiently, and improved our skills in integrating APIs and leveraging large language models (LLMs) like GPT for specific tasks.

We also gained valuable experience in designing interactive UI elements to enhance user engagement.

## What's next for Teaching Assassin

AI-Based Performance Tracking: We plan to implement adaptive question difficulty metrics that adjust to the student's progress.

More Learning Techniques: We aim to expand the types of learning techniques available to better serve different types of learners.

Study Schedules: Teaching Assassin will eventually provide tailored schedules for upcoming deadlines, midterms, or exams to help students stay on top of their studies.


P.S Backend code in main branch, frontend code in frontend branch
