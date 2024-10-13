const express = require('express');
const OpenAI = require('openai');
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());


const port = process.env.PORT | 3000;

const key = process.env.OPENAI_API_KEY;

console.log(key);

const openai = new OpenAI({
  apiKey: key,
});
// app.use(express.json());

app.options('*', cors());

function getLearningActivity(cognitiveLevel, learningMode) {
  switch (cognitiveLevel) {
    case 'remember':
      return 'flashcards';
    case 'understand':
      switch (learningMode) {
        case 'pl':
        case 'dl':
          return 'flashcards';
        case 'pm':
        case 'dm':
          return 'long answer';
      }
    case 'apply':
      switch (learningMode) {
        case 'pl':
        case 'dl':
          return 'quiz';
        case 'pm':
        case 'dm':
          return 'long answer';
      }
    case 'analyze':
      return 'long answer';
    case 'evaluate':
      return 'quiz';
    case 'create':
      return 'project';
    default:
      return 'Invalid cognitive level';
  }
}

app.post('/q', async (req, res) => {
  const { bloomLevel, pdfTexts, keyConcepts, subjectType } = req.body;

  let sys_msg = "";
  let usr_msg = "";

  let json_res = "";
  let _text = "";
  let test_format = "";

  for (let i = 0; i < pdfTexts.length; i++) {
    _text += pdfTexts[i].text
  }

  _text += keyConcepts;


  if (subjectType == 1) { // Declarative Low Level
    test_format = getLearningActivity(bloomLevel, "dl");
    sys_msg = `You're a teacher for a class and the class type is Declarative and
    is being tested at a Low Level Mastery (Remember and Understand) on Bloom's Taxonomy
    scale. Type of questions that are common in Declarative Low-Level are Recalling Isolated Facts.`;
  } else if (subjectType == 2) { // Declarative Mid Level
    test_format = getLearningActivity(bloomLevel, "dm");
    sys_msg = `You're a teacher for a class and it is Declarative and is being tested
    at a Mid Level (Apply, Analyze) Mastery on Bloom's Taxonomy scale. Types of
    questions that are common in Declarative Mid-Level are Applying a theoretical concept
    to explain something and explaining Multi-relational Concepts`;
  } else if (subjectType == 3) { // Procedural Low Level
    test_format = getLearningActivity(bloomLevel, "pl");
    sys_msg = `You're a teacher for a class and the class type is Procedural
    and is being tested at a Mid Level (Apply, Analyze) Mastery on Bloom's Taxonomy
    scale. Types of questions that are common in Procedural Low level are Isolated
    process and Simple Problem Solving (applying one concept)`;
  } else if (subjectType == 4) { // Procedural Mid Level
    test_format = getLearningActivity(bloomLevel, "pm");
    sys_msg = `You're a teacher for a class and the class type is Procedural and
    is being tested at a Mid Level (Apply, Analyze) Mastery on Bloom's Taxonomy
    scale. Types of questions that are common in Procedural Mid Level are Multi-relational
    process and Complex Problem Solving (applying more than one concept)`;
  }

  let completion;

  usr_msg = "";


  console.log(test_format);

  if (test_format == 'flashcards') {
    usr_msg = `Read the syllabus provided below and read the previous exam questions and their answers if provided.
      Create a ${test_format} with detailed questions.
      The questions should strictly only center on the specific topics of the syllabus that are on Calculus, and should not test on aspects of the syllabus such as the grading breakdown, learning objectives, the course policies, the academic integrity policy, the accommodation policies, the make-up policies, or the dates to drop down.
      ${_text}`;

    completion = await openai.chat.completions.create({
      messages: [
        { role: "system", content: sys_msg },
        { role: "user", content: usr_msg }
      ],
      model: "gpt-4o",
      response_format: {
        type: "json_schema",
        json_schema: {
          name: "flashcards",
          schema: {
            type: "object",
            properties: {
              category: { "type": "string" },
              cards: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    question: { "type": "string" },
                    answer: { "type": "string" }
                  },
                  required: ["question", "answer"],
                  additionalProperties: false
                }
              }
            },
            "required": ["category", "cards"],
            "additionalProperties": false
          },
          strict: true
        }
      }
    });
  } else if (test_format == 'long answer') {
    usr_msg = `Read the syllabus provided below and read the previous exam questions and their answers if provided.
    Create a ${test_format} with detailed questions. The questions should strictly only center on the specific topics of the syllabus that are on Calculus, and should not test on aspects of the syllabus such as the grading breakdown, learning objectives, the course policies, the academic integrity policy, the accommodation policies, the make-up policies, or the dates to drop down.
    The questions should be those which need a significant amount of reasoning to answer to, and should not be one word answers.
    ${_text}`;
    completion = await openai.chat.completions.create({
      messages: [
        { role: "system", content: sys_msg },
        { role: "user", content: usr_msg }
      ],
      model: "gpt-4o",
      response_format: {
        type: "json_schema",
        json_schema: {
          name: "flashcards",
          schema: {
            type: "object",
            properties: {
              category: { "type": "string" },
              questions: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    question: { "type": "string" },
                    answer: { "type": "string" }
                  },
                  required: ["question", "answer"],
                  additionalProperties: false
                }
              }
            },
            required: ["category", "questions"],
            additionalProperties: false
          },
          strict: true
        }
      }
    });
  } else if (test_format == 'quiz') {
    usr_msg = `Read the syllabus provided below and read the previous exam questions and their answers if provided.
    Create a ${test_format} with detailed questions.  Incorporate a larger amount of information from the previous exam questions and their answers if provided.
    If previous exam questions and answers are not provided, construct multiple choice questions which have options A, B, C, and D.
    Only one of them should be the correct answer. The questions should strictly only center on the specific topics of the syllabus that are on Calculus, and should not test on aspects of the syllabus such as the grading breakdown, learning objectives, the course policies, the academic integrity policy, the accommodation policies, the make-up policies, or the dates to drop down.  The questions should not be word answers or long answers that require significant reasoning.
    ${_text}`;

    completion = await openai.chat.completions.create({
      messages: [
        { role: "system", content: sys_msg },
        { role: "user", content: usr_msg }
      ],
      model: "gpt-4o",
      response_format: {
        type: "json_schema",
        json_schema: {
          name: "flashcards",
          schema: {
            type: "object",
            properties: {
              category: { "type": "string" },
              questions: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    question: { "type": "string" },
                    options: {
                      type: "array",
                      items: { "type": "string" }
                    },
                    correctAnswer: { "type": "string" }
                  },
                  required: ["question", "options", "correctAnswer"],
                  additionalProperties: false
                }
              }
            },
            required: ["category", "questions"],
            additionalProperties: false
          },
          strict: true
        }
      }
    });
  } else if (test_format == 'project') {
    usr_msg = `Read the syllabus provided below and read the previous exam questions and their answers if provided.
    Using the concepts given in the syllabus, create a multiple part question that centers on either one topic or more.
    The projects should not test on aspects of the syllabus such as the grading breakdown, learning objectives, the course policies, the academic integrity policy, the accommodation policies, the make-up policies, or the dates to drop down.
    The questions may require significant reasoning, and should consist of experiments and proofs.
    No more than four parts are needed per question if the question is split into parts.  The questions should not be word answers in multiple choice answers.  Focus more on applications of the topic given in the syllabus.
    ${_text}`;

    completion = await openai.chat.completions.create({
      messages: [
        { role: "system", content: sys_msg },
        { role: "user", content: usr_msg }
      ],
      model: "gpt-4o",
      response_format: {
        type: "json_schema",
        json_schema: {
          name: "flashcards",
          schema: {
            type: "object",
            properties: {
              category: { "type": "string" },
              projects: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    title: { "type": "string" },
                    description: { "type": "string" },
                    steps: {
                      type: "array",
                      items: { "type": "string" }
                    }
                  },
                  required: ["title", "description", "steps"],
                  additionalProperties: false
                }
              }
            },
            required: ["category", "projects"],
            additionalProperties: false
          },
          strict: true
        }
      }
    });
  }

  let msg = completion.choices[0].message.content;

  // console.log(msg);
  let jsonObject = JSON.parse(msg.replace(/\s+/g, ' ').trim());

  // Modify the category based on the value of test_format
  if (test_format === 'flashcards') {
    jsonObject.category = 'Flashcards';
  } else if (test_format === 'long answer') {
    jsonObject.category = 'Long-Answer';
  } else if (test_format === 'quiz') {
    jsonObject.category = 'Quiz';
  } else if (test_format === 'project') {
    jsonObject.category = 'Project-Based';
  }

  // Stringify the modified JSON object back to a string
  let un_pretty_json = JSON.stringify(jsonObject);

  return res.send(un_pretty_json);
});

app.listen(process.env.PORT || 5000, () => {
  console.log(`Server running at http://localhost:${port}`);
});
