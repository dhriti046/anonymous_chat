# AnonChat

## First time setup (run once)

```bash
cd anonymous_chat
npm install
npm run install:all
```

Then create your `.env` file inside the `backend` folder:
```
MONGO_URI=mongodb://localhost:27017/anonymous_chat
JWT_SECRET=anyrandomsecretstring123
PORT=3001
```

## Run the project

```bash
npm run dev
```

This starts both backend and frontend together. Open http://localhost:5173
