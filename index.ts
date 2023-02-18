import express from "express";
import { PrismaClient } from '@prisma/client'

const prisma : PrismaClient = new PrismaClient();

const app : express.Application = express();

const portti : number = Number(process.env.PORT) || 3001

app.set("view engine", "ejs"); //EJS-käyttöön otto

app.use(express.json());

app.use(express.urlencoded({ extended : true }));

app.post("/", async (req : express.Request, res : express.Response) => {

     let kunnat = await prisma.kunta.findMany({
        where: {
            kunta: {
                startsWith: req.body.nimi
            }
        }
    });

     res.render("index", { kunnat : kunnat });
   
});

app.get("/", async (req : express.Request, res : express.Response) => {

    let kunnat = await prisma.kunta.findMany();//Tietojen haku prismasta

    res.render("index", { kunnat : kunnat });//Muuttujien vienti ejs puolelle

});

app.listen(portti, () => {

    console.log(`Palvelin käynnistyi osoitteeseen http://localhost:${portti}`)

});