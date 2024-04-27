import express from 'express';
import { engine } from 'express-handlebars'; 
import Jimp from 'jimp'; 
import { nanoid } from 'nanoid';
import path from 'path';

const __dirname = import.meta.dirname;

const app = express()

app.use(express.static(__dirname + '/public'))
app.use('/css', express.static(path.join(__dirname ,'/node_modules/bootstrap/dist/css')))
app.use('/js', express.static(path.join(__dirname ,'/node_modules/bootstrap/dist/js')))
app.use('/js', express.static(path.join(__dirname ,'/node_modules/jquery/dist')))


//handlebars
app.engine('.hbs', engine({extname: '.hbs'}));
app.set('view engine', '.hbs');
app.set('views', './views');

app.get('/', (req, res) => {
    res.render('home')
})


app.get('/image', async (req, res) =>{

const image_url = req.query.image_url

const image = await Jimp.read(image_url)
const buffer = await image
    .resize(350, 650)
    .grayscale()
    .quality(60)
    .getBufferAsync(Jimp.MIME_JPEG)

const dirname = __dirname + `/public/img/image-${nanoid()}.jpeg`
await image.writeAsync(dirname)

res.set("Content-Type", 'image/jpeg')
return res.send(buffer)

})

    
const PORT = process.env.PORT || 5050
app.listen(PORT, ()=> {
    console.log(`Navegador arriba y escuchando en http://localhost:${PORT}` )
})