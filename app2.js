let choose_btn=document.querySelector(".choose_img button");
let choose_input=document.querySelector(".choose_img input");
let image_src=document.querySelector(".view_img img");
let filterbtn=document.querySelectorAll(".icons_room button");
let filterbtn2=document.querySelectorAll(".icons_room2 button");
let slider=document.querySelector(".slider input");
let filter_name=document.querySelector(".filter_view .filter");
let filter_value=document.querySelector(".filter_view .value ");
let rotate_btn=document.querySelectorAll(".icons_room1 button");
let reset=document.querySelector(".reset");
let save=document.querySelector(".save");
let brigtness=100,contrast=100,saturate=100,invert=0,blur=0,rotate=0,huerotate=0,grayscale=0,sepia=0,flip_x=1,flip_y=1;
choose_btn.addEventListener("click" ,() =>choose_input.click());
choose_input.addEventListener("change",()=>{
    let file=choose_input.files[0];
    if(!file) return;
    image_src.src=URL.createObjectURL(file);
    image_src.addEventListener("load",()=>{
        document.querySelector('.container').classList.remove('disabled');
    });
});
filterbtn.forEach((element)=>{
    element.addEventListener("click",()=>{
    document.querySelector(".active").classList.remove("active");
    element.classList.add("active");
    filter_name.innerText=element.id;
    if(element.id==="brightness"){
        slider.max="200";
        slider.value=brightness;
        filter_value.innerText=`${brightness}`;
    }
    else if(element.id==="contrast"){
        slider.max="200";
        slider.value=contrast;
        filter_value.innerText=`${contrast}`;
    }
    else if(element.id==="saturate"){
        slider.max="200";
        slider.value=saturate;
        filter_value.innerText=`${saturate}`;
    }
    else if(element.id==="invert"){
        slider.max="100";
        slider.value=invert;
        filter_value.innerText=`${invert}`;
    }
    else if(element.id==="blur"){
        slider.max="100";
        slider.value=blur;
        filter_value.innerText=`${blur}`;
    }

});
});
filterbtn2.forEach((element)=>{
  element.addEventListener("click",()=>{
  document.querySelector(".active").classList.remove("active");
  element.classList.add("active");
  filter_name.innerText=element.id;
  if(element.id==="huerotate"){
    slider.max="100";
        slider.value=huerotate;
        filter_value.innerText=`${huerotate}`;
  }
  else if(element.id==="grayscale"){
    slider.max="100";
        slider.value=grayscale;
        filter_value.innerText=`${grayscale}`;
  }
  else if(element.id==="sepia"){
    slider.max="100";
        slider.value=sepia;
        filter_value.innerText=`${sepia}`;
  }

  });
});

slider.addEventListener("input",() =>{
    filter_value.innerText=`${slider.value}%`;
    let sliderstate = document.querySelector(".icons_room .active , .icons_room2 .active");
    if(sliderstate.id==="brightness")
        brightness = slider.value;
    else if(sliderstate.id=="contrast")
        contrast=slider.value;
    else if(sliderstate.id=="saturate")
        saturate=slider.value;
    else if(sliderstate.id=="invert")
        invert=slider.value;
    else if(sliderstate.id=="blur")
        blur=slider.value;
    else if(sliderstate.id=="huerotate")
        huerotate=slider.value;
    else if(sliderstate.id=="grayscale")
        grayscale=slider.value;
    else if(sliderstate.id=="sepia")
        sepia=slider.value;
    

    let filterstring=`brightness(${brightness}%) contrast(${contrast}%) saturate(${saturate}%) invert(${invert}%) blur(${blur}px) hue-rotate(${huerotate}deg) grayscale(${grayscale}%) sepia(${sepia}%)`;
    image_src.style.filter = filterstring;
});
rotate_btn.forEach((element) => {
    element.addEventListener("click", () => {
      if (element.id === "rotateleft") {
        rotate -= 90;
      } else if (element.id === "rotateright") {
        rotate += 90;
      } else if (element.id === "flip_x") {
        flip_x = flip_x===1?-1:1; 
        applyTransformations();// Toggle the flip_x value
      } else if (element.id === "flip_y") {
        flip_y = flip_y===1?-1:1;
        applyTransformations(); // Toggle the flip_y value
      }
      // Apply scaleX and scaleY transformations separately
      const transform = `rotate(${rotate}deg) scale(${flip_x} ,${flip_y})`;
      image_src.style.transform = transform;
    });
  });
  reset.addEventListener("click",()=>{
    brigtness="100";
    contrast="100";
    saturate="100";
    invert="0";
    blur="0";
    huerotate="0";
    grayscale="0";
    sepia="0";
    rotate=0;
    flip_x=1;
    flip_y=1;

    image_src.style.transform  = `rotate(${rotate}deg) scale(${flip_x},${flip_y})`;
    
    let filterstring1=`brightness(${brightness}%) contrast(${contrast}%) saturate(${saturate}%) invert(${invert}%) blur(${blur}px) hue-rotate(${huerotate}deg) grayscale(${grayscale}) sepia(${sepia}%)`;
    image_src.style.filter = filterstring1;
  });
  save.addEventListener("click",()=>{
    let canvas=document.createElement("canvas");
    let ctx=canvas.getContext("2d");
    canvas.width=image_src.naturalWidth;
    canvas.height=image_src.naturalHeight;
    ctx.filter=`brightness(${brightness}%) contrast(${contrast}%) saturate(${saturate}%) invert(${invert}%) blur(${blur}px) hue-rotate(${huerotate}deg) grayscale(${grayscale}) sepia(${sepia}%)`;
    ctx.scale(flip_x,flip_y);
    ctx.translate(canvas.width/2,canvas.height/2);
    ctx.drawImage(
    image_src,
    -canvas.width/2,
    -canvas.height/2,
    canvas.width,
    canvas.height);
    let link=document.createElement("a");
  link.download="img.jpg";
  link.href=canvas.toDataURL();
  link.click();
  });
  
