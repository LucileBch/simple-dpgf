db.createUser({
  user: "local",
  pwd: "local",
  roles: [{ role: "readWrite", db: "simple-dpgf" }],
});
