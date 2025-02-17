const http = require('http') // Модуль для создания сервера
const fs = require('fs') // Модуль для работы с файлами
const path = require('path') // Модуль для работы с путями к файлам

const PORT = process.env.PORT || 5000 // Порт на котором будет работать сервер

const server = http.createServer((req, res) => {
    // Получаем путь к файлу из URL
	let filePath = path.join(
		__dirname,
		'public',
		req.url === '/' ? 'index.html' : req.url
	)

	//  Получаем расширение файла из пути к файлу
	let extname = path.extname(filePath)
	let contentType = 'text/html'
	switch (extname) {
		case '.css':
			contentType = 'text/css'
			break
		case '.js':
			contentType = 'text/javascript'
			break
	}
    // Читаем файл и отправляем его клиенту
	fs.readFile(filePath, (err, content) => {
		if (err) {
			fs.readFile(
				path.join(__dirname, 'public', '404.html'),
				(err404, content404) => {
					res.writeHead(404, { 'Content-Type': 'text/html' })
					res.end(content404 || '404 - Страница не найдена', 'utf8')
				}
			)
            // Если файл не найден, отправляем 404 страницу
		} else {
			res.writeHead(200, { 'Content-Type': contentType })
			res.end(content, 'utf8')
		}
	})
})

server.listen(PORT, () => {
	console.log(`Сервер запущен на порту ${PORT}`)
	console.log(`Пиши localhost:${PORT}`)
})
