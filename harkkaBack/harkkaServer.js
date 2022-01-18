const express = require('express');
const app = express();

const bodyParser= require('body-parser')
app.use(bodyParser.urlencoded({limit: '5mb', extended: true}))

var helmet = require('helmet')
app.use(helmet())

app.use(express.json());
express.urlencoded({limit: '5mb', extended: true});

const cors = require('cors');
app.use(cors());

const sqlite3 = require('sqlite3');
const db = new sqlite3.Database('levyt.db');

app.listen(8080, () => {
    console.log('Node toimii localhost:8080');
});

app.get('/', (req, res, next) => {
    return res.status(200).json({ error: false, message: 'Toimii' })
});

app.get('/levy/all', (req, res, next) => {
	db.all('select * from levy', function (error, result) {
		if (error) throw error;

		return res.status(200).json(result);
	});
})

app.get('/levy/one/:id', (req, res, next) => {
	let id = req.params.id;

    db.get('select * from levy where id = ?', [id], (error, result) => {
		if (error) throw error;

		// Oliko vastaus tyhjä
		if (typeof(result) == 'undefined') {
			return res.status(200).json({});
		}

		return res.status(200).json(result);
	});
})

//kuvan lisäys alla
const multer = require('multer');
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, './images')
  },
  filename: (req, file, callback) => {
    callback(null, file.originalname)
  }
})

const upload = multer({ storage: storage })

app.post('/levy/add',  upload.single('kuva'), (req, res, next) => {
  let levy = req.body;
  let kuva = null;

  if (req.file) {
    kuva = req.file.originalname;
  }
 
  db.run('insert into levy (nimi,artisti,formaatti,kuva,info) values (?, ?, ?, ?, ?)',
	      [levy.nimi, levy.artisti, levy.formaatti, kuva, levy.info], (error, result) => {
		if (error) throw error;

		return res.status(200).json( {count: 1} );
	});
})

app.get('/download/:nimi', (req, res, next) => {
    var file = './images/' + req.params.nimi;
    res.download(file);
});

app.get('/levy/delete/:id', (req, res, next) => {
	let id = req.params.id;

  	db.run('delete from levy where id = ?', [id], function (error, result) {
		if (error) throw error;

		return res.status(200).json( {count: this.changes} );
	});
})

//updaten kokeilua alla
app.post('/levy/update',  upload.single('kuva'), (req, res, next) => {
	let levy = req.body;

	//alta rivi pois, upload.single JÄÄ
	let kuva = null;
  
	//alta rivit pois
	if (req.file) {
	  kuva = req.file.originalname;
	}

   //run-lause levy.kuva
	db.run('update levy set nimi=?,artisti=?,formaatti=?,kuva=?,info=? where id=?',
			[levy.nimi, levy.artisti, levy.formaatti, kuva, levy.info, levy.id], (error, result) => {
		  if (error) throw error;
  
		  return res.status(200).json( {count: 1} );
	  });
  })

  //update2 kokeilua alla, eli tämä ilman kuvaa
app.post('/levy/paivita',  upload.single('kuva'),(req, res, next) => {
	let levy = req.body;

	db.run('update levy set nimi=?,artisti=?,formaatti=?,info=? where id=?',
			[levy.nimi, levy.artisti, levy.formaatti, levy.info, levy.id], (error, result) => {
		  if (error) throw error;
  
		  return res.status(200).json( {count: 1} );
	  });
  })


app.get('*', (req, res, next) => {
    return res.status(404).json({ error: true, message: 'Ei pyydettyä palvelua' })
})
