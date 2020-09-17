export const mongo = {
  database: `mongodb+srv://${process.env.DEV_DB_USER}:${process.env.DEV_DB_PASS}@cluster0.eymwz.mongodb.net/${process.env.DEV_DB_NAME}?retryWrites=true&w=majority`,
  secret: process.env.DEV_DB_SECRET,
};

export const server = {
  clientDomain: process.env.DOMAIN || 'http://localhost:3000',
  serverDomain: process.env.DOMAIN || 'http://localhost:5000',
  port: process.env.PORT || 5000,
};
