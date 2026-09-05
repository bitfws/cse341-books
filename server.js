import app from "./app.js";

const PORT = process.env.PORT;

if (!PORT) {
  throw new Error(
    "PORT is not defined. Make sure your local npm scripts reference the .env file with --env-file=.env, or define PORT in your hosted environment settings.",
  );
}

app.get("/", (req, res) => {
  return res.status(200).json({ message: "Server is running" });
});

app.listen(PORT, () => {
  console.log(`Server listening at http://127.0.0.1:${PORT}`);
});
