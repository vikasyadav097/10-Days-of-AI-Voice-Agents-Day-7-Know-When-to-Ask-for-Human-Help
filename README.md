
# 📞 Day 6 – Make LearnMate Reach Out

> Turning LearnMate from a voice agent that waits for learners to call into a proactive learning companion that can reach out to them.

Part of **10 Days of Voice Agents – Voice for Bharat Edition** 🚀

---

## 🎯 Day 6 Objective

For Day 6, I extended **LearnMate**, my Learning & Literacy voice assistant, with an outbound calling experience.

Instead of waiting for the learner to open the browser and start a session, LearnMate can proactively reach out to a learner for a scheduled learning or practice session.

---

## 💡 Outbound Use Case

### Daily Computer Science Practice Call

A learner can have a preferred practice time.

For example:

```text
Learner: Vikas
Practice Time: 7:00 PM
Subject: Computer Science
````

At the scheduled time, LearnMate can initiate an outbound call and say:

```text
Hi Vikas, I'm LearnMate, your learning assistant.

I'm calling because you scheduled your Computer Science
practice session for this time.

Is this a good time for a quick learning session?

If now isn't a good time, you can end the call.
```

If the learner agrees, LearnMate starts a short Computer Science practice session.

---

## 📞 Outbound Call Flow

```text
Learner Schedule
       ↓
Outbound Call Trigger
       ↓
Telephony Service
       ↓
LearnMate
       ↓
Introduction
       ↓
Ask Permission
       ↓
Computer Science Question
       ↓
Learner Answers
       ↓
Gemini
       ↓
Murf Falcon
       ↓
Voice Response
```

---

# 🛠️ Tech Stack

| Component       | Technology                 |
| --------------- | -------------------------- |
| Voice Agent     | LiveKit Agents             |
| Telephony       | Twilio                     |
| Speech-to-Text  | Deepgram                   |
| LLM             | Google Gemini              |
| Text-to-Speech  | Murf Falcon                |
| Voice Transport | LiveKit                    |
| Backend         | Python                     |
| Frontend        | Next.js, React, TypeScript |
| Styling         | Tailwind CSS               |

---

# 📂 Project Structure

```text
Day-6-Outbound-LearnMate/
│
├── backend/
│   ├── src/
│   │   ├── agent.py
│   │   └── outbound_call.py
│   │
│   ├── .env.local
│   ├── .env.example
│   └── pyproject.toml
│
├── frontend/
│   ├── app/
│   ├── components/
│   ├── lib/
│   ├── public/
│   └── package.json
│
├── README.md
└── LICENSE
```

---

# ⚙️ Requirements

Before running LearnMate, make sure you have:

* Python 3.10+
* Node.js 18+
* pnpm
* uv
* LiveKit
* Git

---

# 🔐 Environment Variables

Create your environment file inside the backend:

```text
backend/.env.local
```

Add your required API credentials:

```env
LIVEKIT_URL=
LIVEKIT_API_KEY=
LIVEKIT_API_SECRET=

MURF_API_KEY=
DEEPGRAM_API_KEY=
GOOGLE_API_KEY=

TWILIO_ACCOUNT_SID=
TWILIO_AUTH_TOKEN=
TWILIO_PHONE_NUMBER=
```

Never upload real API keys to GitHub.

---

# ▶️ Running LearnMate

The project uses **three services**:

```text
LiveKit Server
      +
Backend Voice Agent
      +
