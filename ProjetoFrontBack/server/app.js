let express = require("express");
let cors = require("cors");
let mongoose = require("mongoose");
let methodOverride = require("method-override")


// Criar Objeto
let app = express();

app.use(cors());

//Permissões de HTTP
app.use(methodOverride('X-HTTP-Method'));
app.use(methodOverride('X-HTTP-Method-Override'));
app.use(methodOverride('X-Method-Override'));
app.use(methodOverride('_method'));

app.use((req, resp, next)=> {
    resp.header("Access-Control-Allow-Origin", "*");
    resp.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    resp.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(express.json());
app.use(express.urlencoded({extended: false}));


// Mongoose
let url = "mongodb://localhost:27017/ProjetoMobileFrontBack"

mongoose.connect(url)
    .then(
        ()=> {console.log("Conectado ao MongoDB")}
    ).catch(
        (e) => {console.log("Erro ao conectar ao MongoDB")}
    );


// Criar uma estrutura no documento e coleção
let User = mongoose.model("Usuario", new mongoose.Schema({
    name: String,
    email: String,
    password: String

}))



// Pasta Raiz
app.get("/", (req, res) => {
    res.send({status:"OK"});
});

app.post("/add", async(req, res) => {

    //Pegar os dados
    let vnome = req.body.name;
    let vemail = req.body.email;
    let vpassword = req.body.password;

    let item = await new User({
        name: vnome,
        email: vemail,
        password: vpassword
    });

    // Comando do mongodb
    item.save();
    res.send({Msg:"Usuário adicionado!", Status:"OK"});
});

app.get('/add', async(req, res) => {
    const users = await User.find({})

    res.send(users);
});

app.get('/user/:id', async(req, res) => {
    try{
    // pegando o parametro via url
    const id = req.params.id;
    
    // objeto model
    let newUser = await User.findById(id);

    res.send({User:newUser.toJSON(), Msg:"Usuário encontrado!", status:"OK"});
} catch(error){
    res.status(404).send(error);
}
});


app.put('/update/:id', async(req, res) => {
    try{
    // pegando o parametro via url
    const id = req.params.id;
    //dado do header
    // array
    const dados = req.body;
    // objeto model
    let newUser = await User.findByIdAndUpdate(id, dados);

    res.status(200).send({userAtt: newUser.toJSON(), Msg:"Usuário atualizado com sucesso!"});

}catch(error){
        res.status(404).send(error);
    };
});

app.delete('/delete/:id', async(req, res) => {
    try{
    let id = req.params.id;
    let i = await User.findByIdAndDelete(id);
    
    res.send({Msg:"Excluído com sucesso!", Status:"OK"});
    }catch(error){
        res.status(404).send(error);
    };
});


// Criar o servidor
app.listen(3000, () => {
    console.log('Servidor aberto na porta 3000');
});