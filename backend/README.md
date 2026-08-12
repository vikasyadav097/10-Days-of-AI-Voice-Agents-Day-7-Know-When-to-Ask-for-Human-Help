
# 🧑‍🏫 Day 7 – Know When to Ask for Human Help

> Teaching LearnMate when it should stop trying to solve everything itself and ask a human for help.

Part of **10 Days of Voice Agents – Voice for Bharat Edition** 🚀

Day 6 made LearnMate proactive by enabling an outbound learning experience.  
Day 7 focuses on **human escalation** — making LearnMate understand when a learner needs support from a real person.

---

## 🎯 Day 7 Objective

For Day 7, I upgraded **LearnMate**, my Learning & Literacy voice assistant, with a human-help escalation system.

LearnMate can now:

- 🧠 Recognise situations where AI assistance is not enough
- 🧑‍🏫 Ask the learner for permission before sharing information
- 📋 Create a structured escalation request
- 🆔 Generate a reference ID for the request
- 🔔 Give the learner a clear next step
- 🛡️ Avoid sharing unnecessary private information

---

# 🧑‍🏫 When Should LearnMate Ask for Human Help?

For the Learning & Literacy track, I selected two main escalation scenarios.

### 1. Learner Needs a Human Teacher

If a learner says they are unable to understand a topic even after multiple explanations, LearnMate should offer human assistance.

Example:

```text
Learner:
"I still don't understand this topic. Can I talk to a teacher?"

LearnMate:
"Of course. I can create a request for a teacher to help you.
Would you like me to share your learning topic and the issue
you're facing with a teacher?"
````

---

### 2. Learner Is Upset or Frustrated

If the learner becomes highly frustrated or asks for human support, LearnMate should not continue forcing the lesson.

Example:

```text
Learner:
"I'm getting frustrated. I don't want to continue with AI."

LearnMate:
"I understand. I can create a request for human learning support.
Would you like me to share a short summary of what you were
working on with a teacher?"
```

---

# 🔄 Human Escalation Flow

```text
Learner
   │
   ▼
Learning Conversation
   │
   ▼
Does the situation require human help?
   │
   ├── No ──► Continue Learning
   │
   └── Yes
          │
          ▼
   Explain Why Human Help Is Needed
          │
          ▼
   Ask Learner for Permission
          │
          ├── No ──► Do Not Create Request
          │
          └── Yes
                 │
                 ▼
          Create Escalation
                 │
                 ▼
          Generate Reference ID
                 │
                 ▼
          Show Request to Human
                 │
                 ▼
          Tell Learner What Happens Next
```

---

# 🛠️ Human Help Tool

LearnMate uses a dedicated function:

```python
create_escalation()
```

The tool creates a structured request containing only the information required by the human supporter.

Example:

```json
{
  "reference_id": "LM-2026-001",
  "user_id": "learner_0007",
  "name": "Vikas",
  "reason": "Needs help from a human teacher",
  "topic": "Computer Networks",
  "summary": "Learner is having difficulty understanding IP addressing.",
  "urgency": "normal",
  "language": "English",
  "follow_up_method": "voice"
}
```

---

# 🔐 Permission Before Sharing

LearnMate does **not** automatically send learner information to a human.

Before creating the request, it asks for permission.

Example:

```text
LearnMate:

"I can create a request for a human teacher.

I would share your name, the topic you're learning,
and a short summary of the problem.

Would you like me to send this request?"
```

If the learner says:

```text
No.
```

LearnMate does not create the escalation request.

If the learner says:

```text
Yes.
```

LearnMate creates the request.

---

# 🆔 Reference ID

After successfully creating an escalation request, LearnMate provides a reference ID.

Example:

```text
LearnMate:

"Your request has been created successfully.

Your reference ID is LM-2026-001.

A human learning supporter can use this reference
to follow up with you."
```

LearnMate does **not** promise an immediate response unless an immediate human response is actually available.

---

# 📋 Human Escalation Summary

The human supporter receives only useful information:

```text
Reference ID:
LM-2026-001

Learner:
Vikas

Reason:
Needs human teacher assistance

Topic:
Computer Networks

What happened:
Learner is having difficulty understanding IP addressing
after multiple explanations.

What LearnMate checked:
Basic IP addressing explanation and examples.

Urgency:
Normal

Language:
English

Preferred Follow-up:
Voice
```

---

# 🛡️ Privacy & Safety

LearnMate follows a minimal-information approach.

### LearnMate CAN share:

* ✅ Learner name
* ✅ Learning topic
* ✅ Problem summary
* ✅ Relevant learning context
* ✅ Language preference
* ✅ Preferred follow-up method
* ✅ Urgency

### LearnMate MUST NOT share:

* ❌ Passwords
* ❌ OTPs
* ❌ PINs
* ❌ Account numbers
* ❌ Unnecessary personal information
* ❌ Full conversation history unless specifically required

---

# 🧠 Normal Conversation vs Escalation

### Normal Learning

```text
Learner:
"What is an IP address?"

LearnMate:
"An IP address is a unique address used to identify
a device on a network. Would you like an example?"
```

No human help is required.

---

### Escalation Conversation

```text
Learner:
"I've tried this several times and I'm still confused.
I want to talk to a teacher."

