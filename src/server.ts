import app from './app';

const PORT = process.env.PORT || 3013;

app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
});