Frontend
```

Run each service in a separate terminal.

---

## 1️⃣ Start LiveKit Server

Open **Terminal 1** and go to the LiveKit directory.

For local development:

```powershell
livekit-server.exe --dev
```

Keep this terminal running.

---

## 2️⃣ Start Backend

Open **Terminal 2**.

Go to the backend directory:

```powershell
cd backend
```

Install/sync dependencies:

```powershell
uv sync
```

Start the LearnMate voice agent:

```powershell
uv run python src/agent.py dev
```

The backend will connect LearnMate to:

```text
Deepgram → Gemini → Murf Falcon → LiveKit
```

Keep this terminal running.

---

## 3️⃣ Start Frontend

Open **Terminal 3**.

Go to the frontend directory:

```powershell
cd frontend
```

Install dependencies:

```powershell
pnpm install
```

Start the development server:

```powershell
pnpm dev
```

The frontend will normally be available at:

```text
http://localhost:3000
```

Open that address in your browser.

---

# 🖥️ Complete Local Setup

After starting all three services, your setup should look like:

```text
Terminal 1
──────────
LiveKit Server
livekit-server.exe --dev


Terminal 2
──────────
Backend
cd backend
uv sync
uv run python src/agent.py dev


Terminal 3
──────────
Frontend
cd frontend
pnpm install
pnpm dev
```

Then open:

```text
http://localhost:3000
```

---

# 🧪 Testing the Outbound Learning Experience

The complete flow should be tested using a phone number controlled by the developer.

### Test Flow

```text
1. Configure the learner's phone number
             ↓
2. Trigger the outbound call
             ↓
3. Phone rings
             ↓
4. LearnMate introduces itself
             ↓
5. LearnMate explains why it is calling
             ↓
6. Learner accepts the session
             ↓
7. LearnMate asks a Computer Science question
             ↓
8. Learner answers
             ↓
9. LearnMate evaluates the answer
             ↓
10. LearnMate provides feedback
             ↓
11. Learner ends the call
```

---

# 🗣️ Example Conversation

### 📞 LearnMate

```text
Hi Vikas, I'm LearnMate, your learning assistant.

I'm calling for your scheduled Computer Science
practice session.

Is this a good time for a quick question?
```

### 👤 Learner

```text
Yes, let's do it.
```

### 🤖 LearnMate

```text
Great.

Here's your question:

What does IP stand for in computer networking?
```

### 👤 Learner

```text
Internet Protocol.
```

### 🤖 LearnMate

```text
Correct!

IP stands for Internet Protocol.

Would you like another question?
```

---

# 🛡️ Responsible Outbound Calling

Because the learner did not initiate the call, LearnMate should:

* ✅ Identify itself immediately
* ✅ Explain why it is calling
* ✅ Ask whether the learner wants to continue
* ✅ Respect the learner's decision to end the call
* ✅ Keep the session short
* ✅ Avoid repeatedly calling someone who does not want calls
* ❌ Never pretend to be a human
* ❌ Never pressure the learner to continue

---

# 🎥 Day 6 Demo

The Day 6 demonstration shows:

1. 📱 Phone receiving the outbound call
2. 🤖 LearnMate introducing itself
3. 📚 Explaining the reason for the call
4. 🧠 Starting a Computer Science practice question
5. 🎙️ Learner answering through voice
6. 🔊 LearnMate responding using Murf Falcon
7. 📞 Ending the outbound session

---

# 🚀 What I Built

For Day 6, I extended LearnMate into a more proactive learning companion.

Instead of requiring learners to manually open the application every time, the outbound experience allows LearnMate to reach out for a scheduled Computer Science practice session.

The goal is to make voice-based learning more accessible, consistent, and engaging.

---

# 🔮 Future Improvements

* 📅 Personalised learning schedules
* 🧠 Adaptive difficulty
* 📊 Progress-based reminders
* 🌐 Multi-language outbound calls
* 📚 Subject-specific practice
* 🔁 Automatic rescheduling
* 📈 Learning analytics
* 👨‍🏫 Teacher dashboard
* 🔐 Learner call preferences

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

**Murf Falcon • LiveKit • Deepgram • Gemini • Twilio • Next.js**

#10DaysofAIVoiceAgents #MurfFalcon #VoiceForBharat #MurfAI #VoiceAI #GenerativeAI #LearningAndLiteracy #ComputerScience #AI #LiveKit #Deepgram #Gemini #Twilio

```
```