LearnMate:
"I can help create a request for a human teacher.
Would you like me to share your name, learning topic,
and a short summary of the problem?"
```

The escalation tool is called only after permission.

---

# 🏗️ Architecture

```text
                    LearnMate
                       │
                       ▼
                 Voice Conversation
                       │
                       ▼
                    Gemini
                       │
          ┌────────────┴────────────┐
          │                         │
   Normal Learning            Human Needed
          │                         │
          ▼                         ▼
 Continue Lesson             Ask Permission
                                    │
                           ┌────────┴────────┐
                           │                 │
                          No                Yes
                           │                 │
                           ▼                 ▼
                     No Request       create_escalation()
                                             │
                                             ▼
                                      Escalation Store
                                             │
                                             ▼
                                      Human Support
```

---

# 🛠️ Tech Stack

| Component        | Technology                   |
| ---------------- | ---------------------------- |
| Voice Agent      | LiveKit Agents               |
| LLM              | Google Gemini                |
| Speech-to-Text   | Deepgram                     |
| Text-to-Speech   | Murf Falcon                  |
| Human Escalation | Python Function Tool         |
| Storage          | SQLite / Local Request Store |
| Backend          | Python                       |
| Frontend         | Next.js, React, TypeScript   |
| Styling          | Tailwind CSS                 |

---

# 📂 Project Structure

```text
Day-7-Human-Help-LearnMate/
│
├── backend/
│   ├── src/
│   │   ├── agent.py
│   │   ├── memory.py
│   │   ├── learning_tools.py
│   │   └── escalation.py
│   │
│   ├── data/
│   │   └── escalations.json
│   │
│   ├── .env.example
│   └── pyproject.toml
│
├── frontend/
│   ├── app/
│   ├── components/
│   ├── hooks/
│   ├── lib/
│   └── package.json
│
├── README.md
└── LICENSE
```

---

# ▶️ Running LearnMate

Day 7 continues the same frontend and backend architecture used in the previous days.

## 1️⃣ Start LiveKit

```bash
livekit-server.exe --dev
```

---

## 2️⃣ Start Backend

```bash
cd backend
uv sync
uv run python src/agent.py dev
```

---

## 3️⃣ Start Frontend

```bash
cd frontend
pnpm install
pnpm dev
```

Open:

```text
http://localhost:3000
```

---

# 🧪 Day 7 Testing Checklist

### Test 1 — Normal Conversation

* ✅ Start LearnMate
* ✅ Ask a normal Computer Science question
* ✅ Agent answers normally
* ✅ No escalation request is created

### Test 2 — Human Teacher Request

* ✅ Tell LearnMate that you need a human teacher
* ✅ Agent recognises the escalation condition
* ✅ Agent explains what information will be shared
* ✅ Agent asks for permission
* ✅ Say "Yes"
* ✅ Escalation request is created
* ✅ Reference ID is generated

### Test 3 — Permission Denied

* ✅ Trigger human escalation
* ✅ Agent asks for permission
* ✅ Say "No"
* ✅ No escalation request is created

### Test 4 — Frustrated Learner

* ✅ Express frustration with the lesson
* ✅ Agent responds calmly
* ✅ Agent offers human support
* ✅ Permission is requested before sharing information

---

# 🎥 Day 7 Demo

The demonstration shows the complete escalation workflow:

1. 🎙️ Learner starts a conversation with LearnMate
2. 🧠 LearnMate identifies that human help is required
3. 🧑‍🏫 LearnMate explains why escalation is appropriate
4. 🔐 LearnMate asks for permission
5. ✅ Learner approves the request
6. 🛠️ `create_escalation()` is triggered
7. 🆔 A reference ID is generated
8. 📋 Human support can view the request
9. 📞 LearnMate explains the next step to the learner

A second test demonstrates a normal conversation where **no escalation request is created**.

---

# 🚀 What I Built

For Day 7, I taught LearnMate an important lesson:

**An AI agent doesn't have to solve everything itself.**

LearnMate can now recognise when a learner needs human assistance, ask for permission before sharing information, create a structured support request, and provide a reference ID.

This makes the learning experience more responsible while keeping the learner in control of their information.

---

# 🔮 Future Improvements

* 👨‍🏫 Teacher dashboard
* 🔔 Real-time notifications for teachers
* 📧 Email escalation
* 💬 Slack/Discord notifications
* 📊 Escalation analytics
* 📝 Teacher response tracking
* 🧠 Better frustration detection
* 🌐 Multi-language human support
* 🔐 Learner request history
* 📱 Mobile learning support

---

# 👨‍💻 Author

**Vikas Yadav**

GitHub: [https://github.com/vikasyadav097](https://github.com/vikasyadav097)

---

# 📜 License

MIT License

---

# 🚀 10 Days of Voice Agents

Built as part of **10 Days of Voice Agents – Voice for Bharat Edition** 🇮🇳

Powered by:

**Murf Falcon • LiveKit • Deepgram • Gemini • Next.js • Python**

#10DaysofAIVoiceAgents #MurfFalcon #VoiceForBharat #MurfAI #VoiceAI #GenerativeAI #LearningAndLiteracy #ComputerScience #AI #LiveKit #Deepgram #Gemini

```
```

