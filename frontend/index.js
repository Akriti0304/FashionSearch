let input=document.querySelector("#search");
let divContent=document.querySelector(".content");
let divMsg=document.querySelector(".msg");
divContent.classList.add("grid", "grid-cols-3","gap-3");

fetchData("");

function handleInput(){
    const minSearchLength=3;
    try{
        let val=input.value.length;

        while(divContent.firstChild){
            divContent.removeChild(divContent.firstChild);
        }

        while(divMsg.firstChild){
            divMsg.removeChild(divMsg.firstChild);
        }

        if(val<=minSearchLength){
            fetchData(val);
        }
        else if(input.value.length>minSearchLength){
            fetchData(input.value);
        }
    }catch(err){
        console.log("ERROR = "+err.message);
    }
}

async function fetchData(value){
    try{
    
        let response=await fetch(`http://localhost:8080/search?name=${value}`);
        let count=0;

        if(response.ok){
            let responseData=await response.json();
    
            if (typeof(responseData)=="object"){
                if(responseData.message && responseData.message.includes("Did you mean")){
                    let msgP=document.createElement("p");
                    msgP.innerHTML=`${responseData.message}&nbsp;`;
                    msgP.classList.add("mb-0","h-8");
                    divMsg.appendChild(msgP);

                    let dataChan=document.createElement("a");
                    dataChan.href="#";
                    dataChan.innerHTML=`${responseData.data}`;
                    dataChan.classList.add("no-underline","h-8","mb-0","p-0");
                    divMsg.appendChild(dataChan);

                    let qu=document.createElement("p");
                    qu.innerHTML="?";
                    // // msgP.classList.add();
                    divMsg.appendChild(qu);

                    dataChan.addEventListener("click",()=>{
                        input.value=dataChan.innerText;
                    });

                    responseData=responseData.suggestion;
                }
                for(let i=0;i<responseData.length;i++){
                    count++;
                    if(count==5){
                        count=0;
                    }
                    //card div element
                    let divCard=document.createElement("div");
                    divCard.classList.add(`col-span-${count}`,"flex","w-68","h-64","mb-4","border-2","shadow","shadow-black");
                    divContent.appendChild(divCard);

                    //image element
                    let img=document.createElement("img");
                    img.classList.add("h-62","w-44");
                    img.src=`${responseData[i].clothingImage}`;
                    img.alt="cloth";
                    divCard.appendChild(img);

                    //div card content element
                    let divCardContent=document.createElement("div");
                    divCardContent.classList.add("w-1/2","m-3");
                    divCard.appendChild(divCardContent);

                    //heading for clothing name
                    let p=document.createElement("p");
                    p.classList.add("truncate","font-medium","text-xl");
                    p.innerHTML=`${responseData[i].clothingName}`;
                    divCardContent.appendChild(p);

                    //para for clothingType
                    let para1=document.createElement("p");
                    para1.classList.add("truncate");
                    para1.innerHTML=`${(responseData[i].clothingType).toLocaleString("en-IN")}`;
                    divCardContent.appendChild(para1);

                    //para for description
                    let para2=document.createElement("p");
                    para2.classList.add("line-clamp-3");
                    para2.innerHTML=`${responseData[i].clothingDescription}`;
                    divCardContent.appendChild(para2);

                    //price container div
                    let divPrice=document.createElement("div");
                    divPrice.classList.add("flex");
                    divCardContent.appendChild(divPrice);

                    //para for price
                    let para3=document.createElement("p");
                    para3.classList.add("line-through","truncate");
                    para3.innerHTML=`&#8377;${((responseData[i].clothingPrice)+1000).toLocaleString("en-IN")}`;
                    divPrice.appendChild(para3);

                    //para for price
                    let para4=document.createElement("p");
                    para4.classList.add("font-semibold","text-lg","ml-3","truncate");
                    para4.innerHTML=`&#8377;${(responseData[i].clothingPrice).toLocaleString("en-IN")}`;
                    divPrice.appendChild(para4);
                }
            }
        }else{
            let alertt=document.createElement("div");
            alertt.role="alert";
            alertt.innerHTML=`Your search "${input.value}" does not match the result :(`;
            alertt.classList.add("alert","alert-dark","h-80","w-screen","text-2xl","font-normal","py-20","mt-8","text-center");
            divMsg.appendChild(alertt);

            let br=document.createElement("br");
            alertt.appendChild(br);

            let icon=document.createElement("i");
            icon.classList.add("fa-solid","fa-face-dizzy","text-4xl","ml-4","mt-4");
            alertt.appendChild(icon);
            throw (err="problem in fetching data");
        }

    }catch(err){
        console.log(err);
    }
}

{/* <i class="fa-solid fa-face-dizzy"></i> */}