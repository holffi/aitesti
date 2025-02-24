import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import {createPersona} from './promptit/persoona.js';
import {assistant} from './funktiot/assistant.js';
import MarkdownIt from 'markdown-it';
import {createSegmentti} from './promptit/segmentti.js';
import {createKilpailijat} from './promptit/kilpailijat.js';
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.set('view engine', 'ejs');
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.render('index');
});

app.post('/kartoitus', async (req, res) => {
  console.log(req.body);
  let prompt = '';
  switch (req.body.toiminto) {
    case 'persoona':
      prompt = createPersona(req.body.kuvaus);
      break;
    case 'segmentti':
      prompt = createSegmentti(req.body.kuvaus);
      break;
    case 'kilpailijat':
      prompt = createKilpailijat(req.body.kuvaus);
      break;
    default:
      break;
  }
  const vastaus = await assistant(prompt);
  const md = MarkdownIt();
  const teksti = md.render(vastaus);
  res.render('kartoitusvastaus', {teksti});
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
