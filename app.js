const express = require('express');
const app = express();

//run the server

app.set('view engine', 'ejs');

app.use(express.static('public'));

app.get('/', (req, res) => {
	res.render('index', { posts });
});

//code to handle form submission and store posts

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
	console.log('Server running on http://localhost:${PORT}');
});

app.use(express.urlencoded({ extended: true }));

let posts = [];

app.post('/create', (req, res) => {
	const {name, title, content} = req.body;
	const post = {
		name,
		title,
		content,
		createdAt: new Date()
	};
	posts.push(post);
	res.redirect('/');
});

//routes for editing and deleting posts

app.get('/edit/:id', (req, res) => {
	const id = req.params.id;
	const post = posts[id];
	res.render('edit', { post, id });
});

app.get('/delete/:id', (req, res) => {
	const id = req.params.id;
	posts.splice(id, 1);
	res.redirect('/');
});

//add route for form submission of updated post

app.post('/update/:id', (req, res) => {
	const id = req.params.id;
	const { name, title, content } = req.body;
	posts[id] = {
		name,
		title,
		content,
		createdAt: posts[id].createdAt
	};
	res.redirect('/');
});