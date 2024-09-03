let clothing_items = [
    {
        "clothingName": "Summer Dress",
        "clothingType": "Dress",
        "clothingPrice": 2999,
        "clothingImage": "https://tse1.mm.bing.net/th?id=OIP.la2iNQAppBmAlB6_AqsvVgHaLH&pid=Api&P=0&h=180",
        "clothingDescription": "A light and breezy dress perfect for summer outings."

    },
    {
        "clothingName": "Leather Jacket",
        "clothingType": "Jacket",
        "clothingPrice": 9999,
        "clothingImage": "https://tse1.mm.bing.net/th?id=OIP.sE8DPH1Po_FHk991sr9mKAAAAA&pid=Api&P=0&h=180",
        "clothingDescription": "A warm jacket designed to keep you cozy in cold weather."
    },
    {
        "clothingName": "Casual T-shirt",
        "clothingType": "T Shirt",
        "clothingPrice": 1999,
        "clothingImage": "https://tse1.mm.bing.net/th?id=OIP.DSjZPk9uy01_f2ox4Q5QPgAAAA&pid=Api&P=0&h=180",
        "clothingDescription": "A comfortable cotton T-shirt perfect for everyday wear."
    },
    {
        "clothingName": "Blue Jeans",
        "clothingType": "Pants",
        "clothingPrice": 3999,
        "clothingImage": "https://tse2.mm.bing.net/th?id=OIP.mqe7_X82mwS_Smn6sG1e3wHaHa&pid=Api&P=0&h=180",
        "clothingDescription": "Stylish and comfortable pants ideal for both casual and formal settings."
    },
    {
        "clothingName": "Sports Shoes",
        "clothingType": "Shoes",
        "clothingPrice": 5999,
        "clothingImage": "https://wallpapercave.com/wp/wp2672691.jpg",
        "clothingDescription": "Durable and Confortable with great styling."
    },
    {
        "clothingName": "Stylish Shoes",
        "clothingType": "Shoes",
        "clothingPrice": 6999,
        "clothingImage": "https://wallpaperaccess.com/full/680065.jpg",
        "clothingDescription": "Comfortable stylish shoes that offer both style and durability."
    },
    {
        "clothingName": "Woolen Sweater",
        "clothingType": "Sweater",
        "clothingPrice": 4999,
        "clothingImage": "https://tse1.mm.bing.net/th?id=OIP.H8DVlAOUBW4of1bB_r29hQHaHf&pid=Api&P=0&h=180",
        "clothingDescription": "A cozy and stylish sweater that offers warmth and comfort."
    },
    {
        "clothingName": "Formal Shirt",
        "clothingType": "Shirt",
        "clothingPrice": 3499,
        "clothingImage": "http://baesicworld.com/cdn/shop/files/Sfsf_1.webp?v=1693076991",
        "clothingDescription": "A classic shirt that combines elegance with versatility."
    },
    {
        "clothingName": "Denim Jacket",
        "clothingType": "Jacket",
        "clothingPrice": 8999,
        "clothingImage": "https://tse2.mm.bing.net/th?id=OIP.bO4pS4CxtlOHb0LsEMiIWwHaIf&pid=Api&P=0&h=180",
        "clothingDescription": "A durable jacket designed to keep you warm and stylish."
    },
    {
        "clothingName": "Graphic T-shirt",
        "clothingType": "T Shirt",
        "clothingPrice": 2299,
        "clothingImage": "https://tse4.mm.bing.net/th?id=OIP.49m0-l-ng36rrwNQnclEMgHaJ4&pid=Api&P=0&h=180",
        "clothingDescription": "A versatile T-shirt perfect for everyday wear."
    },
    {
        "clothingName": "Chinos",
        "clothingType": "Pants",
        "clothingPrice": 4499,
        "clothingImage": "https://tse2.mm.bing.net/th?id=OIP.FKBpPOomyVqa5peT0Uv2sQHaKu&pid=Api&P=0&h=180",
        "clothingDescription": "Comfortable and durable pants suitable for any occasion."
    }
];

const express=require("express");
const app=express();
let port=8080;
const cors=require("cors");
const CustomError=require("./CustomError");
const Fuse=require("fuse.js");

app.use(cors())
app.use(express.json());

const fuseOptions={
    keys:["clothingName","clothingType"],
    threshold:0.4,
}

let fuseObj=new Fuse(clothing_items,fuseOptions);

app.get("/",(req,res)=>{
    res.redirect("/search");
});

app.get("/search",(req,res,next)=>{
    try{
        let name=(req.query.name);
        name=name.trim();
        name=name.split(" ").join("");
        const minSearchLength=3;
        
        if(name.length<=minSearchLength){
            data=clothing_items.map(item=>item);
            res.json(data);
        }

        else{
            let data=clothing_items.filter(item=>{
                return (
                    item.clothingType.split(" ").join("").toLowerCase().includes(name.toLowerCase()) ||
                    item.clothingName.split(" ").join("").toLowerCase().includes(name.toLowerCase())
                );
            });
            if(data.length==0){
                let suggestionArry=fuseObj.search(name);
                if(suggestionArry.length>0){
                    let suggestion=suggestionArry.map(result =>({
                        clothingName: result.item.clothingName,
                        clothingType: result.item.clothingType,
                        clothingPrice: result.item.clothingPrice,
                        clothingImage: result.item.clothingImage,
                        clothingDescription: result.item.clothingDescription
                    }));
                    res.json({message: "Did you mean ",data:`${suggestion[0].clothingType.toLowerCase()}`, suggestion})
                }
                else{
                    throw new CustomError(500,"Data not found");
                }
            }
            else{
                res.json(data);
            }
        }
    }catch(err){
        next(new CustomError(404,"Internal Server ERROR"));
    }
});


app.listen(port,()=>{
    console.log("listening to port : "+port);
});

app.use((err,req,res,next)=>{
    let {status=500,message="ERROR OCCURED"}=err;
    res.status(status).json({status,message});
})