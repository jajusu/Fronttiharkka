const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('levyt.db');

db.serialize( () => {

	let sql = "CREATE TABLE levy (" +
			  "id integer PRIMARY KEY NOT NULL, " +
			  "nimi text NOT NULL, " +
			  "artisti text NOT NULL, " +
			  "formaatti text NOT NULL, " +
			  "kuva blob, " +
			  "info text )";

	db.run(sql, (err) => {
		if (err) {
		  return console.log(err.message);
		}
		console.log("Taulu tehtiin");
	});

	sql = "INSERT INTO `levy` (`id`, `nimi`, `artisti`, `formaatti`, `kuva`, `info`) "+
	" VALUES (1, 'Master Of Puppets', 'Metallica', 'cd', 'master.PNG', 'Muutama naarmu')";
	db.run(sql, (err) => {
		if (err) {
		  return console.log(err.message);
		}
		console.log("Rivi lisättiin");
	});

	sql = "INSERT INTO `levy` (`id`, `nimi`, `artisti`, `formaatti`, `kuva`, `info`) "+
	" VALUES (2, 'Back in Black', 'AC/DC', 'LP', 'back.jpg', 'Japsipainos')";
	db.run(sql, (err) => {
		if (err) {
			return console.log(err.message);
		}
		console.log("Rivi lisättiin");
	});

	sql = "INSERT INTO `levy` (`id`, `nimi`, `artisti`, `formaatti`, `kuva`, `info`) "+
	" VALUES (3, 'Paranoid', 'Black Sabbath', 'Kasetti', 'paranoid.jpg', 'Ensimmäinen painos')";
	db.run(sql, (err) => {
		if (err) {
			return console.log(err.message);
		}
		console.log("Rivi lisättiin");
	});

	db.each("SELECT id, nimi FROM levy", function(err, row) {
		if (err) {
		  return console.log(err.message);
		}
		console.log(row.id + ", " + row.nimi);
	});

	db.close();
});
