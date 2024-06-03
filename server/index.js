import user_routes from "./routes/user_routes.js"
import bike_routes from "./routes/bike_routes.js"
import login_routes from "./routes/login_route.js"
import express from 'express';
import cors from 'cors';
import session from 'express-session'

const PORT = process.env.PORT || 3001;
const app = express();

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));

app.use(express.json());

app.use(session({
  secret: 'my-secret-key',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true }
}));

app.use("/user", user_routes);
app.use("/bike", bike_routes);
app.use("/login", login_routes);

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});