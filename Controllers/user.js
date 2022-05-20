const user = require('../models/user');
const bcrypt = require('bcryptjs');

const Ajouter = async (req, res) => {
    const { email, password } = req.body;

    const NewUser = new user({
        email,
        password,
        image: req.file.filename
    });

    try {
        await NewUser.save();
    } catch (error) {
        res.status(500).json({message: "something went wrong with DB", error: error})
    }
    
    res.status(201).json({message: "success", data: NewUser});
}

const Register = async (req, res) => {
    const { email, password, nom, prenom, adresse, tel, confirm_password } = req.body;

    let existinguser;
    try {
        existinguser = await user.findOne({ email: email});
    } catch (error) {
        return res.status(500).json({success: false, message: "something went wrong with DB", error: error})
    }
    
    if (existinguser) {
        return res.status(405).json({success: false, message: "Utilisateur déja existe!"})
    }

 
    
 
    const hashedPass = await bcrypt.hash(password, 10);

    let avatar= 'avataar.png';
    if (req.file) {
        avatar= req.file.filename;
    }
    const NewUser = new user({
        email,
        password: hashedPass,
        nom, 
        prenom, 
        adresse, 
        tel,
        avatar
    });
    

    try {
        await NewUser.save();
    } catch (error) {
        res.status(500).json({message: "something went wrong with DB", error: error})
    }

    
    res.status(201).json({message: "success", data: NewUser});
}

const login = async (req, res) => {

    const {email, password } = req.body;

    if(email=='' || password ==''){
        return res.status(405).json({success: false, message: "Tous les champs sont obligatoires!"})
    }

    const regx = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    if(!regx.test(email)){
        return res.status(405).json({success: false, message: "E-mail ivalide!"})
    } 
    console.log(req.body);
    let existinguser;
    try {
        existinguser = await user.findOne({ email: email});
    } catch (error) {
        return res.status(500).json({success: false, message: "something went wrong with DB", error: error})
    }
    
    if (!existinguser) {
        return res.status(405).json({success: false, message: "L'utilisateur n'existe pas!"})
    }

    let check = await bcrypt.compare( password, existinguser.password);

    if (!check) {
        return res.status(405).json({success: false, message: "Mot de passe incorrect!"})
    }

    return res.status(200).json({success: true, message: "Bienvenue", data: existinguser});

}

const GetAll = async (req, res) => {

    let existinguser;
    try {
        existinguser = await user.find();
    } catch (error) {
        res.status(500).json({message: "something went wrong with DB", error: error})
    }

    res.status(200).json({message: "success", data: existinguser});

}

const FindById = async(req, res) => {

    const { id } = req.params;

    let existinguser;
    try {
        existinguser = await user.findById(id);
    } catch (error) {
        return res.status(500).json({success: false, message: "something went wrong with DB", error: error})
    }
    
    if (!existinguser) {
        return res.status(405).json({success: false, message: "User Doesn't Exist!!"})
    }
    
    return res.status(200).json({success: true, message: "success", data: existinguser});

}

const Delete = async(req, res) => {

    const { id } = req.params;

    let existinguser;
    try {
        existinguser = await user.findById(id);
    } catch (error) {
        return res.status(500).json({message: "something went wrong with DB", error: error})
    }
    
    if (!existinguser) {
        return res.status(405).json({message: "User Doesn't Exist!!"})
    }
    
    try {
        await existinguser.remove();
    } catch (error) {
        return res.status(500).json({message: "something went wrong with DB", error: error})
    }
    
    return res.status(200).json({message: "deleted succesfully"});

}

const updateuser = async(req, res) => {

    const { nom, prenom, adresse, tel, password } = req.body;
    const { id } = req.params;

    let existinguser;
    try {
        existinguser = await user.findById(id);
    } catch (error) {
        return res.status(500).json({success: false, message: "something went wrong with DB", error: error})
    }
    
    if (!existinguser) {
        return res.status(405).json({success: false, message: "User Doesn't Exist!!"})
    }
    
    existinguser.nom = nom;
    existinguser.prenom = prenom;
    existinguser.tel = tel;
    existinguser.adresse = adresse;
    if (req.body.password) {
        existinguser.password = await bcrypt.hash(req.body.password, 10);
    }
    if (req.file) {
        existinguser.avatar = req.file.filename;
    }
        

    try {
        await existinguser.save();
    } catch (error) {
        return res.status(500).json({success: false, message: "something went wrong with DB", error: error})
    }
    
    return res.status(201).json({success: true, message: "Vos coordonnées modifiées avec succès", data: existinguser});

}

exports.Ajouter = Ajouter 
exports.GetAll = GetAll 
exports.FindById = FindById 
exports.Delete = Delete 
exports.updateuser = updateuser 
exports.login = login 
exports.Register = Register 